import { Router } from "express";
import {
    getAllSignals,
    updateSignal
} from "../controllers/signalController";

const router = Router();

router.get("/", getAllSignals);

router.put("/:id", updateSignal);

export default router;