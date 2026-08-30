import railwayState from "./railwayState";

class AnalyticsService {

    getDashboardMetrics() {

        const runningTrains = railwayState.trains.filter(
            train => train.status === "RUNNING"
        ).length;

        const stoppedTrains = railwayState.trains.filter(
            train => train.status === "STOPPED"
        ).length;

        const delayedTrains = railwayState.trains.filter(
            train => train.delay > 0
        ).length;

        const occupiedTracks = railwayState.tracks.filter(
            track => track.occupiedBy
        ).length;

        return {

            timestamp: new Date(),

            trains: {

                total: railwayState.trains.length,

                running: runningTrains,

                stopped: stoppedTrains,

                delayed: delayedTrains

            },

            tracks: {

                total: railwayState.tracks.length,

                occupied: occupiedTracks,

                available:
                    railwayState.tracks.length - occupiedTracks

            },

            conflicts: railwayState.conflicts.length,

            events: railwayState.events.length

        };

    }

}

export default new AnalyticsService();