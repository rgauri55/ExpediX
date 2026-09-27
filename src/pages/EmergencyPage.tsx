import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Plus,
  ExternalLink,
  UserCheck,
  Radio,
  Clock,
  Compass,
  FileText,
  Search,
  Send,
} from 'lucide-react';
import { useEmergency } from '../context/EmergencyContext';
import { useFieldOperations } from '../context/FieldOperationsContext';
import { Badge } from '../components/common/Badge';
import { ReportIncidentModal } from '../components/emergency/ReportIncidentModal';
import { EscalateModal } from '../components/emergency/EscalateModal';
import { InvestigationModal } from '../components/emergency/InvestigationModal';
import type { EmergencyStatus, EmergencySeverity } from '../types';

export const EmergencyPage: React.FC = () => {
  const {
    incidents,
    activeIncident,
    selectIncident,
    acknowledgeIncident,
    startResponse,
    requestMedicalSupport,
    markPersonnelSafe,
  } = useEmergency();

  const { isConnected, lastSyncTime } = useFieldOperations();

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState<boolean>(false);
  const [isInvestigationModalOpen, setIsInvestigationModalOpen] = useState<boolean>(false);

  // Search and filter state for Incident Registry
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const current = activeIncident || incidents[0];

  // Lifecycle steps
  const lifecycleSteps: { label: string; status: EmergencyStatus }[] = [
    { label: 'Reported', status: 'Reported' },
    { label: 'Acknowledged', status: 'Acknowledged' },
    { label: 'Response in progress', status: 'Response in progress' },
    { label: 'Personnel safe', status: 'Personnel safe' },
    { label: 'Investigation', status: 'Investigation' },
    { label: 'Closed', status: 'Closed' },
  ];

  const getStepIndex = (status: EmergencyStatus) => {
    switch (status) {
      case 'Reported':
        return 0;
      case 'Acknowledged':
        return 1;
      case 'Response in progress':
        return 2;
      case 'Personnel safe':
        return 3;
      case 'Investigation':
        return 4;
      case 'Closed':
        return 5;
      default:
        return 2;
    }
  };

  const currentStepIndex = getStepIndex(current.status);

  // Filtered registry list
  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      inc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.affectedPersonnel.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? inc.status !== 'Closed'
        : inc.status === statusFilter;

    const matchesSeverity = severityFilter === 'all' || inc.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || inc.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesSeverity && matchesCategory;
  });

  const getSeverityBadge = (severity: EmergencySeverity) => {
    switch (severity) {
      case 'Critical':
        return <Badge variant="emergency" size="sm">CRITICAL</Badge>;
      case 'High':
        return <Badge variant="emergency" size="sm">HIGH</Badge>;
      case 'Moderate':
        return <Badge variant="warning" size="sm">MODERATE</Badge>;
      case 'Low':
        return <Badge variant="neutral" size="sm">LOW</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: EmergencyStatus) => {
    switch (status) {
      case 'Reported':
        return <Badge variant="warning" size="sm">REPORTED</Badge>;
      case 'Acknowledged':
        return <Badge variant="primary" size="sm">ACKNOWLEDGED</Badge>;
      case 'Response in progress':
        return <Badge variant="warning" size="sm" dot>RESPONSE IN PROGRESS</Badge>;
      case 'Personnel safe':
        return <Badge variant="success" size="sm">PERSONNEL SAFE</Badge>;
      case 'Investigation':
        return <Badge variant="primary" size="sm">INVESTIGATION</Badge>;
      case 'Closed':
        return <Badge variant="neutral" size="sm">CLOSED</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 pb-12 text-slate-800">
      
      {/* ========================================================================= */}
      {/* 1. TOP CONTEXT HEADER & WORKSPACE BANNER                                  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1.5">
              <span className="font-bold text-polar-blue">IAE-2026-W03</span>
              <span>•</span>
              <span>Bharati Station</span>
              <span>•</span>
              <span>Field Camp Alpha</span>
              <span>•</span>
              <span className="text-slate-400 font-mono">Fictional Demo Incident Protocol</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#082D56] tracking-tight">
                Emergency Response
              </h1>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                INCIDENT CONSOLE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Operational incident response, field personnel accountability, and investigation lifecycle.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-polar-blue hover:bg-polar-blue-hover text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Report Incident</span>
            </button>
          </div>
        </div>

        {/* Compact Metadata Strip */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-y-2 text-xs sm:text-[13px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Selected incident:</span>
              <strong className="font-mono font-bold text-slate-900">{current.code}</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Severity:</span>
              {getSeverityBadge(current.severity)}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Category:</span>
              <Badge variant="primary" size="sm">{current.category.toUpperCase()}</Badge>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Field Camp Alpha:</span>
              <span className="font-bold text-emerald-700">2 / 2 Accounted For</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-xs font-medium">Link State:</span>
            <Badge variant={isConnected ? 'success' : 'offline'} size="sm">
              {isConnected ? 'CONNECTED' : 'OFFLINE'}
            </Badge>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ACTIVE INCIDENT DOMINANT CARD & LIFECYCLE PROGRESS BAR                 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-xs space-y-4">
        
        {/* Active Incident Title & Primary Meta */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-xs sm:text-sm bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
                {current.code}
              </span>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-[#082D56]">
                {current.title}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 text-xs sm:text-[13px] text-slate-600 font-medium">
              <span>{current.expedition}</span>
              <span>•</span>
              <span>{current.location}</span>
              <span>•</span>
              <span>Reported at {current.timeReported} by {current.reportedBy} ({current.reporterRole})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {getStatusBadge(current.status)}
            {current.syncStatus === 'PENDING SYNC' && (
              <Badge variant="offline" size="sm">PENDING SYNC</Badge>
            )}
          </div>
        </div>

        {/* Incident Lifecycle Progress Tracker */}
        <div className="py-3 border-b border-slate-100">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Incident Lifecycle
          </div>
          <div className="grid grid-cols-6 gap-1 sm:gap-2 text-center text-xs">
            {lifecycleSteps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={step.label}
                  className={`p-1.5 rounded-lg border text-[11px] transition-all ${
                    isCurrent
                      ? 'bg-polar-blue text-white font-semibold border-polar-blue shadow-2xs'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 font-medium border-emerald-200'
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {isPast && <span>✓</span>}
                    <span className="truncate">{step.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Escalation Alert if Escalated */}
        {current.escalation && (
          <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start justify-between gap-3">
            <div>
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Escalated to {current.escalation.level}</span>
                <span className="text-[10px] text-amber-700 font-mono">({current.escalation.timestamp})</span>
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5">
                {current.escalation.reason}
              </p>
            </div>
            <span className="text-[10px] font-mono font-semibold bg-amber-200/60 px-2 py-0.5 rounded text-amber-900 shrink-0">
              Auth: {current.escalation.authorizedBy}
            </span>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN 2-COLUMN INCIDENT WORKSPACE                                       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        
        {/* ================= LEFT 2 COLUMNS: DETAILS, ACCOUNTABILITY, TIMELINE, INVESTIGATION ================= */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* SECTION 1: INCIDENT DETAILS */}
          <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#082D56]">
                Incident Details &amp; Operational Overview
              </h3>
              <span className="text-xs text-slate-500 font-mono font-medium">
                Source: Field Log Relay
              </span>
            </div>

            {/* Metadata 4-Column Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-[13px]">
              <div>
                <span className="text-slate-500 text-xs font-medium uppercase block">Incident ID</span>
                <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm mt-0.5 block">{current.code}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs font-medium uppercase block">Category</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{current.category}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs font-medium uppercase block">Severity</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{current.severity}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs font-medium uppercase block">Location</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{current.location}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs font-medium uppercase block">Reported By</span>
                <span className="font-medium text-slate-800 mt-0.5 block">{current.reportedBy} ({current.reporterRole})</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs font-medium uppercase block">Affected Personnel</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{current.affectedPersonnel}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs font-medium uppercase block">Time Reported</span>
                <span className="font-mono text-slate-800 font-medium mt-0.5 block">{current.timeReported}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs font-medium uppercase block">Sync Status</span>
                <span className={`font-semibold mt-0.5 block ${current.syncStatus === 'SYNCED' ? 'text-emerald-700' : 'text-orange-700'}`}>
                  {current.syncStatus === 'SYNCED' ? 'Synchronized' : 'Pending Sync'}
                </span>
              </div>
            </div>

            {/* Description Block */}
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs sm:text-[13px] space-y-1.5">
              <span className="text-xs uppercase font-bold text-slate-500 block tracking-wider">
                Operational Description (Simulated Demo Text)
              </span>
              <p className="text-slate-800 leading-relaxed font-normal">
                {current.description}
              </p>
            </div>
          </div>

          {/* SECTION 2: PERSONNEL ACCOUNTABILITY (CRITICAL OPERATIONAL SECTION) */}
          <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#082D56]">
                  Personnel Accountability
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-[13px]">
                <span className="text-slate-600 font-medium">Field Camp Alpha:</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {current.accountedTeam.length} / {current.accountedTeam.length} ACCOUNTED FOR
                </span>
              </div>
            </div>

            {/* Operational Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-[13px]">
                <thead>
                  <tr className="text-slate-600 bg-slate-50/80 uppercase font-bold text-[11px] border-b border-slate-200">
                    <th className="py-3 px-4">Name &amp; Role</th>
                    <th className="py-3 px-4">Involvement</th>
                    <th className="py-3 px-4">Accountability</th>
                    <th className="py-3 px-4">Action Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {current.accountedTeam.map((member) => (
                    <tr key={member.id} className="text-slate-700 hover:bg-slate-50/80">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 text-sm">{member.name}</div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">{member.role}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          member.involvement === 'Affected personnel'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-sky-50 text-sky-800 border border-sky-200'
                        }`}>
                          {member.involvement}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs sm:text-[13px]">
                          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                          <span>{member.accountedStatus}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {member.actionStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 3: RESPONSE TIMELINE (CHRONOLOGICAL OPERATIONAL EVENTS) */}
          <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-polar-blue" />
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#082D56]">
                  Response Timeline
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono font-medium">
                {current.timeline.length} events logged
              </span>
            </div>

            {/* Vertical Chronological Timeline */}
            <div className="relative pl-6 space-y-4.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 text-xs sm:text-[13px]">
              {current.timeline.map((event) => (
                <div key={event.id} className="relative group">
                  {/* Dot */}
                  <div className={`absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 bg-white ${
                    event.type === 'report'
                      ? 'border-amber-500 bg-amber-500'
                      : event.type === 'safe'
                      ? 'border-emerald-500 bg-emerald-500'
                      : event.type === 'escalation'
                      ? 'border-rose-500 bg-rose-500'
                      : event.type === 'closure'
                      ? 'border-slate-600 bg-slate-600'
                      : 'border-polar-blue'
                  }`} />

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2 text-xs sm:text-[13px]">
                        <span>{event.title}</span>
                        <span className="font-mono text-xs text-slate-500 font-medium">
                          [{event.actor}]
                        </span>
                      </div>
                      {event.details && (
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {event.details}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-slate-500 text-xs shrink-0 font-medium">
                      {event.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: INVESTIGATION & CLOSURE WORKFLOW */}
          <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-navy-DEFAULT" />
                <h3 className="font-heading font-bold text-sm text-navy-DEFAULT">
                  Investigation &amp; Formal Closure
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Prototype Requirement
              </span>
            </div>

            {current.status === 'Closed' && current.investigation ? (
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>
                      {current.investigation.investigationCompleted
                        ? 'Investigation Completed & Debrief Recorded'
                        : 'Exemption Justification Recorded'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Closed by: {current.investigation.closedBy} ({current.investigation.completedAt})
                  </span>
                </div>

                {current.investigation.investigationCompleted ? (
                  <div className="grid grid-cols-1 gap-2 text-slate-700">
                    <div>
                      <strong className="text-slate-900 block text-[11px]">Investigation Summary:</strong>
                      <p className="text-slate-600 mt-0.5">{current.investigation.summary}</p>
                    </div>
                    <div>
                      <strong className="text-slate-900 block text-[11px]">Root Cause / Factors:</strong>
                      <p className="text-slate-600 mt-0.5">{current.investigation.rootCause}</p>
                    </div>
                    <div>
                      <strong className="text-slate-900 block text-[11px]">Corrective Action:</strong>
                      <p className="text-slate-600 mt-0.5">{current.investigation.correctiveAction}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <strong className="text-slate-900 block text-[11px]">Closure Justification:</strong>
                    <p className="text-slate-600 mt-0.5">{current.investigation.justificationReason}</p>
                  </div>
                )}
              </div>
            ) : current.status === 'Personnel safe' ? (
              <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-emerald-900">
                    Response Phase Complete • Investigation Required
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    All personnel are verified safe. Complete the post-incident investigation or record an exemption justification to archive this incident.
                  </p>
                </div>
                <button
                  onClick={() => setIsInvestigationModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  Complete Investigation &amp; Close
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500">
                <div className="font-semibold text-slate-700 mb-0.5">
                  Investigation Locked
                </div>
                Investigation entry will become available once the active response phase concludes and personnel safety is confirmed.
              </div>
            )}
          </div>

        </div>

        {/* ================= RIGHT OPERATIONAL SIDEBAR ================= */}
        <div className="space-y-4">
          
          {/* 1. RESPONSE ACTIONS (STATE DEPENDENT HIERARCHY) */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-3">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Operational Actions
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Response Console</span>
            </div>

            <div className="space-y-2">
              {current.status === 'Reported' && (
                <button
                  onClick={() => acknowledgeIncident(current.id)}
                  className="w-full py-2 px-3 rounded-lg bg-polar-blue hover:bg-navy-DEFAULT text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Acknowledge Incident</span>
                </button>
              )}

              {current.status === 'Acknowledged' && (
                <button
                  onClick={() => startResponse(current.id)}
                  className="w-full py-2 px-3 rounded-lg bg-polar-blue hover:bg-navy-DEFAULT text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Start Response</span>
                </button>
              )}

              {current.status === 'Response in progress' && (
                <>
                  {/* Primary Action: Mark Personnel Safe */}
                  <button
                    onClick={() => markPersonnelSafe(current.id)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Mark Personnel Safe</span>
                  </button>

                  {/* Secondary Action: Request Medical Support */}
                  <button
                    onClick={() => requestMedicalSupport(current.id)}
                    className="w-full py-1.5 px-3 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Medical Support</span>
                  </button>

                  {/* Tertiary Action: Escalate */}
                  <button
                    onClick={() => setIsEscalateModalOpen(true)}
                    className="w-full py-1.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Escalate Incident</span>
                  </button>
                </>
              )}

              {current.status === 'Personnel safe' && (
                <>
                  <button
                    onClick={() => setIsInvestigationModalOpen(true)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Complete Investigation &amp; Close</span>
                  </button>

                  <button
                    onClick={() => requestMedicalSupport(current.id)}
                    className="w-full py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium text-xs transition-colors cursor-pointer"
                  >
                    Request Follow-up Tele-Consult
                  </button>
                </>
              )}

              {current.status === 'Closed' && (
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-600 text-center text-xs">
                  <div className="font-semibold text-slate-800">Incident Closed</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Formal investigation recorded &amp; debrief complete.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. COMMUNICATION STATUS & SYNCHRONIZATION BRIDGE */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-2">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Communication Status
              </h3>
              <Radio className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="space-y-1.5 text-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Site:</span>
                <span className="font-semibold text-slate-900">Field Camp Alpha</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Connection:</span>
                <span className={`font-medium ${isConnected ? 'text-emerald-700' : 'text-orange-700'}`}>
                  {isConnected ? 'Connected' : 'Offline'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Last sync:</span>
                <span className="font-mono text-slate-800">{lastSyncTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Incident record:</span>
                <span className={current.syncStatus === 'SYNCED' ? 'text-emerald-700 font-medium' : 'text-orange-700 font-medium'}>
                  {current.syncStatus === 'SYNCED' ? 'Synchronized' : 'Pending synchronization'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/synchronization"
                className="text-[11px] text-polar-blue hover:underline font-semibold flex items-center justify-between"
              >
                <span>View synchronization record</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* 3. RESPONSE RESOURCES */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-2">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Response Resources
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Allocated</span>
            </div>

            <div className="space-y-2">
              {current.associatedResources.map((res) => (
                <div key={res.id} className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{res.name}</div>
                    <div className="text-[10px] text-slate-500">{res.quantity} • {res.location}</div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {res.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. LOCATION & SIMULATED CONDITIONS */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-2">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Location &amp; Conditions
              </h3>
              <Compass className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Step Route Chain */}
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1 font-mono text-slate-700">
              <div className="font-semibold text-slate-900">Bharati Station</div>
              <div className="text-slate-400 pl-3">↓ 40 km</div>
              <div className="font-semibold text-slate-900">Field Camp Alpha</div>
              <div className="text-slate-400 pl-3">↓ Survey Corridor</div>
              <div className="font-bold text-polar-blue">Survey Zone B (Incident Site)</div>
            </div>

            <div className="space-y-1 text-slate-600 text-[11px] pt-1">
              <div className="flex items-center justify-between">
                <span>Conditions:</span>
                <span className="font-medium text-slate-800">Normal operating conditions</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last check:</span>
                <span className="font-mono text-slate-800">14:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Route status:</span>
                <span className="text-emerald-700 font-medium">Passable</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 font-mono">
              DEMO LOCATION • SIMULATED CONDITIONS
            </div>
          </div>

          {/* 5. INCIDENT REGISTRY & FILTERABLE ARCHIVE */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-3">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Incident Registry
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {filteredIncidents.length} recorded
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search incident, location, personnel..."
                className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              />
            </div>

            {/* Filter Pills and Dropdowns */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['all', 'active', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer capitalize ${
                      statusFilter === st
                        ? 'bg-polar-blue text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'All Incidents' : st}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="px-2 py-1 rounded-md border border-slate-300 bg-slate-50 text-slate-700 outline-hidden"
                >
                  <option value="all">All Severities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2 py-1 rounded-md border border-slate-300 bg-slate-50 text-slate-700 outline-hidden"
                >
                  <option value="all">All Categories</option>
                  <option value="Medical">Medical</option>
                  <option value="Weather">Weather</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Communication">Communication</option>
                  <option value="Route / Terrain">Route / Terrain</option>
                </select>
              </div>
            </div>

            {/* Incident List */}
            <div className="space-y-1.5 max-h-72 overflow-y-auto">
              {filteredIncidents.map((inc) => {
                const isSelected = inc.id === current.id;
                return (
                  <div
                    key={inc.id}
                    onClick={() => selectIncident(inc.id)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-polar-blue shadow-2xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-900 text-xs">
                          {inc.code}
                        </span>
                        <span className="text-[10px] text-slate-500">• {inc.category}</span>
                      </div>
                      {inc.status === 'Closed' ? (
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                          Closed
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="font-semibold text-slate-800 text-[11px] truncate">
                      {inc.title}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>{inc.location}</span>
                      <span>{inc.timeReported}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODALS                                                                    */}
      {/* ========================================================================= */}
      
      {/* Report Incident Modal */}
      <ReportIncidentModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Escalate Modal */}
      <EscalateModal
        incident={current}
        isOpen={isEscalateModalOpen}
        onClose={() => setIsEscalateModalOpen(false)}
      />

      {/* Investigation & Closure Modal */}
      <InvestigationModal
        incident={current}
        isOpen={isInvestigationModalOpen}
        onClose={() => setIsInvestigationModalOpen(false)}
      />

    </div>
  );
};

export default EmergencyPage;
