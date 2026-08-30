import trackService from "../../services/trackService";

import blockEngine from "../block/blockEngine";
import signalEngine from "../signal/signalEngine";
import movementEngine from "../movement/movementEngine";
import conflictEngine from "../conflict/conflictEngine";
import eventEngine from "../event/eventEngine";
import aiDecisionEngine from "../ai/aiDecisionEngine";

class Scheduler {

    async execute(): Promise<void> {

        trackService.updateOccupancy();

        blockEngine.update();

        signalEngine.update();

        movementEngine.update();

        await conflictEngine.detect();

        await eventEngine.process();

        aiDecisionEngine.execute();

    }

}

export default new Scheduler();