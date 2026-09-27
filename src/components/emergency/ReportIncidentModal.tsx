import React, { useState } from 'react';
import { X, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import type { EmergencyCategory, EmergencySeverity } from '../../types';
import { useEmergency } from '../../context/EmergencyContext';
import { useFieldOperations } from '../../context/FieldOperationsContext';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({ isOpen, onClose }) => {
  const { reportNewIncident } = useEmergency();
  const { isConnected } = useFieldOperations();

  const [category, setCategory] = useState<EmergencyCategory>('Medical');
  const [severity, setSeverity] = useState<EmergencySeverity>('Moderate');
  const [location, setLocation] = useState<string>('Survey Zone B');
  const [affectedPersonnel, setAffectedPersonnel] = useState<string>('Dr. Rohan Sharma');
  const [description, setDescription] = useState<string>('');
  const [actionTaken, setActionTaken] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    reportNewIncident({
      category,
      severity,
      location,
      affectedPersonnel,
      description: description.trim(),
      actionTaken: actionTaken.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-lg w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Report New Incident</h2>
              <p className="text-[11px] text-sky-200/80">
                Log operational, safety or medical event for immediate response
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

        {/* Connectivity Mode Notice */}
        <div className={`px-4 py-2 text-xs flex items-center justify-between border-b ${
          isConnected ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-orange-50 text-orange-800 border-orange-100'
        }`}>
          <div className="flex items-center gap-1.5 font-medium">
            {isConnected ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span>Online Relay • Incident will sync directly to Command Center</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-orange-600" />
                <span>Offline Mode • Incident will buffer in Outbox for synchronization</span>
              </>
            )}
          </div>
          <span className="text-[10px] font-mono opacity-80">
            {isConnected ? 'LIVE SYNC' : 'OFFLINE BUFFER'}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          
          <div className="grid grid-cols-2 gap-3">
            {/* Category */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Incident Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EmergencyCategory)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Medical">Medical</option>
                <option value="Weather">Weather</option>
                <option value="Equipment">Equipment</option>
                <option value="Communication">Communication</option>
                <option value="Route / Terrain">Route / Terrain</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Severity Level *
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as EmergencySeverity)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Low">Low — Minor operational issue</option>
                <option value="Moderate">Moderate — Safety / First-aid</option>
                <option value="High">High — Urgent attention required</option>
                <option value="Critical">Critical — Immediate danger</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Location */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Field Location *
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Survey Zone B">Survey Zone B (Larsemann Hills)</option>
                <option value="Field Camp Alpha">Field Camp Alpha</option>
                <option value="Route Charlie">Route Charlie (Traverse Corridor)</option>
                <option value="Bharati Station">Bharati Station Perimeter</option>
              </select>
            </div>

            {/* Affected Personnel */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Affected Personnel
              </label>
              <select
                value={affectedPersonnel}
                onChange={(e) => setAffectedPersonnel(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Dr. Rohan Sharma">Dr. Rohan Sharma (Glaciologist)</option>
                <option value="Arjun Singh">Arjun Singh (Technician)</option>
                <option value="Dr. Ananya Mehta">Dr. Ananya Mehta (Expedition Lead)</option>
                <option value="Priya Nair">Priya Nair (Logistics Officer)</option>
                <option value="Dr. Kavya Rao">Dr. Kavya Rao (Meteorologist)</option>
                <option value="Vikram Joshi">Vikram Joshi (Lead Navigator)</option>
                <option value="None / Facility">None (Facility / Infrastructure)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Incident Description *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail observations, injury mechanism, immediate hazards, or system failure..."
              className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          {/* Action Taken */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Immediate Action Taken (Optional)
            </label>
            <input
              type="text"
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              placeholder="e.g. Operations halted; first-aid dressing applied; shelter entered."
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              Demo Environment • Simulated Log
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
                className="px-4 py-1.5 rounded-lg bg-polar-blue hover:bg-navy-DEFAULT text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
