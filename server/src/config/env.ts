import dotenv from "dotenv";

dotenv.config();

interface Environment {
  NODE_ENV: "development" | "production" | "test";

  PORT: number;

  MONGODB_URI: string;

  CLIENT_URL: string;

  JWT_SECRET: string;

  JWT_EXPIRES_IN: string;

  REFRESH_TOKEN_SECRET: string;

  REFRESH_TOKEN_EXPIRES_IN: string;

  LOG_LEVEL: "error" | "warn" | "info" | "http" | "debug";

  SIMULATION_TICK_MS: number;

  GEMINI_API_KEY?: string;
}

const env: Environment = {
  NODE_ENV: (process.env.NODE_ENV as Environment["NODE_ENV"]) || "development",

  PORT: Number(process.env.PORT) || 5000,

  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/railoptix",

  CLIENT_URL:
    process.env.CLIENT_URL ||
    "http://localhost:3000",

  JWT_SECRET:
    process.env.JWT_SECRET ||
    "RailOptixSuperSecretKey",

  JWT_EXPIRES_IN:
    process.env.JWT_EXPIRES_IN ||
    "1d",

  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET ||
    "RailOptixRefreshSecret",

  REFRESH_TOKEN_EXPIRES_IN:
    process.env.REFRESH_TOKEN_EXPIRES_IN ||
    "7d",

  LOG_LEVEL:
    (process.env.LOG_LEVEL as Environment["LOG_LEVEL"]) ||
    "info",

  SIMULATION_TICK_MS:
    Number(process.env.SIMULATION_TICK_MS) || 1000,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
};

export default env;