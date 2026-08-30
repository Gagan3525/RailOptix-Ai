import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import socketManager from "../config/socket";

export function initializeSocket(server: HttpServer): Server {
    return socketManager.initialize(server);
}

export function getIO(): Server {
    return socketManager.getIO();
}