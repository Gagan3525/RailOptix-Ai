# AI & Google Gemini Integration — RailOptix-AI

---

## 1. AI Integration Architecture

Gemini API calls are encapsulated within the Express backend (`services/aiService.ts`). The API key is stored strictly in backend environment variables (`server/.env`) and **never exposed to client-side JavaScript**.

```
[ Client UI ] ──► POST /api/ai/chat ──► [ Express AI Service ] ──► [ Google Gemini API ]
                                                  │
                                                  ▼
                                       Query Live Database State
```

---

## 2. Gemini Recommendation Payload

When evaluating conflicts or generating operational explanations, `aiService.ts` structures context into structured JSON outputs:

```typescript
export interface AIRecommendation {
  trainNumber: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  action: "CONTINUE" | "STOP" | "REROUTE" | "REDUCE_SPEED" | "HOLD";
  recommendation: string;
  reason: string;
  expectedImpact: string;
  confidence: number;
}
```

---

## 3. Intelligent Fallbacks

If `GEMINI_API_KEY` is omitted or quota limits occur, `aiService.ts` executes intelligent deterministic fallbacks using real-time MongoDB state, ensuring the UI remains 100% operational.
