'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, Search, Sparkles, BookOpen, User, Shield, 
  GraduationCap, Layers, Globe, Database, Radio, 
  BarChart2, Share2, Menu, X, BookmarkCheck, Award
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, setRole, setIsAIModalOpen, isBookmarked } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/repository', label: 'Repository' },
    { href: '/map', label: 'Polar Map' },
    { href: '/expeditions', label: 'Expeditions' },
    { href: '/learn', label: 'Learn' },
    { href: '/media', label: 'Media' },
    { href: '/analytics', label: 'Analytics' },
  ];

  const roleColors: Record<string, string> = {
    public: 'bg-[#D8C2A8]/40 text-[#523528]',
    student: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    researcher: 'bg-amber-100 text-amber-900 border-amber-300',
    educator: 'bg-purple-100 text-purple-900 border-purple-300',
    admin: 'bg-red-100 text-red-900 border-red-300',
  };

  return (
    <>
      {/* Topmost Official Sub-Header / Demo Data Indicator */}
      <div className="bg-[#3B261C] text-[#F4E9D8] px-4 py-1 text-xs font-mono flex flex-wrap justify-between items-center border-b border-[#523528]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            GOVERNMENT OF INDIA • MINISTRY OF EARTH SCIENCES (MoES) & NCPOR
          </span>
          <span className="hidden md:inline text-[#B49A82]">|</span>
          <span className="hidden md:inline text-[#D8C2A8]">SIH 2026 Problem Statement 26063</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden sm:inline text-[#D8C2A8]">LAT 69°24&apos;S / 78°55&apos;N</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#523528]/80 text-[#FFF8ED] border border-[#76543F]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="font-semibold">DEMO MODE ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-[#FFF8ED]/95 backdrop-blur-md border-b border-[#B49A82] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-lg bg-[#3B261C] flex items-center justify-center text-[#F4E9D8] shadow-md group-hover:bg-[#523528] transition-colors border border-[#76543F]">
                <Compass className="w-6 h-6 text-[#D8C2A8] group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#3B261C] leading-none">
                  POLARIS
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#76543F] mt-1 font-semibold">
                  POLAR RESEARCH & KNOWLEDGE SYSTEM
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all ${
                      isActive
                        ? 'text-[#3B261C] bg-[#D8C2A8]/50 font-semibold shadow-xs'
                        : 'text-[#523528] hover:text-[#3B261C] hover:bg-[#F4E9D8]/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* Admin Link if role is admin */}
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-all flex items-center gap-1.5 ${
                    pathname.startsWith('/admin')
                      ? 'bg-[#3B261C] text-[#FFF8ED]'
                      : 'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin CMS
                </Link>
              )}
            </div>

            {/* Right Action Icons: Search, AI Assistant, User/Role */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search button */}
              <Link
                href="/repository?mode=search"
                className="p-2 text-[#523528] hover:text-[#3B261C] hover:bg-[#F4E9D8] rounded-full transition-colors"
                title="Global Search"
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* AI Assistant Button */}
              <button
                onClick={() => setIsAIModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-[#523528] hover:bg-[#3B261C] text-[#FFF8ED] rounded-lg text-xs font-medium shadow-sm transition-all border border-[#76543F]"
                title="Open POLARIS AI"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="hidden sm:inline font-mono">POLARIS AI</span>
              </button>

              {/* Role Switcher & User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#B49A82] bg-[#FFF8ED] hover:bg-[#F4E9D8] transition-colors text-xs font-mono"
                >
                  <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                  <span className="hidden md:inline font-sans text-xs text-[#3B261C] max-w-[100px] truncate">
                    {user.full_name.split(' ')[0]}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </button>

                {/* Dropdown Menu */}
                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#FFF8ED] border border-[#B49A82] rounded-xl shadow-xl z-50 p-3 font-sans">
                    <div className="border-b border-[#D8C2A8] pb-2.5 mb-2.5">
                      <p className="text-xs font-mono text-[#76543F] uppercase tracking-wider">Active User Profile</p>
                      <p className="font-serif font-bold text-[#3B261C] text-sm mt-0.5">{user.full_name}</p>
                      <p className="text-[11px] text-[#523528] truncate mt-0.5">{user.institution}</p>
                      
                      {/* Gamification summary */}
                      <div className="mt-2 flex items-center justify-between text-xs bg-[#F4E9D8]/70 p-2 rounded-lg font-mono">
                        <span className="flex items-center gap-1 text-[#523528]">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span>{user.knowledge_points} XP</span>
                        </span>
                        <span className="flex items-center gap-1 text-[#523528]">
                          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{user.bookmarked_ids.length} Saved</span>
                        </span>
                      </div>
                    </div>

                    {/* Role Switcher for Hackathon Jury Demo */}
                    <p className="text-[11px] font-mono uppercase text-[#76543F] font-semibold mb-1.5">
                      Demo Role Switcher:
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {(['public', 'student', 'researcher', 'educator', 'admin'] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            setRole(r);
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`px-2 py-1.5 rounded text-left capitalize font-mono text-[11px] flex items-center justify-between transition-colors ${
                            user.role === r
                              ? 'bg-[#3B261C] text-[#FFF8ED] font-bold'
                              : 'bg-[#F4E9D8] text-[#523528] hover:bg-[#D8C2A8]'
                          }`}
                        >
                          <span>{r}</span>
                          {user.role === r && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                        </button>
                      ))}
                    </div>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsRoleDropdownOpen(false)}
                        className="mt-3 block w-full text-center py-1.5 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-mono font-medium transition-colors"
                      >
                        Open Admin Dashboard →
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#523528] hover:text-[#3B261C] hover:bg-[#F4E9D8] rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#B49A82] bg-[#FFF8ED] px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#523528] hover:bg-[#F4E9D8] hover:text-[#3B261C]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-red-800 bg-red-50 hover:bg-red-100"
            >
              Admin Dashboard
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};
