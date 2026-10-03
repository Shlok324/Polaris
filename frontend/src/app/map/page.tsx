'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, MapPin, Navigation, Anchor, Radio, 
  Layers, ExternalLink, Globe, Wind, Thermometer 
} from 'lucide-react';
import { PolarMap } from '@/components/PolarMap';
import { INITIAL_STATIONS, INITIAL_EXPEDITIONS } from '@/lib/data';
import { ResearchStation } from '@/lib/types';

export default function PolarMapPage() {
  const [selectedStation, setSelectedStation] = useState<ResearchStation>(INITIAL_STATIONS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-12">
      
      {/* Page Header */}
      <div className="border-b border-[#B49A82] pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>Interactive Cartographic Projections</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B261C]">
          National Polar Map &amp; Voyage Tracks
        </h1>
        <p className="text-sm sm:text-base text-[#523528] mt-2 max-w-3xl leading-relaxed">
          Interactive polar stereographic visualization tracking India&apos;s active research stations, deep ocean moorings, and chartered vessel expedition routes across Antarctica, the Arctic, the Southern Ocean, and the Himalayas.
        </p>
      </div>

      {/* Main Interactive Map Component */}
      <PolarMap
        selectedStationId={selectedStation.id}
        onSelectStation={(st) => setSelectedStation(st)}
      />

      {/* Stations Roster & Geodetic Metadata Reference */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl font-bold text-[#3B261C]">
            Geodetic Station Log &amp; Scientific Capabilities
          </h2>
          <span className="font-mono text-xs text-[#76543F]">
            Datum: WGS-84 • Indian Polar Registry
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INITIAL_STATIONS.map((st) => (
            <div
              key={st.id}
              onClick={() => setSelectedStation(st)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedStation.id === st.id
                  ? 'bg-[#FFF8ED] border-[#3B261C] shadow-md ring-1 ring-[#3B261C]'
                  : 'bg-[#FFF8ED] border-[#B49A82] hover:bg-[#F4E9D8]'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-[#A67C5B] mb-1">
                <span className="uppercase font-bold">{st.region}</span>
                <span className="text-emerald-800 font-bold">{st.status}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3B261C] mb-1">
                {st.name}
              </h3>
              <p className="text-xs font-mono text-[#76543F] mb-3">
                {st.latitude.toFixed(4)}°, {st.longitude.toFixed(4)}°
              </p>
              <p className="text-xs text-[#523528] line-clamp-2 leading-relaxed mb-3">
                {st.description}
              </p>
              <div className="flex items-center justify-between font-mono text-[11px] pt-2 border-t border-[#D8C2A8]">
                <span className="text-[#76543F]">Est. {st.established_year}</span>
                <Link
                  href={`/stations/${st.id}`}
                  className="text-[#3B261C] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Full Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
