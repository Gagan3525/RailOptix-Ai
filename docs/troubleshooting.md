# Troubleshooting Guide — RailOptix-AI

---

## Common Issues & Solutions

### 1. MongoDB Connection Failed (`MongooseServerSelectionError`)
- **Symptom**: Server crashes on boot with `MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017`.
- **Cause**: Local MongoDB service is not running or invalid `MONGODB_URI`.
- **Solution**: Ensure MongoDB service is started (`net start MongoDB` or `mongod`) or update `MONGODB_URI` in `server/.env` to point to a valid MongoDB Atlas connection string.

---

### 2. WebSocket Connection Failed / Cors Error
- **Symptom**: Browser console logs `WebSocket connection to 'ws://localhost:5000/socket.io/' failed`.
- **Cause**: Mismatch between `CLIENT_URL` in `server/.env` and the port React is running on.
- **Solution**: Ensure `server/.env` has `CLIENT_URL=http://localhost:3000` matching the React dev server port.

---

### 3. Server Build Errors (`tsc` Exit Code 1)
- **Symptom**: `npm --prefix server run build` fails with TypeScript errors.
- **Solution**: Ensure all imports in `server/src/` match exported symbols. Run `npm --prefix server run build` to verify clean compilation.
