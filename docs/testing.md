# Testing & Verification Guide — RailOptix-AI

---

## 1. Automated Build Verification

Run build compilation checks for server and client:

```bash
# Verify Server TypeScript Build
npm --prefix server run build

# Verify Client Production Build
npm --prefix client run build
```

Both build commands must exit with **Code 0**.

---

## 2. End-to-End Test Verification Scenario

Follow this step-by-step test procedure to verify full real-time operational functionality:

1. **Start Backend & Database**: Ensure MongoDB is running and start `npm --prefix server run dev`. Observe console output confirming `🚆 Railway State Loaded` and `seedDatabase` execution.
2. **Start Frontend**: Run `npm --prefix client start` and navigate to `http://localhost:3000`.
3. **Verify Dashboard**: Confirm top navbar, locomotive background, global search, live network card, and live time clock are rendering.
4. **Verify Real-Time Synchronization**:
   - Open **Network Page** (`/network`) and **Dashboard** (`/dashboard`) in side-by-side browser windows.
   - Observe train markers advancing simultaneously across both windows via WebSockets without browser refreshes.
5. **Verify AI Assistant**:
   - Open **AI Assistant** (`/ai-assistant`).
   - Click prompt chip *"Why is Train 12627 delayed?"*.
   - Verify AI response returns detailed context matching backend state.
