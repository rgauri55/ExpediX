import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Mountain, 
  MapPin, 
  Calendar, 
  User, 
  ArrowRight,
  ChevronRight,
  Compass,
  Layers
} from 'lucide-react';
import { useExpeditions } from '../context/ExpeditionContext';
import { CreateExpeditionModal } from '../components/expeditions/CreateExpeditionModal';
import { EXPEDITION_SUMMARY_STATS } from '../data/demoData';

export const ExpeditionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { expeditions, addExpedition, activeExpedition } = useExpeditions();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stationFilter, setStationFilter] = useState('All');
  const [seasonFilter, setSeasonFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  // Filtered Expeditions
  const filteredExpeditions = useMemo(() => {
    return expeditions.filter((exp) => {
      const matchesSearch = 
        exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.stationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.expeditionLead.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || exp.status === statusFilter;
      const matchesStation = stationFilter === 'All' || exp.stationName === stationFilter;
      const matchesSeason = seasonFilter === 'All' || exp.season === seasonFilter;
      const matchesYear = yearFilter === 'All' || exp.year === yearFilter;

      return matchesSearch && matchesStatus && matchesStation && matchesSeason && matchesYear;
    });
  }, [expeditions, searchQuery, statusFilter, stationFilter, seasonFilter, yearFilter]);

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
    <div className="space-y-6 sm:space-y-7 font-sans max-w-[1600px] mx-auto text-slate-800">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-polar-border shadow-subtle">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#082D56] tracking-tight">
              Expeditions
            </h1>
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-sky-50 text-polar-blue border border-blue-200">
              SIMULATION DATA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Plan, monitor and coordinate India&apos;s polar expedition missions and station wintering teams.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 bg-polar-blue hover:bg-polar-blue-hover text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Expedition</span>
        </button>
      </div>

      {/* 2. SUMMARY STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-subtle hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Active Expeditions</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Mountain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-bold text-[#082D56]">
            {EXPEDITION_SUMMARY_STATS.active}
          </div>
          <p className="text-xs text-emerald-700 font-semibold mt-1">Currently deployed at stations</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-subtle hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Planning Phase</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-bold text-[#082D56]">
            {EXPEDITION_SUMMARY_STATS.planning}
          </div>
          <p className="text-xs text-amber-700 font-semibold mt-1">Manifest &amp; personnel readiness</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-subtle hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Scheduled Missions</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-polar-blue flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-bold text-[#082D56]">
            {EXPEDITION_SUMMARY_STATS.scheduled}
          </div>
          <p className="text-xs text-polar-blue font-semibold mt-1">Upcoming season schedule</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-polar-border shadow-subtle hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Completed Missions</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-bold text-[#082D56]">
            {EXPEDITION_SUMMARY_STATS.completed}
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">Archived in Knowledge Hub</p>
        </div>

      </div>

      {/* 3. PROMINENT ACTIVE EXPEDITION SHOWCASE */}
      {activeExpedition && (
        <div className="bg-white rounded-2xl border border-blue-200/80 p-6 shadow-card relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#082D56] text-white flex items-center justify-center font-bold shadow-md shrink-0">
                <Mountain className="w-6 h-6 text-sky-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-md bg-blue-50 text-polar-blue border border-blue-200">
                    {activeExpedition.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    ACTIVE MISSION
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#082D56] mt-1">
                  {activeExpedition.name}
                </h2>
                <div className="flex items-center flex-wrap gap-3 text-xs sm:text-[13px] text-slate-600 font-medium mt-1.5">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-polar-blue" />
                    <span>{activeExpedition.location}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeExpedition.durationFormatted}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Lead: {activeExpedition.expeditionLead}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
              <button
                onClick={() => navigate(`/expeditions/${activeExpedition.code}`)}
                className="px-4 py-2 bg-polar-blue hover:bg-polar-blue-hover text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate(`/expeditions/${activeExpedition.code}`)}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
              >
                Manage Personnel
              </button>
              <button
                onClick={() => navigate(`/expeditions/${activeExpedition.code}`)}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold rounded-xl transition-colors hidden sm:inline-block"
              >
                View Logistics
              </button>
            </div>
          </div>

          {/* Metrics & Progress Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4 border-t border-slate-100 items-center">
            
            {/* Progress Bar */}
            <div className="sm:col-span-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-[13px]">
                <span className="text-slate-600 font-semibold">Mission Progress</span>
                <span className="font-bold text-[#082D56] font-mono">{activeExpedition.progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-polar-blue to-sky-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeExpedition.progressPercent}%` }}
                />
              </div>
            </div>

            {/* 3 Quick Stat Badges */}
            <div className="sm:col-span-8 grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-xs text-slate-500 font-medium block">Personnel</span>
                <span className="text-base font-bold text-[#082D56] font-mono">{activeExpedition.personnelCount}</span>
                <span className="text-[10px] text-slate-400 block font-medium">Deployed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-xs text-slate-500 font-medium block">Tracked Cargo</span>
                <span className="text-base font-bold text-[#082D56] font-mono">{activeExpedition.cargoCount}</span>
                <span className="text-[10px] text-slate-400 block font-medium">Units TEU</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-xs text-slate-500 font-medium block">Active Assets</span>
                <span className="text-base font-bold text-[#082D56] font-mono">{activeExpedition.assetCount}</span>
                <span className="text-[10px] text-slate-400 block font-medium">Fleet &amp; Gen</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 4. SEARCH & FILTERS BAR */}
      <div className="bg-white p-4 rounded-2xl border border-polar-border shadow-subtle space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search expedition, mission ID, station, lead..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">Filters:</span>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-polar-blue/30"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Planning">Planning</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Planned">Planned</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Station Filter */}
            <select
              value={stationFilter}
              onChange={(e) => setStationFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-polar-blue/30"
            >
              <option value="All">All Stations</option>
              <option value="Bharati Station">Bharati Station</option>
              <option value="Maitri Station">Maitri Station</option>
            </select>

            {/* Season Filter */}
            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-polar-blue/30"
            >
              <option value="All">All Seasons</option>
              <option value="Winter">Winter</option>
              <option value="Summer">Summer</option>
            </select>

            {/* Year Filter */}
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-polar-blue/30"
            >
              <option value="All">All Years</option>
              <option value="2027">2027</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

        </div>
      </div>

      {/* 5. EXPEDITION REGISTRY TABLE */}
      <div className="bg-white rounded-2xl border border-polar-border shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-polar-border flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-polar-blue" />
            <h3 className="text-sm font-bold text-[#082D56]">
              Expedition Registry
            </h3>
            <span className="text-xs text-sky-800 font-mono font-semibold bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
              {filteredExpeditions.length} missions
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono font-medium hidden sm:inline">
            SIMULATED RECORDS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-600 font-mono">
                <th className="py-3.5 px-4 sm:px-5">Mission ID</th>
                <th className="py-3.5 px-4 sm:px-5">Expedition Name</th>
                <th className="py-3.5 px-4 sm:px-5">Station</th>
                <th className="py-3.5 px-4 sm:px-5">Period</th>
                <th className="py-3.5 px-4 sm:px-5 text-center">Personnel</th>
                <th className="py-3.5 px-4 sm:px-5 text-center">Cargo</th>
                <th className="py-3.5 px-4 sm:px-5">Status</th>
                <th className="py-3.5 px-4 sm:px-5">Progress</th>
                <th className="py-3.5 px-4 sm:px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px] text-slate-700">
              {filteredExpeditions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-500 font-medium text-sm">
                    No expeditions match the specified search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredExpeditions.map((exp) => (
                  <tr 
                    key={exp.id}
                    className="hover:bg-sky-50/50 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/expeditions/${exp.code}`)}
                  >
                    {/* Mission ID */}
                    <td className="py-3.5 px-4 sm:px-5 font-mono font-bold text-[#082D56] text-xs sm:text-[13px]">
                      {exp.code}
                    </td>

                    {/* Expedition Name */}
                    <td className="py-3.5 px-4 sm:px-5">
                      <div className="font-semibold text-slate-900 group-hover:text-polar-blue transition-colors text-sm">
                        {exp.name}
                      </div>
                      <div className="text-xs text-slate-500 font-medium truncate max-w-xs mt-0.5">
                        Lead: {exp.expeditionLead}
                      </div>
                    </td>

                    {/* Station */}
                    <td className="py-3.5 px-4 sm:px-5">
                      <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-polar-blue shrink-0" />
                        <span>{exp.stationName}</span>
                      </div>
                    </td>

                    {/* Period */}
                    <td className="py-3.5 px-4 sm:px-5 font-mono text-xs text-slate-600 font-medium whitespace-nowrap">
                      {exp.durationFormatted}
                    </td>

                    {/* Personnel */}
                    <td className="py-3.5 px-4 sm:px-5 text-center font-mono font-bold text-slate-900 text-sm">
                      {exp.personnelCount}
                    </td>

                    {/* Cargo */}
                    <td className="py-3.5 px-4 sm:px-5 text-center font-mono font-bold text-slate-900 text-sm">
                      {exp.cargoCount}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 sm:px-5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(exp.status)}`}>
                        {exp.status.toUpperCase()}
                      </span>
                    </td>

                    {/* Progress */}
                    <td className="py-3.5 px-4 sm:px-5 min-w-[130px]">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-[#082D56]">{exp.progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-polar-blue rounded-full"
                            style={{ width: `${exp.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 sm:px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/expeditions/${exp.code}`);
                        }}
                        className="p-1.5 text-slate-400 hover:text-polar-blue hover:bg-sky-50 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                      >
                        <span>View</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. CREATE EXPEDITION MODAL */}
      <CreateExpeditionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(newExp) => addExpedition(newExp)}
      />

    </div>
  );
};
