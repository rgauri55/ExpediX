import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ResearcherHeader } from './ResearcherHeader';
import { ResearcherSidebar } from './ResearcherSidebar';

export const ResearcherLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F4F6F9] font-sans text-slate-800 antialiased overflow-hidden">
      {/* Sidebar */}
      <ResearcherSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ResearcherHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
