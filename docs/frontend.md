# Frontend Architecture — RailOptix-AI

---

## 1. Overview & Stack

The RailOptix-AI frontend is a Single Page Application (SPA) built with:
- **React (v19)** with TypeScript.
- **Tailwind CSS (v3.4)** for utility-first glassmorphism styling.
- **Zustand (v5)** for lightweight global application state management.
- **React Router DOM (v7)** for client-side routing.
- **Lucide Icons** for operational iconography.
- **Socket.IO Client (v4.8)** for receiving backend real-time event streams.

---

## 2. Directory Structure

```
client/src/
├── api/                   # Axios API clients
├── components/
│   ├── command-center/    # KPI cards, Header, Network panel components
│   ├── layout/            # Top Navbar component (Navbar.tsx)
│   └── ui/                # Reusable glassmorphic UI elements
├── hooks/
│   └── useRailwaySimulation.ts  # Real-time Socket.IO synchronization hook
├── layouts/
│   └── AppLayout.tsx      # Main layout wrapper rendering Navbar & Children
├── pages/
│   ├── AI/                # AIAssistantPage.tsx
│   ├── Alerts/            # AlertsPage.tsx
│   ├── Analytics/         # AnalyticsPage.tsx
│   ├── Dashboard/         # Dashboard.tsx (Command Center Hero)
│   ├── Network/           # NetworkPage.tsx (Interactive SVG Canvas Map)
│   ├── Settings/          # SettingsPage.tsx
│   ├── TrainDetails/      # TrainDetailsPage.tsx
│   └── Trains/            # TrainsPage.tsx
├── routes/
│   └── AppRoutes.tsx      # Router configuration mapping all 8 pages
├── simulation/            # Frontend types and constants
└── store/
    └── simulationStore.ts # Zustand global state store
```

---

## 3. Pages & Features

1. **Dashboard (`Dashboard.tsx`)**: Command center hero with dark Indian locomotive imagery, search bar, live map glass card, AI recommendation card, and bottom metric strip (Live Time, Live Trains, Active Alerts, OTP, Weather, Users Online).
2. **Network Page (`NetworkPage.tsx`)**: Full SVG canvas map rendering Indian Railways station nodes, route segments, and live train nodes color-coded by delay severity.
3. **Trains Page (`TrainsPage.tsx`)**: Data table of running trains supporting live search, zone & status filters, speed, next stop, ETA, and row navigation.
4. **Train Details Page (`TrainDetailsPage.tsx`)**: Deep dive view for a selected train featuring route stop timeline, distance/speed metrics, and delay prediction curves.
5. **Alerts Feed (`AlertsPage.tsx`)**: Real-time alerts feed categorized by severity (Critical, Warning, Info) with AI mitigation guidance and execution triggers.
6. **Analytics Page (`AnalyticsPage.tsx`)**: KPIs, OTP trends, delay distribution charts, and zone performance breakdown.
7. **AI Assistant Page (`AIAssistantPage.tsx`)**: Conversational chat interface with quick prompt chips connected to `POST /api/ai/chat`.
8. **Settings Page (`SettingsPage.tsx`)**: Profile info, notification settings, and operational preferences.

---

## 4. State Management & Real-Time Sync

```typescript
// useRailwaySimulation.ts
export function useRailwaySimulation() {
  const simulation = useSimulationStore((state) => state.simulation);
  const updateFromBackend = useSimulationStore((state) => state.updateFromBackend);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });

    socket.on("simulation:update", (data) => {
      updateFromBackend({
        trains: data.trains,
        signals: data.signals,
        conflicts: data.conflicts,
        aiDecision: data.recommendations?.[0],
      });
    });

    return () => socket.disconnect();
  }, []);

  return simulation;
}
```
