import React, { useState } from 'react';
import { X, ShieldAlert, AlertTriangle } from 'lucide-react';
import type { EmergencyIncident } from '../../types';
import { useEmergency } from '../../context/EmergencyContext';

interface EscalateModalProps {
  incident: EmergencyIncident;
  isOpen: boolean;
  onClose: () => void;
}

export const EscalateModal: React.FC<EscalateModalProps> = ({ incident, isOpen, onClose }) => {
  const { escalateIncident } = useEmergency();

  const [level, setLevel] = useState<'Station Response' | 'Expedition Command' | 'External Assistance'>('Expedition Command');
  const [reason, setReason] = useState<string>('');

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    escalateIncident(incident.id, level, reason.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-md w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-300" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Escalate Incident</h2>
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

        <form onSubmit={handleConfirm} className="p-4 space-y-3.5">
          
          <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <div className="font-semibold flex items-center gap-1 text-amber-800 mb-0.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Operational Escalation Protocol</span>
            </div>
            Escalating elevates this incident in command briefings and pre-authorizes specialized evacuation and logistics support.
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Escalation Level *
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            >
              <option value="Station Response">Station Response — Station Medical & Logistics Standby</option>
              <option value="Expedition Command">Expedition Command — Full Mission Operational Briefing</option>
              <option value="External Assistance">External Assistance — Polar SAR & MEDEVAC Relay</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Operational Justification / Reason *
            </label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="State why current field/station resources are insufficient or why elevated readiness is required..."
              className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              Fictional Demo Escalation
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
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Confirm Escalation
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
