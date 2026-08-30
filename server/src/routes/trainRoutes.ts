import { Router } from "express";

import {
    createTrain,
    deleteTrain,
    getAllTrains,
    getTrainById,
    updateTrain
} from "../controllers/trainController";

const router = Router();

router.get("/", getAllTrains);

router.get("/:id", getTrainById);

router.post("/", createTrain);

router.put("/:id", updateTrain);

router.delete("/:id", deleteTrain);

export default router;