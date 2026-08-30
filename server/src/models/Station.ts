import mongoose, { Document, Schema } from "mongoose";

export interface IStation extends Document {

    stationId: string;

    name: string;

    code: string;

    latitude: number;

    longitude: number;

    platforms: number;

    isJunction: boolean;

    createdAt: Date;

    updatedAt: Date;
}

const StationSchema = new Schema<IStation>(
{
    stationId:{
        type:String,
        required:true,
        unique:true
    },

    name:{
        type:String,
        required:true
    },

    code:{
        type:String,
        required:true,
        unique:true
    },

    latitude:{
        type:Number,
        required:true
    },

    longitude:{
        type:Number,
        required:true
    },

    platforms:{
        type:Number,
        default:2
    },

    isJunction:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

export default mongoose.model<IStation>("Station",StationSchema);