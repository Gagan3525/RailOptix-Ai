import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSimulationStore } from "../store/simulationStore";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

export function useRailwaySimulation() {
  const simulation = useSimulationStore((state) => state.simulation);
  const updateFromBackend = useSimulationStore((state) => state.updateFromBackend);

  useEffect(() => {
    // Initial fetch from backend REST API
    fetch(`${SOCKET_URL}/api/network`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.trains) {
          updateFromBackend({
            trains: data.trains,
            stations: data.stations,
            tracks: data.tracks,
            signals: data.signals,
            conflicts: data.conflicts,
          });
        }
      })
      .catch((err) => console.warn("Failed to fetch initial network state:", err));

    let socket: Socket | null = null;

    try {
      socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on("connect", () => {
        console.log("🔌 Connected to RailOptix Real-Time WebSocket Server");
      });

      socket.on("simulation:update", (data: any) => {
        if (data) {
          updateFromBackend({
            trains: data.trains || simulation.trains,
            stations: data.stations || simulation.stations,
            tracks: data.tracks || simulation.tracks,
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
        console.log("❌ Disconnected from WebSocket, attempting reconnect...");
      });
    } catch (err) {
      console.warn("WebSocket connection failed:", err);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return simulation;
}