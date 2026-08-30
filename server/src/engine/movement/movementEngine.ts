import railwayState from "../../services/railwayState";

import { TrainStatus } from "../../models/Train";
import { SignalStatus } from "../../models/Signal";

import routeEngine from "../route/routeEngine";
import routePlanner from "../route/routePlanner";

class MovementEngine {

    update(): void {

        railwayState.trains.forEach(train => {

            /**
             * Only move running trains
             */
            if (train.status !== TrainStatus.RUNNING) {
                return;
            }

            /**
             * Check signal on current track
             */
            const signal = railwayState.signals.find(
                signal => signal.trackId === train.currentTrackId
            );

            if (signal && signal.status === SignalStatus.RED) {
                return;
            }

            /**
             * Reserve current track
             */
            const reserved = routeEngine.reserveTrack(
                train.trainNumber,
                train.currentTrackId
            );

            if (!reserved) {

                console.log(
                    `🚫 Track ${train.currentTrackId} already reserved`
                );

                train.status = TrainStatus.STOPPED;

                railwayState.markTrainDirty(train.trainNumber);

                return;
            }

            /**
             * Move train smoothly along track segment
             */
            const stepDelta = train.speed > 0 ? (train.speed / 5000) : 0.01;
            train.position += stepDelta;

            /**
             * Reached end of current track
             */
            if (train.position >= 1) {

                train.position = 0;

                routeEngine.releaseTrack(train.currentTrackId);

                /**
                 * Move to next station
                 */
                if (
                    train.route.length > 0 &&
                    train.routeIndex < train.route.length - 1
                ) {

                    train.routeIndex++;

                    train.currentStationId =
                        train.route[train.routeIndex];

                    /**
                     * Update next station
                     */
                    if (train.routeIndex < train.route.length - 1) {

                        train.nextStationId =
                            train.route[train.routeIndex + 1];

                    } else {

                        train.nextStationId =
                            train.destinationStationId;

                    }

                }

                /**
                 * Find next track
                 */
                const nextTrack = routePlanner.getNextTrack(
                    train.trainNumber
                );

                if (nextTrack) {

                    train.currentTrackId = nextTrack;

                } else {

                    train.status = TrainStatus.STOPPED;

                    console.log(
                        `🏁 ${train.trainNumber} reached destination`
                    );

                }

            }

            /**
             * Safety clamp
             */
            train.position = Math.max(
                0,
                Math.min(1, train.position)
            );

            railwayState.markTrainDirty(
                train.trainNumber
            );

        });

    }

}

export default new MovementEngine();