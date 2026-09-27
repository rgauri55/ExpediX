import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Wrench,
  MapPin,
  Clock,
  Compass,
  Zap,
  Users,
  User,
  ShieldAlert,
  ShieldCheck,
  Radio,
  FileText,
  Activity,
  BatteryCharging,
  Fuel,
} from 'lucide-react';
import { useCargoAssets } from '../context/CargoAssetContext';
import type { AssetStatus } from '../types';

export const AssetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAssetById, assetList } = useCargoAssets();

  const [showFullHistory, setShowFullHistory] = useState(false);
  const [maintenanceLogged, setMaintenanceLogged] = useState(false);

  const asset = (id ? getAssetById(id) : undefined) || assetList[0];

  if (!asset) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-polar-border">
        <h2 className="text-lg font-bold text-[#082D56]">Polar Asset Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">
          The requested asset record could not be retrieved from the active equipment registry.
        </p>
        <button
          onClick={() => navigate('/cargo-assets')}
          className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-polar-blue rounded-xl"
        >
          Return to Cargo &amp; Assets
        </button>
      </div>
    );
  }

  const getAssetStatusBadge = (status: AssetStatus) => {
    switch (status) {
      case 'OPERATIONAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            OPERATIONAL
          </span>
        );
      case 'IN USE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            IN USE
          </span>
        );
      case 'IN TRANSIT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            IN TRANSIT
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            MAINTENANCE DUE
          </span>
        );
      case 'ATTENTION':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-50 text-rose-700 border border-rose-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            ATTENTION REQUIRED
          </span>
        );
    }
  };

  const isAttention = asset.status === 'ATTENTION' || asset.condition === 'Inspection Required';

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      
      {/* 1. Breadcrumbs & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            to="/cargo-assets"
            className="flex items-center gap-1 font-semibold text-polar-blue hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cargo &amp; Assets</span>
          </Link>
          <span>/</span>
          <span className="text-slate-400">{asset.assignedExpedition}</span>
          <span>/</span>
          <span className="text-slate-700 font-medium">{asset.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold border border-sky-200">
            SIMULATION DATA • {asset.id}
          </span>
          <button
            onClick={() => setMaintenanceLogged(true)}
            className="px-3 py-1.5 text-xs font-semibold text-polar-blue bg-white border border-polar-blue/30 hover:bg-sky-50 rounded-xl transition-colors"
          >
            {maintenanceLogged ? 'Service Logged ✓' : 'Log Maintenance Check'}
          </button>
        </div>
      </div>

      {/* 2. Top Profile Hero Card */}
      <div className="bg-white rounded-2xl border border-polar-border shadow-xs overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-[#082D56] via-[#0B3A6F] to-[#0A4B8F] text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg shrink-0">
                <Zap className="w-7 h-7 text-sky-300" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-400/20 text-sky-200 border border-sky-400/30">
                    {asset.id}
                  </span>
                  <h1 className="text-lg sm:text-xl font-bold font-heading text-white">
                    {asset.name}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-sky-100 font-medium">
                  {asset.type} • <span className="text-sky-300">{asset.category}</span>
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap pt-1">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    Expedition: {asset.assignedExpedition}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    Current: {asset.currentLocation}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-200 font-medium">Asset Status:</span>
                {getAssetStatusBadge(asset.status)}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Clock className="w-3.5 h-3.5 text-sky-300" />
                <span>Last Maintenance: <strong className="text-white">{asset.lastMaintenance}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-medium">
                <Activity className="w-3 h-3" />
                <span>Usage: {asset.usageFormatted}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Diagnostics Strip */}
        <div className="px-6 py-3 bg-slate-50 border-t border-polar-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Assigned Team</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1 truncate">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {asset.assignedTeam}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Current Operator</span>
            <span className="font-semibold text-polar-blue flex items-center gap-1 truncate">
              <User className="w-3.5 h-3.5 text-polar-blue" />
              {asset.operator || 'Field Technician'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Asset Condition</span>
            <span className={`font-semibold flex items-center gap-1 ${
              asset.condition === 'Optimal' || asset.condition === 'Good'
                ? 'text-emerald-700'
                : 'text-amber-700'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {asset.condition}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Telemetry Mesh</span>
            <span className="font-semibold text-[#082D56] flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-emerald-600" />
              {asset.telemetryStatus || 'Connected'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Operational Attention Warning Banner */}
      {isAttention && (
        <div className="bg-amber-50 rounded-2xl border border-amber-300 p-4.5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-amber-950">
                  MAINTENANCE / INSPECTION ADVISORY
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                  {asset.condition.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                {asset.safetyNote || 'Asset requires pre-traverse safety inspection before deployment in sub-zero terrain.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setMaintenanceLogged(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Mark Inspected &amp; Clear</span>
          </button>
        </div>
      )}

      {/* 4. Telemetry & Movement History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Activity & Movement History */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Movement History Log */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-polar-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-polar-blue/10 text-polar-blue flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#082D56]">Recent Activity &amp; Movement</h3>
                  <p className="text-xs text-slate-500">Traverse sorties, location transitions and operators</p>
                </div>
              </div>
              <button
                onClick={() => setShowFullHistory(!showFullHistory)}
                className="text-xs font-semibold text-polar-blue hover:underline"
              >
                {showFullHistory ? 'Collapse History' : 'View Movement History'}
              </button>
            </div>

            <div className="space-y-3">
              {asset.recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#082D56] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-polar-blue" />
                      <span>{act.route}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{act.timestamp}</span>
                  </div>
                  <p className="text-slate-600 text-xs">{act.purpose}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>Operator: <strong className="text-slate-700">{act.operator}</strong></span>
                    <span className="text-sky-700 font-mono text-[10px]">VERIFIED LOG</span>
                  </div>
                </div>
              ))}

              {showFullHistory && (
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-200 text-xs space-y-2 text-slate-600 animate-in fade-in duration-150">
                  <span className="font-bold text-sky-900 block">Extended Telemetry History (Simulation):</span>
                  <div className="space-y-1 text-[11px]">
                    <p>• 10 Aug 2026: Bharati Logistics Depot → Base Maintenance Bay (Pre-Winter Tuning)</p>
                    <p>• 08 Aug 2026: Cape Town Vessel Handover → Bharati Ice Wharf (Sling Transfer)</p>
                    <p>• 01 Aug 2026: Staging Depot Commissioning &amp; Sub-Zero Fluid Flush</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Environmental Readiness Card */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3.5">
            <div className="flex items-center gap-2 border-b border-polar-border pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-[#082D56]">Polar Environmental Readiness</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Cold Rating</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">-50°C Rated</span>
                <span className="text-[10px] text-slate-500">Sub-zero synthetic fluids</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">GPS / Mesh Node</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">Active Node</span>
                <span className="text-[10px] text-slate-500">Iridium &amp; VHF Mesh</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Safety Clearance</span>
                <span className="font-bold text-[#082D56] text-sm mt-0.5 block">Approved</span>
                <span className="text-[10px] text-slate-500">Signed by Expedition Lead</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Diagnostics, Power & Quick Actions */}
        <div className="space-y-6">
          
          {/* Power & Telemetry Diagnostics */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3.5 text-xs">
            <div className="flex items-center gap-2 border-b border-polar-border pb-3">
              <Activity className="w-4 h-4 text-polar-blue" />
              <h3 className="font-bold text-[#082D56]">Telemetry &amp; Power Status</h3>
            </div>

            <div className="space-y-3">
              {asset.batteryLevel && (
                <div>
                  <div className="flex items-center justify-between text-slate-700 mb-1">
                    <span className="flex items-center gap-1 font-medium">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                      Battery Level
                    </span>
                    <span className="font-bold text-slate-900">{asset.batteryLevel}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: asset.batteryLevel }}
                    />
                  </div>
                </div>
              )}

              {asset.fuelLevel && (
                <div>
                  <div className="flex items-center justify-between text-slate-700 mb-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Fuel className="w-3.5 h-3.5 text-amber-600" />
                      Fuel Level
                    </span>
                    <span className="font-bold text-slate-900">{asset.fuelLevel}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: asset.fuelLevel }}
                    />
                  </div>
                </div>
              )}

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Telemetry Status:</span>
                <span className="font-bold text-emerald-700 font-mono text-[11px]">
                  {asset.telemetryStatus || 'Active Link'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2.5 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Asset Control Actions
            </span>

            <button
              onClick={() => setMaintenanceLogged(true)}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{maintenanceLogged ? 'Service Check Recorded ✓' : 'Schedule Maintenance'}</span>
            </button>

            <button
              onClick={() => setShowFullHistory(!showFullHistory)}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>View Movement History</span>
            </button>

            <button
              onClick={() => navigate('/cargo-assets')}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cargo &amp; Assets</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
