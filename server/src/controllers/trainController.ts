import { Request, Response } from "express";
import Train from "../models/Train";

export const getAllTrains = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const trains = await Train.find();
        res.status(200).json(trains);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch trains", error: err });
    }
};

export const getTrain = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const train = await Train.findOne({
            $or: [{ _id: req.params.id }, { trainNumber: req.params.id }]
        });

        if (!train) {
            res.status(404).json({ message: "Train not found" });
            return;
        }
        res.json(train);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getTrainById = getTrain;

export const createTrain = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const train = new Train(req.body);
        await train.save();
        res.status(201).json(train);
    } catch (err) {
        res.status(400).json({ message: "Failed to create train", error: err });
    }
};

export const updateTrain = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const train = await Train.findOneAndUpdate(
            { $or: [{ _id: req.params.id }, { trainNumber: req.params.id }] },
            req.body,
            { new: true }
        );
        if (!train) {
            res.status(404).json({ message: "Train not found" });
            return;
        }
        res.json(train);
    } catch (err) {
        res.status(400).json({ message: "Failed to update train", error: err });
    }
};

export const deleteTrain = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const train = await Train.findOneAndDelete({
            $or: [{ _id: req.params.id }, { trainNumber: req.params.id }]
        });
        if (!train) {
            res.status(404).json({ message: "Train not found" });
            return;
        }
        res.json({ message: "Train deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete train", error: err });
    }
};