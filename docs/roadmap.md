# Product Roadmap — RailOptix-AI

---

## Current Status (v1.0.0) — COMPLETED
- [x] Complete MERN Stack Application (React v19 + Node Express v5 + MongoDB).
- [x] Node.js authoritative railway simulation engine.
- [x] Socket.IO single-source-of-truth real-time WebSockets.
- [x] 8 Application pages matching dark glassmorphism design reference.
- [x] Deterministic track conflict detection engine.
- [x] Google Gemini AI reasoning & chat integration (`POST /api/ai/chat`).

---

## Planned Future Roadmap (v2.0+)

### Phase 1: Real-Time Railway Data Integration
- Integration adapters for live NTES / FOIS Indian Railways telemetry API feeds.
- Automatic fallback between live API feeds and simulation engine.

### Phase 2: RAG Vector Knowledge Base
- Ingestion of Indian Railways General Rules & Operating Manuals into a Vector Database (Chroma / MongoDB Vector Search).
- Rule-augmented Gemini decision reasoning.

### Phase 3: Cloud Infrastructure & Mobile Ecosystem (Future Scope)
- AWS Terraform deployment scripts (ECS / EKS / DocumentDB / CloudFront).
- Flutter mobile companion app for field inspectors and station masters.
