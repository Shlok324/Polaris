'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, MapPin, Layers, MountainSnow, CloudSun, 
  Waves, Leaf, Radio, ArrowRight, Sparkles, Eye, ShieldCheck 
} from 'lucide-react';
import { VirtualStationExplorer } from '@/components/VirtualStationExplorer';
import { INITIAL_STATIONS } from '@/lib/data';

export default function ExplorePage() {
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Antarctica' | 'Arctic' | 'Himalayas' | 'Southern Ocean'>('All');

  const domains = [
    {
      name: 'Atmospheric Sciences & Meteorology',
      slug: 'atmospheric',
      icon: CloudSun,
      count: '340+ Papers',
      desc: 'Upper air dynamics, ozone hole recovery, boundary layer blizzards, and greenhouse gas fluxes.'
    },
    {
      name: 'Glaciology & Cryospheric Studies',
      slug: 'glaciology',
      icon: MountainSnow,
      count: '280+ Datasets',
      desc: 'Deep ice-sheet drilling, ice-core paleoclimate proxies, fast-ice thermodynamics, and glacier mass balance.'
    },
    {
      name: 'Southern Ocean & Polar Oceanography',
      slug: 'oceanography',
      icon: Waves,
      count: '420+ Records',
      desc: 'Antarctic circumpolar current, deep water formation, IndARC moored ocean time series, and ocean acidification.'
    },
    {
      name: 'Polar Biology & Extremophile Microbiology',
      slug: 'biology',
      icon: Leaf,
      count: '190+ Studies',
      desc: 'Psychrophilic bacteria, cold-active enzymes, penguin breeding ecology, and moss biodiversity.'
    },
    {
      name: 'Geology, Geophysics & Paleomagnetism',
      slug: 'geology',
      icon: Layers,
      count: '210+ Maps',
      desc: 'Gondwanaland continental reconstruction, crustal seismology, and Queen Maud Land bedrock mapping.'
    },
    {
      name: 'Space Weather & Geomagnetism',
      slug: 'space-weather',
      icon: Radio,
      count: '150+ Streams',
      desc: 'Pulsation magnetometer records, auroral emissions, and ionospheric radio scintillation observations.'
    }
  ];

  const filteredStations = INITIAL_STATIONS.filter(s => {
    if (selectedRegion === 'All') return true;
    if (selectedRegion === 'Antarctica') return s.region === 'Antarctica';
    if (selectedRegion === 'Arctic') return s.region === 'Arctic';
    if (selectedRegion === 'Himalayas') return s.region.includes('Himalayas');
    if (selectedRegion === 'Southern Ocean') return s.region.includes('Ocean');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-16">
      
      {/* Page Header */}
      <div className="border-b border-[#B49A82] pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>Interactive Discovery Engine</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B261C]">
          Explore India&apos;s Polar Frontiers
        </h1>
        <p className="text-base text-[#523528] mt-2 max-w-3xl leading-relaxed">
          Traverse four sovereign operational polar realms, inspect research stations in virtual 3D, and explore scientific domains calibrated from 43 Antarctic and Arctic campaigns.
        </p>

        {/* Region Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-6 font-mono text-xs">
          {(['All', 'Antarctica', 'Arctic', 'Himalayas', 'Southern Ocean'] as const).map(reg => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedRegion === reg
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-bold shadow-xs'
                  : 'bg-[#FFF8ED] text-[#523528] border border-[#B49A82] hover:bg-[#F4E9D8]'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* VIRTUAL POLAR EXPERIENCE: 3D STATION VISUALIZATION */}
      {/* ======================================================== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#A67C5B] font-bold block">
              SECTION 14 • VIRTUAL POLAR EXPERIENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B261C]">
              Virtual Station Explorer
            </h2>
          </div>
          <span className="text-xs font-mono text-[#76543F] hidden sm:inline">
            Interactive Hotspot Inspection System
          </span>
        </div>

        <VirtualStationExplorer />
      </div>

      {/* ======================================================== */}
      {/* RESEARCH STATIONS ROSTER */}
      {/* ======================================================== */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-[#3B261C]">
            Indian Polar Stations &amp; Observatories ({filteredStations.length})
          </h2>
          <Link
            href="/map"
            className="font-mono text-xs font-semibold text-[#523528] hover:text-[#3B261C] flex items-center gap-1"
          >
            <span>Open Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map(st => (
            <div key={st.id} className="journal-card rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#A67C5B] uppercase">
                    {st.region}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {st.status}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#3B261C] mb-1">
                  {st.name}
                </h3>
                <p className="text-xs font-mono text-[#76543F] mb-3">
                  {st.location_name}
                </p>

                <p className="text-xs text-[#523528] leading-relaxed line-clamp-3 mb-4">
                  {st.description}
                </p>

                {/* Key facility pills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {st.facilities.slice(0, 2).map((fac, i) => (
                    <span key={i} className="text-[10px] font-mono bg-[#F4E9D8] px-2 py-0.5 rounded text-[#523528] border border-[#D8C2A8]">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#D8C2A8] pt-3 flex items-center justify-between font-mono text-xs">
                <span className="text-[11px] text-[#76543F]">
                  Est. {st.established_year}
                </span>
                <Link
                  href={`/stations/${st.id}`}
                  className="flex items-center gap-1 font-semibold text-[#3B261C] hover:text-[#523528] transition-colors"
                >
                  <span>Explore Station</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCIENTIFIC DOMAIN TAXONOMY */}
      {/* ======================================================== */}
      <div>
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-[#A67C5B] font-bold block mb-1">
            RESEARCH DOMAINS &amp; DISCIPLINES
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#3B261C]">
            Explore by Scientific Domain
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((dom, idx) => {
            const IconComponent = dom.icon;
            return (
              <Link
                key={idx}
                href={`/repository?domain=${encodeURIComponent(dom.name.split(' ')[0])}`}
                className="journal-card rounded-xl p-5 block group transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#3B261C] flex items-center justify-center text-[#FFF8ED] mb-3 group-hover:bg-[#523528] transition-colors">
                  <IconComponent className="w-5 h-5 text-[#D8C2A8]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3B261C] group-hover:text-[#523528] mb-1 leading-snug">
                  {dom.name}
                </h3>
                <span className="font-mono text-xs text-[#A67C5B] font-semibold block mb-2">
                  {dom.count}
                </span>
                <p className="text-xs text-[#523528] leading-relaxed">
                  {dom.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 font-mono text-xs text-[#76543F] font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Browse Indexed Papers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
