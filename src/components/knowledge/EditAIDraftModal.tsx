import React, { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { useKnowledge } from '../../context/KnowledgeContext';
import type { KnowledgeRecord } from '../../types';

interface EditAIDraftModalProps {
  record: KnowledgeRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditAIDraftModal: React.FC<EditAIDraftModalProps> = ({
  record,
  isOpen,
  onClose,
}) => {
  const { updateAIDraft } = useKnowledge();

  const [summary, setSummary] = useState(record?.aiSummary || '');
  const [keywordsStr, setKeywordsStr] = useState(record?.aiKeywords.join(', ') || '');

  // Keep in sync when record opens
  React.useEffect(() => {
    if (record) {
      setSummary(record.aiSummary || '');
      setKeywordsStr(record.aiKeywords.join(', ') || '');
    }
  }, [record]);

  if (!isOpen || !record) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const keywords = keywordsStr
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    updateAIDraft(record.id, summary.trim(), keywords);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-lg w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Review &amp; Edit AI Draft</h2>
              <p className="text-[11px] text-sky-200/80">
                Refine automated synthesis for {record.id}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          
          <div className="p-2.5 bg-amber-50 border border-amber-200/70 rounded-lg text-amber-900 text-[11px] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Simulated AI Assistance:</span> AI draft summaries assist with taxonomy, keywords, and metadata formulation. AI never automatically approves or publishes records.
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Generated Abstract / Summary *
            </label>
            <textarea
              rows={4}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Keywords (comma separated)
            </label>
            <input
              type="text"
              value={keywordsStr}
              onChange={(e) => setKeywordsStr(e.target.value)}
              placeholder="e.g. Glaciology, Ice Core, Antarctica, Bharati"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Model Confidence: <strong className="text-slate-700 font-mono">Simulated</strong></span>
            <span>Traceability: <strong className="text-slate-700 font-mono">{record.sourceRecord}</strong></span>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              HUMAN REVIEW REQUIRED
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
                className="px-4 py-1.5 rounded-lg bg-polar-blue hover:bg-navy-DEFAULT text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Save Draft Changes
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
