'use client';

import React from 'react';
import { 
  Database, Bookmark, BookmarkCheck, Download, 
  MapPin, Calendar, FileCode, Check 
} from 'lucide-react';
import { Dataset } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

interface DatasetCardProps {
  dataset: Dataset;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({ dataset }) => {
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(dataset.id);

  const formatColor: Record<string, string> = {
    NetCDF: 'bg-blue-100 text-blue-900 border-blue-300',
    CSV: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    GeoTIFF: 'bg-purple-100 text-purple-900 border-purple-300',
    ASCII: 'bg-amber-100 text-amber-900 border-amber-300',
  };

  return (
    <div className="journal-card rounded-xl p-5 flex flex-col justify-between relative group">
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${formatColor[dataset.format] || 'bg-stone-100 text-stone-800'}`}>
              {dataset.format}
            </span>
            <span className="font-mono text-xs text-[#76543F]">
              {dataset.file_size_mb} MB
            </span>
          </div>

          <button
            onClick={() => toggleBookmark(dataset.id)}
            className="p-1 text-[#76543F] hover:text-[#3B261C] rounded transition-colors"
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-emerald-700" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Title */}
        <h4 className="font-serif font-bold text-base text-[#3B261C] leading-snug mb-2 group-hover:text-[#523528]">
          {dataset.title}
        </h4>

        {/* Record ID & Region */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#76543F] mb-3">
          <span className="text-[#A67C5B] font-semibold">{dataset.record_id}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#B49A82]" />
            {dataset.station_name || dataset.region}
          </span>
        </div>

        {/* Temporal & Spatial Extents */}
        <div className="bg-[#F4E9D8]/70 p-2.5 rounded-lg border border-[#D8C2A8] text-xs font-mono text-[#523528] space-y-1 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[#76543F]">Temporal:</span>
            <span className="text-[#3B261C] font-medium">{dataset.temporal_coverage}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#76543F]">Spatial:</span>
            <span className="text-[#3B261C] truncate max-w-[200px]">{dataset.spatial_coverage}</span>
          </div>
        </div>

        {/* Parameters */}
        <div className="mb-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#76543F] font-bold block mb-1">
            Variables / Parameters:
          </span>
          <div className="flex flex-wrap gap-1">
            {dataset.parameters.map((p, i) => (
              <span key={i} className="text-[10px] font-mono bg-[#FFF8ED] px-1.5 py-0.5 rounded border border-[#D8C2A8] text-[#523528]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Download Action */}
      <div className="border-t border-[#D8C2A8] pt-3 flex items-center justify-between">
        <span className="font-mono text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-600" />
          Verified & Open Access
        </span>
        <button
          onClick={() => alert(`Starting download for ${dataset.record_id} (${dataset.format}, ${dataset.file_size_mb} MB)`)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] font-mono text-xs transition-colors shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>
      </div>

    </div>
  );
};
