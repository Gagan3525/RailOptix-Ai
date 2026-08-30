import React, { useState } from "react";
import { Sliders, Check } from "lucide-react";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Sliders className="h-8 w-8 text-cyan-400" /> Platform Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">Manage profile info, operational notifications, and system preferences</p>
      </div>

      {/* Tabs Bar matching visual reference design */}
      <div className="flex border-b border-white/10 gap-8">
        {[
          { id: "profile", label: "Profile" },
          { id: "notifications", label: "Notifications" },
          { id: "preferences", label: "Preferences" },
          { id: "users", label: "Users" },
          { id: "apikeys", label: "API Keys" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-semibold transition-all relative ${
              activeTab === tab.id
                ? "text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-cyan-400" />
            )}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Profile Card */}
        <div className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Profile Information</h3>

          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
              RS
            </div>
            <div>
              <p className="font-bold text-white text-base">Rohit Sharma</p>
              <p className="text-xs text-slate-400">rohit.sharma@railoptix.ai</p>
              <span className="mt-1 inline-block rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400">
                Operations Manager
              </span>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Rohit Sharma"
                className="w-full rounded-xl border border-white/10 bg-white/10 py-2.5 px-3 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="rohit.sharma@railoptix.ai"
                className="w-full rounded-xl border border-white/10 bg-white/10 py-2.5 px-3 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSave}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Preferences Card matching reference */}
        <div className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Preferences</h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Theme</span>
              <select className="rounded-xl border border-white/10 bg-[#0c141f] py-2 px-3 text-xs text-white">
                <option value="dark">Dark (Cinematic)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Language</span>
              <select className="rounded-xl border border-white/10 bg-[#0c141f] py-2 px-3 text-xs text-white">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Time Zone</span>
              <select className="rounded-xl border border-white/10 bg-[#0c141f] py-2 px-3 text-xs text-white">
                <option value="IST">(UTC+05:30) Asia/Kolkata</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Distance Unit</span>
              <select className="rounded-xl border border-white/10 bg-[#0c141f] py-2 px-3 text-xs text-white">
                <option value="km">Kilometers</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Temperature Unit</span>
              <select className="rounded-xl border border-white/10 bg-[#0c141f] py-2 px-3 text-xs text-white">
                <option value="c">Celsius</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              className="mt-4 rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-5 py-2.5 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/30 transition-all flex items-center gap-2"
            >
              {saved ? <Check className="h-4 w-4 text-emerald-400" /> : null}
              {saved ? "Saved Preferences" : "Save Preferences"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
