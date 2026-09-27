import React, { useState } from 'react';
import { X, Drill, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { useFieldOperations } from '../../context/FieldOperationsContext';

interface TaskUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaskUpdateModal: React.FC<TaskUpdateModalProps> = ({ isOpen, onClose }) => {
  const { activeTask, updateTaskProgress, isConnected } = useFieldOperations();

  const [newProgress, setNewProgress] = useState<number>(activeTask.progressPercent);
  const [notes, setNotes] = useState<string>(
    'Borehole ice temperature steady at -28°C. Solid firn core extracted with no fracture signs.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTaskProgress(newProgress, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-polar-border max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center">
              <Drill className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                Update Task Progress
              </h3>
              <p className="text-[11px] text-sky-200/80">
                {activeTask.name} • {activeTask.location}
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

        {/* Connectivity status banner */}
        <div className={`px-4 py-2 text-xs font-medium flex items-center justify-between border-b ${
          isConnected 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-amber-50 text-amber-900 border-amber-200'
        }`}>
          <div className="flex items-center gap-1.5">
            {isConnected ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span>Status: <strong>SYNCED</strong> (Live transmission)</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                <span>Status: <strong>PENDING SYNC</strong> (Stored locally in Outbox)</span>
              </>
            )}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          
          {/* Current vs New Progress */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Current Progress</div>
              <div className="font-mono font-bold text-slate-800 text-lg mt-0.5">
                {activeTask.progressPercent}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Start: {activeTask.startTime}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-50/60 border border-sky-200">
              <label className="text-[10px] uppercase font-bold text-sky-900 block">New Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newProgress}
                onChange={(e) => setNewProgress(Math.max(0, Math.min(100, Number(e.target.value))))}
                className="w-full mt-0.5 text-center font-mono font-bold text-base bg-white border border-sky-300 rounded-lg py-0.5 focus:outline-hidden focus:ring-2 focus:ring-polar-blue"
              />
              <div className="text-[10px] text-sky-700 mt-0.5 text-center">
                Target Est: {activeTask.expectedCompletion}
              </div>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={newProgress}
              onChange={(e) => setNewProgress(Number(e.target.value))}
              className="w-full accent-polar-blue cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-polar-blue h-full transition-all"
                style={{ width: `${newProgress}%` }}
              />
            </div>
          </div>

          {/* Operational Notes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter field observations, depth reached, core condition..."
              className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-polar-blue"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-polar-blue hover:bg-navy-DEFAULT rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Save Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
