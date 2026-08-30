# RailOptix-AI

An AI-powered railway operations and decision-support platform for real-time monitoring, simulation, conflict detection, optimization, and intelligent recommendations.

---

## 1. Project Overview

**RailOptix-AI** is a B2B SaaS Railway Operations Intelligence and Decision-Support Platform designed to monitor real-time train telemetry, visualize railway network state across Indian corridors, detect operational track conflicts, analyze delays, provide AI-assisted operational reasoning via Google Gemini, and execute operator actions in real time.

The platform connects MongoDB, a Node.js simulation engine, Socket.IO WebSockets, and a glassmorphic React UI into a single-source-of-truth operational loop.

---

## 2. Problem Statement

Modern railway dispatching and operational management face severe challenges:
- **Complex Train Movements**: Managing dozens of high-speed passenger expresses, superfast trains, and freight traffic on shared corridors.
- **Cascading Delays**: A 15-minute delay on a single train propagating downstream to multiple trailing trains due to headway congestion.
- **Junction & Platform Conflicts**: Concurrent arrivals at major junctions (e.g. New Delhi, Bhopal, Jhansi) causing station blockages.
- **Fragmented Data**: Operators having to piece together signal statuses, track occupancy, and schedules across disparate screens.

*Note: RailOptix-AI is an operational platform prototype currently powered by a high-fidelity Indian Railways simulation engine, designed to integrate with real-time railway APIs (such as NTES/FOIS feeds) in production.*

---

## 3. Solution & Product Loop

RailOptix-AI unifies observation, simulation, conflict detection, AI reasoning, and operator interaction:

```
LIVE/SIMULATED TRAIN DATA ──► RAILWAY NETWORK STATE ──► TRAIN MOVEMENT
                                                            │
OPERATOR ACTION ◄── EXPLAINABLE RECOMMENDATION ◄── GEMINI AI ◄── CONFLICT ENGINE
```

---

## 4. Key Features

- **Cinematic Command Center Dashboard**: Real-time operational hero interface with dark Indian Railways locomotive imagery, top navigation, global search, live map glass card, AI recommendation card, and live metrics strip.
- **Live Interactive Network Map**: SVG India railway network visualization rendering major stations (NDLS, CSMT, BPL, JHS, GWL, SBC, HWH, DBRG, MAS, HYB, PUNE, UD), route lines, and moving train nodes color-coded by delay severity.
- **Operational Train Management**: Complete list of running trains with search, zone & status filtering (On Time, Delayed, Held, Cancelled), speed, next stop, and ETA.
- **Deterministic Conflict Detection Engine**: Automated detection of track occupancy conflicts and headway violations (e.g., Train 12951 vs Train 12424 approaching NDLS Junction).
- **Candidate Action Optimization**: Evaluates candidate operational actions (Hold Train, Reroute, Speed Reduction, Platform Adjustment) based on train priority and delay impact.
- **Google Gemini AI Reasoning**: Generates structured, explainable recommendations (`{ recommendation, reason, expectedImpact, confidence }`) and powers an interactive AI Assistant (`POST /api/ai/chat`).
- **Single Source of Truth WebSockets**: Socket.IO broadcasts authoritative state updates (`simulation:update`) to all connected UI views without browser page refreshes.

---

## 5. Technology Stack

- **Frontend**: React (v19), TypeScript, Tailwind CSS, Zustand, React Router DOM (v7), Lucide Icons, Socket.IO Client.
- **Backend**: Node.js, Express.js (v5), TypeScript, Mongoose, Socket.IO Server.
- **Database**: MongoDB (Local or MongoDB Atlas).
- **AI Integration**: Google Gemini API via Node.js backend.
- **Real-Time Layer**: WebSockets / Socket.IO.

---

## 6. Architecture & Data Flow

```
                      ┌─────────────────────────┐
                      │    MongoDB Database     │
                      └────────────▲────────────┘
                                   │ Mongoose
                                   ▼
                      ┌─────────────────────────┐
                      │ Railway Simulation      │
                      │ & Movement Engine       │
                      └────────────┬────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
         ┌────────────────────┐        ┌────────────────────┐
         │  Conflict Engine   │        │ Decision Engine    │
         └─────────┬──────────┘        └─────────┬──────────┘
                   │                             │
                   └──────────────┬──────────────┘
                                  ▼
                       ┌─────────────────────┐
                       │  Gemini AI Service  │
                       └──────────┬──────────┘
                                  ▼
                       ┌─────────────────────┐
                       │  Socket.IO Server   │
                       └──────────┬──────────┘
                                  │ "simulation:update"
                                  ▼
                       ┌─────────────────────┐
                       │    React UI State   │
                       └─────────────────────┘
```

---

## 7. Operational Status Matrix

| Component | Implementation Status | Data Source |
|---|---|---|
| **Command Center Dashboard** | Implemented | MongoDB / WebSockets |
| **Network Page Map** | Implemented | MongoDB / WebSockets |
| **Trains Table & Search** | Implemented | MongoDB / REST API |
| **Train Details View** | Implemented | MongoDB / REST API |
| **Alerts Feed** | Implemented | Conflict Engine / WebSockets |
| **Analytics Overview** | Implemented | Backend Analytics Service |
| **AI Assistant Chat** | Implemented | Gemini API & Live State |
| **Settings & Profile** | Implemented | React Component State |
| **Railway Simulation** | Implemented | Node.js Backend Ticker |
| **Conflict Detection** | Implemented | Deterministic Track Math |
| **Candidate Optimization** | Implemented | Rule-Based Evaluator |
| **Google Gemini API** | Implemented | Express Backend Proxy |
| **RAG Architecture** | Planned / Architecture Ready | Knowledge Vector Store |
| **AWS Cloud Infrastructure** | Out of Scope | Local / On-Premise |
| **Mobile App (Flutter)** | Out of Scope | Web Application Only |

---

## 8. Installation & Setup Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB (Running locally on `mongodb://127.0.0.1:27017/railoptix` or MongoDB Atlas)

### Step 1: Clone Repository & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/Gagan3525/RailOptix-Ai.git
cd RailOptix-Ai

# Install Backend Dependencies
cd server
npm install

# Install Frontend Dependencies
cd ../client
npm install
```

### Step 2: Configure Environment Variables

Create `server/.env` file:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/railoptix
CLIENT_URL=http://localhost:3000
LOG_LEVEL=info
SIMULATION_TICK_MS=1000
GEMINI_API_KEY=your_actual_gemini_api_key
```

### Step 3: Run the System

```bash
# Terminal 1: Start Node.js Backend Server
cd server
npm run dev

# Terminal 2: Start React Frontend Client
cd client
npm start
```

Open your browser at **`http://localhost:3000`**.

---

## 9. Documentation Sitemap

Explore comprehensive technical documentation in the [`docs/`](./docs) folder:

- [System Overview](./docs/system-overview.md)
- [Architecture & Data Flow](./docs/architecture.md)
- [Frontend Guide](./docs/frontend.md)
- [Backend Engine Guide](./docs/backend.md)
- [Database & Schemas](./docs/database.md)
- [REST API Specifications](./docs/api.md)
- [Real-Time WebSocket Architecture](./docs/realtime.md)
- [Railway Simulation Engine](./docs/simulation.md)
- [Conflict Detection Engine](./docs/conflict-detection.md)
- [Optimization & Candidate Action Engine](./docs/optimization.md)
- [AI & Gemini Integration](./docs/ai.md)
- [RAG Architecture Specification](./docs/rag.md)
- [UI/UX Design System](./docs/ui-ux.md)
- [Testing & Quality Assurance](./docs/testing.md)
- [Troubleshooting & FAQ](./docs/troubleshooting.md)
- [Development Guide](./docs/development.md)
- [Product Roadmap](./docs/roadmap.md)
- [Contributing Guide](./docs/contributing.md)

---

## 10. License & Credits

Built as an AI-Powered B2B SaaS Railway Operations Intelligence platform using MERN Stack and Google Gemini.
