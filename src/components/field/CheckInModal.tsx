import React, { useState } from 'react';
import { X, CheckCircle, Radio, Wifi, WifiOff } from 'lucide-react';
import { useFieldOperations } from '../../context/FieldOperationsContext';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({ isOpen, onClose }) => {
  const { checkIn, isConnected, teamMembers, campInfo } = useFieldOperations();

  const [actor, setActor] = useState<string>('Dr. Rohan Sharma');
  const [notes, setNotes] = useState<string>(
    'Field Camp Alpha personnel (2/2) active & accounted for. Generator running nominal. Weather stable.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkIn(notes, actor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-polar-border max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">
                Field Camp Radio Check-In
              </h3>
              <p className="text-xs text-sky-200/80">
                {campInfo.name} • {campInfo.coordinates}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Connectivity status banner */}
        <div className={`px-5 py-2 text-xs font-medium flex items-center justify-between border-b ${
          isConnected 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-amber-50 text-amber-900 border-amber-200'
        }`}>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span>Connected • Station Watch Officer will acknowledge</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                <span>Offline Mode • Stored in local Outbox</span>
              </>
            )}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Operator Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Reporting Officer</label>
            <select
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-polar-blue font-medium"
            >
              {teamMembers.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} ({m.role})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Team Status readout */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
            <div className="font-semibold text-slate-800 flex items-center justify-between">
              <span>Accountability Readout</span>
              <span className="text-emerald-600 font-mono font-bold">2/2 Present</span>
            </div>
            <div className="text-[11px] text-slate-500">
              VHF Channel: <strong>{campInfo.vhfChannel}</strong>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Check-In Notes &amp; Status</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Confirm safety status, generator levels, thermal comfort..."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-polar-blue"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Transmit Check-In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
