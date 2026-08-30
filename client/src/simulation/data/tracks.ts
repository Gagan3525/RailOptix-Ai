import { Track } from "../types/Track";

export const tracks: Track[] = [
  {
    id: "TR001",
    fromStationId: "ST001",
    toStationId: "ST002",
    length: 22,
    speedLimit: 110,
    occupied: true,
  },

  {
    id: "TR002",
    fromStationId: "ST002",
    toStationId: "ST003",
    length: 78,
    speedLimit: 110,
    occupied: true,
  },

  {
    id: "TR003",
    fromStationId: "ST003",
    toStationId: "ST004",
    length: 135,
    speedLimit: 90,
    occupied: true,
  },
];