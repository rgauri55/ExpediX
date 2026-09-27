import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Compass,
  Database,
  BookOpen,
  Bookmark,
  StickyNote,
  Clock,
  Key,
  Layers,
  FlaskConical,
  X,
} from 'lucide-react';
import { useResearcher } from '../../context/ResearcherContext';
import { ExpediXLogo } from '../common/ExpediXLogo';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface ResearcherSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearcherSidebar: React.FC<ResearcherSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const location = useLocation();
  const { savedDatasetIds, collections, notes, accessRequests } = useResearcher();

  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab');

  const navSections: NavSection[] = [
    {
      title: 'RESEARCH WORKSPACE',
      items: [
        {
          name: 'Workspace Overview',
          path: '/researcher',
          icon: FlaskConical,
          isActive: location.pathname === '/researcher' && !activeTab,
        },
      ],
    },
    {
      title: 'DATA DISCOVERY',
      items: [
        {
          name: 'Approved Datasets',
          path: '/researcher?tab=datasets',
          icon: Database,
          isActive: location.pathname === '/researcher' && activeTab === 'datasets',
          badge: '6',
        },
        {
          name: 'Scientific Expeditions',
          path: '/researcher/expedition/IAE-2026-W03',
          icon: Compass,
          isActive: location.pathname.startsWith('/researcher/expedition'),
        },
        {
          name: 'Publications & Reports',
          path: '/researcher/publications',
          icon: BookOpen,
          isActive: location.pathname === '/researcher/publications',
          badge: '4',
        },
        {
          name: 'Data Collections',
          path: '/researcher/workspace?tab=collections',
          icon: Layers,
          isActive: location.pathname === '/researcher/workspace' && activeTab === 'collections',
          badge: collections.length.toString(),
        },
      ],
    },
    {
      title: 'MY WORKSPACE',
      items: [
        {
          name: 'Saved Datasets',
          path: '/researcher/workspace?tab=saved',
          icon: Bookmark,
          isActive: location.pathname === '/researcher/workspace' && (activeTab === 'saved' || !activeTab),
          badge: savedDatasetIds.length.toString(),
        },
        {
          name: 'Research Notes',
          path: '/researcher/workspace?tab=notes',
          icon: StickyNote,
          isActive: location.pathname === '/researcher/workspace' && activeTab === 'notes',
          badge: notes.length.toString(),
        },
        {
          name: 'Recent Activity',
          path: '/researcher/workspace?tab=activity',
          icon: Clock,
          isActive: location.pathname === '/researcher/workspace' && activeTab === 'activity',
        },
      ],
    },
    {
      title: 'GOVERNANCE & ACCESS',
      items: [
        {
          name: 'Access Requests',
          path: '/researcher/workspace?tab=requests',
          icon: Key,
          isActive: location.pathname === '/researcher/workspace' && activeTab === 'requests',
          badge: accessRequests.length.toString(),
          badgeColor: 'amber',
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 bg-[#082D56] text-slate-300 flex flex-col justify-between shrink-0 border-r border-[#0c3b6e] transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header / Logo */}
        <div>
          <div className="p-4 border-b border-[#0c3b6e] flex items-center justify-between">
            <NavLink to="/researcher" className="flex items-center gap-2.5">
              <ExpediXLogo
                variant="horizontal"
                theme="dark"
                size="sm"
                badge="Science"
              />
            </NavLink>
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-170px)] no-scrollbar">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-sky-300/80">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map(item => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          item.isActive
                            ? 'bg-polar-blue text-white font-semibold shadow-xs'
                            : 'text-slate-300 hover:text-white hover:bg-[#0c3b6e]/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${item.isActive ? 'text-white' : 'text-sky-400'}`} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                              item.badgeColor === 'amber'
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                                : item.isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-[#0c3b6e] text-sky-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer telemetry */}
        <div className="p-3 border-t border-[#0c3b6e] bg-[#062447] text-[11px] text-slate-400 space-y-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Archive Link Active
            </span>
            <span className="font-mono text-slate-400">v2.4.0</span>
          </div>
          <div className="p-2 rounded bg-[#082D56] border border-[#0c3b6e] text-[10px] text-slate-300 space-y-1">
            <div className="flex items-center justify-between">
              <span>Station Observatories</span>
              <span className="font-mono text-sky-300">Bharati &amp; Maitri</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Catalog Index</span>
              <span className="font-mono text-sky-300">WGS 84 • Level 1/2</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
