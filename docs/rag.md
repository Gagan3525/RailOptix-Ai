# RAG & Knowledge Base Specification — RailOptix-AI

---

## 1. RAG Implementation Status

> [!NOTE]
> **Status**: RAG Knowledge Base Architecture is **Planned / Architecture-Ready**.
> Live operational context (train delays, track occupancy, conflicts) is currently fetched dynamically from MongoDB via `aiService.ts`.

---

## 2. Planned RAG Pipeline Architecture

```
[ Indian Railways General Rules / Operating Manuals ]
                        │
                        ▼
            [ Chunking & Text Processing ]
                        │
                        ▼
       [ Vector Embeddings (Google Embedding API) ]
                        │
                        ▼
       [ Vector Database (Chroma / MongoDB Vector) ]
                        │
                        ▼
[ User Query ] ──► [ Similarity Search ] ──► [ Augmented Prompt ] ──► [ Gemini AI ]
```

---

## 3. Operational Data vs Knowledge Data

| Category | Data Source | Example |
|---|---|---|
| **Live State Data** | MongoDB / Socket.IO | "Train 12627 is delayed by 18 min near Jhansi" |
| **Knowledge Data (RAG)** | Vector Database | "Rule 3.38: Conditions under which line clear may be granted" |
