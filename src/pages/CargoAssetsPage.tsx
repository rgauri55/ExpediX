import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Boxes,
  Truck,
  CheckCircle2,
  Wrench,
  AlertTriangle,
  PackagePlus,
  Search,
  ChevronRight,
  Filter,
  ShieldAlert,
  MapPin,
  Zap,
} from 'lucide-react';
import { useCargoAssets } from '../context/CargoAssetContext';
import { useExpeditions } from '../context/ExpeditionContext';
import { AddCargoModal } from '../components/cargo/AddCargoModal';
import { RegisterAssetModal } from '../components/cargo/RegisterAssetModal';
import type { CargoStatus, CargoPriority, AssetStatus } from '../types';

export const CargoAssetsPage: React.FC = () => {
  const navigate = useNavigate();
  const { cargoList, assetList, summaryStats, routeStages, insights } = useCargoAssets();
  const { expeditions } = useExpeditions();

  const [isAddCargoOpen, setIsAddCargoOpen] = useState(false);
  const [isRegisterAssetOpen, setIsRegisterAssetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'cargo' | 'assets'>('all');

  const [searchQuery, setSearchQuery] = useState('');
  const [expeditionFilter, setExpeditionFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter Cargo
  const filteredCargo = cargoList.filter((c) => {
    const matchesSearch =
      searchQuery === '' ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.origin.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesExpedition =
      expeditionFilter === 'ALL' || c.expeditionId === expeditionFilter;

    const matchesCategory =
      categoryFilter === 'ALL' || c.category.toLowerCase().includes(categoryFilter.toLowerCase());

    const matchesLocation =
      locationFilter === 'ALL' ||
      c.destination.toLowerCase().includes(locationFilter.toLowerCase()) ||
      c.currentLocation.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || c.status === statusFilter;

    return matchesSearch && matchesExpedition && matchesCategory && matchesLocation && matchesStatus;
  });

  // Filter Assets
  const filteredAssets = assetList.filter((a) => {
    const matchesSearch =
      searchQuery === '' ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.assignedTeam.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesExpedition =
      expeditionFilter === 'ALL' || a.assignedExpedition === expeditionFilter;

    const matchesCategory =
      categoryFilter === 'ALL' || a.category.toLowerCase().includes(categoryFilter.toLowerCase()) || a.type.toLowerCase().includes(categoryFilter.toLowerCase());

    const matchesLocation =
      locationFilter === 'ALL' || a.currentLocation.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || a.status === statusFilter;

    return matchesSearch && matchesExpedition && matchesCategory && matchesLocation && matchesStatus;
  });

  // Cargo Status badge helper
  const getCargoStatusBadge = (status: CargoStatus) => {
    switch (status) {
      case 'Received':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Received
          </span>
        );
      case 'In Transit':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            In Transit
          </span>
        );
      case 'Allocated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Allocated
          </span>
        );
      case 'Prepared':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Prepared
          </span>
        );
    }
  };

  // Priority badge helper
  const getPriorityBadge = (priority: CargoPriority) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
            CRITICAL
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300">
            HIGH
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            MEDIUM
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
            LOW
          </span>
        );
    }
  };

  // Asset Status badge helper
  const getAssetStatusBadge = (status: AssetStatus) => {
    switch (status) {
      case 'OPERATIONAL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            OPERATIONAL
          </span>
        );
      case 'IN USE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            IN USE
          </span>
        );
      case 'IN TRANSIT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            IN TRANSIT
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            MAINTENANCE
          </span>
        );
      case 'ATTENTION':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-50 text-rose-700 border border-rose-300 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            ATTENTION
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      
      {/* 1. Header with Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-[#082D56] tracking-tight">
              Cargo &amp; Assets
            </h1>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-sky-100 text-[#082D56] font-semibold border border-sky-200">
              SIMULATION DATA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track expedition cargo, equipment and critical field assets across the polar logistics chain.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsAddCargoOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-xs transition-all active:scale-98"
          >
            <PackagePlus className="w-4 h-4" />
            <span>+ Add Cargo</span>
          </button>
          <button
            onClick={() => setIsRegisterAssetOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-polar-blue bg-white hover:bg-sky-50 border border-polar-blue/30 rounded-xl shadow-xs transition-all active:scale-98"
          >
            <Wrench className="w-4 h-4" />
            <span>+ Register Asset</span>
          </button>
        </div>
      </div>

      {/* 2. Logistics Summary (6 Compact KPI Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Cargo Items */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Cargo Items</span>
            <Boxes className="w-4 h-4 text-polar-blue" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-[#082D56]">
              {summaryStats.cargoItems}
            </span>
          </div>
          <div className="mt-1.5 text-xs text-slate-500 font-medium">Total manifested</div>
        </div>

        {/* In Transit */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">In Transit</span>
            <Truck className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-sky-600">
              {summaryStats.inTransit}
            </span>
          </div>
          <div className="mt-1.5 text-xs text-sky-700 font-semibold">Active maritime &amp; traverse</div>
        </div>

        {/* Delivered */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Delivered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-emerald-700">
              {summaryStats.delivered}
            </span>
          </div>
          <div className="mt-1.5 text-xs text-emerald-700 font-semibold">At Bharati &amp; camps</div>
        </div>

        {/* Active Assets */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Active Assets</span>
            <Zap className="w-4 h-4 text-polar-blue" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-[#082D56]">
              {summaryStats.activeAssets}
            </span>
          </div>
          <div className="mt-1.5 text-xs text-slate-500 font-medium">Vehicles &amp; gear</div>
        </div>

        {/* Maintenance */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Maintenance</span>
            <Wrench className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-amber-800">
              {summaryStats.maintenance}
            </span>
          </div>
          <div className="mt-1.5 text-xs text-amber-700 font-semibold">Service scheduled</div>
        </div>

        {/* Attention Required */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Attention Req.</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-rose-600">
              {summaryStats.attentionRequired}
            </span>
          </div>
          <div className="mt-1.5 text-xs text-rose-700 font-semibold">Check condition</div>
        </div>

      </div>

      {/* 3. Cargo Tracking Journey Banner (Simulated Logistics Route) */}
      <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-polar-border pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-polar-blue text-white flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#082D56]">Cargo Tracking</h2>
              <p className="text-xs text-slate-600 font-medium">Polar supply chain transit pipeline</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-200">
              SIMULATED LOGISTICS ROUTE
            </span>
            <span className="text-xs text-slate-500 font-medium hidden md:inline">
              IAE-2026-W03 Resupply Sequence
            </span>
          </div>
        </div>

        {/* Visual Route Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5 pt-1">
          {routeStages.map((stage, idx) => {
            const isCompleted = stage.status === 'Completed';
            const isCurrent = stage.status === 'Current';
            return (
              <div
                key={stage.id}
                className={`p-3.5 rounded-xl border relative transition-all ${
                  isCurrent
                    ? 'bg-sky-50/80 border-polar-blue ring-1 ring-polar-blue/30'
                    : isCompleted
                    ? 'bg-slate-50/70 border-slate-200'
                    : 'bg-white border-dashed border-slate-200 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    STAGE 0{idx + 1}
                  </span>
                  {isCompleted && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  )}
                  {isCurrent && (
                    <span className="w-2.5 h-2.5 rounded-full bg-polar-blue animate-ping" />
                  )}
                </div>

                <div className="font-heading font-bold text-xs sm:text-sm text-[#082D56] tracking-tight">
                  {stage.name}
                </div>
                <div className="text-xs text-slate-600 font-medium leading-relaxed mt-1 line-clamp-2">
                  {stage.role}
                </div>
                <div className="text-[11px] font-mono text-slate-500 font-medium mt-2">
                  {stage.timestamp}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Counts Summary Strip */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between flex-wrap gap-4 text-xs sm:text-[13px]">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span className="text-slate-600 font-medium">Prepared: <strong className="text-slate-900">12 items</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span className="text-slate-600 font-medium">In Transit: <strong className="text-sky-700 font-bold">38 items</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-600 font-medium">Received: <strong className="text-emerald-700 font-bold">140 items</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-slate-600 font-medium">Allocated: <strong className="text-indigo-700 font-bold">24 items</strong></span>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500 font-medium">
            SIMULATED PIPELINE TELEMETRY
          </span>
        </div>
      </div>

      {/* 4. Logistics Insight Panel (Operational Intelligence) */}
      <div className="bg-gradient-to-r from-amber-50 via-slate-50 to-white rounded-2xl border border-amber-200/80 p-4.5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Logistics Insight
              </h3>
              <p className="text-[11px] text-amber-900 font-medium">
                ⚠️ 2 assets require operational attention &amp; inspection
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
            ACTION RECOMMENDED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
          {insights.map((ins) => (
            <div
              key={ins.id}
              onClick={() => navigate(`/assets/${ins.assetId}`)}
              className="p-3 bg-white rounded-xl border border-amber-200 hover:border-amber-400 cursor-pointer transition-all shadow-2xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-[#082D56]">
                  <span>{ins.assetId}</span>
                  <span className="text-slate-400">•</span>
                  <span>{ins.assetName}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900">
                  {ins.condition}
                </span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                <strong className="text-slate-700">Location: </strong>{ins.location} • <strong className="text-slate-700">Handler: </strong>{ins.assignedPerson}
              </p>
              <p className="text-amber-900 text-xs font-medium">
                <strong>Recommendation: </strong>{ins.recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Search & Filters Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-polar-border shadow-xs space-y-3">
        
        {/* Top Filter Row */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cargo ID, asset code, description, destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
            />
          </div>

          {/* View Mode Toggle Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-[#082D56] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setActiveTab('cargo')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'cargo'
                  ? 'bg-white text-polar-blue shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Cargo Manifest ({filteredCargo.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'assets'
                  ? 'bg-white text-polar-blue shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Asset Registry ({filteredAssets.length})</span>
            </button>
          </div>

        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <div className="flex items-center gap-1 text-slate-400 shrink-0 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Expedition */}
          <select
            value={expeditionFilter}
            onChange={(e) => setExpeditionFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-700 shrink-0"
          >
            <option value="ALL">All Expeditions</option>
            {expeditions.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.code}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-700 shrink-0"
          >
            <option value="ALL">All Categories</option>
            <option value="Scientific">Scientific Equipment</option>
            <option value="Medical">Medical Supplies</option>
            <option value="Fuel">Fuel &amp; Energy</option>
            <option value="Vehicles">Vehicles &amp; Traverse</option>
            <option value="Communications">Communications</option>
            <option value="Safety">Safety &amp; Field Gear</option>
          </select>

          {/* Location */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-700 shrink-0"
          >
            <option value="ALL">All Locations</option>
            <option value="Bharati">Bharati Station</option>
            <option value="Field Camp Alpha">Field Camp Alpha</option>
            <option value="Survey Zone B">Survey Zone B</option>
            <option value="Route Charlie">Route Charlie (En Route)</option>
            <option value="Fuel Depot">Fuel Depot</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-700 shrink-0"
          >
            <option value="ALL">All Statuses</option>
            <option value="Received">Received</option>
            <option value="In Transit">In Transit</option>
            <option value="Allocated">Allocated</option>
            <option value="Prepared">Prepared</option>
            <option value="OPERATIONAL">OPERATIONAL (Asset)</option>
            <option value="IN USE">IN USE (Asset)</option>
            <option value="MAINTENANCE">MAINTENANCE (Asset)</option>
            <option value="ATTENTION">ATTENTION (Asset)</option>
          </select>
        </div>

      </div>

      {/* 6. Cargo Manifest Section */}
      {(activeTab === 'all' || activeTab === 'cargo') && (
        <div className="bg-white rounded-2xl border border-polar-border shadow-xs overflow-hidden space-y-0">
          
          <div className="px-5 py-3.5 border-b border-polar-border bg-slate-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-polar-blue" />
              <h3 className="text-sm font-bold text-[#082D56]">
                Cargo Manifest
              </h3>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                {filteredCargo.length} Cargo Records
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Click any cargo row to view shipment timeline
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-[13px]">
              <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-polar-border">
                <tr>
                  <th className="px-4 sm:px-5 py-3.5">Cargo ID</th>
                  <th className="px-4 sm:px-5 py-3.5">Description</th>
                  <th className="px-4 sm:px-5 py-3.5">Category</th>
                  <th className="px-4 sm:px-5 py-3.5">Quantity</th>
                  <th className="px-4 sm:px-5 py-3.5">Destination</th>
                  <th className="px-4 sm:px-5 py-3.5">Status</th>
                  <th className="px-4 sm:px-5 py-3.5">Priority</th>
                  <th className="px-4 sm:px-5 py-3.5">Last Update</th>
                  <th className="px-4 sm:px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-polar-border">
                {filteredCargo.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-5 py-10 text-center text-slate-500 font-medium text-sm">
                      No cargo records found matching the specified filters.
                    </td>
                  </tr>
                ) : (
                  filteredCargo.map((cargo) => (
                    <tr
                      key={cargo.id}
                      onClick={() => navigate(`/cargo/${cargo.id}`)}
                      className="cursor-pointer transition-colors hover:bg-sky-50/50"
                    >
                      {/* Cargo ID */}
                      <td className="px-4 sm:px-5 py-3.5 font-mono font-bold text-[#082D56] whitespace-nowrap text-xs sm:text-[13px]">
                        {cargo.code}
                      </td>

                      {/* Description */}
                      <td className="px-4 sm:px-5 py-3.5">
                        <div className="font-semibold text-slate-900 hover:text-polar-blue transition-colors truncate max-w-[210px]" title={cargo.description}>
                          {cargo.description}
                        </div>
                        <div className="text-xs font-mono text-slate-500 font-medium truncate mt-0.5">
                          {cargo.expeditionId}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 sm:px-5 py-3.5 text-slate-700 font-medium truncate max-w-[140px]">
                        {cargo.category}
                      </td>

                      {/* Quantity */}
                      <td className="px-4 sm:px-5 py-3.5 font-semibold text-slate-800 whitespace-nowrap">
                        {cargo.quantity} <span className="text-xs font-normal text-slate-500">{cargo.unit}</span>
                      </td>

                      {/* Destination */}
                      <td className="px-4 sm:px-5 py-3.5 text-slate-800 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-polar-blue shrink-0" />
                          <span>{cargo.destination}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 sm:px-5 py-3.5 whitespace-nowrap">
                        {getCargoStatusBadge(cargo.status)}
                      </td>

                      {/* Priority */}
                      <td className="px-4 sm:px-5 py-3.5 whitespace-nowrap">
                        {getPriorityBadge(cargo.priority)}
                      </td>

                      {/* Last Update */}
                      <td className="px-4 sm:px-5 py-3.5 text-slate-500 font-mono text-xs whitespace-nowrap font-medium">
                        {cargo.lastUpdate}
                      </td>

                      {/* Action */}
                      <td className="px-4 sm:px-5 py-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/cargo/${cargo.id}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-polar-blue hover:bg-sky-50 rounded-lg transition-colors inline-flex items-center"
                          title="View Shipment Details"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-polar-border bg-slate-50 flex items-center justify-between text-xs font-medium text-slate-600">
            <span>Showing {filteredCargo.length} manifested cargo items</span>
            <span className="font-mono text-xs text-slate-500 font-medium">MANIFEST TELEMETRY SYNCED</span>
          </div>

        </div>
      )}

      {/* 7. Active Asset Registry Section */}
      {(activeTab === 'all' || activeTab === 'assets') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-sm sm:text-base font-bold text-[#082D56]">
                Active Asset Registry
              </h2>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {filteredAssets.length} Polar Assets
              </span>
            </div>
            <button
              onClick={() => setIsRegisterAssetOpen(true)}
              className="text-xs sm:text-sm font-semibold text-polar-blue hover:underline"
            >
              + Register New Asset
            </button>
          </div>

          {/* Asset Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => navigate(`/assets/${asset.id}`)}
                className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-polar-blue hover:shadow-md cursor-pointer transition-all space-y-3.5"
              >
                {/* Top ID & Status */}
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-polar-blue bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                    {asset.id}
                  </span>
                  {getAssetStatusBadge(asset.status)}
                </div>

                {/* Name & Type */}
                <div>
                  <h3 className="font-bold text-sm text-[#082D56] line-clamp-1">
                    {asset.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">{asset.type} • {asset.category}</p>
                </div>

                {/* Location & Team Details */}
                <div className="space-y-1.5 text-xs pt-1.5 border-t border-slate-100">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-500 text-xs font-medium">Location:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-polar-blue shrink-0" />
                      {asset.currentLocation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-500 text-xs font-medium">Condition:</span>
                    <span className={`font-bold ${
                      asset.condition === 'Optimal' || asset.condition === 'Good'
                        ? 'text-emerald-700'
                        : 'text-amber-700'
                    }`}>
                      {asset.condition}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-500 text-xs font-medium">Expedition:</span>
                    <span className="font-mono text-slate-700 font-semibold text-xs">{asset.assignedExpedition}</span>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Maint: {asset.lastMaintenance}</span>
                  <span className="text-polar-blue font-semibold flex items-center gap-1">
                    View Asset <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Cargo Modal */}
      <AddCargoModal
        isOpen={isAddCargoOpen}
        onClose={() => setIsAddCargoOpen(false)}
      />

      {/* Register Asset Modal */}
      <RegisterAssetModal
        isOpen={isRegisterAssetOpen}
        onClose={() => setIsRegisterAssetOpen(false)}
      />

    </div>
  );
};
