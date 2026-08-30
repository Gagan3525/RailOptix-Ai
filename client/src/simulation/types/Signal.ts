export type SignalAspect =
  | "RED"
  | "YELLOW"
  | "GREEN";

export interface Signal {
  id: string;

  stationId: string;

  trackId: string;

  aspect: SignalAspect;
}