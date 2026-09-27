import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  ArrowRight,
  Database,
  FileText,
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  Sparkles,
  Download,
  ChevronRight,
  Play,
  Send,
} from 'lucide-react';
import { PublicNavbar } from '../components/public/PublicNavbar';
import { PublicFooter } from '../components/public/PublicFooter';
import { PublicSearchModal } from '../components/public/PublicSearchModal';
import { PublicMediaModal } from '../components/public/PublicMediaModal';
import {
  FEATURED_PUBLIC_EXPEDITIONS,
  PUBLIC_DATASETS,
  PUBLIC_MEDIA_ITEMS,
  POLAR_JOURNEY_TIMELINE,
  FEATURED_KNOWLEDGE_CARDS,
  PUBLIC_PUBLICATIONS,
} from '../data/publicPortalData';
import type { PublicMediaItem } from '../types';

export const PublicPortalPage: React.FC = () => {
  const navigate = useNavigate();

  // Search & Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<PublicMediaItem | null>(null);

  // Dataset Inline Filter States
  const [datasetSearch, setDatasetSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');

  // Newsletter State
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const topicOptions = ['All', 'Antarctica', 'Arctic', 'Climate', 'Ocean', 'Glaciology', 'Meteorology'];

  // Filtered public datasets for section 3
  const filteredDatasets = useMemo(() => {
    return PUBLIC_DATASETS.filter((ds) => {
      if (datasetSearch.trim()) {
        const q = datasetSearch.toLowerCase();
        const matchesQ =
          ds.title.toLowerCase().includes(q) ||
          ds.id.toLowerCase().includes(q) ||
          ds.researchArea.toLowerCase().includes(q) ||
          ds.location.toLowerCase().includes(q);
        if (!matchesQ) return false;
      }

      if (selectedTopic !== 'All') {
        const t = selectedTopic.toLowerCase();
        const matchesTopic =
          ds.researchArea.toLowerCase().includes(t) ||
          ds.location.toLowerCase().includes(t) ||
          ds.title.toLowerCase().includes(t);
        if (!matchesTopic) return false;
      }

      return true;
    });
  }, [datasetSearch, selectedTopic]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased selection:bg-sky-200">
      
      {/* Public Navigation */}
      <PublicNavbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="relative overflow-hidden bg-[#041A35] text-white">
        
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bharati-station.jpg"
            alt="Bharati Antarctic Station"
            className="w-full h-full object-cover object-center opacity-45 transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041A35] via-[#041A35]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#041A35]/80" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="max-w-3xl space-y-6">
            
            {/* Top Indicator */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-sky-500/20 text-sky-300 border border-sky-400/30 backdrop-blur-md">
                <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
                <span>India's Polar Journey</span>
              </span>
              <span className="text-[11px] font-mono text-slate-300/80 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs">
                EXPEDIX PROTOTYPE
              </span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              Explore India's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-300 to-blue-200">
                Polar Frontiers.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-sm sm:text-base text-slate-200/90 font-normal leading-relaxed max-w-2xl">
              Discover India's polar expeditions, scientific research, datasets and knowledge generated from field operations at the ends of the Earth.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('expeditions')}
                className="px-6 py-3 rounded-xl bg-polar-blue hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-sky-900/40 hover:shadow-sky-600/30 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Expeditions</span>
              </button>

              <button
                onClick={() => scrollToSection('science')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-sky-300" />
                <span>Explore Science</span>
              </button>
            </div>

          </div>

          {/* Location Badge bottom right */}
          <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur-md text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium">Bharati Station • Antarctica (69°24'S, 76°11'E)</span>
          </div>
        </div>

      </section>

      {/* ==========================================
          SECTION 1 — FEATURED EXPEDITIONS
          ========================================== */}
      <section id="expeditions" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-polar-blue">
              Discover Missions
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
              Featured Expeditions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore missions, research programmes and discoveries from India's polar journey.
            </p>
          </div>

          <button
            onClick={() => scrollToSection('journey')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-polar-blue hover:text-navy-DEFAULT transition-colors group cursor-pointer"
          >
            <span>View All Expeditions Timeline</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Large Expedition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PUBLIC_EXPEDITIONS.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Region Tag Top Left */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#082D56] shadow-xs backdrop-blur-xs">
                    {exp.region}
                  </span>
                </div>

                {/* Status Badge Top Right */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      exp.status === 'Active'
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-700/80 text-white backdrop-blur-xs'
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>

                {/* Location Bottom Left */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium drop-shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-sky-300" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{exp.id}</span>
                    <span>{exp.year}</span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug group-hover:text-polar-blue transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {exp.summary}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.researchThemes.map((theme, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-sky-50 text-polar-blue text-[11px] font-medium border border-sky-100"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Metrics & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                    <span title="Public Datasets">
                      <strong>{exp.datasetCount}</strong> Datasets
                    </span>
                    <span>•</span>
                    <span title="Reports">
                      <strong>{exp.publicationCount}</strong> Reports
                    </span>
                  </div>

                  <Link
                    to={`/public-portal/expedition/${exp.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-polar-blue hover:text-white text-slate-800 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==========================================
          SECTION 2 — POLAR SCIENCE AT A GLANCE (2x2 GRID)
          ========================================== */}
      <section id="science" className="py-12 bg-[#082D56] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-sky-300 font-semibold">
                Open Scientific Repositories
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
                Polar Science at a Glance
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-sky-300 uppercase font-semibold">
                SIMULATED PROTOTYPE DATA
              </span>
              <p className="text-[11px] text-sky-200/70 mt-0.5">
                Demonstration data for ExpediX prototype.
              </p>
            </div>
          </div>

          {/* 2x2 Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Open Datasets */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div className="font-heading font-black text-3xl text-white">12+</div>
              <div className="font-semibold text-sm text-sky-200">Open Datasets</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Publicly accessible cryosphere, aerosol, and oceanography time-series data.
              </p>
            </div>

            {/* Research Publications */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div className="font-heading font-black text-3xl text-white">24+</div>
              <div className="font-semibold text-sm text-sky-200">Research Publications</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Peer-reviewed research syntheses and scientific mission overviews.
              </p>
            </div>

            {/* Expedition Reports */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div className="font-heading font-black text-3xl text-white">18+</div>
              <div className="font-semibold text-sm text-sky-200">Expedition Reports</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seasonal field reports, logistics assessments, and closeout summaries.
              </p>
            </div>

            {/* Media Items */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="font-heading font-black text-3xl text-white">60+</div>
              <div className="font-semibold text-sm text-sky-200">Media Items</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Curated high-resolution photography, aerial drone surveys, and documentaries.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 3 — EXPLORE POLAR SCIENCE (2-COLUMN DISCOVERY)
          ========================================== */}
      <section id="datasets" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Large Antarctic Research Visual */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group h-[480px]">
            <img
              src="/antarctic-station.jpg"
              alt="Antarctic Science Drilling"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-polar-blue text-white shadow-xs">
                Open Scientific Access
              </span>
              <h3 className="font-heading font-bold text-xl text-white">
                From Field Observation to Open Discovery
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Public datasets originate directly from field sensor synchronization and peer review in the ExpediX Knowledge Hub.
              </p>
            </div>
          </div>

          {/* Right Side: Search & Dataset List */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-polar-blue">
                Scientific Repository
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
                Explore Polar Science
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore publicly approved datasets, reports and scientific records generated through polar expeditions.
              </p>
            </div>

            {/* Interactive Dataset Search Field */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={datasetSearch}
                onChange={(e) => setDatasetSearch(e.target.value)}
                placeholder="Search datasets, locations, research topics..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 placeholder-slate-400 shadow-2xs focus:ring-2 focus:ring-polar-blue focus:border-polar-blue outline-hidden"
              />
            </div>

            {/* Topic Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {topicOptions.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-polar-blue text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Public Datasets List */}
            <div className="space-y-2.5">
              {filteredDatasets.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
                  No public datasets match the search keyword "{datasetSearch}".
                </div>
              ) : (
                filteredDatasets.map((ds) => (
                  <div
                    key={ds.id}
                    onClick={() => navigate(`/public-portal/dataset/${ds.id}`)}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-polar-blue hover:bg-sky-50/40 transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                  >
                    <div className="space-y-1 pr-3 truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {ds.id}
                        </span>
                        <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-polar-blue truncate">
                          {ds.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 truncate">
                        <span>{ds.location}</span>
                        <span>•</span>
                        <span>{ds.researchArea}</span>
                        <span>•</span>
                        <span className="font-mono">{ds.dataType}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Public
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-polar-blue group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                Only Public + Approved records are displayed.
              </span>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-polar-blue hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>View All Datasets in Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          SECTION 4 — LATEST MEDIA ("LATEST FROM THE FIELD")
          ========================================== */}
      <section id="media" className="py-16 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-polar-blue">
                Field Visuals
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
                Latest from the Field
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Visual dispatches, high-resolution photography, and mission video highlights.
              </p>
            </div>

            <span className="text-xs text-slate-400 font-mono">
              ExpediX Media Archive
            </span>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PUBLIC_MEDIA_ITEMS.map((media) => (
              <div
                key={media.id}
                onClick={() => setSelectedMedia(media)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={media.image}
                    alt={media.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {media.type === 'Video' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-polar-blue flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono backdrop-blur-xs">
                        {media.durationOrCount}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 text-white text-[11px] font-medium flex items-center gap-1 drop-shadow-sm">
                    <MapPin className="w-3 h-3 text-sky-300" />
                    <span className="truncate max-w-[200px]">{media.location}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-polar-blue uppercase">
                      <span>{media.type}</span>
                      <span className="text-slate-400 font-mono">{media.expedition}</span>
                    </div>
                    <h3 className="font-heading font-bold text-sm text-slate-900 mt-1 group-hover:text-polar-blue transition-colors">
                      {media.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {media.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 5 — INDIA'S POLAR JOURNEY (TIMELINE)
          ========================================== */}
      <section id="journey" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-polar-blue">
            Historic Milestones
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            India's Polar Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Four decades of pioneering scientific endeavor across Antarctica and the Southern Ocean.
          </p>
        </div>

        {/* Storytelling Timeline Track */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-sky-200 via-polar-blue to-sky-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {POLAR_JOURNEY_TIMELINE.map((item) => (
              <div
                key={item.year}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 relative group"
              >
                {/* Year Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-heading font-black text-2xl text-polar-blue group-hover:scale-105 transition-transform">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-polar-blue border border-sky-100">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-slate-500 mb-1">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-100 text-center space-y-1.5">
          <p className="font-heading italic text-base sm:text-lg text-slate-800">
            "For a better understanding of our planet and its cryosphere."
          </p>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">
            National Antarctic Research Programme Framework
          </span>
        </div>

      </section>

      {/* ==========================================
          SECTION 6 — FEATURED KNOWLEDGE ("KNOWLEDGE FROM THE ICE")
          ========================================== */}
      <section className="py-16 bg-[#041A35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-xl space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-sky-300">
              Institutional Research
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Knowledge from the Ice
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              How deep polar observations transform into reusable scientific knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_KNOWLEDGE_CARDS.map((card) => (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-sky-300">
                    <span>{card.topic}</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">
                      {card.stat}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <button
                  onClick={() => scrollToSection('datasets')}
                  className="pt-3 border-t border-white/10 text-xs font-semibold text-sky-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Science &amp; Datasets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 7 — REPORTS & PUBLICATIONS
          ========================================== */}
      <section id="publications" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-polar-blue">
              Official Literature
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
              Reports &amp; Publications
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Publicly available expedition synthesis documents and research reviews.
            </p>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Prototype Publication Collection
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PUBLIC_PUBLICATIONS.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{pub.date}</span>
                  <span className="px-2 py-0.5 rounded bg-sky-50 text-polar-blue font-semibold border border-sky-100">
                    {pub.status}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                  {pub.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pub.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  {pub.downloadSize}
                </span>

                <button
                  onClick={() => alert(`Simulated Download: ${pub.title} (${pub.downloadSize})`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-polar-blue hover:text-white text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Demo PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==========================================
          SECTION 8 — CALL TO EXPLORE ("FROM EXPEDITION TO DISCOVERY")
          ========================================== */}
      <section className="py-20 relative overflow-hidden bg-[#03152B] text-white">
        
        <div className="absolute inset-0 z-0">
          <img
            src="/polar-station-bg.jpg"
            alt="Antarctica Landscape"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03152B] via-[#03152B]/80 to-[#03152B]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30">
            Open Polar Science
          </span>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            From Expedition to Discovery
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Every expedition generates observations, samples, reports and experiences that contribute to a growing body of polar knowledge.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scrollToSection('expeditions')}
              className="px-6 py-3 rounded-xl bg-polar-blue hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-sky-900/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Expeditions</span>
            </button>

            <button
              onClick={() => scrollToSection('datasets')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Database className="w-4 h-4 text-sky-300" />
              <span>Explore Datasets</span>
            </button>
          </div>
        </div>

      </section>

      {/* ==========================================
          SECTION 9 — NEWSLETTER / STAY UPDATED
          ========================================== */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h3 className="font-heading font-bold text-xl text-slate-900">
            Stay Updated with India's Polar Science
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Get updates on new expedition missions, open dataset releases, research publications, and field milestones.
          </p>

          {subscribed ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold inline-flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! You are subscribed to simulated ExpediX polar updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-polar-blue focus:border-polar-blue outline-hidden shadow-2xs"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-polar-blue hover:bg-navy-DEFAULT text-white font-semibold text-xs shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Subscribe</span>
              </button>
            </form>
          )}

          <p className="text-[10px] text-slate-400 font-mono">
            Simulated subscription demo · No external email servers connected
          </p>
        </div>
      </section>

      {/* Public Footer */}
      <PublicFooter />

      {/* Modals */}
      <PublicSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <PublicMediaModal
        media={selectedMedia}
        isOpen={Boolean(selectedMedia)}
        onClose={() => setSelectedMedia(null)}
      />

    </div>
  );
};
