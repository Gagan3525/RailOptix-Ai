import { Signal } from "../types/Signal";
import { Train } from "../types/Train";

/**
 * Stop trains at RED signals.
 */
export function applySignalRules(
  trains: Train[],
  signals: Signal[]
): Train[] {

  return trains.map((train) => {

    const signal = signals.find(
      s => s.trackId === train.currentTrackId
    );

    if (!signal) {
      return train;
    }

    if (signal.aspect === "RED") {

      return {
        ...train,
        speed: 0,
        status: "WAITING_SIGNAL",
      };

    }

    if (
      signal.aspect === "GREEN" &&
      train.status === "WAITING_SIGNAL"
    ) {

      return {
        ...train,
        speed: train.maxSpeed * 0.75,
        status: "RUNNING",
      };

    }

    return train;

  });

}