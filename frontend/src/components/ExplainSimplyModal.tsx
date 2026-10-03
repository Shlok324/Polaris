'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, X, GraduationCap, School, BookOpen, 
  Lightbulb, Check, Copy, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { Publication } from '@/lib/types';
import { api } from '@/lib/api';

interface ExplainSimplyModalProps {
  publication: Publication | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainSimplyModal: React.FC<ExplainSimplyModalProps> = ({
  publication,
  isOpen,
  onClose
}) => {
  const [level, setLevel] = useState<'school' | 'college' | 'executive'>('school');
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && publication) {
      loadSimplification(level);
    }
  }, [isOpen, publication, level]);

  const loadSimplification = async (targetLevel: 'school' | 'college' | 'executive') => {
    if (!publication) return;
    setIsLoading(true);
    try {
      const res = await api.simplifyDocument({
        text: publication.abstract,
        target_audience: targetLevel,
        item_id: publication.id
      });
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.simplified_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !publication) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B261C]/60 backdrop-blur-xs font-sans">
      <div className="bg-[#FFF8ED] border-2 border-[#B49A82] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#3B261C] text-[#FFF8ED] p-5 flex items-center justify-between border-b border-[#523528]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#523528] text-amber-300 border border-[#76543F]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#FFF8ED]">POLARIS Knowledge Simplifier</h3>
              <p className="font-mono text-xs text-[#D8C2A8]">Converting High-Level Research Into Accessible Outreach</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#D8C2A8] hover:text-[#FFF8ED] hover:bg-[#523528] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Switcher */}
        <div className="p-4 bg-[#F4E9D8] border-b border-[#B49A82] flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-xs text-[#76543F]">
            <span className="font-semibold uppercase">Target Audience:</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setLevel('school')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                level === 'school'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-semibold shadow-xs'
                  : 'bg-[#FFF8ED] text-[#523528] hover:bg-[#D8C2A8]'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>School Student</span>
            </button>

            <button
              onClick={() => setLevel('college')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                level === 'college'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-semibold shadow-xs'
                  : 'bg-[#FFF8ED] text-[#523528] hover:bg-[#D8C2A8]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>College Student</span>
            </button>

            <button
              onClick={() => setLevel('executive')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                level === 'executive'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-semibold shadow-xs'
                  : 'bg-[#FFF8ED] text-[#523528] hover:bg-[#D8C2A8]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research Summary</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Target Title & DOI */}
          <div className="border-b border-[#D8C2A8] pb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#A67C5B] font-bold">
              Original Scientific Publication:
            </span>
            <h4 className="font-serif font-bold text-base text-[#3B261C] mt-0.5 leading-snug">
              {publication.title}
            </h4>
            <div className="flex items-center gap-3 mt-1.5 font-mono text-xs text-[#76543F]">
              <span>DOI: {publication.doi}</span>
              <span>•</span>
              <span>{publication.station_name || publication.region}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 font-mono text-xs text-[#76543F]">
              <Sparkles className="w-6 h-6 text-amber-600 animate-spin" />
              <span>Synthesizing simplified perspective for {level} level...</span>
            </div>
          ) : data ? (
            <>
              {/* Simplified Explanation Box */}
              <div className="bg-[#FFF8ED] p-4 rounded-xl border border-[#B49A82] shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    Simplified Explanation ({level.toUpperCase()} LEVEL)
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs font-mono text-[#76543F] hover:text-[#3B261C] transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
                <p className="text-sm text-[#3B261C] leading-relaxed">
                  {data.simplified_text}
                </p>
              </div>

              {/* Visual Analogy Box */}
              {data.visual_analogy && (
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                  <div className="font-mono text-xs uppercase tracking-wider text-amber-900 font-bold flex items-center gap-1.5 mb-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-700" />
                    <span>Everyday Mental Analogy:</span>
                  </div>
                  <p className="text-xs text-[#523528] italic leading-relaxed">
                    &ldquo;{data.visual_analogy}&rdquo;
                  </p>
                </div>
              )}

              {/* Key Terms */}
              {data.key_terms && data.key_terms.length > 0 && (
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-bold mb-2">
                    Key Polar Scientific Terms Explained:
                  </h5>
                  <div className="grid grid-cols-1 gap-2">
                    {data.key_terms.map((t: any, idx: number) => (
                      <div key={idx} className="bg-[#F4E9D8]/60 p-2.5 rounded-lg border border-[#D8C2A8] text-xs">
                        <span className="font-mono font-bold text-[#3B261C]">{t.term}: </span>
                        <span className="text-[#523528]">{t.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Takeaways */}
              {data.core_takeaways && data.core_takeaways.length > 0 && (
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-wider text-[#76543F] font-bold mb-2">
                    Core Takeaways:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#3B261C]">
                    {data.core_takeaways.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-[#A67C5B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : null}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4E9D8] border-t border-[#B49A82] flex justify-between items-center text-xs font-mono text-[#76543F]">
          <span>POLARIS KNOWLEDGE SIMPLIFIER</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] rounded-lg font-medium transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
