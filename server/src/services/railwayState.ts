import Train, { ITrain } from "../models/Train";
import Signal, { ISignal } from "../models/Signal";
import Track, { ITrack } from "../models/Track";
import Station, { IStation } from "../models/Station";
import Conflict, { IConflict } from "../models/Conflict";
import Event, { IEvent } from "../models/Event";
import TrackBlock, { ITrackBlock } from "../models/TrackBlock";
import { seedDatabase } from "../seed/seed";

class RailwayState {

    public trains: ITrain[] = [];
    public signals: ISignal[] = [];
    public tracks: ITrack[] = [];
    public stations: IStation[] = [];
    public conflicts: IConflict[] = [];
    public events: IEvent[] = [];
    public blocks: ITrackBlock[] = [];

    private dirtyTrainIds = new Set<string>();
    private dirtySignalIds = new Set<string>();
    private dirtyTrackIds = new Set<string>();
    private dirtyBlockIds = new Set<string>();

    async load(): Promise<void> {

        this.trains = await Train.find();
        if (this.trains.length === 0) {
            await seedDatabase();
            this.trains = await Train.find();
        }

        this.signals = await Signal.find();
        this.tracks = await Track.find();
        this.stations = await Station.find();
        this.blocks = await TrackBlock.find();

        this.conflicts = await Conflict.find({
            resolved: false
        });

        this.events = await Event.find()
            .sort({ createdAt: -1 })
            .limit(100);

        console.log("=================================");
        console.log("🚆 Railway State Loaded");
        console.log(`🚄 Trains    : ${this.trains.length}`);
        console.log(`🚦 Signals   : ${this.signals.length}`);
        console.log(`🛤 Tracks    : ${this.tracks.length}`);
        console.log(`🧱 Blocks    : ${this.blocks.length}`);
        console.log(`🏢 Stations  : ${this.stations.length}`);
        console.log(`⚠️ Conflicts : ${this.conflicts.length}`);
        console.log(`📋 Events    : ${this.events.length}`);
        console.log("=================================");

    }

    markTrainDirty(trainNumber: string): void {
        this.dirtyTrainIds.add(trainNumber);
    }

    markSignalDirty(signalId: string): void {
        this.dirtySignalIds.add(signalId);
    }

    markTrackDirty(trackId: string): void {
        this.dirtyTrackIds.add(trackId);
    }

    markBlockDirty(blockId: string): void {
        this.dirtyBlockIds.add(blockId);
    }

    getDirtyTrains(): ITrain[] {
        return this.trains.filter(train =>
            this.dirtyTrainIds.has(train.trainNumber)
        );
    }

    getDirtySignals(): ISignal[] {
        return this.signals.filter(signal =>
            this.dirtySignalIds.has(signal.signalId)
        );
    }

    getDirtyTracks(): ITrack[] {
        return this.tracks.filter(track =>
            this.dirtyTrackIds.has(track.trackId)
        );
    }

    getDirtyBlocks(): ITrackBlock[] {
        return this.blocks.filter(block =>
            this.dirtyBlockIds.has(block.blockId)
        );
    }

    clearDirtyObjects(): void {

        this.dirtyTrainIds.clear();
        this.dirtySignalIds.clear();
        this.dirtyTrackIds.clear();
        this.dirtyBlockIds.clear();

    }

}

export default new RailwayState();