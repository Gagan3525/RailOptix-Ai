import { generateDecision } from "./aiDecisionEngine";
import { detectConflicts } from "./conflictEngine";
import { updateTrainPositions } from "./movementEngine";
import { applySignalRules } from "./signalEngine";

import { SimulationState } from "../types/SimulationState";

/**
 * Executes one simulation cycle.
 */
export function runSimulationStep(
  state: SimulationState
): SimulationState {

  // Move trains
  const movedTrains =
    updateTrainPositions(state.trains);

  // Apply railway signals
  const updatedTrains =
    applySignalRules(
      movedTrains,
      state.signals
    );

  // Detect conflicts
  const conflicts =
    detectConflicts(updatedTrains);

  // AI Recommendation
  const aiDecision =
    generateDecision(conflicts);

  return {

    ...state,

    trains: updatedTrains,

    conflicts,

    aiDecision,

    currentTick:
      state.currentTick + 1,

    lastUpdated:
      Date.now(),

  };

}