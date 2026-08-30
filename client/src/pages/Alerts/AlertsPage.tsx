import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, CheckCircle2, Info } from "lucide-react";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

const AlertsPage: React.FC = () => {
  const simulation = useRailwaySimulation();
  const [activeTab, setActiveTab] = useState("ALL");

  const alerts = [
    {
      id: "ALT-001",
      severity: "CRITICAL",
      title: "Conflict Detected at NDLS Junction",
      description: "Train 12951 and 12424 have conflicting paths on section S12A near NDLS Junction.",
      recommendation: "Hold Train 12951 for 8 mins at NDLS Junction to avoid conflict with Train 12424.",
      affectedTrain: "12951 & 12424",
      location: "NDLS Junction - Platform 5",
      time: "2 min ago",
      resolved: false,
    },
    {
      id: "ALT-002",
      severity: "WARNING",
      title: "Train Delayed",
      description: "Train 12627 Karnataka Exp running 18 mins late due to congestion at Jhansi Junction.",
      recommendation: "Regulate speed to reduce platform wait times.",
      affectedTrain: "12627",
      location: "Jhansi Junction",
      time: "8 min ago",
      resolved: false,
    },
    {
      id: "ALT-003",
      severity: "CRITICAL",
      title: "Signal Hold",
      description: "Signal SIG-NDLS-APPROACH set to RED due to section occupancy.",
      recommendation: "Maintain stop signal until section clears.",
      affectedTrain: "12951",
      location: "GWL-NDLS Section",
      time: "15 min ago",
      resolved: false,
    },
    {
      id: "ALT-004",
      severity: "INFO",
      title: "Track Maintenance",
      description: "Scheduled maintenance on Track 2 from 23:00 to 05:00 between Jhansi and Gwalior.",
      recommendation: "Reroute freight traffic via loop line.",
      affectedTrain: "Freight / Down Line",
      location: "JHS-GWL Corridor",
      time: "45 min ago",
      resolved: true,
    },
  ];

  const filteredAlerts = alerts.filter((alert) => {
    if (activeTab === "CRITICAL") return alert.severity === "CRITICAL";
    if (activeTab === "WARNING") return alert.severity === "WARNING";
    if (activeTab === "INFO") return alert.severity === "INFO";
    return true;
  });

  const getSeverityBadge = (severity: string) => {
    if (severity === "CRITICAL") {
      return (
        <span className="flex items-center gap-1 rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-bold text-red-400 border border-red-500/30">
          <ShieldAlert className="h-3.5 w-3.5" /> CRITICAL
        </span>
      );
    }
    if (severity === "WARNING") {
      return (
        <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
          <AlertTriangle className="h-3.5 w-3.5" /> WARNING
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/30">
        <Info className="h-3.5 w-3.5" /> INFO
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-amber-400" /> Operational Alerts
          </h1>
          <p className="text-sm text-slate-400 mt-1">Real-time system events, track conflicts, and AI mitigation guidance</p>
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "CRITICAL", "WARNING", "INFO"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white/10 text-white font-bold border border-white/20 shadow-sm"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {tab === "ALL" ? `All Alerts (${alerts.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  {getSeverityBadge(alert.severity)}
                  <h3 className="text-lg font-bold text-white">{alert.title}</h3>
                  <span className="text-xs text-slate-400">{alert.time}</span>
                </div>

                <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {alert.description}
                </p>

                {alert.recommendation && (
                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">AI Mitigation Recommendation</p>
                    <p className="text-sm font-semibold text-white mt-1">"{alert.recommendation}"</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span>Location: <strong className="text-white">{alert.location}</strong></span>
                  <span>Trains Affected: <strong className="text-white">{alert.affectedTrain}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                <button
                  type="button"
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" /> Acknowledge & Execute
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
