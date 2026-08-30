import { Conflict } from "./Conflict";
import { Signal } from "./Signal";
import { Station } from "./Station";
import { Track } from "./Track";
import { Train } from "./Train";

export interface AIDecision {
  recommendation: string;
  confidence: number;
}

export interface SimulationState {
  stations: Station[];
  tracks: Track[];
  trains: Train[];
  signals: Signal[];
  conflicts: Conflict[];

  aiDecision: AIDecision;

  currentTick: number;

  isRunning: boolean;

  lastUpdated: number;
}