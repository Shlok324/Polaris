'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, Radio, Compass, Calendar, MountainSnow, 
  Wind, Thermometer, ShieldCheck, CheckCircle, 
  ArrowLeft, Download, BookOpen, Database, Sparkles 
} from 'lucide-react';
import { ResearchStation, Publication, Dataset } from '@/lib/types';
import { INITIAL_STATIONS, INITIAL_PUBLICATIONS, INITIAL_DATASETS } from '@/lib/data';
import { PublicationCard } from '@/components/PublicationCard';
import { ExplainSimplyModal } from '@/components/ExplainSimplyModal';

export default function StationDetailPage() {
  const params = useParams();
  const stationId = params.id as string;

  const [station, setStation] = useState<ResearchStation | null>(null);
  const [selectedPubForSimplification, setSelectedPubForSimplification] = useState<Publication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const found = INITIAL_STATIONS.find(
      s => s.id === stationId || s.name.toLowerCase() === stationId.toLowerCase()
    ) || INITIAL_STATIONS[0];
    setStation(found);
  }, [stationId]);

  if (!station) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono">
        Loading station telemetry...
      </div>
    );
  }

  const relatedPubs = INITIAL_PUBLICATIONS.filter(p => 
    p.station_name?.toLowerCase() === station.name.toLowerCase() ||
    p.region.toLowerCase() === station.region.toLowerCase()
  );

  const relatedDatasets = INITIAL_DATASETS.filter(d => 
    d.station_name?.toLowerCase() === station.name.toLowerCase() ||
    d.region.toLowerCase() === station.region.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-12">
      
      {/* Back button */}
      <div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#76543F] hover:text-[#3B261C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Polar Explorer</span>
        </Link>
      </div>

      {/* Hero Header with Station Imagery */}
      <div className="relative rounded-2xl overflow-hidden bg-[#3B261C] text-[#FFF8ED] border-2 border-[#523528] shadow-2xl">
        <div className="relative h-80 sm:h-96 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={station.image_url}
            alt={station.name}
            className="w-full h-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3B261C] via-[#3B261C]/50 to-transparent"></div>
        </div>

        {/* Floating Content Over Hero */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-0.5 rounded bg-amber-700/80 text-white font-bold uppercase tracking-wider">
                {station.region}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {station.status}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              {station.name} Station
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[#D8C2A8] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#A67C5B]" />
              <span>{station.location_name}</span>
            </p>
          </div>

          {/* Quick Specifications Chip */}
          <div className="bg-[#2E1E16]/90 p-4 rounded-xl border border-[#523528] font-mono text-xs grid grid-cols-2 gap-3 min-w-[240px]">
            <div>
              <span className="text-[#A67C5B] block text-[10px]">COORDINATES</span>
              <span className="font-bold text-[#FFF8ED]">{station.latitude.toFixed(2)}°, {station.longitude.toFixed(2)}°</span>
            </div>
            <div>
              <span className="text-[#A67C5B] block text-[10px]">ESTABLISHED</span>
              <span className="font-bold text-[#FFF8ED]">{station.established_year}</span>
            </div>
            <div>
              <span className="text-[#A67C5B] block text-[10px]">ELEVATION</span>
              <span className="font-bold text-[#FFF8ED]">{station.elevation_m} m</span>
            </div>
            <div>
              <span className="text-[#A67C5B] block text-[10px]">AGENCY</span>
              <span className="font-bold text-[#FFF8ED]">NCPOR / MoES</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Overview & Live Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Overview, Architecture, Timeline */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Station Overview */}
          <div className="journal-card-static rounded-xl p-6 sm:p-8 space-y-4">
            <h2 className="font-serif font-bold text-2xl text-[#3B261C]">
              Operational Profile &amp; Mission Architecture
            </h2>
            <p className="text-sm text-[#523528] leading-relaxed">
              {station.description}
            </p>
          </div>

          {/* Key Facilities Checklist */}
          <div className="journal-card-static rounded-xl p-6 sm:p-8">
            <h3 className="font-serif font-bold text-xl text-[#3B261C] mb-4">
              Scientific Laboratories &amp; Field Infrastructure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {station.facilities.map((fac, idx) => (
                <div key={idx} className="bg-[#F4E9D8] p-3 rounded-lg border border-[#D8C2A8] flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-[#3B261C]">{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Expedition Timeline */}
          {station.timeline && (
            <div className="journal-card-static rounded-xl p-6 sm:p-8">
              <h3 className="font-serif font-bold text-xl text-[#3B261C] mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#A67C5B]" />
                <span>Station Milestones &amp; Expedition Campaigns</span>
              </h3>
              
              <div className="relative border-l-2 border-[#B49A82] ml-4 pl-6 space-y-6">
                {station.timeline.map((event, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#523528] border-2 border-[#FFF8ED]"></span>
                    <span className="font-mono text-xs font-bold text-[#A67C5B] block">
                      {event.year}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#3B261C] mt-0.5">
                      {event.title}
                    </h4>
                    <p className="text-xs text-[#523528] mt-1 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Live Telemetry & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Sensor Telemetry */}
          {station.telemetry && (
            <div className="bg-[#3B261C] text-[#FFF8ED] p-6 rounded-2xl border-2 border-[#523528] shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-[#523528] pb-3 font-mono text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  LIVE TELEMETRY
                </span>
                <span className="text-[10px] text-[#D8C2A8]">SATELLITE SYNC</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center font-mono">
                <div className="bg-[#2E1E16] p-3 rounded-xl border border-[#523528]">
                  <span className="text-[10px] text-[#A67C5B] block mb-1">AIR TEMP</span>
                  <span className="text-2xl font-bold text-[#FFF8ED]">{station.telemetry.temperature_c}°C</span>
                </div>
                <div className="bg-[#2E1E16] p-3 rounded-xl border border-[#523528]">
                  <span className="text-[10px] text-[#A67C5B] block mb-1">WIND SPEED</span>
                  <span className="text-2xl font-bold text-[#FFF8ED]">{station.telemetry.wind_speed_kmh} <span className="text-xs">km/h</span></span>
                </div>
                <div className="bg-[#2E1E16] p-3 rounded-xl border border-[#523528]">
                  <span className="text-[10px] text-[#A67C5B] block mb-1">BAROMETER</span>
                  <span className="text-lg font-bold text-[#FFF8ED]">{station.telemetry.pressure_hpa} <span className="text-xs">hPa</span></span>
                </div>
                <div className="bg-[#2E1E16] p-3 rounded-xl border border-[#523528]">
                  <span className="text-[10px] text-[#A67C5B] block mb-1">SOLAR FLUX</span>
                  <span className="text-lg font-bold text-[#FFF8ED]">{station.telemetry.solar_radiation_wm2} <span className="text-xs">W/m²</span></span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#D8C2A8] bg-[#2E1E16]/80 p-2.5 rounded-lg border border-[#523528]">
                <span>Status: </span>
                <span className="text-emerald-400 font-bold">{station.telemetry.status}</span>
              </div>
            </div>
          )}

          {/* Climate Extremes Baseline */}
          {station.climate_info && (
            <div className="journal-card-static rounded-xl p-5 space-y-3 font-mono text-xs">
              <span className="text-[10px] uppercase font-bold text-[#A67C5B] block">
                Recorded Climate Extremes
              </span>
              <div className="space-y-2 text-[#523528]">
                <div className="flex justify-between border-b border-[#D8C2A8] pb-1">
                  <span>Record Min Temp:</span>
                  <strong className="text-[#3B261C]">{station.climate_info.min_temp_c}°C</strong>
                </div>
                <div className="flex justify-between border-b border-[#D8C2A8] pb-1">
                  <span>Max Gust Velocity:</span>
                  <strong className="text-[#3B261C]">{station.climate_info.max_wind_kmh} km/h</strong>
                </div>
                {station.climate_info.polar_night_days && (
                  <div className="flex justify-between border-b border-[#D8C2A8] pb-1">
                    <span>Polar Night Duration:</span>
                    <strong className="text-[#3B261C]">{station.climate_info.polar_night_days} Days Darkness</strong>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Related Publications */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-[#3B261C] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#A67C5B]" />
            <span>Indexed Research Publications ({relatedPubs.length})</span>
          </h2>
          <Link
            href={`/repository?station=${encodeURIComponent(station.name)}`}
            className="font-mono text-xs text-[#523528] hover:text-[#3B261C] font-semibold"
          >
            View in Repository →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPubs.map((pub) => (
            <PublicationCard
              key={pub.id}
              publication={pub}
              onExplainSimply={(p) => {
                setSelectedPubForSimplification(p);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Explain Simply Modal */}
      <ExplainSimplyModal
        publication={selectedPubForSimplification}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
