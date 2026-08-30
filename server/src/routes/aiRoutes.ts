import { Router } from "express";
import { getRecommendations, chatQuery } from "../controllers/aiController";

const router = Router();

router.get("/", getRecommendations);
router.get("/recommendations", getRecommendations);
router.post("/chat", chatQuery);

export default router;