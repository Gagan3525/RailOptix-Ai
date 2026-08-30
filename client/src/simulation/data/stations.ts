import { Station } from "../types/Station";

export const stations: Station[] = [
  {
    id: "ST001",
    code: "UBL",
    name: "Hubballi",
    x: 120,
    y: 220,
    platforms: 8,
    occupiedPlatforms: 3,
    zone: "South Western Railway",
  },

  {
    id: "ST002",
    code: "DWR",
    name: "Dharwad",
    x: 330,
    y: 220,
    platforms: 5,
    occupiedPlatforms: 2,
    zone: "South Western Railway",
  },

  {
    id: "ST003",
    code: "BGM",
    name: "Belagavi",
    x: 570,
    y: 220,
    platforms: 6,
    occupiedPlatforms: 4,
    zone: "South Western Railway",
  },

  {
    id: "ST004",
    code: "MAO",
    name: "Madgaon",
    x: 810,
    y: 220,
    platforms: 7,
    occupiedPlatforms: 5,
    zone: "Konkan Railway",
  },
];