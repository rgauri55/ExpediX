import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  EmergencyIncident,
  EmergencySeverity,
  EmergencyCategory,
  IncidentInvestigation,
  IncidentTimelineEvent,
  IncidentEscalation,
} from '../types';
import { INITIAL_EMERGENCY_INCIDENTS } from '../data/demoData';
import { useFieldOperations } from './FieldOperationsContext';

interface NewIncidentInput {
  title?: string;
  category: EmergencyCategory;
  severity: EmergencySeverity;
  location: string;
  description: string;
  affectedPersonnel: string;
  actionTaken?: string;
}

interface EmergencyContextType {
  incidents: EmergencyIncident[];
  activeIncidentId: string;
  activeIncident: EmergencyIncident | undefined;
  selectIncident: (id: string) => void;
  acknowledgeIncident: (id: string) => void;
  startResponse: (id: string) => void;
  requestMedicalSupport: (id: string, notes?: string) => void;
  markPersonnelSafe: (id: string) => void;
  escalateIncident: (
    id: string,
    level: 'Station Response' | 'Expedition Command' | 'External Assistance',
    reason: string
  ) => void;
  submitInvestigationAndClose: (id: string, investigation: IncidentInvestigation) => void;
  reportNewIncident: (data: NewIncidentInput) => string;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

let incidentSeq = 27;

export const EmergencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isConnected, reportIncident } = useFieldOperations();
  const [incidents, setIncidents] = useState<EmergencyIncident[]>(INITIAL_EMERGENCY_INCIDENTS);
  const [activeIncidentId, setActiveIncidentId] = useState<string>('ER-026');

  const activeIncident = incidents.find((inc) => inc.id === activeIncidentId) || incidents[0];

  const selectIncident = (id: string) => {
    setActiveIncidentId(id);
  };

  const acknowledgeIncident = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== id) return inc;
        const newTimelineEvent: IncidentTimelineEvent = {
          id: `t-${Date.now()}`,
          timestamp: '14:45',
          title: 'Incident acknowledged',
          actor: 'Command Center Operator',
          details: 'Incident verified and acknowledged by central command center.',
          type: 'notification',
        };
        return {
          ...inc,
          status: 'Acknowledged',
          timeline: [...inc.timeline, newTimelineEvent],
        };
      })
    );
  };

  const startResponse = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== id) return inc;
        const newTimelineEvent: IncidentTimelineEvent = {
          id: `t-${Date.now()}`,
          timestamp: '14:46',
          title: 'Response initiated',
          actor: 'Field Operations Lead',
          details: 'Operational response protocol started; field team on standby.',
          type: 'first-aid',
        };
        return {
          ...inc,
          status: 'Response in progress',
          timeline: [...inc.timeline, newTimelineEvent],
        };
      })
    );
  };

  const requestMedicalSupport = (id: string, notes?: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== id) return inc;
        const newTimelineEvent: IncidentTimelineEvent = {
          id: `t-${Date.now()}`,
          timestamp: '14:48',
          title: 'Medical support request submitted',
          actor: 'Arjun Singh',
          details: notes || 'Medical tele-consult and auxiliary kit requested from Bharati Station.',
          type: 'support',
        };
        return {
          ...inc,
          timeline: [...inc.timeline, newTimelineEvent],
        };
      })
    );
  };

  const markPersonnelSafe = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== id) return inc;
        const newTimelineEvent: IncidentTimelineEvent = {
          id: `t-${Date.now()}`,
          timestamp: '14:50',
          title: 'Personnel marked safe',
          actor: 'Field Camp Alpha',
          details: 'Field first-aid concluded; all personnel accounted for and stable.',
          type: 'safe',
        };
        const updatedTeam = inc.accountedTeam.map((p) =>
          p.involvement === 'Affected personnel'
            ? { ...p, actionStatus: 'Stable / First-aid completed' }
            : p
        );
        return {
          ...inc,
          status: 'Personnel safe',
          accountedTeam: updatedTeam,
          timeline: [...inc.timeline, newTimelineEvent],
        };
      })
    );
  };

  const escalateIncident = (
    id: string,
    level: 'Station Response' | 'Expedition Command' | 'External Assistance',
    reason: string
  ) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== id) return inc;
        const escalation: IncidentEscalation = {
          level,
          reason,
          timestamp: '14:52',
          authorizedBy: 'Command Center',
        };
        const newTimelineEvent: IncidentTimelineEvent = {
          id: `t-${Date.now()}`,
          timestamp: '14:52',
          title: `Incident escalated to ${level}`,
          actor: 'Command Center',
          details: `Escalation authorization: ${reason}`,
          type: 'escalation',
        };
        return {
          ...inc,
          escalation,
          timeline: [...inc.timeline, newTimelineEvent],
        };
      })
    );
  };

  const submitInvestigationAndClose = (id: string, investigation: IncidentInvestigation) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== id) return inc;
        const newTimelineEvent: IncidentTimelineEvent = {
          id: `t-${Date.now()}`,
          timestamp: '14:55',
          title: 'Incident closed',
          actor: investigation.closedBy || 'Command Center',
          details: investigation.investigationCompleted
            ? `Investigation recorded: ${investigation.summary}`
            : `Closed with justification: ${investigation.justificationReason}`,
          type: 'closure',
        };
        return {
          ...inc,
          status: 'Closed',
          investigation: {
            ...investigation,
            completedAt: '14:55',
            closedBy: investigation.closedBy || 'Command Center',
          },
          timeline: [...inc.timeline, newTimelineEvent],
        };
      })
    );
  };

  const reportNewIncident = (data: NewIncidentInput): string => {
    const code = `ER-0${incidentSeq++}`;
    const syncStatus: 'SYNCED' | 'PENDING SYNC' = isConnected ? 'SYNCED' : 'PENDING SYNC';

    const newIncident: EmergencyIncident = {
      id: code,
      code,
      title: data.title || `${data.category} Incident — ${data.location}`,
      expedition: 'IAE-2026-W03',
      station: 'Bharati Station',
      location: data.location,
      site: 'Field Camp Alpha',
      reportedBy: 'Arjun Singh',
      reporterRole: 'Technician',
      affectedPersonnel: data.affectedPersonnel || 'Field Team Member',
      affectedRole: 'Field Personnel',
      timeReported: '14:50',
      severity: data.severity,
      category: data.category,
      status: 'Reported',
      description: data.description,
      syncStatus,
      offlineCreated: !isConnected,
      accountedTeam: [
        {
          id: `acc-${code}-1`,
          name: data.affectedPersonnel || 'Field Team Member',
          role: 'Field Personnel',
          involvement: 'Affected personnel',
          accountedStatus: 'Accounted for',
          actionStatus: 'Under assessment',
        },
        {
          id: `acc-${code}-2`,
          name: 'Arjun Singh',
          role: 'Technician',
          involvement: 'Reporting member',
          accountedStatus: 'Accounted for',
          actionStatus: 'Assisting',
        },
      ],
      associatedResources: [
        {
          id: `res-${code}-1`,
          name: 'Medical Kit',
          quantity: '1 kit',
          location: 'Field Camp Alpha',
          status: 'Available',
          inventoryId: 'INV-004',
        },
      ],
      timeline: [
        {
          id: `t-${code}-1`,
          timestamp: '14:50',
          title: isConnected ? 'Incident reported (Synced)' : 'Incident reported locally (Pending Sync)',
          actor: 'Arjun Singh',
          details: data.description,
          type: 'report',
        },
      ],
    };

    // If offline, push to FieldOperationsContext outbox
    if (!isConnected) {
      reportIncident({
        severity: data.severity,
        category: data.category,
        location: data.location,
        description: data.description,
        actionTaken: data.actionTaken,
      });
    }

    setIncidents((prev) => [newIncident, ...prev]);
    setActiveIncidentId(code);
    return code;
  };

  return (
    <EmergencyContext.Provider
      value={{
        incidents,
        activeIncidentId,
        activeIncident,
        selectIncident,
        acknowledgeIncident,
        startResponse,
        requestMedicalSupport,
        markPersonnelSafe,
        escalateIncident,
        submitInvestigationAndClose,
        reportNewIncident,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = (): EmergencyContextType => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
