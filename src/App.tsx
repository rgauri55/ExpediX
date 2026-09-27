import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpeditionProvider } from './context/ExpeditionContext';
import { PersonnelProvider } from './context/PersonnelContext';
import { CargoAssetProvider } from './context/CargoAssetContext';
import { InventoryProvider } from './context/InventoryContext';
import { FieldOperationsProvider } from './context/FieldOperationsContext';
import { EmergencyProvider } from './context/EmergencyContext';
import { CloseoutProvider } from './context/CloseoutContext';
import { KnowledgeProvider } from './context/KnowledgeContext';
import { ResearcherProvider } from './context/ResearcherContext';

import { AppLayout } from './components/layout/AppLayout';
import { ResearcherLayout } from './components/researcher/ResearcherLayout';

import { LoginPage } from './pages/LoginPage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { ExpeditionsPage } from './pages/ExpeditionsPage';
import { ExpeditionDetailPage } from './pages/ExpeditionDetailPage';
import { PersonnelPage } from './pages/PersonnelPage';
import { PersonnelDetailPage } from './pages/PersonnelDetailPage';
import { ReturnCloseoutPage } from './pages/ReturnCloseoutPage';
import { CargoAssetsPage } from './pages/CargoAssetsPage';
import { CargoDetailPage } from './pages/CargoDetailPage';
import { AssetDetailPage } from './pages/AssetDetailPage';
import { InventoryPage } from './pages/InventoryPage';
import { InventoryDetailPage } from './pages/InventoryDetailPage';
import { FieldOperationsPage } from './pages/FieldOperationsPage';
import { SynchronizationPage } from './pages/SynchronizationPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { KnowledgeHubPage } from './pages/KnowledgeHubPage';
import { KnowledgeRecordDetailPage } from './pages/KnowledgeRecordDetailPage';

import { ResearcherPage } from './pages/ResearcherPage';
import { ResearcherDatasetDetailPage } from './pages/ResearcherDatasetDetailPage';
import { ResearcherWorkspacePage } from './pages/ResearcherWorkspacePage';
import { ResearcherPublicationsPage } from './pages/ResearcherPublicationsPage';
import { ResearcherExpeditionDetailPage } from './pages/ResearcherExpeditionDetailPage';

import { PublicPortalPage } from './pages/PublicPortalPage';
import { PublicExpeditionDetailPage } from './pages/PublicExpeditionDetailPage';
import { PublicDatasetDetailPage } from './pages/PublicDatasetDetailPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ExpeditionProvider>
        <PersonnelProvider>
          <CargoAssetProvider>
            <InventoryProvider>
              <FieldOperationsProvider>
                <EmergencyProvider>
                  <CloseoutProvider>
                    <KnowledgeProvider>
                      <ResearcherProvider>
                        <BrowserRouter>
                          <Routes>
                            {/* Public Login Route */}
                            <Route path="/login" element={<LoginPage />} />

                            {/* Standalone Public Discovery Portal Routes (No Internal Sidebar) */}
                            <Route path="/public-portal" element={<PublicPortalPage />} />
                            <Route path="/public-portal/expedition/:id" element={<PublicExpeditionDetailPage />} />
                            <Route path="/public-portal/dataset/:id" element={<PublicDatasetDetailPage />} />

                            {/* Dedicated Researcher Workspace Routes (Specialized Scientific Shell) */}
                            <Route element={<ResearcherLayout />}>
                              <Route path="/researcher" element={<ResearcherPage />} />
                              <Route path="/researcher/dataset/:id" element={<ResearcherDatasetDetailPage />} />
                              <Route path="/researcher/workspace" element={<ResearcherWorkspacePage />} />
                              <Route path="/researcher/publications" element={<ResearcherPublicationsPage />} />
                              <Route path="/researcher/expedition/:id" element={<ResearcherExpeditionDetailPage />} />
                            </Route>

                            {/* App Layout Route Shell for Authenticated Operational Command Views */}
                            <Route element={<AppLayout />}>
                              <Route path="/command-center" element={<CommandCenterPage />} />
                              
                              {/* Expeditions Module Routes */}
                              <Route path="/expeditions" element={<ExpeditionsPage />} />
                              <Route path="/expeditions/:id" element={<ExpeditionDetailPage />} />

                              {/* Personnel Module Routes */}
                              <Route path="/personnel" element={<PersonnelPage />} />
                              <Route path="/personnel/:id" element={<PersonnelDetailPage />} />

                              {/* Return & Closeout Module Route */}
                              <Route path="/return-closeout" element={<ReturnCloseoutPage />} />

                              {/* Cargo & Assets Module Routes */}
                              <Route path="/cargo-assets" element={<CargoAssetsPage />} />
                              <Route path="/cargo/:id" element={<CargoDetailPage />} />
                              <Route path="/assets/:id" element={<AssetDetailPage />} />

                              {/* Inventory & Resource Module Routes */}
                              <Route path="/inventory" element={<InventoryPage />} />
                              <Route path="/inventory/:id" element={<InventoryDetailPage />} />

                              {/* Field Operations Module Routes */}
                              <Route path="/field-operations" element={<FieldOperationsPage />} />

                              {/* Synchronization Module Route */}
                              <Route path="/synchronization" element={<SynchronizationPage />} />

                              {/* Emergency Response Module Route */}
                              <Route path="/emergency" element={<EmergencyPage />} />

                              {/* Knowledge Hub Module Routes */}
                              <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
                              <Route path="/knowledge-hub/:id" element={<KnowledgeRecordDetailPage />} />

                              {/* Role View Routes */}
                              <Route path="/field-mode" element={<FieldOperationsPage />} />
                            </Route>

                            {/* Default redirect to login */}
                            <Route path="/" element={<Navigate to="/login" replace />} />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                          </Routes>
                        </BrowserRouter>
                      </ResearcherProvider>
                    </KnowledgeProvider>
                  </CloseoutProvider>
                </EmergencyProvider>
              </FieldOperationsProvider>
            </InventoryProvider>
          </CargoAssetProvider>
        </PersonnelProvider>
      </ExpeditionProvider>
    </AuthProvider>
  );
};

export default App;
