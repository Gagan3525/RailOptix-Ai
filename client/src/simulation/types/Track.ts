export interface Track {
  id: string;

  fromStationId: string;

  toStationId: string;

  length: number;

  speedLimit: number;

  occupied: boolean;
}