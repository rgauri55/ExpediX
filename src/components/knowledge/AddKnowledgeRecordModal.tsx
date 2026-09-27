import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import { useKnowledge } from '../../context/KnowledgeContext';
import type { KnowledgeType, KnowledgeClassification, KnowledgeResearchArea } from '../../types';

interface AddKnowledgeRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordCreated?: (recordId: string) => void;
}

export const AddKnowledgeRecordModal: React.FC<AddKnowledgeRecordModalProps> = ({
  isOpen,
  onClose,
  onRecordCreated,
}) => {
  const { addKnowledgeRecord } = useKnowledge();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<KnowledgeType>('Dataset');
  const [researchArea, setResearchArea] = useState<KnowledgeResearchArea>('Glaciology');
  const [classification, setClassification] = useState<KnowledgeClassification>('Controlled');
  const [location, setLocation] = useState('Bharati Station / Survey Zone B');
  const [owner, setOwner] = useState('Dr. Rohan Sharma');
  const [sourceRecord, setSourceRecord] = useState('TASK-220');
  const [collectionMethod, setCollectionMethod] = useState('Field Instrument / Sensor Telemetry');
  const [aiSummary, setAiSummary] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const created = addKnowledgeRecord({
      title: title.trim(),
      type,
      researchArea,
      classification,
      location,
      owner,
      sourceRecord,
      collectionMethod,
      aiSummary: aiSummary.trim() || undefined,
    });

    setTitle('');
    setAiSummary('');
    onClose();
    if (onRecordCreated) {
      onRecordCreated(created.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-polar-border max-w-lg w-full shadow-2xl overflow-hidden text-xs">
        
        {/* Modal Header */}
        <div className="p-4 bg-[#082D56] text-white flex items-center justify-between border-b border-[#0c3b6e]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-300" />
            <div>
              <h2 className="font-heading font-bold text-sm text-white">Add Knowledge Record</h2>
              <p className="text-[11px] text-sky-200/80">
                Register operational field findings into institutional knowledge repository
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Record Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ice Sheet Elevation Change Profile — Sector 4"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Record Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as KnowledgeType)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Dataset">Dataset</option>
                <option value="Report">Report</option>
                <option value="Field Observation">Field Observation</option>
                <option value="Scientific Sample">Scientific Sample</option>
                <option value="Media">Media</option>
                <option value="Incident Record">Incident Record</option>
                <option value="Lessons Learned">Lessons Learned</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Research Area *
              </label>
              <select
                value={researchArea}
                onChange={(e) => setResearchArea(e.target.value as KnowledgeResearchArea)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Glaciology">Glaciology</option>
                <option value="Atmospheric Science">Atmospheric Science</option>
                <option value="Oceanography">Oceanography</option>
                <option value="Meteorology">Meteorology</option>
                <option value="Climate Science">Climate Science</option>
                <option value="Logistics">Logistics</option>
                <option value="Safety">Safety</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Initial Classification *
              </label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value as KnowledgeClassification)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Controlled">Controlled (Internal Research Team)</option>
                <option value="Public">Public (Eligible for Review &amp; Portal)</option>
                <option value="Restricted">Restricted (Classified / Confidential)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Lead Researcher / Owner *
              </label>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              >
                <option value="Dr. Rohan Sharma">Dr. Rohan Sharma (Glaciology)</option>
                <option value="Dr. Kavya Rao">Dr. Kavya Rao (Meteorology)</option>
                <option value="Dr. Ananya Mehta">Dr. Ananya Mehta (Expedition Lead)</option>
                <option value="Priya Nair">Priya Nair (Logistics)</option>
                <option value="Arjun Singh">Arjun Singh (Technical)</option>
                <option value="Command Center Safety">Command Center Safety</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Source Task / Record ID
              </label>
              <input
                type="text"
                value={sourceRecord}
                onChange={(e) => setSourceRecord(e.target.value)}
                placeholder="e.g. TASK-219, OBS-09"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs font-mono focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Collection Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Survey Zone B / Field Camp Alpha"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Collection Method
            </label>
            <input
              type="text"
              value={collectionMethod}
              onChange={(e) => setCollectionMethod(e.target.value)}
              placeholder="e.g. Automated Sensor Array &amp; Cryogenic Core Barrel"
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Dataset Abstract / Scope Notes
            </label>
            <textarea
              rows={2}
              value={aiSummary}
              onChange={(e) => setAiSummary(e.target.value)}
              placeholder="Summary of scientific observations, sampling methodology, or field equipment used..."
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
            />
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 flex items-start gap-2">
            <span className="font-semibold text-polar-blue">Governance Note:</span>
            <span>
              New records require validation and human review before becoming eligible for public portal distribution.
            </span>
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">
              SIMULATED REPOSITORY
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-polar-blue hover:bg-navy-DEFAULT text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Create Record
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
