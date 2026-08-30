import { Router } from "express";
import { getAllTracks, getTrack } from "../controllers/trackController";

const router = Router();

router.get("/", getAllTracks);
router.get("/:id", getTrack);

export default router;
