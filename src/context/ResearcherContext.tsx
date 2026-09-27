import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  ResearcherDataset,
  ResearcherCollection,
  ResearcherNote,
  ResearcherAccessRequest,
  ResearcherActivity,
} from '../types';
import {
  INITIAL_RESEARCHER_DATASETS,
  INITIAL_RESEARCHER_COLLECTIONS,
  INITIAL_RESEARCHER_NOTES,
  INITIAL_RESEARCHER_ACTIVITIES,
  RESEARCHER_PUBLICATIONS_LIST,
} from '../data/researcherData';

interface ResearcherContextType {
  datasets: ResearcherDataset[];
  savedDatasetIds: string[];
  collections: ResearcherCollection[];
  notes: ResearcherNote[];
  accessRequests: ResearcherAccessRequest[];
  activities: ResearcherActivity[];
  publications: typeof RESEARCHER_PUBLICATIONS_LIST;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedExpedition: string;
  setSelectedExpedition: (exp: string) => void;
  selectedDataType: string;
  setSelectedDataType: (type: string) => void;
  selectedAccess: string;
  setSelectedAccess: (access: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  toggleSaveDataset: (id: string) => void;
  isDatasetSaved: (id: string) => boolean;
  createCollection: (name: string, description: string, datasetIds?: string[]) => void;
  addDatasetToCollection: (collectionId: string, datasetId: string) => void;
  removeDatasetFromCollection: (collectionId: string, datasetId: string) => void;
  createNote: (title: string, content: string, datasetId?: string) => void;
  deleteNote: (id: string) => void;
  submitAccessRequest: (
    datasetId: string,
    institution: string,
    researchPurpose: string,
    expectedUse: string
  ) => boolean;
  downloadDatasetCsv: (dataset: ResearcherDataset) => void;
  resetFilters: () => void;
}

const ResearcherContext = createContext<ResearcherContextType | undefined>(undefined);

export const ResearcherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [datasets] = useState<ResearcherDataset[]>(INITIAL_RESEARCHER_DATASETS);
  
  const [savedDatasetIds, setSavedDatasetIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('expedix_researcher_saved');
    return saved ? JSON.parse(saved) : ['KN-004', 'KN-002'];
  });

  const [collections, setCollections] = useState<ResearcherCollection[]>(() => {
    const saved = localStorage.getItem('expedix_researcher_collections');
    return saved ? JSON.parse(saved) : INITIAL_RESEARCHER_COLLECTIONS;
  });

  const [notes, setNotes] = useState<ResearcherNote[]>(() => {
    const saved = localStorage.getItem('expedix_researcher_notes');
    return saved ? JSON.parse(saved) : INITIAL_RESEARCHER_NOTES;
  });

  const [accessRequests, setAccessRequests] = useState<ResearcherAccessRequest[]>(() => {
    const saved = localStorage.getItem('expedix_researcher_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'REQ-082',
        datasetId: 'KN-007',
        datasetTitle: 'Ice Core Sample Metadata & Stratigraphy Catalog',
        reason: 'Palaeoclimate isotope reconstruction across the Holocene transition',
        researchPurpose: 'National Centre for Polar and Ocean Research — Ice Core Analysis Division',
        institution: 'National Institute of Polar Science',
        expectedUse: 'Peer-reviewed glaciological publication and open climate model calibration',
        status: 'Pending Review',
        submittedAt: '15 Sep 2026 14:10',
      },
    ];
  });

  const [activities, setActivities] = useState<ResearcherActivity[]>(() => {
    const saved = localStorage.getItem('expedix_researcher_activities');
    return saved ? JSON.parse(saved) : INITIAL_RESEARCHER_ACTIVITIES;
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedExpedition, setSelectedExpedition] = useState('All');
  const [selectedDataType, setSelectedDataType] = useState('All');
  const [selectedAccess, setSelectedAccess] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('expedix_researcher_saved', JSON.stringify(savedDatasetIds));
  }, [savedDatasetIds]);

  useEffect(() => {
    localStorage.setItem('expedix_researcher_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('expedix_researcher_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('expedix_researcher_requests', JSON.stringify(accessRequests));
  }, [accessRequests]);

  useEffect(() => {
    localStorage.setItem('expedix_researcher_activities', JSON.stringify(activities));
  }, [activities]);

  const logActivity = (action: string, target: string, type: ResearcherActivity['type']) => {
    const newActivity: ResearcherActivity = {
      id: `act-${Date.now()}`,
      action,
      target,
      timestamp: 'Just now',
      type,
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const toggleSaveDataset = (id: string) => {
    const targetDataset = datasets.find(d => d.id === id);
    if (savedDatasetIds.includes(id)) {
      setSavedDatasetIds(prev => prev.filter(item => item !== id));
      if (targetDataset) {
        logActivity('Removed dataset from saved workspace', `${targetDataset.id} (${targetDataset.title})`, 'saved');
      }
    } else {
      setSavedDatasetIds(prev => [...prev, id]);
      if (targetDataset) {
        logActivity('Saved dataset to workspace', `${targetDataset.id} (${targetDataset.title})`, 'saved');
      }
    }
  };

  const isDatasetSaved = (id: string) => savedDatasetIds.includes(id);

  const createCollection = (name: string, description: string, datasetIds: string[] = []) => {
    const newCol: ResearcherCollection = {
      id: `col-${Date.now()}`,
      name,
      description,
      datasetIds,
      updatedAt: 'Today',
    };
    setCollections(prev => [newCol, ...prev]);
    logActivity('Created research collection', name, 'collection');
  };

  const addDatasetToCollection = (collectionId: string, datasetId: string) => {
    setCollections(prev =>
      prev.map(c => {
        if (c.id === collectionId) {
          if (!c.datasetIds.includes(datasetId)) {
            return {
              ...c,
              datasetIds: [...c.datasetIds, datasetId],
              updatedAt: 'Today',
            };
          }
        }
        return c;
      })
    );
    const col = collections.find(c => c.id === collectionId);
    logActivity('Added dataset to collection', `${datasetId} added to "${col?.name || 'Collection'}"`, 'collection');
  };

  const removeDatasetFromCollection = (collectionId: string, datasetId: string) => {
    setCollections(prev =>
      prev.map(c => {
        if (c.id === collectionId) {
          return {
            ...c,
            datasetIds: c.datasetIds.filter(id => id !== datasetId),
            updatedAt: 'Today',
          };
        }
        return c;
      })
    );
  };

  const createNote = (title: string, content: string, datasetId?: string) => {
    const newNote: ResearcherNote = {
      id: `note-${Date.now()}`,
      title,
      content,
      datasetId,
      timestamp: 'Just now',
    };
    setNotes(prev => [newNote, ...prev]);
    logActivity('Added research note', title, 'note');
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const submitAccessRequest = (
    datasetId: string,
    institution: string,
    researchPurpose: string,
    expectedUse: string
  ) => {
    const targetDataset = datasets.find(d => d.id === datasetId);
    if (!targetDataset) return false;

    const newRequest: ResearcherAccessRequest = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      datasetId,
      datasetTitle: targetDataset.title,
      reason: researchPurpose,
      researchPurpose,
      institution,
      expectedUse,
      status: 'Pending Review',
      submittedAt: 'Just now',
    };

    setAccessRequests(prev => [newRequest, ...prev]);
    logActivity('Submitted data access authorization request', `${targetDataset.id} — Pending Review`, 'request');
    return true;
  };

  const downloadDatasetCsv = (dataset: ResearcherDataset) => {
    let csvContent = '';
    
    // Generate realistic simulated scientific CSV content based on dataset parameters
    if (dataset.id === 'KN-002') {
      csvContent = `Timestamp,Location,Latitude,Longitude,Aerosol_Optical_Depth_500nm,Boundary_Layer_Temp_C,Relative_Humidity_Pct,Wind_Speed_ms,Wind_Direction_deg,Solar_Irradiance_Wm2,Quality_Flag\n`;
      csvContent += `2026-08-15T00:00:00Z,Bharati Station,-69.4077,76.1872,0.042,-18.4,72.1,8.4,142,0.0,PASSED\n`;
      csvContent += `2026-08-15T01:00:00Z,Bharati Station,-69.4077,76.1872,0.041,-18.9,71.8,9.1,145,0.0,PASSED\n`;
      csvContent += `2026-08-15T02:00:00Z,Bharati Station,-69.4077,76.1872,0.045,-19.3,70.5,10.2,148,0.0,PASSED\n`;
      csvContent += `2026-08-15T03:00:00Z,Bharati Station,-69.4077,76.1872,0.048,-20.1,69.8,11.5,150,0.0,PASSED\n`;
      csvContent += `2026-08-15T04:00:00Z,Bharati Station,-69.4077,76.1872,0.044,-20.6,68.4,12.0,152,0.0,PASSED\n`;
      csvContent += `2026-08-15T05:00:00Z,Bharati Station,-69.4077,76.1872,0.039,-21.2,67.9,12.8,155,14.2,PASSED\n`;
      csvContent += `2026-08-15T06:00:00Z,Bharati Station,-69.4077,76.1872,0.038,-20.8,66.2,11.9,150,85.6,PASSED\n`;
    } else if (dataset.id === 'KN-004') {
      csvContent = `Stake_ID,Survey_Date,Latitude,Longitude,Elevation_m,Surface_Velocity_myr,Ablation_Depth_cm,Snow_Density_kgm3,Strain_Rate_10e5,Validation_Status\n`;
      csvContent += `STK-01,2026-08-20,-69.4194,76.1672,142.5,4.82,12.4,410,1.24,PASSED\n`;
      csvContent += `STK-02,2026-08-20,-69.4210,76.1710,158.2,5.14,14.1,418,1.38,PASSED\n`;
      csvContent += `STK-03,2026-08-20,-69.4235,76.1755,174.0,5.60,15.8,422,1.52,PASSED\n`;
      csvContent += `STK-04,2026-08-20,-69.4258,76.1802,190.1,6.02,17.2,430,1.69,PASSED\n`;
      csvContent += `STK-05,2026-08-20,-69.4290,76.1850,205.8,6.45,19.0,435,1.81,PASSED\n`;
    } else if (dataset.id === 'SOM-009') {
      csvContent = `Station_Cast_No,Cast_Date,Latitude,Longitude,Depth_dbar,Potential_Temp_C,Salinity_PSU,Dissolved_Oxygen_umolkg,Potential_Density_kgm3,Quality_Code\n`;
      csvContent += `CTD-001,2025-01-15,-55.002,57.001,10.0,2.15,33.842,324.5,27.02,2\n`;
      csvContent += `CTD-001,2025-01-15,-55.002,57.001,100.0,0.85,34.120,312.0,27.34,2\n`;
      csvContent += `CTD-001,2025-01-15,-55.002,57.001,500.0,1.42,34.685,210.4,27.75,2\n`;
      csvContent += `CTD-001,2025-01-15,-55.002,57.001,1000.0,1.88,34.740,195.2,27.79,2\n`;
      csvContent += `CTD-001,2025-01-15,-55.002,57.001,2000.0,0.92,34.710,215.8,27.84,2\n`;
      csvContent += `CTD-001,2025-01-15,-55.002,57.001,3500.0,0.15,34.692,238.1,27.88,2\n`;
    } else {
      csvContent = `ID,Parameter,Value,Unit,Timestamp,Coordinate_Ref,Quality_Check\n`;
      dataset.parameters.forEach((param) => {
        csvContent += `${dataset.id},${param.replace(/,/g, '')},${(Math.random() * 100).toFixed(2)},SI,2026-09-01T12:00:00Z,"${dataset.metadata.coordinateReference}",PASSED\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${dataset.id}_${dataset.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    logActivity('Downloaded demonstration CSV data', `${dataset.id} (${dataset.title})`, 'download');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedArea('All');
    setSelectedExpedition('All');
    setSelectedDataType('All');
    setSelectedAccess('All');
    setSelectedYear('All');
  };

  return (
    <ResearcherContext.Provider
      value={{
        datasets,
        savedDatasetIds,
        collections,
        notes,
        accessRequests,
        activities,
        publications: RESEARCHER_PUBLICATIONS_LIST,
        searchQuery,
        setSearchQuery,
        selectedArea,
        setSelectedArea,
        selectedExpedition,
        setSelectedExpedition,
        selectedDataType,
        setSelectedDataType,
        selectedAccess,
        setSelectedAccess,
        selectedYear,
        setSelectedYear,
        toggleSaveDataset,
        isDatasetSaved,
        createCollection,
        addDatasetToCollection,
        removeDatasetFromCollection,
        createNote,
        deleteNote,
        submitAccessRequest,
        downloadDatasetCsv,
        resetFilters,
      }}
    >
      {children}
    </ResearcherContext.Provider>
  );
};

export const useResearcher = () => {
  const context = useContext(ResearcherContext);
  if (!context) {
    throw new Error('useResearcher must be used within a ResearcherProvider');
  }
  return context;
};
