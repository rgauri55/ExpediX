import React, { useState } from 'react';
import { X, UserPlus, Users, MapPin, Briefcase, Compass, Calendar, ShieldCheck } from 'lucide-react';
import { useExpeditions } from '../../context/ExpeditionContext';
import { usePersonnel } from '../../context/PersonnelContext';

interface AssignPersonnelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssignPersonnelModal: React.FC<AssignPersonnelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { expeditions } = useExpeditions();
  const { personnel, assignPersonnel } = usePersonnel();

  const [selectedExpeditionId, setSelectedExpeditionId] = useState(
    expeditions[0]?.id || 'IAE-2026-W03'
  );
  const [selectedPersonMode, setSelectedPersonMode] = useState<'existing' | 'new'>('existing');
  const [selectedPersonId, setSelectedPersonId] = useState(personnel[0]?.id || '');
  const [newPersonName, setNewPersonName] = useState('');
  const [role, setRole] = useState('Glaciologist / Research Scientist');
  const [team, setTeam] = useState('Science Team A');
  const [deploymentLocation, setDeploymentLocation] = useState('Field Camp Alpha');
  const [assignment, setAssignment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let personName = '';
    if (selectedPersonMode === 'existing') {
      const found = personnel.find((p) => p.id === selectedPersonId);
      personName = found ? found.name : 'Expedition Member';
    } else {
      personName = newPersonName.trim() || 'Dr. Field Researcher';
    }

    assignPersonnel({
      expeditionId: selectedExpeditionId,
      personnelName: personName,
      role: role.trim() || 'Research Specialist',
      team: team.trim() || 'Science Team A',
      assignment: assignment.trim() || 'Field Telemetry & Cryospheric Sample Collection',
      deploymentLocation: deploymentLocation.trim() || 'Bharati Station',
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-polar-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-polar-border flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-polar-blue text-white flex items-center justify-center shadow-xs">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#082D56]">Assign Expedition Personnel</h2>
              <p className="text-xs text-slate-500">Deploy or update operational roles, teams, and field coordinates</p>
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
          
          {/* Expedition Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-polar-blue" />
              Target Expedition Mission *
            </label>
            <select
              value={selectedExpeditionId}
              onChange={(e) => setSelectedExpeditionId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
            >
              {expeditions.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  {exp.code} — {exp.name} ({exp.stationName})
                </option>
              ))}
            </select>
          </div>

          {/* Member Selection Mode */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-polar-blue" />
                Select Personnel Member *
              </label>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedPersonMode('existing')}
                  className={`px-2.5 py-0.5 rounded-lg font-medium transition-all ${
                    selectedPersonMode === 'existing'
                      ? 'bg-polar-blue text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Existing Roster
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPersonMode('new')}
                  className={`px-2.5 py-0.5 rounded-lg font-medium transition-all ${
                    selectedPersonMode === 'new'
                      ? 'bg-polar-blue text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  + New Member
                </button>
              </div>
            </div>

            {selectedPersonMode === 'existing' ? (
              <select
                value={selectedPersonId}
                onChange={(e) => {
                  setSelectedPersonId(e.target.value);
                  const p = personnel.find((x) => x.id === e.target.value);
                  if (p) {
                    setRole(p.role);
                    setTeam(p.team);
                    setDeploymentLocation(p.currentLocation);
                    setAssignment(p.assignment);
                  }
                }}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                {personnel.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.role} • {p.currentLocation})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                required
                placeholder="Full Name (e.g. Dr. Alok Sen)"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            )}
          </div>

          {/* Role & Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                Operational Role
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Glaciologist"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                Assigned Team / Unit
              </label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Science Team A">Science Team A (Glaciology)</option>
                <option value="Science Team B">Science Team B (Geology & Coring)</option>
                <option value="Atmospheric & Climate Team">Atmospheric &amp; Climate Team</option>
                <option value="Traverse Logistics">Traverse Logistics</option>
                <option value="Field Operations">Field Operations</option>
                <option value="Medical & Safety">Medical &amp; Safety</option>
                <option value="Technical Operations">Technical Operations</option>
                <option value="Base Operations">Base Operations</option>
              </select>
            </div>
          </div>

          {/* Deployment Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-polar-blue" />
                Deployment Location / Camp
              </label>
              <select
                value={deploymentLocation}
                onChange={(e) => setDeploymentLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Bharati Station">Bharati Station (Main Base)</option>
                <option value="Field Camp Alpha">Field Camp Alpha (Larsemann Ice Sheet)</option>
                <option value="Survey Zone B">Survey Zone B (East Antarctic Margin)</option>
                <option value="Route Charlie (En Route Base)">Route Charlie (Convoy Traverse)</option>
                <option value="Maitri Station">Maitri Station</option>
                <option value="Cape Town Staging Port">Cape Town Staging Port</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Deployment Safety Level
              </label>
              <div className="px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Station &amp; Field Clearance Approved</span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Deployment Start Date
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
                Expected Rotation Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>
          </div>

          {/* Assignment Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mission Directives &amp; Operational Assignment *
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Deep ice core extraction, cryogenic telemetry logging, and traverse unit maintenance..."
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
            />
          </div>

          {/* Simulation Disclaimer */}
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-2 text-[11px] text-sky-800">
            <span className="font-mono uppercase font-bold text-[9px] px-1.5 py-0.5 rounded bg-sky-200 text-sky-900">
              SIMULATION DATA
            </span>
            <span>Assigning personnel automatically creates a synchronized field movement telemetry event.</span>
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
              className="px-4 py-2 text-xs font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Confirm Assignment</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
