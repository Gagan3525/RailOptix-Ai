import mongoose, { Document, Schema } from "mongoose";

/**
 * Signal Status
 */
export enum SignalStatus {
    RED = "RED",
    YELLOW = "YELLOW",
    GREEN = "GREEN"
}

/**
 * Signal Direction
 */
export enum SignalDirection {
    UP = "UP",
    DOWN = "DOWN",
    BOTH = "BOTH"
}

/**
 * Signal Interface
 */
export interface ISignal extends Document {
    signalId: string;
    name: string;
    trackId: string;
    position: number;
    direction: SignalDirection;
    status: SignalStatus;
    isAutomatic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Signal Schema
 */
const SignalSchema = new Schema<ISignal>(
    {
        signalId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        trackId: {
            type: String,
            required: true,
            index: true
        },

        position: {
            type: Number,
            required: true,
            min: 0,
            max: 1
        },

        direction: {
            type: String,
            enum: Object.values(SignalDirection),
            default: SignalDirection.BOTH
        },

        status: {
            type: String,
            enum: Object.values(SignalStatus),
            default: SignalStatus.GREEN,
            index: true
        },

        isAutomatic: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ISignal>("Signal", SignalSchema);