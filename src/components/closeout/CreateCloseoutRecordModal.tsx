import React, { useState } from 'react';
import { X, FileCheck2 } from 'lucide-react';
import { useCloseout } from '../../context/CloseoutContext';

interface CreateCloseoutRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCloseoutRecordModal: React.FC<CreateCloseoutRecordModalProps> = ({ isOpen, onClose }) => {
  const { addDocument, documents } = useCloseout();

  const [docCode, setDocCode] = useState<string>(`EXP-2026-00${documents.length + 1}`);
  const [title, setTitle] = useState<string>('');
  const [owner, setOwner] = useState<string>('Priya Nair (Logistics Officer)');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addDocument({
      docCode,
      title: title.trim(),
      owner,
      status: 'Ready for Review',
      completedAt: '18 Sep 12:30',
      notes: notes.trim() || undefined,
    });

    setTitle('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-md w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-sky-300" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Create Closeout Record</h2>
              <p className="text-[11px] text-sky-200/80">
                Log formal closeout documentation or handover annex
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

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Document Code *
              </label>
              <input
                type="text"
                required
                value={docCode}
                onChange={(e) => setDocCode(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs font-mono focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
              </input>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Owner / Officer *
              </label>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Dr. Ananya Mehta (Expedition Lead)">Dr. Ananya Mehta (Expedition Lead)</option>
                <option value="Priya Nair (Logistics Officer)">Priya Nair (Logistics Officer)</option>
                <option value="Dr. Rohan Sharma (Research Lead)">Dr. Rohan Sharma (Research Lead)</option>
                <option value="Safety Officer">Safety Officer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Larsemann Hills Traverse Environmental Assessment"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Closeout Notes &amp; Observations
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Summary of closeout verification, data archive paths, or station retention justification..."
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              Demo Closeout Audit
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
                Save Record
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
