'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, Sparkles, ArrowRight, BookOpen, Database, 
  Layers, MapPin, Radio, Users, CheckCircle2, ChevronRight, 
  FileText, Globe2, Share2, HelpCircle, ArrowUpRight, Award,
  ShieldCheck, AlertTriangle, ArrowDown
} from 'lucide-react';
import { HeroGlobe } from '@/components/HeroGlobe';
import { useAuth } from '@/lib/auth-context';
import { INITIAL_STATIONS, INITIAL_EXPEDITIONS, INITIAL_PUBLICATIONS } from '@/lib/data';

export default function HomePage() {
  const { setIsAIModalOpen } = useAuth();
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    {
      step: '01',
      title: 'DISCOVER',
      subtitle: 'Unified Multi-Source Ingestion',
      desc: 'Connects four decades of historical expedition archives, automated satellite telemetry, and oceanic cruise logs into a single search index.',
      icon: Compass,
      color: 'bg-[#523528]'
    },
    {
      step: '02',
      title: 'ORGANIZE',
      subtitle: 'Standardized Metadata Schemas',
      desc: 'Catalogues records according to international ISO/OGC standards across NetCDF, GeoTIFF, CSV, and DOI-indexed preprints.',
      icon: Database,
      color: 'bg-[#76543F]'
    },
    {
      step: '03',
      title: 'UNDERSTAND',
      subtitle: 'AI Knowledge Simplification',
      desc: 'Converts dense peer-reviewed cryospheric jargon into audience-specific explanations for schools, colleges, and the public.',
      icon: Sparkles,
      color: 'bg-[#A67C5B]'
    },
    {
      step: '04',
      title: 'EXPLORE',
      subtitle: 'Interactive Maps & 3D Stations',
      desc: 'Engage with dynamic polar projections, real-time sensor streams, and virtual walk-throughs of remote polar stations.',
      icon: Layers,
      color: 'bg-[#8C6747]'
    },
    {
      step: '05',
      title: 'LEARN',
      subtitle: 'Curated Modules & Interactive Quizzes',
      desc: 'Gamified student curriculum rewarding badges and knowledge points for mastering polar geography and climate teleconnections.',
      icon: BookOpen,
      color: 'bg-[#523528]'
    },
    {
      step: '06',
      title: 'DISSEMINATE',
      subtitle: 'Outreach & Media Studio',
      desc: 'Transforms complex publications into verified social media posts, short video scripts, infographics, and press releases.',
      icon: Share2,
      color: 'bg-[#3B261C]'
    }
  ];

  return (
    <div className="font-sans overflow-hidden">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative pt-12 pb-20 md:py-24 border-b border-[#B49A82] overflow-hidden">
        {/* Topo background */}
        <div className="absolute inset-0 topo-lines opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8ED] border border-[#B49A82] font-mono text-xs text-[#523528] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>NATIONAL POLAR SCIENCE REPOSITORY • ESTD. 1981</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3B261C] leading-[1.08]">
                  POLARIS
                </h1>
                <p className="font-serif text-2xl sm:text-3xl text-[#523528] italic font-normal">
                  &ldquo;India&apos;s Polar Knowledge, Connected.&rdquo;
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#523528] leading-relaxed max-w-2xl">
                Discover expeditions, research, datasets, publications and stories from India&apos;s journey across the polar regions—from Antarctica and the Arctic to the Himalayas and the Southern Ocean.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/explore"
                  className="px-6 py-3.5 bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] rounded-xl font-mono text-sm font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Explore Polar Science</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsAIModalOpen(true)}
                  className="px-6 py-3.5 bg-[#FFF8ED] hover:bg-[#FFFDF9] text-[#3B261C] border-2 border-[#523528] rounded-xl font-mono text-sm font-semibold flex items-center gap-2 transition-all shadow-xs hover:border-[#3B261C]"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Ask POLARIS AI</span>
                </button>
              </div>

              {/* Technical Authority Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-[#76543F]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A67C5B]" />
                  <span>MoES / NCPOR Verified Data</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-[#A67C5B]" />
                  <span>Antarctic Treaty System Compliant</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Globe Projection */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroGlobe />
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. NATIONAL POLAR RESEARCH STATISTICS */}
      {/* ======================================================== */}
      <section className="bg-[#FFF8ED] py-10 border-b border-[#B49A82] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="border-r-0 md:border-r border-[#D8C2A8] pr-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C] block">42+</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-semibold mt-1 block">
                Expeditions to Antarctica
              </span>
              <span className="text-[10px] font-mono text-[#A67C5B]">Continuous Since 1981</span>
            </div>

            <div className="border-r-0 md:border-r border-[#D8C2A8] pr-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C] block">2</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-semibold mt-1 block">
                Indian Antarctic Stations
              </span>
              <span className="text-[10px] font-mono text-[#A67C5B]">Maitri &amp; Bharati (+Himadri, Himansh)</span>
            </div>

            <div className="border-r-0 md:border-r border-[#D8C2A8] pr-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C] block">1,000+</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-semibold mt-1 block">
                Research Publications
              </span>
              <span className="text-[10px] font-mono text-[#A67C5B]">Peer-Reviewed Journals</span>
            </div>

            <div className="border-r-0 md:border-r border-[#D8C2A8] pr-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C] block">500+</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-semibold mt-1 block">
                Datasets &amp; Records
              </span>
              <span className="text-[10px] font-mono text-[#A67C5B]">NetCDF, GeoTIFF, CSV</span>
            </div>

            <div className="col-span-2 md:col-span-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C] block">1,000+</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-semibold mt-1 block">
                Media Assets
              </span>
              <span className="text-[10px] font-mono text-[#A67C5B]">Photos, Videos, Infographics</span>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. PROBLEM SECTION: THE CHALLENGE */}
      {/* ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#A67C5B] font-bold block mb-2">
            SIH 2026 PROBLEM STATEMENT 26063
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C]">
            The Polar Science Challenge
          </h2>
          <p className="text-sm sm:text-base text-[#523528] mt-3 leading-relaxed">
            India is a recognized global pioneer in polar and oceanic science, yet our invaluable discoveries face five critical systemic bottlenecks:
          </p>
        </div>

        {/* Five Numbered Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div className="journal-card rounded-xl p-5 border-t-4 border-t-[#523528]">
            <span className="font-mono text-2xl font-bold text-[#A67C5B] block mb-2">01</span>
            <h3 className="font-serif font-bold text-base text-[#3B261C] mb-2 leading-tight">
              SCATTERED KNOWLEDGE
            </h3>
            <p className="text-xs text-[#523528] leading-relaxed">
              Expedition reports, datasets, publications, media and activities are distributed across fragmented departmental silos and offline vaults.
            </p>
          </div>

          <div className="journal-card rounded-xl p-5 border-t-4 border-t-[#76543F]">
            <span className="font-mono text-2xl font-bold text-[#A67C5B] block mb-2">02</span>
            <h3 className="font-serif font-bold text-base text-[#3B261C] mb-2 leading-tight">
              LIMITED ACCESSIBILITY
            </h3>
            <p className="text-xs text-[#523528] leading-relaxed">
              Complex cryospheric papers and raw data models are dense and inaccessible for students, educators, and the general public.
            </p>
          </div>

          <div className="journal-card rounded-xl p-5 border-t-4 border-t-[#A67C5B]">
            <span className="font-mono text-2xl font-bold text-[#A67C5B] block mb-2">03</span>
            <h3 className="font-serif font-bold text-base text-[#3B261C] mb-2 leading-tight">
              LOW ENGAGEMENT
            </h3>
            <p className="text-xs text-[#523528] leading-relaxed">
              Traditional government scientific portals lack interactive maps, 3D simulations, and gamified learning experiences.
            </p>
          </div>

          <div className="journal-card rounded-xl p-5 border-t-4 border-t-[#8C6747]">
            <span className="font-mono text-2xl font-bold text-[#A67C5B] block mb-2">04</span>
            <h3 className="font-serif font-bold text-base text-[#3B261C] mb-2 leading-tight">
              DISSEMINATION GAP
            </h3>
            <p className="text-xs text-[#523528] leading-relaxed">
              Scientists lack time and specialized tools to convert technical publications into bite-sized social media, video scripts, and press releases.
            </p>
          </div>

          <div className="journal-card rounded-xl p-5 border-t-4 border-t-[#3B261C]">
            <span className="font-mono text-2xl font-bold text-[#A67C5B] block mb-2">05</span>
            <h3 className="font-serif font-bold text-base text-[#3B261C] mb-2 leading-tight">
              NO UNIFIED PLATFORM
            </h3>
            <p className="text-xs text-[#523528] leading-relaxed">
              There was no single digital ecosystem connecting missions, stations, telemetry, researchers, media and education in one unified place.
            </p>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 4. SOLUTION SECTION: THE POLARIS ARCHITECTURE */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#FFF8ED] border-y border-[#B49A82] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#A67C5B] font-bold block mb-2">
              THE ARCHITECTURAL SOLUTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C]">
              One Ecosystem for India&apos;s Polar Science
            </h2>
            <p className="text-sm sm:text-base text-[#523528] mt-3">
              POLARIS unifies the entire lifecycle of polar intelligence through six connected stages:
            </p>
          </div>

          {/* Horizontal Interactive Process Flow */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-8 font-mono text-xs">
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  activeWorkflowStep === idx
                    ? 'bg-[#3B261C] text-[#FFF8ED] border-[#3B261C] shadow-md scale-102 font-bold'
                    : 'bg-[#F4E9D8] text-[#523528] border-[#D8C2A8] hover:bg-[#D8C2A8]'
                }`}
              >
                <span className="text-[10px] text-[#A67C5B]">{step.step}</span>
                <span className="text-sm font-serif">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Detailed Spotlight Card */}
          <div className="bg-[#F4E9D8] p-6 sm:p-8 rounded-2xl border-2 border-[#B49A82] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-[#76543F]">
                <span className="font-bold text-[#A67C5B]">STAGE {workflowSteps[activeWorkflowStep].step}</span>
                <span>•</span>
                <span className="uppercase font-semibold">{workflowSteps[activeWorkflowStep].subtitle}</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#3B261C]">
                {workflowSteps[activeWorkflowStep].title}: {workflowSteps[activeWorkflowStep].subtitle}
              </h3>
              <p className="text-sm text-[#523528] leading-relaxed">
                {workflowSteps[activeWorkflowStep].desc}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/explore"
                className="px-5 py-2.5 bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
              >
                <span>Explore This Workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. RESEARCH STATIONS SHOWCASE */}
      {/* ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#A67C5B] font-bold block mb-1">
              SOVEREIGN POLAR BASES &amp; OBSERVATORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C]">
              India&apos;s Scientific Outposts
            </h2>
          </div>
          <Link
            href="/map"
            className="font-mono text-xs font-semibold text-[#523528] hover:text-[#3B261C] flex items-center gap-1.5 transition-colors"
          >
            <span>View All Observatories on Polar Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Station Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_STATIONS.slice(0, 3).map((st) => (
            <div key={st.id} className="journal-card rounded-2xl overflow-hidden flex flex-col justify-between group">
              <div>
                {/* Station Photo */}
                <div className="relative h-48 overflow-hidden bg-[#3B261C]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={st.image_url}
                    alt={st.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B261C] via-transparent to-transparent"></div>
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 font-mono text-[10px] bg-[#3B261C]/85 text-[#FFF8ED] px-2 py-0.5 rounded border border-[#76543F]">
                    <MapPin className="w-3 h-3 text-[#A67C5B]" />
                    <span>{st.region}</span>
                  </div>

                  <div className="absolute top-3 right-3 font-mono text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-600/50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{st.status}</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-[#FFF8ED]">
                    <div>
                      <h4 className="font-serif font-bold text-2xl leading-none">{st.name}</h4>
                      <p className="text-xs font-mono text-[#D8C2A8] mt-1">{st.location_name}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4">
                  {/* Telemetry pill */}
                  {st.telemetry && (
                    <div className="bg-[#F4E9D8] p-2.5 rounded-xl border border-[#D8C2A8] flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-[#523528]">
                        <Radio className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                        <span>Temp: <strong>{st.telemetry.temperature_c}°C</strong></span>
                      </div>
                      <div className="text-[#76543F]">
                        <span>Wind: {st.telemetry.wind_speed_kmh} km/h</span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[#523528] leading-relaxed line-clamp-3">
                    {st.description}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="px-5 pb-5 pt-2 border-t border-[#D8C2A8]/60 flex items-center justify-between font-mono text-xs">
                <span className="text-[11px] text-[#76543F]">Commissioned {st.established_year}</span>
                <Link
                  href={`/stations/${st.id}`}
                  className="flex items-center gap-1 font-semibold text-[#3B261C] group-hover:text-[#523528] transition-colors"
                >
                  <span>Inspect Station</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ======================================================== */}
      {/* 6. IMPACT TRANSFORMATION (SECTION 35) */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#3B261C] text-[#FFF8ED] border-t-2 border-[#523528] relative overflow-hidden">
        <div className="absolute inset-0 topo-lines opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-[#A67C5B] font-bold block mb-2">
              THE TRANSFORMATIVE IMPACT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFF8ED]">
              From Fragmented Data to One Connected Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-[#D8C2A8] mt-3">
              How POLARIS revolutionizes scientific outreach, knowledge dissemination, and public engagement:
            </p>
          </div>

          {/* Before & After Transformation Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            
            {/* The Old Fragmented Way */}
            <div className="bg-[#2E1E16] p-6 sm:p-8 rounded-2xl border border-red-900/40 relative">
              <span className="font-mono text-xs uppercase tracking-wider text-red-400 font-bold block mb-4 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                BEFORE POLARIS: FRAGMENTED SILOS
              </span>
              <ul className="space-y-3 text-sm text-[#D8C2A8]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2"></span>
                  <span>Scattered expedition reports and cruise logs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2"></span>
                  <span>Separate inaccessible datasets in legacy formats</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2"></span>
                  <span>Hard-to-understand research inaccessible to students</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2"></span>
                  <span>Limited public outreach and social media dissemination</span>
                </li>
              </ul>
            </div>

            {/* The POLARIS Way */}
            <div className="bg-[#FFF8ED] text-[#3B261C] p-6 sm:p-8 rounded-2xl border-2 border-emerald-600/50 shadow-2xl relative">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-800 font-bold block mb-4 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                WITH POLARIS: ONE POLAR ECOSYSTEM
              </span>
              <ul className="space-y-3 text-sm text-[#523528]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2"></span>
                  <span><strong>Researchers:</strong> Open datasets, preprints &amp; cruise telemetry</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2"></span>
                  <span><strong>Students:</strong> Interactive gamified quizzes &amp; simplified guides</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2"></span>
                  <span><strong>Media &amp; Public:</strong> 1-click social posts, video scripts &amp; infographics</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2"></span>
                  <span><strong>Institutions:</strong> Real-time analytics &amp; impact monitoring</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Final Mission Statement Badge */}
          <div className="mt-14 text-center">
            <p className="font-serif italic text-xl sm:text-2xl text-[#FFF8ED] max-w-2xl mx-auto leading-relaxed">
              &ldquo;Making India&apos;s Polar Science Discoverable, Understandable and Shareable.&rdquo;
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/repository"
                className="px-6 py-3 bg-[#A67C5B] hover:bg-[#8C6747] text-[#FFF8ED] rounded-xl font-mono text-xs font-semibold transition-colors shadow-md"
              >
                Access Knowledge Repository
              </Link>
              <Link
                href="/learn"
                className="px-6 py-3 bg-transparent hover:bg-[#523528] text-[#FFF8ED] border border-[#B49A82] rounded-xl font-mono text-xs font-semibold transition-colors"
              >
                Start Learning Hub
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
