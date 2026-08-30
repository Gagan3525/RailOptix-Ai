import { Request, Response } from "express";
import Event from "../models/Event";

export const getEvents = async (_: Request, res: Response) => {

    try {

        const events = await Event.find()
            .sort({ createdAt: -1 });

        res.status(200).json(events);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch events",
            error,
        });

    }

};