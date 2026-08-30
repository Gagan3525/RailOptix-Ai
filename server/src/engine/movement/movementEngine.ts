import railwayState from "../../services/railwayState";
import { TrainStatus } from "../../models/Train";
import { SignalStatus } from "../../models/Signal";
import routeEngine from "../route/routeEngine";
import routePlanner from "../route/routePlanner";

class MovementEngine {
    update(): void {
        railwayState.trains.forEach(train => {
            // Only move running trains
            if (train.status !== TrainStatus.RUNNING) {
                return;
            }

            // Check signal aspect on current track
            const signal = railwayState.signals.find(s => s.trackId === train.currentTrackId);
            if (signal && signal.status === SignalStatus.RED) {
                train.speed = 0;
                train.delay += 1; // Accumulate delay while held at red signal
                railwayState.markTrainDirty(train.trainNumber);
                return;
            } else if (signal && signal.status === SignalStatus.YELLOW) {
                train.speed = 40; // Regulate speed on yellow signal
            } else {
                train.speed = 85; // Normal running speed
            }

            // Reserve track
            const reserved = routeEngine.reserveTrack(train.trainNumber, train.currentTrackId);
            if (!reserved) {
                train.delay += 1;
                railwayState.markTrainDirty(train.trainNumber);
                return;
            }

            // Move train smoothly along track segment
            const stepDelta = train.speed > 0 ? (train.speed / 2000) : 0.02;
            train.position += stepDelta;

            // Reached end of current track segment
            if (train.position >= 1.0) {
                train.position = 0.0;
                routeEngine.releaseTrack(train.currentTrackId);

                // Advance along route
                if (train.route && train.route.length > 0) {
                    train.routeIndex = (train.routeIndex + 1) % train.route.length;
                    train.currentStationId = train.route[train.routeIndex];

                    const nextIdx = (train.routeIndex + 1) % train.route.length;
                    train.nextStationId = train.route[nextIdx];
                }

                // Find next track for new segment
                const nextTrack = routePlanner.getNextTrack(train.trainNumber);
                if (nextTrack) {
                    train.currentTrackId = nextTrack;
                }
            }

            // Safety clamp position between 0 and 1
            train.position = Math.max(0.0, Math.min(1.0, train.position));

            // Mark train dirty for DB & WebSocket broadcast
            railwayState.markTrainDirty(train.trainNumber);
        });
    }
}

export default new MovementEngine();