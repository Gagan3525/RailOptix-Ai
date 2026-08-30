import mongoose, { Document, Schema } from "mongoose";

export enum TrackStatus {
    AVAILABLE = "AVAILABLE",
    OCCUPIED = "OCCUPIED",
    BLOCKED = "BLOCKED",
    MAINTENANCE = "MAINTENANCE"
}

export interface ITrack extends Document {

    trackId: string;

    name: string;

    fromStation: string;

    toStation: string;

    length: number;

    speedLimit: number;

    occupiedBy?: string;

    status: TrackStatus;

    createdAt: Date;

    updatedAt: Date;
}

const TrackSchema = new Schema<ITrack>(
{
    trackId:{
        type:String,
        required:true,
        unique:true
    },

    name:{
        type:String,
        required:true
    },

    fromStation:{
        type:String,
        required:true
    },

    toStation:{
        type:String,
        required:true
    },

    length:{
        type:Number,
        required:true
    },

    speedLimit:{
        type:Number,
        default:120
    },

    occupiedBy:{
        type:String,
        default:null
    },

    status:{
        type:String,
        enum:Object.values(TrackStatus),
        default:TrackStatus.AVAILABLE
    }

},
{
    timestamps:true
});

export default mongoose.model<ITrack>("Track",TrackSchema);