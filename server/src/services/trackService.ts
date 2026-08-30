import railwayState from "./railwayState";
import { TrackStatus } from "../models/Track";

class TrackService {

    updateOccupancy(): void {

        for (const track of railwayState.tracks) {

            const train = railwayState.trains.find(
                (t) => t.currentTrackId === track.trackId
            );

            if (train) {

                track.status = TrackStatus.OCCUPIED;
                track.occupiedBy = train.trainNumber;

            } else {

                track.status = TrackStatus.AVAILABLE;
                track.occupiedBy = undefined;

            }

            // Mark track as modified
            railwayState.markTrackDirty(track.trackId);

        }

    }

}

export default new TrackService();