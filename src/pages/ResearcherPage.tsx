import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Download,
  Bookmark,
  BookmarkCheck,
  FolderPlus,
  Lock,
  Globe,
  SlidersHorizontal,
  RefreshCcw,
  ArrowRight,
  CheckCircle,
  FlaskConical,
  Sparkles,
  LayoutGrid,
  Table as TableIcon,
} from 'lucide-react';
import { useResearcher } from '../context/ResearcherContext';
import type { ResearcherDataset } from '../types';
import { RequestAccessModal } from '../components/researcher/RequestAccessModal';
import { AddToCollectionModal } from '../components/researcher/AddToCollectionModal';
import { AIResearchAssistantModal } from '../components/researcher/AIResearchAssistantModal';

export const ResearcherPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    datasets,
    savedDatasetIds,
    toggleSaveDataset,
    isDatasetSaved,
    downloadDatasetCsv,
    searchQuery,
    setSearchQuery,
    selectedArea,
    setSelectedArea,
    selectedExpedition,
    setSelectedExpedition,
    selectedDataType,
    setSelectedDataType,
    selectedAccess,
    setSelectedAccess,
    selectedYear,
    setSelectedYear,
    resetFilters,
  } = useResearcher();

  const [selectedControlledDataset, setSelectedControlledDataset] = useState<ResearcherDataset | null>(null);
  const [collectionDatasetId, setCollectionDatasetId] = useState<string | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Filter datasets
  const filteredDatasets = datasets.filter(ds => {
    const matchesSearch =
      searchQuery === '' ||
      ds.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.parameters.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ds.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesArea = selectedArea === 'All' || ds.researchArea === selectedArea;
    const matchesExpedition = selectedExpedition === 'All' || ds.expedition === selectedExpedition;
    const matchesDataType = selectedDataType === 'All' || ds.dataType === selectedDataType;
    const matchesAccess = selectedAccess === 'All' || ds.access === selectedAccess;
    const matchesYear = selectedYear === 'All' || ds.year === selectedYear;

    return (
      matchesSearch &&
      matchesArea &&
      matchesExpedition &&
      matchesDataType &&
      matchesAccess &&
      matchesYear
    );
  });

  const areas = ['All', 'Atmospheric Science', 'Glaciology', 'Oceanography', 'Climate Science', 'Geophysics'];
  const expeditions = ['All', 'IAE-2026-W03', 'IAE-2025-W02', 'SOM-2025'];
  const dataTypes = ['All', 'Time Series', 'Measurement', 'Observational', 'Sample Metadata'];
  const accessLevels = ['All', 'Public', 'Controlled'];
  const years = ['All', '2026', '2025'];

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedArea !== 'All' ||
    selectedExpedition !== 'All' ||
    selectedDataType !== 'All' ||
    selectedAccess !== 'All' ||
    selectedYear !== 'All';

  return (
    <div className="space-y-6">
      {/* Workspace Header & Operational Telemetry */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-50 text-polar-blue border border-sky-200 font-semibold text-xs">
                <FlaskConical className="w-3.5 h-3.5" />
                Scientific Data Repository
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Level 1/2 Calibrated
              </span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Polar Datasets &amp; Scientific Catalog
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Access verified observational time series, cryo-sample manifests, and physical oceanography profiles across Indian polar missions.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-left">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Available Datasets</span>
              <span className="text-base font-bold text-slate-900 font-mono">{datasets.length} Records</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-left">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Saved in Workspace</span>
              <span className="text-base font-bold text-polar-blue font-mono">{savedDatasetIds.length} Saved</span>
            </div>
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>AI Query Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Multidimensional Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Main search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by dataset title, sensor parameter, catalog ID, or station location..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
            />
          </div>

          {/* Table / Grid view switcher & Reset */}
          <div className="flex items-center gap-2 justify-between md:justify-end">
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Selectors Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Research Area */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
              Research Discipline
            </label>
            <select
              value={selectedArea}
              onChange={e => setSelectedArea(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-polar-blue"
            >
              {areas.map(a => (
                <option key={a} value={a}>
                  {a === 'All' ? 'All Disciplines' : a}
                </option>
              ))}
            </select>
          </div>

          {/* Expedition */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
              Expedition Origin
            </label>
            <select
              value={selectedExpedition}
              onChange={e => setSelectedExpedition(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-polar-blue"
            >
              {expeditions.map(exp => (
                <option key={exp} value={exp}>
                  {exp === 'All' ? 'All Expeditions' : exp}
                </option>
              ))}
            </select>
          </div>

          {/* Data Type */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
              Measurement Type
            </label>
            <select
              value={selectedDataType}
              onChange={e => setSelectedDataType(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-polar-blue"
            >
              {dataTypes.map(t => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Data Types' : t}
                </option>
              ))}
            </select>
          </div>

          {/* Access Level */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
              Access Governance
            </label>
            <select
              value={selectedAccess}
              onChange={e => setSelectedAccess(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-polar-blue"
            >
              {accessLevels.map(acc => (
                <option key={acc} value={acc}>
                  {acc === 'All' ? 'All Access Levels' : `${acc} Access`}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
              Observation Year
            </label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-polar-blue"
            >
              {years.map(y => (
                <option key={y} value={y}>
                  {y === 'All' ? 'All Years' : y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dataset Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredDatasets.length}</strong> matching scientific record{filteredDatasets.length !== 1 ? 's' : ''}
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          Standard Schema: WMO &amp; SCAR Data Format
        </span>
      </div>

      {/* Main Datasets View */}
      {filteredDatasets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Datasets Match Your Filter Criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords, research discipline, or access level settings.
          </p>
          <button
            onClick={resetFilters}
            className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* Scientific Dense Table View */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-[13px]">
              <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-5">Dataset &amp; Title</th>
                  <th className="py-3.5 px-4">Discipline</th>
                  <th className="py-3.5 px-4">Expedition / Location</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-3">Version</th>
                  <th className="py-3.5 px-4">Access</th>
                  <th className="py-3.5 px-4 sm:px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDatasets.map(ds => {
                  const isSaved = isDatasetSaved(ds.id);
                  return (
                    <tr
                      key={ds.id}
                      className="hover:bg-sky-50/50 transition-colors group"
                    >
                      <td className="py-3.5 px-4 sm:px-5">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleSaveDataset(ds.id)}
                            className={`mt-0.5 p-1.5 rounded-lg transition-colors ${
                              isSaved
                                ? 'text-polar-blue bg-sky-50 hover:bg-sky-100'
                                : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                            }`}
                            title={isSaved ? 'Saved in Workspace' : 'Save to Workspace'}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="w-4 h-4 fill-polar-blue text-polar-blue" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                                {ds.id}
                              </span>
                              <button
                                onClick={() => navigate(`/researcher/dataset/${ds.id}`)}
                                className="font-bold text-slate-900 hover:text-polar-blue text-left transition-colors text-sm"
                              >
                                {ds.title}
                              </button>
                            </div>
                            <p className="text-xs text-slate-600 font-medium mt-1 line-clamp-1">
                              {ds.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {ds.parameters.slice(0, 3).map((p, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-medium border border-slate-200/60"
                                >
                                  {p}
                                </span>
                              ))}
                              {ds.parameters.length > 3 && (
                                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                                  +{ds.parameters.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800">
                          {ds.researchArea}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 text-xs sm:text-[13px]">{ds.location}</div>
                        <button
                          onClick={() => navigate(`/researcher/expedition/${ds.expedition}`)}
                          className="text-xs text-polar-blue hover:underline font-mono font-semibold mt-0.5 block"
                        >
                          {ds.expedition}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 font-medium text-xs sm:text-[13px]">
                        {ds.dataType}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-xs text-slate-500 font-medium">
                        v{ds.version}
                      </td>

                      <td className="py-3.5 px-4">
                        {ds.access === 'Public' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Globe className="w-3.5 h-3.5" />
                            Public
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                            <Lock className="w-3.5 h-3.5" />
                            Controlled
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 sm:px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setCollectionDatasetId(ds.id)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Add to Research Collection"
                          >
                            <FolderPlus className="w-4 h-4" />
                          </button>

                          {ds.access === 'Public' ? (
                            <button
                              onClick={() => downloadDatasetCsv(ds)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-polar-blue bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
                              title="Download Simulated CSV Data"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>CSV</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedControlledDataset(ds)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors"
                              title="Request Controlled Authorization"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span>Request</span>
                            </button>
                          )}

                          <button
                            onClick={() => navigate(`/researcher/dataset/${ds.id}`)}
                            className="p-1.5 text-slate-500 hover:text-polar-blue hover:bg-slate-100 rounded-lg transition-colors"
                            title="Inspect Scientific Metadata"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDatasets.map(ds => {
            const isSaved = isDatasetSaved(ds.id);
            return (
              <div
                key={ds.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-polar-blue/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                        {ds.id}
                      </span>
                      {ds.access === 'Public' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Globe className="w-3 h-3" />
                          Public
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Lock className="w-3 h-3" />
                          Controlled
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleSaveDataset(ds.id)}
                      className={`p-1 rounded-md transition-colors ${
                        isSaved
                          ? 'text-polar-blue bg-sky-50'
                          : 'text-slate-300 hover:text-slate-500'
                      }`}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 fill-polar-blue text-polar-blue" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div>
                    <h3
                      onClick={() => navigate(`/researcher/dataset/${ds.id}`)}
                      className="font-bold text-sm text-slate-900 hover:text-polar-blue cursor-pointer line-clamp-2"
                    >
                      {ds.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {ds.description}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-[11px]">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Expedition:</span>
                      <button
                        onClick={() => navigate(`/researcher/expedition/${ds.expedition}`)}
                        className="font-mono font-semibold text-polar-blue hover:underline"
                      >
                        {ds.expedition}
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Location:</span>
                      <span className="font-medium text-slate-800">{ds.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Measurement Type:</span>
                      <span className="font-medium text-slate-800">{ds.dataType}</span>
                    </div>
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

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setCollectionDatasetId(ds.id)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1 font-medium"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>Collect</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {ds.access === 'Public' ? (
                      <button
                        onClick={() => downloadDatasetCsv(ds)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-polar-blue bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>CSV</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedControlledDataset(ds)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Request Access</span>
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/researcher/dataset/${ds.id}`)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {selectedControlledDataset && (
        <RequestAccessModal
          isOpen={true}
          dataset={selectedControlledDataset}
          onClose={() => setSelectedControlledDataset(null)}
        />
      )}

      {collectionDatasetId && (
        <AddToCollectionModal
          isOpen={true}
          datasetId={collectionDatasetId}
          onClose={() => setCollectionDatasetId(null)}
        />
      )}

      <AIResearchAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  );
};
