import { Request, Response } from "express";
import Station from "../models/Station";
import Track from "../models/Track";
import railwayState from "../services/railwayState";

export const getNetwork = async (_: Request, res: Response): Promise<void> => {
  try {
    const stations = await Station.find();
    const tracks = await Track.find();

    res.status(200).json({
      stations,
      tracks,
      trains: railwayState.trains,
      signals: railwayState.signals,
      conflicts: railwayState.conflicts
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch network state", error: err });
  }
};
