import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { ExpediXLogo } from '../common/ExpediXLogo';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#051E3C] text-white border-t border-[#0c3666] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <ExpediXLogo
              variant="horizontal"
              theme="dark"
              size="md"
              showTagline={true}
            />
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              India's Polar Expedition &amp; Knowledge Portal — providing open access to scientific research, environmental datasets, and operational knowledge generated from expeditions at the ends of the Earth.
            </p>
            <div className="pt-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-sky-300 font-semibold border border-white/10">
                EXPEDIX PROTOTYPE SYSTEM
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Explore
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <Link to="/public-portal" className="hover:text-sky-300 transition-colors">
                  Portal Home
                </Link>
              </li>
              <li>
                <a href="#expeditions" className="hover:text-sky-300 transition-colors">
                  Featured Expeditions
                </a>
              </li>
              <li>
                <a href="#science" className="hover:text-sky-300 transition-colors">
                  Polar Science at a Glance
                </a>
              </li>
              <li>
                <a href="#datasets" className="hover:text-sky-300 transition-colors">
                  Public Datasets
                </a>
              </li>
              <li>
                <a href="#media" className="hover:text-sky-300 transition-colors">
                  Media &amp; Imagery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Research Themes */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Research Domains
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>Glaciology &amp; Cryosphere</li>
              <li>Atmospheric Science &amp; LIDAR</li>
              <li>Southern Ocean Hydrography</li>
              <li>Polar Meteorology</li>
              <li>Paleoclimate Ice Core Modeling</li>
            </ul>
          </div>

          {/* Col 5: Governance & System Link */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              System Access
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <Link to="/login" className="text-sky-300 hover:text-white transition-colors font-medium flex items-center gap-1">
                  <span>Authorized Staff Login</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/command-center" className="hover:text-sky-300 transition-colors">
                  Command Center Console
                </Link>
              </li>
              <li>
                <Link to="/knowledge-hub" className="hover:text-sky-300 transition-colors">
                  Knowledge Hub Workspace
                </Link>
              </li>
              <li className="text-slate-400 text-[11px] pt-1">
                Security Classification: Open Public Tier
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-[11px] leading-relaxed max-w-2xl text-center md:text-left">
            <strong>Prototype Disclaimer:</strong> ExpediX is a simulated operational software prototype developed for demonstration purposes. Content, metrics, and expedition data presented on this portal are fictional demonstration values. Not an official government website.
          </p>
          <div className="flex items-center gap-4 text-[11px] shrink-0 font-mono">
            <span>© 2026 ExpediX System</span>
            <span>•</span>
            <span>Bharati &amp; Maitri Stations</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
