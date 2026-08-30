import mongoose from "mongoose";
import Station from "../models/Station";
import Track from "../models/Track";
import Signal, { SignalStatus } from "../models/Signal";
import Train, { TrainDirection, TrainStatus } from "../models/Train";
import TrackBlock, { BlockStatus } from "../models/TrackBlock";
import Conflict, { ConflictSeverity, ConflictType } from "../models/Conflict";
import Event, { EventType } from "../models/Event";
import env from "../config/env";
import logger from "../config/logger";

const STATIONS = [
  { stationId: "ST-NDLS", name: "New Delhi", code: "NDLS", latitude: 28.6139, longitude: 77.2090, platforms: 16, isJunction: true },
  { stationId: "ST-GWL", name: "Gwalior Junction", code: "GWL", latitude: 26.2183, longitude: 78.1828, platforms: 4, isJunction: false },
  { stationId: "ST-JHS", name: "Jhansi Junction", code: "JHS", latitude: 25.4484, longitude: 78.5685, platforms: 8, isJunction: true },
  { stationId: "ST-BPL", name: "Bhopal Junction", code: "BPL", latitude: 23.2599, longitude: 77.4126, platforms: 6, isJunction: true },
  { stationId: "ST-CSMT", name: "Mumbai CSMT", code: "CSMT", latitude: 18.9398, longitude: 72.8355, platforms: 18, isJunction: true },
  { stationId: "ST-SBC", name: "KSR Bengaluru", code: "SBC", latitude: 12.9780, longitude: 77.5696, platforms: 10, isJunction: true },
  { stationId: "ST-HWH", name: "Howrah Junction", code: "HWH", latitude: 22.5839, longitude: 88.3427, platforms: 23, isJunction: true },
  { stationId: "ST-DBRG", name: "Dibrugarh", code: "DBRG", latitude: 27.4728, longitude: 94.9120, platforms: 5, isJunction: false },
  { stationId: "ST-MAS", name: "Chennai Central", code: "MAS", latitude: 13.0827, longitude: 80.2707, platforms: 12, isJunction: true },
  { stationId: "ST-HYB", name: "Hyderabad", code: "HYB", latitude: 17.3850, longitude: 78.4867, platforms: 6, isJunction: true },
  { stationId: "ST-PUNE", name: "Pune Junction", code: "PUNE", latitude: 18.5204, longitude: 73.8567, platforms: 6, isJunction: true },
  { stationId: "ST-UD", name: "Udupi", code: "UD", latitude: 13.3409, longitude: 74.7421, platforms: 3, isJunction: false },
];

const TRACKS = [
  { trackId: "TK-CSMT-BPL", name: "Central Main Line (CSMT-BPL)", sourceStationId: "ST-CSMT", destinationStationId: "ST-BPL", distanceKm: 830, isOccupied: true },
  { trackId: "TK-BPL-JHS", name: "North-South Line (BPL-JHS)", sourceStationId: "ST-BPL", destinationStationId: "ST-JHS", distanceKm: 290, isOccupied: true },
  { trackId: "TK-JHS-GWL", name: "North Corridor (JHS-GWL)", sourceStationId: "ST-JHS", destinationStationId: "ST-GWL", distanceKm: 100, isOccupied: true },
  { trackId: "TK-GWL-NDLS", name: "Capital Radial (GWL-NDLS)", sourceStationId: "ST-GWL", destinationStationId: "ST-NDLS", distanceKm: 310, isOccupied: true },
  { trackId: "TK-SBC-HYB", name: "Deccan Route (SBC-HYB)", sourceStationId: "ST-SBC", destinationStationId: "ST-HYB", distanceKm: 570, isOccupied: true },
  { trackId: "TK-HYB-BPL", name: "Telangana Express Line (HYB-BPL)", sourceStationId: "ST-HYB", destinationStationId: "ST-BPL", distanceKm: 500, isOccupied: false },
  { trackId: "TK-HWH-JHS", name: "Eastern Link (HWH-JHS)", sourceStationId: "ST-HWH", destinationStationId: "ST-JHS", distanceKm: 1100, isOccupied: true },
  { trackId: "TK-DBRG-HWH", name: "Northeast Trunk (DBRG-HWH)", sourceStationId: "ST-DBRG", destinationStationId: "ST-HWH", distanceKm: 1400, isOccupied: true },
  { trackId: "TK-MAS-HYB", name: "Coromandel Link (MAS-HYB)", sourceStationId: "ST-MAS", destinationStationId: "ST-HYB", distanceKm: 620, isOccupied: false },
  { trackId: "TK-PUNE-BPL", name: "Western Diagonal (PUNE-BPL)", sourceStationId: "ST-PUNE", destinationStationId: "ST-BPL", distanceKm: 780, isOccupied: false },
];

const SIGNALS = [
  { signalId: "SIG-NDLS-APPROACH", trackId: "TK-GWL-NDLS", aspect: SignalStatus.RED, isAutomatic: true, name: "NDLS Approach Signal", position: 0.9 },
  { signalId: "SIG-JHS-JUNCTION", trackId: "TK-BPL-JHS", aspect: SignalStatus.YELLOW, isAutomatic: true, name: "JHS Junction Signal", position: 0.5 },
  { signalId: "SIG-BPL-MAIN", trackId: "TK-CSMT-BPL", aspect: SignalStatus.GREEN, isAutomatic: true, name: "BPL Main Signal", position: 0.8 },
  { signalId: "SIG-HWH-APPROACH", trackId: "TK-HWH-JHS", aspect: SignalStatus.GREEN, isAutomatic: true, name: "HWH Approach Signal", position: 0.6 },
];

const BLOCKS = [
  { blockId: "BLK-NDLS-01", trackId: "TK-GWL-NDLS", startKm: 290, endKm: 310, status: BlockStatus.OCCUPIED, occupiedByTrain: "12951" },
  { blockId: "BLK-NDLS-02", trackId: "TK-GWL-NDLS", startKm: 280, endKm: 290, status: BlockStatus.OCCUPIED, occupiedByTrain: "12424" },
  { blockId: "BLK-JHS-01", trackId: "TK-BPL-JHS", startKm: 250, endKm: 290, status: BlockStatus.OCCUPIED, occupiedByTrain: "12627" },
];

const TRAINS = [
  {
    trainNumber: "12951",
    name: "Mumbai Rajdhani Exp",
    currentTrackId: "TK-GWL-NDLS",
    sourceStationId: "ST-CSMT",
    currentStationId: "ST-GWL",
    nextStationId: "ST-NDLS",
    destinationStationId: "ST-NDLS",
    route: ["ST-CSMT", "ST-BPL", "ST-JHS", "ST-GWL", "ST-NDLS"],
    routeIndex: 3,
    position: 0.85,
    speed: 85,
    delay: 0,
    eta: 20.25,
    direction: TrainDirection.UP,
    status: TrainStatus.RUNNING,
    priority: 1,
  },
  {
    trainNumber: "12627",
    name: "Karnataka Exp",
    currentTrackId: "TK-BPL-JHS",
    sourceStationId: "ST-SBC",
    currentStationId: "ST-BPL",
    nextStationId: "ST-JHS",
    destinationStationId: "ST-NDLS",
    route: ["ST-SBC", "ST-HYB", "ST-BPL", "ST-JHS", "ST-GWL", "ST-NDLS"],
    routeIndex: 2,
    position: 0.70,
    speed: 72,
    delay: 18,
    eta: 19.70,
    direction: TrainDirection.UP,
    status: TrainStatus.DELAYED,
    priority: 2,
  },
  {
    trainNumber: "16382",
    name: "Netravati Exp",
    currentTrackId: "TK-CSMT-BPL",
    sourceStationId: "ST-UD",
    currentStationId: "ST-CSMT",
    nextStationId: "ST-BPL",
    destinationStationId: "ST-NDLS",
    route: ["ST-UD", "ST-CSMT", "ST-BPL", "ST-JHS", "ST-NDLS"],
    routeIndex: 1,
    position: 0.40,
    speed: 90,
    delay: 5,
    eta: 18.90,
    direction: TrainDirection.UP,
    status: TrainStatus.RUNNING,
    priority: 3,
  },
  {
    trainNumber: "12424",
    name: "Dibrugarh Rajdhani",
    currentTrackId: "TK-GWL-NDLS",
    sourceStationId: "ST-DBRG",
    currentStationId: "ST-GWL",
    nextStationId: "ST-NDLS",
    destinationStationId: "ST-NDLS",
    route: ["ST-DBRG", "ST-HWH", "ST-JHS", "ST-GWL", "ST-NDLS"],
    routeIndex: 3,
    position: 0.82,
    speed: 60,
    delay: 32,
    eta: 21.16,
    direction: TrainDirection.UP,
    status: TrainStatus.DELAYED,
    priority: 1,
  },
  {
    trainNumber: "22810",
    name: "Howrah Mail",
    currentTrackId: "TK-HWH-JHS",
    sourceStationId: "ST-HWH",
    currentStationId: "ST-HWH",
    nextStationId: "ST-JHS",
    destinationStationId: "ST-NDLS",
    route: ["ST-HWH", "ST-JHS", "ST-NDLS"],
    routeIndex: 0,
    position: 0.55,
    speed: 80,
    delay: 0,
    eta: 17.90,
    direction: TrainDirection.UP,
    status: TrainStatus.RUNNING,
    priority: 3,
  },
  {
    trainNumber: "12009",
    name: "Shatabdi Exp",
    currentTrackId: "TK-GWL-NDLS",
    sourceStationId: "ST-NDLS",
    currentStationId: "ST-NDLS",
    nextStationId: "ST-GWL",
    destinationStationId: "ST-BPL",
    route: ["ST-NDLS", "ST-GWL", "ST-BPL"],
    routeIndex: 0,
    position: 0.30,
    speed: 110,
    delay: 0,
    eta: 16.58,
    direction: TrainDirection.DOWN,
    status: TrainStatus.RUNNING,
    priority: 1,
  },
  {
    trainNumber: "11078",
    name: "Jhelum Exp",
    currentTrackId: "TK-PUNE-BPL",
    sourceStationId: "ST-PUNE",
    currentStationId: "ST-PUNE",
    nextStationId: "ST-BPL",
    destinationStationId: "ST-NDLS",
    route: ["ST-PUNE", "ST-BPL", "ST-JHS", "ST-NDLS"],
    routeIndex: 0,
    position: 0.25,
    speed: 65,
    delay: 22,
    eta: 15.33,
    direction: TrainDirection.UP,
    status: TrainStatus.DELAYED,
    priority: 4,
  },
  {
    trainNumber: "22861",
    name: "Chennai Exp",
    currentTrackId: "TK-MAS-HYB",
    sourceStationId: "ST-MAS",
    currentStationId: "ST-MAS",
    nextStationId: "ST-HYB",
    destinationStationId: "ST-NDLS",
    route: ["ST-MAS", "ST-HYB", "ST-BPL", "ST-NDLS"],
    routeIndex: 0,
    position: 0.60,
    speed: 78,
    delay: 5,
    eta: 14.66,
    direction: TrainDirection.UP,
    status: TrainStatus.RUNNING,
    priority: 3,
  },
];

export async function seedDatabase() {
  try {
    logger.info("Seed", "Seeding initial Indian Railways operational state...");

    await Station.deleteMany({});
    await Track.deleteMany({});
    await Signal.deleteMany({});
    await TrackBlock.deleteMany({});
    await Train.deleteMany({});
    await Conflict.deleteMany({});
    await Event.deleteMany({});

    await Station.insertMany(STATIONS);
    await Track.insertMany(TRACKS);
    await Signal.insertMany(SIGNALS);
    await TrackBlock.insertMany(BLOCKS);
    await Train.insertMany(TRAINS);

    // Initial Conflict Scenario between 12951 and 12424
    await Conflict.create({
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
      detectedAt: new Date(),
    });

    await Event.create({
      type: EventType.CONFLICT_DETECTED,
      title: "Conflict Detected at NDLS Junction",
      description: "Train 12951 and 12424 have conflicting paths on section S12A near NDLS Junction.",
      metadata: {
        eventId: "EV-001",
        severity: "HIGH",
        trainId: "12951",
        stationId: "ST-NDLS",
      },
    });

    logger.info("Seed", "Database seeded successfully!");
  } catch (error) {
    logger.error("Seed", error);
  }
}
