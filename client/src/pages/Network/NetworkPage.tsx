import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, RefreshCw, AlertCircle } from "lucide-react";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

const NetworkPage: React.FC = () => {
  const simulation = useRailwaySimulation();
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Helper to get SVG coordinates (x, y) from station latitude & longitude or fallback code
  const getStationCoordinates = (station: any) => {
    if (station && station.longitude && station.latitude) {
      const x = (station.longitude - 70) * 23 + 50;
      const y = (32 - station.latitude) * 25 + 50;
      return { x, y };
    }
    // Fallback coordinates by station code
    const code = (station?.code || station?.stationId || "").replace("ST-", "");
    const fallbackCoords: Record<string, { x: number; y: number }> = {
      NDLS: { x: 215, y: 135 },
      GWL: { x: 238, y: 195 },
      JHS: { x: 247, y: 214 },
      BPL: { x: 220, y: 268 },
      CSMT: { x: 115, y: 377 },
      SBC: { x: 224, y: 527 },
      HWH: { x: 471, y: 285 },
      DBRG: { x: 622, y: 164 },
      MAS: { x: 286, y: 525 },
      HYB: { x: 245, y: 415 },
      PUNE: { x: 138, y: 387 },
      UD: { x: 159, y: 516 },
    };
    return fallbackCoords[code] || { x: 200, y: 200 };
  };

  const getTrainColor = (delay: number, status: string) => {
    if (status === "STOPPED" || delay > 30) return "#ef4444"; // Red
    if (delay > 15) return "#f97316"; // Orange
    if (delay > 0) return "#eab308"; // Yellow
    return "#10b981"; // Green
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Activity className="h-8 w-8 text-cyan-400" /> Live Network Map
          </h1>
          <p className="text-sm text-slate-400 mt-1">Backend Authoritative State • Single Source of Truth</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
              autoRefresh
                ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                : "border-white/10 bg-white/5 text-slate-400"
            }`}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${autoRefresh ? "animate-spin" : ""}`} />
            {autoRefresh ? "Live Stream ACTIVE" : "Stream PAUSED"}
          </button>
        </div>
      </div>

      {/* Main Network Layout Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Network Map Canvas */}
        <div className="lg:col-span-2 relative min-h-[580px] overflow-hidden rounded-3xl border border-white/15 bg-[#080d14] p-6 backdrop-blur-xl">
          {/* Legend */}
          <div className="absolute top-6 left-6 z-10 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-[#090e14]/80 p-3 text-xs backdrop-blur-md">
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /><span className="text-slate-300">On Time</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><span className="text-slate-300">Minor Delay</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-orange-400" /><span className="text-slate-300">Significant Delay</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /><span className="text-slate-300">Critical / Held</span></div>
          </div>

          {/* SVG Map Canvas */}
          <div className="h-full w-full flex items-center justify-center pt-8">
            <svg viewBox="0 0 700 650" className="h-full max-h-[600px] w-full">
              {/* Route Lines from Backend Tracks */}
              {(simulation.tracks || []).map((track: any, i: number) => {
                const fromSt = (simulation.stations || []).find(
                  (s: any) => s.stationId === track.fromStation || s.code === track.fromStation?.replace("ST-", "")
                );
                const toSt = (simulation.stations || []).find(
                  (s: any) => s.stationId === track.toStation || s.code === track.toStation?.replace("ST-", "")
                );

                const start = getStationCoordinates(fromSt || { code: track.fromStation?.replace("ST-", "") });
                const end = getStationCoordinates(toSt || { code: track.toStation?.replace("ST-", "") });

                const isOccupied = track.status === "OCCUPIED" || track.isOccupied;

                return (
                  <line
                    key={track.trackId || i}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={isOccupied ? "#0284c7" : "#1e293b"}
                    strokeWidth={isOccupied ? "3.5" : "2"}
                    strokeDasharray={isOccupied ? "none" : "4 4"}
                  />
                );
              })}

              {/* Station Nodes from Backend Stations */}
              {(simulation.stations || []).map((station: any) => {
                const coords = getStationCoordinates(station);
                return (
                  <g key={station.stationId || station.code} className="cursor-pointer group">
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={station.isJunction ? "7" : "4.5"}
                      fill={station.isJunction ? "#06b6d4" : "#475569"}
                      stroke="#090e14"
                      strokeWidth="2"
                      className="transition-transform group-hover:scale-125"
                    />
                    <text
                      x={coords.x + 10}
                      y={coords.y + 4}
                      fill="#94a3b8"
                      fontSize="10"
                      fontWeight="600"
                      className="group-hover:fill-white transition-colors"
                    >
                      {station.code || station.name}
                    </text>
                  </g>
                );
              })}

              {/* Authoritative Live Train Positions from Backend */}
              {(simulation.trains || []).map((train: any) => {
                const currentCode = train.currentStationId?.replace("ST-", "") || "CSMT";
                const nextCode = train.nextStationId?.replace("ST-", "") || "NDLS";

                const currentSt = (simulation.stations || []).find((s: any) => s.code === currentCode || s.stationId === train.currentStationId);
                const nextSt = (simulation.stations || []).find((s: any) => s.code === nextCode || s.stationId === train.nextStationId);

                const start = getStationCoordinates(currentSt || { code: currentCode });
                const end = getStationCoordinates(nextSt || { code: nextCode });

                const pos = train.position ?? 0.5;
                const curX = start.x + (end.x - start.x) * pos;
                const curY = start.y + (end.y - start.y) * pos;
                const color = getTrainColor(train.delay || 0, train.status);

                return (
                  <g key={train.trainNumber} className="cursor-pointer group">
                    <circle cx={curX} cy={curY} r="7" fill={color} className="animate-pulse" />
                    <circle cx={curX} cy={curY} r="12" fill={color} opacity="0.25" />
                    <text
                      x={curX + 10}
                      y={curY - 8}
                      fill={color}
                      fontSize="10"
                      fontWeight="bold"
                      className="bg-black px-1 rounded shadow"
                    >
                      {train.trainNumber} ({train.delay > 0 ? `+${train.delay}m` : "OK"})
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Live Stats & Conflict Panel */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white">Live Trains Summary</h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">Synced with MongoDB & WebSockets</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">Total Running</p>
                <p className="text-2xl font-bold text-white mt-1">{simulation.trains.length}</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="text-xs text-emerald-400">On Time</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">
                  {simulation.trains.filter((t) => (t.delay || 0) === 0).length}
                </p>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-xs text-amber-400">Delayed (&gt;0m)</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">
                  {simulation.trains.filter((t) => (t.delay || 0) > 0 && (t.delay || 0) <= 15).length}
                </p>
              </div>
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-xs text-red-400">Critical (&gt;15m)</p>
                <p className="text-2xl font-bold text-red-400 mt-1">
                  {simulation.trains.filter((t) => (t.delay || 0) > 15).length}
                </p>
              </div>
            </div>
          </div>

          {/* Active Conflicts Card */}
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-400" /> Active Conflicts
              </h3>
              <Link to="/alerts" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                View Alerts Feed
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {(simulation.conflicts || []).length === 0 ? (
                <p className="text-xs text-slate-400">No active track conflicts detected.</p>
              ) : (
                simulation.conflicts.map((conflict: any) => (
                  <div
                    key={conflict.conflictId || conflict._id}
                    className="flex flex-col gap-1 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">
                        {conflict.trainA} vs {conflict.trainB}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                        {conflict.severity || "HIGH"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Track: {conflict.trackId}
                    </p>
                    <p className="text-[10px] text-slate-400 italic">
                      {conflict.recommendation}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
