import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert, Wifi, WifiOff } from 'lucide-react';
import { useFieldOperations } from '../../context/FieldOperationsContext';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({ isOpen, onClose }) => {
  const { reportIncident, isConnected } = useFieldOperations();

  const [severity, setSeverity] = useState<'Low' | 'Moderate' | 'High' | 'Critical'>('Moderate');
  const [category, setCategory] = useState<'Medical' | 'Weather' | 'Equipment' | 'Communication' | 'Route / Terrain' | 'Other'>('Equipment');
  const [location, setLocation] = useState<string>('Field Camp Alpha / Survey Zone B');
  const [description, setDescription] = useState<string>(
    'Secondary hydraulic hose on AST-042 showed minor fluid weep near coupling due to -28°C stiffening.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    reportIncident({
      severity,
      category,
      location,
      description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-polar-border max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-400/30 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                Report Incident
              </h3>
              <p className="text-[11px] text-sky-200/80">
                Field Camp Alpha • Operational Safety
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
                <span>Status: <strong>INCIDENT LOGGED</strong> (Transmitted live)</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                <span>Status: <strong>INCIDENT SAVED LOCALLY</strong> (PENDING SYNC)</span>
              </>
            )}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          
          <div className="grid grid-cols-2 gap-2.5">
            {/* Incident Type */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Incident Type</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-polar-blue font-medium"
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
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-polar-blue font-medium"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-polar-blue"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700">Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the failure mode, anomaly, or environmental deviation..."
              className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-polar-blue"
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
              className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Submit Incident</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
