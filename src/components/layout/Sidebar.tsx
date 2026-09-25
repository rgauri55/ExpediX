import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  Users,
  Boxes,
  Package,
  Radio,
  RefreshCw,
  ShieldAlert,
  BookOpen,
  LayoutDashboard,
  Globe,
  Mountain,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navSections = [
    {
      title: 'EXPEDITIONS',
      items: [
        { name: 'Expeditions', icon: Compass },
        { name: 'Personnel', icon: Users },
      ],
    },
    {
      title: 'LOGISTICS',
      items: [
        { name: 'Cargo & Assets', icon: Boxes },
        { name: 'Inventory', icon: Package },
      ],
    },
    {
      title: 'FIELD OPERATIONS',
      items: [
        { name: 'Field Operations', icon: Radio },
        { name: 'Synchronization', icon: RefreshCw },
      ],
    },
    {
      title: 'RESPONSE',
      items: [
        { name: 'Emergency', icon: ShieldAlert },
      ],
    },
    {
      title: 'KNOWLEDGE',
      items: [
        { name: 'Knowledge Hub', icon: BookOpen },
      ],
    },
  ];

  const roleViews = [
    { name: 'Command Center', path: '/command-center', icon: LayoutDashboard },
    { name: 'Field Mode', path: '/field-mode', icon: Radio },
    { name: 'Researcher', path: '/researcher', icon: BookOpen },
    { name: 'Public Portal', path: '/public-portal', icon: Globe },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-60 bg-[#082D56] text-slate-200 border-r border-[#0c3b6e] flex flex-col transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-[#0c3b6e]/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-polar-blue via-sky-400 to-cyan-300 p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#082D56] rounded-full flex items-center justify-center">
              <Mountain className="w-5 h-5 text-sky-300" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg text-white tracking-tight">ExpediX</span>
              <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-sky-400/20 text-sky-200 border border-sky-400/30">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[10px] text-sky-200/80 leading-tight truncate">
              Polar Logistics &amp; Knowledge
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Scrollable Area */}
      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        
        {/* Active Command Center / Role Switcher Header */}
        <div>
          <div className="px-2 mb-1 text-[10px] font-bold uppercase tracking-wider text-sky-300 flex items-center justify-between">
            <span>ROLE VIEWS</span>
            <span className="text-[9px] text-slate-300 font-mono">LIVE</span>
          </div>
          <div className="space-y-1">
            {roleViews.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-polar-blue text-white shadow-sm font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-[#0c3b6e]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-300 group-hover:text-white'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Operational Modules with Coming Next tag */}
        {navSections.map((section) => (
          <div key={section.title}>
            <div className="px-2 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300/80 hover:text-slate-100 hover:bg-[#0c3b6e]/40 cursor-not-allowed group transition-colors"
                    title={`${item.name} module will be enabled in subsequent milestones`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5 text-sky-400/70 group-hover:text-sky-300" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[#0c3b6e]/60 text-sky-200 border border-[#1457a1]/50 font-mono">
                      Next
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

      </div>

      {/* Sidebar Footer User Area */}
      <div className="p-3 border-t border-[#0c3b6e]/80 bg-[#062447]">
        <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-[#082D56] border border-[#0c3b6e]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-polar-blue text-white font-bold text-xs flex items-center justify-center shrink-0">
              {currentUser.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <p className="text-xs font-semibold text-white truncate">
                  {currentUser.name}
                </p>
              </div>
              <p className="text-[10px] text-sky-200/80 truncate">
                {currentUser.roleTitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign Out / Switch Demo Profile"
            className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-[#0c3b6e] rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
};
