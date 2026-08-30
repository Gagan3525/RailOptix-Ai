import railwayState from "./railwayState";
import analyticsService from "./analyticsService";

import aiDecisionEngine from "../engine/ai/aiDecisionEngine";

import { getIO } from "../socket/socket";

class SocketService {

    broadcastSimulation(): void {

        const io = getIO();

        io.emit("simulation:update", {

            timestamp: new Date(),

            trains: railwayState.trains,

            tracks: railwayState.tracks,

            stations: railwayState.stations,

            signals: railwayState.signals,

            conflicts: railwayState.conflicts,

            events: railwayState.events,

            analytics: analyticsService.getDashboardMetrics(),

            recommendations: aiDecisionEngine.execute()

        });

    }

}

export default new SocketService();