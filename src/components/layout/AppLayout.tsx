import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DemoBanner } from '../common/DemoBanner';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F6FAFD] text-[#16324F] flex flex-col font-sans antialiased">
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

        {/* Main Workspace Canvas */}
        <div className="flex-1 lg:pl-60 flex flex-col min-w-0">
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="flex-1 p-3.5 sm:p-5 w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
