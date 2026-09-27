import React, { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type {
  KnowledgeRecord,
  KnowledgeClassification,
} from '../types';
import { INITIAL_KNOWLEDGE_RECORDS } from '../data/demoData';

interface KnowledgeContextType {
  records: KnowledgeRecord[];
  filteredRecords: KnowledgeRecord[];
  summaryCounts: {
    total: number;
    awaitingValidation: number;
    underReview: number;
    approved: number;
    public: number;
  };
  workflowCounts: {
    collected: number;
    validated: number;
    classified: number;
    review: number;
    approved: number;
    published: number;
  };
  // Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedType: string;
  setSelectedType: (t: string) => void;
  selectedExpedition: string;
  setSelectedExpedition: (e: string) => void;
  selectedLocation: string;
  setSelectedLocation: (l: string) => void;
  selectedClassification: string;
  setSelectedClassification: (c: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  selectedResearchArea: string;
  setSelectedResearchArea: (r: string) => void;
  selectedWorkflowStage: string;
  setSelectedWorkflowStage: (w: string) => void;
  resetFilters: () => void;
  
  // Actions
  getRecordById: (id: string) => KnowledgeRecord | undefined;
  completeValidationCheck: (recordId: string, checkId: string) => void;
  completeAllValidation: (recordId: string) => void;
  updateClassification: (recordId: string, classification: KnowledgeClassification) => void;
  toggleReviewChecklistItem: (recordId: string, itemId: string) => void;
  approveRecord: (recordId: string, reviewer?: string) => void;
  rejectRecord: (recordId: string, reason?: string) => void;
  requestChanges: (recordId: string, notes?: string) => void;
  updateAIDraft: (recordId: string, summary: string, keywords: string[]) => void;
  publishRecordToPortal: (recordId: string, publishedBy?: string) => { success: boolean; message?: string };
  addKnowledgeRecord: (item: Partial<KnowledgeRecord>) => KnowledgeRecord;
}

const KnowledgeContext = createContext<KnowledgeContextType | undefined>(undefined);

export const KnowledgeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<KnowledgeRecord[]>(INITIAL_KNOWLEDGE_RECORDS);

  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedExpedition, setSelectedExpedition] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedResearchArea, setSelectedResearchArea] = useState<string>('All');
  const [selectedWorkflowStage, setSelectedWorkflowStage] = useState<string>('All');

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedExpedition('All');
    setSelectedLocation('All');
    setSelectedClassification('All');
    setSelectedStatus('All');
    setSelectedResearchArea('All');
    setSelectedWorkflowStage('All');
  };

  const getRecordById = (id: string) => {
    return records.find((r) => r.id.toLowerCase() === id.toLowerCase());
  };

  const completeValidationCheck = (recordId: string, checkId: string) => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        const updatedChecks = rec.validationChecks.map((c) =>
          c.id === checkId ? { ...c, status: 'passed' as const, detail: 'Validation requirement fulfilled' } : c
        );
        const allPassed = updatedChecks.every((c) => c.status === 'passed');
        return {
          ...rec,
          validationChecks: updatedChecks,
          validationStatus: allPassed ? 'Valid' : 'Needs Review',
          dataCompleteness: allPassed ? 100 : rec.dataCompleteness,
          updatedAt: '18 Sep 2026',
        };
      })
    );
  };

  const completeAllValidation = (recordId: string) => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        const updatedChecks = rec.validationChecks.map((c) => ({
          ...c,
          status: 'passed' as const,
          detail: c.detail ? `${c.detail} (Verified)` : 'Verified',
        }));
        return {
          ...rec,
          validationChecks: updatedChecks,
          validationStatus: 'Valid',
          dataCompleteness: 100,
          updatedAt: '18 Sep 2026',
        };
      })
    );
  };

  const updateClassification = (recordId: string, classification: KnowledgeClassification) => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        const newVersion = `v${(parseFloat(rec.version.replace('v', '')) + 0.1).toFixed(1)}`;
        return {
          ...rec,
          classification,
          version: newVersion,
          updatedAt: '18 Sep 2026',
          versionHistory: [
            {
              version: newVersion,
              changedBy: 'Priya Nair (Logistics & Data Officer)',
              change: `Classification updated to ${classification}`,
              date: '18 Sep 2026',
              status: rec.status,
            },
            ...rec.versionHistory,
          ],
        };
      })
    );
  };

  const toggleReviewChecklistItem = (recordId: string, itemId: string) => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        const updatedChecklist = rec.reviewChecklist.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        );
        return {
          ...rec,
          reviewChecklist: updatedChecklist,
        };
      })
    );
  };

  const approveRecord = (recordId: string, reviewer: string = 'Dr. Ananya Mehta (Expedition Lead)') => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        const newVersion = `v${(parseFloat(rec.version.replace('v', '')) + 0.1).toFixed(1)}`;
        return {
          ...rec,
          status: 'Approved',
          reviewer,
          reviewStatus: 'Approved',
          reviewChecklist: rec.reviewChecklist.map((c) => ({ ...c, checked: true })),
          version: newVersion,
          updatedAt: '18 Sep 2026',
          versionHistory: [
            {
              version: newVersion,
              changedBy: reviewer,
              change: 'Human review completed — Approved for archival / publication eligibility',
              date: '18 Sep 2026',
              status: 'Approved',
            },
            ...rec.versionHistory,
          ],
        };
      })
    );
  };

  const rejectRecord = (recordId: string, reason: string = 'Data quality discrepancies') => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        return {
          ...rec,
          reviewStatus: 'Rejected',
          updatedAt: '18 Sep 2026',
          versionHistory: [
            {
              version: rec.version,
              changedBy: 'Review Committee',
              change: `Record rejected: ${reason}`,
              date: '18 Sep 2026',
              status: 'Draft',
            },
            ...rec.versionHistory,
          ],
        };
      })
    );
  };

  const requestChanges = (recordId: string, notes: string = 'Please attach instrument calibration certificate') => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        return {
          ...rec,
          reviewStatus: 'Changes Requested',
          status: 'Validation',
          updatedAt: '18 Sep 2026',
          versionHistory: [
            {
              version: rec.version,
              changedBy: 'Dr. Ananya Mehta',
              change: `Changes requested: ${notes}`,
              date: '18 Sep 2026',
              status: 'Validation',
            },
            ...rec.versionHistory,
          ],
        };
      })
    );
  };

  const updateAIDraft = (recordId: string, summary: string, keywords: string[]) => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        return {
          ...rec,
          aiSummary: summary,
          aiKeywords: keywords,
          updatedAt: '18 Sep 2026',
        };
      })
    );
  };

  const publishRecordToPortal = (recordId: string, publishedBy: string = 'Dr. Ananya Mehta (Expedition Lead)') => {
    const target = records.find((r) => r.id === recordId);
    if (!target) return { success: false, message: 'Record not found.' };

    if (target.classification !== 'Public') {
      return {
        success: false,
        message: `Publication unavailable: Record classification is ${target.classification}.`,
      };
    }

    if (target.status !== 'Approved') {
      return {
        success: false,
        message: 'Publication unavailable: Record requires Human Review approval first.',
      };
    }

    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        const newVersion = `v${(parseFloat(rec.version.replace('v', '')) + 0.1).toFixed(1)}`;
        return {
          ...rec,
          status: 'Published',
          publicationStatus: 'Published',
          publishedAt: '18 Sep 2026 14:30 UTC',
          publishedBy,
          version: newVersion,
          updatedAt: '18 Sep 2026',
          versionHistory: [
            {
              version: newVersion,
              changedBy: publishedBy,
              change: 'Published to ExpediX Public Research Portal',
              date: '18 Sep 2026',
              status: 'Published',
            },
            ...rec.versionHistory,
          ],
        };
      })
    );

    return { success: true };
  };

  const addKnowledgeRecord = (item: Partial<KnowledgeRecord>): KnowledgeRecord => {
    const newId = `KN-00${records.length + 1}`;
    const newRec: KnowledgeRecord = {
      id: newId,
      title: item.title || 'Untitled Knowledge Record',
      type: item.type || 'Dataset',
      expeditionId: item.expeditionId || 'IAE-2026-W03',
      location: item.location || 'Bharati Station',
      researchArea: item.researchArea || 'Glaciology',
      owner: item.owner || 'Dr. Rohan Sharma',
      classification: item.classification || 'Controlled',
      status: 'Validation',
      createdAt: '18 Sep 2026',
      updatedAt: '18 Sep 2026',
      version: 'v1.0',
      source: item.source || 'Field Operations',
      sourceRecord: item.sourceRecord || 'TASK-220',
      collectionMethod: item.collectionMethod || 'Instrument Sensor Array',
      dataCompleteness: 85,
      validationStatus: 'Needs Review',
      validationChecks: [
        { id: 'v1', label: 'Source identified', status: 'passed', detail: 'Verified' },
        { id: 'v2', label: 'Expedition identified', status: 'passed', detail: 'IAE-2026-W03' },
        { id: 'v3', label: 'Researcher identified', status: 'passed', detail: item.owner || 'Logged' },
        { id: 'v4', label: 'Calibration document pending', status: 'warning', detail: 'Pending verification' },
      ],
      reviewer: 'Dr. Ananya Mehta',
      reviewStatus: 'Pending',
      reviewChecklist: [
        { id: 'chk-1', label: 'Scientific metadata reviewed', checked: true },
        { id: 'chk-2', label: 'Source expedition verified', checked: true },
        { id: 'chk-3', label: 'Publication suitability reviewed', checked: false },
      ],
      aiSummary: item.aiSummary || `Dataset summarizing observational parameters collected during ${item.expeditionId || 'IAE-2026-W03'}.`,
      aiKeywords: item.aiKeywords || ['Antarctica', 'Polar Science', item.researchArea || 'Research'],
      aiConfidence: 'Simulated',
      versionHistory: [
        {
          version: 'v1.0',
          changedBy: item.owner || 'Expedition Lead',
          change: 'Initial record ingestion',
          date: '18 Sep 2026',
          status: 'Validation',
        },
      ],
      relatedRecords: [
        { id: 'IAE-2026-W03', type: 'Expedition', title: 'Indian Antarctic Expedition', link: '/expeditions/IAE-2026-W03' },
      ],
      publicationStatus: 'Not Published',
    };

    setRecords((prev) => [newRec, ...prev]);
    return newRec;
  };

  // Filter logic
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQ =
          rec.id.toLowerCase().includes(q) ||
          rec.title.toLowerCase().includes(q) ||
          rec.owner.toLowerCase().includes(q) ||
          rec.sourceRecord.toLowerCase().includes(q) ||
          rec.researchArea.toLowerCase().includes(q) ||
          rec.aiKeywords.some((k) => k.toLowerCase().includes(q));
        if (!matchesQ) return false;
      }

      // Type filter
      if (selectedType !== 'All' && rec.type !== selectedType) {
        return false;
      }

      // Expedition filter
      if (selectedExpedition !== 'All') {
        if (selectedExpedition === 'IAE-2026-W03' && rec.expeditionId !== 'IAE-2026-W03') return false;
        if (selectedExpedition === 'IAE-2025-W02' && rec.expeditionId !== 'IAE-2025-W02') return false;
      }

      // Location filter
      if (selectedLocation !== 'All' && !rec.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Classification filter
      if (selectedClassification !== 'All' && rec.classification !== selectedClassification) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'All') {
        if (selectedStatus === 'Collected' && rec.status !== 'Draft' && rec.status !== 'Collected') return false;
        if (selectedStatus === 'Validation' && rec.status !== 'Validation') return false;
        if (selectedStatus === 'Review' && rec.status !== 'Under Review') return false;
        if (selectedStatus === 'Approved' && rec.status !== 'Approved') return false;
        if (selectedStatus === 'Published' && rec.status !== 'Published') return false;
      }

      // Research Area filter
      if (selectedResearchArea !== 'All' && rec.researchArea !== selectedResearchArea) {
        return false;
      }

      // Workflow Stage filter
      if (selectedWorkflowStage !== 'All') {
        if (selectedWorkflowStage === 'Collected') {
          // all records
        } else if (selectedWorkflowStage === 'Validated' && rec.validationStatus !== 'Valid') {
          return false;
        } else if (selectedWorkflowStage === 'Classified' && !rec.classification) {
          return false;
        } else if (selectedWorkflowStage === 'Review' && rec.status !== 'Under Review') {
          return false;
        } else if (selectedWorkflowStage === 'Approved' && rec.status !== 'Approved') {
          return false;
        } else if (selectedWorkflowStage === 'Published' && rec.status !== 'Published') {
          return false;
        }
      }

      return true;
    });
  }, [
    records,
    searchQuery,
    selectedType,
    selectedExpedition,
    selectedLocation,
    selectedClassification,
    selectedStatus,
    selectedResearchArea,
    selectedWorkflowStage,
  ]);

  // Counts (fictional base numbers matching prompt specifications with live adjustments)
  const dynamicApprovedCount = records.filter((r) => r.status === 'Approved').length;
  const dynamicPublishedCount = records.filter((r) => r.status === 'Published').length;
  const dynamicUnderReviewCount = records.filter((r) => r.status === 'Under Review').length;
  const dynamicValidationCount = records.filter((r) => r.validationStatus === 'Needs Review' || r.status === 'Validation').length;

  const summaryCounts = {
    total: 42 + (records.length - 8),
    awaitingValidation: Math.max(0, 6 + (dynamicValidationCount - 3)),
    underReview: Math.max(0, 4 + (dynamicUnderReviewCount - 2)),
    approved: 24 + (dynamicApprovedCount - 1),
    public: 18 + (dynamicPublishedCount - 2),
  };

  const workflowCounts = {
    collected: 42 + (records.length - 8),
    validated: 36,
    classified: 32,
    review: summaryCounts.underReview,
    approved: summaryCounts.approved,
    published: summaryCounts.public,
  };

  return (
    <KnowledgeContext.Provider
      value={{
        records,
        filteredRecords,
        summaryCounts,
        workflowCounts,
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        selectedExpedition,
        setSelectedExpedition,
        selectedLocation,
        setSelectedLocation,
        selectedClassification,
        setSelectedClassification,
        selectedStatus,
        setSelectedStatus,
        selectedResearchArea,
        setSelectedResearchArea,
        selectedWorkflowStage,
        setSelectedWorkflowStage,
        resetFilters,
        getRecordById,
        completeValidationCheck,
        completeAllValidation,
        updateClassification,
        toggleReviewChecklistItem,
        approveRecord,
        rejectRecord,
        requestChanges,
        updateAIDraft,
        publishRecordToPortal,
        addKnowledgeRecord,
      }}
    >
      {children}
    </KnowledgeContext.Provider>
  );
};

export const useKnowledge = (): KnowledgeContextType => {
  const context = useContext(KnowledgeContext);
  if (!context) {
    throw new Error('useKnowledge must be used within a KnowledgeProvider');
  }
  return context;
};
