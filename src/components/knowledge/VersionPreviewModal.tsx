import React from 'react';
import { X, History, Clock } from 'lucide-react';
import type { KnowledgeRecord, KnowledgeVersionItem } from '../../types';

interface VersionPreviewModalProps {
  record: KnowledgeRecord | null;
  versionItem: KnowledgeVersionItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VersionPreviewModal: React.FC<VersionPreviewModalProps> = ({
  record,
  versionItem,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !record || !versionItem) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-md w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-sky-300" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">
                Version Snapshot: {versionItem.version}
              </h2>
              <p className="text-[11px] text-sky-200/80">
                {record.id} — {record.title}
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

        {/* Content */}
        <div className="p-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Version</span>
              <span className="font-mono font-bold text-slate-800">{versionItem.version}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Recorded Date</span>
              <span className="text-slate-800">{versionItem.date}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Modified By</span>
              <span className="text-slate-800 font-medium">{versionItem.changedBy}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Snapshot Status</span>
              <span className="text-slate-800">{versionItem.status}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Change Log Note
            </label>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
              {versionItem.change}
            </div>
          </div>

          {versionItem.summarySnapshot && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Version Abstract Snapshot
              </label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-[11px] leading-relaxed italic">
                "{versionItem.summarySnapshot}"
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <Clock className="w-3.5 h-3.5" />
            <span>Immutable git-backed audit log trail</span>
          </div>

          {/* Footer */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
