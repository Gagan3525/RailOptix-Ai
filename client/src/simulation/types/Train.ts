export type TrainStatus =
  | "RUNNING"
  | "STOPPED"
  | "WAITING_SIGNAL"
  | "DELAYED"
  | "ARRIVED";

export type TrainDirection =
  | "UP"
  | "DOWN";

export interface Train {

  /** Internal unique id */
  id: string;

  /** Railway train number */
  trainNumber: string;

  /** Public train name */
  name: string;

  /** Current track id */
  currentTrackId: string;

  /** Previous station */
  fromStationId: string;

  /** Destination station */
  toStationId: string;

  /**
   * Position on current track
   * 0 = beginning
   * 1 = end
   */
  position: number;

  /** km/h */
  speed: number;

  /** Maximum allowed speed */
  maxSpeed: number;

  /** Minutes behind schedule */
  delay: number;

  /** Passenger load (%) */
  occupancy: number;

  /** Direction */
  direction: TrainDirection;

  /** Current operational status */
  status: TrainStatus;

  /** Optional station & route properties from backend */
  sourceStationId?: string;
  currentStationId?: string;
  nextStationId?: string;
  destinationStationId?: string;
  route?: string[];
  eta?: number;

  /** Last update timestamp */
  updatedAt: number;
}