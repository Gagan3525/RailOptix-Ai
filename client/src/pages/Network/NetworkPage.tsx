import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, RefreshCw } from "lucide-react";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

const NetworkPage: React.FC = () => {
  const simulation = useRailwaySimulation();
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Map station coordinates normalized for canvas rendering (Indian geographic map positions)
  const stationNodes: Record<string, { name: string; x: number; y: number; isJunction?: boolean }> = {
    "NDLS": { name: "New Delhi", x: 260, y: 160, isJunction: true },
    "GWL": { name: "Gwalior", x: 270, y: 220 },
    "JHS": { name: "Jhansi", x: 280, y: 270, isJunction: true },
    "BPL": { name: "Bhopal", x: 240, y: 340, isJunction: true },
    "CSMT": { name: "Mumbai CSMT", x: 130, y: 440, isJunction: true },
    "SBC": { name: "Bengaluru", x: 230, y: 620, isJunction: true },
    "HWH": { name: "Kolkata HWH", x: 500, y: 330, isJunction: true },
    "DBRG": { name: "Dibrugarh", x: 620, y: 180 },
    "MAS": { name: "Chennai", x: 280, y: 640, isJunction: true },
    "HYB": { name: "Hyderabad", x: 240, y: 490, isJunction: true },
    "PUNE": { name: "Pune", x: 150, y: 460, isJunction: true },
    "UD": { name: "Udupi", x: 180, y: 580 },
  };

  const routeLines = [
    { from: "CSMT", to: "BPL" },
    { from: "BPL", to: "JHS" },
    { from: "JHS", to: "GWL" },
    { from: "GWL", to: "NDLS" },
    { from: "SBC", to: "HYB" },
    { from: "HYB", to: "BPL" },
    { from: "HWH", to: "JHS" },
    { from: "DBRG", to: "HWH" },
    { from: "MAS", to: "HYB" },
    { from: "PUNE", to: "BPL" },
    { from: "UD", to: "CSMT" },
  ];

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
          <p className="text-sm text-slate-400 mt-1">Real-time train movement across Indian Railways corridors</p>
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
            {autoRefresh ? "Auto Refresh ON" : "Auto Refresh OFF"}
          </button>
        </div>
      </div>

      {/* Main Network Layout Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Network Map Canvas */}
        <div className="lg:col-span-2 relative min-h-[550px] overflow-hidden rounded-3xl border border-white/15 bg-[#080d14] p-6 backdrop-blur-xl">
          {/* Legend */}
          <div className="absolute top-6 left-6 z-10 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-[#090e14]/80 p-3 text-xs backdrop-blur-md">
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /><span className="text-slate-300">On Time</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><span className="text-slate-300">Minor Delay</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-orange-400" /><span className="text-slate-300">Significant Delay</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /><span className="text-slate-300">Critical / Held</span></div>
          </div>

          {/* SVG Map Canvas */}
          <div className="h-full w-full flex items-center justify-center pt-8">
            <svg viewBox="0 0 700 700" className="h-full max-h-[600px] w-full">
              {/* Route Lines */}
              {routeLines.map((route, i) => {
                const start = stationNodes[route.from];
                const end = stationNodes[route.to];
                if (!start || !end) return null;
                return (
                  <line
                    key={i}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#1e293b"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Station Nodes */}
              {Object.entries(stationNodes).map(([code, station]) => (
                <g key={code} className="cursor-pointer group">
                  <circle
                    cx={station.x}
                    cy={station.y}
                    r={station.isJunction ? "8" : "5"}
                    fill={station.isJunction ? "#06b6d4" : "#475569"}
                    stroke="#090e14"
                    strokeWidth="2"
                    className="transition-transform group-hover:scale-125"
                  />
                  <text
                    x={station.x + 12}
                    y={station.y + 4}
                    fill="#94a3b8"
                    fontSize="11"
                    fontWeight="600"
                    className="group-hover:fill-white transition-colors"
                  >
                    {station.name} ({code})
                  </text>
                </g>
              ))}

              {/* Simulated Train Positions */}
              {simulation.trains.map((train, idx) => {
                const startCode = train.currentStationId?.replace("ST-", "") || "CSMT";
                const endCode = train.nextStationId?.replace("ST-", "") || "NDLS";
                const start = stationNodes[startCode] || stationNodes["CSMT"];
                const end = stationNodes[endCode] || stationNodes["NDLS"];

                const pos = train.position || (idx * 0.15) % 1;
                const curX = start.x + (end.x - start.x) * pos;
                const curY = start.y + (end.y - start.y) * pos;
                const color = getTrainColor(train.delay, train.status);

                return (
                  <g key={train.trainNumber} className="cursor-pointer group">
                    <circle cx={curX} cy={curY} r="7" fill={color} className="animate-pulse" />
                    <circle cx={curX} cy={curY} r="12" fill={color} opacity="0.2" />
                    <text
                      x={curX + 10}
                      y={curY - 10}
                      fill={color}
                      fontSize="10"
                      fontWeight="bold"
                      className="bg-black px-1 rounded"
                    >
                      {train.trainNumber} ({train.delay > 0 ? `+${train.delay}m` : "OK"})
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Live Stats & Delay Panel */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white">Live Trains Summary</h3>
            <p className="text-xs text-slate-400 mt-1">Network occupancy & delay metrics</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">Total Running</p>
                <p className="text-2xl font-bold text-white mt-1">{simulation.trains.length}</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="text-xs text-emerald-400">On Time</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">
                  {simulation.trains.filter((t) => t.delay === 0).length}
                </p>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-xs text-amber-400">Delayed (&gt;0m)</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">
                  {simulation.trains.filter((t) => t.delay > 0 && t.delay <= 15).length}
                </p>
              </div>
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-xs text-red-400">Critical (&gt;15m)</p>
                <p className="text-2xl font-bold text-red-400 mt-1">
                  {simulation.trains.filter((t) => t.delay > 15).length}
                </p>
              </div>
            </div>
          </div>

          {/* Top Delayed Trains Card */}
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Top Delayed Trains</h3>
              <Link to="/trains" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                View All Trains
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {simulation.trains
                .filter((t) => t.delay > 0)
                .sort((a, b) => b.delay - a.delay)
                .slice(0, 5)
                .map((train) => (
                  <Link
                    key={train.trainNumber}
                    to={`/trains/${train.trainNumber}`}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{train.trainNumber} {train.name}</p>
                      <p className="text-xs text-slate-400">Near {train.currentStationId?.replace("ST-", "") || "NDLS"}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-red-400">+{train.delay} min</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
