import Conflict, {
    ConflictSeverity,
    ConflictType
} from "../../models/Conflict";

import railwayState from "../../services/railwayState";

class ConflictEngine {

    async detect(): Promise<void> {

        railwayState.conflicts = [];

        const activeConflictIds = new Set<string>();

        const trains = railwayState.trains;

        for (let i = 0; i < trains.length; i++) {

            for (let j = i + 1; j < trains.length; j++) {

                const trainA = trains[i];
                const trainB = trains[j];

                if (trainA.currentTrackId !== trainB.currentTrackId)
                    continue;

                const distance =
                    Math.abs(trainA.position - trainB.position);

                if (distance > 0.10)
                    continue;

                const relativeSpeed =
                    Math.abs(trainA.speed - trainB.speed);

                const eta =
                    relativeSpeed > 0
                        ? distance / relativeSpeed
                        : Number.MAX_SAFE_INTEGER;

                let severity = ConflictSeverity.LOW;

                if (distance < 0.02)
                    severity = ConflictSeverity.CRITICAL;

                else if (distance < 0.05)
                    severity = ConflictSeverity.HIGH;

                else if (distance < 0.08)
                    severity = ConflictSeverity.MEDIUM;

                const ids =
                    [trainA.trainNumber, trainB.trainNumber].sort();

                const conflictId =
                    `${ids[0]}_${ids[1]}_${trainA.currentTrackId}`;

                activeConflictIds.add(conflictId);

                railwayState.conflicts.push(
                    new Conflict({

                        conflictId,

                        trainA: trainA.trainNumber,

                        trainB: trainB.trainNumber,

                        trackId: trainA.currentTrackId,

                        type: ConflictType.REAR_END,

                        severity,

                        distance,

                        eta,

                        recommendation:
                            "Reduce speed and maintain safe separation.",

                        resolved: false

                    })
                );

            }

        }

        const existingConflicts =
            await Conflict.find({ resolved: false });

        for (const conflict of existingConflicts) {

            if (!activeConflictIds.has(conflict.conflictId)) {

                conflict.resolved = true;

                conflict.resolvedAt = new Date();

                await conflict.save();

            }

        }

    }

}

export default new ConflictEngine();