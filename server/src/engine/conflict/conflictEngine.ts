import Conflict, { ConflictSeverity, ConflictType, IConflict } from "../../models/Conflict";
import railwayState from "../../services/railwayState";

class ConflictEngine {
    async detect(): Promise<void> {
        const trains = railwayState.trains;
        const newDetectedConflicts: IConflict[] = [];

        for (let i = 0; i < trains.length; i++) {
            for (let j = i + 1; j < trains.length; j++) {
                const trainA = trains[i];
                const trainB = trains[j];

                if (trainA.currentTrackId !== trainB.currentTrackId) continue;

                const distance = Math.abs(trainA.position - trainB.position);
                if (distance > 0.10) continue;

                const relativeSpeed = Math.abs(trainA.speed - trainB.speed);
                const eta = relativeSpeed > 0 ? distance / relativeSpeed : 4.5;

                let severity = ConflictSeverity.LOW;
                if (distance < 0.02) severity = ConflictSeverity.CRITICAL;
                else if (distance < 0.05) severity = ConflictSeverity.HIGH;
                else if (distance < 0.08) severity = ConflictSeverity.MEDIUM;

                const ids = [trainA.trainNumber, trainB.trainNumber].sort();
                const conflictId = `CONF-${ids[0]}-${ids[1]}-${trainA.currentTrackId}`;

                // Check if already in railwayState.conflicts
                const existing = railwayState.conflicts.find(c => c.conflictId === conflictId);
                if (!existing) {
                    newDetectedConflicts.push(
                        new Conflict({
                            conflictId,
                            trainA: trainA.trainNumber,
                            trainB: trainB.trainNumber,
                            trackId: trainA.currentTrackId,
                            type: ConflictType.REAR_END,
                            severity,
                            distance,
                            eta,
                            recommendation: `Hold Train ${ids[0]} at upcoming station to maintain safe headway separation.`,
                            resolved: false,
                            detectedAt: new Date()
                        })
                    );
                }
            }
        }

        // Merge newly detected conflicts
        if (newDetectedConflicts.length > 0) {
            railwayState.conflicts = [...railwayState.conflicts, ...newDetectedConflicts];
        }
    }
}

export default new ConflictEngine();