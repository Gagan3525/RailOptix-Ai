import util from "util";
import env from "./env";

export type LogLevel = "error" | "warn" | "info" | "http" | "debug";

class Logger {
    private readonly isDevelopment =
        env.NODE_ENV === "development";

    private readonly levels: Record<LogLevel, number> = {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    };

    private readonly currentLevel =
        this.levels[env.LOG_LEVEL];

    private shouldLog(level: LogLevel): boolean {
        return this.levels[level] <= this.currentLevel;
    }

    private timestamp(): string {
        return new Date().toISOString();
    }

    private format(data: unknown): string {
        if (data instanceof Error) {
            return data.stack ?? data.message;
        }

        if (typeof data === "object") {
            return util.inspect(data, {
                depth: null,
                colors: this.isDevelopment,
                compact: false,
            });
        }

        return String(data);
    }

    private color(level: LogLevel): string {
        if (!this.isDevelopment) return "";

        switch (level) {
            case "error":
                return "\x1b[31m";

            case "warn":
                return "\x1b[33m";

            case "info":
                return "\x1b[32m";

            case "http":
                return "\x1b[36m";

            case "debug":
                return "\x1b[35m";

            default:
                return "";
        }
    }

    private reset(): string {
        return "\x1b[0m";
    }

    private write(
        level: LogLevel,
        module: string,
        message: unknown
    ): void {
        if (!this.shouldLog(level)) return;

        const log =
            `[${this.timestamp()}] ` +
            `[${level.toUpperCase()}] ` +
            `[${module}] ` +
            this.format(message);

        const output =
            this.color(level) +
            log +
            this.reset();

        switch (level) {
            case "error":
                console.error(output);
                break;

            case "warn":
                console.warn(output);
                break;

            case "info":
                console.info(output);
                break;

            case "http":
                console.info(output);
                break;

            case "debug":
                console.debug(output);
                break;
        }
    }

    public error(module: string, message: unknown): void {
        this.write("error", module, message);
    }

    public warn(module: string, message: unknown): void {
        this.write("warn", module, message);
    }

    public info(module: string, message: unknown): void {
        this.write("info", module, message);
    }

    public http(module: string, message: unknown): void {
        this.write("http", module, message);
    }

    public debug(module: string, message: unknown): void {
        this.write("debug", module, message);
    }
}

export default new Logger();