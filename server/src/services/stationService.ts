import railwayState from "./railwayState";
import { IStation } from "../models/Station";
import { ITrack } from "../models/Track";

class StationService {

    getStation(stationId: string): IStation | undefined {

        return railwayState.stations.find(
            station => station.stationId === stationId
        );

    }

    getConnectedTracks(stationId: string): ITrack[] {

        return railwayState.tracks.filter(track =>
            track.fromStation === stationId ||
            track.toStation === stationId
        );

    }

}

export default new StationService();