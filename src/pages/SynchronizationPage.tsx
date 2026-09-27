import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RefreshCw,
  Wifi,
  WifiOff,
  RotateCcw,
  Trash2,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import { useFieldOperations } from '../context/FieldOperationsContext';
import { Badge } from '../components/common/Badge';
import { RecordDetailModal } from '../components/sync/RecordDetailModal';
import type { OutboxRecord } from '../types';

export const SynchronizationPage: React.FC = () => {
  const {
    isConnected,
    isSyncing,
    syncProgressStatus,
    outbox,
    syncHistory,
    lastSyncTime,
    toggleConnectivity,
    syncOutbox,
    syncSingleRecord,
    retryFailed,
    clearCompleted,
  } = useFieldOperations();

  const [selectedRecord, setSelectedRecord] = useState<OutboxRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  // Priority weight mapping for deterministic ordering
  const priorityWeight: Record<string, number> = {
    Critical: 1,
    Safety: 2,
    Operational: 3,
    Routine: 4,
  };

  // Sort outbox deterministically by Priority (Critical → Safety → Operational → Routine)
  const sortedQueue = [...outbox].sort((a, b) => {
    const weightA = priorityWeight[a.priority] || 5;
    const weightB = priorityWeight[b.priority] || 5;
    return weightA - weightB;
  });

  const pendingCount = outbox.filter((r) => r.status === 'Pending').length;
  const failedCount = outbox.filter((r) => r.status === 'Failed').length;
  const completedCount = outbox.filter((r) => r.status === 'Synced').length;

  const handleOpenDetail = (record: OutboxRecord) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <Badge variant="emergency" size="sm">CRITICAL</Badge>;
      case 'Safety':
        return <Badge variant="warning" size="sm">SAFETY</Badge>;
      case 'Operational':
        return <Badge variant="primary" size="sm">OPERATIONAL</Badge>;
      default:
        return <Badge variant="neutral" size="sm">ROUTINE</Badge>;
    }
  };

  return (
    <div className="space-y-4 pb-12 text-slate-800">
      
      {/* ========================================================================= */}
      {/* 1. TOP CONTEXT & HEADER                                                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-polar-blue">IAE-2026-W03</span>
              <span>•</span>
              <span>Bharati Station</span>
              <span>•</span>
              <span>Field Camp Alpha</span>
              <span>•</span>
              <span className="text-slate-400">Simulated sync</span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-navy-DEFAULT">
              Synchronization
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Manage field records, pending transmissions and synchronization status.
            </p>
          </div>

          {/* Compact Metadata Strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Source:</span>
              <strong className="text-slate-900">Field Camp Alpha</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Destination:</span>
              <strong className="text-slate-900">Bharati Command Center</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Pending queue:</span>
              <strong className="font-mono text-slate-900">{pendingCount + failedCount} records</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Link state:</span>
              <Badge variant={isConnected ? 'success' : 'offline'} size="sm">
                {isConnected ? 'CONNECTED' : 'OFFLINE'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Connectivity Status Bar */}
        <div className={`mt-4 pt-3.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
          isConnected ? 'border-slate-100' : 'border-orange-200'
        }`}>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-700">Connected</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">Last successful sync: {lastSyncTime}</span>
                <span className="text-slate-400">•</span>
                <span className="text-[11px] text-slate-400 font-mono">Connection mode: Simulated / Demo</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="font-medium text-orange-950">Offline</span>
                <span className="text-orange-400">•</span>
                <span className="text-orange-800">Field records will remain on the local device until connectivity is restored.</span>
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
      {/* 2. MAIN 2-COLUMN SYNCHRONIZATION WORKSPACE                                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        
        {/* ================= LEFT 2 COLUMNS: PENDING QUEUE & ACTIONS ================= */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* PRIMARY WORK AREA: PENDING SYNCHRONIZATION QUEUE */}
          <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-base sm:text-lg font-bold text-navy-DEFAULT">
                    Pending synchronization
                  </h2>
                  <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {sortedQueue.length} items in queue
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Safety-critical records are transmitted before routine operational updates.
                </p>
              </div>

              {/* Action Buttons with Proper Priority */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Primary Action: Sync Now */}
                <button
                  onClick={() => syncOutbox()}
                  disabled={!isConnected || isSyncing || (pendingCount === 0 && failedCount === 0)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs ${
                    isConnected && (pendingCount > 0 || failedCount > 0) && !isSyncing
                      ? 'bg-polar-blue hover:bg-navy-DEFAULT text-white cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>
                    {isSyncing
                      ? 'Synchronizing...'
                      : isConnected
                      ? 'Sync Now'
                      : 'WAITING FOR CONNECTION'}
                  </span>
                </button>

                {/* Secondary Action: Retry Failed */}
                {failedCount > 0 && (
                  <button
                    onClick={() => retryFailed()}
                    disabled={!isConnected || isSyncing}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                    title="Retry all failed transfer records"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retry Failed ({failedCount})</span>
                  </button>
                )}

                {/* Tertiary Action: Clear Completed */}
                {completedCount > 0 && (
                  <button
                    onClick={() => clearCompleted()}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
                    title="Clear completed records from queue"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Progress Status Message Bar if Syncing or Recently Synced */}
            {syncProgressStatus && (
              <div className="mt-3 p-2 rounded-lg bg-sky-50 border border-sky-100 text-xs text-sky-900 flex items-center justify-between">
                <span className="font-medium flex items-center gap-1.5">
                  <RefreshCw className={`w-3.5 h-3.5 text-polar-blue ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{syncProgressStatus}</span>
                </span>
                <span className="text-[10px] text-sky-700 font-mono">
                  {isConnected ? 'Relay Active' : 'Offline Buffer'}
                </span>
              </div>
            )}

            {/* Queue Table */}
            {sortedQueue.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-500">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="font-semibold text-slate-700">All field records synchronized</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  No pending records in the local outbox.
                </div>
              </div>
            ) : (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 text-[11px] border-b border-slate-100">
                      <th className="py-2 font-medium">Record</th>
                      <th className="py-2 font-medium">Type</th>
                      <th className="py-2 font-medium">Source</th>
                      <th className="py-2 font-medium">Created</th>
                      <th className="py-2 font-medium">Priority</th>
                      <th className="py-2 font-medium">Status</th>
                      <th className="py-2 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedQueue.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleOpenDetail(item)}
                        className="hover:bg-slate-50/80 cursor-pointer transition-colors text-slate-700 group"
                      >
                        <td className="py-2.5 font-mono font-bold text-slate-900">
                          {item.code}
                        </td>
                        <td className="py-2.5 font-medium text-slate-800">
                          {item.typeName}
                        </td>
                        <td className="py-2.5 text-slate-500">
                          {item.source}
                        </td>
                        <td className="py-2.5 font-mono text-slate-600">
                          {item.timestamp}
                        </td>
                        <td className="py-2.5">
                          {getPriorityBadge(item.priority)}
                        </td>
                        <td className="py-2.5">
                          {item.status === 'Synced' ? (
                            <Badge variant="success" size="sm">SYNCED</Badge>
                          ) : item.status === 'Failed' ? (
                            <Badge variant="emergency" size="sm">FAILED</Badge>
                          ) : item.status === 'Syncing' ? (
                            <Badge variant="primary" size="sm">SYNCING</Badge>
                          ) : (
                            <span className="text-[11px] font-medium text-slate-600">Pending</span>
                          )}
                        </td>
                        <td className="py-2.5 text-right shrink-0" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {item.status === 'Failed' ? (
                              <button
                                onClick={() => retryFailed()}
                                disabled={!isConnected || isSyncing}
                                className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-[11px] font-medium transition-colors"
                              >
                                Retry
                              </button>
                            ) : item.status === 'Pending' ? (
                              <button
                                onClick={() => syncSingleRecord(item.id)}
                                disabled={!isConnected || isSyncing}
                                className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 text-[11px] font-medium transition-colors disabled:opacity-40"
                              >
                                Sync
                              </button>
                            ) : (
                              <span className="text-[11px] text-emerald-600 font-medium">✓ Synced</span>
                            )}

                            <button
                              onClick={() => handleOpenDetail(item)}
                              className="px-1.5 py-0.5 rounded text-slate-400 hover:text-slate-700 text-[11px] transition-colors"
                              title="View Record Details"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* SYNC HISTORY SECTION */}
          <div className="bg-white rounded-xl border border-polar-border p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
              <h3 className="font-heading font-bold text-sm text-navy-DEFAULT">
                Synchronization history
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {syncHistory.length} sync cycles logged
              </span>
            </div>

            <div className="space-y-2 divide-y divide-slate-100 text-xs">
              {syncHistory.map((hist) => (
                <div key={hist.id} className="pt-2 first:pt-0 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="font-mono text-slate-400 font-medium shrink-0 pt-0.5">
                      {hist.timestamp}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {hist.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {hist.details}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                    {hist.recordsCount} record{hist.recordsCount !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= RIGHT OPERATIONAL SIDEBAR ================= */}
        <div className="space-y-4">
          
          {/* 1. TRANSMISSION PRIORITY RULE BOX */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-2">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Transmission priority
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Deterministic Rule</span>
            </div>

            <div className="space-y-1.5 text-slate-700">
              <div className="flex items-center justify-between py-1 px-2 rounded bg-rose-50/70 border border-rose-200">
                <span className="font-semibold text-rose-900">Critical</span>
                <span className="text-[10px] text-rose-700 font-mono">Emergency & Incidents (High)</span>
              </div>

              <div className="flex items-center justify-between py-1 px-2 rounded bg-amber-50/70 border border-amber-200">
                <span className="font-semibold text-amber-900">Safety</span>
                <span className="text-[10px] text-amber-700 font-mono">Check-in Accountability</span>
              </div>

              <div className="flex items-center justify-between py-1 px-2 rounded bg-sky-50/70 border border-sky-200">
                <span className="font-semibold text-sky-900">Operational</span>
                <span className="text-[10px] text-sky-700 font-mono">Tasks & Equipment</span>
              </div>

              <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-800">Routine</span>
                <span className="text-[10px] text-slate-500 font-mono">Documents & Minor Logs</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-snug pt-1">
              Order: <strong>Critical → Safety → Operational → Routine</strong>
            </div>
          </div>

          {/* 2. LOCAL DEVICE INFORMATION */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-1.5">
            <div className="border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Local device information
              </h3>
              <Laptop className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Field device:</span>
              <span className="font-mono font-bold text-slate-800">FIELD-ALPHA-02</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Storage:</span>
              <span className="text-slate-700">Local application storage</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Last successful sync:</span>
              <span className="font-mono text-slate-800">{lastSyncTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Pending records:</span>
              <span className="font-mono font-bold text-slate-800">{pendingCount + failedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Connection:</span>
              <span className={isConnected ? 'text-emerald-700 font-medium' : 'text-orange-700 font-medium'}>
                {isConnected ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>

          {/* 3. FIELD CAMP STATUS */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-1.5">
            <div className="border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Field camp status
              </h3>
              <Link
                to="/field-operations"
                className="text-[11px] text-polar-blue hover:underline font-medium flex items-center gap-0.5"
              >
                <span>Field Console</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Site:</span>
              <span className="font-semibold text-slate-900">Field Camp Alpha</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Last contact:</span>
              <span className="font-mono text-slate-800">14:23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Pending in queue:</span>
              <span className="font-mono text-slate-800">{pendingCount + failedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Last sync:</span>
              <span className="text-emerald-700 font-medium">Successful</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Team accountability:</span>
              <span className="text-slate-800 font-medium">2 / 2 accounted for</span>
            </div>
          </div>

          {/* 4. COMMAND CENTER ARCHITECTURE */}
          <div className="bg-white rounded-xl border border-polar-border p-4 shadow-xs text-xs space-y-1.5">
            <div className="border-b border-slate-100 pb-2 mb-1.5">
              <h3 className="font-heading font-bold text-xs text-navy-DEFAULT">
                Transmission pipeline
              </h3>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px] space-y-1 text-center">
              <div className="font-bold text-slate-800">Source: Field Camp Alpha</div>
              <div className="text-slate-400">↓ (Store-and-Forward Relay)</div>
              <div className="font-bold text-polar-blue">Destination: Bharati Command Center</div>
            </div>

            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
              ExpediX Operational Architecture • Demo Environment
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* RECORD DETAIL MODAL                                                       */}
      {/* ========================================================================= */}
      <RecordDetailModal
        record={selectedRecord}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedRecord(null);
        }}
      />

    </div>
  );
};

export default SynchronizationPage;
