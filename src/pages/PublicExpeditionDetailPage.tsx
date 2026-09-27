import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Database,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { PublicNavbar } from '../components/public/PublicNavbar';
import { PublicFooter } from '../components/public/PublicFooter';
import {
  FEATURED_PUBLIC_EXPEDITIONS,
  PUBLIC_DATASETS,
  PUBLIC_MEDIA_ITEMS,
} from '../data/publicPortalData';

export const PublicExpeditionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const expedition = FEATURED_PUBLIC_EXPEDITIONS.find(
    (e) => e.id.toLowerCase() === id?.toLowerCase()
  );

  if (!expedition) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <PublicNavbar />
        <div className="flex-1 max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="font-heading font-bold text-2xl text-slate-800">
            Expedition Not Found
          </h2>
          <p className="text-xs text-slate-500">
            The requested public expedition record "{id}" could not be located.
          </p>
          <Link
            to="/public-portal"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-polar-blue text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Portal</span>
          </Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  // Related public datasets
  const relatedDatasets = PUBLIC_DATASETS.filter((d) => d.expeditionId === expedition.id);
  const relatedMedia = PUBLIC_MEDIA_ITEMS.filter((m) => m.expedition === expedition.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      <PublicNavbar />

      {/* Hero Banner */}
      <div className="relative bg-[#041A35] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={expedition.image}
            alt={expedition.title}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041A35] via-[#041A35]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-sky-200">
            <Link to="/public-portal" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </Link>
            <span>/</span>
            <span className="text-slate-300 font-mono">{expedition.id}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs">
              {expedition.region}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                expedition.status === 'Active'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-600 text-slate-200'
              }`}
            >
              {expedition.status}
            </span>
            <span className="text-xs text-sky-300 font-mono">{expedition.dates}</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            {expedition.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {expedition.tagline}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span className="font-medium">{expedition.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Season {expedition.year}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Research Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Overview */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h2 className="font-heading font-bold text-lg text-slate-900 pb-2 border-b border-slate-100">
              Expedition Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {expedition.overview}
            </p>

            <div className="space-y-2 pt-2">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-500">
                Key Scientific Investigations:
              </h3>
              <ul className="space-y-2">
                {expedition.featuredScience.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Metrics Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h2 className="font-heading font-bold text-sm text-slate-900 pb-2 border-b border-slate-100 uppercase tracking-wider">
              Mission Summary
            </h2>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Station Base</span>
                <span className="font-semibold text-slate-800">{expedition.location}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Mission Status</span>
                <span className="font-semibold text-slate-800">{expedition.status}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Research Domains</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {expedition.researchThemes.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-sky-50 text-polar-blue text-[11px] font-medium border border-sky-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Published Records</span>
                <span className="font-mono font-bold text-slate-800">{expedition.datasetCount} Datasets · {expedition.publicationCount} Reports</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-700 block mb-0.5">Privacy Notice:</span>
              Internal personnel rosters, operational logistics, and emergency logs are restricted to authenticated Command Center consoles.
            </div>
          </div>

        </div>

        {/* Public Datasets from this Expedition */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-polar-blue" />
              <h2 className="font-heading font-bold text-lg text-slate-900">
                Public Datasets ({relatedDatasets.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Prototype Dataset Collection</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedDatasets.map((ds) => (
              <div
                key={ds.id}
                onClick={() => navigate(`/public-portal/dataset/${ds.id}`)}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-polar-blue hover:shadow-md transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-700 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    {ds.id}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{ds.dataType}</span>
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-polar-blue transition-colors">
                  {ds.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {ds.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span>{ds.researchArea}</span>
                  <span className="text-polar-blue font-semibold inline-flex items-center gap-1">
                    <span>View Dataset</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Public Reports from this Expedition */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="font-heading font-bold text-lg text-slate-900">
              Expedition Reports &amp; Publications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expedition.publicReports.map((rep, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{rep.type}</span>
                  <span>{rep.date}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  {rep.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rep.summary}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => alert(`Simulated Download: ${rep.title}`)}
                    className="text-xs font-semibold text-polar-blue hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Download Public Report (PDF)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Highlights from this Expedition */}
        {relatedMedia.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <ImageIcon className="w-5 h-5 text-amber-600" />
              <h2 className="font-heading font-bold text-lg text-slate-900">
                Expedition Media Gallery
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedMedia.map((media) => (
                <div key={media.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex items-center gap-3 p-3">
                  <img
                    src={media.image}
                    alt={media.title}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-polar-blue">{media.type} • {media.durationOrCount}</span>
                    <h3 className="font-heading font-bold text-xs text-slate-900">{media.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{media.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <PublicFooter />
    </div>
  );
};
