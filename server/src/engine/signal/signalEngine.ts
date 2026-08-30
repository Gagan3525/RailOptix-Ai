import railwayState from "../../services/railwayState";

import { SignalStatus } from "../../models/Signal";
import { BlockStatus } from "../../models/TrackBlock";

class SignalEngine {

    update(): void {

        railwayState.signals.forEach(signal => {

            const firstBlock = railwayState.blocks.find(

                block =>

                    block.trackId === signal.trackId &&
                    block.blockNumber === 1

            );

            if (!firstBlock) {

                signal.status = SignalStatus.GREEN;

            }
            else if (firstBlock.status === BlockStatus.OCCUPIED) {

                signal.status = SignalStatus.RED;

            }
            else {

                signal.status = SignalStatus.GREEN;

            }

            railwayState.markSignalDirty(signal.signalId);

        });

    }

}

export default new SignalEngine();