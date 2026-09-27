import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  UploadCloud,
  Search,
  Shield,
  Lock,
  Eye,
  ArrowRight,
  Database,
  FileText,
  Radio,
  FlaskConical,
  Image as ImageIcon,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';
import { useKnowledge } from '../context/KnowledgeContext';
import { Badge } from '../components/common/Badge';
import { AddKnowledgeRecordModal } from '../components/knowledge/AddKnowledgeRecordModal';
import type { KnowledgeClassification, KnowledgeStatus, KnowledgeType } from '../types';

export const KnowledgeHubPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    filteredRecords,
    summaryCounts,
    workflowCounts,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedExpedition,
    setSelectedExpedition,
    selectedLocation,
    setSelectedLocation,
    selectedClassification,
    setSelectedClassification,
    selectedStatus,
    setSelectedStatus,
    selectedResearchArea,
    setSelectedResearchArea,
    selectedWorkflowStage,
    setSelectedWorkflowStage,
    resetFilters,
  } = useKnowledge();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showImportNotice, setShowImportNotice] = useState(false);

  const getClassificationBadge = (classification: KnowledgeClassification) => {
    switch (classification) {
      case 'Public':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Eye className="w-3 h-3 text-emerald-600" />
            Public
          </span>
        );
      case 'Controlled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-polar-blue border border-sky-200">
            <Shield className="w-3 h-3 text-polar-blue" />
            Controlled
          </span>
        );
      case 'Restricted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <Lock className="w-3 h-3 text-rose-600" />
            Restricted
          </span>
        );
    }
  };

  const getStatusBadge = (status: KnowledgeStatus) => {
    switch (status) {
      case 'Published':
        return <Badge variant="success">Published</Badge>;
      case 'Approved':
        return <Badge variant="default">Approved</Badge>;
      case 'Under Review':
        return <Badge variant="warning">Under Review</Badge>;
      case 'Validation':
        return <Badge variant="warning">Validation</Badge>;
      case 'Collected':
      case 'Draft':
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: KnowledgeType) => {
    switch (type) {
      case 'Dataset':
        return <Database className="w-3.5 h-3.5 text-sky-600" />;
      case 'Report':
        return <FileText className="w-3.5 h-3.5 text-blue-600" />;
      case 'Field Observation':
        return <Radio className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Scientific Sample':
        return <FlaskConical className="w-3.5 h-3.5 text-purple-600" />;
      case 'Media':
        return <ImageIcon className="w-3.5 h-3.5 text-amber-600" />;
      case 'Incident Record':
      case 'Lessons Learned':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />;
    }
  };

  const workflowStages = [
    { key: 'Collected', label: 'COLLECTED', count: workflowCounts.collected, desc: 'Raw field telemetry & samples' },
    { key: 'Validated', label: 'VALIDATED', count: workflowCounts.validated, desc: 'Integrity & coordinates checked' },
    { key: 'Classified', label: 'CLASSIFIED', count: workflowCounts.classified, desc: 'Access tier assigned' },
    { key: 'Review', label: 'REVIEW', count: workflowCounts.review, desc: 'Human scientific peer review' },
    { key: 'Approved', label: 'APPROVED', count: workflowCounts.approved, desc: 'Archival & release cleared' },
    { key: 'Published', label: 'PUBLISHED', count: workflowCounts.published, desc: 'Live in public portal' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-7 max-w-[1600px] mx-auto space-y-6 sm:space-y-7">
      
      {/* ==========================================
          HEADER & CONTEXT STRIP
          ========================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-polar-border">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1.5">
            <span>Knowledge</span>
            <span>•</span>
            <span className="text-polar-blue font-bold">Internal Repository</span>
          </div>
          <h1 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-[#082D56] tracking-tight">
            Knowledge Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Validate, classify and preserve scientific datasets, reports and observational knowledge across polar expeditions.
          </p>
        </div>

        {/* Top-Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowImportNotice(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-slate-500" />
            <span>Import Record</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-polar-blue hover:bg-polar-blue-hover text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Knowledge Record</span>
          </button>
        </div>
      </div>

      {/* Import Notice Banner if triggered */}
      {showImportNotice && (
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl text-xs sm:text-[13px] text-sky-900 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <UploadCloud className="w-5 h-5 text-polar-blue shrink-0" />
            <span>
              <strong>Simulated Ingestion:</strong> Ingest direct from Field Sync Outbox, Station Telemetry Logger, or WMO NetCDF package format.
            </span>
          </div>
          <button
            onClick={() => setShowImportNotice(false)}
            className="text-slate-500 hover:text-slate-700 font-bold px-2 py-1 text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Compact Context Line */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-polar-border rounded-xl text-xs sm:text-[13px] text-slate-600">
        <div className="flex items-center gap-2 font-mono">
          <span className="font-bold text-slate-800">IAE-2026-W03</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700">Bharati Station</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700 font-sans font-medium">Internal Knowledge Repository</span>
        </div>
        <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-md bg-slate-200/80 text-slate-700 font-bold">
          SIMULATED REPOSITORY
        </span>
      </div>

      {/* ==========================================
          SECTION 1 — REPOSITORY SUMMARY
          ========================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        
        {/* Total Records */}
        <div className="p-4 sm:p-5 bg-white border border-polar-border rounded-2xl shadow-2xs hover:border-slate-300 transition-all">
          <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
            Total Records
          </div>
          <div className="font-heading font-bold text-xl sm:text-2xl text-[#082D56] mt-1.5">
            {summaryCounts.total}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">Across all expeditions</div>
        </div>

        {/* Awaiting Validation */}
        <div className="p-4 sm:p-5 bg-white border border-polar-border rounded-2xl shadow-2xs hover:border-slate-300 transition-all">
          <div className="text-xs uppercase font-bold tracking-wider text-amber-700 flex items-center justify-between">
            <span>Awaiting Validation</span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <div className="font-heading font-bold text-xl sm:text-2xl text-amber-900 mt-1.5">
            {summaryCounts.awaitingValidation}
          </div>
          <div className="text-xs text-amber-700 font-medium mt-1">Integrity &amp; QC checks</div>
        </div>

        {/* Under Review */}
        <div className="p-4 sm:p-5 bg-white border border-polar-border rounded-2xl shadow-2xs hover:border-slate-300 transition-all">
          <div className="text-xs uppercase font-bold tracking-wider text-polar-blue flex items-center justify-between">
            <span>Under Review</span>
            <span className="w-2 h-2 rounded-full bg-polar-blue"></span>
          </div>
          <div className="font-heading font-bold text-xl sm:text-2xl text-[#082D56] mt-1.5">
            {summaryCounts.underReview}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">Peer human review</div>
        </div>

        {/* Approved */}
        <div className="p-4 sm:p-5 bg-white border border-polar-border rounded-2xl shadow-2xs hover:border-slate-300 transition-all">
          <div className="text-xs uppercase font-bold tracking-wider text-emerald-700 flex items-center justify-between">
            <span>Approved</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="font-heading font-bold text-xl sm:text-2xl text-emerald-900 mt-1.5">
            {summaryCounts.approved}
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-1">Peer verified archive</div>
        </div>

        {/* Public */}
        <div className="p-4 sm:p-5 bg-white border border-polar-border rounded-2xl shadow-2xs col-span-2 sm:col-span-1 hover:border-slate-300 transition-all">
          <div className="text-xs uppercase font-bold tracking-wider text-slate-600 flex items-center justify-between">
            <span>Public</span>
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="font-heading font-bold text-xl sm:text-2xl text-[#082D56] mt-1.5">
            {summaryCounts.public}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">Public Portal eligible</div>
        </div>

      </div>

      {/* ==========================================
          SECTION 2 — KNOWLEDGE WORKFLOW STRIP
          ========================================== */}
      <div className="bg-white border border-polar-border rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#082D56]">
            <span>Knowledge Lifecycle &amp; Governance Flow</span>
          </div>
          {selectedWorkflowStage !== 'All' && (
            <button
              onClick={() => setSelectedWorkflowStage('All')}
              className="text-xs text-polar-blue hover:underline font-semibold"
            >
              Clear stage filter (Showing: {selectedWorkflowStage})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {workflowStages.map((stage, idx) => {
            const isSelected = selectedWorkflowStage === stage.key;
            return (
              <button
                key={stage.key}
                onClick={() => setSelectedWorkflowStage(isSelected ? 'All' : stage.key)}
                className={`text-left p-3 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'border-polar-blue bg-sky-50/80 ring-1 ring-polar-blue'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    0{idx + 1} · {stage.label}
                  </span>
                  <span className="font-mono font-bold text-xs px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-900 shadow-2xs">
                    {stage.count}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium truncate">{stage.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==========================================
          SECTION 3 — SEARCH & FILTER PANEL
          ========================================== */}
      <div className="bg-white border border-polar-border rounded-2xl p-5 shadow-xs space-y-3.5">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search knowledge records, datasets, reports, samples, keywords..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
          />
        </div>

        {/* Filter Selectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          
          {/* Type Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs focus:ring-2 focus:ring-polar-blue/30 outline-hidden"
            >
              <option value="All">All Types</option>
              <option value="Dataset">Dataset</option>
              <option value="Report">Report</option>
              <option value="Field Observation">Field Observation</option>
              <option value="Scientific Sample">Scientific Sample</option>
              <option value="Media">Media</option>
              <option value="Incident Record">Incident Record</option>
              <option value="Lessons Learned">Lessons Learned</option>
            </select>
          </div>

          {/* Expedition Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Expedition</label>
            <select
              value={selectedExpedition}
              onChange={(e) => setSelectedExpedition(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs focus:ring-2 focus:ring-polar-blue/30 outline-hidden"
            >
              <option value="All">All Expeditions</option>
              <option value="IAE-2026-W03">IAE-2026-W03</option>
              <option value="IAE-2025-W02">IAE-2025-W02</option>
              <option value="Other Expeditions">Other Expeditions</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs focus:ring-2 focus:ring-polar-blue/30 outline-hidden"
            >
              <option value="All">All Locations</option>
              <option value="Bharati">Bharati</option>
              <option value="Maitri">Maitri</option>
              <option value="Field Camp Alpha">Field Camp Alpha</option>
              <option value="Southern Ocean">Southern Ocean</option>
            </select>
          </div>

          {/* Classification Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Classification</label>
            <select
              value={selectedClassification}
              onChange={(e) => setSelectedClassification(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs focus:ring-2 focus:ring-polar-blue/30 outline-hidden"
            >
              <option value="All">All Tiers</option>
              <option value="Public">Public</option>
              <option value="Controlled">Controlled</option>
              <option value="Restricted">Restricted</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs focus:ring-2 focus:ring-polar-blue/30 outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Collected">Collected</option>
              <option value="Validation">Validation</option>
              <option value="Review">Review</option>
              <option value="Approved">Approved</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {/* Research Area Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Research Area</label>
            <select
              value={selectedResearchArea}
              onChange={(e) => setSelectedResearchArea(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs focus:ring-2 focus:ring-polar-blue/30 outline-hidden"
            >
              <option value="All">All Areas</option>
              <option value="Glaciology">Glaciology</option>
              <option value="Atmospheric Science">Atmospheric Science</option>
              <option value="Oceanography">Oceanography</option>
              <option value="Meteorology">Meteorology</option>
              <option value="Climate Science">Climate Science</option>
              <option value="Logistics">Logistics</option>
              <option value="Safety">Safety</option>
            </select>
          </div>

        </div>

        {/* Active Filter summary & reset */}
        {(searchQuery ||
          selectedType !== 'All' ||
          selectedExpedition !== 'All' ||
          selectedLocation !== 'All' ||
          selectedClassification !== 'All' ||
          selectedStatus !== 'All' ||
          selectedResearchArea !== 'All' ||
          selectedWorkflowStage !== 'All') && (
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs text-slate-600 font-medium">
            <span>
              Showing <strong>{filteredRecords.length}</strong> matching records
            </span>
            <button
              onClick={resetFilters}
              className="text-polar-blue hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* ==========================================
          SECTION 4 — KNOWLEDGE RECORD TABLE
          ========================================== */}
      <div className="bg-white border border-polar-border rounded-2xl shadow-xs overflow-hidden">
        
        <div className="px-5 py-3.5 bg-slate-50/80 border-b border-polar-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-polar-blue" />
            <h3 className="font-heading font-bold text-sm text-[#082D56]">
              Institutional Knowledge Ledger
            </h3>
            <span className="text-xs text-sky-800 font-mono font-semibold bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
              {filteredRecords.length} records
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Click row for validation &amp; publication workspace
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-polar-border text-[11px] text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-5">Record ID</th>
                <th className="py-3.5 px-4 sm:px-5">Title</th>
                <th className="py-3.5 px-4 sm:px-5">Type</th>
                <th className="py-3.5 px-4 sm:px-5">Expedition</th>
                <th className="py-3.5 px-4 sm:px-5">Owner</th>
                <th className="py-3.5 px-4 sm:px-5">Classification</th>
                <th className="py-3.5 px-4 sm:px-5">Status</th>
                <th className="py-3.5 px-4 sm:px-5">Updated</th>
                <th className="py-3.5 px-4 sm:px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-500 font-medium text-sm">
                    No knowledge records match the current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr
                    key={rec.id}
                    onClick={() => navigate(`/knowledge-hub/${rec.id}`)}
                    className="hover:bg-sky-50/50 cursor-pointer transition-colors group"
                  >
                    {/* Record ID */}
                    <td className="py-3.5 px-4 sm:px-5 font-mono font-bold text-[#082D56] text-xs sm:text-[13px] group-hover:text-polar-blue">
                      {rec.id}
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4 sm:px-5 font-semibold text-slate-900 max-w-xs truncate">
                      <div className="flex items-center gap-1.5 text-sm">
                        <span>{rec.title}</span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium truncate mt-0.5">
                        {rec.location} • {rec.researchArea}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-4 sm:px-5 text-slate-700 font-medium">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px]">
                        {getTypeIcon(rec.type)}
                        <span>{rec.type}</span>
                      </span>
                    </td>

                    {/* Expedition */}
                    <td className="py-3.5 px-4 sm:px-5 font-mono text-xs text-slate-600 font-medium">
                      {rec.expeditionId}
                    </td>

                    {/* Owner */}
                    <td className="py-3.5 px-4 sm:px-5 text-slate-700 font-medium text-xs sm:text-[13px]">
                      {rec.owner}
                    </td>

                    {/* Classification */}
                    <td className="py-3.5 px-4 sm:px-5">
                      {getClassificationBadge(rec.classification)}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 sm:px-5">
                      {getStatusBadge(rec.status)}
                    </td>

                    {/* Updated */}
                    <td className="py-3.5 px-4 sm:px-5 text-xs text-slate-500 font-mono font-medium">
                      {rec.updatedAt}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 sm:px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/knowledge-hub/${rec.id}`);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-polar-blue hover:text-white text-slate-700 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <span>Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add Modal */}
      <AddKnowledgeRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onRecordCreated={(id) => navigate(`/knowledge-hub/${id}`)}
      />

    </div>
  );
};
