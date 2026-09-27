import React, { useState } from 'react';
import { X, ArrowRightLeft, MapPin, User, FileText } from 'lucide-react';
import type { InventoryItem } from '../../types';
import { useInventory } from '../../context/InventoryContext';

interface TransferLocationModalProps {
  item: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
}

export const TransferLocationModal: React.FC<TransferLocationModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const { transferItem } = useInventory();
  const [toLocation, setToLocation] = useState('Bharati Medical Store');
  const [actor, setActor] = useState('Logistics Lead Priya Nair');
  const [notes, setNotes] = useState('Internal base stock re-allocation');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    transferItem({
      itemId: item.id,
      toLocation,
      actor,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-polar-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-polar-border flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-polar-blue text-white flex items-center justify-center shadow-xs">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#082D56]">Transfer Location</h2>
              <p className="text-[11px] text-slate-500">{item.code} • {item.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Current Location:</span>
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-polar-blue" />
              {item.currentLocation}
            </span>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Destination Location *
            </label>
            <select
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30"
            >
              <option value="Bharati Station">Bharati Station (Main Storage)</option>
              <option value="Bharati Medical Store">Bharati Medical Store</option>
              <option value="Bharati Communications Store">Bharati Communications Store</option>
              <option value="Fuel Storage">Fuel Storage Depot</option>
              <option value="Field Camp Alpha">Field Camp Alpha</option>
              <option value="Survey Zone B">Survey Zone B</option>
              <option value="Backload Storage">Backload Storage</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Authorized By
            </label>
            <input
              type="text"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Transfer Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Moved to primary medical cabinet"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Confirm Transfer</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
