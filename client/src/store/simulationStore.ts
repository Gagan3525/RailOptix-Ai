import { create } from "zustand";
import { stations } from "../simulation/data/stations";
import { tracks } from "../simulation/data/tracks";
import { trains } from "../simulation/data/trains";
import { signals } from "../simulation/data/signals";
import { conflicts } from "../simulation/data/conflicts";
import { SimulationState } from "../simulation/types/SimulationState";
import { runSimulationStep } from "../simulation/engine/simulationEngine";

interface SimulationStore {
  simulation: SimulationState;
  updateFromBackend: (data: Partial<SimulationState>) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  tick: () => void;
  resetSimulation: () => void;
}

const createInitialState = (): SimulationState => ({
  stations,
  tracks,
  trains: structuredClone(trains),
  signals: structuredClone(signals),
  conflicts: structuredClone(conflicts),
  aiDecision: {
    recommendation: "Hold Train 12951 for 8 mins at NDLS Junction to avoid conflict with Train 12424.",
    confidence: 0.94,
  },
  currentTick: 0,
  isRunning: false,
  lastUpdated: Date.now(),
});

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  simulation: createInitialState(),

  updateFromBackend: (data: Partial<SimulationState>) =>
    set((state) => ({
      simulation: {
        ...state.simulation,
        ...data,
        currentTick: state.simulation.currentTick + 1,
        lastUpdated: Date.now(),
      },
    })),

  startSimulation: () =>
    set((state) => ({
      simulation: {
        ...state.simulation,
        isRunning: true,
      },
    })),

  stopSimulation: () =>
    set((state) => ({
      simulation: {
        ...state.simulation,
        isRunning: false,
      },
    })),

  tick: () => {
    const simulation = get().simulation;
    if (!simulation.isRunning) return;

    const updatedSimulation = runSimulationStep(simulation);
    set({
      simulation: updatedSimulation,
    });
  },

  resetSimulation: () =>
    set({
      simulation: createInitialState(),
    }),
}));