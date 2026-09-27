import React, { useState } from 'react';
import { X, AlertTriangle, User, FileText } from 'lucide-react';
import type { InventoryItem } from '../../types';
import { useInventory } from '../../context/InventoryContext';

interface ReportDamagedModalProps {
  item: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportDamagedModal: React.FC<ReportDamagedModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const { reportDamagedItem } = useInventory();
  const [reason, setReason] = useState('Extreme cold seal rupture or sub-zero physical impact');
  const [actor, setActor] = useState('Field Safety Officer Arjun Singh');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    reportDamagedItem({
      itemId: item.id,
      reason: reason.trim(),
      actor,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-polar-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-polar-border flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-rose-950">Report Damaged Item</h2>
              <p className="text-[11px] text-slate-500">{item.code} • {item.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 leading-relaxed">
            <p className="font-semibold">Attention:</p>
            <p className="text-[11px] mt-0.5">
              Reporting this item damaged will automatically update its status to <strong>Damaged</strong> and route it to <strong>Backload Storage</strong> for mainland return.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-rose-600" />
              Damage Incident Details &amp; Reason *
            </label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe damage cause (e.g. frost cracking, blizzard vibration, seal failure)..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Reporting Officer
            </label>
            <input
              type="text"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Log Damage &amp; Move to Backload</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
