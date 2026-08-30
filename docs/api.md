# Express REST API Reference — RailOptix-AI

---

## 1. Trains API (`/api/trains`)

### `GET /api/trains`
- **Description**: Returns array of all monitored trains.
- **Response `200 OK`**:
```json
[
  {
    "_id": "66d21e80a...",
    "trainNumber": "12951",
    "name": "Mumbai Rajdhani Exp",
    "currentTrackId": "TK-GWL-NDLS",
    "sourceStationId": "ST-CSMT",
    "currentStationId": "ST-GWL",
    "nextStationId": "ST-NDLS",
    "destinationStationId": "ST-NDLS",
    "route": ["ST-CSMT", "ST-BPL", "ST-JHS", "ST-GWL", "ST-NDLS"],
    "position": 0.85,
    "speed": 85,
    "delay": 0,
    "eta": 20.25,
    "status": "RUNNING"
  }
]
```

### `GET /api/trains/:id`
- **Description**: Returns detailed train data matching `trainNumber` or MongoDB `_id`.
- **Response `200 OK`**: Single Train Object
- **Error `404 Not Found`**: `{ "message": "Train not found" }`

---

## 2. Conflicts API (`/api/conflicts`)

### `GET /api/conflicts`
- **Description**: Returns all active and historic conflicts.

### `PATCH /api/conflicts/:id/resolve`
- **Description**: Marks conflict as resolved and removes it from active simulation broadcasts.
- **Response `200 OK`**: Updated Conflict Object

---

## 3. Signals & Events APIs

### `GET /api/signals`
- **Description**: Returns array of all railway track signals and current aspect states (RED, YELLOW, GREEN).

### `GET /api/events`
- **Description**: Returns recent 100 operational event logs.

---

## 4. AI & Assistant API (`/api/ai`)

### `GET /api/ai/recommendations`
- **Description**: Evaluates candidate actions over current railway state and returns structured recommendations.

### `POST /api/ai/chat`
- **Request Body**:
```json
{
  "prompt": "Why is Train 12627 delayed?"
}
```
- **Response `200 OK`**:
```json
{
  "answer": "Train 12627 (Karnataka Exp) is currently delayed by 18 minutes due to track congestion near Jhansi Junction...",
  "relatedTrains": ["12627"],
  "confidence": 0.95
}
```
