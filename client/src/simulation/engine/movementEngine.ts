import { SIMULATION_CONFIG } from "../constants/simulationConfig";
import { Train } from "../types/Train";

const TICK_SECONDS =
  SIMULATION_CONFIG.TICK_RATE_MS / 1000;

/**
 * Move all running trains by one simulation tick.
 */
export function updateTrainPositions(
  trains: Train[]
): Train[] {

  return trains.map((train) => {

    if (train.status !== "RUNNING") {
      return train;
    }

    const normalizedSpeed =
      train.speed / train.maxSpeed;

    let nextPosition =
      train.position +
      normalizedSpeed *
      SIMULATION_CONFIG.POSITION_INCREMENT *
      TICK_SECONDS;

    if (nextPosition > 1) {
      nextPosition = 1;
    }

    return {
      ...train,
      position: nextPosition,
      updatedAt: Date.now(),
    };
  });

}