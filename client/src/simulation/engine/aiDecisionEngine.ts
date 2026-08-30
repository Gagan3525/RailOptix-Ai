import { Conflict } from "../types/Conflict";
import { AIDecision } from "../types/SimulationState";

export function generateDecision(
  conflicts: Conflict[]
): AIDecision {

  if (conflicts.length === 0) {

    return {
      recommendation: "Network operating normally.",
      confidence: 1,
    };

  }

  return {

    recommendation:
      `Hold Train ${conflicts[0].trainIds[0]}`,

    confidence: 0.98,

  };

}