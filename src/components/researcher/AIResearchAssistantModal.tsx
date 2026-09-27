import React, { useState } from 'react';
import { X, Sparkles, Search, ArrowRight, Bot, Database, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResearcher } from '../../context/ResearcherContext';

interface AIResearchAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIResearchAssistantModal: React.FC<AIResearchAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { datasets } = useResearcher();
  const [query, setQuery] = useState('');
  const [activeResponse, setActiveResponse] = useState<null | {
    summary: string;
    relevantDatasetIds: string[];
    suggestedParameters: string[];
    citationHint: string;
  }>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'Find datasets measuring boundary layer temperatures & katabatic winds',
    'Which datasets have deep water salinity and dissolved oxygen CTD profiles?',
    'Show glaciological surface displacement and ablation rates near Bharati',
    'Are there geomagnetic and ionospheric pulsation observations available?',
  ];

  const handleSearchPrompt = (promptText: string) => {
    setQuery(promptText);
    executeSimulatedAI(promptText);
  };

  const executeSimulatedAI = (text: string) => {
    const lower = text.toLowerCase();
    
    if (lower.includes('katabatic') || lower.includes('boundary') || lower.includes('wind') || lower.includes('temperature') || lower.includes('aerosol')) {
      setActiveResponse({
        summary: 'Identified 1 highly relevant Atmospheric Science time series dataset (KN-002) from IAE-2026-W03 at Bharati Station. It contains hourly boundary layer temperature, aerosol optical depth, and wind vector logs calibrated to WMO guidelines.',
        relevantDatasetIds: ['KN-002', 'KN-011'],
        suggestedParameters: ['Boundary Layer Temp (°C)', 'Aerosol Optical Depth (380-1020nm)', 'Wind Speed & Direction (m/s)'],
        citationHint: 'Cite as: Indian Antarctic Expedition (2026). Bharati Station Atmospheric Boundary Layer Dataset v1.1.',
      });
    } else if (lower.includes('ctd') || lower.includes('salinity') || lower.includes('ocean') || lower.includes('oxygen')) {
      setActiveResponse({
        summary: 'Found Oceanographic Hydrographic CTD Profile along 57°E (SOM-009) from Southern Ocean Mission 2025. Covers 62 full-depth hydrographic stations down to 4,500m with TEOS-10 standard salinity and dissolved oxygen.',
        relevantDatasetIds: ['SOM-009'],
        suggestedParameters: ['Salinity (PSU)', 'Dissolved Oxygen (μmol/kg)', 'Potential Temperature (°C)'],
        citationHint: 'Cite as: Southern Ocean Mission (2025). Hydrographic CTD Transect 57°E v1.0.',
      });
    } else if (lower.includes('glaci') || lower.includes('ice') || lower.includes('ablation') || lower.includes('velocity') || lower.includes('displacement')) {
      setActiveResponse({
        summary: 'Found 2 glaciological datasets: KN-004 (surface displacement stake surveying & ablation rates at Bharati) and KN-007 (ice core cryo-stratigraphy catalog at Maitri).',
        relevantDatasetIds: ['KN-004', 'KN-007'],
        suggestedParameters: ['Surface Velocity (m/yr)', 'Ablation Depth (cm)', 'Core Depth (0-80m)'],
        citationHint: 'Cite as: IAE (2026). Larsemann Hills Ice Flow GNSS Baseline v1.2.',
      });
    } else if (lower.includes('geomag') || lower.includes('magnetic') || lower.includes('pulsation') || lower.includes('ionosphere')) {
      setActiveResponse({
        summary: 'Found Controlled Geophysics time series (KN-015) from Maitri Station. Records tri-axial fluxgate magnetometer readings, micropulsation Pc3-Pc5 indices, and K-index data.',
        relevantDatasetIds: ['KN-015'],
        suggestedParameters: ['Magnetic Field H, D, Z (nT)', 'Pulsation Amplitude (Pc3-Pc5)'],
        citationHint: 'Controlled record — access request required through Station Science Command.',
      });
    } else {
      setActiveResponse({
        summary: `Synthesized research query: "${text}". Across our approved scientific repositories, multiple validated records match your criteria. You can inspect the suggested records below or refine your research parameters.`,
        relevantDatasetIds: ['KN-002', 'KN-004', 'SOM-009'],
        suggestedParameters: ['Multi-parameter time series', 'Level-1 Calibrated data', 'WGS 84 spatial reference'],
        citationHint: 'ExpediX Polar Research Repository (2026).',
      });
    }
  };

  const handleNavigateDataset = (id: string) => {
    onClose();
    navigate(`/researcher/dataset/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#082D56] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <Bot className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-100">AI Research Assistant</h3>
                <span className="px-2 py-0.5 rounded bg-sky-500/30 text-sky-200 text-[10px] font-mono uppercase tracking-wider">
                  SIMULATED
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Discover validated polar datasets, parameter matrices, and scientific citations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Query Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              if (query.trim()) executeSimulatedAI(query);
            }}
            className="relative"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask about scientific parameters, stations, ice cores, atmospheric readings..."
              className="w-full text-xs pl-10 pr-24 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-polar-blue/30 focus:border-polar-blue"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-polar-blue hover:bg-sky-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Query</span>
            </button>
          </form>

          {/* Quick Prompts */}
          <div>
            <div className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Suggested Scientific Inquiries</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearchPrompt(p)}
                  className="text-left p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/70 hover:bg-sky-50/70 hover:border-sky-200 text-xs text-slate-700 transition-colors flex items-start justify-between gap-2 group"
                >
                  <span className="line-clamp-2">{p}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-polar-blue group-hover:translate-x-0.5 shrink-0 mt-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Card */}
          {activeResponse && (
            <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-xl space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-[#082D56]">
                <Sparkles className="w-4 h-4 text-polar-blue" />
                <span>Assistant Synthesis</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeResponse.summary}
              </p>

              {/* Matched Datasets */}
              <div className="pt-2 border-t border-sky-100">
                <div className="text-[11px] font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-polar-blue" />
                  <span>Matched Approved Datasets</span>
                </div>
                <div className="space-y-2">
                  {activeResponse.relevantDatasetIds.map(id => {
                    const ds = datasets.find(d => d.id === id);
                    if (!ds) return null;
                    return (
                      <div
                        key={id}
                        className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between hover:border-polar-blue transition-colors cursor-pointer"
                        onClick={() => handleNavigateDataset(id)}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[11px] font-bold font-mono px-1.5 py-0.5 bg-slate-100 rounded text-slate-800">
                              {ds.id}
                            </span>
                            <span className="text-xs font-semibold text-slate-900 hover:text-polar-blue">
                              {ds.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {ds.researchArea} • {ds.expedition} ({ds.location}) • {ds.dataType}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-polar-blue flex items-center gap-1 shrink-0 ml-3">
                          Inspect <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Suggested Parameters & Citation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                <div className="p-2.5 bg-white/80 border border-slate-200 rounded-lg">
                  <span className="font-semibold text-slate-700 block mb-1">Key Measurands</span>
                  <ul className="space-y-0.5 text-slate-600 list-disc list-inside">
                    {activeResponse.suggestedParameters.map((param, i) => (
                      <li key={i}>{param}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-2.5 bg-white/80 border border-slate-200 rounded-lg">
                  <span className="font-semibold text-slate-700 block mb-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    Citation Guidance
                  </span>
                  <p className="text-slate-600 font-mono text-[10px] leading-normal">
                    {activeResponse.citationHint}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span>AI suggestions link only to verified records. Final scientific review required.</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
