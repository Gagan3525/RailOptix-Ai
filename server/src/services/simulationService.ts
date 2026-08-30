import railwayState from "./railwayState";
import persistenceService from "./persistenceService";
import socketService from "./socketService";
import scheduler from "../engine/scheduler/scheduler";
import env from "../config/env";

class SimulationService {

    private tick = 0;
    private timer: NodeJS.Timeout | null = null;
    private isRunning = false;

    async initialize(): Promise<void> {
        console.log("=======================================");
        console.log("🚆 RailOptix-AI Simulation Initialized");
        console.log("=======================================");

        await railwayState.load();
        this.start();
    }

    start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        this.timer = setInterval(() => {
            this.simulationTick().catch(err => console.error("Simulation tick error:", err));
        }, env.SIMULATION_TICK_MS);
    }

    stop(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.isRunning = false;
    }

    async simulationTick(): Promise<void> {

        this.tick++;

        const start = Date.now();

        await scheduler.execute();

        await persistenceService.save();

        socketService.broadcastSimulation();

        const executionTime = Date.now() - start;

        console.log(

            `[Tick ${this.tick}] ` +
            `🚄 ${railwayState.trains.length} Trains | ` +
            `🚦 ${railwayState.signals.length} Signals | ` +
            `⚠️ ${railwayState.conflicts.length} Conflicts | ` +
            `⏱ ${executionTime} ms`

        );

    }

}

export default new SimulationService();