import {
  Conflict,
  ConflictSeverity,
  ConflictType,
} from "../types/Conflict";

import { Train } from "../types/Train";

/**
 * Minimum safe separation.
 */
const SAFE_DISTANCE = 0.10;

/**
 * Severity classification.
 */
function calculateSeverity(
  distance: number
): ConflictSeverity {

  if (distance <= 0.02)
    return "CRITICAL";

  if (distance <= 0.05)
    return "HIGH";

  if (distance <= 0.08)
    return "MEDIUM";

  return "LOW";
}

/**
 * Detect conflict type.
 */
function determineConflictType(
  trainA: Train,
  trainB: Train
): ConflictType {

  if (trainA.direction !== trainB.direction)
    return "HEAD_ON";

  return "REAR_END";
}

/**
 * Dispatcher recommendation.
 */
function generateRecommendation(
  severity: ConflictSeverity,
  type: ConflictType
): string {

  if (severity === "CRITICAL")
    return "Emergency stop one train immediately.";

  if (severity === "HIGH")
    return "Reduce train speed and prepare signal intervention.";

  if (type === "HEAD_ON")
    return "Assign priority and reroute if alternate track exists.";

  return "Maintain safe separation and continue monitoring.";
}

/**
 * Detect railway conflicts.
 */
export function detectConflicts(
  trains: Train[]
): Conflict[] {

  const conflicts: Conflict[] = [];

  for (let i = 0; i < trains.length; i++) {

    for (let j = i + 1; j < trains.length; j++) {

      const trainA = trains[i];
      const trainB = trains[j];

      // Ignore trains on different tracks
      if (trainA.currentTrackId !== trainB.currentTrackId)
        continue;

      const distance =
        Math.abs(trainA.position - trainB.position);

      if (distance >= SAFE_DISTANCE)
        continue;

      const severity =
        calculateSeverity(distance);

      const conflictType =
        determineConflictType(trainA, trainB);

      const closingSpeed =
        trainA.direction === trainB.direction
          ? Math.max(
              Math.abs(trainA.speed - trainB.speed),
              5
            )
          : trainA.speed + trainB.speed;

      const eta =
        Number(
          (distance / closingSpeed).toFixed(2)
        );

      conflicts.push({

        id:
          `CF-${trainA.trainNumber}-${trainB.trainNumber}`,

        trainIds: [
          trainA.id,
          trainB.id
        ],

        trackId:
          trainA.currentTrackId,

        message:
          `Conflict detected between ${trainA.trainNumber} and ${trainB.trainNumber}`,

        severity,

        resolved: false,

        detectedAt:
          Date.now(),

        distance,

        estimatedTimeToConflict:
          eta,

        conflictType,

        recommendation:
          generateRecommendation(
            severity,
            conflictType
          ),

      });

    }

  }

  return conflicts;
}