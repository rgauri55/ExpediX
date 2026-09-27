import React, { useState } from 'react';
import { X, FolderPlus, Plus, Check } from 'lucide-react';
import { useResearcher } from '../../context/ResearcherContext';

interface AddToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  datasetId: string;
}

export const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({
  isOpen,
  onClose,
  datasetId,
}) => {
  const { collections, addDatasetToCollection, createCollection } = useResearcher();
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAddExisting = (colId: string) => {
    addDatasetToCollection(colId, datasetId);
    setSuccessMsg('Dataset added to collection!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  const handleCreateAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    createCollection(newColName.trim(), newColDesc.trim(), [datasetId]);
    setSuccessMsg('Collection created with dataset!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-sm text-slate-100">Add to Research Collection</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {successMsg ? (
            <div className="p-6 text-center text-emerald-700 bg-emerald-50 rounded-xl font-medium text-xs flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              {successMsg}
            </div>
          ) : !isCreatingNew ? (
            <>
              <div className="text-xs text-slate-600">
                Choose an existing scientific research collection for <strong className="font-mono text-slate-800">{datasetId}</strong>:
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto">
                {collections.map(col => {
                  const alreadyIn = col.datasetIds.includes(datasetId);
                  return (
                    <div
                      key={col.id}
                      onClick={() => !alreadyIn && handleAddExisting(col.id)}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                        alreadyIn
                          ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-slate-200 hover:border-polar-blue hover:bg-sky-50/50 cursor-pointer text-slate-800'
                      }`}
                    >
                      <div>
                        <span className="font-semibold block">{col.name}</span>
                        <span className="text-[11px] text-slate-500">
                          {col.datasetIds.length} dataset{col.datasetIds.length !== 1 ? 's' : ''} • Updated {col.updatedAt}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-polar-blue">
                        {alreadyIn ? 'Added' : 'Select'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(true)}
                  className="text-xs font-semibold text-polar-blue hover:text-sky-600 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create New Collection
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleCreateAndAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  value={newColName}
                  onChange={e => setNewColName(e.target.value)}
                  placeholder="e.g. Larsemann Hills Mass Balance"
                  required
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newColDesc}
                  onChange={e => setNewColDesc(e.target.value)}
                  placeholder="Summary of research focus and dataset grouping..."
                  rows={3}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Back to existing
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-polar-blue hover:bg-sky-600 rounded-lg shadow-xs"
                  >
                    Save &amp; Add
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
