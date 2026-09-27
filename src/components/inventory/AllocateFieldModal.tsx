import React, { useState } from 'react';
import { X, Send, MapPin, Users, User } from 'lucide-react';
import type { InventoryItem } from '../../types';
import { useInventory } from '../../context/InventoryContext';

interface AllocateFieldModalProps {
  item: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
}

export const AllocateFieldModal: React.FC<AllocateFieldModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const { allocateItem } = useInventory();
  const [quantity, setQuantity] = useState<number>(Math.min(item.quantity, 6));
  const [destination, setDestination] = useState('Field Camp Alpha');
  const [team, setTeam] = useState('Science Team A (Glaciology)');
  const [actor, setActor] = useState('Logistics Officer Priya Nair');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return;

    allocateItem({
      itemId: item.id,
      quantity,
      destination,
      team,
      actor,
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
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#082D56]">Allocate to Field</h2>
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
          
          <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100 flex items-center justify-between">
            <span className="text-slate-600 font-medium">Station Balance:</span>
            <span className="font-bold text-sm text-[#082D56]">
              {item.quantity} {item.unit}
            </span>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Quantity to Dispatch ({item.unit}) *
            </label>
            <input
              type="number"
              min="1"
              max={item.quantity}
              required
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-polar-blue" />
              Target Field Location *
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30"
            >
              <option value="Field Camp Alpha">Field Camp Alpha (Glaciology Camp)</option>
              <option value="Survey Zone B">Survey Zone B (East Antarctic Margin)</option>
              <option value="Route Charlie (En Route Base)">Route Charlie (Convoy Traverse)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              Recipient Team / Unit
            </label>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30"
            >
              <option value="Science Team A (Glaciology)">Science Team A (Glaciology)</option>
              <option value="Science Team B (Geology)">Science Team B (Geology)</option>
              <option value="Field Operations / Traverse">Field Operations / Traverse</option>
              <option value="Medical & Safety">Medical &amp; Safety</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Dispatching Logistics Officer
            </label>
            <input
              type="text"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
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
              <Send className="w-3.5 h-3.5" />
              <span>Confirm Allocation</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
