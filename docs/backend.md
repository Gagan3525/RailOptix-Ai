# Backend Architecture — RailOptix-AI

---

## 1. Overview & Stack

The RailOptix-AI backend is a Node.js Express server structured into controllers, routes, models, simulation engines, and Socket.IO services:

- **Runtime**: Node.js with TypeScript (`ts-node-dev` in development, `tsc` for production builds).
- **Web Framework**: Express.js (v5).
- **Database ODM**: Mongoose (v9).
- **Real-Time Communication**: Socket.IO (v4.8).
- **Security & Logging**: Helmet, Cors, Compression, Cookie-Parser, Morgan, Winston.

---

## 2. Backend Directory Structure

```
server/src/
├── app.ts                 # Express app initialization & route mounting
├── server.ts              # HTTP server entry point & startup sequence
├── config/                # Environment, logger, database & socket configs
├── controllers/           # Express request handlers
│   ├── aiController.ts
│   ├── conflictController.ts
│   ├── dashboardController.ts
│   ├── eventController.ts
│   ├── signalController.ts
│   └── trainController.ts
├── engine/                # Simulation & mathematical calculation engines
│   ├── ai/                # AI decision engine
│   ├── block/             # Track block occupancy engine
│   ├── conflict/          # Deterministic conflict detection engine
│   ├── event/             # Audit event engine
│   ├── movement/          # Train movement engine
│   ├── route/             # Route reservation & planning engine
│   ├── scheduler/         # Engine execution orchestrator
│   └── signal/            # Signal aspect engine
├── models/                # Mongoose schema definitions
│   ├── Conflict.ts
│   ├── Event.ts
│   ├── Signal.ts
│   ├── Station.ts
│   ├── Track.ts
│   ├── TrackBlock.ts
│   └── Train.ts
├── routes/                # Express API routes
│   ├── aiRoutes.ts
│   ├── conflictRoutes.ts
│   ├── dashboardRoutes.ts
│   ├── eventRoutes.ts
│   ├── signalRoutes.ts
│   └── trainRoutes.ts
├── seed/                  # Initial database seeder (seed.ts)
└── services/              # Core state, persistence, socket & AI services
    ├── aiService.ts
    ├── analyticsService.ts
    ├── persistenceService.ts
    ├── railwayState.ts
    ├── simulationService.ts
    └── socketService.ts
```

---

## 3. Execution Cycle

When the server starts:
1. `database.connect()` establishes connection to MongoDB.
2. `socketManager.initialize(server)` attaches Socket.IO to the HTTP server.
3. `simulationService.initialize()` triggers `railwayState.load()`.
4. If MongoDB collections are empty, `seedDatabase()` runs automatically to populate Indian Railways stations, tracks, signals, and trains.
5. `simulationService.start()` initiates the 1000ms ticker interval:
   - `scheduler.execute()` runs movement, block, signal, conflict, and event engines.
   - `persistenceService.save()` writes updated models back to MongoDB.
   - `socketService.broadcastSimulation()` emits `simulation:update` payload over WebSockets.
