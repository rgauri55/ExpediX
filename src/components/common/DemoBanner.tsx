import React from 'react';

interface DemoBannerProps {
  compact?: boolean;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span>Demo Environment • Simulation Data</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-navy-950 to-navy text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between border-b border-navy-700/50">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="font-semibold text-amber-300 uppercase tracking-wider text-[11px]">Demo Environment</span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="text-slate-300 hidden sm:inline text-[11px]">Fictional Simulation Data for Prototype Demonstration</span>
      </div>
      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
        <span className="hidden md:inline">Mission ID: <strong className="text-sky-300 font-mono">IAE-2026-W03</strong></span>
        <span className="hidden md:inline">|</span>
        <span className="text-slate-300 font-mono">Bharati Station • Antarctica</span>
      </div>
    </div>
  );
};
