'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Navigation, Globe, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export const HeroGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePolarView, setActivePolarView] = useState<'antarctica' | 'arctic' | 'himalayas'>('antarctica');

  // Subtle snowfall / polar dust particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        speed: Math.random() * 0.4 + 0.2,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 154, 130, ${p.opacity})`;
        ctx.fill();

        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.3;

        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center select-none font-sans">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Outer Stylized Compass Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#B49A82]/60 animate-spin-slow pointer-events-none"></div>
      <div className="absolute inset-4 rounded-full border border-[#B49A82]/40 pointer-events-none"></div>

      {/* Main Celestial / Polar Globe Disc */}
      <div className="relative w-[88%] h-[88%] rounded-full bg-[#FFF8ED] border-2 border-[#523528] shadow-2xl flex items-center justify-center overflow-hidden">
        
        {/* Topographic Lines Background */}
        <div className="absolute inset-0 topo-lines opacity-30 pointer-events-none"></div>

        {/* Dynamic Polar SVG Rendering */}
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Radial Grid Circles */}
          <circle cx="200" cy="200" r="160" fill="none" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="110" fill="none" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="60" fill="none" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="3 3" />

          {/* Graticule Crosshairs */}
          <line x1="200" y1="20" x2="200" y2="380" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="#D8C2A8" strokeWidth="1" strokeDasharray="2 4" />

          {activePolarView === 'antarctica' && (
            <g className="transition-all duration-700">
              {/* Antarctica landmass */}
              <path
                d="M 160 140 
                   C 190 120, 240 110, 280 150 
                   C 320 190, 330 250, 290 290 
                   C 250 330, 190 340, 140 300 
                   C 100 270, 90 210, 120 170 
                   C 130 150, 150 145, 160 140 Z"
                fill="#F4E9D8"
                stroke="#76543F"
                strokeWidth="2.5"
              />

              {/* Animated Voyage Route from India to Bharati */}
              <path
                d="M 200 30 Q 240 90, 275 165"
                fill="none"
                stroke="#A67C5B"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-route"
              />

              {/* Voyage Route from India to Maitri */}
              <path
                d="M 200 30 Q 170 120, 145 220"
                fill="none"
                stroke="#76543F"
                strokeWidth="2"
                strokeDasharray="5 3"
                className="animate-route"
              />

              {/* Station Markers */}
              {/* Bharati */}
              <g transform="translate(275, 165)" className="group cursor-pointer">
                <circle cx="0" cy="0" r="12" fill="rgba(166, 124, 91, 0.25)" className="animate-ping" />
                <circle cx="0" cy="0" r="6" fill="#D97706" stroke="#FFF8ED" strokeWidth="2" />
                <text x="10" y="4" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#3B261C">Bharati (69°S)</text>
              </g>

              {/* Maitri */}
              <g transform="translate(145, 220)" className="group cursor-pointer">
                <circle cx="0" cy="0" r="10" fill="rgba(118, 84, 63, 0.2)" />
                <circle cx="0" cy="0" r="5" fill="#523528" stroke="#FFF8ED" strokeWidth="2" />
                <text x="-75" y="4" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#3B261C">Maitri (70°S)</text>
              </g>

              {/* South Pole Centre Cross */}
              <g transform="translate(200, 200)">
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#76543F" strokeWidth="2" />
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#76543F" strokeWidth="2" />
                <text x="8" y="12" fontFamily="monospace" fontSize="9" fill="#76543F">SOUTH POLE 90°S</text>
              </g>
            </g>
          )}

          {activePolarView === 'arctic' && (
            <g className="transition-all duration-700">
              {/* Arctic Ocean & Svalbard Archipelago */}
              <path
                d="M 120 180 C 150 140, 260 130, 290 190 C 310 240, 260 300, 190 310 C 130 320, 100 240, 120 180 Z"
                fill="#F4E9D8"
                stroke="#76543F"
                strokeWidth="2"
              />
              {/* Svalbard / Ny-Ålesund */}
              <g transform="translate(210, 175)" className="group cursor-pointer">
                <circle cx="0" cy="0" r="12" fill="rgba(166, 124, 91, 0.3)" className="animate-ping" />
                <circle cx="0" cy="0" r="6" fill="#D97706" stroke="#FFF8ED" strokeWidth="2" />
                <text x="10" y="4" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#3B261C">Himadri & IndARC (79°N)</text>
              </g>

              {/* Route line */}
              <path
                d="M 200 370 Q 230 280, 210 175"
                fill="none"
                stroke="#A67C5B"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-route"
              />
            </g>
          )}

          {activePolarView === 'himalayas' && (
            <g className="transition-all duration-700">
              {/* Mountain ridges */}
              <path
                d="M 110 230 L 160 170 L 210 220 L 260 160 L 310 230 Z"
                fill="#F4E9D8"
                stroke="#76543F"
                strokeWidth="2.5"
              />
              <g transform="translate(210, 185)" className="group cursor-pointer">
                <circle cx="0" cy="0" r="12" fill="rgba(166, 124, 91, 0.3)" className="animate-ping" />
                <circle cx="0" cy="0" r="6" fill="#D97706" stroke="#FFF8ED" strokeWidth="2" />
                <text x="10" y="4" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#3B261C">Himansh (4080m Spiti)</text>
              </g>
            </g>
          )}
        </svg>

        {/* View Switcher Pills */}
        <div className="absolute bottom-4 inset-x-4 flex justify-center gap-1.5 z-20 font-mono text-[10px]">
          <button
            onClick={() => setActivePolarView('antarctica')}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              activePolarView === 'antarctica'
                ? 'bg-[#3B261C] text-[#FFF8ED] font-bold shadow-xs'
                : 'bg-[#FFF8ED]/90 text-[#523528] hover:bg-[#D8C2A8]'
            }`}
          >
            Antarctica (69°S)
          </button>
          <button
            onClick={() => setActivePolarView('arctic')}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              activePolarView === 'arctic'
                ? 'bg-[#3B261C] text-[#FFF8ED] font-bold shadow-xs'
                : 'bg-[#FFF8ED]/90 text-[#523528] hover:bg-[#D8C2A8]'
            }`}
          >
            Arctic (79°N)
          </button>
          <button
            onClick={() => setActivePolarView('himalayas')}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              activePolarView === 'himalayas'
                ? 'bg-[#3B261C] text-[#FFF8ED] font-bold shadow-xs'
                : 'bg-[#FFF8ED]/90 text-[#523528] hover:bg-[#D8C2A8]'
            }`}
          >
            Third Pole
          </button>
        </div>

      </div>

      {/* Floating Coordinate Metadata Badge */}
      <div className="absolute -bottom-2 -left-2 bg-[#FFF8ED] border border-[#B49A82] rounded-lg p-2 shadow-lg font-mono text-[10px] text-[#523528] z-20">
        <span className="text-[#A67C5B] font-bold block">EXPEDITION ROUTE</span>
        <span>Goa Port → Larsemann Hills</span>
      </div>
    </div>
  );
};
