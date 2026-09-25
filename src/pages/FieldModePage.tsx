import React from 'react';
import { Radio, WifiOff, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';

export const FieldModePage: React.FC = () => {
  const { currentUser, currentExpedition } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-polar-border p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="offline" dot size="sm">
                Field Mode (Offline Ready)
              </Badge>
              <Badge variant="warning" size="sm">
                Simulation
              </Badge>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-navy-DEFAULT tracking-tight">
              Field Operations &amp; Traverse Mode
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Optimized high-contrast, low-bandwidth interface for traverse teams and remote field camps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200/80 text-orange-800 text-xs font-medium flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-orange-600" />
              <span>Offline Cache: Synced</span>
            </div>
          </div>
        </div>

        {/* Role information */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Active Operator: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.roleTitle})
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-polar-blue" />
            <span>Station: {currentExpedition.stationName} (Antarctica)</span>
          </div>
        </div>
      </div>

      {/* Field Mode Overview Card */}
      <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-subtle">
        <div className="max-w-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center">
            <Radio className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-navy-DEFAULT">
            Field Unit Operations Shell
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The Field Mode is designed for traverse operators, glaciological field workers, and remote field camps operating in harsh polar conditions with intermittent or zero satellite connectivity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-800 mb-1">Local SQLite / IndexedDB Buffer</h4>
              <p className="text-xs text-slate-500">Records waypoints, vehicle telemetry and logs without internet.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-800 mb-1">Store-and-Forward Sync</h4>
              <p className="text-xs text-slate-500">Auto-syncs telemetry when returning to Bharati Station mesh network.</p>
            </div>
          </div>
          <div className="pt-2 text-xs text-slate-400 font-mono">
            Full field logging modules and SOS trigger controls arriving in subsequent milestones.
          </div>
        </div>
      </div>
    </div>
  );
};
