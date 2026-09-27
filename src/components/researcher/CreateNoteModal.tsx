import React, { useState } from 'react';
import { X, StickyNote, Check } from 'lucide-react';
import { useResearcher } from '../../context/ResearcherContext';

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDatasetId?: string;
}

export const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  isOpen,
  onClose,
  defaultDatasetId,
}) => {
  const { createNote, datasets } = useResearcher();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDatasetId, setSelectedDatasetId] = useState(defaultDatasetId || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createNote(title.trim(), content.trim(), selectedDatasetId || undefined);
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StickyNote className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-slate-100">Add Research Note</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Larsemann Hills ablation correlation"
              required
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Linked Dataset (Optional)
            </label>
            <select
              value={selectedDatasetId}
              onChange={e => setSelectedDatasetId(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue bg-white"
            >
              <option value="">-- General Research Note (None) --</option>
              {datasets.map(d => (
                <option key={d.id} value={d.id}>
                  {d.id} - {d.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observations &amp; Research Memo
            </label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Record scientific hypotheses, anomalous sensor readings, or literature references..."
              rows={4}
              required
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-polar-blue hover:bg-sky-600 rounded-lg shadow-xs transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
