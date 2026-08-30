import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Clock, Navigation } from "lucide-react";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

const TrainDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const simulation = useRailwaySimulation();
  const [fetchedTrain, setFetchedTrain] = useState<any>(null);

  // Find train in live WebSocket state
  const liveTrain = simulation.trains.find((t: any) => t.trainNumber === id || t._id === id);

  // Fetch train details from backend REST API as fallback
  useEffect(() => {
    if (id && !liveTrain) {
      fetch(`http://localhost:5000/api/trains/${id}`)
        .then((res) => res.json())
        .then((data) => setFetchedTrain(data))
        .catch((err) => console.warn("Failed to fetch train details:", err));
    }
  }, [id, liveTrain]);

  const train = liveTrain || fetchedTrain || {
    trainNumber: id || "12951",
    name: "Mumbai Rajdhani Exp",
    sourceStationId: "ST-CSMT",
    destinationStationId: "ST-NDLS",
    currentStationId: "ST-GWL",
    nextStationId: "ST-NDLS",
    status: "RUNNING",
    delay: 0,
    speed: 85,
    eta: 20.25,
    route: ["ST-CSMT", "ST-BPL", "ST-JHS", "ST-GWL", "ST-NDLS"],
    position: 0.85,
  };

  const getStationCode = (stId?: string) => (stId || "").replace("ST-", "");

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
      {/* Top Back Navigation & Header */}
      <div>
        <Link
          to="/trains"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Trains List
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                {train.trainNumber} {train.name}
              </h1>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold border ${
                  (train.delay || 0) > 15
                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                    : (train.delay || 0) > 0
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                }`}
              >
                {(train.delay || 0) > 0 ? `+${train.delay} min Delay` : "On Time"}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Route Corridor: {getStationCode(train.sourceStationId)} → {getStationCode(train.destinationStationId)}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Specs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Specifications & Live Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=800&auto=format&fit=crop"
                alt="Locomotive"
                className="h-44 w-full md:w-64 rounded-2xl object-cover border border-white/10"
              />
              <div className="grid grid-cols-2 gap-4 w-full text-sm">
                <div>
                  <p className="text-xs text-slate-400">Train Number</p>
                  <p className="font-bold text-white text-base">{train.trainNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Current Speed</p>
                  <p className="font-bold text-cyan-400 text-base">{train.speed || 80} km/h</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Train Name</p>
                  <p className="font-bold text-white text-base">{train.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Operational Status</p>
                  <p className="font-bold text-emerald-400 text-base">{train.status}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Current Station</p>
                  <p className="font-bold text-white text-base">{getStationCode(train.currentStationId)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Next Station</p>
                  <p className="font-bold text-cyan-400 text-base">{getStationCode(train.nextStationId)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Destination</p>
                  <p className="font-bold text-white text-base">{getStationCode(train.destinationStationId)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Normalized Position</p>
                  <p className="font-mono font-bold text-white text-base">{((train.position || 0) * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Route Timeline */}
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Navigation className="h-5 w-5 text-cyan-400" /> Route Segment Timeline
            </h3>

            <div className="relative pt-4 pl-4 space-y-6 border-l-2 border-slate-700">
              {(train.route || ["ST-CSMT", "ST-BPL", "ST-JHS", "ST-GWL", "ST-NDLS"]).map((st: string, idx: number) => {
                const code = getStationCode(st);
                const isCurrent = train.currentStationId === st || code === getStationCode(train.currentStationId);
                const isNext = train.nextStationId === st || code === getStationCode(train.nextStationId);

                return (
                  <div key={idx} className="relative pl-6">
                    <span
                      className={`absolute -left-[25px] top-1.5 h-4 w-4 rounded-full border-2 ${
                        isNext
                          ? "border-cyan-400 bg-cyan-400 animate-ping"
                          : isCurrent
                          ? "border-emerald-400 bg-emerald-400"
                          : "border-slate-600 bg-slate-800"
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold text-sm ${isNext ? "text-cyan-400 font-bold" : isCurrent ? "text-emerald-400 font-bold" : "text-white"}`}>
                          Station {code} {isNext && "(Next Stop)"} {isCurrent && "(Current)"}
                        </p>
                        <p className="text-xs text-slate-400">Corridor Segment #{idx + 1}</p>
                      </div>
                      <span className={`text-xs font-semibold ${isCurrent ? "text-emerald-400" : "text-slate-400"}`}>
                        {isCurrent ? "Active" : "En Route"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & Active Guidance */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">AI Dispatch Guidance</h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              "Hold Train 12951 for 8 mins at NDLS Junction to avoid conflict with Train 12424 and regulate speed of Train {train.trainNumber}."
            </p>
            <div className="rounded-2xl border border-white/10 bg-[#090e14]/60 p-3 text-xs text-slate-300">
              Expected Impact: Maintains 10-min headway buffer and optimizes platform clearance at terminal.
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" /> Delay Prediction Analysis
            </h3>
            <p className="text-xs text-slate-400">Predicted delay curve across upcoming sections:</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>{getStationCode(train.currentStationId)} → {getStationCode(train.nextStationId)}</span>
                  <span className="text-emerald-400">On Time</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-emerald-400 w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>{getStationCode(train.nextStationId)} → Terminal</span>
                  <span className="text-cyan-400">Optimal Buffer</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-cyan-400 w-4/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainDetailsPage;
