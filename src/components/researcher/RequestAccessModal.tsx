import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Lock, Building, FileText, Send } from 'lucide-react';
import type { ResearcherDataset } from '../../types';
import { useResearcher } from '../../context/ResearcherContext';

interface RequestAccessModalProps {
  dataset: ResearcherDataset | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({
  dataset,
  isOpen,
  onClose,
}) => {
  const { submitAccessRequest } = useResearcher();
  const [institution, setInstitution] = useState('National Polar Research Institute');
  const [researchPurpose, setResearchPurpose] = useState('');
  const [expectedUse, setExpectedUse] = useState('Scientific research & peer-reviewed publication');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !dataset) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchPurpose.trim()) {
      setError('Please provide a research purpose.');
      return;
    }
    if (!agreementChecked) {
      setError('You must accept the Scientific Data Handling Agreement.');
      return;
    }

    submitAccessRequest(dataset.id, institution, researchPurpose, expectedUse);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">Request Controlled Data Access</h3>
              <p className="text-[11px] text-slate-400 font-mono">{dataset.id} • {dataset.access} Access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Authorization Request Submitted</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your request for <strong className="text-slate-800">{dataset.id}</strong> has been logged. Station Science Command will review within 24-48 hours.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium">
              Status: Pending Review
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-950">Controlled Scientific Asset</p>
                <p className="text-amber-800 text-[11px] mt-0.5">
                  This record contains sensitive raw polar measurements. Access requires verified institutional affiliation.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dataset
              </label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 flex items-center justify-between">
                <span>{dataset.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">v{dataset.version}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                Affiliated Institution / Department
              </label>
              <input
                type="text"
                value={institution}
                onChange={e => setInstitution(e.target.value)}
                required
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                Research Purpose &amp; Methodology
              </label>
              <textarea
                value={researchPurpose}
                onChange={e => setResearchPurpose(e.target.value)}
                placeholder="Describe why your study requires this raw dataset and your analytical methodology..."
                rows={3}
                required
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expected Publication / Dissemination
              </label>
              <input
                type="text"
                value={expectedUse}
                onChange={e => setExpectedUse(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreementChecked}
                  onChange={e => setAgreementChecked(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-polar-blue focus:ring-polar-blue"
                />
                <span className="text-[11px] text-slate-600 leading-tight">
                  I agree to abide by the <strong>Antarctic Treaty System Data Protocol</strong> and will properly cite the originating Expedition and Principal Investigators in all publications.
                </span>
              </label>
            </div>

            {error && (
              <div className="text-xs text-red-600 font-medium">
                {error}
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Authorization Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
