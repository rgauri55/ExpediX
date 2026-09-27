import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  Filter,
  ArrowRight,
  ShieldAlert,
  MapPin,
  Layers,
  AlertTriangle,
  ArrowDownToLine,
  CheckCircle2,
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { useExpeditions } from '../context/ExpeditionContext';
import type { InventoryStatus } from '../types';


export const InventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    inventory,
    receipts,
    alerts,
    summaryStats,
    locationDistribution,
    flowStages,
    receiveCargoReceipt,
  } = useInventory();
  const { expeditions } = useExpeditions();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expeditionFilter, setExpeditionFilter] = useState('ALL');
  const [receiptSuccessMsg, setReceiptSuccessMsg] = useState<string | null>(null);

  // Filter logic
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.linkedCargoConsignment &&
        item.linkedCargoConsignment.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'ALL' || item.category === categoryFilter;

    const matchesLocation =
      locationFilter === 'ALL' ||
      item.currentLocation.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || item.status === statusFilter;

    const matchesExpedition =
      expeditionFilter === 'ALL' || item.linkedExpedition === expeditionFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesStatus &&
      matchesExpedition
    );
  });

  // Handle Station Intake action
  const handleReceiveReceipt = (receiptId: string, cargoCode: string) => {
    receiveCargoReceipt(receiptId);
    setReceiptSuccessMsg(`Cargo ${cargoCode} verified & received into active station stock.`);
    setTimeout(() => setReceiptSuccessMsg(null), 4000);
  };

  // Status Badge Helper
  const getStatusBadge = (status: InventoryStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>
        );
      case 'Allocated':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Allocated
          </span>
        );
      case 'Field Deployed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            Field Deployed
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            Low Stock
          </span>
        );
      case 'Pending Receipt':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-orange-50 text-orange-700 border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Pending Receipt
          </span>
        );
      case 'Damaged':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Damaged
          </span>
        );
      case 'Backload Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Backload Pending
          </span>
        );
      case 'Consumed':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Consumed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200 pb-12">
      
      {/* 1. Header with Compact Operational Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-polar-border pb-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-[#082D56] tracking-tight">
              Inventory &amp; Resource Management
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-100 text-[#082D56] border border-sky-200">
              IAE-2026-W03 • Bharati Station • Active Expedition
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Track expedition supplies from station receipt to field deployment, consumption and return.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>STATION LEDGER ONLINE</span>
        </div>
      </div>

      {/* 2. Compact Operational Summary Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-polar-border shadow-xs flex items-center justify-between gap-4 overflow-x-auto text-xs sm:text-[13px]">
        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 block">Total Tracked</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-[#082D56] mt-0.5 block">{summaryStats.totalTracked}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 block">At Station</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-slate-800 mt-0.5 block">{summaryStats.atStation}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 block">Field Deployed</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-sky-700 mt-0.5 block">{summaryStats.fieldDeployed}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-xs uppercase font-bold text-amber-700 block">Low Stock</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-amber-700 mt-0.5 block">{summaryStats.lowStock}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 block">Pending Allocation</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-indigo-700 mt-0.5 block">{summaryStats.pendingAllocation}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 block">Backload Pending</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-slate-700 mt-0.5 block">{summaryStats.backloadPending}</span>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-500 font-medium hidden xl:inline shrink-0">
          SIMULATION LEDGER
        </span>
      </div>

      {/* 3. Inventory Movement Workflow Timeline Bar */}
      <div className="bg-slate-50/80 px-4 py-2.5 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-polar-blue" />
            Supply Lifecycle:
          </span>
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 shrink-0">
            {flowStages.map((stage, idx) => (
              <React.Fragment key={stage.id}>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200/80 shadow-2xs whitespace-nowrap">
                  {stage.name}
                </span>
                {idx < flowStages.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Intake Success Notification Banner */}
      {receiptSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{receiptSuccessMsg}</span>
          </div>
          <button
            onClick={() => setReceiptSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 4. Search and Filters Bar */}
      <div className="bg-white p-3 rounded-xl border border-polar-border shadow-xs flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inventory name, item ID, or cargo code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
          <div className="flex items-center gap-1 text-slate-400 shrink-0 font-medium">
            <Filter className="w-3 h-3" />
            <span>Filters:</span>
          </div>

          {/* Location */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white text-slate-700 shrink-0"
          >
            <option value="ALL">All Locations</option>
            <option value="Bharati Medical Store">Bharati Medical Store</option>
            <option value="Bharati Communications Store">Bharati Comms Store</option>
            <option value="Fuel Storage">Fuel Storage Depot</option>
            <option value="Field Camp Alpha">Field Camp Alpha</option>
            <option value="Survey Zone B">Survey Zone B</option>
            <option value="Backload Storage">Backload Storage</option>
          </select>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white text-slate-700 shrink-0"
          >
            <option value="ALL">All Categories</option>
            <option value="Medical Supplies">Medical Supplies</option>
            <option value="Communication">Communication</option>
            <option value="Fuel">Fuel</option>
            <option value="Protective Gear">Protective Gear</option>
            <option value="Scientific Supplies">Scientific Supplies</option>
            <option value="Survival & Rations">Survival &amp; Rations</option>
            <option value="Base Hardware">Base Hardware</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white text-slate-700 shrink-0"
          >
            <option value="ALL">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Allocated">Allocated</option>
            <option value="Field Deployed">Field Deployed</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Pending Receipt">Pending Receipt</option>
            <option value="Damaged">Damaged</option>
            <option value="Backload Pending">Backload Pending</option>
          </select>

          {/* Expedition */}
          <select
            value={expeditionFilter}
            onChange={(e) => setExpeditionFilter(e.target.value)}
            className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white text-slate-700 shrink-0"
          >
            <option value="ALL">All Expeditions</option>
            {expeditions.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.code}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* 5. Main 2-Column Operational Layout: Table (Left) + Context Panels (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* LEFT / MAIN AREA (2 Cols): Dense Operational Inventory Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs overflow-hidden">
            
            <div className="px-5 py-3.5 border-b border-polar-border bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-polar-blue" />
                <h3 className="text-sm font-bold text-[#082D56]">
                  Station &amp; Field Inventory Registry
                </h3>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  {filteredInventory.length} Items Listed
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Click row to inspect supply journey
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-[13px]">
                <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-polar-border">
                  <tr>
                    <th className="px-4 sm:px-5 py-3.5">Item ID</th>
                    <th className="px-4 sm:px-5 py-3.5">Item Name</th>
                    <th className="px-4 sm:px-5 py-3.5">Category</th>
                    <th className="px-4 sm:px-5 py-3.5">Quantity</th>
                    <th className="px-4 sm:px-5 py-3.5">Location</th>
                    <th className="px-4 sm:px-5 py-3.5">Status</th>
                    <th className="px-4 sm:px-5 py-3.5">Last Movement</th>
                    <th className="px-4 sm:px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-polar-border">
                  {filteredInventory.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-10 text-center text-slate-500 font-medium text-sm">
                        No inventory records match the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredInventory.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => navigate(`/inventory/${item.id}`)}
                        className={`cursor-pointer transition-colors hover:bg-sky-50/50 ${
                          item.status === 'Low Stock'
                            ? 'bg-amber-50/30'
                            : item.status === 'Damaged'
                            ? 'bg-rose-50/30'
                            : ''
                        }`}
                      >
                        {/* ID */}
                        <td className="px-4 sm:px-5 py-3.5 font-mono font-bold text-[#082D56] whitespace-nowrap text-xs sm:text-[13px]">
                          {item.code}
                        </td>

                        {/* Name */}
                        <td className="px-4 sm:px-5 py-3.5">
                          <div className="font-semibold text-slate-900 hover:text-polar-blue transition-colors truncate max-w-[180px]" title={item.name}>
                            {item.name}
                          </div>
                          {item.linkedCargoConsignment && (
                            <div className="text-xs font-mono text-slate-500 font-medium truncate mt-0.5">
                              Cargo: {item.linkedCargoConsignment}
                            </div>
                          )}
                        </td>

                        {/* Category */}
                        <td className="px-4 sm:px-5 py-3.5 text-slate-700 font-medium truncate max-w-[130px]">
                          {item.category}
                        </td>

                        {/* Quantity & Unit */}
                        <td className="px-4 sm:px-5 py-3.5 font-bold text-slate-900 whitespace-nowrap">
                          {item.quantity} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
                        </td>

                        {/* Current Location */}
                        <td className="px-4 sm:px-5 py-3.5 text-slate-800 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-polar-blue shrink-0" />
                            <span className="truncate max-w-[140px]">{item.currentLocation}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 sm:px-5 py-3.5 whitespace-nowrap">
                          {getStatusBadge(item.status)}
                        </td>

                        {/* Last Movement */}
                        <td className="px-4 sm:px-5 py-3.5 text-slate-500 font-mono text-xs whitespace-nowrap font-medium">
                          {item.lastMovement}
                        </td>

                        {/* Action */}
                        <td className="px-4 sm:px-5 py-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/inventory/${item.id}`);
                            }}
                            className="p-1.5 text-slate-400 hover:text-polar-blue hover:bg-sky-50 rounded-lg transition-colors inline-flex items-center"
                            title="Inspect Item Lifecycle"
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
              <span>Showing {filteredInventory.length} of {inventory.length} tracked supplies</span>
              <span className="font-mono text-xs text-slate-500 font-medium">BHARATI INVENTORY DATABASE</span>
            </div>

          </div>
        </div>

        {/* RIGHT / CONTEXT AREA (1 Col): Station Receipt, Alerts, Storage, Logistics Insights */}
        <div className="space-y-4">
          
          {/* A. Station Receipt Intake Panel (Cargo -> Station Receipt -> Inventory bridge) */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-polar-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-polar-blue text-white flex items-center justify-center">
                  <ArrowDownToLine className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#082D56]">Station Receipt Intake</h3>
                  <p className="text-xs text-slate-500 font-medium">Cargo consignment handoff</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                1 PENDING
              </span>
            </div>

            {receipts.map((rcp) => {
              const isReceived = rcp.status === 'Verified & Stored';
              return (
                <div
                  key={rcp.id}
                  className={`p-3.5 rounded-xl border text-xs sm:text-[13px] space-y-2.5 transition-all ${
                    isReceived
                      ? 'bg-slate-50 border-slate-200 opacity-75'
                      : 'bg-sky-50/50 border-sky-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#082D56] font-mono">{rcp.cargoCode}</span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                      isReceived ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {rcp.status}
                    </span>
                  </div>

                  <p className="text-slate-800 text-xs sm:text-[13px] font-medium leading-relaxed">
                    {rcp.cargoDescription}
                  </p>

                  <div className="space-y-1 text-xs text-slate-600">
                    <p>Origin: <strong className="text-slate-800">{rcp.origin}</strong> → Bharati</p>
                    <p>Staging: <strong className="text-polar-blue font-semibold">{rcp.stagingLocation}</strong></p>
                    <p className="font-mono text-xs text-slate-500 font-medium">Timestamp: {rcp.receivedTimestamp}</p>
                  </div>

                  {!isReceived ? (
                    <button
                      onClick={() => handleReceiveReceipt(rcp.id, rcp.cargoCode)}
                      className="w-full py-2 px-3 text-xs sm:text-sm font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ArrowDownToLine className="w-4 h-4" />
                      <span>Receive into Inventory (+{rcp.targetQuantity} {rcp.targetUnit})</span>
                    </button>
                  ) : (
                    <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Received &amp; Stock Updated in {rcp.targetInventoryItemCode}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* B. Resource Alerts Panel */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-polar-border pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-[#082D56]">Resource Alerts</h3>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                {alerts.length} ALERTS
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {alerts.map((alt) => (
                <div
                  key={alt.id}
                  onClick={() => alt.itemId && navigate(`/inventory/${alt.itemId}`)}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-polar-blue cursor-pointer transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#082D56] text-xs sm:text-[13px]">{alt.title}</span>
                    <span className="text-xs font-mono text-slate-500 font-medium">{alt.countDetail}</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">{alt.subtitle}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5 font-medium">
                    <span className="flex items-center gap-1 text-slate-700">
                      <MapPin className="w-3 h-3 text-polar-blue" />
                      {alt.location}
                    </span>
                    <span className="text-polar-blue font-semibold">Inspect →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C. Station Storage Distribution */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3.5 text-xs">
            <div className="flex items-center justify-between border-b border-polar-border pb-3">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-polar-blue" />
                <h3 className="text-sm font-bold text-[#082D56]">Storage Distribution</h3>
              </div>
              <span className="text-xs font-mono text-slate-500 font-medium">128 ITEMS</span>
            </div>

            <div className="space-y-3">
              {locationDistribution.map((loc, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{loc.name}</span>
                    <span className="font-bold text-slate-900">{loc.count} items ({loc.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0
                          ? 'bg-polar-blue'
                          : idx === 1
                          ? 'bg-sky-500'
                          : idx === 2
                          ? 'bg-cyan-500'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${loc.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D. Logistics Insights Factual Panel */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-[#082D56] font-bold text-xs sm:text-[13px]">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Logistics Insight</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed font-medium">
              <p>• <strong className="text-slate-900">7 inventory items</strong> are currently marked for backload or mainland return.</p>
              <p>• <strong className="text-slate-900">3 items</strong> require allocation before the next field deployment traverse.</p>
              <p>• <strong className="text-slate-900">5 items</strong> are below their configured demonstration reserve threshold.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
