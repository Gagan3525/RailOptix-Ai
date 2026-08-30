import { Schema, model, Document } from "mongoose";

export enum TrainStatus {
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
    DELAYED = "DELAYED",
    WAITING_SIGNAL = "WAITING_SIGNAL",
}

export enum TrainDirection {
    UP = "UP",
    DOWN = "DOWN",
}

export interface ITrain extends Document {

    trainNumber: string;

    name: string;

    currentTrackId: string;

    sourceStationId: string;

    currentStationId: string;

    nextStationId: string;

    destinationStationId: string;

    route: string[];

    routeIndex: number;

    position: number;

    speed: number;

    delay: number;

    eta: number;

    direction: TrainDirection;

    status: TrainStatus;

    priority: number;

    createdAt: Date;

    updatedAt: Date;
}

const TrainSchema = new Schema<ITrain>(
    {

        trainNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true
        },

        currentTrackId: {
            type: String,
            required: true
        },

        sourceStationId: {
            type: String,
            required: true
        },

        currentStationId: {
            type: String,
            required: true
        },

        nextStationId: {
            type: String,
            required: true
        },

        destinationStationId: {
            type: String,
            required: true
        },

        route: {
            type: [String],
            default: []
        },

        routeIndex: {
            type: Number,
            default: 0
        },

        position: {
            type: Number,
            default: 0,
            min: 0,
            max: 1
        },

        speed: {
            type: Number,
            default: 0
        },

        delay: {
            type: Number,
            default: 0
        },

        eta: {
            type: Number,
            default: 0
        },

        direction: {
            type: String,
            enum: Object.values(TrainDirection),
            required: true
        },

        status: {
            type: String,
            enum: Object.values(TrainStatus),
            default: TrainStatus.RUNNING
        },

        priority: {
            type: Number,
            default: 3,
            min: 1,
            max: 5
        }

    },
    {
        timestamps: true
    }
);

export default model<ITrain>("Train", TrainSchema);