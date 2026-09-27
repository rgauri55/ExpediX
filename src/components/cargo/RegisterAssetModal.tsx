import React, { useState } from 'react';
import { X, Wrench, Compass, MapPin, Users, Layers, ShieldCheck } from 'lucide-react';
import { useExpeditions } from '../../context/ExpeditionContext';
import { useCargoAssets } from '../../context/CargoAssetContext';
import type { PolarAsset, AssetCondition, AssetStatus } from '../../types';

interface RegisterAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterAssetModal: React.FC<RegisterAssetModalProps> = ({ isOpen, onClose }) => {
  const { expeditions } = useExpeditions();
  const { assetList, registerAsset } = useCargoAssets();

  const nextAssetNum = assetList.length + 65;
  const [code, setCode] = useState(`AST-0${nextAssetNum}`);
  const [name, setName] = useState('');
  const [type, setType] = useState<PolarAsset['type']>('Snowmobile');
  const [category, setCategory] = useState<PolarAsset['category']>('Vehicles & Traverse');
  const [currentLocation, setCurrentLocation] = useState('Bharati Station');
  const [condition, setCondition] = useState<AssetCondition>('Optimal');
  const [assignedTeam, setAssignedTeam] = useState('Traverse Logistics / Field Ops');
  const [selectedExpeditionId, setSelectedExpeditionId] = useState(
    expeditions[0]?.id || 'IAE-2026-W03'
  );

  if (!isOpen) return null;

  const handleTypeChange = (newType: PolarAsset['type']) => {
    setType(newType);
    if (newType === 'Snowmobile' || newType === 'Skidoo' || newType === 'Heavy Traverse Tractor') {
      setCategory('Vehicles & Traverse');
    } else if (newType === 'Satellite Comms') {
      setCategory('Communications');
    } else if (newType === 'Power Generator') {
      setCategory('Power & Energy');
    } else if (newType === 'Ice Core Drill') {
      setCategory('Scientific Instruments');
    } else if (newType === 'Medical Extraction Kit') {
      setCategory('Emergency & Medical');
    } else if (newType === 'Radar Beacon') {
      setCategory('Base Infrastructure');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const initialStatus: AssetStatus =
      condition === 'Inspection Required' || condition === 'Service Due'
        ? 'ATTENTION'
        : 'OPERATIONAL';

    registerAsset({
      code: code.trim().toUpperCase(),
      name: name.trim() || `${type} ${code.trim().toUpperCase()}`,
      type,
      category,
      currentLocation,
      condition,
      assignedTeam,
      assignedExpedition: selectedExpeditionId,
      status: initialStatus,
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
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#082D56]">Register Polar Asset</h2>
              <p className="text-xs text-slate-500">Commission equipment, vehicles, or instruments into active registry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Asset ID Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AST-075"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Asset Name / Model Description
              </label>
              <input
                type="text"
                placeholder="e.g. Bombardier Lynx 900 Extreme Snowmobile"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-polar-blue" />
                Asset Type *
              </label>
              <select
                value={type}
                onChange={(e) => handleTypeChange(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Snowmobile">Snowmobile</option>
                <option value="Skidoo">Skidoo (Twin-Track)</option>
                <option value="Heavy Traverse Tractor">Heavy Traverse Tractor / Sledge</option>
                <option value="Satellite Comms">Satellite Comms Phone / Terminal</option>
                <option value="Power Generator">Arctic Power Generator Unit</option>
                <option value="Ice Core Drill">Ice Core Drill Rig</option>
                <option value="Medical Extraction Kit">Medical Extraction Kit / Pod</option>
                <option value="Radar Beacon">Ku-Band Radar Tracking Beacon</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-slate-500" />
                Assigned Expedition *
              </label>
              <select
                value={selectedExpeditionId}
                onChange={(e) => setSelectedExpeditionId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                {expeditions.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.code} — {exp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-polar-blue" />
                Current Operating Location
              </label>
              <select
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Bharati Station">Bharati Station (Base Operations)</option>
                <option value="Field Camp Alpha">Field Camp Alpha (Ice Sheet Camp)</option>
                <option value="Survey Zone B">Survey Zone B (East Margin)</option>
                <option value="Route Charlie (En Route Base)">Route Charlie (Convoy Traverse)</option>
                <option value="Fuel Depot (Larsemann Ridge)">Fuel Depot (Larsemann Ridge)</option>
                <option value="Maitri Station">Maitri Station</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                Assigned Team / Unit
              </label>
              <select
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Traverse Logistics / Field Ops">Traverse Logistics / Field Ops</option>
                <option value="Science Team A (Glaciology)">Science Team A (Glaciology)</option>
                <option value="Science Team B / Glaciology">Science Team B / Geology</option>
                <option value="Atmospheric & Climate Team">Atmospheric &amp; Climate Team</option>
                <option value="Base Operations">Base Operations &amp; Power</option>
                <option value="Medical & Safety">Medical &amp; Safety</option>
                <option value="Technical Operations">Technical Operations &amp; Comms</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Initial Operating Condition
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Optimal', 'Good', 'Inspection Required', 'Service Due'] as AssetCondition[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCondition(c)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                    condition === c
                      ? c === 'Optimal' || c === 'Good'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Simulation disclaimer */}
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-2 text-[11px] text-sky-800">
            <span className="font-mono uppercase font-bold text-[9px] px-1.5 py-0.5 rounded bg-sky-200 text-sky-900">
              SIMULATION DATA
            </span>
            <span>Registering asset creates telemetry node and links it to {selectedExpeditionId}.</span>
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
              <Wrench className="w-3.5 h-3.5" />
              <span>Register Asset</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
