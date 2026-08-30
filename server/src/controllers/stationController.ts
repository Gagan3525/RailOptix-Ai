import { Request, Response } from "express";
import Station from "../models/Station";

export const getAllStations = async (req: Request, res: Response): Promise<void> => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stations", error: err });
  }
};

export const getStation = async (req: Request, res: Response): Promise<void> => {
  try {
    const station = await Station.findOne({
      $or: [{ _id: req.params.id }, { stationId: req.params.id }, { code: req.params.id }]
    });

    if (!station) {
      res.status(404).json({ message: "Station not found" });
      return;
    }
    res.json(station);
  } catch (err) {
    res.status(500).json(err);
  }
};
