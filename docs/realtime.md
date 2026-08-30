# Real-Time WebSocket Architecture — RailOptix-AI

---

## 1. Overview & Setup

RailOptix-AI utilizes **Socket.IO (v4.8)** for single-source-of-truth real-time data distribution between the Node.js backend engine and connected React clients.

- **Transport**: WebSocket preferred, falling back to Long Polling if network firewalls intervene.
- **Port / Host**: Emitted by Node.js server on `env.PORT` (5000) to `env.CLIENT_URL` (http://localhost:3000).

---

## 2. Broadcast Lifecycle

Every `SIMULATION_TICK_MS` (1000ms):

```
Node.js Simulation Ticker ──► Railway State Update ──► socketService.broadcastSimulation()
                                                                 │
                                                                 ▼
React UI State Updated ◄── io.emit("simulation:update", payload) ┘
```

---

## 3. WebSocket Event Payload Schema

### Event: `simulation:update`
```typescript
{
  timestamp: string,       // ISO Date timestamp
  trains: Train[],         // Array of active train objects
  tracks: Track[],         // Array of track segments
  stations: Station[],     // Array of station nodes
  signals: Signal[],       // Array of signal states
  conflicts: Conflict[],   // Array of active conflicts
  events: Event[],         // Recent operational events
  analytics: {
    otp: number,           // On-time performance percentage (e.g. 92.8)
    totalTrains: number,   // Total trains count
    avgDelay: number,      // Average delay in minutes
    activeAlerts: number   // Count of active conflicts/alerts
  },
  recommendations: AIRecommendation[] // Array of active AI recommendations
}
```

### Event: `connection:success`
- **Direction**: Server $\rightarrow$ Client (on initial WebSocket connection handshake).
- **Payload**: `{ socketId: string, message: "Connected Successfully" }`
