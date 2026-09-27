import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, RefreshCw, ExternalLink, AlertTriangle } from 'lucide-react';
import type { OutboxRecord } from '../../types';
import { Badge } from '../common/Badge';
import { useFieldOperations } from '../../context/FieldOperationsContext';

interface RecordDetailModalProps {
  record: OutboxRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({ record, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isConnected, isSyncing, syncSingleRecord } = useFieldOperations();

  if (!isOpen || !record) return null;

  const handleSyncNow = async () => {
    await syncSingleRecord(record.id);
  };

  const handleViewSource = () => {
    onClose();
    navigate('/field-operations');
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-lg w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sky-300 text-sm">{record.code}</span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-white">{record.typeName}</span>
            </div>
            <p className="text-[11px] text-sky-200/80 mt-0.5">
              {record.source} → {record.destination}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Strip */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Priority:</span>
            {getPriorityBadge(record.priority)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Status:</span>
            {record.status === 'Synced' ? (
              <Badge variant="success" size="sm">SYNCED</Badge>
            ) : record.status === 'Failed' ? (
              <Badge variant="emergency" size="sm">FAILED</Badge>
            ) : record.status === 'Syncing' ? (
              <Badge variant="primary" size="sm">SYNCING</Badge>
            ) : (
              <Badge variant="warning" size="sm">PENDING</Badge>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3.5">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Source Origin</span>
              <span className="font-medium text-slate-800">{record.source}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Destination</span>
              <span className="font-medium text-slate-800">{record.destination}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Generated Timestamp</span>
              <span className="font-mono text-slate-800">{record.timestamp}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Transmission Attempts</span>
              <span className="font-mono text-slate-800">{record.retryCount} attempt(s)</span>
            </div>
          </div>

          {/* Failure Alert if Failed */}
          {record.status === 'Failed' && record.errorReason && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
              <div className="font-semibold flex items-center gap-1.5 text-rose-800">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Transfer Failure Diagnostic</span>
              </div>
              <p className="text-[11px] text-rose-700 leading-relaxed">
                {record.errorReason}
              </p>
            </div>
          )}

          {/* Payload Data Inspection */}
          <div className="space-y-1">
            <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider block">
              Record Payload Data
            </span>
            <div className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-44">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(record.payload, null, 2)}
              </pre>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleViewSource}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <span>View Source</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>

            {record.status !== 'Synced' && (
              <button
                type="button"
                onClick={handleSyncNow}
                disabled={!isConnected || isSyncing}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 ${
                  isConnected && !isSyncing
                    ? 'bg-polar-blue hover:bg-navy-DEFAULT text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Record'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
export default RecordDetailModal;
