import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

import env from "./env";
import logger from "./logger";

class SocketManager {
    private io: Server | null = null;

    public initialize(server: HttpServer): Server {
        if (this.io) {
            return this.io;
        }

        this.io = new Server(server, {
            cors: {
                origin: true,
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
                credentials: true,
            },

            transports: ["websocket", "polling"],
        });

        this.registerEvents();

        logger.info(
            "SocketManager",
            "Socket.IO initialized successfully."
        );

        return this.io;
    }

    private registerEvents(): void {
        if (!this.io) return;

        this.io.on("connection", (socket: Socket) => {

            logger.info(
                "SocketManager",
                `Client Connected : ${socket.id}`
            );

            socket.emit("connection:success", {
                socketId: socket.id,
                message: "Connected Successfully",
            });

            socket.on("disconnect", (reason) => {

                logger.warn(
                    "SocketManager",
                    `Client Disconnected : ${socket.id} (${reason})`
                );

            });

            socket.on("error", (error) => {

                logger.error(
                    "SocketManager",
                    error
                );

            });

        });
    }

    public getIO(): Server {

        if (!this.io) {

            throw new Error(
                "Socket.IO has not been initialized."
            );

        }

        return this.io;
    }

    public emit(
        event: string,
        data: unknown
    ): void {

        this.getIO().emit(event, data);

    }

    public emitToRoom(
        room: string,
        event: string,
        data: unknown
    ): void {

        this.getIO()
            .to(room)
            .emit(event, data);

    }

    public broadcast(
        event: string,
        data: unknown
    ): void {

        this.getIO().emit(event, data);

    }

    public connectedClients(): number {

        return this.getIO().engine.clientsCount;

    }
}

export default new SocketManager();