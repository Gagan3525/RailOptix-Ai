import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Network", path: "/network" },
    { name: "Trains", path: "/trains" },
    { name: "Analytics", path: "/analytics" },
    { name: "Alerts", path: "/alerts", hasHelp: true },
    { name: "AI Assistant", path: "/ai-assistant", isAi: true },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-[#070b10] via-[#070b10]/80 to-transparent pt-3 pb-2 px-6 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand / Logo with the User's Railway Image */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/10 p-1 backdrop-blur-md transition-transform group-hover:scale-105">
            <img src="/logo.png" alt="RailOptix Logo" className="h-full w-full object-contain filter invert" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            railoptix-ai
          </span>
        </Link>

        {/* Center Floating Glass Pill Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md shadow-2xl">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-white/20 text-white shadow-inner font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.isAi && <Sparkles className="h-3.5 w-3.5 text-cyan-300 animate-pulse" />}
                <span>{link.name}</span>
                {link.hasHelp && (
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/20 text-[10px] text-slate-300">
                    ?
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Get Started Pill Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/network"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[#121924] px-6 py-2 text-xs font-semibold text-white transition-all hover:border-white/30 hover:bg-[#1a2332] shadow-lg"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;