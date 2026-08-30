import railwayState from "../../services/railwayState";

export interface AIRecommendation {

    trainNumber: string;

    priority: "LOW" | "MEDIUM" | "HIGH";

    action:
        | "CONTINUE"
        | "STOP"
        | "REROUTE"
        | "REDUCE_SPEED";

    reason: string;

}

class AIDecisionEngine {

    private recommendations: AIRecommendation[] = [];

    execute(): AIRecommendation[] {

        this.recommendations = [];

        /**
         * Conflict Based Decisions
         */

        for (const conflict of railwayState.conflicts) {

            this.recommendations.push({

                trainNumber: conflict.trainA,

                priority: "HIGH",

                action: "STOP",

                reason: `Conflict detected with ${conflict.trainB}`

            });

        }

        /**
         * Delay Based Decisions
         */

        for (const train of railwayState.trains) {

            if (train.delay > 10) {

                this.recommendations.push({

                    trainNumber: train.trainNumber,

                    priority: "MEDIUM",

                    action: "REDUCE_SPEED",

                    reason: "Running with excessive delay"

                });

            }

        }

        return this.recommendations;

    }

}

export default new AIDecisionEngine();