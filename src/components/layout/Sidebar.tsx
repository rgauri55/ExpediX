import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  Users,
  ClipboardCheck,
  Boxes,
  Package,
  Radio,
  RefreshCw,
  ShieldAlert,
  BookOpen,
  LayoutDashboard,
  Globe,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ExpediXLogo } from '../common/ExpediXLogo';

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

  const isExpeditionsActive = location.pathname.startsWith('/expeditions');
  const isPersonnelActive = location.pathname.startsWith('/personnel');
  const isReturnCloseoutActive = location.pathname.startsWith('/return-closeout');
  const isCargoAssetsActive =
    location.pathname.startsWith('/cargo-assets') ||
    location.pathname.startsWith('/cargo') ||
    location.pathname.startsWith('/assets');
  const isInventoryActive = location.pathname.startsWith('/inventory');
  const isFieldOperationsActive =
    location.pathname.startsWith('/field-operations') ||
    location.pathname.startsWith('/field-mode');
  const isSynchronizationActive = location.pathname.startsWith('/synchronization');
  const isEmergencyActive = location.pathname.startsWith('/emergency');
  const isKnowledgeHubActive = location.pathname.startsWith('/knowledge-hub');
  const isCommandCenterActive = location.pathname === '/command-center' || location.pathname === '/';

  interface SidebarNavItem {
    name: string;
    path?: string;
    icon: React.ComponentType<{ className?: string }>;
    isRoute: boolean;
  }

  const operationalSections: { title: string; items: SidebarNavItem[] }[] = [
    {
      title: 'EXPEDITIONS',
      items: [
        { name: 'Expeditions', path: '/expeditions', icon: Compass, isRoute: true },
        { name: 'Personnel', path: '/personnel', icon: Users, isRoute: true },
        { name: 'Return & Closeout', path: '/return-closeout', icon: ClipboardCheck, isRoute: true },
      ],
    },
    {
      title: 'LOGISTICS',
      items: [
        { name: 'Cargo & Assets', path: '/cargo-assets', icon: Boxes, isRoute: true },
        { name: 'Inventory', path: '/inventory', icon: Package, isRoute: true },
      ],
    },
    {
      title: 'FIELD',
      items: [
        { name: 'Field Operations', path: '/field-operations', icon: Radio, isRoute: true },
        { name: 'Synchronization', path: '/synchronization', icon: RefreshCw, isRoute: true },
      ],
    },
    {
      title: 'RESPONSE',
      items: [
        { name: 'Emergency', path: '/emergency', icon: ShieldAlert, isRoute: true },
      ],
    },
    {
      title: 'KNOWLEDGE',
      items: [
        { name: 'Knowledge Hub', path: '/knowledge-hub', icon: BookOpen, isRoute: true },
      ],
    },
  ];

  const roleViews = [
    { name: 'Command Center', path: '/command-center', icon: LayoutDashboard },
    { name: 'Field Mode', path: '/field-operations', icon: Radio },
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
      <div className="px-4 py-3.5 border-b border-[#0c3b6e]/80">
        <NavLink to="/command-center" className="flex items-center gap-2.5 group">
          <ExpediXLogo
            variant="horizontal"
            theme="dark"
            size="md"
            badge="PROTOTYPE"
          />
        </NavLink>
        <p className="text-[11px] text-sky-100 font-medium leading-tight truncate mt-1 pl-[44px]">
          Polar Logistics &amp; Operations
        </p>
      </div>

      {/* Navigation Scrollable Area */}
      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-3.5">
        
        {/* Command Center Button */}
        <div>
          <NavLink
            to="/command-center"
            onClick={onClose}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isCommandCenterActive
                ? 'bg-polar-blue text-white shadow-sm'
                : 'text-slate-200 hover:text-white hover:bg-[#0c3b6e]/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-white" />
            <span>Command Center</span>
          </NavLink>
        </div>

        {/* Operational Modules with Expeditions active route */}
        {operationalSections.map((section) => (
          <div key={section.title}>
            <div className="px-3 mb-1 text-[11px] font-bold uppercase tracking-wider text-sky-300">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                if (item.isRoute && item.path) {
                  const isActive =
                    (item.path === '/expeditions' && isExpeditionsActive) ||
                    (item.path === '/personnel' && isPersonnelActive) ||
                    (item.path === '/return-closeout' && isReturnCloseoutActive) ||
                    (item.path === '/cargo-assets' && isCargoAssetsActive) ||
                    (item.path === '/inventory' && isInventoryActive) ||
                    (item.path === '/field-operations' && isFieldOperationsActive) ||
                    (item.path === '/synchronization' && isSynchronizationActive) ||
                    (item.path === '/emergency' && isEmergencyActive) ||
                    (item.path === '/knowledge-hub' && isKnowledgeHubActive);
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-polar-blue text-white font-semibold shadow-xs'
                          : 'text-slate-200 hover:text-white hover:bg-[#0c3b6e]/60'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-300'}`} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                }

                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#0c3b6e]/40 cursor-pointer transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-sky-400/80" />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* ROLE VIEWS section */}
        <div>
          <div className="px-3 mb-1 text-[11px] font-bold uppercase tracking-wider text-sky-300">
            ROLE VIEWS
          </div>
          <div className="space-y-0.5">
            {roleViews.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-polar-blue/40 text-sky-200 font-semibold border border-sky-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-[#0c3b6e]/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-sky-400" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

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
              <p className="text-[11px] text-sky-200 font-medium truncate">
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
