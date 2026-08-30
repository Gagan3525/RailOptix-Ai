import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Clock, Train as TrainIcon, AlertTriangle, Activity, Sun, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

const Dashboard: React.FC = () => {
  const simulation = useRailwaySimulation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/trains?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const primaryRecommendation = simulation.aiDecision?.recommendation ||
    "Hold Train 12951 for 8 mins at NDLS Junction to avoid conflict with Train 12424.";

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#090E14] text-white">
      {/* Hero Background Image with Dark Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=2000&auto=format&fit=crop"
          alt="Indian Railway Locomotive"
          className="h-full w-full object-cover object-center opacity-30 filter contrast-125 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090E14] via-[#090E14]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090E14] via-transparent to-[#090E14]" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between px-6 py-8 min-h-[calc(100vh-4rem)]">
        {/* Upper Hero Section */}
        <div className="mt-4 space-y-8">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              AI-Powered <br />
              <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                Railway Operations
              </span>
            </h1>
            <p className="text-xl font-medium text-cyan-400">
              Smarter. Safer. On Time.
            </p>
          </div>

          {/* Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trains by number, name or station..."
                className="w-full rounded-2xl border border-white/15 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-400 backdrop-blur-md transition-all focus:border-cyan-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </form>

          {/* Hero Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 max-w-5xl">
            {/* Live Network Glass Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:bg-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Live Network</h3>
                    <p className="text-xs text-slate-400">Real-time train movement</p>
                  </div>
                </div>
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Simplified Interactive Canvas Map */}
              <div className="relative my-4 h-36 w-full rounded-2xl border border-white/10 bg-[#0c141f]/70 p-3 overflow-hidden">
                <svg className="h-full w-full" viewBox="0 0 300 120">
                  {/* Network Routes */}
                  <path d="M 30 90 L 100 60 L 170 80 L 250 30" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  <path d="M 100 60 L 150 20 L 250 30" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  <path d="M 170 80 L 220 100" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="3 3" />

                  {/* Stations */}
                  <circle cx="30" cy="90" r="4" fill="#06b6d4" />
                  <circle cx="100" cy="60" r="5" fill="#3b82f6" />
                  <circle cx="150" cy="20" r="6" fill="#10b981" />
                  <circle cx="170" cy="80" r="5" fill="#f59e0b" />
                  <circle cx="250" cy="30" r="6" fill="#ef4444" />
                  <circle cx="220" cy="100" r="4" fill="#8b5cf6" />

                  {/* Moving Train Dots */}
                  <circle cx="80" cy="68" r="4" fill="#10b981" className="animate-pulse" />
                  <circle cx="140" cy="28" r="4" fill="#06b6d4" className="animate-pulse" />
                  <circle cx="220" cy="40" r="4" fill="#ef4444" className="animate-ping" />
                </svg>

                <div className="absolute bottom-3 left-4">
                  <p className="text-xs text-slate-400">Live Trains</p>
                  <p className="text-xl font-bold text-white">184 <span className="text-xs font-normal text-slate-400">Across India</span></p>
                </div>
              </div>

              <Link
                to="/network"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Open Full Network Map <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* AI Recommendation Glass Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:bg-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Recommendation</h3>
                    <p className="text-xs text-emerald-400 font-medium">Confidence: 94.2%</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  OPTIMAL ACTION
                </span>
              </div>

              <div className="my-4 space-y-2 rounded-2xl border border-white/10 bg-[#0c141f]/70 p-4">
                <p className="text-sm font-semibold text-white leading-snug">
                  "{primaryRecommendation}"
                </p>
                <p className="text-xs text-slate-400">
                  Prevents platform conflict at NDLS Junction and avoids 22 min cascade delay on Down Line.
                </p>
              </div>

              <Link
                to="/alerts"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-all"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Operational Metrics Strip */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 divide-x-0 md:divide-x divide-white/10">
            <div className="flex items-center gap-3 px-3">
              <Clock className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-xs font-medium text-slate-400">Live Time</p>
                <p className="text-sm font-bold text-white">{currentTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <TrainIcon className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs font-medium text-slate-400">Live Trains</p>
                <p className="text-sm font-bold text-white">{simulation.trains.length || 184}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-xs font-medium text-slate-400">Active Alerts</p>
                <p className="text-sm font-bold text-amber-400">{simulation.conflicts.length || 7}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <Activity className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="text-xs font-medium text-slate-400">OTP</p>
                <p className="text-sm font-bold text-emerald-400">92.8%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <Sun className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-xs font-medium text-slate-400">Weather</p>
                <p className="text-sm font-bold text-white">28°C</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <Users className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-xs font-medium text-slate-400">Users Online</p>
                <p className="text-sm font-bold text-white">2.4K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;