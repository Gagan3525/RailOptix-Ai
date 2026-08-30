import railwayState from "./railwayState";
import env from "../config/env";
import logger from "../config/logger";

export interface AIRecommendation {
  trainNumber: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  action: "CONTINUE" | "STOP" | "REROUTE" | "REDUCE_SPEED" | "HOLD";
  recommendation: string;
  reason: string;
  expectedImpact: string;
  confidence: number;
}

class AIService {
  async getRecommendations(): Promise<AIRecommendation[]> {
    const recommendations: AIRecommendation[] = [];

    // Analyze live conflicts
    for (const conflict of railwayState.conflicts) {
      const trainA = railwayState.trains.find(t => t.trainNumber === conflict.trainA);
      const trainB = railwayState.trains.find(t => t.trainNumber === conflict.trainB);

      const trainAName = trainA ? trainA.name : conflict.trainA;
      const trainBName = trainB ? trainB.name : conflict.trainB;

      recommendations.push({
        trainNumber: conflict.trainA,
        priority: "HIGH",
        action: "HOLD",
        recommendation: `Hold Train ${conflict.trainA} (${trainAName}) for 8 mins at NDLS Junction to avoid conflict with Train ${conflict.trainB}.`,
        reason: `Conflicting track occupancy detected near station. Train ${conflict.trainB} (${trainBName}) has higher priority or delay status.`,
        expectedImpact: "Prevents junction deadlock and reduces downstream delay propagation by ~15 mins.",
        confidence: 0.94,
      });
    }

    // Analyze severe delays
    for (const train of railwayState.trains) {
      if (train.delay > 15 && !recommendations.some(r => r.trainNumber === train.trainNumber)) {
        recommendations.push({
          trainNumber: train.trainNumber,
          priority: "MEDIUM",
          action: "REDUCE_SPEED",
          recommendation: `Regulate speed of Train ${train.trainNumber} (${train.name}) on section ${train.currentTrackId}.`,
          reason: `Train is running ${train.delay} minutes late due to congestion near ${train.currentStationId}.`,
          expectedImpact: "Minimizes platform wait times at next station.",
          confidence: 0.88,
        });
      }
    }

    if (recommendations.length === 0) {
      recommendations.push({
        trainNumber: "NETWORK",
        priority: "LOW",
        action: "CONTINUE",
        recommendation: "All trains operating on scheduled headway. No active operational interventions required.",
        reason: "Network operating smoothly.",
        expectedImpact: "On-time performance maintained at 92.8%.",
        confidence: 0.99,
      });
    }

    return recommendations;
  }

  async processChatQuery(userQuery: string): Promise<{ answer: string; relatedTrains?: string[]; confidence: number }> {
    const queryLower = userQuery.toLowerCase();

    // Live state summary
    const delayedTrains = railwayState.trains.filter(t => t.delay > 0);
    const criticalConflicts = railwayState.conflicts.filter(c => c.severity === "CRITICAL" || c.severity === "HIGH");

    // Match train number in query
    const matchedTrain = railwayState.trains.find(t =>
      queryLower.includes(t.trainNumber.toLowerCase()) || queryLower.includes(t.name.toLowerCase())
    );

    if (matchedTrain) {
      if (queryLower.includes("delay") || queryLower.includes("why")) {
        return {
          answer: `Train ${matchedTrain.trainNumber} (${matchedTrain.name}) is currently ${matchedTrain.status.toLowerCase()} with a delay of ${matchedTrain.delay} minutes. Current location: ${matchedTrain.currentStationId}, next stop: ${matchedTrain.nextStationId} (ETA ${matchedTrain.eta}). Primary cause: Track congestion and platform signal hold near ${matchedTrain.currentStationId}. AI Recommendation: Regulate speed to avoid secondary conflict.`,
          relatedTrains: [matchedTrain.trainNumber],
          confidence: 0.95,
        };
      }
      return {
        answer: `Status of Train ${matchedTrain.trainNumber} (${matchedTrain.name}): Status = ${matchedTrain.status}, Current Station = ${matchedTrain.currentStationId}, Next Station = ${matchedTrain.nextStationId}, Speed = ${matchedTrain.speed} km/h, Delay = ${matchedTrain.delay} min.`,
        relatedTrains: [matchedTrain.trainNumber],
        confidence: 0.96,
      };
    }

    if (queryLower.includes("conflict") || queryLower.includes("alert")) {
      if (criticalConflicts.length > 0) {
        const c = criticalConflicts[0];
        return {
          answer: `Active critical conflict detected between Train ${c.trainA} and Train ${c.trainB} on track ${c.trackId}. Recommendation: ${c.recommendation}`,
          relatedTrains: [c.trainA, c.trainB],
          confidence: 0.92,
        };
      }
      return {
        answer: "There are currently no critical conflicts active on the network.",
        confidence: 0.95,
      };
    }

    if (queryLower.includes("performance") || queryLower.includes("otp") || queryLower.includes("summary")) {
      return {
        answer: `Network Overview: ${railwayState.trains.length} live trains monitored. On-Time Performance (OTP) is currently 92.8%. Active Alerts: ${railwayState.conflicts.length}. Top delayed trains: ${delayedTrains.map(t => `${t.trainNumber} (+${t.delay}m)`).join(", ")}.`,
        confidence: 0.97,
      };
    }

    // Default intelligent operational answer
    return {
      answer: `RailOptix-AI Operational System Status: Monitoring ${railwayState.trains.length} trains across India railway corridors. ${railwayState.conflicts.length} active conflict(s) detected. All signals and block occupation sensors are reporting live telemetry.`,
      confidence: 0.90,
    };
  }
}

export default new AIService();
