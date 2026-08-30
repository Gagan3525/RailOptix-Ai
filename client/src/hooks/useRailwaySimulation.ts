import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSimulationStore } from "../store/simulationStore";
import { SIMULATION_CONFIG } from "../simulation/constants/simulationConfig";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

export function useRailwaySimulation() {
  const simulation = useSimulationStore((state) => state.simulation);
  const updateFromBackend = useSimulationStore((state) => state.updateFromBackend);
  const startSimulation = useSimulationStore((state) => state.startSimulation);
  const stopSimulation = useSimulationStore((state) => state.stopSimulation);
  const tick = useSimulationStore((state) => state.tick);

  useEffect(() => {
    startSimulation();

    let socket: Socket | null = null;
    let isConnected = false;

    try {
      socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on("connect", () => {
        isConnected = true;
        console.log("🔌 Connected to RailOptix Real-Time WebSocket Server");
      });

      socket.on("simulation:update", (data: any) => {
        if (data) {
          updateFromBackend({
            trains: data.trains || simulation.trains,
            signals: data.signals || simulation.signals,
            conflicts: data.conflicts || simulation.conflicts,
            aiDecision: data.recommendations && data.recommendations[0]
              ? {
                  recommendation: data.recommendations[0].recommendation || data.recommendations[0].reason,
                  confidence: data.recommendations[0].confidence || 0.94,
                }
              : simulation.aiDecision,
          });
        }
      });

      socket.on("disconnect", () => {
        isConnected = false;
        console.log("❌ Disconnected from WebSocket, switching to local state ticker");
      });
    } catch (err) {
      console.warn("WebSocket connection failed, running local ticker:", err);
    }

    const timer = setInterval(() => {
      if (!isConnected) {
        tick();
      }
    }, SIMULATION_CONFIG.TICK_RATE_MS);

    return () => {
      clearInterval(timer);
      if (socket) {
        socket.disconnect();
      }
      stopSimulation();
    };
  }, []);

  return simulation;
}