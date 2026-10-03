'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Navigation, Calendar, MapPin, Users, BookOpen, 
  Database, ArrowRight, Anchor 
} from 'lucide-react';
import { Expedition } from '@/lib/types';

interface ExpeditionCardProps {
  expedition: Expedition;
}

export const ExpeditionCard: React.FC<ExpeditionCardProps> = ({ expedition }) => {
  return (
    <div className="journal-card rounded-xl p-5 flex flex-col justify-between group">
      
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#3B261C] text-[#FFF8ED]">
            {expedition.expedition_number}
          </span>
          <span className="font-mono text-xs text-[#76543F] bg-[#F4E9D8] px-2 py-0.5 rounded border border-[#D8C2A8]">
            {expedition.year}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-serif font-bold text-lg text-[#3B261C] leading-snug mb-2 group-hover:text-[#523528]">
          {expedition.name}
        </h4>

        {/* Vessel & Leader */}
        <div className="text-xs font-mono text-[#76543F] space-y-1 mb-3">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#A67C5B]" />
            <span>Leader: <strong className="text-[#3B261C]">{expedition.leader_name}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Anchor className="w-3.5 h-3.5 text-[#A67C5B]" />
            <span>Vessel: {expedition.vessel_name}</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-[#523528] line-clamp-3 leading-relaxed mb-4">
          {expedition.description}
        </p>

        {/* Research domains */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {expedition.research_domains.map((dom, i) => (
            <span
              key={i}
              className="text-[10px] font-mono bg-[#F4E9D8] px-2 py-0.5 rounded text-[#523528] border border-[#D8C2A8]"
            >
              {dom}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Link */}
      <div className="border-t border-[#D8C2A8] pt-3 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-3 text-[#76543F] text-[11px]">
          <span>{expedition.researchers_count} Scientists</span>
          <span>•</span>
          <span>{expedition.publications_count} Pubs</span>
        </div>

        <Link
          href={`/expeditions/${expedition.id}`}
          className="flex items-center gap-1 text-xs font-semibold text-[#3B261C] group-hover:text-[#523528] group-hover:translate-x-1 transition-all"
        >
          <span>Expedition Log</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
