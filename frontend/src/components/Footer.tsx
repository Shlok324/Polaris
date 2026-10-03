import React from 'react';
import Link from 'next/link';
import { Compass, Anchor, MountainSnow, ShieldCheck, MapPin, ExternalLink, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3B261C] text-[#F4E9D8] border-t-2 border-[#523528] pt-12 pb-8 mt-20 relative overflow-hidden font-sans">
      {/* Subtle topographic background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none topo-lines"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Coordinate Reference Bar */}
        <div className="border-b border-[#523528] pb-8 mb-10">
          <div className="text-xs font-mono text-[#D8C2A8] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#A67C5B]" />
            <span>Active Scientific Observatories & Coordinates (WGS-84)</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 font-mono text-xs">
            <div className="bg-[#2E1E16] p-2.5 rounded border border-[#523528]">
              <span className="text-[#A67C5B] font-bold block">BHARATI</span>
              <span className="text-[#D8C2A8] text-[11px]">69°24&apos;28&quot;S, 76°11&apos;14&quot;E</span>
              <span className="text-[10px] text-[#B49A82] block">Larsemann Hills, Antarctica</span>
            </div>
            <div className="bg-[#2E1E16] p-2.5 rounded border border-[#523528]">
              <span className="text-[#A67C5B] font-bold block">MAITRI</span>
              <span className="text-[#D8C2A8] text-[11px]">70°45&apos;58&quot;S, 11°43&apos;50&quot;E</span>
              <span className="text-[10px] text-[#B49A82] block">Schirmacher Oasis, Antarctica</span>
            </div>
            <div className="bg-[#2E1E16] p-2.5 rounded border border-[#523528]">
              <span className="text-[#A67C5B] font-bold block">HIMADRI</span>
              <span className="text-[#D8C2A8] text-[11px]">78°55&apos;25&quot;N, 11°56&apos;20&quot;E</span>
              <span className="text-[10px] text-[#B49A82] block">Ny-Ålesund, Svalbard, Arctic</span>
            </div>
            <div className="bg-[#2E1E16] p-2.5 rounded border border-[#523528]">
              <span className="text-[#A67C5B] font-bold block">HIMANSH</span>
              <span className="text-[#D8C2A8] text-[11px]">32°25&apos;05&quot;N, 77°37&apos;07&quot;E</span>
              <span className="text-[10px] text-[#B49A82] block">Spiti, Himalayas (4,080m)</span>
            </div>
            <div className="bg-[#2E1E16] p-2.5 rounded border border-[#523528] col-span-2 md:col-span-4 lg:col-span-1">
              <span className="text-[#A67C5B] font-bold block">IndARC MOORING</span>
              <span className="text-[#D8C2A8] text-[11px]">78°59&apos;00&quot;N, 12°01&apos;00&quot;E</span>
              <span className="text-[10px] text-[#B49A82] block">Kongsfjorden (192m depth)</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Mission Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-[#A67C5B]" />
              <span className="font-serif text-2xl font-bold tracking-wide text-[#FFF8ED]">POLARIS</span>
            </div>
            <p className="text-sm text-[#D8C2A8] leading-relaxed">
              Polar Knowledge, Research, Intelligence & Outreach System.
              Unifying over four decades of India&apos;s pioneering research across Antarctica, the Arctic, the Southern Ocean, and the Himalayan Third Pole.
            </p>
            <div className="text-xs font-mono text-[#B49A82] border-t border-[#523528] pt-3">
              Smart India Hackathon 2026<br />
              <span className="text-[#FFF8ED]">Problem Statement 26063</span>
            </div>
          </div>

          {/* Scientific Repositories */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#A67C5B] font-semibold mb-4">
              Scientific Exploration
            </h4>
            <ul className="space-y-2 text-sm text-[#D8C2A8]">
              <li>
                <Link href="/explore" className="hover:text-[#FFF8ED] transition-colors">
                  Explore Polar Realms
                </Link>
              </li>
              <li>
                <Link href="/repository" className="hover:text-[#FFF8ED] transition-colors">
                  Knowledge Repository
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-[#FFF8ED] transition-colors">
                  Interactive Polar Map
                </Link>
              </li>
              <li>
                <Link href="/expeditions" className="hover:text-[#FFF8ED] transition-colors">
                  Indian Scientific Expeditions
                </Link>
              </li>
              <li>
                <Link href="/stations/stat-bharati" className="hover:text-[#FFF8ED] transition-colors">
                  Bharati Research Station
                </Link>
              </li>
              <li>
                <Link href="/stations/stat-maitri" className="hover:text-[#FFF8ED] transition-colors">
                  Maitri Research Base
                </Link>
              </li>
            </ul>
          </div>

          {/* Education & Media */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#A67C5B] font-semibold mb-4">
              Learning & Outreach
            </h4>
            <ul className="space-y-2 text-sm text-[#D8C2A8]">
              <li>
                <Link href="/learn" className="hover:text-[#FFF8ED] transition-colors">
                  Education Hub
                </Link>
              </li>
              <li>
                <Link href="/learn/life-at-antarctic-station" className="hover:text-[#FFF8ED] transition-colors">
                  Life at an Antarctic Base
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-[#FFF8ED] transition-colors">
                  Media Dissemination Studio
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-[#FFF8ED] transition-colors">
                  Research Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link href="/repository?mode=semantic" className="hover:text-[#FFF8ED] transition-colors">
                  Semantic AI Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Institutional Entities */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#A67C5B] font-semibold mb-4">
              Nodal Institutions
            </h4>
            <ul className="space-y-3 text-xs text-[#D8C2A8]">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A67C5B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#FFF8ED] block">NCPOR Goa</span>
                  National Centre for Polar and Ocean Research, MoES
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-[#A67C5B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#FFF8ED] block">Ministry of Earth Sciences</span>
                  Government of India, New Delhi
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Anchor className="w-4 h-4 text-[#A67C5B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#FFF8ED] block">Antarctic Treaty System</span>
                  Consultative Member Party since 1983
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="border-t border-[#523528] pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-[#B49A82] gap-4">
          <div>
            POLARIS PLATFORM © 2026 • BUILT FOR SMART INDIA HACKATHON
          </div>
          <div className="flex items-center gap-6">
            <span>CALIBRATED DEMO DATASET</span>
            <span>REST API v1.0</span>
            <span>FASTAPI + NEXT.JS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
