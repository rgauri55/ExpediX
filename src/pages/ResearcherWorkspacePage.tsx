import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  StickyNote,
  Key,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  Download,
  Layers,
} from 'lucide-react';
import { useResearcher } from '../context/ResearcherContext';
import { CreateNoteModal } from '../components/researcher/CreateNoteModal';
import { AddToCollectionModal } from '../components/researcher/AddToCollectionModal';

export const ResearcherWorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'saved';

  const {
    datasets,
    savedDatasetIds,
    collections,
    notes,
    accessRequests,
    activities,
    toggleSaveDataset,
    deleteNote,
    removeDatasetFromCollection,
    downloadDatasetCsv,
  } = useResearcher();

  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);

  const savedDatasets = datasets.filter(d => savedDatasetIds.includes(d.id));

  const setTab = (tabName: string) => {
    setSearchParams({ tab: tabName });
  };

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Authenticated Scientist Workspace
            </span>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              My Research Workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage bookmarked datasets, thematic research collections, field observation notes, and data access requests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreateNoteOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
            >
              <StickyNote className="w-3.5 h-3.5 text-amber-600" />
              <span>Add Note</span>
            </button>
            <button
              onClick={() => setIsAddCollectionOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-polar-blue hover:bg-sky-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Collection</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 border-t border-slate-100 mt-5">
          <button
            onClick={() => setTab('saved')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'saved'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Datasets</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono">
              {savedDatasets.length}
            </span>
          </button>

          <button
            onClick={() => setTab('collections')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'collections'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Collections</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono">
              {collections.length}
            </span>
          </button>

          <button
            onClick={() => setTab('notes')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'notes'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span>Research Notes</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono">
              {notes.length}
            </span>
          </button>

          <button
            onClick={() => setTab('requests')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'requests'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Access Requests</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">
              {accessRequests.length}
            </span>
          </button>

          <button
            onClick={() => setTab('activity')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'activity'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Recent Activity</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Saved Datasets */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedDatasets.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No Datasets Saved Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Bookmark datasets in the repository to keep them ready for offline analysis and rapid export.
              </p>
              <button
                onClick={() => navigate('/researcher')}
                className="px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedDatasets.map(ds => (
                <div
                  key={ds.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                          {ds.id}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 text-polar-blue">
                          {ds.researchArea}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSaveDataset(ds.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded"
                        title="Remove from Saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] space-y-1 text-slate-600">
                      <div className="flex justify-between">
                        <span>Expedition:</span>
                        <span className="font-mono font-medium text-slate-800">{ds.expedition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CRS Coordinates:</span>
                        <span className="font-mono text-slate-800">{ds.metadata.coordinateReference}</span>
                      </div>
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
                        <span>Download CSV</span>
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                        Controlled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Research Collections */}
      {activeTab === 'collections' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map(col => (
              <div
                key={col.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-sm text-slate-900">{col.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Updated {col.updatedAt}</span>
                  </div>
                  <p className="text-xs text-slate-600">{col.description}</p>
                </div>

                {/* Included Datasets */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Datasets in Collection ({col.datasetIds.length})
                  </span>
                  <div className="space-y-1.5">
                    {col.datasetIds.map(id => {
                      const ds = datasets.find(d => d.id === id);
                      return (
                        <div
                          key={id}
                          className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                              {id}
                            </span>
                            <span className="font-medium text-slate-900 truncate max-w-xs">
                              {ds?.title || id}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => navigate(`/researcher/dataset/${id}`)}
                              className="p-1 text-slate-400 hover:text-polar-blue"
                              title="View"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => removeDatasetFromCollection(col.id, id)}
                              className="p-1 text-slate-400 hover:text-rose-600"
                              title="Remove from collection"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Research Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map(note => (
              <div
                key={note.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <StickyNote className="w-4 h-4 text-amber-500 shrink-0" />
                      <h3 className="font-bold text-sm text-slate-900">{note.title}</h3>
                    </div>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {note.datasetId && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-polar-blue text-[11px] font-mono font-medium">
                      Linked: {note.datasetId}
                    </div>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                  Recorded: {note.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Access Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {accessRequests.map(req => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                      {req.id}
                    </span>
                    <span className="font-bold text-sm text-slate-900">
                      {req.datasetId} — {req.datasetTitle}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {req.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 text-xs text-slate-700">
                  <div>
                    <strong className="text-slate-900 block">Institution:</strong>
                    <span>{req.institution}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Research Purpose:</strong>
                    <span>{req.researchPurpose}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Dissemination Plan:</strong>
                    <span>{req.expectedUse}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  Submitted: {req.submittedAt} • Review SLA: 24-48 hours
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Recent Activity */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="divide-y divide-slate-100">
            {activities.map(act => (
              <div key={act.id} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    {act.type === 'download' && <Download className="w-4 h-4 text-polar-blue" />}
                    {act.type === 'saved' && <Bookmark className="w-4 h-4 text-polar-blue" />}
                    {act.type === 'note' && <StickyNote className="w-4 h-4 text-amber-500" />}
                    {act.type === 'collection' && <Layers className="w-4 h-4 text-emerald-600" />}
                    {act.type === 'request' && <Key className="w-4 h-4 text-amber-600" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{act.action}</p>
                    <p className="text-[11px] text-slate-500">{act.target}</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateNoteModal
        isOpen={isCreateNoteOpen}
        onClose={() => setIsCreateNoteOpen(false)}
      />

      {isAddCollectionOpen && (
        <AddToCollectionModal
          isOpen={true}
          datasetId="KN-002"
          onClose={() => setIsAddCollectionOpen(false)}
        />
      )}
    </div>
  );
};
