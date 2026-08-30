export type ConflictSeverity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type ConflictType =
  | "TRACK_OCCUPANCY"
  | "REAR_END"
  | "HEAD_ON";

export interface Conflict {
  /** Unique conflict id */
  id: string;

  /** Trains involved */
  trainIds: string[];

  /** Track where conflict occurred */
  trackId: string;

  /** Human readable description */
  message: string;

  /** Severity level */
  severity: ConflictSeverity;

  /** Whether dispatcher resolved it */
  resolved: boolean;

  /** Timestamp */
  detectedAt?: number;

  /** Separation distance (simulation units) */
  distance?: number;

  /** Estimated time until conflict */
  estimatedTimeToConflict?: number;

  /** Nature of conflict */
  conflictType?: ConflictType;

  /** Suggested dispatcher action */
  recommendation?: string;
}