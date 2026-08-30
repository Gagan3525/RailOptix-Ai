import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Clock, Train as TrainIcon, AlertTriangle, Activity, Sun, Users, Sparkles } from "lucide-react";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

const Dashboard: React.FC = () => {
  const simulation = useRailwaySimulation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("18:42:07");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-GB", { hour12: false }));
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
    <div className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#070b10] text-white flex flex-col justify-between">
      {/* Background Image: Sunset/Dusk Locomotive on Railway Track with Overhead Catenary Wires */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=2000&auto=format&fit=crop"
          alt="Indian Railway Electric Locomotive"
          className="h-full w-full object-cover object-center filter brightness-65 contrast-125"
        />
        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b10] via-[#070b10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b10]/90 via-[#070b10]/50 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 py-6">
        {/* Hero Section */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-[1.1]">
                AI-Powered <br />
                <span className="text-white">Railway Operations</span>
              </h1>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Smarter. Safer. On Time.
              </p>
            </div>

            {/* Pill Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-md pt-2">
              <div className="relative flex items-center rounded-full border border-white/20 bg-white/10 p-1.5 backdrop-blur-md transition-all focus-within:border-cyan-400 focus-within:bg-white/15 shadow-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search trains by number, name or station..."
                  className="w-full bg-transparent py-2 pl-4 pr-12 text-xs text-white placeholder-slate-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white transition-all hover:scale-105"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: 2 Hero Glass Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Live Network Card */}
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl shadow-2xl space-y-3 flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Live Network</h3>
                  <p className="text-[10px] text-slate-300">Real-time train movement</p>
                </div>
              </div>

              {/* India Map Canvas Graphic */}
              <div className="relative my-1 h-28 w-full rounded-2xl border border-white/10 bg-[#09111c]/80 p-2 overflow-hidden">
                <svg className="h-full w-full" viewBox="0 0 280 110">
                  {/* Network Mesh Lines */}
                  <path d="M 30 85 L 90 55 L 150 75 L 240 25" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 90 55 L 140 18 L 240 25" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 150 75 L 200 95" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Stations Nodes */}
                  <circle cx="30" cy="85" r="3.5" fill="#06b6d4" />
                  <circle cx="90" cy="55" r="4" fill="#3b82f6" />
                  <circle cx="140" cy="18" r="4.5" fill="#10b981" />
                  <circle cx="150" cy="75" r="4" fill="#f59e0b" />
                  <circle cx="240" cy="25" r="5" fill="#ef4444" />
                  <circle cx="200" cy="95" r="3.5" fill="#8b5cf6" />

                  {/* Moving Glowing Train Dots */}
                  <circle cx="70" cy="63" r="3.5" fill="#10b981" className="animate-pulse" />
                  <circle cx="130" cy="26" r="3.5" fill="#06b6d4" className="animate-pulse" />
                  <circle cx="210" cy="35" r="3.5" fill="#ef4444" className="animate-ping" />
                </svg>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-[10px] text-slate-400">Live Trains</p>
                  <p className="text-base font-extrabold text-white">184 <span className="text-[10px] font-normal text-emerald-400">Across India</span></p>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>

            {/* AI Recommendation Card */}
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl shadow-2xl flex flex-col justify-between min-h-[220px]">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs font-semibold text-white">AI Rec</h3>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {primaryRecommendation}
                </p>
              </div>

              <div className="pt-3">
                <Link
                  to="/alerts"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-teal-500/40 bg-[#162730]/90 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#1f3643] hover:border-teal-400 shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Glass Metric Bar */}
        <div className="mt-8 rounded-full border border-white/15 bg-white/10 px-6 py-3.5 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 divide-x-0 md:divide-x divide-white/15">
            <div className="flex items-center gap-3 px-3">
              <Clock className="h-4 w-4 text-white" />
              <div>
                <p className="text-xs font-bold text-white">{currentTime}</p>
                <p className="text-[10px] text-slate-400">Live Time</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <TrainIcon className="h-4 w-4 text-white" />
              <div>
                <p className="text-xs font-bold text-white">{simulation.trains.length || 184}</p>
                <p className="text-[10px] text-slate-400">Live Trains</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <div>
                <p className="text-xs font-bold text-amber-400">{simulation.conflicts.length || 7}</p>
                <p className="text-[10px] text-slate-400">Active Alerts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <Activity className="h-4 w-4 text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-emerald-400">92.8%</p>
                <p className="text-[10px] text-slate-400">OTP</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <Sun className="h-4 w-4 text-white" />
              <div>
                <p className="text-xs font-bold text-white">28°C</p>
                <p className="text-[10px] text-slate-400">Weather</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <Users className="h-4 w-4 text-white" />
              <div>
                <p className="text-xs font-bold text-white">2.4K</p>
                <p className="text-[10px] text-slate-400">Users Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;