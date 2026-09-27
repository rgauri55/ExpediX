import React, { useState } from 'react';
import { X, PackagePlus, Compass, MapPin, Layers, AlertCircle } from 'lucide-react';
import { useExpeditions } from '../../context/ExpeditionContext';
import { useCargoAssets } from '../../context/CargoAssetContext';
import type { CargoItem, CargoPriority } from '../../types';

interface AddCargoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCargoModal: React.FC<AddCargoModalProps> = ({ isOpen, onClose }) => {
  const { expeditions } = useExpeditions();
  const { cargoList, addCargo } = useCargoAssets();

  const nextCargoNum = cargoList.length + 35;
  const [code, setCode] = useState(`CG-0${nextCargoNum}`);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CargoItem['category']>('Scientific Equipment');
  const [quantity, setQuantity] = useState<number>(10);
  const [unit, setUnit] = useState('Units');
  const [origin, setOrigin] = useState('NCAOR Goa Staging Hub');
  const [destination, setDestination] = useState('Bharati Station');
  const [priority, setPriority] = useState<CargoPriority>('High');
  const [selectedExpeditionId, setSelectedExpeditionId] = useState(
    expeditions[0]?.id || 'IAE-2026-W03'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !description.trim()) return;

    addCargo({
      code: code.trim().toUpperCase(),
      description: description.trim(),
      category,
      quantity: Number(quantity) || 1,
      unit,
      origin: origin.trim(),
      destination: destination.trim(),
      priority,
      expeditionId: selectedExpeditionId,
      status: 'Prepared',
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
              <PackagePlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#082D56]">Add Expedition Cargo</h2>
              <p className="text-xs text-slate-500">Register new cargo manifest item into the polar supply chain</p>
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
                Cargo ID Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CG-085"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-polar-blue" />
                Assigned Expedition Mission *
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cargo Description &amp; Item Specification *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Scientific Equipment (Laser Spectrometer & Sounding Kit)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Scientific Equipment">Scientific Equipment</option>
                <option value="Medical Supplies">Medical Supplies</option>
                <option value="Fuel & Energy">Fuel &amp; Energy</option>
                <option value="Safety & Field Gear">Safety &amp; Field Gear</option>
                <option value="Communications">Communications</option>
                <option value="Cryo & Cold Chain">Cryo &amp; Cold Chain</option>
                <option value="Provisions">Provisions &amp; Rations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Unit / Container
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Units">Units / Cases</option>
                <option value="Crates">Heavy Crates</option>
                <option value="Thermal Packs">Thermal Cold Packs</option>
                <option value="Bulk Bladders (1000L)">Bulk Bladders (1000L)</option>
                <option value="Pelican Cases">Pelican Cases</option>
                <option value="Dewars">Liquid Nitrogen Dewars</option>
                <option value="Barrels">Barrels</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Origin Hub
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="NCAOR Goa Staging Hub">NCAOR Goa Staging Hub</option>
                <option value="Cape Town Staging Port">Cape Town Staging Port</option>
                <option value="NRSC Comms Hub Hyderabad">NRSC Comms Hub Hyderabad</option>
                <option value="Bharati Station">Bharati Station (Base Transfer)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-polar-blue" />
                Destination Location
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue transition-all"
              >
                <option value="Bharati Station">Bharati Station (Main Base)</option>
                <option value="Field Camp Alpha">Field Camp Alpha (Glaciology Camp)</option>
                <option value="Survey Zone B">Survey Zone B (East Antarctic Margin)</option>
                <option value="Fuel Depot (Larsemann Ridge)">Fuel Depot (Larsemann Ridge)</option>
                <option value="Maitri Station">Maitri Station</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              Priority Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Critical', 'High', 'Medium', 'Low'] as CargoPriority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    priority === p
                      ? p === 'Critical'
                        ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-200'
                        : p === 'High'
                        ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-200'
                        : 'bg-sky-50 text-polar-blue border-sky-300 ring-2 ring-sky-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Simulation disclaimer */}
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-2 text-[11px] text-sky-800">
            <span className="font-mono uppercase font-bold text-[9px] px-1.5 py-0.5 rounded bg-sky-200 text-sky-900">
              SIMULATION DATA
            </span>
            <span>Cargo creation immediately initializes tracking timeline stages in local prototype state.</span>
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
              <PackagePlus className="w-3.5 h-3.5" />
              <span>Add Cargo</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
