import { Schema, model, Document } from "mongoose";

export enum BlockStatus {
    FREE = "FREE",
    OCCUPIED = "OCCUPIED",
    RESERVED = "RESERVED"
}

export interface ITrackBlock extends Document {

    blockId: string;

    trackId: string;

    blockNumber: number;

    startPosition: number;

    endPosition: number;

    occupiedBy?: string;

    status: BlockStatus;

}

const TrackBlockSchema = new Schema<ITrackBlock>(

    {

        blockId: {
            type: String,
            required: true,
            unique: true
        },

        trackId: {
            type: String,
            required: true
        },

        blockNumber: {
            type: Number,
            required: true
        },

        startPosition: {
            type: Number,
            required: true
        },

        endPosition: {
            type: Number,
            required: true
        },

        occupiedBy: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: Object.values(BlockStatus),
            default: BlockStatus.FREE
        }

    },

    {
        timestamps: true
    }

);

export default model<ITrackBlock>(
    "TrackBlock",
    TrackBlockSchema
);