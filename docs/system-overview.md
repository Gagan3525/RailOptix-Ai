# System Overview — RailOptix-AI

---

## 1. Product Classification & Identity

**RailOptix-AI** is classified as an **AI-Powered B2B SaaS Railway Operations and Decision-Support Platform**.

- **Domain**: Railway Operations, Network Traffic Dispatching, Conflict Prevention, and On-Time Performance (OTP) Optimization.
- **Core System**: Operational Decision-Support System (DSS) and Network Monitoring Platform.
- **Primary Users**: Chief Train Controllers, Section Controllers, Station Masters, Dispatchers, and Operations Management Personnel.

### Why RailOptix-AI is NOT a Generic ERP or CRUD Dashboard
Unlike Enterprise Resource Planning (ERP) or generic admin panels:
1. **Authoritative Real-Time Simulation Engine**: State updates continuously tick in the backend, calculating normalized train progression, block occupancy, and signal aspect changes.
2. **Predictive Conflict Engine**: Evaluates spatial separation and headway between trains on shared tracks before physical blockages occur.
3. **AI Decision-Support System**: Leverages Google Gemini to reason over candidate operational actions and generate explainable recommendations rather than static text.

---

## 2. Platform Core Flow

The complete operational loop functions end-to-end:

```
[ MongoDB Database ]
        │
        ▼
[ Simulation Ticker (1000ms) ] ──► [ Movement & Block Engine ]
                                                │
                                                ▼
[ React Glassmorphic UI ] ◄── [ Socket.IO ] ◄── [ Conflict Engine ] ──► [ Candidate Actions ]
     (Live Updates)            ("simulation:update")                           │
                                                                               ▼
                                                                     [ Gemini AI Reasoning ]
                                                                               │
                                                                               ▼
                                                                 [ Explainable Recommendation ]
```

---

## 3. Scope Boundaries

### Included in Current Phase (v1.0.0)
- Complete MERN Stack web application (React v19 + Tailwind CSS + Node.js Express + MongoDB).
- Node.js backend simulation engine populating and moving Indian Railways trains (`12951`, `12627`, `12424`, `16382`, etc.) across main corridors (NDLS, CSMT, BPL, JHS, GWL, SBC, HWH, DBRG, MAS, HYB, PUNE, UD).
- Single-source-of-truth Socket.IO WebSocket broadcasting.
- Glassmorphic command center UI matching the visual reference design.
- AI Assistant chat endpoint (`POST /api/ai/chat`) powered by backend Gemini integration.

### Explicitly Out of Scope for Current Phase
- AWS Cloud Infrastructure / Terraform deployment scripts (Local & On-Premise NodeJS execution only).
- Flutter / iOS / Android mobile applications (Web Application only).
- Live direct feed from Indian Railways FOIS/NTES production servers (high-fidelity simulation engine used instead).
