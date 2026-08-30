import { Schema, model, Document } from "mongoose";

export enum ConflictSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum ConflictType {
  REAR_END = "REAR_END",
  HEAD_ON = "HEAD_ON",
  SIGNAL = "SIGNAL",
  TRACK_OCCUPANCY = "TRACK_OCCUPANCY",
}

export interface IConflict extends Document {

  conflictId: string;

  trainA: string;
  trainB: string;

  trackId: string;

  type: ConflictType;

  severity: ConflictSeverity;

  distance: number;

  eta: number;

  recommendation: string;

  resolved: boolean;

  detectedAt: Date;

  resolvedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const ConflictSchema = new Schema<IConflict>(
  {

    conflictId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    trainA: {
      type: String,
      required: true,
      index: true,
    },

    trainB: {
      type: String,
      required: true,
      index: true,
    },

    trackId: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: Object.values(ConflictType),
      required: true,
    },

    severity: {
      type: String,
      enum: Object.values(ConflictSeverity),
      required: true,
    },

    distance: {
      type: Number,
      required: true,
    },

    eta: {
      type: Number,
      required: true,
    },

    recommendation: {
      type: String,
      required: true,
    },

    resolved: {
      type: Boolean,
      default: false,
      index: true,
    },

    detectedAt: {
      type: Date,
      default: Date.now,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },

  },
  {
    timestamps: true,
  }
);

export default model<IConflict>("Conflict", ConflictSchema);