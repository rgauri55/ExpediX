import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  UserPlus,
  Radio,
  Search,
  ChevronRight,
  Filter,
  ArrowRight,
  AlertTriangle,
  Wind,
  ThermometerSnowflake,
  Eye,
  CheckCircle2,
  Clock,
  Navigation,
  ShieldAlert,
} from 'lucide-react';
import { usePersonnel } from '../context/PersonnelContext';
import { useExpeditions } from '../context/ExpeditionContext';
import { AssignPersonnelModal } from '../components/personnel/AssignPersonnelModal';
import type { PersonnelStatus } from '../types';

export const PersonnelPage: React.FC = () => {
  const navigate = useNavigate();
  const { personnel, movements, summaryStats, safetyAlert } = usePersonnel();
  const { expeditions } = useExpeditions();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expeditionFilter, setExpeditionFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [stationFilter, setStationFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isSafetyAlertAcknowledged, setIsSafetyAlertAcknowledged] = useState(false);

  // Filter logic
  const filteredPersonnel = personnel.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.assignment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.expeditionId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesExpedition =
      expeditionFilter === 'ALL' || p.expeditionId === expeditionFilter;

    const matchesRole =
      roleFilter === 'ALL' || p.team.toLowerCase().includes(roleFilter.toLowerCase()) || p.role.toLowerCase().includes(roleFilter.toLowerCase());

    const matchesStation =
      stationFilter === 'ALL' || p.station.toLowerCase().includes(stationFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || p.status === statusFilter;

    return matchesSearch && matchesExpedition && matchesRole && matchesStation && matchesStatus;
  });

      const getStatusBadge = (status: PersonnelStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
        );
      case 'In Field':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            In Field
          </span>
        );
      case 'Attention':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Attention
          </span>
        );
      case 'Returning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Returning
          </span>
        );
      case 'Off Duty':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Off Duty
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200 pb-10">
      
      {/* 1. Header with Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-[#082D56] tracking-tight">
              Personnel
            </h1>
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-[#082D56] font-bold border border-sky-200">
              SIMULATION ROSTER
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Manage expedition members, assignments, movement and operational status across polar stations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAssignModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-xs transition-all active:scale-98"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Assign Personnel</span>
          </button>
        </div>
      </div>

      {/* 2. Four Personnel Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Deployed */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Total Deployed</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-polar-blue flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-[#082D56]">
              {summaryStats.totalDeployed}
            </span>
            <span className="text-xs font-medium text-slate-500">All stations &amp; field</span>
          </div>
          <div className="mt-2.5 text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% telemetry synced</span>
          </div>
        </div>

        {/* At Bharati Station */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">At Bharati Station</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-[#082D56]">
              {summaryStats.atBharati}
            </span>
            <span className="text-xs font-medium text-slate-500">Base operations</span>
          </div>
          <div className="mt-2.5 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Habitation Modules A, B &amp; C</span>
          </div>
        </div>

        {/* In Field */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">In Field</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-[#082D56]">
              {summaryStats.inField}
            </span>
            <span className="text-xs font-medium text-slate-500">Traverses / camps</span>
          </div>
          <div className="mt-2.5 text-xs text-amber-700 flex items-center gap-1.5 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>3 members in high-risk weather</span>
          </div>
        </div>

        {/* On Assignment */}
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">On Assignment</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-heading text-[#082D56]">
              {summaryStats.onAssignment}
            </span>
            <span className="text-xs font-medium text-slate-500">Active field tasks</span>
          </div>
          <div className="mt-2.5 text-xs text-sky-700 flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>4 active traverse sorties</span>
          </div>
        </div>

      </div>

      {/* 3. Safety Intelligence Banner (Prominent Alert Card) */}
      <div className="bg-gradient-to-r from-amber-50 via-rose-50/40 to-slate-50 rounded-2xl border border-amber-200/80 p-4.5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200/80 text-amber-900 border border-amber-300">
                  SAFETY INTELLIGENCE • {safetyAlert.alertCode}
                </span>
                <span className="text-xs font-semibold text-rose-700">
                  {safetyAlert.title}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap pt-0.5">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Wind className="w-3.5 h-3.5 text-amber-600" />
                  {safetyAlert.weatherCondition}
                </span>
                <span className="flex items-center gap-1">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-600" />
                  {safetyAlert.temperature}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  {safetyAlert.visibility}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                <strong className="font-semibold text-slate-800">Directive: </strong>
                {safetyAlert.recommendedAction}
              </p>

              {/* Affected Members quick chips */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] font-semibold text-slate-500">Affected Personnel:</span>
                {safetyAlert.affectedPersonnel.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => navigate(`/personnel/${member.id}`)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white hover:bg-amber-100 border border-amber-300 text-slate-800 shadow-2xs transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span>{member.name}</span>
                    <span className="text-[10px] text-slate-400">({member.callsign})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
            <button
              onClick={() => {
                const target = personnel.find((p) => p.id === 'PRS-006') || personnel[0];
                navigate(`/personnel/${target.id}`);
              }}
              className="px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-200/90 hover:bg-amber-300 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Safety Directives</span>
            </button>
            <button
              onClick={() => setIsSafetyAlertAcknowledged(!isSafetyAlertAcknowledged)}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              {isSafetyAlertAcknowledged ? 'Acknowledged' : 'Acknowledge'}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Search & Filters Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-polar-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, role, mission, location or assignment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          
          {/* Expedition Filter */}
          <div className="flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={expeditionFilter}
              onChange={(e) => setExpeditionFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 text-slate-700"
            >
              <option value="ALL">All Expeditions</option>
              {expeditions.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  {exp.code}
                </option>
              ))}
            </select>
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 text-slate-700 shrink-0"
          >
            <option value="ALL">All Roles / Teams</option>
            <option value="Science">Science Teams</option>
            <option value="Glaciologist">Glaciology</option>
            <option value="Geology">Geology</option>
            <option value="Atmospheric">Atmospheric</option>
            <option value="Logistics">Logistics &amp; Traverse</option>
            <option value="Field">Field Operations</option>
            <option value="Medical">Medical &amp; Safety</option>
            <option value="Technical">Technical / Comms</option>
          </select>

          {/* Station Filter */}
          <select
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 text-slate-700 shrink-0"
          >
            <option value="ALL">All Stations</option>
            <option value="Bharati">Bharati Station</option>
            <option value="Maitri">Maitri Station</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 text-slate-700 shrink-0"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="In Field">In Field</option>
            <option value="Attention">Attention</option>
            <option value="Returning">Returning</option>
            <option value="Off Duty">Off Duty</option>
          </select>

        </div>
      </div>

      {/* 5. Main 2-Column Operational Grid: Personnel Table (Left) + Personnel Movement (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Expedition Personnel Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs overflow-hidden">
            
            {/* Table Header */}
            <div className="px-5 py-3.5 border-b border-polar-border bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-polar-blue" />
                <h3 className="text-sm font-bold text-[#082D56]">
                  IAE-2026-W03 — Personnel Roster
                </h3>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  {filteredPersonnel.length} Personnel
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Click any row to view operational profile
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-[13px]">
                <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-polar-border">
                  <tr>
                    <th className="px-4 sm:px-5 py-3.5">Personnel</th>
                    <th className="px-4 sm:px-5 py-3.5">Role &amp; Team</th>
                    <th className="px-4 sm:px-5 py-3.5">Current Location</th>
                    <th className="px-4 sm:px-5 py-3.5">Assignment</th>
                    <th className="px-4 sm:px-5 py-3.5">Status</th>
                    <th className="px-4 sm:px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-polar-border">
                  {filteredPersonnel.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-slate-500 font-medium text-sm">
                        No personnel found matching the specified filters.
                      </td>
                    </tr>
                  ) : (
                    filteredPersonnel.map((person) => {
                      const isEmergency = person.status === 'Attention';
                      return (
                        <tr
                          key={person.id}
                          onClick={() => navigate(`/personnel/${person.id}`)}
                          className={`cursor-pointer transition-colors hover:bg-sky-50/50 ${
                            isEmergency ? 'bg-amber-50/40' : ''
                          }`}
                        >
                          {/* Name + Initials */}
                          <td className="px-4 sm:px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-polar-blue/10 text-polar-blue font-bold text-xs flex items-center justify-center shrink-0 border border-polar-blue/20">
                                {person.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-[#082D56] hover:text-polar-blue transition-colors truncate">
                                  {person.name}
                                </div>
                                <div className="text-xs font-mono font-medium text-slate-500 truncate">
                                  {person.id} {person.callsign ? `• ${person.callsign}` : ''}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Role & Team */}
                          <td className="px-4 sm:px-5 py-3.5">
                            <div className="text-sm font-medium text-slate-900 truncate max-w-[160px]">
                              {person.role}
                            </div>
                            <div className="text-xs text-slate-600 font-medium truncate">
                              {person.team}
                            </div>
                          </td>

                          {/* Current Location */}
                          <td className="px-4 sm:px-5 py-3.5">
                            <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs sm:text-[13px]">
                              <span className={`w-2 h-2 rounded-full shrink-0 ${
                                person.currentLocation.includes('Bharati')
                                  ? 'bg-emerald-500'
                                  : person.currentLocation.includes('Camp')
                                  ? 'bg-cyan-500'
                                  : 'bg-amber-500'
                              }`} />
                              <span className="truncate max-w-[140px]">{person.currentLocation}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5 font-medium">
                              Updated {person.lastUpdate}
                            </div>
                          </td>

                          {/* Assignment */}
                          <td className="px-4 sm:px-5 py-3.5">
                            <div className="text-slate-800 font-medium truncate max-w-[190px] text-xs sm:text-[13px]" title={person.assignment}>
                              {person.assignment}
                            </div>
                            <div className="text-xs font-mono text-slate-500 font-medium truncate mt-0.5">
                              {person.expeditionId}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-4 sm:px-5 py-3.5 whitespace-nowrap">
                            {getStatusBadge(person.status)}
                          </td>

                          {/* Action */}
                          <td className="px-4 sm:px-5 py-3.5 text-right whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/personnel/${person.id}`);
                              }}
                              className="p-1.5 text-slate-400 hover:text-polar-blue hover:bg-sky-50 rounded-lg transition-colors inline-flex items-center"
                              title="View Details"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Summary */}
            <div className="px-5 py-3.5 border-t border-polar-border bg-slate-50 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>Showing {filteredPersonnel.length} of {personnel.length} total expedition members</span>
              <span className="font-mono text-xs text-slate-500 font-medium">IAE TELEMETRY LINK ACTIVE</span>
            </div>

          </div>
        </div>

        {/* Right 1 Col: Personnel Movement Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-polar-border pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-polar-blue/10 text-polar-blue flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#082D56]">Personnel Movement</h3>
                  <p className="text-xs text-slate-500 font-medium">Live traverse &amp; transfer log</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                5 EVENTS
              </span>
            </div>

            <div className="space-y-3">
              {movements.map((mov) => (
                <div
                  key={mov.id}
                  className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 hover:bg-slate-50 transition-colors space-y-2 text-xs sm:text-[13px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#082D56]">{mov.personnelName}</span>
                    <span className="text-xs font-mono text-slate-500 font-medium">{mov.timestamp}</span>
                  </div>

                  {/* Movement Vector */}
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                    <span className="text-slate-600">{mov.fromLocation}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-polar-blue shrink-0" />
                    <span className="font-bold text-[#082D56]">{mov.toLocation}</span>
                  </div>

                  {/* Mode & Date */}
                  <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
                    <span className="text-sky-700 font-semibold truncate max-w-[160px]">{mov.transportMode}</span>
                    <span className="font-mono text-slate-500 font-medium">{mov.dateFormatted}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="w-full py-2.5 text-xs sm:text-sm font-semibold text-polar-blue hover:text-polar-blue-hover hover:bg-sky-50 rounded-xl transition-colors border border-dashed border-polar-blue/40"
              >
                + Record New Personnel Movement
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Assign Personnel Modal */}
      <AssignPersonnelModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
      />

    </div>
  );
};
