import React, { createContext, useContext, useState } from 'react';
import type { PersonnelMember, MovementRecord } from '../types';
import {
  PERSONNEL_DATA,
  PERSONNEL_MOVEMENTS,
  PERSONNEL_SUMMARY_STATS,
  SAFETY_ALERT_ZONE_B,
} from '../data/demoData';

interface PersonnelContextType {
  personnel: PersonnelMember[];
  movements: MovementRecord[];
  summaryStats: {
    totalDeployed: string;
    atBharati: string;
    inField: string;
    onAssignment: string;
  };
  safetyAlert: typeof SAFETY_ALERT_ZONE_B;
  getPersonnelById: (id: string) => PersonnelMember | undefined;
  assignPersonnel: (newAssignment: {
    expeditionId: string;
    personnelName: string;
    role: string;
    team: string;
    assignment: string;
    deploymentLocation: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  recordMovement: (newMovement: Omit<MovementRecord, 'id' | 'timestamp'>) => void;
}

const PersonnelContext = createContext<PersonnelContextType | undefined>(undefined);

export const PersonnelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personnel, setPersonnel] = useState<PersonnelMember[]>(PERSONNEL_DATA);
  const [movements, setMovements] = useState<MovementRecord[]>(PERSONNEL_MOVEMENTS);
  const [summaryStats] = useState(PERSONNEL_SUMMARY_STATS);
  const [safetyAlert] = useState(SAFETY_ALERT_ZONE_B);

  const getPersonnelById = (id: string): PersonnelMember | undefined => {
    return personnel.find(
      (p) => p.id.toLowerCase() === id.toLowerCase() || p.name.toLowerCase() === id.toLowerCase()
    );
  };

  const assignPersonnel = (data: {
    expeditionId: string;
    personnelName: string;
    role: string;
    team: string;
    assignment: string;
    deploymentLocation: string;
    startDate?: string;
    endDate?: string;
  }) => {
    // Check if member already exists
    const existingIndex = personnel.findIndex(
      (p) => p.name.toLowerCase() === data.personnelName.toLowerCase()
    );

    if (existingIndex >= 0) {
      const updated = [...personnel];
      const existing = updated[existingIndex];
      const isField = data.deploymentLocation.toLowerCase().includes('camp') || 
                      data.deploymentLocation.toLowerCase().includes('zone') || 
                      data.deploymentLocation.toLowerCase().includes('route');

      updated[existingIndex] = {
        ...existing,
        role: data.role || existing.role,
        team: data.team || existing.team,
        assignment: data.assignment || existing.assignment,
        currentLocation: data.deploymentLocation || existing.currentLocation,
        status: isField ? 'In Field' : 'Active',
        lastUpdate: 'Just now',
      };
      setPersonnel(updated);

      // Also record movement
      const newMovement: MovementRecord = {
        id: `mov_${Date.now()}`,
        personnelId: existing.id,
        personnelName: existing.name,
        fromLocation: existing.currentLocation,
        toLocation: data.deploymentLocation,
        timestamp: 'Just now',
        dateFormatted: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        transportMode: 'Expedition Transport Carrier',
        purpose: data.assignment,
      };
      setMovements((prev) => [newMovement, ...prev]);
    } else {
      // New member addition
      const newId = `PRS-0${personnel.length + 1 < 10 ? '0' : ''}${personnel.length + 1}`;
      const isField = data.deploymentLocation.toLowerCase().includes('camp') || 
                      data.deploymentLocation.toLowerCase().includes('zone') || 
                      data.deploymentLocation.toLowerCase().includes('route');
      
      const newMember: PersonnelMember = {
        id: newId,
        name: data.personnelName,
        callsign: `EXP-${personnel.length + 1}`,
        role: data.role,
        team: data.team,
        expeditionId: data.expeditionId || 'IAE-2026-W03',
        expeditionName: 'Indian Antarctic Expedition — Winter Scientific Mission 2026',
        station: 'Bharati Station • Antarctica',
        currentLocation: data.deploymentLocation,
        assignment: data.assignment,
        status: isField ? 'In Field' : 'Active',
        lastUpdate: 'Just now',
        safetyStatus: 'Normal',
        safetyNote: 'New deployment roster entry initialized.',
        email: `${data.personnelName.toLowerCase().replace(/[^a-z]/g, '')}@operations.expedix.demo`,
        bloodGroup: 'O+',
        emergencyContact: '+91-11-2468-9000 (Central Operations)',
        assignedAssets: ['Polar Standard Sat-Com Transceiver', 'Emergency Survival Beacon'],
        qualifications: ['Polar Orientation Certified', 'First Responder'],
        movementHistory: [
          {
            id: `mh_${Date.now()}`,
            personnelId: newId,
            personnelName: data.personnelName,
            fromLocation: 'Staging Port',
            toLocation: data.deploymentLocation,
            timestamp: 'Just now',
            dateFormatted: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            transportMode: 'Expedition Air/Sea Carrier',
            purpose: data.assignment,
          },
        ],
        isSimulation: true,
      };

      setPersonnel((prev) => [newMember, ...prev]);
    }
  };

  const recordMovement = (newMovement: Omit<MovementRecord, 'id' | 'timestamp'>) => {
    const record: MovementRecord = {
      ...newMovement,
      id: `mov_${Date.now()}`,
      timestamp: 'Just now',
    };
    setMovements((prev) => [record, ...prev]);
  };

  return (
    <PersonnelContext.Provider
      value={{
        personnel,
        movements,
        summaryStats,
        safetyAlert,
        getPersonnelById,
        assignPersonnel,
        recordMovement,
      }}
    >
      {children}
    </PersonnelContext.Provider>
  );
};

export const usePersonnel = (): PersonnelContextType => {
  const context = useContext(PersonnelContext);
  if (!context) {
    throw new Error('usePersonnel must be used within a PersonnelProvider');
  }
  return context;
};
