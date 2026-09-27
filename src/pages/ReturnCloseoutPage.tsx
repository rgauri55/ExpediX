import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Layers,
  Users,
  FileText,
  Building2,
  FlaskConical,
  Lock,
  CheckCircle,
  AlertCircle,
  Boxes,
} from 'lucide-react';
import { useCloseout } from '../context/CloseoutContext';
import { Badge } from '../components/common/Badge';
import { PersonnelDetailModal } from '../components/closeout/PersonnelDetailModal';
import { AddBackloadModal } from '../components/closeout/AddBackloadModal';
import { CreateCloseoutRecordModal } from '../components/closeout/CreateCloseoutRecordModal';
import type { PersonnelDeinduction } from '../types';

export const ReturnCloseoutPage: React.FC = () => {
  const {
    missionStatus,
    closedInfo,
    stages,
    personnel,
    assets,
    backload,
    samples,
    handover,
    documents,
    completionPercentage,
    readinessRequirements,
    updateAsset,
    updateBackload,
    updateSample,
    toggleHandover,
    updateDocument,
    closeExpedition,
  } = useCloseout();

  // Modals
  const [selectedPersonnel, setSelectedPersonnel] = useState<PersonnelDeinduction | null>(null);
  const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState<boolean>(false);
  const [isAddBackloadOpen, setIsAddBackloadOpen] = useState<boolean>(false);
  const [isCreateRecordOpen, setIsCreateRecordOpen] = useState<boolean>(false);

  // Requirements metrics
  const completedReqs = readinessRequirements.filter((r) => r.isComplete).length;
  const totalReqs = readinessRequirements.length;
  const isClosureReady = completedReqs === totalReqs;

  const handleOpenPersonnel = (p: PersonnelDeinduction) => {
    setSelectedPersonnel(p);
    setIsPersonnelModalOpen(true);
  };

  const handleCloseExpedition = () => {
    if (isClosureReady) {
      closeExpedition('Command Center Lead (Dr. Ananya Mehta)');
    }
  };

  const getStageBadge = (status: 'Complete' | 'In Progress' | 'Pending' | 'Locked') => {
    switch (status) {
      case 'Complete':
        return <Badge variant="success" size="sm">COMPLETE</Badge>;
      case 'In Progress':
        return <Badge variant="primary" size="sm">IN PROGRESS</Badge>;
      case 'Pending':
        return <Badge variant="warning" size="sm">PENDING</Badge>;
      case 'Locked':
        return <Badge variant="neutral" size="sm">LOCKED</Badge>;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 pb-16 text-slate-800">
      
      {/* ========================================================================= */}
      {/* PAGE HEADER & EXPEDITION STATUS STRIP                                     */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1.5">
              <span className="font-bold text-polar-blue">IAE-2026-W03</span>
              <span>•</span>
              <span>Bharati Station</span>
              <span>•</span>
              <span className="text-slate-400 font-mono">Expedition Closeout</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#082D56] tracking-tight">
                Return &amp; Closeout
              </h1>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-sky-50 text-polar-blue border border-sky-200 font-bold">
                STAGE VII
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Personnel de-induction, asset recovery, backload management and expedition closure.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsCreateRecordOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-polar-blue hover:bg-polar-blue-hover text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Closeout Record</span>
            </button>
          </div>
        </div>

        {/* Expedition Status Line */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-y-2 text-xs sm:text-[13px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Expedition:</span>
              <strong className="font-mono font-bold text-slate-900">IAE-2026-W03</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Station:</span>
              <strong className="text-slate-900 font-semibold">Bharati</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Mission status:</span>
              <Badge variant={missionStatus === 'Closed' ? 'neutral' : 'warning'} size="sm">
                {missionStatus === 'Closed' ? 'CLOSED' : 'RETURN PREPARATION'}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Target closure:</span>
              <span className="font-mono text-slate-800 font-medium">18 Sep 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">Closeout completion:</span>
            <div className="flex items-center gap-2.5">
              <div className="w-28 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className={`h-full transition-all duration-300 ${
                    missionStatus === 'Closed' ? 'bg-emerald-600' : 'bg-polar-blue'
                  }`}
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <strong className="font-mono text-slate-900 font-bold">{completionPercentage}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Closed Success Notice if Formally Closed */}
      {missionStatus === 'Closed' && closedInfo && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-[13px] flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-sm sm:text-base text-emerald-950">
                Expedition IAE-2026-W03 has been formally closed.
              </div>
              <p className="text-emerald-800 text-xs mt-1">
                All personnel de-inductions, asset transfers, backload manifests, and station handover records have been archived.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0 text-emerald-900 font-mono text-xs">
            <div>Closed by: <strong>{closedInfo.closedBy}</strong></div>
            <div className="text-xs text-emerald-700 mt-0.5">Timestamp: {closedInfo.timestamp} (Simulated)</div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1 — CLOSEOUT WORKFLOW (HORIZONTAL OPERATIONAL PROGRESSION)        */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <ClipboardCheck className="w-5 h-5 text-polar-blue" />
            <h2 className="font-heading font-bold text-sm sm:text-base text-[#082D56]">
              Closeout Workflow
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono font-medium">
            7 Stage De-escalation Sequence
          </span>
        </div>

        {/* Horizontal Workflow Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {stages.map((st, idx) => (
            <div
              key={st.id}
              className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                st.status === 'Complete'
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : st.status === 'In Progress'
                  ? 'bg-blue-50/70 border-polar-blue/50'
                  : st.status === 'Pending'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-slate-50 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500 font-bold">
                  0{idx + 1}
                </span>
                {getStageBadge(st.status)}
              </div>

              <div className="font-bold text-slate-900 text-xs sm:text-[13px] leading-tight line-clamp-1">
                {st.name}
              </div>

              <div className="text-xs text-slate-600 font-medium line-clamp-1">
                Resp: <strong className="text-slate-800">{st.role}</strong>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono font-medium">
                  <span>Progress</span>
                  <span className="font-bold text-slate-800">{st.completion}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${st.status === 'Complete' ? 'bg-emerald-600' : 'bg-polar-blue'}`}
                    style={{ width: `${st.completion}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2 & 3 — PERSONNEL DE-INDUCTION & ASSET RECOVERY                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        
        {/* SECTION 2 — PERSONNEL DE-INDUCTION TABLE */}
        <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-polar-blue" />
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#082D56]">
                  Personnel De-induction
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Track return readiness, medical clearance, travel documentation and departure status.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
              {personnel.filter((p) => p.departureStatus === 'Ready').length}/{personnel.length} Ready
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-[13px]">
              <thead>
                <tr className="text-slate-600 bg-slate-50/80 font-bold uppercase text-[11px] border-b border-slate-200">
                  <th className="py-3 px-3.5">Name &amp; Role</th>
                  <th className="py-3 px-3.5">Site</th>
                  <th className="py-3 px-3.5">Medical</th>
                  <th className="py-3 px-3.5">Equipment</th>
                  <th className="py-3 px-3.5">Travel</th>
                  <th className="py-3 px-3.5">Departure</th>
                  <th className="py-3 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {personnel.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => handleOpenPersonnel(p)}
                    className="hover:bg-sky-50/50 cursor-pointer transition-colors text-slate-700"
                  >
                    <td className="py-3 px-3.5">
                      <div className="font-semibold text-slate-900 text-sm">{p.name}</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">{p.role}</div>
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 font-medium">
                      {p.location}
                    </td>
                    <td className="py-3 px-3.5">
                      <span className={`text-xs font-semibold ${
                        p.medicalClearance === 'Cleared' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {p.medicalClearance}
                      </span>
                    </td>
                    <td className="py-3 px-3.5">
                      <span className={`text-xs font-semibold ${
                        p.equipmentReturned === 'Returned' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {p.equipmentReturned}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 font-medium">
                      {p.travelStatus}
                    </td>
                    <td className="py-3 px-3.5">
                      <Badge variant={p.departureStatus === 'Ready' ? 'success' : 'warning'} size="sm">
                        {p.departureStatus.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenPersonnel(p)}
                        className="px-2.5 py-1 text-xs font-semibold text-polar-blue hover:bg-sky-50 rounded-lg transition-colors"
                      >
                        Sign Off
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3 — ASSET RECOVERY TABLE */}
        <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-sm text-navy-DEFAULT">
                  Asset Recovery
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Track equipment returning from field operations and station deployment.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono shrink-0">
              5 Core Assets
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 text-[11px] border-b border-slate-100">
                  <th className="py-2 font-medium">Asset ID &amp; Name</th>
                  <th className="py-2 font-medium">Last Location</th>
                  <th className="py-2 font-medium">Condition</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium">Custodian</th>
                  <th className="py-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assets.map((ast) => (
                  <tr key={ast.id} className="hover:bg-slate-50/80 transition-colors text-slate-700">
                    <td className="py-2.5">
                      <div className="font-mono font-bold text-slate-900">{ast.assetId}</div>
                      <div className="text-[10px] text-slate-500">{ast.assetName}</div>
                    </td>
                    <td className="py-2.5 text-slate-600">
                      {ast.lastLocation}
                    </td>
                    <td className="py-2.5">
                      <span className={`text-[11px] font-medium ${
                        ast.condition === 'Operational' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {ast.condition}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <Badge
                        variant={
                          ast.recoveryStatus === 'Recovered' || ast.recoveryStatus === 'Station Retained'
                            ? 'success'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {ast.recoveryStatus}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-slate-600">
                      {ast.custodian}
                    </td>
                    <td className="py-2.5 text-right">
                      {ast.recoveryStatus === 'Recovery Pending' ? (
                        <button
                          onClick={() => updateAsset(ast.id, { recoveryStatus: 'Recovered', condition: 'Operational' })}
                          className="px-2 py-0.5 rounded bg-polar-blue text-white text-[11px] font-medium hover:bg-navy-DEFAULT transition-colors"
                        >
                          Record Recovery
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateAsset(ast.id, {
                              recoveryStatus: ast.recoveryStatus === 'Station Retained' ? 'Recovered' : 'Station Retained',
                            })
                          }
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
                        >
                          {ast.recoveryStatus === 'Station Retained' ? 'Mark Recovered' : 'Retain Station'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 4 & 5 — BACKLOAD MANIFEST & SCIENTIFIC MATERIAL                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* SECTION 4 — BACKLOAD MANIFEST (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-polar-border p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-sm text-navy-DEFAULT">
                  Backload Manifest
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  SIMULATED BACKLOAD MANIFEST
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Items scheduled for return from Bharati Station and Field Camp Alpha.
              </p>
            </div>

            <button
              onClick={() => setIsAddBackloadOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Backload Item</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 text-[11px] border-b border-slate-100">
                  <th className="py-2 font-medium">Manifest ID</th>
                  <th className="py-2 font-medium">Cargo</th>
                  <th className="py-2 font-medium">Category</th>
                  <th className="py-2 font-medium">Route</th>
                  <th className="py-2 font-medium">Handling</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {backload.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors text-slate-700">
                    <td className="py-2.5 font-mono font-bold text-slate-900">
                      {b.manifestId}
                    </td>
                    <td className="py-2.5 font-medium text-slate-900">
                      {b.cargo}
                    </td>
                    <td className="py-2.5 text-slate-600">
                      {b.category}
                    </td>
                    <td className="py-2.5 text-[11px] font-mono text-slate-500">
                      {b.origin} → {b.destination}
                    </td>
                    <td className="py-2.5">
                      <span className="text-[11px] text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                        {b.handling}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <Badge
                        variant={b.status === 'Packed' || b.status === 'Prepared' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {b.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right">
                      {b.status === 'Pending' || b.status === 'Pending Review' ? (
                        <button
                          onClick={() => updateBackload(b.id, { status: 'Prepared' })}
                          className="px-2 py-0.5 rounded bg-polar-blue text-white text-[11px] font-medium hover:bg-navy-DEFAULT transition-colors"
                        >
                          Verify &amp; Prepare
                        </button>
                      ) : b.status === 'Prepared' ? (
                        <button
                          onClick={() => updateBackload(b.id, { status: 'Packed' })}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium hover:bg-slate-200 transition-colors"
                        >
                          Mark Packed
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-medium">✓ Ready</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5 — SCIENTIFIC MATERIAL RETURN (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-polar-border p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-sm text-navy-DEFAULT">
                  Scientific Material Return
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Track samples and scientific material collected during the expedition.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono shrink-0">
              3 Sample Lots
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 text-[11px] border-b border-slate-100">
                  <th className="py-2 font-medium">Sample ID &amp; Material</th>
                  <th className="py-2 font-medium">Site</th>
                  <th className="py-2 font-medium">Storage</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {samples.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors text-slate-700">
                    <td className="py-2.5">
                      <div className="font-mono font-bold text-slate-900">{s.sampleId}</div>
                      <div className="text-[10px] text-slate-600">{s.material}</div>
                      <div className="text-[10px] text-slate-400">Lead: {s.researcher}</div>
                    </td>
                    <td className="py-2.5 text-slate-600">
                      {s.collectionSite}
                    </td>
                    <td className="py-2.5">
                      <span className="text-[11px] font-mono text-slate-700">
                        {s.storage}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <Badge
                        variant={s.status === 'Ready for Backload' || s.status === 'Verified' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {s.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right">
                      {s.status === 'Pending Validation' ? (
                        <button
                          onClick={() => updateSample(s.id, { status: 'Verified' })}
                          className="px-2 py-0.5 rounded bg-polar-blue text-white text-[11px] font-medium hover:bg-navy-DEFAULT transition-colors"
                        >
                          Validate
                        </button>
                      ) : (
                        <button
                          onClick={() => updateSample(s.id, { status: 'Ready for Backload' })}
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 6 & 7 — STATION HANDOVER CHECKLIST & CLOSEOUT REPORTING           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* SECTION 6 — STATION HANDOVER CHECKLIST (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-polar-border p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-sm text-navy-DEFAULT">
                  Station Handover Checklist
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Responsible: <strong>Expedition Logistics Officer (Priya Nair)</strong>
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono shrink-0">
              {handover.filter((h) => h.isCompleted).length}/{handover.length} Completed
            </span>
          </div>

          <div className="space-y-1.5 text-xs divide-y divide-slate-100">
            {handover.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleHandover(item.id)}
                className="pt-2 first:pt-0 flex items-start gap-2.5 cursor-pointer hover:bg-slate-50/60 p-1.5 rounded transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => toggleHandover(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-polar-blue focus:ring-polar-blue cursor-pointer shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium ${item.isCompleted ? 'text-slate-800 line-through opacity-80' : 'text-slate-900 font-semibold'}`}>
                    {item.title}
                  </div>
                  {item.completedBy && item.completedAt && (
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Verified by {item.completedBy} • {item.completedAt}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7 — CLOSEOUT REPORTING & INCIDENT CLOSURE (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-polar-border p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-sm text-navy-DEFAULT">
                  Closeout Documentation
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Expedition reports, sample handover certificates, and incident closure records.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono shrink-0">
              5 Formal Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 text-[11px] border-b border-slate-100">
                  <th className="py-2 font-medium">Document ID</th>
                  <th className="py-2 font-medium">Report Title</th>
                  <th className="py-2 font-medium">Owner</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors text-slate-700">
                    <td className="py-2.5 font-mono font-bold text-slate-900">
                      {doc.docCode}
                    </td>
                    <td className="py-2.5">
                      <div className="font-semibold text-slate-900">{doc.title}</div>
                      {doc.notes && <div className="text-[10px] text-slate-500">{doc.notes}</div>}
                    </td>
                    <td className="py-2.5 text-slate-600">
                      {doc.owner}
                    </td>
                    <td className="py-2.5">
                      <Badge
                        variant={
                          doc.status === 'Completed'
                            ? 'success'
                            : doc.status === 'Ready for Review'
                            ? 'primary'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right">
                      {doc.linkedIncidentId ? (
                        <Link
                          to="/emergency"
                          className="px-2 py-0.5 text-[11px] text-polar-blue font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          <span>ER-026 File</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : doc.status !== 'Completed' ? (
                        <button
                          onClick={() => updateDocument(doc.id, { status: 'Completed' })}
                          className="px-2 py-0.5 rounded bg-polar-blue text-white text-[11px] font-medium hover:bg-navy-DEFAULT transition-colors"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-medium">✓ Archived</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 8 & 9 — CLOSEOUT READINESS CHECKLIST & FORMAL CLOSURE ACTION      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-base text-navy-DEFAULT">
              Expedition Closeout Readiness
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mandatory operational criteria required before formal expedition archive.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
              {completedReqs} / {totalReqs} requirements complete
            </span>
          </div>
        </div>

        {/* 8 Mandatory Requirements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {readinessRequirements.map((req) => (
            <div
              key={req.id}
              className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-2 transition-all ${
                req.isComplete
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/60 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2">
                {req.isComplete ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                )}
                <span className="font-medium text-[11px] leading-tight">{req.title}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase shrink-0 ${
                req.isComplete ? 'text-emerald-700' : 'text-amber-800'
              }`}>
                {req.isComplete ? 'READY' : 'PENDING'}
              </span>
            </div>
          ))}
        </div>

        {/* Warning or Success Message & Final Action */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {missionStatus === 'Closed' ? (
              <div className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Expedition mission archive completed. All post-mission data frozen for NCPOR records.</span>
              </div>
            ) : isClosureReady ? (
              <div className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All 8 mandatory closeout requirements completed. Expedition is clear for executive closure.</span>
              </div>
            ) : (
              <div className="text-xs text-amber-900 font-medium flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Expedition closure is locked until all mandatory closeout requirements are completed.</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {missionStatus !== 'Closed' && (
              <button
                type="button"
                onClick={handleCloseExpedition}
                disabled={!isClosureReady}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-colors shadow-xs flex items-center gap-2 ${
                  isClosureReady
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-emerald-700/20'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Close Expedition</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODALS                                                                    */}
      {/* ========================================================================= */}
      
      <PersonnelDetailModal
        personnel={selectedPersonnel}
        isOpen={isPersonnelModalOpen}
        onClose={() => {
          setIsPersonnelModalOpen(false);
          setSelectedPersonnel(null);
        }}
      />

      <AddBackloadModal
        isOpen={isAddBackloadOpen}
        onClose={() => setIsAddBackloadOpen(false)}
      />

      <CreateCloseoutRecordModal
        isOpen={isCreateRecordOpen}
        onClose={() => setIsCreateRecordOpen(false)}
      />

    </div>
  );
};

export default ReturnCloseoutPage;
