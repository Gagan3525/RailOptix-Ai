import { Router } from "express";
import {
    getConflicts,
    resolveConflict
} from "../controllers/conflictController";

const router = Router();

router.get("/", getConflicts);

router.patch("/:id/resolve", resolveConflict);

export default router;