import mongoose from "mongoose";
import env from "./env";

mongoose.set("strictQuery", true);

class Database {
  private connected = false;

  public async connect(): Promise<void> {
    if (this.connected) {
      console.log("🟢 Database already connected.");
      return;
    }

    try {
      // Connect with 3-second server selection timeout to avoid long blocking
      await mongoose.connect(env.MONGODB_URI, {
        serverSelectionTimeoutMS: 3000,
      });

      this.connected = true;

      console.log("====================================");
      console.log("✅ MongoDB Connected Successfully");
      console.log(`📍 Database : ${mongoose.connection.name}`);
      console.log(`🌐 Host     : ${mongoose.connection.host}`);
      console.log("====================================");

      this.registerEvents();
    } catch (error) {
      this.connected = false;
      console.warn("=================================================");
      console.warn("⚠️  MongoDB Connection Failed (ECONNREFUSED 127.0.0.1:27017)");
      console.warn("⚠️  Running in In-Memory Railway Simulation Mode");
      console.warn("📌  To enable MongoDB persistence, start your local MongoDB service:");
      console.warn("    PowerShell / Cmd: net start MongoDB  or  mongod");
      console.warn("=================================================");
    }
  }

  private registerEvents(): void {
    mongoose.connection.on("connected", () => {
      this.connected = true;
      console.log("🟢 MongoDB Connected");
    });

    mongoose.connection.on("reconnected", () => {
      this.connected = true;
      console.log("🟡 MongoDB Reconnected");
    });

    mongoose.connection.on("disconnected", () => {
      this.connected = false;
      console.log("🔴 MongoDB Disconnected");
    });

    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB Error:", error.message || error);
    });

    process.on("SIGINT", async () => {
      await this.disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  public async disconnect(): Promise<void> {
    if (!this.connected) return;
    await mongoose.connection.close();
    this.connected = false;
    console.log("🛑 MongoDB Connection Closed");
  }

  public isConnected(): boolean {
    return this.connected;
  }
}

export default new Database();