import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  FieldTeamMember,
  FieldTask,
  FieldLogEntry,
  OutboxRecord,
  SyncHistoryEntry,
  FieldResourceAllocated,
} from '../types';
import {
  FIELD_TEAM_MEMBERS,
  INITIAL_FIELD_TASK,
  INITIAL_FIELD_LOGS,
  INITIAL_OUTBOX_RECORDS,
  INITIAL_SYNC_HISTORY,
  FIELD_RESOURCES_ALLOCATED,
} from '../data/demoData';

interface CampInfo {
  name: string;
  gridLocation: string;
  distanceKm: number;
  coordinates: string;
  elevation: string;
  temp: string;
  wind: string;
  weather: string;
  vhfChannel: string;
}

interface IncidentInput {
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  category: 'Medical' | 'Weather' | 'Equipment' | 'Communication' | 'Route / Terrain' | 'Other';
  location?: string;
  description: string;
  actionTaken?: string;
}

interface SupportRequestInput {
  priority: 'Routine' | 'Urgent' | 'Emergency';
  requestType: 'Medical' | 'Logistics' | 'Technical' | 'Communication' | 'Transport';
  details: string;
  itemsRequested?: string[];
}

interface FieldOperationsContextType {
  isConnected: boolean;
  isSyncing: boolean;
  syncProgressStatus: string;
  teamMembers: FieldTeamMember[];
  activeTask: FieldTask;
  activityLog: FieldLogEntry[];
  outbox: OutboxRecord[];
  syncHistory: SyncHistoryEntry[];
  allocatedResources: FieldResourceAllocated[];
  campInfo: CampInfo;
  lastCheckInTime: string;
  nextCheckInTime: string;
  lastSyncTime: string;
  toggleConnectivity: (forcedState?: boolean) => void;
  checkIn: (notes?: string, actor?: string) => void;
  reportMissedCheckIn: () => void;
  updateTaskProgress: (progressPercent: number, notes?: string, currentDepth?: number, samplesRetrieved?: number) => void;
  completeTask: () => void;
  reportIncident: (incident: IncidentInput) => void;
  requestSupport: (request: SupportRequestInput) => void;
  syncOutbox: () => Promise<void>;
  syncSingleRecord: (recordId: string) => Promise<void>;
  retryFailed: (recordId?: string) => Promise<void>;
  clearCompleted: () => void;
}

const FieldOperationsContext = createContext<FieldOperationsContextType | undefined>(undefined);

let recordSeq = 104;

export const FieldOperationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgressStatus, setSyncProgressStatus] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<FieldTeamMember[]>(FIELD_TEAM_MEMBERS);
  const [activeTask, setActiveTask] = useState<FieldTask>(INITIAL_FIELD_TASK);
  const [activityLog, setActivityLog] = useState<FieldLogEntry[]>(INITIAL_FIELD_LOGS);
  const [outbox, setOutbox] = useState<OutboxRecord[]>(INITIAL_OUTBOX_RECORDS);
  const [syncHistory, setSyncHistory] = useState<SyncHistoryEntry[]>(INITIAL_SYNC_HISTORY);
  const [allocatedResources] = useState<FieldResourceAllocated[]>(FIELD_RESOURCES_ALLOCATED);
  const [lastCheckInTime, setLastCheckInTime] = useState<string>('14:20');
  const [nextCheckInTime, setNextCheckInTime] = useState<string>('15:00');
  const [lastSyncTime, setLastSyncTime] = useState<string>('14:23');

  const campInfo: CampInfo = {
    name: 'Field Camp Alpha',
    gridLocation: 'Survey Zone B • 40 km from station',
    distanceKm: 40,
    coordinates: "69°24'12\"S, 76°11'45\"E",
    elevation: '184 m a.s.l.',
    temp: '-24°C',
    wind: '28 kt',
    weather: 'Normal / Passable',
    vhfChannel: 'VHF Ch 16 / Sat-Mesh',
  };

  const getCurrentTimeString = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const toggleConnectivity = (forcedState?: boolean) => {
    setIsConnected((prev) => {
      const nextState = typeof forcedState === 'boolean' ? forcedState : !prev;
      const currentTime = getCurrentTimeString();
      
      if (!nextState) {
        // Going OFFLINE
        const offlineLog: FieldLogEntry = {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          timestamp: currentTime,
          date: '12 Sep 2026',
          actor: 'System',
          type: 'COMMUNICATION',
          title: 'Communication link lost',
          description: 'Field device entered offline mode',
          syncStatus: 'OFFLINE',
          offlineCreated: true,
        };
        setActivityLog((logs) => [offlineLog, ...logs]);
      } else {
        // Restoring CONNECTION
        const onlineLog: FieldLogEntry = {
          id: `LOG-${Date.now().toString().slice(-4)}`,
          timestamp: currentTime,
          date: '12 Sep 2026',
          actor: 'System',
          type: 'COMMUNICATION',
          title: 'Communication link restored',
          description: 'Connected to Bharati Station Command Center.',
          syncStatus: 'SYNCED',
          offlineCreated: false,
        };
        setActivityLog((logs) => [onlineLog, ...logs]);
      }
      return nextState;
    });
  };

  const checkIn = (notes?: string, actor: string = 'Dr. Rohan Sharma') => {
    const currentTime = getCurrentTimeString();
    setLastCheckInTime(currentTime);

    // Calculate next check-in time (40 min later formatted)
    const now = new Date();
    now.setMinutes(now.getMinutes() + 40);
    const nextH = String(now.getHours()).padStart(2, '0');
    const nextM = String(now.getMinutes()).padStart(2, '0');
    setNextCheckInTime(`${nextH}:${nextM}`);

    // Update team members last checkin
    setTeamMembers((prev) =>
      prev.map((m) => ({ ...m, lastCheckIn: currentTime, checkInStatus: 'CHECKED IN' }))
    );

    const checkInId = `LOG-${Date.now().toString().slice(-4)}`;
    const newLog: FieldLogEntry = {
      id: checkInId,
      timestamp: currentTime,
      date: '12 Sep 2026',
      actor,
      type: 'CHECK_IN',
      title: 'Team check-in',
      description: notes || `${actor} (2 of 2 accounted for)`,
      syncStatus: isConnected ? 'SYNCED' : 'PENDING SYNC',
      offlineCreated: !isConnected,
    };

    setActivityLog((prev) => [newLog, ...prev]);

    if (!isConnected) {
      recordSeq += 1;
      const code = `CHK-${recordSeq}`;
      const outboxRecord: OutboxRecord = {
        id: `OUT-${Date.now().toString().slice(-4)}`,
        code,
        type: 'CHECK_IN',
        typeName: 'Team Check-in',
        title: 'Team Check-in',
        source: 'Field Camp Alpha',
        destination: 'Bharati Command Center',
        timestamp: currentTime,
        priority: 'Safety',
        statusText: 'Pending transmission',
        payload: { logId: checkInId, notes, actor, timestamp: currentTime, teamStatus: '2 of 2 accounted for' },
        retryCount: 0,
        status: 'Pending',
      };
      setOutbox((prev) => [outboxRecord, ...prev]);
    }
  };

  const reportMissedCheckIn = () => {
    const currentTime = getCurrentTimeString();
    const logId = `LOG-${Date.now().toString().slice(-4)}`;
    const newLog: FieldLogEntry = {
      id: logId,
      timestamp: currentTime,
      date: '12 Sep 2026',
      actor: 'Station Watch Officer',
      type: 'CHECK_IN',
      title: 'Missed check-in advisory',
      description: 'Scheduled window reached without radio ping. Standby listening on VHF Ch 16 active.',
      syncStatus: isConnected ? 'SYNCED' : 'PENDING SYNC',
      offlineCreated: !isConnected,
    };
    setActivityLog((prev) => [newLog, ...prev]);
  };

  const updateTaskProgress = (
    progressPercent: number,
    notes?: string,
    currentDepth?: number,
    samplesRetrieved?: number
  ) => {
    const currentTime = getCurrentTimeString();
    const clampedProgress = Math.max(0, Math.min(100, progressPercent));
    const targetDepth = activeTask.targetDepth || 120;
    const computedDepth = currentDepth !== undefined ? currentDepth : Math.round((clampedProgress / 100) * targetDepth);
    const computedSamples = samplesRetrieved !== undefined ? samplesRetrieved : Math.round((clampedProgress / 100) * 20);

    setActiveTask((prev) => ({
      ...prev,
      progressPercent: clampedProgress,
      currentDepth: computedDepth,
      samplesRetrieved: computedSamples,
      notes: notes || prev.notes,
      lastUpdated: currentTime,
      status: clampedProgress >= 100 ? 'COMPLETED' : 'IN PROGRESS',
    }));

    const updateLogId = `LOG-${Date.now().toString().slice(-4)}`;
    const newLog: FieldLogEntry = {
      id: updateLogId,
      timestamp: currentTime,
      date: '12 Sep 2026',
      actor: 'Dr. Rohan Sharma',
      type: 'PROGRESS_UPDATE',
      title: 'Survey progress updated',
      description: notes || `Ice Core Survey → ${clampedProgress}% (Depth ${computedDepth}m, ${computedSamples} core canisters)`,
      syncStatus: isConnected ? 'SYNCED' : 'PENDING SYNC',
      offlineCreated: !isConnected,
      metadata: { progressPercent: clampedProgress, depth: computedDepth, samples: computedSamples },
    };

    setActivityLog((prev) => [newLog, ...prev]);

    if (!isConnected) {
      recordSeq += 1;
      const code = `TASK-${recordSeq}`;
      const outboxRecord: OutboxRecord = {
        id: `OUT-${Date.now().toString().slice(-4)}`,
        code,
        type: 'PROGRESS_UPDATE',
        typeName: 'Task Progress',
        title: 'Task Progress',
        source: 'Field Camp Alpha',
        destination: 'Bharati Command Center',
        timestamp: currentTime,
        priority: 'Operational',
        statusText: 'Pending transmission',
        payload: { logId: updateLogId, taskId: 'TSK-084', progressPercent: clampedProgress, depth: computedDepth, samples: computedSamples, notes },
        retryCount: 0,
        status: 'Pending',
      };
      setOutbox((prev) => [outboxRecord, ...prev]);
    }
  };

  const completeTask = () => {
    updateTaskProgress(100, 'Ice Core Survey target depth and core sample extraction quota 100% complete.');
  };

  const reportIncident = (incident: IncidentInput) => {
    const currentTime = getCurrentTimeString();
    const incLogId = `LOG-${Date.now().toString().slice(-4)}`;

    const newLog: FieldLogEntry = {
      id: incLogId,
      timestamp: currentTime,
      date: '12 Sep 2026',
      actor: 'Arjun Singh',
      type: 'INCIDENT',
      title: isConnected
        ? `Incident logged: [${incident.severity.toUpperCase()}] ${incident.category}`
        : `Incident saved locally: [${incident.severity.toUpperCase()}] ${incident.category}`,
      description: `${incident.description}${incident.actionTaken ? ` • Action: ${incident.actionTaken}` : ''}`,
      syncStatus: isConnected ? 'SYNCED' : 'PENDING SYNC',
      offlineCreated: !isConnected,
      metadata: incident,
    };

    setActivityLog((prev) => [newLog, ...prev]);

    if (!isConnected) {
      recordSeq += 1;
      const code = `INC-${recordSeq}`;
      const priority = incident.severity === 'Critical' ? 'Critical' : incident.severity === 'High' ? 'Safety' : 'Operational';
      const outboxRecord: OutboxRecord = {
        id: `OUT-${Date.now().toString().slice(-4)}`,
        code,
        type: 'INCIDENT',
        typeName: 'Incident Report',
        title: 'Incident Report',
        source: incident.location || 'Survey Zone B',
        destination: 'Bharati Command Center',
        timestamp: currentTime,
        priority,
        statusText: 'Pending transmission',
        payload: { logId: incLogId, ...incident },
        retryCount: 0,
        status: 'Pending',
      };
      setOutbox((prev) => [outboxRecord, ...prev]);
    }
  };

  const requestSupport = (request: SupportRequestInput) => {
    const currentTime = getCurrentTimeString();
    const supLogId = `LOG-${Date.now().toString().slice(-4)}`;

    const itemsSummary = request.itemsRequested && request.itemsRequested.length > 0
      ? ` • Items: ${request.itemsRequested.join(', ')}`
      : '';

    const newLog: FieldLogEntry = {
      id: supLogId,
      timestamp: currentTime,
      date: '12 Sep 2026',
      actor: 'Dr. Rohan Sharma',
      type: 'SUPPORT_REQUEST',
      title: isConnected
        ? `Support request sent: [${request.priority.toUpperCase()}] ${request.requestType}`
        : `Support request recorded locally: [${request.priority.toUpperCase()}] ${request.requestType}`,
      description: `${request.details}${itemsSummary}`,
      syncStatus: isConnected ? 'SYNCED' : 'PENDING SYNC',
      offlineCreated: !isConnected,
      metadata: request,
    };

    setActivityLog((prev) => [newLog, ...prev]);

    if (!isConnected) {
      recordSeq += 1;
      const code = `SUP-${recordSeq}`;
      const priority = request.priority === 'Emergency' ? 'Critical' : request.priority === 'Urgent' ? 'Safety' : 'Operational';
      const outboxRecord: OutboxRecord = {
        id: `OUT-${Date.now().toString().slice(-4)}`,
        code,
        type: 'SUPPORT_REQUEST',
        typeName: 'Support Request',
        title: 'Support Request',
        source: 'Field Camp Alpha',
        destination: 'Bharati Command Center',
        timestamp: currentTime,
        priority,
        statusText: 'Pending transmission',
        payload: { logId: supLogId, ...request },
        retryCount: 0,
        status: 'Pending',
      };
      setOutbox((prev) => [outboxRecord, ...prev]);
    }
  };

  const syncOutbox = async () => {
    const pendingItems = outbox.filter((r) => r.status === 'Pending' || r.status === 'Failed');
    if (pendingItems.length === 0) return;
    
    setIsSyncing(true);
    setSyncProgressStatus(`Synchronizing ${pendingItems.length} records...`);

    // Simulate priority-ordered sync progression
    setOutbox((prev) =>
      prev.map((r) => (r.status === 'Pending' || r.status === 'Failed' ? { ...r, status: 'Syncing', statusText: 'Syncing...' } : r))
    );

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const currentTime = getCurrentTimeString();
    const syncedCount = pendingItems.length;

    // Transition pending items to Synced
    setOutbox((prev) =>
      prev.map((r) => (r.status === 'Syncing' ? { ...r, status: 'Synced', statusText: 'Synchronized' } : r))
    );

    // Update all pending activity logs to SYNCED
    setActivityLog((prev) =>
      prev.map((log) => (log.syncStatus === 'PENDING SYNC' ? { ...log, syncStatus: 'SYNCED' } : log))
    );

    // Append to sync history
    const historyEntry: SyncHistoryEntry = {
      id: `sh-${Date.now()}`,
      timestamp: currentTime,
      title: `${syncedCount} records synchronized`,
      details: 'Field Camp Alpha → Bharati Command Center (Safety, operational & check-in telemetry)',
      recordsCount: syncedCount,
      source: 'Field Camp Alpha',
      destination: 'Bharati Command Center',
      status: 'SUCCESS',
    };

    setSyncHistory((prev) => [historyEntry, ...prev]);

    // Add a confirmation log entry to activity log
    const syncLogId = `LOG-${Date.now().toString().slice(-4)}`;
    const syncConfirmationLog: FieldLogEntry = {
      id: syncLogId,
      timestamp: currentTime,
      date: '12 Sep 2026',
      actor: 'System Engine',
      type: 'SYNC',
      title: `Synchronization complete (${syncedCount} records synced)`,
      description: `All locally queued offline records synchronized with Bharati Command Center.`,
      syncStatus: 'SYNCED',
      offlineCreated: false,
    };

    setActivityLog((prev) => [syncConfirmationLog, ...prev]);
    setLastSyncTime(currentTime);
    setSyncProgressStatus(`${syncedCount} records synchronized`);
    setIsSyncing(false);
  };

  const syncSingleRecord = async (recordId: string) => {
    const target = outbox.find((r) => r.id === recordId || r.code === recordId);
    if (!target) return;

    setIsSyncing(true);
    setSyncProgressStatus(`Synchronizing ${target.code}...`);

    setOutbox((prev) =>
      prev.map((r) => (r.id === target.id ? { ...r, status: 'Syncing', statusText: 'Syncing...' } : r))
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    const currentTime = getCurrentTimeString();
    setOutbox((prev) =>
      prev.map((r) => (r.id === target.id ? { ...r, status: 'Synced', statusText: 'Synchronized', errorReason: undefined } : r))
    );

    const historyEntry: SyncHistoryEntry = {
      id: `sh-${Date.now()}`,
      timestamp: currentTime,
      title: `1 record synchronized (${target.code})`,
      details: `${target.typeName} transmitted to Bharati Command Center`,
      recordsCount: 1,
      source: target.source,
      destination: target.destination,
      status: 'SUCCESS',
    };

    setSyncHistory((prev) => [historyEntry, ...prev]);
    setLastSyncTime(currentTime);
    setSyncProgressStatus(`${target.code} synchronized`);
    setIsSyncing(false);
  };

  const retryFailed = async () => {
    const failedItems = outbox.filter((r) => r.status === 'Failed');
    if (failedItems.length === 0) return;

    setIsSyncing(true);
    setSyncProgressStatus(`Retrying ${failedItems.length} failed transmission(s)...`);

    setOutbox((prev) =>
      prev.map((r) => (r.status === 'Failed' ? { ...r, status: 'Syncing', statusText: 'Retrying...' } : r))
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const currentTime = getCurrentTimeString();
    setOutbox((prev) =>
      prev.map((r) => (r.status === 'Syncing' ? { ...r, status: 'Synced', statusText: 'Synchronized', errorReason: undefined } : r))
    );

    const historyEntry: SyncHistoryEntry = {
      id: `sh-${Date.now()}`,
      timestamp: currentTime,
      title: `${failedItems.length} failed record(s) reconciled`,
      details: 'Retried transfer succeeded to Bharati Command Center',
      recordsCount: failedItems.length,
      source: 'Field Camp Alpha',
      destination: 'Bharati Command Center',
      status: 'SUCCESS',
    };

    setSyncHistory((prev) => [historyEntry, ...prev]);
    setLastSyncTime(currentTime);
    setSyncProgressStatus(`${failedItems.length} record(s) synchronized`);
    setIsSyncing(false);
  };

  const clearCompleted = () => {
    setOutbox((prev) => prev.filter((r) => r.status !== 'Synced'));
  };

  return (
    <FieldOperationsContext.Provider
      value={{
        isConnected,
        isSyncing,
        syncProgressStatus,
        teamMembers,
        activeTask,
        activityLog,
        outbox,
        syncHistory,
        allocatedResources,
        campInfo,
        lastCheckInTime,
        nextCheckInTime,
        lastSyncTime,
        toggleConnectivity,
        checkIn,
        reportMissedCheckIn,
        updateTaskProgress,
        completeTask,
        reportIncident,
        requestSupport,
        syncOutbox,
        syncSingleRecord,
        retryFailed,
        clearCompleted,
      }}
    >
      {children}
    </FieldOperationsContext.Provider>
  );
};

export const useFieldOperations = () => {
  const context = useContext(FieldOperationsContext);
  if (!context) {
    throw new Error('useFieldOperations must be used within a FieldOperationsProvider');
  }
  return context;
};
