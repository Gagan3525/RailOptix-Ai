import { Request, Response } from "express";
import Track from "../models/Track";

export const getAllTracks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tracks", error: err });
  }
};

export const getTrack = async (req: Request, res: Response): Promise<void> => {
  try {
    const track = await Track.findOne({
      $or: [{ _id: req.params.id }, { trackId: req.params.id }]
    });

    if (!track) {
      res.status(404).json({ message: "Track not found" });
      return;
    }
    res.json(track);
  } catch (err) {
    res.status(500).json(err);
  }
};
