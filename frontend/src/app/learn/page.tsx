'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, School, BookOpen, Award, CheckCircle, 
  Clock, ArrowRight, Lightbulb, Sparkles, HelpCircle 
} from 'lucide-react';
import { INITIAL_MODULES } from '@/lib/data';
import { useAuth } from '@/lib/auth-context';

export default function LearnPage() {
  const { user } = useAuth();
  const [selectedAudience, setSelectedAudience] = useState<string>('All');

  const filteredModules = INITIAL_MODULES.filter(m => {
    if (selectedAudience === 'All') return true;
    return m.target_audience.toLowerCase().includes(selectedAudience.toLowerCase());
  });

  const didYouKnowFacts = [
    {
      title: "Antarctica is Earth's Driest Desert",
      desc: "Despite holding 70% of Earth's freshwater frozen in ice, Antarctica gets less precipitation per year than the Sahara Desert!"
    },
    {
      title: "Connecting Svalbard to Indian Monsoons",
      desc: "Warming in the Arctic alters the northern jet stream waves, which directly changes the timing and intensity of rainfall across India."
    },
    {
      title: "Third Pole Water Towers",
      desc: "The Himalayan glaciers feed 10 major river basins supporting over 1.9 billion people across the Asian continent."
    },
    {
      title: "Subsurface IndARC Mooring",
      desc: "India's IndARC observatory sits 192 meters underwater in Kongsfjorden, recording data all winter even under thick floating sea ice."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-14">
      
      {/* Page Header with Gamification Bar */}
      <div className="border-b border-[#B49A82] pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold uppercase tracking-wider mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>Interactive Student &amp; Public Learning Hub</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B261C]">
              Polaris Education Academy
            </h1>
            <p className="text-sm sm:text-base text-[#523528] mt-2 max-w-2xl leading-relaxed">
              Engaging, curriculum-aligned lessons on polar science, survival at research stations, glacier hydrology, and interactive quizzes rewarding certified knowledge badges.
            </p>
          </div>

          {/* Gamification Tracker Box */}
          <div className="bg-[#FFF8ED] p-4 rounded-xl border border-[#B49A82] shadow-xs flex items-center gap-4 font-mono">
            <div className="w-12 h-12 rounded-xl bg-[#3B261C] flex items-center justify-center text-amber-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#76543F] font-bold block">YOUR KNOWLEDGE XP</span>
              <span className="text-xl font-bold text-[#3B261C]">{user.knowledge_points} XP</span>
              <span className="text-[11px] text-[#A67C5B] block">{user.badges.length} Badges Earned</span>
            </div>
          </div>
        </div>

        {/* Audience Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 font-mono text-xs">
          {(['All', 'School', 'College', 'General Public'] as const).map(aud => (
            <button
              key={aud}
              onClick={() => setSelectedAudience(aud)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                selectedAudience === aud
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-bold shadow-xs'
                  : 'bg-[#FFF8ED] text-[#523528] border border-[#B49A82] hover:bg-[#F4E9D8]'
              }`}
            >
              {aud}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Interactive Lesson Modules */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-[#3B261C]">
            Interactive Polar Science Lessons ({filteredModules.length})
          </h2>
          <span className="font-mono text-xs text-[#76543F]">
            Includes Interactive Quiz with Scoring
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((mod) => (
            <div key={mod.id} className="journal-card rounded-2xl overflow-hidden flex flex-col justify-between group">
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-[#3B261C]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mod.thumbnail_url}
                    alt={mod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-[#3B261C]/85 text-[#FFF8ED] font-mono text-[10px] px-2 py-0.5 rounded border border-[#76543F]">
                    {mod.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-400 text-[#3B261C] font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                    +{mod.points_reward} XP
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#76543F]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {mod.reading_time_mins} mins
                    </span>
                    <span>•</span>
                    <span>{mod.quiz.length} Questions</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#3B261C] group-hover:text-[#523528] leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-[#523528] leading-relaxed line-clamp-3">
                    {mod.summary}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <Link
                  href={`/learn/${mod.slug}`}
                  className="w-full py-2.5 bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span>Start Interactive Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Did You Know? Polar Facts Carousel / Grid */}
      <div className="journal-card-static rounded-2xl p-6 sm:p-8 bg-[#F4E9D8]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold uppercase tracking-wider mb-2">
          <Lightbulb className="w-4 h-4 text-amber-700" />
          <span>Curated Polar Trivia &amp; Scientific Curiosities</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#3B261C] mb-6">
          Did You Know? Polar Science Facts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {didYouKnowFacts.map((fact, idx) => (
            <div key={idx} className="bg-[#FFF8ED] p-4 rounded-xl border border-[#D8C2A8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#A67C5B] block mb-1">
                  FACT #{idx + 1}
                </span>
                <h4 className="font-serif font-bold text-base text-[#3B261C] mb-2 leading-snug">
                  {fact.title}
                </h4>
                <p className="text-xs text-[#523528] leading-relaxed">
                  {fact.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
