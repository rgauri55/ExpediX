import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  MapPin,
  ShieldCheck,
  Radio,
  Clock,
  Compass,
  Briefcase,
  Mail,
  Heart,
  Phone,
  Boxes,
  Award,
  ArrowRight,
  AlertTriangle,
  FileText,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { usePersonnel } from '../context/PersonnelContext';
import { AssignPersonnelModal } from '../components/personnel/AssignPersonnelModal';
import type { PersonnelStatus } from '../types';

export const PersonnelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPersonnelById, personnel } = usePersonnel();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [emergencyAlertSent, setEmergencyAlertSent] = useState(false);

  const member = id ? getPersonnelById(id) : undefined;

  // Fallback to first member if id not found
  const person = member || personnel[0];

  if (!person) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-polar-border">
        <h2 className="text-lg font-bold text-[#082D56]">Personnel Record Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">
          The requested member could not be retrieved from the active expedition database.
        </p>
        <button
          onClick={() => navigate('/personnel')}
          className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-polar-blue rounded-xl"
        >
          Return to Personnel Roster
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: PersonnelStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Active
          </span>
        );
      case 'In Field':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            In Field
          </span>
        );
      case 'Attention':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            Attention Required
          </span>
        );
      case 'Returning':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Returning to Base
          </span>
        );
      case 'Off Duty':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Off Duty / Rest Cycle
          </span>
        );
    }
  };

  const isHighRisk = person.safetyStatus === 'High Risk' || person.safetyStatus === 'Critical';

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      
      {/* 1. Breadcrumbs and Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            to="/personnel"
            className="flex items-center gap-1 font-semibold text-polar-blue hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Personnel Roster</span>
          </Link>
          <span>/</span>
          <span className="text-slate-400">{person.expeditionId}</span>
          <span>/</span>
          <span className="text-slate-700 font-medium truncate">{person.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold border border-sky-200">
            SIMULATION RECORD • {person.id}
          </span>
          <button
            onClick={() => setIsAssignModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-polar-blue bg-white border border-polar-blue/30 hover:bg-sky-50 rounded-xl transition-colors"
          >
            Update Assignment
          </button>
        </div>
      </div>

      {/* 2. Top Profile Hero Banner */}
      <div className="bg-white rounded-2xl border border-polar-border shadow-xs overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-[#082D56] via-[#0B3A6F] to-[#0A4B8F] text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Avatar and Primary Identity */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xl flex items-center justify-center shadow-lg shrink-0">
                {person.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    {person.name}
                  </h1>
                  {person.callsign && (
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-400/20 text-sky-200 border border-sky-400/30">
                      CALLSIGN: {person.callsign}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-sky-100 font-medium">
                  {person.role} • <span className="text-sky-300">{person.team}</span>
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap pt-1">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    {person.expeditionName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    {person.currentLocation}
                  </span>
                </div>
              </div>
            </div>

            {/* Status & Telemetry Check */}
            <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-200 font-medium">Roster Status:</span>
                {getStatusBadge(person.status)}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Clock className="w-3.5 h-3.5 text-sky-300" />
                <span>Last Telemetry Sync: <strong className="text-white">{person.lastUpdate}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-medium">
                <Activity className="w-3 h-3" />
                <span>Bio-Telemetry Beacon: Nominal</span>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Contact & Medical Strip */}
        <div className="px-6 py-3 bg-slate-50 border-t border-polar-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email Link</span>
            <span className="font-medium text-slate-700 flex items-center gap-1 truncate">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {person.email}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Blood Group</span>
            <span className="font-bold text-rose-700 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              {person.bloodGroup}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Emergency Ops Contact</span>
            <span className="font-medium text-slate-700 flex items-center gap-1 truncate">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {person.emergencyContact}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Assigned Station</span>
            <span className="font-semibold text-[#082D56] flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-polar-blue" />
              {person.station}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Safety Intelligence Notice if High Risk */}
      {isHighRisk && (
        <div className="bg-amber-50 rounded-2xl border border-amber-300 p-4.5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-amber-950">
                  SAFETY ADVISORY IN EFFECT
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                  {person.safetyStatus.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                {person.safetyNote || 'Member is currently deployed in an active severe weather perimeter.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setEmergencyAlertSent(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{emergencyAlertSent ? 'Radio Ping Sent' : 'Ping Emergency Beacon'}</span>
          </button>
        </div>
      )}

      {/* 4. 2-Column Content Grid: Operational Directives (Left) + Movement & Assets (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Operational Assignment & Qualifications */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Current Mission Assignment Card */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-polar-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-polar-blue text-white flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#082D56]">Current Mission Assignment</h3>
                  <p className="text-xs text-slate-500">Operational directives &amp; scope of field work</p>
                </div>
              </div>
              <span className="text-xs font-bold text-polar-blue">
                {person.expeditionId}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Primary Directive
              </span>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                {person.assignment}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tasked with conducting continuous scientific instrumentation checks, logging cryogenic baseline variables, and reporting synchronized telemetry back to the Bharati Command Center at 6-hour intervals.
              </p>
            </div>

            {/* Sub-Directives Checklist */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-700 block">Mission Milestone Checklist:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-700">Daily Telemetry Handshake</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-700">Sub-Zero Asset Battery Check</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-700">Environmental Sensor Calibration</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                  <span className="text-slate-500">Traverse Egress Check-Out</span>
                </div>
              </div>
            </div>
          </div>

          {/* Movement History Log */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-polar-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-polar-blue/10 text-polar-blue flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#082D56]">Movement &amp; Traverse Log</h3>
                  <p className="text-xs text-slate-500">Station transitions, convoy routes and field relocations</p>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {person.movementHistory.length} Transition Recorded
              </span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {person.movementHistory.map((mov) => (
                <div key={mov.id} className="relative space-y-1 text-xs">
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-polar-blue border-2 border-white shadow-xs" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-[#082D56]">
                      <span>{mov.fromLocation}</span>
                      <ArrowRight className="w-3 h-3 text-polar-blue" />
                      <span>{mov.toLocation}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{mov.dateFormatted}</span>
                  </div>
                  <p className="text-slate-600 text-xs">{mov.purpose}</p>
                  <div className="flex items-center gap-2 text-[10px] text-sky-700 font-medium">
                    <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-100">
                      Transport: {mov.transportMode}
                    </span>
                    <span className="text-slate-400">Timestamp: {mov.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Assigned Assets, Certifications, Emergency Directives */}
        <div className="space-y-6">
          
          {/* Assigned Polar Assets & Equipment */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3.5">
            <div className="flex items-center gap-2 border-b border-polar-border pb-3">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-polar-blue flex items-center justify-center">
                <Boxes className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#082D56]">Assigned Polar Assets</h3>
                <p className="text-[11px] text-slate-500">Tracked equipment &amp; instruments</p>
              </div>
            </div>

            <div className="space-y-2">
              {person.assignedAssets.map((asset, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-slate-800">{asset}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">SYNCED</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Qualifications */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-xs p-5 space-y-3.5">
            <div className="flex items-center gap-2 border-b border-polar-border pb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#082D56]">Certifications &amp; Training</h3>
                <p className="text-[11px] text-slate-500">Polar readiness credentials</p>
              </div>
            </div>

            <div className="space-y-1.5">
              {person.qualifications.map((qual, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs font-medium text-emerald-900 flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{qual}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2.5 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Operational Actions
            </span>
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-polar-blue hover:bg-polar-blue-hover rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Reassign Personnel</span>
            </button>
            <button
              onClick={() => navigate('/personnel')}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Personnel Roster</span>
            </button>
          </div>

        </div>

      </div>

      {/* Assign Personnel Modal */}
      <AssignPersonnelModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
      />

    </div>
  );
};
