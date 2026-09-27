import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Globe,
  Menu,
  X,
  Layers,
} from 'lucide-react';
import { ExpediXLogo } from '../common/ExpediXLogo';

interface PublicNavbarProps {
  onOpenSearch?: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onOpenSearch }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/public-portal#${id}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-6">
            <Link to="/public-portal" className="flex items-center gap-2 group">
              <ExpediXLogo
                variant="horizontal"
                theme="light"
                size="md"
                badge="Public"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600">
              <Link
                to="/public-portal"
                className="px-3 py-1.5 rounded-lg hover:text-polar-blue hover:bg-slate-50 transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection('expeditions')}
                className="px-3 py-1.5 rounded-lg hover:text-polar-blue hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Expeditions
              </button>
              <button
                onClick={() => scrollToSection('science')}
                className="px-3 py-1.5 rounded-lg hover:text-polar-blue hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Science
              </button>
              <button
                onClick={() => scrollToSection('datasets')}
                className="px-3 py-1.5 rounded-lg hover:text-polar-blue hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Datasets
              </button>
              <button
                onClick={() => scrollToSection('publications')}
                className="px-3 py-1.5 rounded-lg hover:text-polar-blue hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Reports &amp; Publications
              </button>
              <button
                onClick={() => scrollToSection('media')}
                className="px-3 py-1.5 rounded-lg hover:text-polar-blue hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Media
              </button>
              <button
                onClick={() => scrollToSection('journey')}
                className="px-3 py-1.5 rounded-lg hover:text-polar-blue hover:bg-slate-50 transition-colors cursor-pointer"
              >
                About
              </button>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Search datasets, missions...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-200 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={onOpenSearch}
              className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <div className="hidden lg:flex items-center gap-1 text-xs text-slate-600 font-medium px-2 py-1 rounded bg-slate-50 border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>EN</span>
            </div>

            {/* Internal Command Center Quick Switcher */}
            <Link
              to="/command-center"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#082D56] hover:bg-navy-DEFAULT text-white font-semibold text-xs shadow-2xs transition-colors"
              title="Switch to Internal Operations Console"
            >
              <Layers className="w-3.5 h-3.5 text-sky-300" />
              <span>Internal System</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-1 text-xs font-semibold text-slate-700">
            <Link
              to="/public-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection('expeditions')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Expeditions
            </button>
            <button
              onClick={() => scrollToSection('science')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Science
            </button>
            <button
              onClick={() => scrollToSection('datasets')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Datasets
            </button>
            <button
              onClick={() => scrollToSection('publications')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Reports &amp; Publications
            </button>
            <button
              onClick={() => scrollToSection('media')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Media
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              About / India's Polar Journey
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/command-center"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 rounded-lg bg-[#082D56] text-white font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-sky-300" />
              <span>Internal Command Center</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
