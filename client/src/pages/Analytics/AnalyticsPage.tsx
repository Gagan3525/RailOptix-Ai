import React from "react";
import { BarChart3, TrendingUp, Download } from "lucide-react";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

const AnalyticsPage: React.FC = () => {
  const simulation = useRailwaySimulation();

  const zonePerformance = [
    { zone: "Northern", otp: "95.4%", avgDelay: "12.4 mins", count: 42 },
    { zone: "Western", otp: "93.1%", avgDelay: "15.2 mins", count: 38 },
    { zone: "Southern", otp: "91.7%", avgDelay: "18.6 mins", count: 35 },
    { zone: "Eastern", otp: "90.2%", avgDelay: "21.0 mins", count: 34 },
    { zone: "N. Eastern", otp: "87.2%", avgDelay: "24.5 mins", count: 35 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-cyan-400" /> Analytics Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">Performance insights, on-time trends, and delay distribution</p>
        </div>

        <div className="flex items-center gap-3">
          <select className="rounded-xl border border-white/10 bg-[#0d1522] py-2 px-3 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none">
            <option value="TODAY">Today</option>
            <option value="WEEK">This Week</option>
            <option value="MONTH">This Month</option>
          </select>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all"
          >
            <Download className="h-3.5 w-3.5" /> Export Report
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">On-Time Performance</p>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold text-emerald-400">92.8%</h2>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="h-3.5 w-3.5" /> +3.4%
            </span>
          </div>
          <p className="text-xs text-slate-400">vs yesterday</p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Trains Monitored</p>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold text-white">{simulation.trains.length || 184}</h2>
            <span className="text-xs font-semibold text-cyan-400">+12 vs yesterday</span>
          </div>
          <p className="text-xs text-slate-400">active corridors</p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Delay</p>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold text-amber-400">18.6 mins</h2>
            <span className="text-xs font-semibold text-emerald-400">-4.2 mins</span>
          </div>
          <p className="text-xs text-slate-400">vs yesterday</p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Alerts</p>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold text-red-400">{simulation.conflicts.length || 7}</h2>
            <span className="text-xs font-semibold text-red-400">+2 vs yesterday</span>
          </div>
          <p className="text-xs text-slate-400">requiring operator review</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* OTP Trend Chart Card */}
        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-semibold text-white">OTP Trend (Today)</h3>
          <div className="h-48 w-full rounded-2xl border border-white/10 bg-[#080d14] p-4 flex items-end justify-between gap-2">
            {[90, 92, 91, 94, 93, 95, 92, 94, 96, 93, 92.8].map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div
                  style={{ height: `${val}%` }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-cyan-600 to-cyan-400 opacity-80 hover:opacity-100 transition-all"
                />
                <span className="text-[10px] text-slate-500 font-mono">{`${i * 2}:00`}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delay Distribution Card */}
        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-semibold text-white">Delay Distribution</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center p-4">
              {/* Donut Representation */}
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-cyan-500 border-t-emerald-400 border-r-amber-400 border-b-red-500">
                <span className="text-lg font-bold text-white">184</span>
              </div>
            </div>
            <div className="space-y-3 justify-center flex flex-col text-xs text-slate-300">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> No Delay</span><strong className="text-white">48%</strong></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-cyan-400" /> 0-15 min</span><strong className="text-white">28%</strong></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> 16-60 min</span><strong className="text-white">18%</strong></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> &gt;60 min</span><strong className="text-white">6%</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Performance Table */}
      <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl space-y-4">
        <h3 className="text-base font-semibold text-white">Zone Performance Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 text-xs text-slate-400 uppercase">
              <tr>
                <th className="py-3 px-4">Railway Zone</th>
                <th className="py-3 px-4">Trains Count</th>
                <th className="py-3 px-4">On-Time Performance</th>
                <th className="py-3 px-4">Avg Delay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {zonePerformance.map((z) => (
                <tr key={z.zone} className="hover:bg-white/5">
                  <td className="py-3 px-4 font-semibold text-white">{z.zone}</td>
                  <td className="py-3 px-4 text-slate-300">{z.count}</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">{z.otp}</td>
                  <td className="py-3 px-4 text-slate-300">{z.avgDelay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
