import express, {
    Application,
    Request,
    Response,
    NextFunction,
} from "express";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import env from "./config/env";
import logger from "./config/logger";

const app: Application = express();

/* --------------------------------------------------
   Global Middleware
--------------------------------------------------- */

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    })
);

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

/* --------------------------------------------------
   HTTP Request Logging
--------------------------------------------------- */

app.use(
    morgan("dev", {
        stream: {
            write: (message: string) => {
                logger.http(
                    "HTTP",
                    message.trim()
                );
            },
        },
    })
);

/* --------------------------------------------------
   Health Check
--------------------------------------------------- */

app.get(
    "/health",
    (
        req: Request,
        res: Response
    ) => {

        res.status(200).json({

            success: true,

            service: "RailOptix-AI Backend",

            status: "Healthy",

            environment: env.NODE_ENV,

            timestamp: new Date(),

        });

    }
);

import trainRoutes from "./routes/trainRoutes";
import signalRoutes from "./routes/signalRoutes";
import conflictRoutes from "./routes/conflictRoutes";
import eventRoutes from "./routes/eventRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import aiRoutes from "./routes/aiRoutes";

/* --------------------------------------------------
   API Routes
--------------------------------------------------- */

app.use("/api/trains", trainRoutes);
app.use("/api/signals", signalRoutes);
app.use("/api/conflicts", conflictRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

/* --------------------------------------------------
   404 Handler
--------------------------------------------------- */

app.use(
    (
        req: Request,
        res: Response
    ) => {

        logger.warn(
            "HTTP",
            `404 ${req.method} ${req.originalUrl}`
        );

        res.status(404).json({

            success: false,

            message: "Route Not Found",

        });

    }
);

/* --------------------------------------------------
   Global Error Handler
--------------------------------------------------- */

app.use(
    (
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        logger.error(
            "Express",
            error
        );

        res.status(500).json({

            success: false,

            message:
                env.NODE_ENV === "development"
                    ? error.message
                    : "Internal Server Error",

        });

    }
);

export default app;