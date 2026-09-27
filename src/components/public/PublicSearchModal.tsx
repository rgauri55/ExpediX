import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Database,
  Compass,
  FileText,
  Image as ImageIcon,
  ArrowRight,
  Eye,
} from 'lucide-react';
import {
  FEATURED_PUBLIC_EXPEDITIONS,
  PUBLIC_DATASETS,
  PUBLIC_MEDIA_ITEMS,
  PUBLIC_PUBLICATIONS,
} from '../../data/publicPortalData';

interface PublicSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicSearchModal: React.FC<PublicSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedExpeditions = FEATURED_PUBLIC_EXPEDITIONS.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.researchThemes.some((t) => t.toLowerCase().includes(q))
    );

    const matchedDatasets = PUBLIC_DATASETS.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.researchArea.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );

    const matchedPublications = PUBLIC_PUBLICATIONS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
    );

    const matchedMedia = PUBLIC_MEDIA_ITEMS.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );

    const totalMatches =
      matchedExpeditions.length +
      matchedDatasets.length +
      matchedPublications.length +
      matchedMedia.length;

    return {
      expeditions: matchedExpeditions,
      datasets: matchedDatasets,
      publications: matchedPublications,
      media: matchedMedia,
      totalMatches,
    };
  }, [query]);

  if (!isOpen) return null;

  const handleSelectExpedition = (id: string) => {
    onClose();
    navigate(`/public-portal/expedition/${id}`);
  };

  const handleSelectDataset = (id: string) => {
    onClose();
    navigate(`/public-portal/dataset/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden text-xs animate-fadeIn">
        
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-polar-blue shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search polar expeditions, public datasets, reports, media..."
            className="w-full bg-transparent text-slate-800 text-sm placeholder-slate-400 outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-slate-500 hover:text-slate-700 font-medium text-xs rounded-md bg-white border border-slate-200"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {!searchResults ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <p className="text-xs">
                Type keywords like <strong className="text-slate-700">"Bharati"</strong>, <strong className="text-slate-700">"Glaciology"</strong>, <strong className="text-slate-700">"Atmospheric"</strong>, or <strong className="text-slate-700">"Ice Core"</strong>.
              </p>
              <span className="text-[11px] font-mono block text-emerald-600 font-medium">
                ✓ Live Search: Filtered for Publicly Approved Records Only
              </span>
            </div>
          ) : searchResults.totalMatches === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-1">
              <p className="text-sm font-semibold text-slate-700">No public records found</p>
              <p className="text-xs">No open datasets, expeditions or publications match "{query}".</p>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Expeditions */}
              {searchResults.expeditions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    <Compass className="w-3.5 h-3.5 text-sky-600" />
                    <span>Expeditions ({searchResults.expeditions.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.expeditions.map((exp) => (
                      <div
                        key={exp.id}
                        onClick={() => handleSelectExpedition(exp.id)}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-polar-blue hover:bg-sky-50/50 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-slate-800 text-xs group-hover:text-polar-blue">
                              {exp.title}
                            </span>
                            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                              {exp.id}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-md">
                            {exp.location} • {exp.researchThemes.join(' · ')}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-polar-blue shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Datasets */}
              {searchResults.datasets.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    <Database className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Public Datasets ({searchResults.datasets.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.datasets.map((ds) => (
                      <div
                        key={ds.id}
                        onClick={() => handleSelectDataset(ds.id)}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-slate-800 text-xs group-hover:text-emerald-700">
                              {ds.title}
                            </span>
                            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                              {ds.id}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-md">
                            {ds.location} • {ds.researchArea} • {ds.dataType}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                          Public
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publications */}
              {searchResults.publications.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Reports &amp; Publications ({searchResults.publications.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.publications.map((pub) => (
                      <div
                        key={pub.id}
                        className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-heading font-bold text-slate-800 text-xs">
                            {pub.title}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {pub.type} • {pub.date} • {pub.expedition}
                          </p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {pub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Media */}
              {searchResults.media.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                    <span>Media &amp; Imagery ({searchResults.media.length})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {searchResults.media.map((m) => (
                      <div
                        key={m.id}
                        className="p-2 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2.5"
                      >
                        <img
                          src={m.image}
                          alt={m.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="truncate">
                          <div className="font-bold text-slate-800 text-xs truncate">
                            {m.title}
                          </div>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {m.type} • {m.durationOrCount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 text-emerald-700">
            <Eye className="w-3.5 h-3.5" />
            <span>Public Open Science Index</span>
          </span>
          <span className="font-mono text-slate-400">
            ExpediX Open Portal
          </span>
        </div>

      </div>
    </div>
  );
};
