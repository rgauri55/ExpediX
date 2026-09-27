import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  FileCode,
  Globe,
  MapPin,
  Layers,
  CheckCircle2,
  Copy,
  ExternalLink,
  Info,
} from 'lucide-react';
import { PublicNavbar } from '../components/public/PublicNavbar';
import { PublicFooter } from '../components/public/PublicFooter';
import { PUBLIC_DATASETS } from '../data/publicPortalData';

export const PublicDatasetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dataset = PUBLIC_DATASETS.find(
    (d) => d.id.toLowerCase() === id?.toLowerCase()
  );

  const [copiedDoi, setCopiedDoi] = useState(false);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!dataset) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <PublicNavbar />
        <div className="flex-1 max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="font-heading font-bold text-2xl text-slate-800">
            Dataset Not Found
          </h2>
          <p className="text-xs text-slate-500">
            The requested public dataset "{id}" is not available in the public index.
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

  const handleCopyDoi = () => {
    navigator.clipboard.writeText(dataset.doi);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2500);
  };

  const handleDownloadDataset = () => {
    // Generate simulated CSV file download in browser
    const csvHeader = 'Timestamp,Location,Parameter,Value,Unit,QualityFlag\n';
    const csvRows = [
      '2026-09-14T00:00:00Z,Bharati Station,Param_01,14.2,Standard,PASS\n',
      '2026-09-14T01:00:00Z,Bharati Station,Param_01,14.5,Standard,PASS\n',
      '2026-09-14T02:00:00Z,Bharati Station,Param_01,13.9,Standard,PASS\n',
      '2026-09-14T03:00:00Z,Bharati Station,Param_01,14.1,Standard,PASS\n',
    ].join('');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${dataset.id}_${dataset.researchArea.replace(/\s+/g, '_')}_demo.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      <PublicNavbar />

      {/* Header Banner */}
      <div className="bg-[#082D56] text-white border-b border-[#0c3b6e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-sky-200">
            <Link to="/public-portal" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </Link>
            <span>/</span>
            <Link to="/public-portal#datasets" className="hover:text-white">
              Datasets
            </Link>
            <span>/</span>
            <span className="text-slate-300 font-mono">{dataset.id}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-500 text-white shadow-xs">
              {dataset.id}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800">
              <Eye className="w-3.5 h-3.5" />
              <span>Access: Public</span>
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-sky-200">
              {dataset.publishedVersion}
            </span>
            <span className="text-xs text-slate-300 font-mono">
              Published {dataset.publishedDate}
            </span>
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            {dataset.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            {dataset.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-sky-200 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{dataset.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>{dataset.researchArea}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>{dataset.expeditionName}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Download Alert Notice */}
        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Simulated demo dataset package downloaded successfully ({dataset.id}_demo.csv).</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Action Bar Card */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Data Format &amp; Package Size
                </div>
                <div className="font-heading font-bold text-sm text-slate-900 mt-0.5">
                  {dataset.dataType} ({dataset.fileSize})
                </div>
                <div className="text-[11px] text-slate-500">
                  Open license: {dataset.license}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowMetadataModal(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Metadata</span>
                </button>

                <button
                  onClick={handleDownloadDataset}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Demo Dataset</span>
                </button>
              </div>
            </div>

            {/* Methodology & Parameters */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h2 className="font-heading font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
                Collection Methodology &amp; Quality Control
              </h2>
              
              <div className="space-y-1.5 text-xs text-slate-600">
                <span className="font-semibold text-slate-700 block">Instrument / Collection Method:</span>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed">
                  {dataset.collectionMethod}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-semibold text-slate-700 text-xs block">
                  Measured Parameters Matrix:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dataset.parameters.map((param, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 flex items-center gap-2 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{param}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Citation & DOI */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
              <h2 className="font-heading font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
                Cite this Dataset
              </h2>
              
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-700 break-all leading-relaxed">
                Indian Antarctic Research Programme (2026). {dataset.title}. ExpediX Open Knowledge Hub. DOI: {dataset.doi}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400 font-mono">
                  DOI: {dataset.doi}
                </span>
                <button
                  onClick={handleCopyDoi}
                  className="px-3 py-1 text-xs font-semibold text-polar-blue hover:bg-sky-50 rounded-lg border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedDoi ? 'Copied to Clipboard!' : 'Copy Citation'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Sidebar Metadata (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
              <h3 className="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                Archival Metadata
              </h3>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Record Identifier</span>
                  <span className="font-mono font-bold text-slate-800">{dataset.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Associated Expedition</span>
                  <Link
                    to={`/public-portal/expedition/${dataset.expeditionId}`}
                    className="font-medium text-polar-blue hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{dataset.expeditionName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Discipline</span>
                  <span className="font-semibold text-slate-800">{dataset.researchArea}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Geographic Location</span>
                  <span className="text-slate-800">{dataset.location}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Version &amp; License</span>
                  <span className="font-mono text-slate-800">{dataset.publishedVersion} · Open Access</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Simulated Prototype Notice:</span> All datasets and parameters are simulated demonstration values for the ExpediX prototype.
                </div>
              </div>
            </div>

            {/* Link back to Portal */}
            <div className="p-4 bg-slate-100 rounded-2xl text-center space-y-2">
              <p className="text-xs text-slate-600">
                Explore more public datasets from India's polar expeditions.
              </p>
              <Link
                to="/public-portal"
                className="inline-flex items-center gap-1 text-xs font-bold text-polar-blue hover:underline"
              >
                <span>Browse All Datasets on Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </main>

      {/* Metadata Schema Modal */}
      {showMetadataModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full shadow-2xl overflow-hidden text-xs">
            <div className="p-4 bg-[#082D56] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-sky-300" />
                <h3 className="font-heading font-bold text-sm">JSON-LD Metadata Schema</h3>
              </div>
              <button
                onClick={() => setShowMetadataModal(false)}
                className="text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-[11px] max-h-80 overflow-y-auto leading-relaxed">
              <pre>
{JSON.stringify(
  {
    '@context': 'https://schema.org/',
    '@type': 'Dataset',
    identifier: dataset.id,
    name: dataset.title,
    description: dataset.description,
    keywords: [dataset.researchArea, 'Antarctica', dataset.location],
    license: dataset.license,
    doi: dataset.doi,
    publisher: {
      '@type': 'Organization',
      name: 'ExpediX Polar Knowledge Portal',
    },
    temporalCoverage: '2026-08-12/2026-09-18',
    spatialCoverage: dataset.location,
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: dataset.dataType,
      contentUrl: `https://expedix.demo/datasets/${dataset.id}`,
    },
  },
  null,
  2
)}
              </pre>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowMetadataModal(false)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
};
