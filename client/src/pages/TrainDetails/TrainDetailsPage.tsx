import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

const TrainDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const simulation = useRailwaySimulation();

  const train = simulation.trains.find((t) => t.trainNumber === id) || {
    trainNumber: id || "12627",
    name: "Karnataka Express",
    sourceStationId: "ST-SBC",
    destinationStationId: "ST-NDLS",
    currentStationId: "ST-BPL",
    nextStationId: "ST-JHS",
    status: "DELAYED",
    delay: 18,
    speed: 72,
    eta: 19.70,
    route: ["ST-SBC", "ST-HYB", "ST-BPL", "ST-JHS", "ST-GWL", "ST-NDLS"],
    routeIndex: 2,
    position: 0.70,
  };

  const routeTimeline = [
    { station: "Bengaluru SBC", status: "Departed 06:20", delay: "On Time" },
    { station: "Hyderabad", status: "Departed 14:10", delay: "On Time" },
    { station: "Bhopal Jn", status: "Departed 01:20", delay: "+6 min" },
    { station: "Jhansi Jn", status: "Next Stop 19:42", delay: "+18 min", isNext: true },
    { station: "Gwalior Jn", status: "Scheduled 21:15", delay: "+18 min" },
    { station: "New Delhi", status: "Scheduled 01:30", delay: "+18 min" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
      {/* Top Back Navigation & Header */}
      <div>
        <Link
          to="/trains"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Trains
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                {train.trainNumber} {train.name}
              </h1>
              <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/30">
                +{train.delay} min Delay
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Route: {train.sourceStationId?.replace("ST-", "") || "SBC"} → {train.destinationStationId?.replace("ST-", "") || "NDLS"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Specs & Image */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Image & Operational Overview */}
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
                  <p className="text-xs text-slate-400">Distance Covered</p>
                  <p className="font-bold text-white text-base">1,245 km</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Train Name</p>
                  <p className="font-bold text-white text-base">{train.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Average Speed</p>
                  <p className="font-bold text-white text-base">{train.speed || 72} km/h</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Source</p>
                  <p className="font-bold text-white text-base">{train.sourceStationId?.replace("ST-", "") || "SBC"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Next Stop</p>
                  <p className="font-bold text-white text-base">{train.nextStationId?.replace("ST-", "") || "JHS"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Destination</p>
                  <p className="font-bold text-white text-base">{train.destinationStationId?.replace("ST-", "") || "NDLS"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">ETA</p>
                  <p className="font-bold text-white text-base">19:42</p>
                </div>
              </div>
            </div>
          </div>

          {/* Route Timeline */}
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-lg font-semibold text-white">Live Route & Stops</h3>

            <div className="relative pt-4 pl-4 space-y-6 border-l-2 border-slate-700">
              {routeTimeline.map((stop, idx) => (
                <div key={idx} className="relative pl-6">
                  <span
                    className={`absolute -left-[25px] top-1.5 h-4 w-4 rounded-full border-2 ${
                      stop.isNext
                        ? "border-cyan-400 bg-cyan-400 animate-ping"
                        : "border-slate-600 bg-slate-800"
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold text-sm ${stop.isNext ? "text-cyan-400 font-bold" : "text-white"}`}>
                        {stop.station}
                      </p>
                      <p className="text-xs text-slate-400">{stop.status}</p>
                    </div>
                    <span className={`text-xs font-semibold ${stop.delay === "On Time" ? "text-emerald-400" : "text-red-400"}`}>
                      {stop.delay}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & Active Guidance */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">AI Recommendation</h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              "Hold Train 12951 for 8 mins at NDLS Junction to avoid conflict with Train 12424 and regulate speed of Train {train.trainNumber} near Jhansi."
            </p>
            <div className="rounded-2xl border border-white/10 bg-[#090e14]/60 p-3 text-xs text-slate-300">
              Expected Result: Reduces downstream delay by 12 mins and stabilizes terminal platform availability at NDLS.
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-base font-semibold text-white">Delay Prediction</h3>
            <p className="text-xs text-slate-400">Predicted delay curve for upcoming corridor sections:</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Jhansi → Gwalior</span>
                  <span className="text-amber-400">+14 min</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-amber-400 w-3/4" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Gwalior → New Delhi</span>
                  <span className="text-emerald-400">+8 min</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-emerald-400 w-1/2" />
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
