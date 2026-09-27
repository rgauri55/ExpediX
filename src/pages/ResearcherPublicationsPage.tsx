import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Download,
  Compass,
  CheckCircle,
} from 'lucide-react';
import { useResearcher } from '../context/ResearcherContext';

export const ResearcherPublicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { publications, datasets } = useResearcher();
  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState('All');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredPubs = publications.filter(pub => {
    const matchesSearch =
      search === '' ||
      pub.title.toLowerCase().includes(search.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(search.toLowerCase()) ||
      pub.author.toLowerCase().includes(search.toLowerCase()) ||
      pub.expedition.toLowerCase().includes(search.toLowerCase());

    const matchesArea = selectedArea === 'All' || pub.researchArea.includes(selectedArea);
    return matchesSearch && matchesArea;
  });

  const handleDownloadBrief = (pubTitle: string) => {
    setDownloadSuccess(pubTitle);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Scientific Literature &amp; Syntheses
            </span>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Publications &amp; Scientific Reports
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Peer-reviewed mission syntheses, environmental baseline evaluations, and interdisciplinary field reports.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-800">
              {publications.length} Approved Publications
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search publications by title, author, keyword, or expedition..."
            className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedArea}
            onChange={e => setSelectedArea(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-polar-blue"
          >
            <option value="All">All Scientific Areas</option>
            <option value="Glaciology">Glaciology</option>
            <option value="Atmospheric">Atmospheric Science</option>
            <option value="Oceanography">Oceanography</option>
            <option value="Geophysics">Geophysics</option>
          </select>
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredPubs.map(pub => {
          const linkedDatasets = datasets.filter(d => d.expedition === pub.expedition);
          return (
            <div
              key={pub.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 text-polar-blue border border-sky-200">
                      {pub.type}
                    </span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      {pub.year}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      {pub.status}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 leading-snug">
                    {pub.title}
                  </h2>

                  <p className="text-xs font-medium text-slate-600">
                    Primary Authors: <span className="text-slate-800">{pub.author}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownloadBrief(pub.title)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Summary PDF</span>
                  </button>
                </div>
              </div>

              {downloadSuccess === pub.title && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Demonstration PDF summary successfully dispatched to download tray.</span>
                </div>
              )}

              <p className="text-xs text-slate-600 leading-relaxed">
                {pub.abstract}
              </p>

              {/* Expedition Origin & Linked Datasets */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Expedition Context:</span>
                  <button
                    onClick={() => navigate(`/researcher/expedition/${pub.expedition}`)}
                    className="font-mono font-bold text-polar-blue hover:underline flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{pub.expedition}</span>
                  </button>
                </div>

                {linkedDatasets.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Linked Datasets:</span>
                    {linkedDatasets.slice(0, 2).map(d => (
                      <button
                        key={d.id}
                        onClick={() => navigate(`/researcher/dataset/${d.id}`)}
                        className="font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-polar-blue border border-slate-200 text-[11px]"
                      >
                        {d.id}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
