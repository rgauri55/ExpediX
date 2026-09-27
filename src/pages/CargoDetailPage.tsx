import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Boxes,
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
  Truck,
  Layers,
  ThermometerSnowflake,
  ShieldCheck,
  FileText,
  User,
  Package,
} from 'lucide-react';
import { useCargoAssets } from '../context/CargoAssetContext';
import type { CargoStatus, CargoPriority } from '../types';

export const CargoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCargoById, cargoList } = useCargoAssets();

  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);

  const cargo = (id ? getCargoById(id) : undefined) || cargoList[0];

  if (!cargo) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-polar-border">
        <h2 className="text-lg font-bold text-[#082D56]">Cargo Record Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">
          The requested cargo manifest entry could not be retrieved from the central logistics ledger.
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

  const getCargoStatusBadge = (status: CargoStatus) => {
    switch (status) {
      case 'Received':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Received at Base
          </span>
        );
      case 'In Transit':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            In Active Transit
          </span>
        );
      case 'Allocated':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Allocated to Field Unit
          </span>
        );
      case 'Prepared':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Prepared / Manifested
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: CargoPriority) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200">
            CRITICAL PRIORITY
          </span>
        );
      case 'High':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
            HIGH PRIORITY
          </span>
        );
      case 'Medium':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            MEDIUM PRIORITY
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
            LOW PRIORITY
          </span>
        );
    }
  };

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
          <span className="text-slate-400">{cargo.expeditionId}</span>
          <span>/</span>
          <span className="text-slate-700 font-medium">{cargo.code}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold border border-sky-200">
            SIMULATION DATA • {cargo.code}
          </span>
          <button
            onClick={() => setDeliveryConfirmed(true)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-xs transition-colors"
          >
            {deliveryConfirmed ? 'Manifest Re-verified ✓' : 'Verify Barcode Handshake'}
          </button>
        </div>
      </div>

      {/* 2. Top Profile Hero Card */}
      <div className="bg-white rounded-2xl border border-polar-border shadow-xs overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-[#082D56] via-[#0B3A6F] to-[#0A4B8F] text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg shrink-0">
                <Boxes className="w-7 h-7 text-sky-300" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-400/20 text-sky-200 border border-sky-400/30">
                    {cargo.code}
                  </span>
                  <h1 className="text-lg sm:text-xl font-bold font-heading text-white">
                    {cargo.description}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-sky-100 font-medium">
                  {cargo.category} • <strong className="text-white">{cargo.quantity} {cargo.unit}</strong>
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap pt-1">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    {cargo.expeditionName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    Dest: {cargo.destination}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-200 font-medium">Shipment Status:</span>
                {getCargoStatusBadge(cargo.status)}
              </div>
              <div className="flex items-center gap-2">
                {getPriorityBadge(cargo.priority)}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Clock className="w-3.5 h-3.5 text-sky-300" />
                <span>Last Telemetry Update: <strong className="text-white">{cargo.lastUpdate}</strong></span>
              </div>
            </div>

          </div>
        </div>

        {/* Origin to Destination Route Bar */}
        <div className="px-6 py-3 bg-slate-50 border-t border-polar-border grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Origin Location</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {cargo.origin}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Current Staging Point</span>
            <span className="font-semibold text-polar-blue flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-polar-blue" />
              {cargo.currentLocation}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Final Destination</span>
            <span className="font-semibold text-emerald-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {cargo.destination}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Handled By</span>
            <span className="font-medium text-slate-700 flex items-center gap-1 truncate">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {cargo.handledBy || 'Logistics Team'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Visual Shipment Timeline (Same style as Expedition Progress) */}
      <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-polar-border pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-polar-blue text-white flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#082D56]">Visual Shipment Timeline</h2>
              <p className="text-xs text-slate-500">Multi-stage polar transit verification protocol</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            LIFECYCLE STEPPER
          </span>
        </div>

        {/* Stepper Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {cargo.trackingHistory.map((step, idx) => {
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border relative transition-all ${
                  step.current
                    ? 'bg-sky-50 border-polar-blue ring-1 ring-polar-blue/30 shadow-xs'
                    : step.completed
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-white border-dashed border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    STAGE 0{idx + 1}
                  </span>
                  {step.completed ? (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  ) : step.current ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-polar-blue animate-ping" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-300" />
                  )}
                </div>

                <div className="font-bold text-xs text-[#082D56]">
                  {step.stage}
                </div>
                <div className="text-[11px] text-slate-600 font-medium mt-0.5 truncate">
                  {step.location}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  {step.timestamp}
                </div>
                {step.notes && (
                  <div className="mt-2 text-[10px] text-slate-500 bg-white/80 p-1.5 rounded border border-slate-200/60 leading-tight">
                    {step.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Specifications & Handling Directives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Technical & Environmental Parameters */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-polar-border pb-3">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-polar-blue flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#082D56]">Cargo Handling &amp; Storage Directives</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <ThermometerSnowflake className="w-3 h-3 text-sky-600" />
                  Temperature Class
                </span>
                <p className="font-bold text-[#082D56]">
                  {cargo.temperatureRequirement || 'Standard Polar Cold Storage'}
                </p>
                <p className="text-[11px] text-slate-500">
                  Continuous telemetry monitoring sensor active on TEU chassis.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Hazard &amp; Safety Rating
                </span>
                <p className="font-bold text-[#082D56]">
                  {cargo.hazardClass || 'Standard Field Hardware'}
                </p>
                <p className="text-[11px] text-slate-500">
                  Complies with Antarctic Treaty environmental containment standards.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100 text-xs text-sky-900 space-y-1">
              <strong className="font-semibold block">Field Operations Note:</strong>
              <p className="leading-relaxed text-[11px]">
                Upon receipt at {cargo.destination}, the cargo barcode must be synced via mesh transceiver to update the active inventory and asset registries for mission {cargo.expeditionId}.
              </p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & Manifest Data */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3.5 text-xs">
            <div className="flex items-center gap-2 border-b border-polar-border pb-3">
              <Package className="w-4 h-4 text-polar-blue" />
              <h3 className="font-bold text-[#082D56]">Manifest Quick Actions</h3>
            </div>

            <button
              onClick={() => setDeliveryConfirmed(true)}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirm Delivery / Receipt</span>
            </button>

            <button
              onClick={() => navigate('/cargo-assets')}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Cargo Manifest</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
