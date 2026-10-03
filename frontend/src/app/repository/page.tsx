'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, Sparkles, Filter, SlidersHorizontal, BookOpen, 
  Database, Image, FileText, ArrowUpDown, ChevronDown, 
  Check, X, Compass, ExternalLink, Bookmark, HelpCircle 
} from 'lucide-react';
import { Publication, Dataset, MediaAsset, AISemanticResult } from '@/lib/types';
import { PublicationCard } from '@/components/PublicationCard';
import { DatasetCard } from '@/components/DatasetCard';
import { ExplainSimplyModal } from '@/components/ExplainSimplyModal';
import { api } from '@/lib/api';

function RepositoryContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'semantic' ? 'semantic' : 'standard';
  const initialDomain = searchParams.get('domain') || 'All';

  // Search & Filter States
  const [searchMode, setSearchMode] = useState<'standard' | 'semantic'>(initialMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContentType, setActiveContentType] = useState<'all' | 'publications' | 'datasets' | 'media'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const [selectedStation, setSelectedStation] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Data States
  const [publications, setPublications] = useState<Publication[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [semanticResult, setSemanticResult] = useState<AISemanticResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [selectedPublicationForSimplification, setSelectedPublicationForSimplification] = useState<Publication | null>(null);
  const [isSimplifyModalOpen, setIsSimplifyModalOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    loadStandardData();
  }, [selectedRegion, selectedDomain, selectedStation, sortBy]);

  const loadStandardData = async () => {
    setIsLoading(true);
    try {
      const [pubsRes, dsetsRes, mediaRes] = await Promise.all([
        api.getPublications({
          region: selectedRegion,
          domain: selectedDomain,
          station: selectedStation,
          sort_by: sortBy
        }),
        api.getDatasets(selectedRegion, selectedFormat),
        api.getMedia(selectedRegion)
      ]);
      setPublications(pubsRes.items);
      setDatasets(dsetsRes.items);
      setMedia(mediaRes);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSemanticSearch = async (queryText?: string) => {
    const q = queryText || searchQuery;
    if (!q.trim()) return;
    setIsLoading(true);
    setSearchMode('semantic');
    try {
      const res = await api.semanticSearch(q);
      setSemanticResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainSimply = (pub: Publication) => {
    setSelectedPublicationForSimplification(pub);
    setIsSimplifyModalOpen(true);
  };

  // Filtered publications by query in standard mode
  const displayedPublications = publications.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.abstract.toLowerCase().includes(q) || p.keywords.some(k => k.toLowerCase().includes(q));
  });

  const displayedDatasets = datasets.filter(d => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return d.title.toLowerCase().includes(q) || d.parameters.some(p => p.toLowerCase().includes(q));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-[#B49A82] pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Unified Scientific Knowledge Repository</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C]">
              Polaris Knowledge Repository
            </h1>
            <p className="text-sm text-[#523528] mt-1 max-w-2xl leading-relaxed">
              Explore peer-reviewed publications, in-situ datasets, expedition cruise reports, and high-resolution media from India&apos;s sovereign polar missions.
            </p>
          </div>

          {/* Mode Switcher Pill */}
          <div className="bg-[#FFF8ED] p-1 rounded-xl border border-[#B49A82] flex items-center font-mono text-xs shadow-xs self-start md:self-auto">
            <button
              onClick={() => setSearchMode('standard')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                searchMode === 'standard'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-semibold'
                  : 'text-[#523528] hover:text-[#3B261C]'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Standard Catalog</span>
            </button>
            <button
              onClick={() => {
                setSearchMode('semantic');
                if (!semanticResult && searchQuery) handleSemanticSearch();
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                searchMode === 'semantic'
                  ? 'bg-amber-800 text-[#FFF8ED] font-semibold'
                  : 'text-[#523528] hover:text-[#3B261C]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Semantic AI Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (searchMode === 'semantic') handleSemanticSearch();
              }
            }}
            placeholder={
              searchMode === 'semantic'
                ? 'Try asking: "What research was conducted at Bharati Station related to climate?"'
                : 'Search reports, datasets, publications, expeditions...'
            }
            className="w-full bg-[#FFF8ED] border-2 border-[#B49A82] rounded-2xl py-4 pl-12 pr-32 text-base text-[#3B261C] placeholder-[#76543F]/60 shadow-sm focus:outline-none focus:border-[#523528] font-sans"
          />
          <Search className="w-5 h-5 text-[#76543F] absolute left-4 top-1/2 -translate-y-1/2" />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSemanticResult(null);
                }}
                className="p-1.5 text-[#76543F] hover:text-[#3B261C]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                if (searchMode === 'semantic') handleSemanticSearch();
              }}
              className="px-4 py-2 bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] rounded-xl font-mono text-xs font-semibold transition-colors shadow-xs"
            >
              {searchMode === 'semantic' ? 'Ask AI' : 'Search'}
            </button>
          </div>
        </div>

        {/* Semantic Query Quick Chips */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#76543F]">
          <span className="font-semibold text-[#523528]">Example Semantic Queries:</span>
          {[
            "What research was conducted at Bharati Station related to climate?",
            "Sea ice thickness in Prydz Bay",
            "Maitri ice core paleoclimate",
            "IndARC mooring Kongsfjorden",
            "Sutri Dhaka glacier mass balance"
          ].map((sampleQ, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchQuery(sampleQ);
                setSearchMode('semantic');
                handleSemanticSearch(sampleQ);
              }}
              className="bg-[#F4E9D8] hover:bg-[#D8C2A8] text-[#523528] px-2.5 py-1 rounded-lg border border-[#D8C2A8] transition-colors"
            >
              &ldquo;{sampleQ}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SEMANTIC AI RESULT PANEL (SECTION 9) */}
      {/* ======================================================== */}
      {searchMode === 'semantic' && semanticResult && (
        <div className="bg-[#FFF8ED] border-2 border-amber-600/60 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D8C2A8] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 border border-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3B261C]">
                  POLARIS Semantic Synthesis
                </h3>
                <p className="font-mono text-xs text-[#76543F]">
                  Query: &ldquo;{semanticResult.query}&rdquo; • Confidence: {(semanticResult.confidence_score * 100).toFixed(0)}%
                </p>
              </div>
            </div>
            <span className="font-mono text-xs bg-amber-50 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg">
              Deterministic Demo Layer
            </span>
          </div>

          {/* AI-Generated Summary with Citations */}
          <div className="bg-[#F4E9D8]/70 p-5 rounded-xl border border-[#D8C2A8]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#A67C5B] font-bold block mb-2">
              AI-Generated Structured Summary:
            </span>
            <p className="text-sm text-[#3B261C] leading-relaxed">
              {semanticResult.ai_summary}
            </p>
          </div>

          {/* Key Findings Bullet Points */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-bold block mb-2">
              Key Scientific Findings:
            </span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#523528]">
              {semanticResult.key_findings.map((finding, idx) => (
                <li key={idx} className="bg-[#F4E9D8]/50 p-2.5 rounded-lg border border-[#D8C2A8] flex items-start gap-2">
                  <span className="font-mono font-bold text-[#A67C5B] shrink-0">{idx + 1}.</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Inline Citations Referenced */}
          <div className="border-t border-[#D8C2A8] pt-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-bold block mb-2">
              Verified Citations &amp; Indexed Resources:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {semanticResult.citations.map((c) => (
                <div key={c.citation_id} className="bg-[#FFF8ED] p-2.5 rounded-lg border border-[#B49A82] flex items-center justify-between">
                  <span className="text-[#3B261C] font-semibold truncate pr-2">
                    [{c.citation_id}] {c.title}
                  </span>
                  <span className="text-[10px] text-[#A67C5B] font-bold uppercase shrink-0">
                    {c.record_id}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* STANDARD FILTERS & CONTENT TABS (SECTION 8) */}
      {/* ======================================================== */}
      <div className="space-y-6">
        
        {/* Content Type Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D8C2A8] pb-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveContentType('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeContentType === 'all'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-bold'
                  : 'bg-[#FFF8ED] text-[#523528] border border-[#B49A82] hover:bg-[#F4E9D8]'
              }`}
            >
              All Items ({displayedPublications.length + displayedDatasets.length + media.length})
            </button>
            <button
              onClick={() => setActiveContentType('publications')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeContentType === 'publications'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-bold'
                  : 'bg-[#FFF8ED] text-[#523528] border border-[#B49A82] hover:bg-[#F4E9D8]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Publications ({displayedPublications.length})</span>
            </button>
            <button
              onClick={() => setActiveContentType('datasets')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeContentType === 'datasets'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-bold'
                  : 'bg-[#FFF8ED] text-[#523528] border border-[#B49A82] hover:bg-[#F4E9D8]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Datasets ({displayedDatasets.length})</span>
            </button>
            <button
              onClick={() => setActiveContentType('media')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeContentType === 'media'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-bold'
                  : 'bg-[#FFF8ED] text-[#523528] border border-[#B49A82] hover:bg-[#F4E9D8]'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Media Assets ({media.length})</span>
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#76543F] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FFF8ED] border border-[#B49A82] rounded-lg px-2.5 py-1 text-[#3B261C] focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most_viewed">Most Viewed</option>
              <option value="most_cited">Most Cited</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Dropdowns: Region, Domain, Station, Format */}
        <div className="bg-[#FFF8ED] p-4 rounded-xl border border-[#B49A82] grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          
          <div>
            <label className="text-[#76543F] text-[10px] uppercase font-bold block mb-1">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-md px-2 py-1.5 text-[#3B261C]"
            >
              <option value="All">All Regions</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Arctic">Arctic</option>
              <option value="Himalayas / Third Pole">Himalayas / Third Pole</option>
              <option value="Southern Ocean">Southern Ocean</option>
            </select>
          </div>

          <div>
            <label className="text-[#76543F] text-[10px] uppercase font-bold block mb-1">Station</label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-md px-2 py-1.5 text-[#3B261C]"
            >
              <option value="All">All Stations</option>
              <option value="Bharati">Bharati</option>
              <option value="Maitri">Maitri</option>
              <option value="Himadri">Himadri</option>
              <option value="Himansh">Himansh</option>
              <option value="IndARC">IndARC</option>
            </select>
          </div>

          <div>
            <label className="text-[#76543F] text-[10px] uppercase font-bold block mb-1">Scientific Domain</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-md px-2 py-1.5 text-[#3B261C]"
            >
              <option value="All">All Domains</option>
              <option value="Atmospheric">Atmospheric Sciences</option>
              <option value="Glaciology">Glaciology</option>
              <option value="Oceanography">Oceanography</option>
              <option value="Biology">Polar Biology</option>
              <option value="Geology">Geology &amp; Geophysics</option>
            </select>
          </div>

          <div>
            <label className="text-[#76543F] text-[10px] uppercase font-bold block mb-1">Data Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-md px-2 py-1.5 text-[#3B261C]"
            >
              <option value="All">All Formats</option>
              <option value="NetCDF">NetCDF</option>
              <option value="CSV">CSV</option>
              <option value="GeoTIFF">GeoTIFF</option>
              <option value="ASCII">ASCII</option>
            </select>
          </div>

        </div>

        {/* Content Cards Grid */}
        <div className="space-y-8">
          
          {/* Publications Section */}
          {(activeContentType === 'all' || activeContentType === 'publications') && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-xl text-[#3B261C] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#A67C5B]" />
                  <span>Research Publications &amp; Reports ({displayedPublications.length})</span>
                </h3>
              </div>

              {displayedPublications.length === 0 ? (
                <div className="bg-[#FFF8ED] p-8 rounded-xl border border-[#B49A82] text-center font-mono text-xs text-[#76543F]">
                  No publications found matching your selected filters. Try resetting the domain or search query.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedPublications.map((pub) => (
                    <PublicationCard
                      key={pub.id}
                      publication={pub}
                      onExplainSimply={handleExplainSimply}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Datasets Section */}
          {(activeContentType === 'all' || activeContentType === 'datasets') && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-xl text-[#3B261C] flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#A67C5B]" />
                  <span>Scientific Datasets &amp; Cryo-Records ({displayedDatasets.length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedDatasets.map((ds) => (
                  <DatasetCard key={ds.id} dataset={ds} />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Explain Simply Modal Component */}
      <ExplainSimplyModal
        publication={selectedPublicationForSimplification}
        isOpen={isSimplifyModalOpen}
        onClose={() => setIsSimplifyModalOpen(false)}
      />

    </div>
  );
}

export default function RepositoryPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-mono text-sm text-[#76543F]">Loading Polar Knowledge Repository...</div>}>
      <RepositoryContent />
    </Suspense>
  );
}
