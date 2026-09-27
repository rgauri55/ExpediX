import React from 'react';
import { X, UserCheck, CheckCircle, Clock } from 'lucide-react';
import type { PersonnelDeinduction } from '../../types';
import { useCloseout } from '../../context/CloseoutContext';
import { Badge } from '../common/Badge';

interface PersonnelDetailModalProps {
  personnel: PersonnelDeinduction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PersonnelDetailModal: React.FC<PersonnelDetailModalProps> = ({
  personnel,
  isOpen,
  onClose,
}) => {
  const { updatePersonnel } = useCloseout();

  if (!isOpen || !personnel) return null;

  const handleMarkMedicalCleared = () => {
    updatePersonnel(personnel.id, { medicalClearance: 'Cleared' });
  };

  const handleConfirmEquipment = () => {
    updatePersonnel(personnel.id, { equipmentReturned: 'Returned' });
  };

  const handleConfirmTravel = () => {
    updatePersonnel(personnel.id, { travelStatus: 'Confirmed' });
  };

  const handleMarkReady = () => {
    updatePersonnel(personnel.id, {
      medicalClearance: 'Cleared',
      equipmentReturned: 'Returned',
      travelStatus: 'Confirmed',
      departureStatus: 'Ready',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-lg w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-sky-300" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Personnel De-induction File</h2>
              <p className="text-[11px] text-sky-200/80">
                {personnel.name} • {personnel.role}
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

        {/* Status Strip */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Current Site:</span>
            <span className="font-semibold text-slate-900">{personnel.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Departure Readiness:</span>
            <Badge variant={personnel.departureStatus === 'Ready' ? 'success' : 'warning'} size="sm">
              {personnel.departureStatus.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3.5">
          
          {/* 3 Status Cards */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Medical Clearance</span>
              <span className={`text-xs font-bold block mt-1 ${
                personnel.medicalClearance === 'Cleared' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {personnel.medicalClearance}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Field Gear</span>
              <span className={`text-xs font-bold block mt-1 ${
                personnel.equipmentReturned === 'Returned' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {personnel.equipmentReturned}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Flight Routing</span>
              <span className={`text-xs font-bold block mt-1 ${
                personnel.travelStatus === 'Confirmed' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {personnel.travelStatus}
              </span>
            </div>
          </div>

          {/* Clearance Notes */}
          {personnel.clearanceNotes && (
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                Officer Notes &amp; Routing
              </span>
              <p className="text-slate-700 leading-relaxed">
                {personnel.clearanceNotes}
              </p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-700 block">
              Operational Sign-Off Actions
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleMarkMedicalCleared}
                disabled={personnel.medicalClearance === 'Cleared'}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mark Medical Cleared</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmEquipment}
                disabled={personnel.equipmentReturned === 'Returned'}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Confirm Equipment Return</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmTravel}
                disabled={personnel.travelStatus === 'Confirmed'}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-polar-blue" />
                <span>Confirm Travel Route</span>
              </button>

              <button
                type="button"
                onClick={handleMarkReady}
                className="p-2 rounded-lg bg-polar-blue hover:bg-navy-DEFAULT text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Mark All Ready</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-mono">
            ExpediX Polar De-induction Protocol
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
