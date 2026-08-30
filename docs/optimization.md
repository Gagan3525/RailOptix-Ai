# Decision & Candidate Action Optimization — RailOptix-AI

---

## 1. Candidate Action Generation Architecture

RailOptix-AI does **not** rely on raw LLM prompts to blindly guess operational decisions. Instead, it uses a 2-stage deterministic optimization architecture:

```
[ Conflict Detected ] ──► [ Stage 1: Deterministic Candidate Evaluator ] ──► [ Candidate Actions (Hold, Reroute, Speed) ]
                                                                                     │
                                                                                     ▼
[ React UI Recommendation ] ◄── [ Structured JSON Output ] ◄── [ Stage 2: Gemini AI Reasoner ]
```

---

## 2. Candidate Evaluation Logic

Candidate operational options are scored based on:
1. **Train Priority Class**: High-priority expresses (e.g. Rajdhani priority `1`) take precedence over regional expresses (priority `3`).
2. **Delay Differential**: Train with larger existing delay is given passing clearance where safe to minimize total network delay.
3. **Platform Availability**: Station track capacity at upcoming junctions (NDLS, BPL, JHS).

### Candidate Actions Spectrum
- `HOLD`: Hold trailing train at upstream junction platform for $N$ minutes.
- `REDUCE_SPEED`: Regulate running speed to open headway buffer.
- `REROUTE`: Divert trailing freight or lower priority train to loop line.
