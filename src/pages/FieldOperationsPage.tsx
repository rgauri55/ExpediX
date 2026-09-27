import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Radio,
  Wifi,
  WifiOff,
  RefreshCw,
  FileEdit,
  ExternalLink,
} from 'lucide-react';
import { useFieldOperations } from '../context/FieldOperationsContext';
import { Badge } from '../components/common/Badge';
import { TaskUpdateModal } from '../components/field/TaskUpdateModal';
import { ReportIncidentModal } from '../components/field/ReportIncidentModal';
import { RequestSupportModal } from '../components/field/RequestSupportModal';
import { CheckInModal } from '../components/field/CheckInModal';

export const FieldOperationsPage: React.FC = () => {
  const {
    isConnected,
    isSyncing,
    teamMembers,
    activeTask,
    activityLog,
    outbox,
    allocatedResources,
    lastCheckInTime,
    nextCheckInTime,
    lastSyncTime,
    toggleConnectivity,
    checkIn,
    reportMissedCheckIn,
    completeTask,
    syncOutbox,
  } = useFieldOperations();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState<boolean>(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState<boolean>(false);

  return (
    <div className="space-y-4 pb-12 text-slate-800">
      
      {/* ========================================================================= */}
      {/* 1. TOP FIELD STATUS & CONTEXT AREA                                        */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-polar-blue">IAE-2026-W03</span>
              <span>•</span>
              <span>Bharati Station</span>
              <span>•</span>
              <span className="text-slate-400">Demo location</span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-navy-DEFAULT">
              Field Camp Alpha
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Bharati Station → Field Camp Alpha • 40 km from station • {activeTask.zone}
            </p>
          </div>

          {/* Integrated Horizontal Status Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-600">Team:</span>
              <strong className="text-slate-900">{teamMembers.length} of {teamMembers.length} accounted for</strong>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Last check-in:</span>
              <strong className="font-mono text-slate-900">{lastCheckInTime}</strong>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Next check-in:</span>
              <strong className="font-mono text-slate-900">{nextCheckInTime}</strong>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Communication:</span>
              <Badge variant={isConnected ? 'success' : 'offline'} size="sm">
                {isConnected ? 'CONNECTED' : 'OFFLINE'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Connectivity Control Bar (Integrated) */}
        <div className={`mt-4 pt-3.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
          isConnected ? 'border-slate-100' : 'border-orange-200'
        }`}>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-700">Connected</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">Last sync {lastSyncTime}</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="font-medium text-orange-950">Offline</span>
                <span className="text-orange-400">•</span>
                <span className="text-orange-800">Updates will be stored locally until connection is restored.</span>
                <span className="text-[11px] text-orange-700 font-mono ml-1">(Simulated offline mode)</span>
              </>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleConnectivity()}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                isConnected
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
              }`}
            >
              {isConnected ? 'Simulate offline' : 'Restore connection'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN OPERATIONAL WORKSPACE (2 COLUMNS)                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        
        {/* ================= LEFT 2 COLUMNS: TASK, TEAM, LOG ================= */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* A. CURRENT FIELD TASK (PRIMARY WORK AREA) */}
          <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-0.5">
                  Current field task
                </div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-navy-DEFAULT">
                  {activeTask.name}
                </h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  {activeTask.zone} • {activeTask.startTime}–{activeTask.expectedCompletion}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={activeTask.status === 'COMPLETED' ? 'success' : 'primary'} size="sm">
                  {activeTask.status}
                </Badge>
                <button
                  onClick={() => setIsTaskModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-polar-blue hover:bg-navy-DEFAULT text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  <span>Update progress</span>
                </button>
                {activeTask.status !== 'COMPLETED' && (
                  <button
                    onClick={completeTask}
                    className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors border border-slate-200 cursor-pointer"
                  >
                    Mark complete
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-700">Survey progress</span>
                <span className="font-semibold text-polar-blue">{activeTask.progressPercent}% complete</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-polar-blue h-full transition-all duration-300 rounded-full"
                  style={{ width: `${activeTask.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Task Meta Details Grid (Clean text grouping, not separate cards) */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Assigned team:</span>
                <span className="font-semibold text-slate-800">{activeTask.team.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Primary equipment:</span>
                <span className="font-semibold text-slate-800">{activeTask.equipmentCode} — {activeTask.equipmentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Time window:</span>
                <span className="font-mono text-slate-800">{activeTask.startTime}–{activeTask.expectedCompletion}</span>
              </div>
            </div>

            {/* Observations text */}
            <div className="mt-3 p-3 rounded-lg bg-slate-50 text-xs text-slate-600 leading-relaxed border border-slate-100">
              <strong className="text-slate-700">Notes: </strong>
              {activeTask.notes}
            </div>
          </div>

          {/* B. FIELD TEAM (OPERATIONAL REGISTRY LIST) */}
          <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2">
              <h3 className="font-heading font-bold text-sm text-navy-DEFAULT">
                Field team
              </h3>
              <span className="text-xs text-slate-500">
                2 of 2 accounted for
              </span>
            </div>

            {/* Operational Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 text-[11px] border-b border-slate-100">
                    <th className="py-2 font-medium">Name</th>
                    <th className="py-2 font-medium">Role</th>
                    <th className="py-2 font-medium">Location</th>
                    <th className="py-2 font-medium">Check-in</th>
                    <th className="py-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="text-slate-700">
                      <td className="py-2.5 font-semibold text-slate-900">{member.name}</td>
                      <td className="py-2.5 text-slate-600">{member.role}</td>
                      <td className="py-2.5 text-slate-500">{member.location}</td>
                      <td className="py-2.5 font-mono text-slate-700">
                        {member.lastCheckIn} <span className="text-emerald-600">✓</span>
                      </td>
                      <td className="py-2.5 text-right">
                        <Badge variant="success" size="sm">
                          {member.checkInStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* C. FIELD ACTIVITY LOG */}
          <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
              <h3 className="font-heading font-bold text-sm text-navy-DEFAULT">
                Field activity log
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {activityLog.length} events
              </span>
            </div>

            <div className="space-y-2 divide-y divide-slate-100">
              {activityLog.map((log) => {
                const isPending = log.syncStatus === 'PENDING SYNC';
                const isOfflineAlert = log.syncStatus === 'OFFLINE';

                return (
                  <div key={log.id} className="pt-2 first:pt-0 flex items-start justify-between gap-3 text-xs">
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="font-mono text-slate-400 font-medium shrink-0 pt-0.5">
                        {log.timestamp}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {log.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {log.description}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pt-0.5">
                      {isPending ? (
                        <Badge variant="warning" size="sm">
                          PENDING SYNC
                        </Badge>
                      ) : isOfflineAlert ? (
                        <Badge variant="offline" size="sm">
                          OFFLINE
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">
                          SYNCED
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ================= RIGHT OPERATIONAL SIDEBAR ================= */}
        <div className="space-y-4">
          
          {/* 1. ACTIONS BLOCK */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs space-y-2.5">
            <div className="text-xs font-bold text-slate-700 mb-1">
              Actions
            </div>

            {/* Primary Action */}
            <button
              onClick={() => checkIn()}
              className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Check in</span>
            </button>

            {/* Secondary Action Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsIncidentModalOpen(true)}
                className="py-1.5 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition-colors cursor-pointer text-center"
              >
                Report incident
              </button>
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="py-1.5 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition-colors cursor-pointer text-center"
              >
                Request support
              </button>
            </div>

            {/* Minor Options */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <button
                onClick={() => setIsCheckInModalOpen(true)}
                className="hover:text-polar-blue hover:underline cursor-pointer"
              >
                Check in with notes
              </button>
              <span>•</span>
              <button
                onClick={() => reportMissedCheckIn()}
                className="hover:text-rose-600 hover:underline cursor-pointer"
              >
                Report missed check-in
              </button>
            </div>
          </div>

          {/* 2. OFFLINE OUTBOX */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Offline outbox
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                {outbox.length} records pending
              </span>
            </div>

            {outbox.length === 0 ? (
              <div className="py-2 text-center text-xs text-slate-400">
                No pending records.
              </div>
            ) : (
              <div className="space-y-2">
                <div className="divide-y divide-slate-100 text-xs">
                  {outbox.map((rec) => (
                    <div key={rec.id} className="py-1.5 first:pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 text-[11px]">{rec.timestamp}</span>
                        <span className="font-medium text-slate-800">{rec.title}</span>
                      </div>
                      <span className="text-[10px] text-amber-700 font-medium">Pending</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => syncOutbox()}
                  disabled={!isConnected || isSyncing}
                  className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isConnected
                      ? 'bg-polar-blue hover:bg-navy-DEFAULT text-white cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : isConnected ? 'Sync outbox' : 'Sync when connected'}</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. PRIMARY EQUIPMENT */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-1.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Primary equipment
              </h3>
              <Link
                to="/assets/AST-042"
                className="text-[11px] text-polar-blue hover:underline font-medium flex items-center gap-0.5"
              >
                <span>View asset</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">AST-042 — Ice Core Drill</span>
              <span className="text-emerald-700 font-medium">Operational</span>
            </div>
            <div className="text-slate-500">
              Assigned to: <strong className="text-slate-700 font-normal">Field Camp Alpha</strong>
            </div>
            <div className="text-slate-500">
              Last inspection: <strong className="text-slate-700 font-normal">05 Sep 2026</strong>
            </div>
          </div>

          {/* 4. FIELD RESOURCES */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-2">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Field resources
              </h3>
            </div>

            <div className="space-y-1 text-slate-700">
              {allocatedResources.map((res) => (
                <div key={res.id} className="flex items-center justify-between py-0.5">
                  <span className="text-slate-600">{res.name}</span>
                  <span className="font-medium text-slate-900">{res.quantityAllocated} {res.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. SAFETY STATUS */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-1.5">
            <div className="border-b border-slate-100 pb-2 mb-1.5">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Safety status
              </h3>
            </div>

            <div className="font-semibold text-emerald-700">Normal operations</div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Weather check:</span>
              <span className="font-mono text-slate-800">14:00</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Route:</span>
              <span className="text-slate-800">Passable</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Team accountability:</span>
              <span className="text-slate-800">2 of 2</span>
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
              Data source: Simulated demo data
            </div>
          </div>

          {/* 6. FIELD LOCATION */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-1.5">
            <div className="border-b border-slate-100 pb-2 mb-1.5">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Field location
              </h3>
            </div>

            <div className="text-slate-700 space-y-1">
              <div>Bharati Station → 40 km → Field Camp Alpha → Survey Zone B</div>
              <div className="text-slate-500 font-mono text-[11px]">69°24'12"S, 76°11'45"E</div>
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
              Demo location
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODALS                                                                    */}
      {/* ========================================================================= */}
      <TaskUpdateModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
      <ReportIncidentModal
        isOpen={isIncidentModalOpen}
        onClose={() => setIsIncidentModalOpen(false)}
      />
      <RequestSupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
      <CheckInModal
        isOpen={isCheckInModalOpen}
        onClose={() => setIsCheckInModalOpen(false)}
      />

    </div>
  );
};

export default FieldOperationsPage;
