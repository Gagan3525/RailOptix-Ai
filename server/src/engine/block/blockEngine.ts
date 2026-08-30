import railwayState from "../../services/railwayState";

import { BlockStatus } from "../../models/TrackBlock";

class BlockEngine {

    update(): void {

        /**
         * Reset all blocks
         */

        railwayState.blocks.forEach(block => {

            block.status = BlockStatus.FREE;

            block.occupiedBy = undefined;

            railwayState.markBlockDirty(block.blockId);

        });

        /**
         * Assign trains to blocks
         */

        railwayState.trains.forEach(train => {

            const currentBlock = railwayState.blocks.find(block =>

                block.trackId === train.currentTrackId &&

                train.position >= block.startPosition &&

                train.position < block.endPosition

            );

            if (!currentBlock) {

                return;

            }

            currentBlock.status = BlockStatus.OCCUPIED;

            currentBlock.occupiedBy = train.trainNumber;

            railwayState.markBlockDirty(currentBlock.blockId);

        });

    }

}

export default new BlockEngine();