import React, { useState } from 'react';
import { X, HelpCircle, Send, Wifi, WifiOff } from 'lucide-react';
import { useFieldOperations } from '../../context/FieldOperationsContext';

interface RequestSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestSupportModal: React.FC<RequestSupportModalProps> = ({ isOpen, onClose }) => {
  const { requestSupport, isConnected } = useFieldOperations();

  const [priority, setPriority] = useState<'Routine' | 'Urgent' | 'Emergency'>('Routine');
  const [requestType, setRequestType] = useState<'Medical' | 'Logistics' | 'Technical' | 'Communication' | 'Transport'>('Logistics');
  const [details, setDetails] = useState<string>(
    'Requesting delivery of 2x spare tungsten-carbide drill cutter heads and 2x Jet A-1 canisters on next skidoo run.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;
    requestSupport({
      priority,
      requestType,
      details,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-polar-border max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                Request Support
              </h3>
              <p className="text-[11px] text-sky-200/80">
                Field Camp Alpha → Bharati Station Logistics
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
                <span>Status: <strong>SYNCED</strong> (Alerting Base Station)</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                <span>Status: <strong>PENDING SYNC</strong> (Saved in Outbox)</span>
              </>
            )}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          
          <div className="grid grid-cols-2 gap-2.5">
            {/* Support Type */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Support Type</label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value as any)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-polar-blue font-medium"
              >
                <option value="Medical">Medical</option>
                <option value="Logistics">Logistics</option>
                <option value="Technical">Technical</option>
                <option value="Communication">Communication</option>
                <option value="Transport">Transport</option>
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-polar-blue font-medium"
              >
                <option value="Routine">Routine</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700">Message</label>
            <textarea
              rows={3}
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe required assistance, supplies, or transport support..."
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
              className="px-4 py-1.5 text-xs font-semibold text-white bg-polar-blue hover:bg-navy-DEFAULT rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Support Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
