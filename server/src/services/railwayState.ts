import Train, { ITrain } from "../models/Train";
import Signal, { ISignal } from "../models/Signal";
import Track, { ITrack } from "../models/Track";
import Station, { IStation } from "../models/Station";
import Conflict, { IConflict, ConflictSeverity, ConflictType } from "../models/Conflict";
import Event, { IEvent } from "../models/Event";
import TrackBlock, { ITrackBlock } from "../models/TrackBlock";
import { seedDatabase, STATIONS, TRACKS, SIGNALS, BLOCKS, TRAINS } from "../seed/seed";
import database from "../config/database";

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
        if (database.isConnected()) {
            try {
                this.trains = await Train.find();
                if (this.trains.length === 0) {
                    await seedDatabase();
                    this.trains = await Train.find();
                }

                this.signals = await Signal.find();
                this.tracks = await Track.find();
                this.stations = await Station.find();
                this.blocks = await TrackBlock.find();
                this.conflicts = await Conflict.find({ resolved: false });
                this.events = await Event.find().sort({ createdAt: -1 }).limit(100);
            } catch (err) {
                console.warn("⚠️ Failed to load state from MongoDB, loading in-memory defaults:", err);
                this.loadInMemoryDefaults();
            }
        } else {
            console.log("ℹ️ MongoDB not connected. Initializing in-memory railway state...");
            this.loadInMemoryDefaults();
        }

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

    private loadInMemoryDefaults(): void {
        this.stations = STATIONS.map(s => new Station(s));
        this.tracks = TRACKS.map(t => new Track(t));
        this.signals = SIGNALS.map(s => new Signal(s));
        this.blocks = BLOCKS.map(b => new TrackBlock(b));
        this.trains = TRAINS.map(t => new Train(t));

        this.conflicts = [
            new Conflict({
                conflictId: "CONF-NDLS-12951-12424",
                trainA: "12951",
                trainB: "12424",
                trackId: "TK-GWL-NDLS",
                type: ConflictType.TRACK_OCCUPANCY,
                severity: ConflictSeverity.CRITICAL,
                distance: 2.4,
                eta: 4.5,
                recommendation: "Hold Train 12951 for 8 mins at NDLS Junction to avoid conflict with Train 12424.",
                resolved: false,
                detectedAt: new Date()
            })
        ];
        this.events = [];
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
        return this.trains.filter(train => this.dirtyTrainIds.has(train.trainNumber));
    }

    getDirtySignals(): ISignal[] {
        return this.signals.filter(signal => this.dirtySignalIds.has(signal.signalId));
    }

    getDirtyTracks(): ITrack[] {
        return this.tracks.filter(track => this.dirtyTrackIds.has(track.trackId));
    }

    getDirtyBlocks(): ITrackBlock[] {
        return this.blocks.filter(block => this.dirtyBlockIds.has(block.blockId));
    }

    clearDirtyObjects(): void {
        this.dirtyTrainIds.clear();
        this.dirtySignalIds.clear();
        this.dirtyTrackIds.clear();
        this.dirtyBlockIds.clear();
    }
}

export default new RailwayState();