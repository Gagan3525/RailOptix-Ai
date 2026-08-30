import railwayState from "../../services/railwayState";
import Event from "../../models/Event";

class EventEngine {

    async process(): Promise<void> {

        const latestEvents: typeof railwayState.events = [];

        for (const train of railwayState.trains) {

            const event = new Event({

                eventType: "TRAIN_POSITION",

                title: `Train ${train.trainNumber} Updated`,

                description: `${train.trainNumber} is currently at position ${train.position.toFixed(3)}`,

                severity: "LOW",

                source: train.trainNumber,

                timestamp: new Date()

            });

            latestEvents.push(event);

        }

        railwayState.events = latestEvents;

    }

}

export default new EventEngine();