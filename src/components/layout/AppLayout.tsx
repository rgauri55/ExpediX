import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DemoBanner } from '../common/DemoBanner';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-polar-bg text-polar-text flex flex-col font-sans">
      {/* Topmost persistent banner */}
      <DemoBanner />

      <div className="flex-1 flex relative">
        {/* Left Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-navy-950/60 z-20 lg:hidden backdrop-blur-xs transition-opacity"
          />
        )}

        {/* Main Workspace Area */}
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
