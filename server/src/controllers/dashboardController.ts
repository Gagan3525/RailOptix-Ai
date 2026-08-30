import { Request, Response } from "express";

import analyticsService from "../services/analyticsService";
import railwayState from "../services/railwayState";

export const getDashboard = (

    req: Request,

    res: Response

): void => {

    res.json({

        analytics: analyticsService.getDashboardMetrics(),

        trains: railwayState.trains,

        tracks: railwayState.tracks,

        blocks: railwayState.blocks,

        stations: railwayState.stations,

        signals: railwayState.signals,

        conflicts: railwayState.conflicts,

        events: railwayState.events

    });

};