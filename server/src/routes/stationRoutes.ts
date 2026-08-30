import { Router } from "express";
import { getAllStations, getStation } from "../controllers/stationController";

const router = Router();

router.get("/", getAllStations);
router.get("/:id", getStation);

export default router;
