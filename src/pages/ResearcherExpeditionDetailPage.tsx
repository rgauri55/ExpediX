import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Database,
  BookOpen,
  MapPin,
  Calendar,
  CheckCircle,
  ExternalLink,
  Download,
  Lock,
  Globe,
} from 'lucide-react';
import { useResearcher } from '../context/ResearcherContext';

export const ResearcherExpeditionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { datasets, publications, downloadDatasetCsv } = useResearcher();

  // Find datasets and publications for this expedition
  const expCode = id || 'IAE-2026-W03';
  const expDatasets = datasets.filter(d => d.expedition === expCode);
  const expPubs = publications.filter(p => p.expedition === expCode);

  // Expedition scientific metadata
  const expeditionProfiles: Record<
    string,
    {
      title: string;
      region: string;
      station: string;
      dates: string;
      theme: string;
      leadScientist: string;
      overview: string;
      instruments: string[];
    }
  > = {
    'IAE-2026-W03': {
      title: '45th Indian Antarctic Winter Expedition',
      region: 'East Antarctica (Princess Elizabeth Land)',
      station: 'Bharati Station (69°24\'28" S, 76°11\'14" E)',
      dates: 'November 2025 – December 2026',
      theme: 'Cryospheric Mass Balance & Atmospheric Boundary Layer Dynamics',
      leadScientist: 'Dr. Rohan Sharma (Senior Glaciologist)',
      overview: 'Investigating high-latitude coastal ice dynamics, boundary layer katabatic turbulence, and aerosol optical depths across the Larsemann Hills oasis during the 2026 polar night cycle.',
      instruments: [
        'Multi-wavelength Sun Photometer & Micro-pulse LIDAR',
        'Differential GNSS Surface Stake Network',
        'Continuous Fluxgate Magnetometer Array',
        'Automated Weather Station (AWS) Tower',
      ],
    },
    'SOM-2025': {
      title: 'Southern Ocean Biogeochemical & Physical Transect',
      region: 'Southern Ocean (57°E Meridian)',
      station: 'ORV Sagar Nidhi / Research Vessel',
      dates: 'January 2025 – March 2025',
      theme: 'Deep Water Hydrography & Circumpolar Carbon Flux',
      leadScientist: 'Dr. Ananya Ray (Physical Oceanographer)',
      overview: 'Full-depth hydrographic profiling across the Antarctic Divergence zone to observe Antarctic Bottom Water formation and nutrient transport along the 57°E transect.',
      instruments: [
        'Seabird SBE 911plus CTD Rosette System',
        'Lowered Acoustic Doppler Current Profiler (LADCP)',
        'Underway pCO2 Atmospheric & Surface Water Analyzer',
      ],
    },
    'IAE-2025-W02': {
      title: '44th Indian Antarctic Research Expedition',
      region: 'Queen Maud Land (Central Dronning Maud Land)',
      station: 'Maitri Station (70°45\'58" S, 11°43\'56" E)',
      dates: 'December 2024 – November 2025',
      theme: 'Palaeoclimate Ice Coring & Geomagnetic Storm Dynamics',
      leadScientist: 'Dr. Vikram Patel (Geophysicist)',
      overview: 'Preservation of shallow ice core specimens from the Schirmacher Oasis and high-latitude geomagnetic micropulsation monitoring during solar maximum transition.',
      instruments: [
        'Cryogenic Electro-mechanical Ice Core Drill',
        'INTERMAGNET Digital Fluxgate Magnetometer',
        'Permafrost Borehole Thermistor Strings (0-30m)',
      ],
    },
  };

  const profile =
    expeditionProfiles[expCode] || expeditionProfiles['IAE-2026-W03'];

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/researcher" className="hover:text-slate-900 font-medium">
            Researcher Workspace
          </Link>
          <span>/</span>
          <span className="text-slate-600">Expeditions</span>
          <span>/</span>
          <span className="font-mono text-slate-800 font-bold">{expCode}</span>
        </div>

        <button
          onClick={() => navigate('/researcher')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Expedition Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-900 text-white">
                {expCode}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-sky-50 text-polar-blue border border-sky-200">
                Scientific Mission Profile
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Approved Research Programs
              </span>
            </div>

            <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {profile.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              {profile.overview}
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 min-w-[240px]">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Station / Base:
                </span>
                <span className="font-medium text-slate-900 text-right">{profile.station.split('(')[0]}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Timeline:
                </span>
                <span className="font-medium text-slate-900">{profile.dates}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Lead Scientist:</span>
                <span className="font-medium text-slate-900">{profile.leadScientist}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instruments / Observatories Matrix */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Active Observational Instrumentation Arrays
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {profile.instruments.map((inst, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-polar-blue shrink-0" />
                <span>{inst}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Datasets Originating from this Expedition */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-polar-blue" />
            <span>Originating Approved Datasets ({expDatasets.length})</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Calibrated Level 1/2 Data
          </span>
        </div>

        {expDatasets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
            No datasets currently cataloged for this mission.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expDatasets.map(ds => (
              <div
                key={ds.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {ds.id}
                    </span>
                    {ds.access === 'Public' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Globe className="w-3 h-3" />
                        Public
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        <Lock className="w-3 h-3" />
                        Controlled
                      </span>
                    )}
                  </div>

                  <div>
                    <h3
                      onClick={() => navigate(`/researcher/dataset/${ds.id}`)}
                      className="font-bold text-sm text-slate-900 hover:text-polar-blue cursor-pointer"
                    >
                      {ds.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {ds.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {ds.parameters.map((p, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/researcher/dataset/${ds.id}`)}
                    className="text-xs font-semibold text-polar-blue hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Metadata</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  {ds.access === 'Public' ? (
                    <button
                      onClick={() => downloadDatasetCsv(ds)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
                    >
                      <Download className="w-3 h-3" />
                      <span>CSV</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/researcher/dataset/${ds.id}`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Request</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Publications for this expedition */}
      {expPubs.length > 0 && (
        <div className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-polar-blue" />
            <span>Mission Syntheses &amp; Scientific Reports</span>
          </h2>

          <div className="space-y-3">
            {expPubs.map(pub => (
              <div
                key={pub.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{pub.title}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {pub.author} • {pub.year} • {pub.type}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/researcher/publications')}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold whitespace-nowrap transition-colors"
                >
                  View Publication
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
