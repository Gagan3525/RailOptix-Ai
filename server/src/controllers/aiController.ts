import { Request, Response } from "express";
import aiService from "../services/aiService";

export const getRecommendations = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const recommendations = await aiService.getRecommendations();
        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ message: "Failed to generate AI recommendations", error: err });
    }
};

export const chatQuery = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { prompt } = req.body;
        const result = await aiService.processChatQuery(prompt || "");
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Failed to process AI chat query", error: err });
    }
};