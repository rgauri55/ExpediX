import React from 'react';
import { Menu, Search, Bell, CloudSnow, Wind } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { currentUser } = useAuth();

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-polar-border px-4 lg:px-6 py-2">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu toggle + Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search expeditions, personnel, assets..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200/80 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
            />
          </div>
        </div>

        {/* Right Side: Telemetry, Weather Widget, Notifications & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* System Online Status */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>System Online</span>
          </div>

          {/* Bharati Station Live Weather Card */}
          <div className="hidden md:flex items-center gap-3 px-3 py-1 bg-polar-blue-light/60 border border-blue-200/60 rounded-xl text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <CloudSnow className="w-4 h-4 text-polar-blue" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-navy-DEFAULT leading-tight">Bharati Station</span>
                <span className="text-xs font-bold text-slate-800 font-mono">-23°C <span className="text-[10px] font-normal text-slate-500 font-sans">Clear</span></span>
              </div>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Wind className="w-3.5 h-3.5 text-sky-600" />
              <span>14 km/h</span>
            </div>
          </div>

          {/* Notification Center */}
          <button 
            type="button"
            className="relative p-1.5 text-slate-500 hover:text-navy-DEFAULT hover:bg-slate-100 rounded-lg transition-colors"
            title="Operational Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-navy-DEFAULT text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {currentUser.initials}
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-polar-muted">
                {currentUser.roleTitle}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
