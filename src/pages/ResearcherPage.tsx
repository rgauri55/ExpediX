import React from 'react';
import { BookOpen, FlaskConical, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';

export const ResearcherPage: React.FC = () => {
  const { currentUser, currentExpedition } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-polar-border p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary" dot size="sm">
                Researcher Workspace
              </Badge>
              <Badge variant="warning" size="sm">
                Simulation
              </Badge>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-navy-DEFAULT tracking-tight">
              Polar Scientific Data &amp; Knowledge Portal
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Scientific specimen logging, environmental datasets, and institutional knowledge preservation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200/80 text-polar-blue text-xs font-medium flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-polar-blue" />
              <span>Lab Access: Granted</span>
            </div>
          </div>
        </div>

        {/* Role information */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Active Scientist: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.roleTitle})
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-polar-blue" />
            <span>Station: {currentExpedition.stationName} (Antarctica)</span>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-subtle">
        <div className="max-w-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-polar-blue border border-sky-200 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-navy-DEFAULT">
            Scientific Knowledge Hub Shell
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The Researcher view enables scientists at polar stations and remote institutions to catalog ice-core samples, record meteorological time-series, and preserve research findings across multidisciplinary teams.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-800 mb-1">Specimen Cold-Chain Provenance</h4>
              <p className="text-xs text-slate-500">Track cryogenic specimen preservation from drill site to home lab.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-800 mb-1">Open Scientific Dissemination</h4>
              <p className="text-xs text-slate-500">Structured export formats compliant with polar data stewardship.</p>
            </div>
          </div>
          <div className="pt-2 text-xs text-slate-400 font-mono">
            Scientific data catalogs and sample submission forms will be activated in upcoming milestones.
          </div>
        </div>
      </div>
    </div>
  );
};
