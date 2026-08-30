# Development Guide — RailOptix-AI

---

## 1. Code Style & Conventions

- **TypeScript**: Strict mode enabled. Always define interface types for API request/response payloads, Mongoose documents, and component props.
- **Components**: Functional React components using React Hooks (`useState`, `useEffect`, `useNavigate`).
- **Styling**: Tailwind CSS classes. Maintain dark glassmorphism styling (`bg-white/5 border border-white/10 backdrop-blur-xl`).

---

## 2. How to Add a New Train to the Simulation

1. Add entry to `TRAINS` array in [`server/src/seed/seed.ts`](../server/src/seed/seed.ts):
```typescript
{
  trainNumber: "12952",
  name: "New Delhi Rajdhani",
  currentTrackId: "TK-GWL-NDLS",
  sourceStationId: "ST-NDLS",
  currentStationId: "ST-[#NDLS]",
  nextStationId: "ST-[#GWL]",
  destinationStationId: "ST-[#CSMT]",
  route: ["ST-NDLS", "ST-GWL", "ST-JHS", "ST-BPL", "ST-CSMT"],
  position: 0.1,
  speed: 90,
  delay: 0,
  eta: 16.5,
  direction: TrainDirection.DOWN,
  status: TrainStatus.RUNNING,
  priority: 1
}
```
2. Restart backend server (`npm run dev`). Database auto-seeder will re-seed and include the new train in Socket.IO broadcasts.
