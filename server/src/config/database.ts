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
      await mongoose.connect(env.MONGODB_URI);

      this.connected = true;

      console.log("====================================");
      console.log("✅ MongoDB Connected Successfully");
      console.log(`📍 Database : ${mongoose.connection.name}`);
      console.log(`🌐 Host     : ${mongoose.connection.host}`);
      console.log("====================================");

      this.registerEvents();
    } catch (error) {
      console.error("❌ MongoDB Connection Failed");
      console.error(error);

      process.exit(1);
    }
  }

  private registerEvents(): void {
    mongoose.connection.on("connected", () => {
      console.log("🟢 MongoDB Connected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🟡 MongoDB Reconnected");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("🔴 MongoDB Disconnected");
    });

    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB Error");
      console.error(error);
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