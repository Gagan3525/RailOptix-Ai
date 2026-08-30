import http from "http";
import app from "./app";
import env from "./config/env";
import logger from "./config/logger";
import database from "./config/database";
import socketManager from "./config/socket";
import simulationService from "./services/simulationService";

async function startServer() {
    try {
        await database.connect();

        const server = http.createServer(app);
        socketManager.initialize(server);
        await simulationService.initialize();

        server.listen(env.PORT, () => {
            logger.info(
                "Server",
                `Server running on port ${env.PORT}`
            );
        });
    } catch (error) {
        logger.error(
            "Server",
            error
        );
        process.exit(1);
    }
}

startServer();