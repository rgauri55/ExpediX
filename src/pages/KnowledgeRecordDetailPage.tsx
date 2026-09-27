import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Lock,
  Eye,
  Sparkles,
  ExternalLink,
  History,
  FileCheck2,
  Users,
  Edit3,
  Globe,
  Check,
  X,
  AlertCircle,
  Layers,
} from 'lucide-react';
import { useKnowledge } from '../context/KnowledgeContext';
import { Badge } from '../components/common/Badge';
import { EditAIDraftModal } from '../components/knowledge/EditAIDraftModal';
import { ChangeClassificationModal } from '../components/knowledge/ChangeClassificationModal';
import { VersionPreviewModal } from '../components/knowledge/VersionPreviewModal';
import type {
  KnowledgeClassification,
  KnowledgeVersionItem,
} from '../types';

export const KnowledgeRecordDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getRecordById,
    completeAllValidation,
    completeValidationCheck,
    toggleReviewChecklistItem,
    approveRecord,
    rejectRecord,
    requestChanges,
    publishRecordToPortal,
  } = useKnowledge();

  const record = id ? getRecordById(id) : undefined;

  // Modals state
  const [isEditAIDraftOpen, setIsEditAIDraftOpen] = useState(false);
  const [isClassificationModalOpen, setIsClassificationModalOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<KnowledgeVersionItem | null>(null);
  const [publishFeedback, setPublishFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!record) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="font-heading font-bold text-lg text-slate-800">
          Record Not Found
        </h2>
        <p className="text-xs text-slate-500">
          The requested knowledge record <span className="font-mono font-bold">"{id}"</span> does not exist in the institutional repository.
        </p>
        <button
          onClick={() => navigate('/knowledge-hub')}
          className="px-4 py-2 bg-polar-blue text-white text-xs font-semibold rounded-lg hover:bg-navy-DEFAULT transition-colors"
        >
          Back to Knowledge Hub
        </button>
      </div>
    );
  }

  // Publication eligibility calculations
  const isApproved = record.status === 'Approved' || record.status === 'Published';
  const isPublic = record.classification === 'Public';
  const isMetadataComplete = record.validationStatus === 'Valid';
  const isEligibleForPortal = isPublic && isApproved && isMetadataComplete;

  const handlePublish = () => {
    setPublishFeedback(null);
    const res = publishRecordToPortal(record.id, 'Dr. Ananya Mehta (Expedition Lead)');
    if (res.success) {
      setPublishFeedback({
        type: 'success',
        message: `Record ${record.id} successfully published to ExpediX Public Research Portal!`,
      });
    } else {
      setPublishFeedback({
        type: 'error',
        message: res.message || 'Publication failed.',
      });
    }
  };

  const getClassificationDescription = (classification: KnowledgeClassification) => {
    switch (classification) {
      case 'Public':
        return 'Accessible for open scientific release and publication to the external ExpediX Public Portal upon human approval.';
      case 'Controlled':
        return 'Accessible to authorized expedition and research personnel. Not currently approved for public release.';
      case 'Restricted':
        return 'High-security or sensitive operational/sample data. Locked from external public release.';
    }
  };

  return (
    <div className="p-5 max-w-7xl mx-auto space-y-4">
      
      {/* ==========================================
          HEADER & BREADCRUMB
          ========================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-polar-border">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <Link to="/knowledge-hub" className="hover:text-polar-blue flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3 h-3" />
              <span>Knowledge Hub</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-mono font-semibold">{record.id}</span>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-heading font-bold text-xl text-slate-900 tracking-tight">
              {record.title}
            </h1>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
              {record.id}
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono bg-sky-50 text-polar-blue font-semibold border border-sky-200">
              {record.version}
            </span>
          </div>
        </div>

        {/* Top-Right Status Pills */}
        <div className="flex items-center gap-2">
          {record.classification === 'Public' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              PUBLIC
            </span>
          )}
          {record.classification === 'Controlled' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-50 text-polar-blue border border-sky-200">
              <Shield className="w-3.5 h-3.5 text-polar-blue" />
              CONTROLLED
            </span>
          )}
          {record.classification === 'Restricted' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              <Lock className="w-3.5 h-3.5 text-rose-600" />
              RESTRICTED
            </span>
          )}

          {record.status === 'Published' && <Badge variant="success">Published</Badge>}
          {record.status === 'Approved' && <Badge variant="default">Approved</Badge>}
          {record.status === 'Under Review' && <Badge variant="warning">Under Review</Badge>}
          {record.status === 'Validation' && <Badge variant="warning">Validation</Badge>}
          {record.status === 'Draft' && <Badge variant="neutral">Draft</Badge>}
        </div>
      </div>

      {/* Feedback Alert if present */}
      {publishFeedback && (
        <div
          className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
            publishFeedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {publishFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{publishFeedback.message}</span>
          </div>
          <button
            onClick={() => setPublishFeedback(null)}
            className="text-slate-400 hover:text-slate-600 font-bold px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* ==========================================
          SECTION 5 — RECORD METADATA PANEL
          ========================================== */}
      <div className="bg-white border border-polar-border rounded-lg p-4 shadow-2xs">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2.5">
          Record Metadata &amp; Archival Information
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Record Type</span>
            <span className="font-semibold text-slate-800">{record.type}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Expedition</span>
            <span className="font-mono font-semibold text-slate-800">{record.expeditionId}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Location</span>
            <span className="font-medium text-slate-800">{record.location}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Research Area</span>
            <span className="font-semibold text-slate-800">{record.researchArea}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Lead Researcher</span>
            <span className="font-medium text-slate-800">{record.owner}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Created / Updated</span>
            <span className="font-mono text-[11px] text-slate-600">{record.createdAt} · {record.updatedAt}</span>
          </div>

        </div>
      </div>

      {/* ==========================================
          MAIN 2-COLUMN WORKSPACE
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: Validation, Human Review, AI Draft (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* ==========================================
              SECTION 6 — VALIDATION PANEL
              ========================================== */}
          <div className="bg-white border border-polar-border rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-xs text-slate-800">
                  Data Quality &amp; Validation Protocol
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                SIMULATED VALIDATION ENGINE
              </span>
            </div>

            {/* Validation Info Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Source</span>
                <span className="font-semibold text-slate-800">{record.source}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Source Record</span>
                <span className="font-mono font-bold text-polar-blue">{record.sourceRecord}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Method</span>
                <span className="text-slate-700 text-[11px] truncate block">{record.collectionMethod}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Data Completeness</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        record.dataCompleteness === 100 ? 'bg-emerald-500' : 'bg-polar-blue'
                      }`}
                      style={{ width: `${record.dataCompleteness}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-[11px] text-slate-800">
                    {record.dataCompleteness}%
                  </span>
                </div>
              </div>
            </div>

            {/* Validation Checks Checklist */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-semibold text-slate-700 mb-1">
                Automated Verification Criteria:
              </div>
              {record.validationChecks.map((check) => (
                <div
                  key={check.id}
                  className="flex items-center justify-between p-2 rounded border border-slate-100 hover:bg-slate-50 text-xs transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {check.status === 'passed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <div>
                      <span className={`font-medium ${check.status === 'passed' ? 'text-slate-800' : 'text-amber-900 font-semibold'}`}>
                        {check.label}
                      </span>
                      {check.detail && (
                        <p className="text-[10px] text-slate-400">{check.detail}</p>
                      )}
                    </div>
                  </div>

                  {check.status !== 'passed' && (
                    <button
                      onClick={() => completeValidationCheck(record.id, check.id)}
                      className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-semibold transition-colors"
                    >
                      Resolve Check
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Validation Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500">Validation Status:</span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                    record.validationStatus === 'Valid'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {record.validationStatus}
                </span>
              </div>

              {record.validationStatus !== 'Valid' && (
                <button
                  onClick={() => completeAllValidation(record.id)}
                  className="px-3 py-1.5 rounded-lg bg-polar-blue hover:bg-navy-DEFAULT text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  Complete Validation
                </button>
              )}
            </div>
          </div>

          {/* ==========================================
              SECTION 8 — HUMAN REVIEW PANEL
              ========================================== */}
          <div className="bg-white border border-polar-border rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-xs text-slate-800">
                  Human Peer Review &amp; Approval
                </h3>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <span>Designated Reviewer:</span>
                <strong className="text-slate-800 font-medium">{record.reviewer}</strong>
              </div>
            </div>

            {/* Review Status Banner */}
            <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Review Stage</span>
                <span className="font-semibold text-slate-800">{record.reviewStatus}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Checklist Progress</span>
                <span className="font-mono font-bold text-slate-800">
                  {record.reviewChecklist.filter((c) => c.checked).length} / {record.reviewChecklist.length} Verified
                </span>
              </div>
            </div>

            {/* Interactive Human Checklist */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-700 block">
                Scientific Peer Review Checklist:
              </span>
              {record.reviewChecklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 p-2 rounded border border-slate-100 hover:bg-slate-50 cursor-pointer text-xs transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleReviewChecklistItem(record.id, item.id)}
                    className="rounded border-slate-300 text-polar-blue focus:ring-polar-blue"
                  />
                  <span className={item.checked ? 'text-slate-800 font-medium' : 'text-slate-500'}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Human Review Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => requestChanges(record.id, 'Please verify coordinate datum tags')}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
              >
                Request Changes
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => rejectRecord(record.id, 'Discrepancy in core sampling temperature log')}
                  className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors"
                >
                  Reject Record
                </button>
                <button
                  onClick={() => approveRecord(record.id, 'Dr. Ananya Mehta (Expedition Lead)')}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Record</span>
                </button>
              </div>
            </div>
          </div>

          {/* ==========================================
              SECTION 9 — AI-ASSISTED DRAFT PANEL
              ========================================== */}
          <div className="bg-white border border-polar-border rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-heading font-bold text-xs text-slate-800">
                  AI-Assisted Synthesis &amp; Taxonomy
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                SIMULATED AI DRAFT
              </span>
            </div>

            <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-lg text-xs space-y-2">
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-900 mb-1">
                  Generated Abstract / Summary — Simulated:
                </div>
                <p className="text-slate-800 italic leading-relaxed">
                  "{record.aiSummary}"
                </p>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-amber-900 mb-1">
                  Generated Keywords:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {record.aiKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white border border-amber-200 text-slate-700 text-[11px] font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200/50 flex items-center justify-between text-[11px] text-amber-900">
                <span>Model Confidence: <strong>{record.aiConfidence}</strong></span>
                <span className="font-semibold text-amber-800">
                  AI-generated draft — requires human review.
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                AI assists with categorization only. AI never publishes.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditAIDraftOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Review / Edit Draft</span>
                </button>
              </div>
            </div>
          </div>

          {/* ==========================================
              SECTION 11 — VERSION HISTORY
              ========================================== */}
          <div className="bg-white border border-polar-border rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-xs text-slate-800">
                  Version History &amp; Audit Trail
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {record.versionHistory.length} revisions logged
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 font-medium uppercase">
                    <th className="py-2 px-3">Version</th>
                    <th className="py-2 px-3">Changed By</th>
                    <th className="py-2 px-3">Change Description</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {record.versionHistory.map((v, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">{v.version}</td>
                      <td className="py-2 px-3 text-slate-700 font-medium">{v.changedBy}</td>
                      <td className="py-2 px-3 text-slate-600 max-w-xs truncate">{v.change}</td>
                      <td className="py-2 px-3 text-slate-500 font-mono text-[11px]">{v.date}</td>
                      <td className="py-2 px-3 text-slate-600 font-medium">{v.status}</td>
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => setSelectedVersion(v)}
                          className="text-[11px] text-polar-blue hover:underline font-semibold"
                        >
                          View Snapshot
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Classification, Publication Control, Related Records, Connections (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* ==========================================
              SECTION 7 — CLASSIFICATION PANEL
              ========================================== */}
          <div className="bg-white border border-polar-border rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-xs text-slate-800">
                  Data Classification
                </h3>
              </div>
              <button
                onClick={() => setIsClassificationModalOpen(true)}
                className="text-[11px] text-polar-blue hover:underline font-semibold"
              >
                Change Tier
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Current Tier:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    record.classification === 'Public'
                      ? 'bg-emerald-100 text-emerald-800'
                      : record.classification === 'Controlled'
                      ? 'bg-sky-100 text-polar-blue'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {record.classification.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {getClassificationDescription(record.classification)}
              </p>
            </div>

            <div className="p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-lg text-[11px] text-amber-900">
              <strong>Governance Rule:</strong> Classification determines access and publication eligibility. Changing classification does not automatically publish the record.
            </div>

            <button
              onClick={() => setIsClassificationModalOpen(true)}
              className="w-full py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              Change Classification
            </button>
          </div>

          {/* ==========================================
              SECTION 10 — PUBLICATION CONTROL & ACCESS
              ========================================== */}
          <div className="bg-white border border-polar-border rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-polar-blue" />
                <h3 className="font-heading font-bold text-xs text-slate-800">
                  Publication &amp; Access
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                PUBLIC PORTAL FEED
              </span>
            </div>

            {/* Lifecycle Tracker */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Publication Lifecycle:
              </span>
              <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center">
                <div className="p-1 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  Not Eligible
                </div>
                <div
                  className={`p-1 rounded font-semibold border ${
                    isMetadataComplete && isPublic
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  Eligible
                </div>
                <div
                  className={`p-1 rounded font-semibold border ${
                    isApproved
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  Approved
                </div>
                <div
                  className={`p-1 rounded font-semibold border ${
                    record.status === 'Published'
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  Published
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[11px] font-semibold text-slate-700 block">
                Publication Gate Checks:
              </span>
              
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 text-[11px]">
                <span className="text-slate-600">1. Classification is Public</span>
                {isPublic ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Met
                  </span>
                ) : (
                  <span className="text-rose-600 font-semibold flex items-center gap-1">
                    <X className="w-3 h-3" /> {record.classification}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 text-[11px]">
                <span className="text-slate-600">2. Human Peer Approval</span>
                {isApproved ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Met
                  </span>
                ) : (
                  <span className="text-amber-600 font-semibold flex items-center gap-1">
                    <X className="w-3 h-3" /> {record.reviewStatus}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 text-[11px]">
                <span className="text-slate-600">3. Metadata &amp; QC Complete</span>
                {isMetadataComplete ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Met
                  </span>
                ) : (
                  <span className="text-amber-600 font-semibold flex items-center gap-1">
                    <X className="w-3 h-3" /> Pending
                  </span>
                )}
              </div>
            </div>

            {/* Publication Status & Action Button */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              {record.status === 'Published' ? (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Live on Public Portal</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Published: {record.publishedAt || '18 Sep 2026 14:30 UTC'} by {record.publishedBy || record.owner}
                  </p>
                </div>
              ) : isEligibleForPortal ? (
                <div className="space-y-2">
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Eligible for Public Portal</span>
                  </div>
                  <button
                    onClick={handlePublish}
                    className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Publish to Public Portal</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700 block mb-0.5">
                      Publication Unavailable:
                    </span>
                    {record.classification === 'Controlled' && (
                      <span>Record classification is Controlled. Change classification to Public to enable.</span>
                    )}
                    {record.classification === 'Restricted' && (
                      <span>Record contains restricted information and cannot be published publicly.</span>
                    )}
                    {record.classification === 'Public' && !isApproved && (
                      <span>Record requires Human Review approval prior to publication.</span>
                    )}
                  </div>
                  <button
                    disabled
                    className="w-full py-2 rounded-lg bg-slate-100 text-slate-400 font-semibold text-xs cursor-not-allowed border border-slate-200"
                  >
                    Publishing Gated
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ==========================================
              SECTION 12 — RELATED RECORDS
              ========================================== */}
          <div className="bg-white border border-polar-border rounded-lg p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <h3 className="font-heading font-bold text-xs text-slate-800">
                Connected Records
              </h3>
              <span className="text-[10px] font-mono text-slate-400">ExpediX Graph</span>
            </div>

            <div className="space-y-1.5">
              {record.relatedRecords.map((rel) => (
                <Link
                  key={rel.id}
                  to={rel.link || '#'}
                  className="flex items-center justify-between p-2 rounded border border-slate-100 hover:bg-sky-50/50 hover:border-sky-200 transition-colors text-xs group"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-800 group-hover:text-polar-blue">
                      {rel.id}
                    </span>
                    <span className="text-slate-600 text-[11px] truncate max-w-[150px]">
                      {rel.title}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-polar-blue" />
                </Link>
              ))}
            </div>
          </div>

          {/* ==========================================
              SECTION 13 — KNOWLEDGE CONNECTIONS
              ========================================== */}
          <div className="bg-white border border-polar-border rounded-lg p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-polar-blue" />
                <h3 className="font-heading font-bold text-xs text-slate-800">
                  Knowledge Lineage
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Institutional Trace</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-polar-blue"></span>
                <span className="font-semibold">Expedition</span> ({record.expeditionId})
              </div>
              <div className="pl-3.5 text-slate-400 text-[10px]">↓</div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span className="font-semibold">Field Activity</span> ({record.sourceRecord})
              </div>
              <div className="pl-3.5 text-slate-400 text-[10px]">↓</div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="font-semibold">Asset / Instrument</span> (AST-042 Drill)
              </div>
              <div className="pl-3.5 text-slate-400 text-[10px]">↓</div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="font-semibold">Scientific Sample</span> (SMP-026 Core)
              </div>
              <div className="pl-3.5 text-slate-400 text-[10px]">↓</div>
              <div className="flex items-center gap-2 text-slate-700 font-bold text-polar-blue">
                <span className="w-2 h-2 rounded-full bg-polar-blue ring-2 ring-polar-blue/20"></span>
                <span>Knowledge Record</span> ({record.id})
              </div>
              <div className="pl-3.5 text-slate-400 text-[10px]">↓</div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Publication</span> ({record.status === 'Published' ? 'Live on Portal' : 'Gated'})
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-tight">
              ExpediX core principle: operational field telemetry transforms directly into auditable, reusable scientific knowledge.
            </p>
          </div>

        </div>

      </div>

      {/* Modals */}
      <EditAIDraftModal
        record={record}
        isOpen={isEditAIDraftOpen}
        onClose={() => setIsEditAIDraftOpen(false)}
      />

      <ChangeClassificationModal
        record={record}
        isOpen={isClassificationModalOpen}
        onClose={() => setIsClassificationModalOpen(false)}
      />

      <VersionPreviewModal
        record={record}
        versionItem={selectedVersion}
        isOpen={Boolean(selectedVersion)}
        onClose={() => setSelectedVersion(null)}
      />

    </div>
  );
};
