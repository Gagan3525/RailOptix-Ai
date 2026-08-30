import { Request, Response } from "express";
import Conflict from "../models/Conflict";
import railwayState from "../services/railwayState";

export const getConflicts = async (_: Request, res: Response) => {

    try {

        const conflicts = await Conflict.find()
            .sort({ detectedAt: -1 });

        res.status(200).json(conflicts);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch conflicts",
            error,
        });

    }

};

export const resolveConflict = async (req: Request, res: Response) => {
    try {
        const idParam = req.params.id;
        const conflict = await Conflict.findOneAndUpdate(
            { $or: [{ _id: idParam }, { conflictId: idParam }] },
            { resolved: true, resolvedAt: new Date() },
            { new: true }
        );

        if (!conflict) {
            return res.status(404).json({
                message: "Conflict not found",
            });
        }

        // Update in-memory state
        railwayState.conflicts = railwayState.conflicts.filter(c => c.conflictId !== conflict.conflictId);

        res.status(200).json(conflict);
    } catch (error) {
        res.status(500).json({
            message: "Unable to resolve conflict",
            error,
        });
    }
};