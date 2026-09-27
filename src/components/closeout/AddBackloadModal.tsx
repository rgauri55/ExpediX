import React, { useState } from 'react';
import { X, PackagePlus } from 'lucide-react';
import { useCloseout } from '../../context/CloseoutContext';

interface AddBackloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBackloadModal: React.FC<AddBackloadModalProps> = ({ isOpen, onClose }) => {
  const { addBackload, backload } = useCloseout();

  const [cargo, setCargo] = useState<string>('');
  const [category, setCategory] = useState<'Scientific Material' | 'Equipment' | 'Maintenance' | 'Waste' | 'Medical'>('Equipment');
  const [origin, setOrigin] = useState<string>('Bharati');
  const [destination, setDestination] = useState<string>('Goa (NCPOR Lab)');
  const [handling, setHandling] = useState<'Temperature Controlled' | 'Standard Cargo' | 'Inspection Required' | 'Controlled Handling'>('Standard Cargo');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cargo.trim()) return;

    const manifestSeq = 42 + backload.length;
    const manifestId = `BL-0${manifestSeq}`;

    addBackload({
      manifestId,
      cargo: cargo.trim(),
      category,
      origin,
      destination,
      handling,
      status: 'Prepared',
    });

    setCargo('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-md w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2">
            <PackagePlus className="w-4 h-4 text-sky-300" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Add Backload Cargo Item</h2>
              <p className="text-[11px] text-sky-200/80">
                Register cargo package for sea/air departure manifest
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

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Cargo Description *
            </label>
            <input
              type="text"
              required
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="e.g. Seismic Sensor Arrays, Empty Argon Cylinders..."
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Equipment">Equipment</option>
                <option value="Scientific Material">Scientific Material</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Waste">Waste / Scrap</option>
                <option value="Medical">Medical</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Handling Protocol *
              </label>
              <select
                value={handling}
                onChange={(e) => setHandling(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Standard Cargo">Standard Cargo</option>
                <option value="Temperature Controlled">Temperature Controlled (Cryo)</option>
                <option value="Inspection Required">Inspection Required</option>
                <option value="Controlled Handling">Controlled Handling (Hazardous/Waste)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Origin *
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Bharati">Bharati Station</option>
                <option value="Field Camp Alpha">Field Camp Alpha</option>
                <option value="Survey Zone B">Survey Zone B</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Destination *
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Goa (NCPOR Lab)">Goa (NCPOR HQ/Lab)</option>
                <option value="Approved Disposal Facility">Approved Disposal Facility (Cape Town)</option>
                <option value="Manufacturer Service Center">Manufacturer Service Center</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              Simulated Backload Entry
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
                className="px-4 py-1.5 rounded-lg bg-polar-blue hover:bg-navy-DEFAULT text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Add Manifest Item
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
