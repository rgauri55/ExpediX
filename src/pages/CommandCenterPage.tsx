import React from 'react';
import { 
  Users, 
  Boxes, 
  Package, 
  Layers, 
  AlertTriangle, 
  Clock, 
  Radio, 
  MapPin, 
  Compass, 
  AlertCircle, 
  Mountain
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  DASHBOARD_METRICS, 
  OPERATIONAL_ALERTS, 
  RECENT_FIELD_ACTIVITIES, 
  UPCOMING_EXPEDITIONS 
} from '../data/demoData';
import { Badge } from '../components/common/Badge';

export const CommandCenterPage: React.FC = () => {
  const { currentExpedition } = useAuth();

  return (
    <div className="space-y-4 font-sans">
      
      {/* 1. TOP GREETING & OPERATIONS HEADER */}
      <div className="bg-white rounded-2xl border border-polar-border p-5 sm:p-6 shadow-subtle relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Subtle decorative polar mountain pattern on right */}
        <div className="absolute right-0 inset-y-0 w-80 bg-gradient-to-l from-polar-blue-light/40 to-transparent pointer-events-none hidden md:block" />
        
        <div className="relative z-10">
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-navy-DEFAULT tracking-tight">
            Good morning, Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Polar Expedition Operations Overview
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-polar-blue" />
              <span>Last synchronized: 09:42 UTC</span>
            </span>
            <span>|</span>
            <span>Bharati Station — New Delhi (IST: 15:12)</span>
          </div>
        </div>

        {/* Live Mission Badge */}
        <div className="relative z-10 flex items-center gap-2 self-start md:self-auto">
          <Badge variant="warning" dot size="sm">
            Demo Environment • Simulation Data
          </Badge>
        </div>
      </div>

      {/* 2. TOP KPI CARDS (6 METRICS ROW) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        
        {/* Card 1: Active Expeditions */}
        <div className="bg-white p-3.5 rounded-xl border border-polar-border shadow-subtle hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500">Active Expeditions</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-polar-blue flex items-center justify-center">
              <Mountain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-navy-DEFAULT">
            {DASHBOARD_METRICS.activeExpeditions.count}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 mt-1">
            <span>↑</span>
            <span>{DASHBOARD_METRICS.activeExpeditions.trend}</span>
          </div>
        </div>

        {/* Card 2: Personnel Deployed */}
        <div className="bg-white p-3.5 rounded-xl border border-polar-border shadow-subtle hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500">Personnel Deployed</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-navy-DEFAULT">
            {DASHBOARD_METRICS.personnelDeployed.count}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 mt-1">
            <span>▲</span>
            <span>{DASHBOARD_METRICS.personnelDeployed.trend}</span>
          </div>
        </div>

        {/* Card 3: Cargo Tracked */}
        <div className="bg-white p-3.5 rounded-xl border border-polar-border shadow-subtle hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500">Cargo Tracked</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-polar-blue flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-navy-DEFAULT">
            {DASHBOARD_METRICS.cargoTracked.count}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 mt-1">
            <span>▲</span>
            <span>{DASHBOARD_METRICS.cargoTracked.trend}</span>
          </div>
        </div>

        {/* Card 4: Assets Active */}
        <div className="bg-white p-3.5 rounded-xl border border-polar-border shadow-subtle hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500">Assets Active</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-navy-DEFAULT">
            {DASHBOARD_METRICS.activeAssets.count}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium text-amber-600 mt-1">
            <span>▲</span>
            <span>{DASHBOARD_METRICS.activeAssets.trend}</span>
          </div>
        </div>

        {/* Card 5: Inventory Categories */}
        <div className="bg-white p-3.5 rounded-xl border border-polar-border shadow-subtle hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500">Inventory Categories</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-navy-DEFAULT">
            {DASHBOARD_METRICS.inventoryCategories.count}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium text-amber-600 mt-1">
            <span>▲</span>
            <span>{DASHBOARD_METRICS.inventoryCategories.trend}</span>
          </div>
        </div>

        {/* Card 6: Active Alerts */}
        <div className="bg-white p-3.5 rounded-xl border border-rose-200/80 shadow-subtle hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-rose-700">Active Alerts</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-rose-600">
            {DASHBOARD_METRICS.activeAlerts.count}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium text-rose-600 mt-1">
            <span>▲</span>
            <span>{DASHBOARD_METRICS.activeAlerts.trend}</span>
          </div>
        </div>

      </div>

      {/* 3. MAIN OPERATIONAL 3-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: Active & Upcoming Expeditions (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Expedition Card */}
          <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT">
                Active Expedition
              </h3>
              <span className="text-[11px] text-polar-blue font-semibold hover:underline cursor-pointer">
                View All →
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-polar-blue text-white flex items-center justify-center font-bold text-xs">
                    <Mountain className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-DEFAULT">
                      {currentExpedition.code}
                    </h4>
                    <span className="text-[11px] text-slate-500 line-clamp-1">
                      {currentExpedition.name}
                    </span>
                  </div>
                </div>
                <Badge variant="success" dot size="sm">
                  Active
                </Badge>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-3">
                <MapPin className="w-3 h-3 text-polar-blue" />
                <span>{currentExpedition.location}</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Mission Progress</span>
                  <span className="font-bold text-slate-800 font-mono">82%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-polar-blue rounded-full w-[82%]" />
                </div>
              </div>

              {/* 4 Mini Stat Pills */}
              <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-200/60 text-center">
                <div className="p-1 rounded bg-white border border-slate-200/60">
                  <span className="text-[9px] text-slate-400 block">Personnel</span>
                  <span className="text-xs font-bold text-navy-DEFAULT font-mono">{currentExpedition.personnelCount}</span>
                </div>
                <div className="p-1 rounded bg-white border border-slate-200/60">
                  <span className="text-[9px] text-slate-400 block">Cargo</span>
                  <span className="text-xs font-bold text-navy-DEFAULT font-mono">{currentExpedition.cargoCount}</span>
                </div>
                <div className="p-1 rounded bg-white border border-slate-200/60">
                  <span className="text-[9px] text-slate-400 block">Assets</span>
                  <span className="text-xs font-bold text-navy-DEFAULT font-mono">{currentExpedition.assetCount}</span>
                </div>
                <div className="p-1 rounded bg-white border border-slate-200/60">
                  <span className="text-[9px] text-slate-400 block">Inventory</span>
                  <span className="text-xs font-bold text-navy-DEFAULT font-mono">12</span>
                </div>
              </div>

            </div>
          </div>

          {/* Upcoming Expeditions List */}
          <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT">
                Upcoming Expeditions
              </h3>
              <span className="text-[11px] text-polar-blue font-semibold hover:underline cursor-pointer">
                View All →
              </span>
            </div>

            <div className="space-y-2">
              {UPCOMING_EXPEDITIONS.map((exp) => (
                <div
                  key={exp.id}
                  className="p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/70 transition-all flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-polar-blue flex items-center justify-center shrink-0">
                      <Mountain className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {exp.code}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">
                        {exp.name}
                      </p>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">
                        {exp.durationFormatted.split('–')[0]} • {exp.stationName}
                      </p>
                    </div>
                  </div>

                  <Badge 
                    variant={exp.status === 'Planning' ? 'warning' : exp.status === 'Scheduled' ? 'primary' : 'neutral'}
                    size="sm"
                  >
                    {exp.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CENTER COLUMN: Expedition Overview Map & Route Visualization (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-polar-border p-4 shadow-subtle flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT">
                  Expedition Overview Map
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  Schematic / Demo Route — Not real-time GPS
                </span>
              </div>
              <span className="text-[11px] text-polar-blue font-semibold hover:underline cursor-pointer">
                View Details →
              </span>
            </div>

            {/* Map Canvas Visual (Polar Schematic SVG) */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden polar-map-bg border border-blue-200/80 p-3 shadow-inner flex flex-col justify-between">
              
              {/* Radar Grid Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-64 h-64 rounded-full border border-sky-600" />
                <div className="w-44 h-44 rounded-full border border-sky-600 absolute" />
                <div className="w-24 h-24 rounded-full border border-sky-600 absolute" />
              </div>

              {/* Antarctic Outline SVG representation */}
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
                {/* Traverse Route connecting line */}
                <path
                  d="M210 110 L205 180 L205 270"
                  stroke="#0B65D8"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Legend Badges on Top Right */}
              <div className="relative z-10 flex flex-col items-end gap-1 text-[10px]">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/90 backdrop-blur shadow-xs text-slate-700 font-medium border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Bharati Station</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/90 backdrop-blur shadow-xs text-slate-700 font-medium border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Field Camp Alpha</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/90 backdrop-blur shadow-xs text-slate-700 font-medium border border-rose-100">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-rose-700 font-bold">⚠ Survey Zone B</span>
                </div>
              </div>

              {/* Waypoint Markers on Map */}
              <div className="relative z-10 w-full h-full flex flex-col justify-around items-center -mt-6">
                
                {/* 1. Bharati Station Point */}
                <div className="flex items-center gap-1.5 bg-navy-DEFAULT text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md transform -translate-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                  <span>Bharati Station</span>
                </div>

                {/* 2. Field Camp Alpha Point */}
                <div className="flex items-center gap-1.5 bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md transform translate-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
                  <span>Field Camp Alpha</span>
                </div>

                {/* 3. Survey Zone B Warning Point */}
                <div className="flex items-center gap-1.5 bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md animate-bounce">
                  <AlertTriangle className="w-3 h-3 text-amber-300" />
                  <span>Survey Zone B</span>
                </div>

              </div>

              {/* Bottom Inset: Compass & Coordinates */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-600 bg-white/80 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-200/80">
                <div className="flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-polar-blue" />
                  <span>70° 46&apos; S, 11° 44&apos; E</span>
                </div>
                <span className="font-semibold text-navy-DEFAULT">Bharati Sector</span>
              </div>

            </div>
          </div>

          {/* Safety Alert Action Banner right under map */}
          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900 block">
                  Safety Alert: Survey Zone B — High Risk
                </span>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Severe snowfall + high winds detected. 3 field personnel potentially affected.
                </p>
                <p className="text-[11px] font-semibold text-amber-950 mt-1">
                  Recommended: Delay movement or use Alternate Route A.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Emergency Alerts & Field Activity (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Emergency & Operational Alerts */}
          <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT">
                Emergency &amp; Operational Alerts
              </h3>
              <span className="text-[11px] text-polar-blue font-semibold hover:underline cursor-pointer">
                View All →
              </span>
            </div>

            <div className="space-y-2">
              {OPERATIONAL_ALERTS.map((alert) => {
                const isCritical = alert.severity === 'Critical';
                const isWarning = alert.severity === 'Warning';

                return (
                  <div
                    key={alert.id}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isCritical
                        ? 'bg-rose-50/70 border-rose-200'
                        : isWarning
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-blue-50/40 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        {isCritical ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        ) : isWarning ? (
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        ) : (
                          <Radio className="w-3.5 h-3.5 text-polar-blue shrink-0" />
                        )}
                        <span className="text-xs font-bold text-slate-800">
                          {alert.title} <span className="font-mono text-[10px] text-slate-500">— {alert.code}</span>
                        </span>
                      </div>
                      <Badge 
                        variant={isCritical ? 'emergency' : isWarning ? 'warning' : 'primary'} 
                        size="sm"
                      >
                        {alert.severity}
                      </Badge>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                      {alert.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1.5 pt-1 border-t border-slate-200/50">
                      <span>{alert.location}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Field Activity */}
          <div className="bg-white rounded-2xl border border-polar-border p-4 shadow-subtle">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT">
                Recent Field Activity
              </h3>
              <span className="text-[11px] text-polar-blue font-semibold hover:underline cursor-pointer">
                View All →
              </span>
            </div>

            <div className="space-y-2">
              {RECENT_FIELD_ACTIVITIES.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-200/60 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-polar-blue shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-800 truncate">
                        {act.title}
                      </p>
                      <p className="text-[9px] text-slate-400 font-mono truncate">
                        {act.location} • {act.timestamp}
                      </p>
                    </div>
                  </div>

                  <Badge 
                    variant={act.status === 'Synced' ? 'success' : 'warning'} 
                    size="sm"
                  >
                    {act.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 4. BOTTOM OPERATIONAL STATUS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Live Expedition Progress Stepper (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-polar-border p-4 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT">
                Live Expedition Progress
              </span>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                IAE-2026-W03 • Bharati Station
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center pt-2">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold mb-1 shadow-sm">
                ✓
              </div>
              <span className="text-[11px] font-bold text-slate-800">Planning</span>
              <span className="text-[9px] text-emerald-600 font-medium">Completed</span>
              <span className="text-[8px] text-slate-400 font-mono">12 Aug</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-polar-blue text-white flex items-center justify-center text-[10px] font-bold mb-1 shadow-sm">
                ✓
              </div>
              <span className="text-[11px] font-bold text-slate-800">Logistics</span>
              <span className="text-[9px] text-polar-blue font-medium">In Progress</span>
              <span className="text-[8px] text-slate-400 font-mono">16 Aug</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-polar-blue text-white flex items-center justify-center text-[10px] font-bold mb-1 shadow-sm">
                ✓
              </div>
              <span className="text-[11px] font-bold text-slate-800">Deployment</span>
              <span className="text-[9px] text-polar-blue font-medium">In Progress</span>
              <span className="text-[8px] text-slate-400 font-mono">20 Aug</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center opacity-60">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold mb-1">
                4
              </div>
              <span className="text-[11px] font-semibold text-slate-700">Field Ops</span>
              <span className="text-[9px] text-slate-400 font-medium">Upcoming</span>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center opacity-60">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold mb-1">
                5
              </div>
              <span className="text-[11px] font-semibold text-slate-700">Completion</span>
              <span className="text-[9px] text-slate-400 font-medium">Upcoming</span>
            </div>

          </div>
        </div>

        {/* Synchronization Status Ring Widget (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-polar-border p-4 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT">
              Synchronization Status
            </span>
            <span className="text-[11px] text-polar-blue font-semibold hover:underline cursor-pointer">
              View Details →
            </span>
          </div>

          <div className="flex items-center gap-4 py-1">
            {/* 100% Circle Gauge */}
            <div className="relative w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center shrink-0 shadow-sm bg-emerald-50/30">
              <div className="text-center">
                <span className="text-xs font-extrabold text-navy-DEFAULT font-mono block leading-none">100%</span>
                <span className="text-[8px] text-emerald-700 font-bold uppercase">Synced</span>
              </div>
            </div>

            {/* Stats */}
            <div className="text-[10px] space-y-1 text-slate-500 font-mono">
              <div>Last Sync: <strong className="text-slate-800">09:42 UTC</strong></div>
              <div>Pending Changes: <strong className="text-slate-800">0</strong></div>
              <div>Offline Devices: <strong className="text-amber-600">1</strong></div>
              <div>Total Updates Today: <strong className="text-slate-800">12</strong></div>
            </div>
          </div>
        </div>

        {/* Institutional Mission Motto Card (3 cols) */}
        <div className="lg:col-span-3 bg-gradient-to-br from-navy-DEFAULT to-navy-900 text-white rounded-2xl border border-navy-700 p-4 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-polar-blue to-cyan-300 p-0.5 flex items-center justify-center">
                <Mountain className="w-3.5 h-3.5 text-navy-DEFAULT" />
              </div>
              <span className="font-heading font-bold text-xs text-white">ExpediX</span>
            </div>
            <p className="text-xs italic text-sky-200/90 leading-relaxed font-serif">
              &ldquo;Exploration today, knowledge for tomorrow.&rdquo;
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-sky-300/70 font-mono">
            <span>Bharati Station • Antarctica</span>
            <span>Simulation</span>
          </div>
        </div>

      </div>

    </div>
  );
};
