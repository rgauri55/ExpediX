import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mountain, 
  MapPin, 
  Calendar, 
  User, 
  Users, 
  Boxes, 
  Layers, 
  Package, 
  AlertTriangle, 
  Radio, 
  ShieldAlert
} from 'lucide-react';
import { useExpeditions } from '../context/ExpeditionContext';
import { RECENT_FIELD_ACTIVITIES } from '../data/demoData';

export const ExpeditionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getExpeditionById, activeExpedition } = useExpeditions();

  const expedition = (id ? getExpeditionById(id) : undefined) || activeExpedition;

  if (!expedition) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-polar-border">
        <h2 className="text-lg font-bold text-navy-DEFAULT">Expedition Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">The requested expedition mission could not be located in the simulation registry.</p>
        <button
          onClick={() => navigate('/expeditions')}
          className="mt-4 px-4 py-2 bg-polar-blue text-white text-xs font-semibold rounded-xl"
        >
          Back to Expeditions
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Planning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Planned':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Completed':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-5 font-sans max-w-[1600px] mx-auto text-slate-800">
      
      {/* 1. TOP BREADCRUMB & BACK BUTTON */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/expeditions')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-polar-blue transition-colors px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Expeditions</span>
        </button>

        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
          SIMULATION ENVIRONMENT
        </span>
      </div>

      {/* 2. MISSION HERO CARD */}
      <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-card relative overflow-hidden">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#082D56] text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <Mountain className="w-7 h-7 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-blue-50 text-polar-blue border border-blue-200">
                  {expedition.code}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(expedition.status)}`}>
                  {expedition.status.toUpperCase()}
                </span>
                {expedition.season && (
                  <span className="text-[11px] text-slate-400 font-medium">
                    • {expedition.season} Season {expedition.year}
                  </span>
                )}
              </div>

              <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#082D56] mt-1.5">
                {expedition.name}
              </h1>

              <div className="flex items-center flex-wrap gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-polar-blue" />
                  <span>{expedition.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{expedition.durationFormatted}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Expedition Lead: {expedition.expeditionLead}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons for future modules */}
          <div className="flex items-center flex-wrap gap-2 self-start lg:self-center">
            <button
              onClick={() => {}}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-polar-blue" />
              <span>Manage Personnel</span>
            </button>
            <button
              onClick={() => {}}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Boxes className="w-3.5 h-3.5 text-sky-600" />
              <span>View Logistics</span>
            </button>
            <button
              onClick={() => navigate('/field-mode')}
              className="px-3.5 py-2 bg-polar-blue hover:bg-polar-blue-hover text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Field Traverse Mode</span>
            </button>
          </div>
        </div>

        {/* Objective Snippet */}
        {expedition.objective && (
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <span className="font-bold text-slate-800 mr-2 uppercase text-[10px] tracking-wider">Mission Objective:</span>
            <span>{expedition.objective}</span>
          </div>
        )}

      </div>

      {/* 3. 4 CORE METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        <div className="bg-white p-4 rounded-xl border border-polar-border shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500">Personnel Roster</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-polar-blue flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-navy-DEFAULT">
            {expedition.personnelCount}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Scientists, engineers &amp; field crew</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-polar-border shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500">Tracked Cargo</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-navy-DEFAULT">
            {expedition.cargoCount}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">TEU containers &amp; cold boxes</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-polar-border shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500">Fleet &amp; Assets</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-navy-DEFAULT">
            {expedition.assetCount}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Snowmobiles, generators &amp; sledges</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-polar-border shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500">Inventory Items</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-navy-DEFAULT">
            {expedition.inventoryCount || 12}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Rations, medical &amp; fuel categories</p>
        </div>

      </div>

      {/* 4. EXPEDITION TIMELINE STEPPER & SAFETY STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Timeline Stepper (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-polar-border p-5 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT">
                Expedition Lifecycle Milestones
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                {expedition.progressPercent}% overall completion
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center py-2">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold mb-1 shadow-sm">
                ✓
              </div>
              <span className="text-xs font-bold text-slate-800">Planning</span>
              <span className="text-[10px] text-emerald-600 font-medium">Completed</span>
              <span className="text-[9px] text-slate-400 font-mono">12 Aug</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold mb-1 shadow-sm">
                ✓
              </div>
              <span className="text-xs font-bold text-slate-800">Logistics</span>
              <span className="text-[10px] text-emerald-600 font-medium">Completed</span>
              <span className="text-[9px] text-slate-400 font-mono">16 Aug</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-polar-blue text-white flex items-center justify-center text-xs font-bold mb-1 shadow-sm">
                ✓
              </div>
              <span className="text-xs font-bold text-slate-800">Deployment</span>
              <span className="text-[10px] text-polar-blue font-medium">In Progress</span>
              <span className="text-[9px] text-slate-400 font-mono">20 Aug</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center opacity-60">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold mb-1">
                4
              </div>
              <span className="text-xs font-semibold text-slate-700">Field Ops</span>
              <span className="text-[10px] text-slate-400 font-medium">Upcoming</span>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center opacity-60">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold mb-1">
                5
              </div>
              <span className="text-xs font-semibold text-slate-700">Completion</span>
              <span className="text-[10px] text-slate-400 font-medium">Upcoming</span>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Duration: {expedition.durationFormatted}</span>
            <span>Station: {expedition.stationName}</span>
          </div>
        </div>

        {/* Safety & Environment Intelligence (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-polar-border p-5 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Safety &amp; Operational Readiness</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
              NORMAL / STANDBY
            </span>
          </div>

          {/* Safety Intelligence card */}
          <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Safety Alert: Survey Zone B — High Risk</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Severe snowfall + high winds detected. 3 field personnel potentially affected during traverse.
            </p>
            <p className="text-[11px] font-semibold text-amber-950">
              Action: Delay traverse or proceed via Alternate Route A.
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Offline Mesh Peer Sync: Active</span>
            <span>Last Checked: 09:42 UTC</span>
          </div>
        </div>

      </div>

      {/* 5. RECENT FIELD ACTIVITY FOR THIS EXPEDITION */}
      <div className="bg-white rounded-2xl border border-polar-border p-5 shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy-DEFAULT">
              Mission Activity &amp; Telemetry Log
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              (Live feed)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {RECENT_FIELD_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-2 h-2 rounded-full bg-polar-blue shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    {act.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">
                    {act.location} • {act.timestamp}
                  </p>
                </div>
              </div>

              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                act.status === 'Synced'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {act.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
