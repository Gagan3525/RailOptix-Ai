import { Request, Response } from "express";
import Signal from "../models/Signal";

export const getAllSignals = async (_: Request, res: Response) => {

    try {

        const signals = await Signal.find();

        res.status(200).json(signals);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch signals",
            error,
        });

    }

};

export const updateSignal = async (req: Request, res: Response) => {

    try {

        const signal = await Signal.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!signal) {

            return res.status(404).json({
                message: "Signal not found",
            });

        }

        res.status(200).json(signal);

    } catch (error) {

        res.status(400).json({
            message: "Unable to update signal",
            error,
        });

    }

};