import React, { useState } from 'react';
import { X, Compass, Calendar, User, Boxes, Users, MapPin, Layers } from 'lucide-react';
import type { ExpeditionMission, ExpeditionStatus } from '../../types';

interface CreateExpeditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (expedition: Omit<ExpeditionMission, 'isSimulation'>) => void;
}

export const CreateExpeditionModal: React.FC<CreateExpeditionModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState(`IAE-${new Date().getFullYear() + 1}-W01`);
  const [stationName, setStationName] = useState('Bharati Station');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expeditionLead, setExpeditionLead] = useState('');
  const [expeditionType, setExpeditionType] = useState<'Scientific Research' | 'Geological Survey' | 'Atmospheric & Climate' | 'Traverse & Logistics'>('Scientific Research');
  const [personnelCount, setPersonnelCount] = useState<number>(20);
  const [cargoCount, setCargoCount] = useState<number>(70);
  const [status, setStatus] = useState<ExpeditionStatus>('Planning');
  const [objective, setObjective] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    const formattedDuration = startDate && endDate
      ? `${new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${new Date(endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
      : 'Nov 2026 – Jan 2027';

    onCreate({
      id: code.trim(),
      code: code.trim(),
      name: name.trim(),
      location: `${stationName} • Antarctica`,
      stationName,
      status,
      startDate: startDate || '2026-11-01',
      endDate: endDate || '2027-01-15',
      durationFormatted: formattedDuration,
      expeditionLead: expeditionLead.trim() || 'Dr. Scientist In-Charge',
      expeditionType,
      season: 'Summer',
      year: '2026',
      personnelCount: Number(personnelCount) || 15,
      cargoCount: Number(cargoCount) || 50,
      assetCount: Math.round(Number(personnelCount) * 1.2),
      inventoryCount: 10,
      progressPercent: 5,
      objective: objective.trim() || 'Multidisciplinary polar exploration and environmental parameter recording.',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs font-sans">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl border border-polar-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-polar-border flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-polar-blue text-white flex items-center justify-center shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#082D56]">Create New Expedition</h2>
              <p className="text-xs text-slate-500">Add an operational mission to the polar expedition registry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expedition Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Larsemann Hills Glaciology Mission"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mission ID Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. IAE-2027-W03"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-polar-blue" />
                Target Station
              </label>
              <select
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Bharati Station">Bharati Station</option>
                <option value="Maitri Station">Maitri Station</option>
                <option value="Dakshin Gangotri">Dakshin Gangotri Site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-polar-blue" />
                Expedition Type
              </label>
              <select
                value={expeditionType}
                onChange={(e) => setExpeditionType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Scientific Research">Scientific Research</option>
                <option value="Geological Survey">Geological Survey</option>
                <option value="Atmospheric & Climate">Atmospheric &amp; Climate</option>
                <option value="Traverse & Logistics">Traverse &amp; Logistics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Planning">Planning</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Planned">Planned</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-500" />
                Expedition Lead
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Rajesh Verma"
                value={expeditionLead}
                onChange={(e) => setExpeditionLead(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                Expected Personnel
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={personnelCount}
                onChange={(e) => setPersonnelCount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Boxes className="w-3.5 h-3.5 text-slate-500" />
                Estimated Cargo (TEU)
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={cargoCount}
                onChange={(e) => setCargoCount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Objective &amp; Scope
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary of mission scientific goals and field logistics..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-sm transition-all"
            >
              Create Expedition
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
