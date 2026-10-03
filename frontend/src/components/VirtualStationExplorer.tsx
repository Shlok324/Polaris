'use client';

import React, { useState } from 'react';
import { 
  Compass, RotateCw, ZoomIn, Eye, Sparkles, 
  Thermometer, Wind, Radio, Shield, CheckCircle, Info, Activity 
} from 'lucide-react';

interface StationZone {
  id: string;
  name: string;
  category: string;
  temp_c: number;
  description: string;
  specs: string[];
  x: number; // percentage
  y: number; // percentage
}

const BHARATI_ZONES: StationZone[] = [
  {
    id: 'lab',
    name: 'Main Laboratory Complex',
    category: 'Scientific Research',
    temp_c: 21.0,
    description: 'Equipped with ultra-clean analytical hoods, aerosol spectrometers, and marine biology incubators. Continuously operates year-round with automated gas chromatography.',
    specs: ['Class 1000 Cleanroom Filter', 'High-accuracy gas chromatograph', 'Reverse-osmosis pure water feed'],
    x: 42,
    y: 38
  },
  {
    id: 'living',
    name: 'Residential Living & Mess Quarters',
    category: 'Life Support',
    temp_c: 22.5,
    description: 'Constructed within modular insulated ISO containers. Features 47 individual bunks, gymnasium, telemedicine operating theater, and a communal dining galley.',
    specs: ['Acoustic vibration dampening', 'Circadian full-spectrum light panels', 'Central hydronic radiator heating'],
    x: 62,
    y: 48
  },
  {
    id: 'comms',
    name: 'Ka-Band Satellite Telemetry Dome',
    category: 'Communications',
    temp_c: 18.0,
    description: 'Primary communications uplink transmitting raw remote-sensing data directly to the ground station at NCPOR Goa and NRSC/ISRO Shadnagar.',
    specs: ['Direct 100 Mbps Ka-Band Satellite Link', 'Radome wind shielding up to 260 km/h', 'Emergency backup iridium transceiver'],
    x: 52,
    y: 22
  },
  {
    id: 'met',
    name: 'Atmospheric LIDAR & Weather Mast',
    category: 'Meteorology',
    temp_c: -14.0,
    description: 'Autonomous atmospheric boundary layer instrumentation. Monitors aerosol optical depth, ozone depletion, and vertical wind shear over Prydz Bay.',
    specs: ['Dual-polarization aerosol LIDAR', 'Sonic 3D anemometers', 'Sun-photometer solar tracking dome'],
    x: 24,
    y: 30
  },
  {
    id: 'power',
    name: 'Zero-Effluent Bio-Treatment & Power Hub',
    category: 'Environmental Engineering',
    temp_c: 20.0,
    description: 'Dual combined heat-and-power (CHP) diesel-electric generators paired with biological bioreactor wastewater digestors ensuring 100% zero discharge into Antarctica.',
    specs: ['Thermal cogeneration efficiency 84%', 'Membrane bioreactor wastewater recycling', 'Solid ash containerization protocol'],
    x: 76,
    y: 60
  }
];

export const VirtualStationExplorer: React.FC = () => {
  const [activeZone, setActiveZone] = useState<StationZone>(BHARATI_ZONES[0]);
  const [rotationAngle, setRotationAngle] = useState(25);
  const [isRotating, setIsRotating] = useState(false);

  return (
    <div className="bg-[#FFF8ED] border-2 border-[#B49A82] rounded-2xl shadow-xl overflow-hidden font-sans">
      
      {/* Visualizer Header */}
      <div className="bg-[#3B261C] text-[#FFF8ED] p-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#523528]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#D8C2A8]">
              Virtual Polar Experience • Interactive Station Model
            </span>
          </div>
          <h3 className="font-serif font-bold text-xl text-[#FFF8ED] mt-0.5">
            Bharati Antarctic Research Facility (Larsemann Hills)
          </h3>
        </div>

        {/* Rotation & Angle Controls */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => setRotationAngle((prev) => (prev + 45) % 360)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#523528] hover:bg-[#76543F] rounded-lg transition-colors border border-[#76543F]"
          >
            <RotateCw className="w-3.5 h-3.5 text-amber-300" />
            <span>Rotate 45°</span>
          </button>
          <div className="bg-[#2E1E16] px-3 py-1.5 rounded-lg border border-[#523528] text-[#D8C2A8]">
            Perspective: <span className="text-[#FFF8ED] font-bold">{rotationAngle}°</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* 3D/Isometric Canvas Visualization View */}
        <div className="lg:col-span-8 bg-[#EFE3CF] relative min-h-[440px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#B49A82]">
          
          {/* Subtle Polar Topographic Grid Lines */}
          <div className="absolute inset-0 opacity-15 topo-lines pointer-events-none"></div>

          {/* Compass Rose Backdrop */}
          <div className="absolute top-4 left-4 font-mono text-xs text-[#76543F] flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#A67C5B]" />
            <span>BEARING: 69°24&apos;S, 76°11&apos;E (EAST ANTARCTICA)</span>
          </div>

          {/* Interactive Isometric Schematic Station Illustration */}
          <div 
            className="relative w-[85%] max-w-[540px] aspect-4/3 transition-transform duration-500 ease-out"
            style={{ transform: `rotate(${rotationAngle - 25}deg)` }}
          >
            <svg viewBox="0 0 600 450" className="w-full h-full drop-shadow-2xl">
              {/* Ground Bedrock and Snowdrift Shading */}
              <ellipse cx="300" cy="340" rx="260" ry="85" fill="#D8C2A8" opacity="0.6" />
              <ellipse cx="300" cy="335" rx="230" ry="70" fill="#E8D9C5" opacity="0.9" />

              {/* Station Structural Stilts (Raised to prevent blizzard burial) */}
              <g stroke="#523528" strokeWidth="6" strokeLinecap="round">
                <line x1="160" y1="280" x2="160" y2="330" />
                <line x1="220" y1="290" x2="220" y2="345" />
                <line x1="300" y1="300" x2="300" y2="360" />
                <line x1="380" y1="290" x2="380" y2="345" />
                <line x1="440" y1="280" x2="440" y2="330" />
              </g>

              {/* Aerodynamic Double Envelope Main Hull */}
              <path
                d="M 140 250 L 170 180 L 430 180 L 460 250 L 440 280 L 160 280 Z"
                fill="#FFF8ED"
                stroke="#3B261C"
                strokeWidth="3.5"
              />

              {/* Hull Aerodynamic Chamfer & Container Divisions */}
              <path
                d="M 170 180 L 300 210 L 430 180"
                fill="none"
                stroke="#B49A82"
                strokeWidth="2.5"
              />
              <path
                d="M 300 210 L 300 280"
                stroke="#B49A82"
                strokeWidth="2.5"
              />

              {/* Observation Glazing Strips (Triple pane insulated) */}
              <rect x="200" y="225" width="200" height="22" rx="4" fill="#76543F" opacity="0.85" />
              <rect x="210" y="229" width="35" height="14" rx="2" fill="#D8C2A8" />
              <rect x="255" y="229" width="35" height="14" rx="2" fill="#D8C2A8" />
              <rect x="305" y="229" width="35" height="14" rx="2" fill="#D8C2A8" />
              <rect x="350" y="229" width="35" height="14" rx="2" fill="#D8C2A8" />

              {/* Ka-Band Radome Dome on Roof */}
              <path
                d="M 280 180 A 25 25 0 0 1 330 180 Z"
                fill="#F4E9D8"
                stroke="#3B261C"
                strokeWidth="3"
              />
              <line x1="305" y1="155" x2="305" y2="135" stroke="#76543F" strokeWidth="2.5" />
              <circle cx="305" cy="132" r="3" fill="#A67C5B" />

              {/* Atmospheric Weather Mast (Left Side) */}
              <line x1="130" y1="260" x2="130" y2="130" stroke="#523528" strokeWidth="3" />
              <line x1="115" y1="145" x2="145" y2="145" stroke="#523528" strokeWidth="2" />
              <circle cx="115" cy="145" r="4" fill="#A67C5B" />
              <circle cx="145" cy="145" r="4" fill="#A67C5B" />

              {/* Helipad Platform Link (Right Side) */}
              <polygon
                points="450,290 520,310 500,340 430,320"
                fill="#E8D9C5"
                stroke="#523528"
                strokeWidth="2"
              />
              <circle cx="475" cy="315" r="14" fill="none" stroke="#76543F" strokeWidth="2" />
              <text x="471" y="320" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#76543F">H</text>

              {/* Tricolor Marking Banner */}
              <rect x="180" y="260" width="30" height="4" fill="#FF9933" />
              <rect x="180" y="264" width="30" height="4" fill="#FFFFFF" />
              <rect x="180" y="268" width="30" height="4" fill="#138808" />
            </svg>

            {/* Clickable Hotspot Pins */}
            {BHARATI_ZONES.map((zone) => {
              const isSelected = activeZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveZone(zone);
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                >
                  <div className="relative">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 transition-colors ${
                        isSelected
                          ? 'bg-amber-400 border-[#3B261C] text-[#3B261C]'
                          : 'bg-[#3B261C] border-[#FFF8ED] text-[#FFF8ED] group-hover:bg-[#523528]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                    </div>
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full bg-amber-400/50 animate-ping"></span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Hotspot Legend Bar at Bottom */}
          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2 justify-center font-mono text-[11px]">
            {BHARATI_ZONES.map((z) => (
              <button
                key={z.id}
                onClick={() => setActiveZone(z)}
                className={`px-2.5 py-1 rounded-md border transition-all ${
                  activeZone.id === z.id
                    ? 'bg-[#3B261C] text-[#FFF8ED] border-[#3B261C] font-bold shadow-xs'
                    : 'bg-[#FFF8ED]/80 text-[#523528] border-[#B49A82] hover:bg-[#FFF8ED]'
                }`}
              >
                {z.name.split(' ')[0]}
              </button>
            ))}
          </div>

        </div>

        {/* Right Detail Inspection Drawer */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-[#FFF8ED]">
          
          <div>
            <div className="flex items-center justify-between border-b border-[#D8C2A8] pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#A67C5B] font-bold">
                  {activeZone.category}
                </span>
                <h4 className="font-serif font-bold text-xl text-[#3B261C] mt-0.5">
                  {activeZone.name}
                </h4>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-[#76543F] block">Zone Climate</span>
                <span className="font-bold text-sm text-[#3B261C]">{activeZone.temp_c}°C</span>
              </div>
            </div>

            <p className="text-sm text-[#523528] leading-relaxed mb-5">
              {activeZone.description}
            </p>

            {/* Technical Engineering Specifications */}
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-bold block mb-2">
                Engineering Specifications:
              </span>
              <ul className="space-y-2 text-xs">
                {activeZone.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#F4E9D8]/60 p-2 rounded border border-[#D8C2A8]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-[#3B261C]">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Operational Status Box */}
          <div className="bg-[#F4E9D8] p-3.5 rounded-xl border border-[#B49A82] text-xs font-mono">
            <div className="flex items-center justify-between text-[#523528] mb-1">
              <span>Station Telemetry Status:</span>
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-[#76543F]">
              Direct telemetry synced with NCPOR Goa via Ka-band satellite ground terminal.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
