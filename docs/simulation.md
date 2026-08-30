# Railway Simulation Engine — RailOptix-AI

---

## 1. Simulation Mechanics

The simulation engine owned by Node.js models realistic train progression across Indian Railways network routes.

### Ticker Orchestration (`services/simulationService.ts`)
```typescript
class SimulationService {
  async simulationTick(): Promise<void> {
    await scheduler.execute();       // Run engines
    await persistenceService.save();  // Persist dirty models
    socketService.broadcastSimulation(); // Emit WebSockets
  }
}
```

---

## 2. Movement Calculations (`engine/movement/movementEngine.ts`)

Train progression along a track segment is normalized from `0.0` (start station) to `1.0` (destination station):

```typescript
// Smooth progression calculation
const stepDelta = train.speed > 0 ? (train.speed / 5000) : 0.01;
train.position += stepDelta;

if (train.position >= 1.0) {
  train.position = 0.0;
  train.routeIndex++;
  train.currentStationId = train.route[train.routeIndex];
  train.nextStationId = train.route[train.routeIndex + 1] || train.destinationStationId;
}
```

---

## 3. Difference Between Frontend Animation & Backend Simulation

| Aspect | Fake Frontend Animation (Old) | RailOptix Backend Engine (Current) |
|---|---|---|
| **Authoritative State** | Browser DOM / CSS Timer | Node.js Server & MongoDB |
| **Multi-Client Sync** | Out of Sync | 100% Synchronized via WebSockets |
| **Conflict Calculation** | Random / Faked | Computed mathematically per tick |
| **Persistence** | Lost on page refresh | Saved to MongoDB database |
