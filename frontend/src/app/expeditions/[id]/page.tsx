'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Navigation, Calendar, Anchor, Users, MapPin, 
  CheckCircle, ArrowLeft, BookOpen, Database, Compass 
} from 'lucide-react';
import { Expedition, Publication } from '@/lib/types';
import { INITIAL_EXPEDITIONS, INITIAL_PUBLICATIONS } from '@/lib/data';
import { PublicationCard } from '@/components/PublicationCard';
import { ExplainSimplyModal } from '@/components/ExplainSimplyModal';

export default function ExpeditionDetailPage() {
  const params = useParams();
  const expId = params.id as string;

  const [expedition, setExpedition] = useState<Expedition | null>(null);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const found = INITIAL_EXPEDITIONS.find(
      e => e.id === expId || e.expedition_number.toLowerCase() === expId.toLowerCase()
    ) || INITIAL_EXPEDITIONS[0];
    setExpedition(found);
  }, [expId]);

  if (!expedition) {
    return <div className="p-20 text-center font-mono">Loading expedition log...</div>;
  }

  const relatedPubs = INITIAL_PUBLICATIONS.filter(p => 
    p.region.toLowerCase() === expedition.region.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">
      
      <div>
        <Link
          href="/expeditions"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#76543F] hover:text-[#3B261C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Expedition Catalog</span>
        </Link>
      </div>

      {/* Header */}
      <div className="journal-card-static rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded bg-[#3B261C] text-[#FFF8ED] font-bold">
            {expedition.expedition_number}
          </span>
          <span className="px-2.5 py-1 rounded bg-[#F4E9D8] text-[#523528] border border-[#D8C2A8]">
            Year: {expedition.year} • {expedition.status}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C]">
          {expedition.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-[#523528] pt-2">
          <div className="bg-[#F4E9D8] p-3 rounded-lg border border-[#D8C2A8]">
            <span className="text-[#76543F] block text-[10px]">EXPEDITION LEADER</span>
            <strong className="text-[#3B261C] text-sm">{expedition.leader_name}</strong>
          </div>
          <div className="bg-[#F4E9D8] p-3 rounded-lg border border-[#D8C2A8]">
            <span className="text-[#76543F] block text-[10px]">VESSEL / TRANSPORT</span>
            <strong className="text-[#3B261C] text-sm">{expedition.vessel_name}</strong>
          </div>
          <div className="bg-[#F4E9D8] p-3 rounded-lg border border-[#D8C2A8]">
            <span className="text-[#76543F] block text-[10px]">DEPLOYED PERSONNEL</span>
            <strong className="text-[#3B261C] text-sm">{expedition.researchers_count} Scientists</strong>
          </div>
        </div>

        <p className="text-sm text-[#523528] leading-relaxed pt-2">
          {expedition.description}
        </p>
      </div>

      {/* Objectives & Route Coordinates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Mission Objectives */}
        <div className="journal-card-static rounded-xl p-6 space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#3B261C] flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-700" />
            <span>Core Scientific Mission Objectives</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-[#523528]">
            {expedition.objectives.map((obj, i) => (
              <li key={i} className="bg-[#F4E9D8] p-3 rounded-lg border border-[#D8C2A8] flex items-start gap-2.5">
                <span className="font-mono font-bold text-[#A67C5B] shrink-0">{i + 1}.</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Voyage Route Coordinates Track */}
        <div className="journal-card-static rounded-xl p-6 space-y-4 font-mono text-xs">
          <h3 className="font-serif font-bold text-xl text-[#3B261C] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#A67C5B]" />
            <span>Charter Voyage Waypoints</span>
          </h3>
          <div className="space-y-2">
            {expedition.route_coordinates.map((pt, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#F4E9D8] border border-[#D8C2A8]">
                <span className="font-bold text-[#3B261C]">Waypoint {i + 1}: {pt.name}</span>
                <span className="text-[#76543F]">{pt.lat.toFixed(2)}°, {pt.lng.toFixed(2)}°</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Related Publications */}
      <div>
        <h3 className="font-serif font-bold text-2xl text-[#3B261C] mb-4">
          Resulting Publications &amp; Reports ({relatedPubs.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPubs.map(pub => (
            <PublicationCard
              key={pub.id}
              publication={pub}
              onExplainSimply={(p) => {
                setSelectedPub(p);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Simplification Modal */}
      <ExplainSimplyModal
        publication={selectedPub}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
