import railwayState from "./railwayState";

import Conflict from "../models/Conflict";
import Event from "../models/Event";

class PersistenceService {

    async save(): Promise<void> {

        /**
         * Save Updated Trains
         */
        for (const train of railwayState.getDirtyTrains()) {

            await train.save();

        }

        /**
         * Save Updated Signals
         */
        for (const signal of railwayState.getDirtySignals()) {

            await signal.save();

        }

        /**
         * Save Updated Tracks
         */
        for (const track of railwayState.getDirtyTracks()) {

            await track.save();

        }

        /**
         * Save Conflicts
         */
        for (const conflict of railwayState.conflicts) {

            await Conflict.findOneAndUpdate(
                {
                    conflictId: conflict.conflictId
                },
                conflict,
                {
                    upsert: true,
                    new: true
                }
            );

        }

        /**
         * Save Events
         */
        if (railwayState.events.length > 0) {

            await Event.insertMany(railwayState.events);

        }

        /**
         * Clear Dirty Cache
         */
        railwayState.clearDirtyObjects();

    }

}

export default new PersistenceService();