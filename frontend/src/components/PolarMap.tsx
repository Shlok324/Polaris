'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, MapPin, Wind, Thermometer, Radio, 
  ExternalLink, Layers, Navigation, Calendar, Info 
} from 'lucide-react';
import { ResearchStation, Expedition } from '@/lib/types';
import { INITIAL_STATIONS, INITIAL_EXPEDITIONS } from '@/lib/data';

interface PolarMapProps {
  selectedStationId?: string;
  onSelectStation?: (station: ResearchStation) => void;
}

export const PolarMap: React.FC<PolarMapProps> = ({
  selectedStationId,
  onSelectStation
}) => {
  const [activeRegion, setActiveRegion] = useState<'All' | 'Antarctica' | 'Arctic' | 'Himalayas' | 'Southern Ocean'>('All');
  const [selectedStation, setSelectedStation] = useState<ResearchStation>(
    INITIAL_STATIONS.find(s => s.id === selectedStationId) || INITIAL_STATIONS[0]
  );
  const [showRoutes, setShowRoutes] = useState(true);
  const [showStations, setShowStations] = useState(true);

  const filteredStations = INITIAL_STATIONS.filter(s => {
    if (activeRegion === 'All') return true;
    if (activeRegion === 'Antarctica') return s.region === 'Antarctica';
    if (activeRegion === 'Arctic') return s.region === 'Arctic';
    if (activeRegion === 'Himalayas') return s.region.includes('Himalayas');
    if (activeRegion === 'Southern Ocean') return s.region.includes('Ocean');
    return true;
  });

  const handleStationClick = (station: ResearchStation) => {
    setSelectedStation(station);
    if (onSelectStation) onSelectStation(station);
  };

  return (
    <div className="bg-[#FFF8ED] border-2 border-[#B49A82] rounded-2xl shadow-xl overflow-hidden font-sans">
      
      {/* Top Map Toolbar */}
      <div className="bg-[#3B261C] text-[#FFF8ED] p-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#523528]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#523528] text-amber-300 border border-[#76543F]">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#FFF8ED]">Interactive Polar Map & Route Navigator</h3>
            <p className="font-mono text-xs text-[#D8C2A8]">Cartographic Expedition Projections & Observatories</p>
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {(['All', 'Antarctica', 'Arctic', 'Himalayas', 'Southern Ocean'] as const).map(reg => (
            <button
              key={reg}
              onClick={() => setActiveRegion(reg)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeRegion === reg
                  ? 'bg-amber-700 text-[#FFF8ED] font-bold shadow-xs'
                  : 'bg-[#523528] text-[#D8C2A8] hover:bg-[#76543F] hover:text-[#FFF8ED]'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map View & Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        
        {/* Interactive SVG Projection Map */}
        <div className="lg:col-span-8 bg-[#EADBCE] relative flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-[#B49A82] overflow-hidden">
          
          {/* Topographic Lines Overlay */}
          <div className="absolute inset-0 topo-lines opacity-20 pointer-events-none"></div>

          {/* Latitude & Longitude Graticule Reference */}
          <div className="absolute top-3 left-4 font-mono text-[11px] text-[#76543F] space-y-0.5 pointer-events-none">
            <div>POLAR STEROGRAPHIC REFERENCE GRID</div>
            <div className="text-[#A67C5B]">ANTARCTIC 60°S–90°S | ARCTIC 70°N–90°N</div>
          </div>

          {/* Toggles */}
          <div className="absolute top-3 right-4 flex items-center gap-2 font-mono text-xs z-10 bg-[#FFF8ED]/90 p-1.5 rounded-lg border border-[#B49A82] shadow-xs">
            <label className="flex items-center gap-1.5 text-[#523528] cursor-pointer">
              <input
                type="checkbox"
                checked={showRoutes}
                onChange={e => setShowRoutes(e.target.checked)}
                className="rounded accent-[#3B261C]"
              />
              <span>Expedition Routes</span>
            </label>
            <span className="text-[#B49A82]">|</span>
            <label className="flex items-center gap-1.5 text-[#523528] cursor-pointer">
              <input
                type="checkbox"
                checked={showStations}
                onChange={e => setShowStations(e.target.checked)}
                className="rounded accent-[#3B261C]"
              />
              <span>Stations</span>
            </label>
          </div>

          {/* Map Graphic Projection */}
          <div className="relative w-full max-w-[650px] aspect-4/3">
            <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-md">
              {/* Graticule latitude circles */}
              <circle cx="400" cy="300" r="260" fill="none" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="400" cy="300" r="190" fill="none" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="400" cy="300" r="110" fill="none" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="400" y1="30" x2="400" y2="570" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="2 4" />
              <line x1="130" y1="300" x2="670" y2="300" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="2 4" />

              {/* Stylized Antarctica Continental Mass Outline */}
              <path
                d="M 320 220 
                   C 360 210, 420 190, 480 230 
                   C 540 270, 560 350, 500 410 
                   C 440 470, 360 480, 290 440 
                   C 220 400, 200 330, 240 280 
                   C 260 250, 290 230, 320 220 Z"
                fill="#FFF8ED"
                stroke="#B49A82"
                strokeWidth="2.5"
                className="transition-all"
              />

              {/* Ice Shelves & Glacial Margins */}
              <path
                d="M 440 250 C 470 240, 490 270, 480 300 Z"
                fill="#E8D9C5"
                opacity="0.8"
              />
              <path
                d="M 260 300 C 230 320, 240 360, 270 350 Z"
                fill="#E8D9C5"
                opacity="0.8"
              />

              {/* Topographic Contours inside continent */}
              <path
                d="M 340 260 C 380 250, 440 270, 450 320 C 460 370, 400 410, 330 380 C 280 350, 300 280, 340 260 Z"
                fill="none"
                stroke="#D8C2A8"
                strokeWidth="1.5"
              />

              {/* Inset for Arctic / Svalbard (Upper Left) */}
              <rect x="25" y="25" width="220" height="150" rx="8" fill="#FFF8ED" stroke="#B49A82" strokeWidth="1.5" />
              <text x="35" y="44" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#76543F">ARCTIC INSET: SVALBARD (79°N)</text>
              <path
                d="M 70 70 C 90 60, 140 70, 150 110 C 130 140, 80 130, 70 100 Z"
                fill="#F4E9D8"
                stroke="#B49A82"
                strokeWidth="1.5"
              />

              {/* Inset for Himalayas (Upper Right) */}
              <rect x="555" y="25" width="220" height="150" rx="8" fill="#FFF8ED" stroke="#B49A82" strokeWidth="1.5" />
              <text x="565" y="44" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#76543F">THIRD POLE: SPITI VALLEY (4080m)</text>
              <path
                d="M 600 120 L 650 70 L 690 110 L 730 80 L 750 130 Z"
                fill="#F4E9D8"
                stroke="#B49A82"
                strokeWidth="1.5"
              />

              {/* Expedition Voyage Routes */}
              {showRoutes && (
                <g>
                  {/* Goa -> Cape Town -> Bharati Route */}
                  <path
                    d="M 400 30 Q 420 120, 470 240"
                    fill="none"
                    stroke="#A67C5B"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    className="animate-route"
                  />
                  {/* Cape Town -> Maitri Route */}
                  <path
                    d="M 320 150 Q 290 220, 270 290"
                    fill="none"
                    stroke="#76543F"
                    strokeWidth="2"
                    strokeDasharray="5 3"
                    className="animate-route"
                  />
                  {/* Route Label */}
                  <text x="440" y="160" fontFamily="monospace" fontSize="10" fill="#76543F" transform="rotate(35 440 160)">
                    43rd ISEA Voyage Track →
                  </text>
                </g>
              )}

              {/* Interactive Station Markers */}
              {showStations && (
                <g>
                  {/* Bharati Station (-69.4°S, 76.2°E) */}
                  <g 
                    onClick={() => handleStationClick(INITIAL_STATIONS[0])}
                    className="cursor-pointer group"
                    transform="translate(470, 245)"
                  >
                    <circle cx="0" cy="0" r="16" fill="rgba(166, 124, 91, 0.25)" className="animate-ping" />
                    <circle cx="0" cy="0" r="9" fill={selectedStation.id === 'stat-bharati' ? '#D97706' : '#3B261C'} stroke="#FFF8ED" strokeWidth="2.5" />
                    <text x="14" y="4" fontFamily="serif" fontSize="13" fontWeight="bold" fill="#3B261C">Bharati (India)</text>
                    <text x="14" y="18" fontFamily="monospace" fontSize="9" fill="#76543F">69°24&apos;S, 76°11&apos;E</text>
                  </g>

                  {/* Maitri Base (-70.8°S, 11.7°E) */}
                  <g 
                    onClick={() => handleStationClick(INITIAL_STATIONS[1])}
                    className="cursor-pointer group"
                    transform="translate(270, 290)"
                  >
                    <circle cx="0" cy="0" r="14" fill="rgba(118, 84, 63, 0.2)" />
                    <circle cx="0" cy="0" r="8" fill={selectedStation.id === 'stat-maitri' ? '#D97706' : '#523528'} stroke="#FFF8ED" strokeWidth="2" />
                    <text x="-85" y="4" fontFamily="serif" fontSize="13" fontWeight="bold" fill="#3B261C">Maitri Base</text>
                    <text x="-85" y="18" fontFamily="monospace" fontSize="9" fill="#76543F">70°46&apos;S, 11°44&apos;E</text>
                  </g>

                  {/* Dakshin Gangotri Historical Marker */}
                  <g transform="translate(285, 270)">
                    <rect x="-4" y="-4" width="8" height="8" fill="#8C6747" stroke="#FFF8ED" strokeWidth="1.5" />
                    <text x="10" y="3" fontFamily="monospace" fontSize="9" fill="#76543F">Dakshin Gangotri (Hist. 1983)</text>
                  </g>

                  {/* Arctic: Himadri Station Marker (Inside Arctic Inset) */}
                  <g 
                    onClick={() => handleStationClick(INITIAL_STATIONS[2])}
                    className="cursor-pointer"
                    transform="translate(110, 100)"
                  >
                    <circle cx="0" cy="0" r="7" fill={selectedStation.id === 'stat-himadri' ? '#D97706' : '#3B261C'} stroke="#FFF8ED" strokeWidth="2" />
                    <text x="12" y="3" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#3B261C">Himadri (79°N)</text>
                  </g>

                  {/* Arctic: IndARC Underwater Mooring */}
                  <g 
                    onClick={() => handleStationClick(INITIAL_STATIONS[4])}
                    className="cursor-pointer"
                    transform="translate(135, 125)"
                  >
                    <polygon points="0,-6 6,4 -6,4" fill={selectedStation.id === 'stat-indarc' ? '#D97706' : '#76543F'} stroke="#FFF8ED" strokeWidth="1.5" />
                    <text x="10" y="3" fontFamily="monospace" fontSize="9" fill="#523528">IndARC (192m)</text>
                  </g>

                  {/* Himalayas: Himansh Station Marker (Inside Third Pole Inset) */}
                  <g 
                    onClick={() => handleStationClick(INITIAL_STATIONS[3])}
                    className="cursor-pointer"
                    transform="translate(660, 95)"
                  >
                    <circle cx="0" cy="0" r="7" fill={selectedStation.id === 'stat-himansh' ? '#D97706' : '#3B261C'} stroke="#FFF8ED" strokeWidth="2" />
                    <text x="12" y="3" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#3B261C">Himansh (4080m)</text>
                  </g>
                </g>
              )}

            </svg>
          </div>

          {/* Compass motif watermark */}
          <div className="absolute bottom-4 right-4 text-xs font-mono text-[#76543F] bg-[#FFF8ED]/85 px-3 py-1.5 rounded-lg border border-[#B49A82]">
            <span>Click any marker to inspect telemetry & logs</span>
          </div>

        </div>

        {/* Selected Station Detail Sidebar */}
        <div className="lg:col-span-4 p-6 bg-[#FFF8ED] flex flex-col justify-between">
          
          <div>
            {/* Header info */}
            <div className="border-b border-[#D8C2A8] pb-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#A67C5B] font-bold">
                  {selectedStation.region}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {selectedStation.status}
                </span>
              </div>
              <h4 className="font-serif font-bold text-2xl text-[#3B261C] mt-1">
                {selectedStation.name}
              </h4>
              <p className="text-xs font-mono text-[#76543F] mt-0.5">
                {selectedStation.location_name}
              </p>
            </div>

            {/* Coordinates & Physical Specifications */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
              <div className="bg-[#F4E9D8] p-2 rounded border border-[#D8C2A8]">
                <span className="text-[#76543F] block text-[10px]">COORDINATES</span>
                <span className="font-bold text-[#3B261C]">{selectedStation.latitude.toFixed(2)}°, {selectedStation.longitude.toFixed(2)}°</span>
              </div>
              <div className="bg-[#F4E9D8] p-2 rounded border border-[#D8C2A8]">
                <span className="text-[#76543F] block text-[10px]">ESTABLISHED</span>
                <span className="font-bold text-[#3B261C]">{selectedStation.established_year} ({new Date().getFullYear() - selectedStation.established_year} yrs ago)</span>
              </div>
            </div>

            {/* Live Weather Telemetry Simulation Card */}
            {selectedStation.telemetry && (
              <div className="bg-[#3B261C] text-[#FFF8ED] p-4 rounded-xl mb-4 border border-[#523528]">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#D8C2A8] mb-2 border-b border-[#523528] pb-1.5">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                    LIVE SENSOR TELEMETRY
                  </span>
                  <span>SYNCED</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="bg-[#2E1E16] p-2 rounded">
                    <span className="text-[10px] text-[#A67C5B] block">AIR TEMP</span>
                    <span className="text-base font-bold text-[#FFF8ED]">{selectedStation.telemetry.temperature_c}°C</span>
                  </div>
                  <div className="bg-[#2E1E16] p-2 rounded">
                    <span className="text-[10px] text-[#A67C5B] block">WIND</span>
                    <span className="text-base font-bold text-[#FFF8ED]">{selectedStation.telemetry.wind_speed_kmh} <span className="text-[9px]">km/h</span></span>
                  </div>
                  <div className="bg-[#2E1E16] p-2 rounded">
                    <span className="text-[10px] text-[#A67C5B] block">BARO</span>
                    <span className="text-base font-bold text-[#FFF8ED]">{selectedStation.telemetry.pressure_hpa}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-xs text-[#523528] leading-relaxed mb-4 line-clamp-3">
              {selectedStation.description}
            </p>

            {/* Facilities Snapshot */}
            <div className="mb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#76543F] font-bold block mb-1.5">
                Key Observatories & Facilities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedStation.facilities.slice(0, 3).map((f, i) => (
                  <span key={i} className="text-[11px] bg-[#F4E9D8] px-2 py-0.5 rounded text-[#523528] border border-[#D8C2A8]">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Link to Full Station Detail Page */}
          <div className="pt-4 border-t border-[#D8C2A8]">
            <Link
              href={`/stations/${selectedStation.id}`}
              className="w-full py-2.5 bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Explore {selectedStation.name} Full Archive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
