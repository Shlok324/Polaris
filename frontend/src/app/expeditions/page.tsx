'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Navigation, Calendar, Anchor, MapPin, Users, 
  ArrowRight, Filter, Layers, Compass 
} from 'lucide-react';
import { INITIAL_EXPEDITIONS } from '@/lib/data';
import { ExpeditionCard } from '@/components/ExpeditionCard';

export default function ExpeditionsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');

  const filteredExpeditions = INITIAL_EXPEDITIONS.filter(e => {
    if (selectedRegion === 'All') return true;
    return e.region.toLowerCase().includes(selectedRegion.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#B49A82] pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold uppercase tracking-wider mb-2">
          <Navigation className="w-4 h-4" />
          <span>Historical &amp; Active Field Missions</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B261C]">
              Indian Scientific Expeditions
            </h1>
            <p className="text-sm sm:text-base text-[#523528] mt-2 max-w-2xl leading-relaxed">
              Explore 44 historic and ongoing polar campaigns across Antarctica, the Arctic, the Southern Ocean, and the high-altitude Himalayan cryosphere.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="bg-[#FFF8ED] p-1 rounded-xl border border-[#B49A82] flex items-center font-mono text-xs shadow-xs self-start md:self-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'cards'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-semibold'
                  : 'text-[#523528] hover:text-[#3B261C]'
              }`}
            >
              Card View
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-semibold'
                  : 'text-[#523528] hover:text-[#3B261C]'
              }`}
            >
              Chronological Timeline
            </button>
          </div>
        </div>

        {/* Region Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-6 font-mono text-xs">
          {(['All', 'Antarctica', 'Arctic', 'Southern Ocean', 'Himalayas'] as const).map(reg => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
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

      {/* Main Content: Card View vs Timeline View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExpeditions.map(exp => (
            <ExpeditionCard key={exp.id} expedition={exp} />
          ))}
        </div>
      ) : (
        <div className="journal-card-static rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
          <div className="relative border-l-2 border-[#B49A82] ml-4 pl-8 space-y-10">
            {filteredExpeditions.map((exp, idx) => (
              <div key={exp.id} className="relative group">
                <span className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#3B261C] border-2 border-[#FFF8ED]"></span>
                
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold mb-1">
                  <span>{exp.year}</span>
                  <span>•</span>
                  <span>{exp.expedition_number}</span>
                  <span>•</span>
                  <span className="text-[#76543F] uppercase">{exp.region}</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#3B261C]">
                  {exp.name}
                </h3>

                <p className="text-xs text-[#523528] leading-relaxed mt-2 max-w-2xl">
                  {exp.description}
                </p>

                <div className="mt-3 flex items-center gap-4 text-xs font-mono text-[#76543F]">
                  <span>Leader: <strong className="text-[#3B261C]">{exp.leader_name}</strong></span>
                  <span>•</span>
                  <span>Vessel: {exp.vessel_name}</span>
                </div>

                <div className="mt-3">
                  <Link
                    href={`/expeditions/${exp.id}`}
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#3B261C] hover:text-[#523528]"
                  >
                    <span>Inspect Voyage Track &amp; Logs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
