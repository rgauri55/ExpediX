import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Database,
  FlaskConical,
  BookOpen,
  FolderHeart,
  Globe,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { useResearcher } from '../../context/ResearcherContext';
import { AIResearchAssistantModal } from './AIResearchAssistantModal';
import { ExpediXLogo } from '../common/ExpediXLogo';

interface ResearcherHeaderProps {
  onToggleSidebar?: () => void;
}

export const ResearcherHeader: React.FC<ResearcherHeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useResearcher();
  const [isAIOpen, setIsAIOpen] = useState(false);

  const navLinks = [
    { name: 'Research', path: '/researcher', icon: FlaskConical },
    { name: 'Datasets', path: '/researcher?tab=datasets', icon: Database },
    { name: 'Expeditions', path: '/researcher/expedition/IAE-2026-W03', icon: Compass },
    { name: 'Publications', path: '/researcher/publications', icon: BookOpen },
    { name: 'My Workspace', path: '/researcher/workspace', icon: FolderHeart },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 shadow-2xs">
        {/* Top utility row */}
        <div className="px-4 lg:px-6 py-2 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/70 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-1 text-slate-600 hover:bg-slate-200 rounded-md"
              aria-label="Toggle Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <ExpediXLogo
                variant="horizontal"
                theme="light"
                size="xs"
              />
              <span className="text-slate-300 font-normal">|</span>
              <span className="text-slate-700 font-semibold text-xs">Researcher Workspace</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono font-semibold uppercase tracking-wider">
                DEMO ENVIRONMENT
              </span>
            </div>
          </div>

          {/* Quick Context & External Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsAIOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200/80 hover:bg-sky-100 transition-colors text-[11px] font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-polar-blue" />
              <span>AI Research Assistant</span>
            </button>

            <div className="hidden md:flex items-center gap-2 border-l border-slate-200 pl-3">
              <NavLink
                to="/command-center"
                className="text-[11px] font-medium text-slate-600 hover:text-polar-blue flex items-center gap-1"
                title="Return to Internal Command Center"
              >
                <LayoutDashboard className="w-3 h-3 text-slate-400" />
                <span>Command Center</span>
              </NavLink>
              <NavLink
                to="/public-portal"
                className="text-[11px] font-medium text-slate-600 hover:text-polar-blue flex items-center gap-1 ml-2"
                title="Open Public Discovery Portal"
              >
                <Globe className="w-3 h-3 text-slate-400" />
                <span>Public Portal</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="px-4 lg:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Navigation Items */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive =
                link.path === '/researcher'
                  ? location.pathname === '/researcher' && !location.search.includes('tab=datasets')
                  : link.path.includes('?')
                  ? location.pathname === '/researcher' && location.search.includes('tab=datasets')
                  : location.pathname.startsWith(link.path);

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Search bar & Researcher Identity */}
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  if (location.pathname !== '/researcher') {
                    navigate('/researcher');
                  }
                }}
                placeholder="Search datasets, measurands, IDs..."
                className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
              />
            </div>

            {/* Authenticated Researcher Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 shrink-0">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border border-slate-300">
                NV
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-900">Dr. Neha Verma</span>
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-none">
                  Climate Researcher • NCPOR
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* AI Assistant Modal */}
      <AIResearchAssistantModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </>
  );
};
