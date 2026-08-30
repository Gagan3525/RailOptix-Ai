# Conflict Detection Engine — RailOptix-AI

---

## 1. Conflict Detection Mathematics

The conflict detection engine (`engine/conflict/conflictEngine.ts`) checks spatial separation and headway between trains occupying the same track segment.

```typescript
for (let i = 0; i < trains.length; i++) {
  for (let j = i + 1; j < trains.length; j++) {
    const trainA = trains[i];
    const trainB = trains[j];

    // Evaluate trains on same track segment
    if (trainA.currentTrackId !== trainB.currentTrackId) continue;

    const distance = Math.abs(trainA.position - trainB.position);
    if (distance > 0.10) continue; // Safe separation distance

    let severity = ConflictSeverity.LOW;
    if (distance < 0.02) severity = ConflictSeverity.CRITICAL;
    else if (distance < 0.05) severity = ConflictSeverity.HIGH;
    else if (distance < 0.08) severity = ConflictSeverity.MEDIUM;

    // Record Conflict object
    railwayState.conflicts.push(new Conflict({
      conflictId: `${ids[0]}_${ids[1]}_${trainA.currentTrackId}`,
      trainA: trainA.trainNumber,
      trainB: trainB.trainNumber,
      trackId: trainA.currentTrackId,
      type: ConflictType.REAR_END,
      severity,
      distance,
      resolved: false
    }));
  }
}
```

---

## 2. Conflict Flow

```
Train Positions Evaluated
        │
        ▼
Spatial Distance < 0.10 Threshold? ──► YES ──► Create Conflict Object
        │                                              │
        ▼                                              ▼
    No Conflict                                Trigger Operational Alert
                                                       │
                                                       ▼
                                            Generate Candidate Actions
```
