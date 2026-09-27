import React, { createContext, useContext, useState } from 'react';
import type { ExpeditionMission } from '../types';
import { ALL_EXPEDITIONS } from '../data/demoData';

interface ExpeditionContextType {
  expeditions: ExpeditionMission[];
  getExpeditionById: (id: string) => ExpeditionMission | undefined;
  addExpedition: (newExp: Omit<ExpeditionMission, 'isSimulation'>) => void;
  activeExpedition: ExpeditionMission;
}

const ExpeditionContext = createContext<ExpeditionContextType | undefined>(undefined);

export const ExpeditionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expeditions, setExpeditions] = useState<ExpeditionMission[]>(ALL_EXPEDITIONS);

  const getExpeditionById = (id: string): ExpeditionMission | undefined => {
    return expeditions.find((e) => e.id.toLowerCase() === id.toLowerCase() || e.code.toLowerCase() === id.toLowerCase());
  };

  const addExpedition = (newExp: Omit<ExpeditionMission, 'isSimulation'>) => {
    const expeditionWithSim: ExpeditionMission = {
      ...newExp,
      isSimulation: true,
    };
    setExpeditions((prev) => [expeditionWithSim, ...prev]);
  };

  const activeExpedition = expeditions.find((e) => e.status === 'Active') || expeditions[0];

  return (
    <ExpeditionContext.Provider
      value={{
        expeditions,
        getExpeditionById,
        addExpedition,
        activeExpedition,
      }}
    >
      {children}
    </ExpeditionContext.Provider>
  );
};

export const useExpeditions = (): ExpeditionContextType => {
  const context = useContext(ExpeditionContext);
  if (!context) {
    throw new Error('useExpeditions must be used within an ExpeditionProvider');
  }
  return context;
};
