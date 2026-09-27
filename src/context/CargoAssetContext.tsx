import React, { createContext, useContext, useState } from 'react';
import type { CargoItem, PolarAsset, CargoStatus, CargoPriority, AssetStatus, AssetCondition } from '../types';
import {
  CARGO_DATA,
  ASSET_DATA,
  LOGISTICS_SUMMARY_STATS,
  LOGISTICS_ROUTE_STAGES,
  LOGISTICS_INSIGHTS,
} from '../data/demoData';

interface CargoAssetContextType {
  cargoList: CargoItem[];
  assetList: PolarAsset[];
  summaryStats: typeof LOGISTICS_SUMMARY_STATS;
  routeStages: typeof LOGISTICS_ROUTE_STAGES;
  insights: typeof LOGISTICS_INSIGHTS;
  getCargoById: (id: string) => CargoItem | undefined;
  getAssetById: (id: string) => PolarAsset | undefined;
  addCargo: (data: {
    code: string;
    description: string;
    category: CargoItem['category'];
    quantity: number;
    unit?: string;
    origin: string;
    destination: string;
    priority: CargoPriority;
    expeditionId: string;
    status?: CargoStatus;
  }) => void;
  registerAsset: (data: {
    code: string;
    name: string;
    type: PolarAsset['type'];
    category: PolarAsset['category'];
    currentLocation: string;
    condition: AssetCondition;
    assignedTeam: string;
    assignedExpedition: string;
    status?: AssetStatus;
  }) => void;
}

const CargoAssetContext = createContext<CargoAssetContextType | undefined>(undefined);

export const CargoAssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cargoList, setCargoList] = useState<CargoItem[]>(CARGO_DATA);
  const [assetList, setAssetList] = useState<PolarAsset[]>(ASSET_DATA);
  const [summaryStats] = useState(LOGISTICS_SUMMARY_STATS);
  const [routeStages] = useState(LOGISTICS_ROUTE_STAGES);
  const [insights] = useState(LOGISTICS_INSIGHTS);

  const getCargoById = (id: string): CargoItem | undefined => {
    return cargoList.find(
      (c) => c.id.toLowerCase() === id.toLowerCase() || c.code.toLowerCase() === id.toLowerCase()
    );
  };

  const getAssetById = (id: string): PolarAsset | undefined => {
    return assetList.find(
      (a) => a.id.toLowerCase() === id.toLowerCase() || a.name.toLowerCase().includes(id.toLowerCase())
    );
  };

  const addCargo = (data: {
    code: string;
    description: string;
    category: CargoItem['category'];
    quantity: number;
    unit?: string;
    origin: string;
    destination: string;
    priority: CargoPriority;
    expeditionId: string;
    status?: CargoStatus;
  }) => {
    const newId = data.code.trim().toUpperCase();
    const newCargo: CargoItem = {
      id: newId,
      code: newId,
      description: data.description.trim(),
      category: data.category,
      quantity: Number(data.quantity) || 1,
      unit: data.unit || 'Units',
      origin: data.origin.trim() || 'NCAOR Goa Staging Hub',
      currentLocation: data.origin.trim() || 'NCAOR Goa Staging Hub',
      destination: data.destination.trim() || 'Bharati Station',
      status: data.status || 'Prepared',
      priority: data.priority || 'Medium',
      lastUpdate: 'Just now',
      expeditionId: data.expeditionId || 'IAE-2026-W03',
      expeditionName: 'Indian Antarctic Expedition — Winter Scientific Mission 2026',
      handledBy: 'Expedition Logistics Officer',
      temperatureRequirement: 'Standard Polar Cargo Protocol',
      hazardClass: 'Checked & Manifested',
      trackingHistory: [
        {
          stage: 'Prepared',
          location: data.origin.trim() || 'NCAOR Goa Staging Hub',
          timestamp: 'Just now',
          completed: true,
          current: true,
          notes: 'Manifest created and registered in ExpediX Logistics Engine.',
        },
        {
          stage: 'Dispatched',
          location: 'Vessel Staging Port',
          timestamp: 'Pending',
          completed: false,
        },
        {
          stage: 'In Transit',
          location: 'Polar Ocean Convoy',
          timestamp: 'Pending',
          completed: false,
        },
        {
          stage: 'Received',
          location: data.destination.trim(),
          timestamp: 'Pending',
          completed: false,
        },
        {
          stage: 'Allocated',
          location: 'Assigned Field Unit',
          timestamp: 'Pending',
          completed: false,
        },
      ],
      isSimulation: true,
    };

    setCargoList((prev) => [newCargo, ...prev]);
  };

  const registerAsset = (data: {
    code: string;
    name: string;
    type: PolarAsset['type'];
    category: PolarAsset['category'];
    currentLocation: string;
    condition: AssetCondition;
    assignedTeam: string;
    assignedExpedition: string;
    status?: AssetStatus;
  }) => {
    const newId = data.code.trim().toUpperCase();
    const newAsset: PolarAsset = {
      id: newId,
      name: data.name.trim() || `${data.type} ${newId}`,
      type: data.type,
      category: data.category,
      currentLocation: data.currentLocation.trim() || 'Bharati Station',
      assignedExpedition: data.assignedExpedition || 'IAE-2026-W03',
      assignedTeam: data.assignedTeam.trim() || 'Traverse Logistics',
      condition: data.condition || 'Optimal',
      status: data.status || 'OPERATIONAL',
      lastMaintenance: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      usageFormatted: 'Initial Commissioning',
      safetyStatus: data.condition === 'Inspection Required' ? 'Attention' : 'Operational',
      safetyNote: 'New polar asset registered and telemetry beacon initialized.',
      operator: 'Expedition Field Lead',
      telemetryStatus: 'Mesh Synced',
      recentActivities: [
        {
          id: `act_${Date.now()}`,
          route: `Registered at ${data.currentLocation}`,
          timestamp: 'Just now',
          operator: 'Expedition Logistics Lead',
          purpose: 'Commissioning & initial telemetry handshake',
        },
      ],
      isSimulation: true,
    };

    setAssetList((prev) => [newAsset, ...prev]);
  };

  return (
    <CargoAssetContext.Provider
      value={{
        cargoList,
        assetList,
        summaryStats,
        routeStages,
        insights,
        getCargoById,
        getAssetById,
        addCargo,
        registerAsset,
      }}
    >
      {children}
    </CargoAssetContext.Provider>
  );
};

export const useCargoAssets = (): CargoAssetContextType => {
  const context = useContext(CargoAssetContext);
  if (!context) {
    throw new Error('useCargoAssets must be used within a CargoAssetProvider');
  }
  return context;
};
