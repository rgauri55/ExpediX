import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Database,
  Globe,
  Lock,
  Download,
  Bookmark,
  BookmarkCheck,
  FolderPlus,
  StickyNote,
  CheckCircle,
  FileSpreadsheet,
  Layers,
  MapPin,
  Calendar,
  Compass,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { useResearcher } from '../context/ResearcherContext';
import { RequestAccessModal } from '../components/researcher/RequestAccessModal';
import { AddToCollectionModal } from '../components/researcher/AddToCollectionModal';
import { CreateNoteModal } from '../components/researcher/CreateNoteModal';

export const ResearcherDatasetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { datasets, isDatasetSaved, toggleSaveDataset, downloadDatasetCsv, publications } = useResearcher();

  const dataset = datasets.find(d => d.id === id);

  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [copiedSample, setCopiedSample] = useState(false);

  if (!dataset) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
        <Database className="w-10 h-10 text-slate-400 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Scientific Dataset Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested dataset identifier "{id}" does not exist or has not been approved for research distribution.
        </p>
        <button
          onClick={() => navigate('/researcher')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Researcher Workspace
        </button>
      </div>
    );
  }

  const isSaved = isDatasetSaved(dataset.id);

  // Filter relevant publications
  const relevantPubs = publications.filter(
    p => p.expedition === dataset.expedition || p.researchArea.includes(dataset.researchArea)
  );

  const handleCopySample = () => {
    const sampleData = JSON.stringify(
      {
        datasetId: dataset.id,
        title: dataset.title,
        parameters: dataset.parameters,
        coordinates: dataset.metadata.coordinateReference,
        sampleValues: [
          { timestamp: '2026-08-15T00:00:00Z', reading: 0.042, flag: 'PASSED' },
          { timestamp: '2026-08-15T01:00:00Z', reading: 0.041, flag: 'PASSED' },
          { timestamp: '2026-08-15T02:00:00Z', reading: 0.045, flag: 'PASSED' },
        ],
      },
      null,
      2
    );
    navigator.clipboard.writeText(sampleData);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/researcher" className="hover:text-slate-900 font-medium">
            Researcher Workspace
          </Link>
          <span>/</span>
          <Link to="/researcher?tab=datasets" className="hover:text-slate-900 font-medium">
            Datasets
          </Link>
          <span>/</span>
          <span className="font-mono text-slate-800 font-bold">{dataset.id}</span>
        </div>

        <button
          onClick={() => navigate('/researcher')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Main Dataset Card Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {dataset.id}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 text-polar-blue border border-sky-200">
                {dataset.researchArea}
              </span>
              <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                v{dataset.version}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Approved
              </span>
              {dataset.access === 'Public' ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Globe className="w-3 h-3" />
                  Public Open Access
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <Lock className="w-3 h-3" />
                  Controlled Access Record
                </span>
              )}
            </div>

            <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {dataset.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              {dataset.description}
            </p>
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-wrap lg:flex-col items-stretch gap-2 shrink-0">
            {dataset.access === 'Public' ? (
              <button
                onClick={() => downloadDatasetCsv(dataset)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-polar-blue hover:bg-sky-600 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV ({dataset.fileSize})</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAccessModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Request Controlled Access</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveDataset(dataset.id)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  isSaved
                    ? 'bg-sky-50 border-sky-200 text-polar-blue'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 fill-polar-blue" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsCollectionModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <FolderPlus className="w-3.5 h-3.5 text-slate-500" />
                <span>Collect</span>
              </button>

              <button
                onClick={() => setIsNoteModalOpen(true)}
                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200"
                title="Add Research Note"
              >
                <StickyNote className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Measurands / Parameters list */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-2">
            Cataloged Scientific Parameters &amp; Measurands
          </span>
          <div className="flex flex-wrap gap-2">
            {dataset.parameters.map((param, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-medium text-slate-800"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-polar-blue" />
                {param}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Scientific Metadata & Provenance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scientific Metadata Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-polar-blue" />
              <span>Scientific Metadata Matrix</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">ISO 19115 Compliant</span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50/50">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600 w-1/3">Collection Method</td>
                  <td className="py-2.5 px-3.5 text-slate-900">{dataset.metadata.collectionMethod}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">Measurement Interval</td>
                  <td className="py-2.5 px-3.5 text-slate-900 font-mono">{dataset.metadata.measurementInterval}</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">Measurement Units</td>
                  <td className="py-2.5 px-3.5 text-slate-900 font-mono">{dataset.metadata.units}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">Coordinate Reference (CRS)</td>
                  <td className="py-2.5 px-3.5 text-slate-900 font-mono">{dataset.metadata.coordinateReference}</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">Quality Assessment Standard</td>
                  <td className="py-2.5 px-3.5 text-emerald-800 font-medium">{dataset.metadata.qualityStatus}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">Data Processing Level</td>
                  <td className="py-2.5 px-3.5 text-slate-900">{dataset.metadata.processingLevel}</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">Last Human Validation</td>
                  <td className="py-2.5 px-3.5 text-slate-900">{dataset.metadata.lastValidation}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sample Data Preview Table */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-polar-blue" />
                <span>Simulated Tabular Data Preview</span>
              </span>
              <button
                onClick={handleCopySample}
                className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-polar-blue font-medium"
              >
                {copiedSample ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>JSON Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON Sample</span>
                  </>
                )}
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-x-auto bg-slate-900 text-slate-200 font-mono text-[11px] p-3 max-h-48">
              <div className="text-sky-300 font-bold border-b border-slate-700 pb-1 mb-2">
                // Preview: {dataset.id} — Sampling stream
              </div>
              <div className="space-y-1 text-slate-300 leading-relaxed">
                <div>[00:00:00 UTC] Sensor Init: OK | Calibrated Range: WMO Baseline</div>
                <div>[01:00:00 UTC] Reading #01: {dataset.parameters[0]} = 0.042 | QC: PASSED</div>
                <div>[02:00:00 UTC] Reading #02: {dataset.parameters[0]} = 0.041 | QC: PASSED</div>
                <div>[03:00:00 UTC] Reading #03: {dataset.parameters[0]} = 0.045 | QC: PASSED</div>
                <div>[04:00:00 UTC] Reading #04: {dataset.parameters[0]} = 0.048 | QC: PASSED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Provenance & Origin Panel (1 Col) */}
        <div className="space-y-6">
          {/* Expedition Context Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Expedition Origin
            </h3>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">Mission Code:</span>
                <button
                  onClick={() => navigate(`/researcher/expedition/${dataset.expedition}`)}
                  className="font-mono text-xs font-bold text-polar-blue hover:underline"
                >
                  {dataset.expedition}
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Site:
                </span>
                <span className="font-medium text-slate-800">{dataset.location}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Period:
                </span>
                <span className="font-medium text-slate-800">{dataset.collectionPeriod}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/researcher/expedition/${dataset.expedition}`)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-polar-blue" />
              <span>Inspect Expedition Science</span>
            </button>
          </div>

          {/* Related Publications */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Related Scientific Publications
            </h3>

            <div className="space-y-2.5">
              {relevantPubs.map(pub => (
                <div
                  key={pub.id}
                  className="p-3 rounded-xl border border-slate-200/80 hover:border-polar-blue transition-colors text-xs space-y-1"
                >
                  <h4 className="font-bold text-slate-900 leading-snug">
                    {pub.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {pub.author} • {pub.year}
                  </p>
                  <Link
                    to="/researcher/publications"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-polar-blue hover:underline pt-1"
                  >
                    <span>View Publication</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isAccessModalOpen && (
        <RequestAccessModal
          isOpen={true}
          dataset={dataset}
          onClose={() => setIsAccessModalOpen(false)}
        />
      )}

      {isCollectionModalOpen && (
        <AddToCollectionModal
          isOpen={true}
          datasetId={dataset.id}
          onClose={() => setIsCollectionModalOpen(false)}
        />
      )}

      {isNoteModalOpen && (
        <CreateNoteModal
          isOpen={true}
          defaultDatasetId={dataset.id}
          onClose={() => setIsNoteModalOpen(false)}
        />
      )}
    </div>
  );
};
