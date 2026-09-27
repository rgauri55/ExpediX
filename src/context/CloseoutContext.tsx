import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  PersonnelDeinduction,
  AssetRecoveryItem,
  BackloadItem,
  ScientificSampleReturn,
  StationHandoverItem,
  CloseoutDocument,
} from '../types';
import {
  INITIAL_CLOSEOUT_STAGES,
  INITIAL_PERSONNEL_DEINDUCTION,
  INITIAL_ASSET_RECOVERY,
  INITIAL_BACKLOAD_MANIFEST,
  INITIAL_SCIENTIFIC_SAMPLES,
  INITIAL_STATION_HANDOVER,
  INITIAL_CLOSEOUT_DOCUMENTS,
} from '../data/demoData';

interface CloseoutContextType {
  missionStatus: 'Return Preparation' | 'Closed';
  closedInfo: { closedBy: string; timestamp: string } | null;
  stages: typeof INITIAL_CLOSEOUT_STAGES;
  personnel: PersonnelDeinduction[];
  assets: AssetRecoveryItem[];
  backload: BackloadItem[];
  samples: ScientificSampleReturn[];
  handover: StationHandoverItem[];
  documents: CloseoutDocument[];
  completionPercentage: number;
  readinessRequirements: {
    id: string;
    title: string;
    isComplete: boolean;
    mandatory: boolean;
  }[];
  updatePersonnel: (id: string, updates: Partial<PersonnelDeinduction>) => void;
  updateAsset: (id: string, updates: Partial<AssetRecoveryItem>) => void;
  updateBackload: (id: string, updates: Partial<BackloadItem>) => void;
  addBackload: (item: Omit<BackloadItem, 'id'>) => void;
  updateSample: (id: string, updates: Partial<ScientificSampleReturn>) => void;
  toggleHandover: (id: string) => void;
  updateDocument: (id: string, updates: Partial<CloseoutDocument>) => void;
  addDocument: (item: Omit<CloseoutDocument, 'id'>) => void;
  closeExpedition: (closedBy?: string) => boolean;
}

const CloseoutContext = createContext<CloseoutContextType | undefined>(undefined);

export const CloseoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [missionStatus, setMissionStatus] = useState<'Return Preparation' | 'Closed'>('Return Preparation');
  const [closedInfo, setClosedInfo] = useState<{ closedBy: string; timestamp: string } | null>(null);
  const [stages, setStages] = useState(INITIAL_CLOSEOUT_STAGES);
  const [personnel, setPersonnel] = useState<PersonnelDeinduction[]>(INITIAL_PERSONNEL_DEINDUCTION);
  const [assets, setAssets] = useState<AssetRecoveryItem[]>(INITIAL_ASSET_RECOVERY);
  const [backload, setBackload] = useState<BackloadItem[]>(INITIAL_BACKLOAD_MANIFEST);
  const [samples, setSamples] = useState<ScientificSampleReturn[]>(INITIAL_SCIENTIFIC_SAMPLES);
  const [handover, setHandover] = useState<StationHandoverItem[]>(INITIAL_STATION_HANDOVER);
  const [documents, setDocuments] = useState<CloseoutDocument[]>(INITIAL_CLOSEOUT_DOCUMENTS);

  // Dynamic readiness calculations
  const allPersonnelReady = personnel.every((p) => p.departureStatus === 'Ready' || p.departureStatus === 'Departed');
  const allAssetsAccounted = assets.every((a) => a.recoveryStatus !== 'Recovery Pending');
  const allBackloadVerified = backload.every((b) => b.status === 'Prepared' || b.status === 'Packed' || b.status === 'Dispatched');
  const allSamplesApproved = samples.every((s) => s.status === 'Ready for Backload' || s.status === 'Verified' || s.status === 'Approved');
  const handoverComplete = handover.every((h) => h.isCompleted);
  const reportsComplete = documents.every((d) => d.status === 'Completed' || d.status === 'Ready for Review');

  const readinessRequirements = [
    { id: 'req-1', title: 'Personnel accounted for & cleared', isComplete: allPersonnelReady, mandatory: true },
    { id: 'req-2', title: 'Asset recovery & reconciliation', isComplete: allAssetsAccounted, mandatory: true },
    { id: 'req-3', title: 'Inventory reconciliation', isComplete: true, mandatory: true },
    { id: 'req-4', title: 'Backload manifest verified', isComplete: allBackloadVerified, mandatory: true },
    { id: 'req-5', title: 'Scientific samples documented', isComplete: allSamplesApproved, mandatory: true },
    { id: 'req-6', title: 'Station handover completed', isComplete: handoverComplete, mandatory: true },
    { id: 'req-7', title: 'Incident records closed (ER-026)', isComplete: true, mandatory: true },
    { id: 'req-8', title: 'Final reports submitted & approved', isComplete: reportsComplete, mandatory: true },
  ];

  const completedReqs = readinessRequirements.filter((r) => r.isComplete).length;
  const rawPercentage = Math.round((completedReqs / readinessRequirements.length) * 100);
  const completionPercentage = missionStatus === 'Closed' ? 100 : Math.min(rawPercentage, 95);

  const updatePersonnel = (id: string, updates: Partial<PersonnelDeinduction>) => {
    setPersonnel((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, ...updates };
        // Auto calculate departure status if medical and equipment are returned
        if (updated.medicalClearance === 'Cleared' && updated.equipmentReturned === 'Returned' && updated.travelStatus === 'Confirmed') {
          updated.departureStatus = 'Ready';
        }
        return updated;
      })
    );
  };

  const updateAsset = (id: string, updates: Partial<AssetRecoveryItem>) => {
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const updateBackload = (id: string, updates: Partial<BackloadItem>) => {
    setBackload((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const addBackload = (item: Omit<BackloadItem, 'id'>) => {
    const newItem: BackloadItem = {
      ...item,
      id: `bl-${Date.now()}`,
    };
    setBackload((prev) => [...prev, newItem]);
  };

  const updateSample = (id: string, updates: Partial<ScientificSampleReturn>) => {
    setSamples((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const toggleHandover = (id: string) => {
    setHandover((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const nextState = !h.isCompleted;
        return {
          ...h,
          isCompleted: nextState,
          completedBy: nextState ? 'Priya Nair' : undefined,
          completedAt: nextState ? '18 Sep 09:15' : undefined,
        };
      })
    );
  };

  const updateDocument = (id: string, updates: Partial<CloseoutDocument>) => {
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const addDocument = (item: Omit<CloseoutDocument, 'id'>) => {
    const newDoc: CloseoutDocument = {
      ...item,
      id: `doc-${Date.now()}`,
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const closeExpedition = (closedBy: string = 'Command Center Lead') => {
    const allMandatoryDone = readinessRequirements.filter((r) => r.mandatory).every((r) => r.isComplete);
    if (!allMandatoryDone) {
      return false;
    }

    setMissionStatus('Closed');
    setClosedInfo({
      closedBy,
      timestamp: '18 Sep 2026 14:00 UTC',
    });

    setStages((prev) =>
      prev.map((s) => ({
        ...s,
        status: 'Complete' as const,
        completion: 100,
      }))
    );

    return true;
  };

  return (
    <CloseoutContext.Provider
      value={{
        missionStatus,
        closedInfo,
        stages,
        personnel,
        assets,
        backload,
        samples,
        handover,
        documents,
        completionPercentage,
        readinessRequirements,
        updatePersonnel,
        updateAsset,
        updateBackload,
        addBackload,
        updateSample,
        toggleHandover,
        updateDocument,
        addDocument,
        closeExpedition,
      }}
    >
      {children}
    </CloseoutContext.Provider>
  );
};

export const useCloseout = (): CloseoutContextType => {
  const context = useContext(CloseoutContext);
  if (!context) {
    throw new Error('useCloseout must be used within a CloseoutProvider');
  }
  return context;
};
