import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter, Train as TrainIcon, ChevronRight } from "lucide-react";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

const TrainsPage: React.FC = () => {
  const simulation = useRailwaySimulation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedZone, setSelectedZone] = useState("ALL");

  const filteredTrains = simulation.trains.filter((train) => {
    const matchesSearch =
      train.trainNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.currentStationId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.nextStationId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "ALL" ||
      (selectedStatus === "DELAYED" && train.delay > 0) ||
      (selectedStatus === "ON_TIME" && train.delay === 0) ||
      train.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string, delay: number) => {
    if (delay > 15) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-semibold text-red-400 border border-red-500/30">
          Delayed
        </span>
      );
    }
    if (delay > 0) {
      return (
        <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/30">
          Minor Delay
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
        On Time
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <TrainIcon className="h-8 w-8 text-cyan-400" /> Trains
          </h1>
          <p className="text-sm text-slate-400 mt-1">Live status of all running trains across the railway network</p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-semibold text-white">
            Total: {simulation.trains.length}
          </span>
          <span className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 font-semibold text-emerald-400">
            On Time: {simulation.trains.filter(t => t.delay === 0).length}
          </span>
          <span className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 font-semibold text-red-400">
            Delayed: {simulation.trains.filter(t => t.delay > 0).length}
          </span>
        </div>
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search trains by number, name or station..."
            className="w-full rounded-xl border border-white/10 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0d1522] py-2 px-3 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
            >
              <option value="ALL">All Zones</option>
              <option value="NR">Northern Railway (NR)</option>
              <option value="WR">Western Railway (WR)</option>
              <option value="SR">Southern Railway (SR)</option>
              <option value="ER">Eastern Railway (ER)</option>
              <option value="CR">Central Railway (CR)</option>
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#0d1522] py-2 px-3 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="ON_TIME">On Time</option>
            <option value="DELAYED">Delayed</option>
            <option value="RUNNING">Running</option>
            <option value="STOPPED">Stopped</option>
          </select>
        </div>
      </div>

      {/* Trains Data Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-4">Train No.</th>
                <th className="px-6 py-4">Train Name</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Delay</th>
                <th className="px-6 py-4">Next Stop</th>
                <th className="px-6 py-4">ETA</th>
                <th className="px-4 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTrains.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                    No trains match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredTrains.map((train) => (
                  <tr
                    key={train.trainNumber}
                    onClick={() => navigate(`/trains/${train.trainNumber}`)}
                    className="group cursor-pointer transition-colors hover:bg-white/10"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-white group-hover:text-cyan-400">
                      {train.trainNumber}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {train.name}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {train.sourceStationId?.replace("ST-", "") || "CSMT"} → {train.destinationStationId?.replace("ST-", "") || "NDLS"}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(train.status, train.delay)}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {train.delay > 0 ? (
                        <span className="text-red-400">+{train.delay} min</span>
                      ) : (
                        <span className="text-emerald-400">+0 min</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {train.nextStationId?.replace("ST-", "") || train.currentStationId?.replace("ST-", "") || "NDLS"}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-300">
                      {train.eta ? `${Math.floor(train.eta)}:${Math.round((train.eta % 1) * 60).toString().padStart(2, "0")}` : "19:42"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <ChevronRight className="inline-h h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainsPage;
