import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Clock, 
  Radio, 
  MapPin, 
  Compass, 
  AlertCircle, 
  Mountain
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ExpediXLogo } from '../components/common/ExpediXLogo';
import { 
  OPERATIONAL_ALERTS, 
  RECENT_FIELD_ACTIVITIES, 
  UPCOMING_EXPEDITIONS 
} from '../data/demoData';

export const CommandCenterPage: React.FC = () => {
  const { currentExpedition } = useAuth();

  return (
    <div className="space-y-3.5 font-sans max-w-[1600px] mx-auto text-slate-800">
      
      {/* ========================================================================= */}
      {/* 1. COMPACT HERO / WELCOME BANNER                                          */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-polar-border shadow-subtle overflow-hidden relative min-h-[105px] flex items-center justify-between p-5">
        
        {/* Right Background Image: Bharati Station Photo blending into the canvas */}
        <div 
          className="absolute inset-y-0 right-0 w-full md:w-[60%] lg:w-[50%] bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: "url('/bharati-station.jpg')" }}
        >
          {/* Smooth Left Gradient Blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
        </div>

        {/* Left Welcome Content */}
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-950 border border-amber-500/40">
              DEMO ENVIRONMENT • SIMULATION DATA
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-[28px] lg:text-[30px] font-bold text-[#082D56] tracking-tight">
            Good morning, Command Center
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm sm:text-[14.5px] text-slate-700 font-medium">
            <span>Polar Expedition Operations Overview</span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 font-mono text-xs sm:text-[13px] text-slate-700">
              <Clock className="w-3.5 h-3.5 text-polar-blue" />
              <span>Last synchronized: 09:42 UTC</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-900 font-semibold">Bharati Station — Antarctica</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. LIVE EXPEDITION PROGRESS (DIRECTLY BELOW HERO)                         */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-polar-border p-3.5 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#082D56]">
              Live Expedition Progress
            </h2>
            <span className="text-xs sm:text-[13px] font-mono text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded font-bold border border-slate-200">
              {currentExpedition.code} • {currentExpedition.stationName}
            </span>
          </div>
          <div className="text-xs sm:text-[13px] text-slate-700 font-medium flex items-center gap-2">
            <span>Current Phase: <strong className="text-polar-blue font-bold">Field Deployment &amp; Ops</strong></span>
            <span className="text-slate-300">|</span>
            <span>Est. Return: <strong className="text-slate-900 font-mono">15 Mar 2026</strong></span>
          </div>
        </div>

        {/* Compact 5-Stage Stepper with Strong Readability */}
        <div className="grid grid-cols-5 gap-2 text-center">
          
          {/* Step 1: Planning */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold mb-1 shadow-xs">
              ✓
            </div>
            <span className="text-xs sm:text-[13.5px] font-bold text-slate-900">Planning</span>
            <span className="text-[12px] sm:text-[12.5px] text-emerald-800 font-semibold">Completed</span>
            <span className="text-[11.5px] sm:text-xs text-slate-600 font-mono font-medium">12 Aug</span>
          </div>

          {/* Step 2: Logistics */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold mb-1 shadow-xs">
              ✓
            </div>
            <span className="text-xs sm:text-[13.5px] font-bold text-slate-900">Logistics</span>
            <span className="text-[12px] sm:text-[12.5px] text-emerald-800 font-semibold">Completed</span>
            <span className="text-[11.5px] sm:text-xs text-slate-600 font-mono font-medium">16 Aug</span>
          </div>

          {/* Step 3: Deployment */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-polar-blue text-white flex items-center justify-center text-[11px] font-bold mb-1 shadow-xs ring-2 ring-blue-100">
              ✓
            </div>
            <span className="text-xs sm:text-[13.5px] font-bold text-[#082D56]">Deployment</span>
            <span className="text-[12px] sm:text-[12.5px] text-polar-blue font-bold">In Progress</span>
            <span className="text-[11.5px] sm:text-xs text-slate-600 font-mono font-medium">20 Aug</span>
          </div>

          {/* Step 4: Field Ops */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-blue-50 border-2 border-polar-blue text-polar-blue flex items-center justify-center text-[11px] font-bold mb-1">
              4
            </div>
            <span className="text-xs sm:text-[13.5px] font-bold text-slate-900">Field Ops</span>
            <span className="text-[12px] sm:text-[12.5px] text-polar-blue font-semibold">Active Buffer</span>
            <span className="text-[11.5px] sm:text-xs text-slate-600 font-mono font-medium">Underway</span>
          </div>

          {/* Step 5: Completion */}
          <div className="flex flex-col items-center opacity-75">
            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-600 flex items-center justify-center text-[11px] font-bold mb-1">
              5
            </div>
            <span className="text-xs sm:text-[13.5px] font-semibold text-slate-800">Completion</span>
            <span className="text-[12px] sm:text-[12.5px] text-slate-600 font-medium">Upcoming</span>
            <span className="text-[11.5px] sm:text-xs text-slate-500 font-mono">Stage 7</span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN OPERATIONAL GRID (BALANCED 3 COLUMNS)                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-start">
        
        {/* ================= LEFT COLUMN: ACTIVE EXPEDITION ================= */}
        <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle flex flex-col">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Mountain className="w-4 h-4 text-polar-blue" />
              <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#082D56]">
                Active Expedition
              </h2>
            </div>
            <Link to="/expeditions" className="text-xs sm:text-[13px] text-polar-blue font-semibold hover:underline flex items-center gap-1">
              <span>View Details</span>
              <span className="text-[11px]">→</span>
            </Link>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/70">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-[13.5px] font-bold text-[#082D56] font-mono">
                    {currentExpedition.code}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-bold uppercase">
                    ACTIVE
                  </span>
                </div>
                <h3 className="text-[15px] sm:text-base font-bold text-slate-900 mt-1 leading-snug">
                  {currentExpedition.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs sm:text-[13.5px] text-slate-700 font-medium my-2">
              <MapPin className="w-3.5 h-3.5 text-polar-blue shrink-0" />
              <span>{currentExpedition.location}</span>
            </div>

            {/* Mission Progress Bar */}
            <div className="space-y-1.5 my-2.5 bg-white p-2.5 rounded-lg border border-slate-200/70">
              <div className="flex items-center justify-between text-xs sm:text-[13px]">
                <span className="text-slate-700 font-semibold">Mission Progress</span>
                <span className="font-bold text-[#082D56] font-mono text-xs sm:text-[14px]">82%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-polar-blue rounded-full w-[82%] transition-all" />
              </div>
            </div>

            {/* 4 Resource Stat Pills with Enhanced Readability */}
            <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200/70 shadow-2xs">
                <span className="text-[12px] sm:text-[12.5px] font-semibold text-slate-700 uppercase tracking-wider block">Personnel</span>
                <span className="text-sm sm:text-[15px] font-bold text-[#082D56] font-mono mt-0.5 block">{currentExpedition.personnelCount}</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200/70 shadow-2xs">
                <span className="text-[12px] sm:text-[12.5px] font-semibold text-slate-700 uppercase tracking-wider block">Cargo</span>
                <span className="text-sm sm:text-[15px] font-bold text-[#082D56] font-mono mt-0.5 block">{currentExpedition.cargoCount}</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200/70 shadow-2xs">
                <span className="text-[12px] sm:text-[12.5px] font-semibold text-slate-700 uppercase tracking-wider block">Assets</span>
                <span className="text-sm sm:text-[15px] font-bold text-[#082D56] font-mono mt-0.5 block">{currentExpedition.assetCount}</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200/70 shadow-2xs">
                <span className="text-[12px] sm:text-[12.5px] font-semibold text-slate-700 uppercase tracking-wider block">Inventory</span>
                <span className="text-sm sm:text-[15px] font-bold text-[#082D56] font-mono mt-0.5 block">12</span>
              </div>
            </div>

            {/* Operational Mission Context Notes */}
            <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs sm:text-[12.5px] text-slate-700 font-medium">
              <span>Lead: <strong className="text-slate-900 font-bold">Dr. Rajesh Nair</strong></span>
              <span className="font-mono text-slate-600 font-semibold">Traverse Day 18</span>
            </div>

          </div>
        </div>

        {/* ================= CENTER COLUMN: EXPEDITION OVERVIEW MAP ================= */}
        <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle flex flex-col">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-polar-blue" />
                <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#082D56]">
                  Expedition Overview Map
                </h2>
              </div>
              <span className="text-xs sm:text-[12.5px] text-slate-600 font-mono font-medium">
                Schematic operational view • Simulated location data
              </span>
            </div>
            <Link to="/expeditions" className="text-xs sm:text-[13px] text-polar-blue font-semibold hover:underline flex items-center gap-1 shrink-0">
              <span>View Details</span>
              <span className="text-[11px]">→</span>
            </Link>
          </div>

          {/* Map Canvas Visual */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden polar-map-bg border border-blue-200/90 p-2.5 shadow-inner flex flex-col justify-between">
            
            {/* Radar Grid Circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-48 h-48 rounded-full border border-sky-600" />
              <div className="w-32 h-32 rounded-full border border-sky-600 absolute" />
              <div className="w-16 h-16 rounded-full border border-sky-600 absolute" />
            </div>

            {/* Antarctic Outline SVG */}
            <svg
              className="absolute inset-0 w-full h-full object-contain opacity-40 pointer-events-none"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M200 60C260 60 330 110 350 170C370 230 330 310 270 340C210 370 130 360 80 300C30 240 50 160 90 110C130 60 170 60 200 60Z"
                fill="#FFFFFF"
                stroke="#93C5FD"
                strokeWidth="2"
              />
              <path
                d="M210 110 L205 180 L205 270"
                stroke="#0B65D8"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Legend Badges on Top Right */}
            <div className="relative z-10 flex flex-col items-end gap-1 text-xs sm:text-[12px]">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/95 backdrop-blur shadow-xs text-slate-900 font-semibold border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Bharati Station</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/95 backdrop-blur shadow-xs text-slate-900 font-semibold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Field Camp Alpha</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/95 backdrop-blur shadow-xs text-rose-800 font-bold border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>⚠ Survey Zone B</span>
              </div>
            </div>

            {/* Waypoint Markers on Map */}
            <div className="relative z-10 w-full flex justify-around items-center my-auto">
              {/* 1. Bharati Station Point */}
              <div className="flex items-center gap-1.5 bg-[#082D56] text-white px-2.5 py-0.5 rounded-full text-xs sm:text-[12px] font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-sky-300" />
                <span>Bharati Station</span>
              </div>

              {/* 2. Field Camp Alpha Point */}
              <div className="flex items-center gap-1.5 bg-emerald-700 text-white px-2.5 py-0.5 rounded-full text-xs sm:text-[12px] font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-200" />
                <span>Field Camp Alpha</span>
              </div>

              {/* 3. Survey Zone B Warning Point */}
              <div className="flex items-center gap-1.5 bg-rose-700 text-white px-2.5 py-0.5 rounded-full text-xs sm:text-[12px] font-bold shadow-md animate-bounce">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                <span>Survey Zone B</span>
              </div>
            </div>

            {/* Bottom Inset: Coordinates */}
            <div className="relative z-10 flex items-center justify-between text-xs sm:text-[12px] font-mono text-slate-800 font-medium bg-white/95 backdrop-blur px-2.5 py-0.5 rounded border border-slate-200/90">
              <div className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-polar-blue" />
                <span>70° 46&apos; S, 11° 44&apos; E</span>
              </div>
              <span className="font-bold text-[#082D56]">SIMULATED MAP</span>
            </div>

          </div>

          {/* Integrated Safety Intelligence Alert */}
          <div className="mt-2.5 p-3 rounded-xl bg-amber-50/90 border border-amber-200/90 text-xs">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-950 block text-xs sm:text-[13.5px]">
                    SAFETY ALERT: Survey Zone B — High Risk
                  </span>
                  <p className="text-xs sm:text-[13px] text-amber-950 font-medium mt-0.5 leading-normal">
                    Severe snowfall + high winds detected. 3 field personnel affected.
                  </p>
                  <p className="text-xs sm:text-[12.5px] font-semibold text-amber-950 mt-1">
                    Recommended: Delay movement or use Alternate Route A.
                  </p>
                </div>
              </div>

              <Link
                to="/emergency"
                className="px-2.5 py-1 rounded-md bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shrink-0 transition-colors shadow-xs"
              >
                View Alert
              </Link>
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: EMERGENCY & OPERATIONAL ALERTS ================= */}
        <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle flex flex-col">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#082D56]">
                Emergency &amp; Operational Alerts
              </h2>
            </div>
            <Link to="/emergency" className="text-xs sm:text-[13px] text-polar-blue font-semibold hover:underline flex items-center gap-1">
              <span>View All</span>
              <span className="text-[11px]">→</span>
            </Link>
          </div>

          {/* Compact Alert Cards List with Prominent Typography */}
          <div className="space-y-2">
            {OPERATIONAL_ALERTS.map((alert) => {
              const isCritical = alert.severity === 'Critical';
              const isWarning = alert.severity === 'Warning';

              return (
                <Link
                  key={alert.id}
                  to="/emergency"
                  className={`block p-2.5 rounded-xl border transition-all hover:shadow-xs ${
                    isCritical
                      ? 'bg-rose-50/70 border-rose-200 hover:border-rose-300'
                      : isWarning
                      ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                      : 'bg-blue-50/40 border-blue-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {isCritical ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      ) : isWarning ? (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <Radio className="w-4 h-4 text-polar-blue shrink-0" />
                      )}
                      <span className="text-xs sm:text-[14.5px] font-bold text-slate-900 truncate">
                        {alert.title} <span className="font-mono text-xs sm:text-[13px] text-slate-700 font-semibold">— {alert.code}</span>
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] sm:text-xs font-bold uppercase shrink-0 ${
                      isCritical
                        ? 'bg-rose-100 text-rose-800'
                        : isWarning
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-700 line-clamp-2 mt-0.5 leading-normal font-normal">
                    {alert.description}
                  </p>

                  <div className="flex items-center justify-between text-xs sm:text-[12.5px] text-slate-600 font-mono font-medium mt-1.5 pt-1 border-t border-slate-200/60">
                    <span>{alert.location}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-mono">
            <span>Protocol: <strong className="text-slate-800 font-bold">Standard 4.2</strong></span>
            <span className="text-slate-500 font-medium">Auto-monitoring</span>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. LOWER SECTION: COMPACT BALANCED 4-COLUMN GRID                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* A. UPCOMING EXPEDITIONS */}
        <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
              <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#082D56]">
                Upcoming Expeditions
              </h3>
              <Link to="/expeditions" className="text-xs sm:text-[13px] text-polar-blue font-semibold hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-2">
              {UPCOMING_EXPEDITIONS.map((exp) => (
                <div
                  key={exp.id}
                  className="p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/70 transition-all flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-polar-blue flex items-center justify-center shrink-0">
                      <Mountain className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-[13.5px] font-bold text-slate-900 truncate">
                        {exp.code}
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-700 font-medium truncate">
                        {exp.name}
                      </p>
                      <p className="text-xs sm:text-[12px] text-slate-600 font-mono font-medium mt-0.5">
                        {exp.stationName}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                    exp.status === 'Planning'
                      ? 'bg-amber-50 text-amber-800 border border-amber-300'
                      : exp.status === 'Scheduled'
                      ? 'bg-blue-50 text-blue-800 border border-blue-300'
                      : 'bg-slate-100 text-slate-800 border border-slate-300'
                  }`}>
                    {exp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-700 font-mono border-t border-slate-100 mt-2">
            Next departure: <strong className="text-slate-900 font-bold">01 Nov 2026</strong>
          </div>
        </div>

        {/* B. RECENT FIELD ACTIVITY */}
        <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
              <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#082D56]">
                Recent Field Activity
              </h3>
              <Link to="/field-operations" className="text-xs sm:text-[13px] text-polar-blue font-semibold hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-1.5">
              {RECENT_FIELD_ACTIVITIES.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-200/60 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-polar-blue shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-[13.5px] font-semibold text-slate-900 truncate">
                        {act.title}
                      </p>
                      <p className="text-xs sm:text-[12px] text-slate-600 font-mono font-medium truncate">
                        {act.location} • {act.timestamp}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                    act.status === 'Synced'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-50 text-amber-800 border border-amber-300'
                  }`}>
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-700 font-mono border-t border-slate-100 mt-2">
            Auto-refresh: <strong className="text-slate-900 font-bold">Every 60s</strong>
          </div>
        </div>

        {/* C. SYNCHRONIZATION STATUS */}
        <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
              <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#082D56]">
                Sync Status
              </h3>
              <Link to="/synchronization" className="text-xs sm:text-[13px] text-polar-blue font-semibold hover:underline">
                View All →
              </Link>
            </div>

            <div className="flex items-center gap-3.5 py-1">
              {/* 100% Circle Gauge */}
              <div className="relative w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center shrink-0 shadow-xs bg-emerald-50/40">
                <div className="text-center">
                  <span className="text-sm sm:text-base font-extrabold text-[#082D56] font-mono block leading-none">100%</span>
                  <span className="text-[10px] text-emerald-800 font-bold uppercase">Synced</span>
                </div>
              </div>

              {/* Stats */}
              <div className="text-xs sm:text-[12.5px] space-y-1 text-slate-700 font-mono font-medium">
                <div>Last Sync: <strong className="text-slate-900">09:42 UTC</strong></div>
                <div>Pending: <strong className="text-slate-900">0 records</strong></div>
                <div>Offline Units: <strong className="text-amber-800 font-bold">1</strong></div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-700 font-mono border-t border-slate-100 mt-2">
            Mesh Relay: <strong className="text-emerald-800 font-bold">ACTIVE</strong>
          </div>
        </div>

        {/* D. INSTITUTIONAL MISSION & MOTTO CARD */}
        <div className="bg-gradient-to-br from-[#082D56] to-[#041B35] text-white rounded-2xl border border-navy-700 p-4 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ExpediXLogo variant="mark" theme="dark" size={20} />
              <span className="font-heading font-bold text-sm text-white">
                Expedi<span className="text-sky-300">X</span>
              </span>
            </div>
            <p className="text-xs sm:text-[13px] italic text-sky-100 leading-relaxed font-serif">
              &ldquo;Exploration today, knowledge for tomorrow.&rdquo;
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-sky-200 font-mono font-medium">
            <span>Bharati Station • Antarctica</span>
            <span className="text-sky-300 font-bold">IAE-2026-W03</span>
          </div>
        </div>

      </div>

    </div>
  );
};


