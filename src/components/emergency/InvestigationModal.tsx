import React, { useState } from 'react';
import { X, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import type { EmergencyIncident } from '../../types';
import { useEmergency } from '../../context/EmergencyContext';

interface InvestigationModalProps {
  incident: EmergencyIncident;
  isOpen: boolean;
  onClose: () => void;
}

export const InvestigationModal: React.FC<InvestigationModalProps> = ({ incident, isOpen, onClose }) => {
  const { submitInvestigationAndClose } = useEmergency();

  const [path, setPath] = useState<'completed' | 'not_required'>('completed');
  const [summary, setSummary] = useState<string>(
    'Field member sustained a superficial abrasion/cold contact injury during core drill alignment. First-aid applied within 4 minutes. No fracture or severe frostbite diagnosed.'
  );
  const [rootCause, setRootCause] = useState<string>(
    'Sub-optimal glove dexterity during manual auger collar clamp positioning at -24°C wind chill.'
  );
  const [correctiveAction, setCorrectiveAction] = useState<string>(
    'Pre-heating station protocol mandated for auger clamp assemblies prior to deep traverse departures.'
  );
  const [justificationReason, setJustificationReason] = useState<string>('');
  const [closedBy, setClosedBy] = useState<string>('Command Center Safety Officer');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (path === 'completed') {
      if (!summary.trim() || !rootCause.trim() || !correctiveAction.trim()) return;
      submitInvestigationAndClose(incident.id, {
        required: true,
        investigationCompleted: true,
        summary: summary.trim(),
        rootCause: rootCause.trim(),
        correctiveAction: correctiveAction.trim(),
        closedBy: closedBy.trim() || 'Command Center',
      });
    } else {
      if (!justificationReason.trim()) return;
      submitInvestigationAndClose(incident.id, {
        required: false,
        investigationCompleted: false,
        justificationReason: justificationReason.trim(),
        closedBy: closedBy.trim() || 'Command Center',
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-xl w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Investigation &amp; Incident Closure</h2>
              <p className="text-[11px] text-sky-200/80">
                {incident.code} • {incident.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workflow Info */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-slate-600 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5 text-polar-blue shrink-0" />
          <span>
            Prototype rule: An incident cannot be closed without completing a safety investigation or recording a formal justification.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          
          {/* Path Selector Tabs */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
              Investigation Closure Protocol *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPath('completed')}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  path === 'completed'
                    ? 'bg-blue-50/80 border-polar-blue text-navy-DEFAULT font-semibold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <FileText className="w-3.5 h-3.5 text-polar-blue" />
                  <span className="text-xs">Investigation completed</span>
                </div>
                <p className="text-[10px] text-slate-500 font-normal">
                  Record full debrief, root causes and corrective measures
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPath('not_required')}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  path === 'not_required'
                    ? 'bg-blue-50/80 border-polar-blue text-navy-DEFAULT font-semibold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs">Investigation not required</span>
                </div>
                <p className="text-[10px] text-slate-500 font-normal">
                  Minor or routine operational event with direct justification
                </p>
              </button>
            </div>
          </div>

          {/* Form Fields: Investigation Completed */}
          {path === 'completed' ? (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Investigation Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summary of incident circumstances, sequence, and immediate medical/operational outcome..."
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Root Cause / Contributing Factor *
                </label>
                <textarea
                  rows={2}
                  required
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                  placeholder="Identify environmental, mechanical, procedural, or thermal contributing factors..."
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Corrective Action *
                </label>
                <textarea
                  rows={2}
                  required
                  value={correctiveAction}
                  onChange={(e) => setCorrectiveAction(e.target.value)}
                  placeholder="Preventative or procedural changes applied for subsequent field sorties..."
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
                />
              </div>
            </div>
          ) : (
            /* Form Fields: Investigation Not Required */
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Exemption Justification / Reason *
                </label>
                <textarea
                  rows={3}
                  required
                  value={justificationReason}
                  onChange={(e) => setJustificationReason(e.target.value)}
                  placeholder="Explain why formal safety review is exempt (e.g., transient telemetry drop, minor equipment reset with zero personnel impact)..."
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Sign-off Officer */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Sign-Off Authority / Closed By
            </label>
            <input
              type="text"
              value={closedBy}
              onChange={(e) => setClosedBy(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden font-medium"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              Fictional prototype workflow
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Close Incident</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
