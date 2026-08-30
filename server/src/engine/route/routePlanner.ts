import railwayState from "../../services/railwayState";

class RoutePlanner {

    getNextTrack(trainNumber: string): string | null {

        const train = railwayState.trains.find(
            t => t.trainNumber === trainNumber
        );

        if (!train) {
            return null;
        }

        const track = railwayState.tracks.find(
            t => t.fromStation === train.nextStationId
        );

        if (!track) {
            return null;
        }

        return track.trackId;
    }

}

export default new RoutePlanner();