# Database & Data Model — RailOptix-AI

---

## 1. Mongoose Schema Definitions

### Train Schema (`models/Train.ts`)
```typescript
export interface ITrain extends Document {
  trainNumber: string;        // Unique (e.g. "12951")
  name: string;               // e.g. "Mumbai Rajdhani Exp"
  currentTrackId: string;     // e.g. "TK-GWL-NDLS"
  sourceStationId: string;    // e.g. "ST-CSMT"
  currentStationId: string;   // e.g. "ST-GWL"
  nextStationId: string;      // e.g. "ST-NDLS"
  destinationStationId: string;// e.g. "ST-NDLS"
  route: string[];            // Array of station IDs
  routeIndex: number;         // Current index in route array
  position: number;           // Normalized progression (0.0 to 1.0)
  speed: number;              // km/h
  delay: number;              // Delay in minutes
  eta: number;                // Calculated ETA in hours
  direction: "UP" | "DOWN";
  status: "RUNNING" | "STOPPED" | "DELAYED" | "WAITING_SIGNAL";
  priority: number;           // Priority level (1 = highest)
  createdAt: Date;
  updatedAt: Date;
}
```

### Station Schema (`models/Station.ts`)
```typescript
export interface IStation extends Document {
  stationId: string;          // Unique (e.g. "ST-NDLS")
  name: string;               // e.g. "New Delhi"
  code: string;               // e.g. "NDLS"
  latitude: number;           // Geolocation latitude
  longitude: number;          // Geolocation longitude
  platforms: number;          // Number of platforms
  isJunction: boolean;        // Junction indicator flag
}
```

### Track Schema (`models/Track.ts`)
```typescript
export interface ITrack extends Document {
  trackId: string;            // Unique (e.g. "TK-GWL-NDLS")
  name: string;               // Segment description
  sourceStationId: string;    // Source station ID
  destinationStationId: string;// Destination station ID
  distanceKm: number;         // Track distance in kilometers
  isOccupied: boolean;        // Occupancy indicator
}
```

### Signal Schema (`models/Signal.ts`)
```typescript
export interface ISignal extends Document {
  signalId: string;           // Unique (e.g. "SIG-NDLS-APPROACH")
  name: string;               // Signal name
  trackId: string;            // Track ID
  position: number;           // Normalized position on track (0.0 - 1.0)
  direction: "UP" | "DOWN" | "BOTH";
  status: "RED" | "YELLOW" | "GREEN";
  isAutomatic: boolean;
}
```

### Conflict Schema (`models/Conflict.ts`)
```typescript
export interface IConflict extends Document {
  conflictId: string;         // Unique (e.g. "CONF-NDLS-12951-12424")
  trainA: string;             // Train A number
  trainB: string;             // Train B number
  trackId: string;            // Track ID
  type: "REAR_END" | "HEAD_ON" | "SIGNAL" | "TRACK_OCCUPANCY";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  distance: number;           // Separation distance
  eta: number;                // Estimated time to conflict
  recommendation: string;     // Dispatcher recommendation text
  resolved: boolean;          // Resolution flag
  detectedAt: Date;
  resolvedAt?: Date;
}
```

---

## 2. Seed Data Architecture

When the server boots, `railwayState.load()` queries MongoDB. If zero trains exist, `seedDatabase()` runs automatically, seeding:
- **12 Stations**: NDLS, GWL, JHS, BPL, CSMT, SBC, HWH, DBRG, MAS, HYB, PUNE, UD.
- **10 Tracks**: Interconnecting main Indian Railways lines.
- **4 Signals**: Block signals monitoring approach sections.
- **8 Trains**: 12951 Mumbai Rajdhani, 12627 Karnataka Exp, 16382 Netravati Exp, 12424 Dibrugarh Rajdhani, 22810 Howrah Mail, 12009 Shatabdi Exp, 11078 Jhelum Exp, 22861 Chennai Exp.
- **1 Initial Conflict**: Operational conflict scenario between 12951 and 12424 at NDLS Junction.
