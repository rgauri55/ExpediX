import React, { useState } from 'react';
import { X, Shield, Lock, Eye, AlertTriangle } from 'lucide-react';
import { useKnowledge } from '../../context/KnowledgeContext';
import type { KnowledgeRecord, KnowledgeClassification } from '../../types';

interface ChangeClassificationModalProps {
  record: KnowledgeRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeClassificationModal: React.FC<ChangeClassificationModalProps> = ({
  record,
  isOpen,
  onClose,
}) => {
  const { updateClassification } = useKnowledge();

  const [classification, setClassification] = useState<KnowledgeClassification>(
    record?.classification || 'Controlled'
  );

  React.useEffect(() => {
    if (record) {
      setClassification(record.classification);
    }
  }, [record]);

  if (!isOpen || !record) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClassification(record.id, classification);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-md w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-300" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Change Data Classification</h2>
              <p className="text-[11px] text-sky-200/80">
                Security &amp; distribution governance for {record.id}
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
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          
          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-slate-700">
              Select Classification Tier:
            </label>

            {/* Public Option */}
            <label
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                classification === 'Public'
                  ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="classification"
                value="Public"
                checked={classification === 'Public'}
                onChange={() => setClassification('Public')}
                className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PUBLIC</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Eligible for open scientific dissemination &amp; future Public Portal inclusion once approved by human reviewer.
                </p>
              </div>
            </label>

            {/* Controlled Option */}
            <label
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                classification === 'Controlled'
                  ? 'border-polar-blue bg-sky-50/60 ring-1 ring-polar-blue'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="classification"
                value="Controlled"
                checked={classification === 'Controlled'}
                onChange={() => setClassification('Controlled')}
                className="mt-0.5 text-polar-blue focus:ring-polar-blue"
              />
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Shield className="w-3.5 h-3.5 text-polar-blue" />
                  <span>CONTROLLED</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Accessible to authorized expedition and research personnel. Not currently approved for public release.
                </p>
              </div>
            </label>

            {/* Restricted Option */}
            <label
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                classification === 'Restricted'
                  ? 'border-rose-500 bg-rose-50/60 ring-1 ring-rose-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="classification"
                value="Restricted"
                checked={classification === 'Restricted'}
                onChange={() => setClassification('Restricted')}
                className="mt-0.5 text-rose-600 focus:ring-rose-500"
              />
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Lock className="w-3.5 h-3.5 text-rose-600" />
                  <span>RESTRICTED</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  High-security or sensitive operational/sample data. Locked from public sharing and general research export.
                </p>
              </div>
            </label>
          </div>

          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Governance Rule:</span> Classification determines access and publication eligibility. Changing classification does NOT automatically publish the record.
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              AUDIT LOGGED
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
                Save Classification
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
