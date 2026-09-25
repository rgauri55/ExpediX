import React from 'react';
import { Globe, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';

export const PublicPortalPage: React.FC = () => {
  const { currentExpedition } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-polar-border p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="neutral" dot size="sm">
                Public Dissemination Portal
              </Badge>
              <Badge variant="warning" size="sm">
                Simulation
              </Badge>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-navy-DEFAULT tracking-tight">
              Polar Mission Public Showcase
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Public outreach, mission timeline milestones, and open polar science insights.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-500" />
              <span>Public Access: Read Only</span>
            </div>
          </div>
        </div>

        {/* Expedition information */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Featured Mission: <strong className="text-slate-800">{currentExpedition.name}</strong> ({currentExpedition.code})
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
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-navy-DEFAULT">
            Outreach &amp; Public Transparency Shell
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The Public Portal provides sanitized, delayed telemetry feeds and mission dispatches to educational institutions, media, and citizens following the progress of polar research expeditions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-800 mb-1">Mission Progress Milestones</h4>
              <p className="text-xs text-slate-500">Live timeline of scientific discoveries and traverse expeditions.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-800 mb-1">Educational Open Data</h4>
              <p className="text-xs text-slate-500">Accessible weather trends and atmospheric measurements.</p>
            </div>
          </div>
          <div className="pt-2 text-xs text-slate-400 font-mono">
            Public feed stories and open data dashboards will be released in subsequent milestones.
          </div>
        </div>
      </div>
    </div>
  );
};
