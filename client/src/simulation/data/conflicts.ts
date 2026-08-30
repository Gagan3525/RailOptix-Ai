import { Conflict } from "../types/Conflict";

export const conflicts: Conflict[] = [
  {
    id: "CF001",
    trainIds: ["T002", "T003"],
    trackId: "TR003",
    message: "Potential block occupancy conflict detected.",
    severity: "HIGH",
    resolved: false,
  },
];