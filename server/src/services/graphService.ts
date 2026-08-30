import railwayState from "./railwayState";
import railwayGraph from "../graph/railwayGraph";

class GraphService {

    initialize(): void {

        for (const station of railwayState.stations) {

            railwayGraph.addStation(
                station.stationId
            );

        }

        for (const track of railwayState.tracks) {

            railwayGraph.addTrack(
                track.fromStation,
                track.toStation,
                track.trackId,
                track.length
            );

        }

        console.log("✅ Railway Graph Initialized");

    }

}

export default new GraphService();