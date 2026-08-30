import { Schema, model, Document } from "mongoose";

export enum EventType {
  TRAIN_STARTED = "TRAIN_STARTED",
  TRAIN_STOPPED = "TRAIN_STOPPED",
  SIGNAL_CHANGED = "SIGNAL_CHANGED",
  CONFLICT_DETECTED = "CONFLICT_DETECTED",
  AI_DECISION = "AI_DECISION",
}

export interface IEvent extends Document {
  type: EventType;

  title: string;

  description: string;

  metadata: Record<string, unknown>;

  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    type: {
      type: String,
      enum: Object.values(EventType),
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default model<IEvent>("Event", EventSchema);