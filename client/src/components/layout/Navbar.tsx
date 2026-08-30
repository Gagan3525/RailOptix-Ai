import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Activity } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Network", path: "/network" },
    { name: "Trains", path: "/trains" },
    { name: "Analytics", path: "/analytics" },
    { name: "Alerts", path: "/alerts", badge: "7" },
    { name: "AI Assistant", path: "/ai-assistant" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090E14]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-2 shadow-lg shadow-cyan-500/20">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            railoptix<span className="text-cyan-400">-ai</span>
          </span>
        </Link>

        {/* Primary Top Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3.5 py-2 text-sm font-medium transition-all rounded-lg ${
                  active
                    ? "text-white bg-white/10 font-semibold shadow-inner"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-black">
                      {link.badge}
                    </span>
                  )}
                </div>
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Tools & User Profile */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          </button>

          <Link
            to="/settings"
            className="flex items-center gap-2 p-1 pl-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              RS
            </div>
          </Link>

          <Link
            to="/network"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;