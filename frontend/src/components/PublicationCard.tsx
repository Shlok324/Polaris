'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, Bookmark, BookmarkCheck, Sparkles, 
  Download, Eye, Award, ExternalLink, Calendar, MapPin 
} from 'lucide-react';
import { Publication } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

interface PublicationCardProps {
  publication: Publication;
  onExplainSimply: (pub: Publication) => void;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
  publication,
  onExplainSimply
}) => {
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(publication.id);

  return (
    <div className="journal-card rounded-xl p-5 flex flex-col justify-between relative group">
      
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#3B261C] text-[#FFF8ED]">
              {publication.domain_name.split(' ')[0]}
            </span>
            <span className="font-mono text-[11px] text-[#76543F] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#A67C5B]" />
              {publication.station_name || publication.region}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleBookmark(publication.id)}
              className="p-1 text-[#76543F] hover:text-[#3B261C] rounded transition-colors"
              title={bookmarked ? "Remove Bookmark" : "Save Publication"}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-emerald-700" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <span className="font-mono text-xs text-[#76543F] bg-[#F4E9D8] px-2 py-0.5 rounded border border-[#D8C2A8]">
              {publication.year}
            </span>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-serif font-bold text-lg text-[#3B261C] leading-snug mb-2 group-hover:text-[#523528]">
          {publication.title}
        </h4>

        {/* Authors & Journal Source */}
        <div className="text-xs text-[#523528] mb-3">
          <span className="font-medium text-[#76543F] block truncate">
            {publication.authors.join(', ')}
          </span>
          <span className="italic font-mono text-[11px] text-[#A67C5B] mt-0.5 block">
            {publication.journal} • DOI: {publication.doi}
          </span>
        </div>

        {/* Abstract Preview */}
        <p className="text-xs text-[#3B261C]/80 line-clamp-3 leading-relaxed mb-4">
          {publication.abstract}
        </p>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {publication.keywords.slice(0, 4).map((kw, i) => (
            <span
              key={i}
              className="text-[10px] font-mono bg-[#F4E9D8] px-2 py-0.5 rounded text-[#523528] border border-[#D8C2A8]"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions & Metrics */}
      <div className="border-t border-[#D8C2A8] pt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3 text-[#76543F] text-[11px]">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {publication.view_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            {publication.citations_count} citations
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Explain Simply Button */}
          <button
            onClick={() => onExplainSimply(publication)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-medium transition-colors"
            title="Convert to student or executive explanation"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Explain Simply</span>
          </button>

          {/* Download simulation */}
          <a
            href={publication.download_url}
            onClick={(e) => {
              e.preventDefault();
              alert(`Downloading authenticated preprint for ${publication.record_id} (PDF)`);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </a>
        </div>
      </div>

    </div>
  );
};
