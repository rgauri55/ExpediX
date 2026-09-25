import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { FieldModePage } from './pages/FieldModePage';
import { ResearcherPage } from './pages/ResearcherPage';
import { PublicPortalPage } from './pages/PublicPortalPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* App Layout Route Shell for Authenticated & Role-based Views */}
          <Route element={<AppLayout />}>
            <Route path="/command-center" element={<CommandCenterPage />} />
            <Route path="/field-mode" element={<FieldModePage />} />
            <Route path="/researcher" element={<ResearcherPage />} />
            <Route path="/public-portal" element={<PublicPortalPage />} />
          </Route>

          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
