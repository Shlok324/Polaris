'use client';

import React, { useState } from 'react';
import { 
  Share2, Sparkles, Copy, Check, Camera, 
  Globe, Video, FileText, Image, ArrowRight, Eye, RefreshCw 
} from 'lucide-react';
import { INITIAL_PUBLICATIONS } from '@/lib/data';
import { api } from '@/lib/api';

export default function MediaStudioPage() {
  const [selectedPubId, setSelectedPubId] = useState<string>(INITIAL_PUBLICATIONS[0].id);
  const [outputType, setOutputType] = useState<string>('instagram');
  const [tone, setTone] = useState<string>('inspirational');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedPublication = INITIAL_PUBLICATIONS.find(p => p.id === selectedPubId) || INITIAL_PUBLICATIONS[0];

  const handleGenerate = async (typeToGen?: string) => {
    const targetType = typeToGen || outputType;
    setIsLoading(true);
    try {
      const res = await api.generateMedia({
        content_id: selectedPubId,
        content_title: selectedPublication.title,
        content_text: selectedPublication.abstract,
        output_type: targetType,
        tone: tone
      });
      setGeneratedContent(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate initial content on mount
  React.useEffect(() => {
    handleGenerate('instagram');
  }, [selectedPubId]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#B49A82] pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold uppercase tracking-wider mb-2">
          <Share2 className="w-4 h-4" />
          <span>Research-to-Outreach Dissemination Studio</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B261C]">
          Polaris Media Dissemination Studio
        </h1>
        <p className="text-sm sm:text-base text-[#523528] mt-2 max-w-3xl leading-relaxed">
          Convert dense scientific research reports, ice core logs, and fast-ice datasets into engaging social posts, short video scripts, infographics, and official press releases with one click.
        </p>
      </div>

      {/* Main Studio Workspace: Input Config & Output Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Config Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Select Source Publication */}
          <div className="journal-card-static rounded-2xl p-6 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#A67C5B] font-bold block">
              1. Select Source Scientific Research:
            </span>

            <div>
              <label className="text-xs font-mono text-[#76543F] block mb-1.5">
                Indexed Publications:
              </label>
              <select
                value={selectedPubId}
                onChange={(e) => setSelectedPubId(e.target.value)}
                className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-xl p-3 text-xs text-[#3B261C] font-mono focus:outline-none"
              >
                {INITIAL_PUBLICATIONS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.record_id} • {p.title.substring(0, 50)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Paper Details Preview */}
            <div className="bg-[#FFF8ED] p-3.5 rounded-xl border border-[#D8C2A8] text-xs space-y-1.5">
              <span className="font-bold text-[#3B261C] block">{selectedPublication.title}</span>
              <span className="text-[#76543F] font-mono text-[11px] block">
                {selectedPublication.station_name || selectedPublication.region} • {selectedPublication.journal}
              </span>
            </div>
          </div>

          {/* Select Target Dissemination Format */}
          <div className="journal-card-static rounded-2xl p-6 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#A67C5B] font-bold block">
              2. Select Dissemination Channel:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
              {[
                { id: 'instagram', label: 'Instagram Post / Reel', icon: Camera },
                { id: 'linkedin', label: 'LinkedIn Article', icon: Globe },
                { id: 'video_script', label: '60s Video Script', icon: Video },
                { id: 'press_summary', label: 'Press Release', icon: FileText },
              ].map(ch => {
                const IconComponent = ch.icon;
                const isSelected = outputType === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setOutputType(ch.id);
                      handleGenerate(ch.id);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? 'bg-[#3B261C] text-[#FFF8ED] border-[#3B261C] font-bold shadow-xs'
                        : 'bg-[#FFF8ED] text-[#523528] border-[#D8C2A8] hover:bg-[#F4E9D8]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{ch.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleGenerate()}
                disabled={isLoading}
                className="w-full py-3 bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-300" />
                )}
                <span>{isLoading ? 'Synthesizing Content...' : 'Generate Dissemination Asset'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Output Preview Panel */}
        <div className="lg:col-span-7">
          <div className="bg-[#FFF8ED] border-2 border-[#B49A82] rounded-2xl shadow-xl overflow-hidden">
            
            {/* Header */}
            <div className="bg-[#3B261C] text-[#FFF8ED] p-4 flex items-center justify-between border-b border-[#523528]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-mono text-xs uppercase text-[#D8C2A8]">
                  Outreach Preview • {generatedContent?.format || 'Social Post'}
                </span>
              </div>
              <button
                onClick={() => {
                  const textToCopy = generatedContent?.caption || generatedContent?.body || generatedContent?.lead_paragraph || '';
                  handleCopy(textToCopy);
                }}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#523528] hover:bg-[#76543F] text-xs font-mono rounded-lg transition-colors border border-[#76543F]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Content'}</span>
              </button>
            </div>

            {/* Generated Body View */}
            <div className="p-6 sm:p-8 space-y-6">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-2 font-mono text-xs text-[#76543F]">
                  <Sparkles className="w-6 h-6 text-amber-600 animate-spin" />
                  <span>Synthesizing outreach-ready media assets...</span>
                </div>
              ) : generatedContent ? (
                <>
                  {/* Headline */}
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#A67C5B] block mb-1">
                      Headline / Title:
                    </span>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#3B261C] leading-snug">
                      {generatedContent.headline}
                    </h3>
                  </div>

                  {/* Instagram Multi-Slide Carousel Format */}
                  {generatedContent.slides && (
                    <div className="space-y-3">
                      <span className="font-mono text-xs font-bold text-[#76543F] block">
                        Carousel Slide Deck ({generatedContent.slides.length} Slides):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {generatedContent.slides.map((s: any) => (
                          <div key={s.slide_number} className="bg-[#F4E9D8] p-4 rounded-xl border border-[#D8C2A8] text-xs space-y-2">
                            <span className="font-mono text-[10px] font-bold bg-[#3B261C] text-[#FFF8ED] px-2 py-0.5 rounded">
                              Slide {s.slide_number}
                            </span>
                            <p className="text-[11px] text-[#76543F] italic">
                              Visual: {s.visual}
                            </p>
                            <p className="text-[#3B261C] font-medium leading-relaxed">
                              {s.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Video Script Scenes Format */}
                  {generatedContent.script_scenes && (
                    <div className="space-y-3 font-mono text-xs">
                      <span className="font-bold text-[#76543F] block">
                        60-Second Video Storyboard:
                      </span>
                      <div className="space-y-2.5">
                        {generatedContent.script_scenes.map((scene: any, idx: number) => (
                          <div key={idx} className="bg-[#F4E9D8] p-3.5 rounded-xl border border-[#D8C2A8] space-y-1.5">
                            <div className="flex justify-between items-center text-[#A67C5B] font-bold">
                              <span>Scene {idx + 1} ({scene.timecode})</span>
                              <span className="text-[10px] uppercase bg-[#FFF8ED] px-2 py-0.5 rounded border border-[#D8C2A8]">
                                {scene.text_overlay}
                              </span>
                            </div>
                            <p className="text-[#76543F] text-[11px]">
                              <strong>Shot:</strong> {scene.visual_shot}
                            </p>
                            <p className="text-[#3B261C]">
                              <strong>Narration:</strong> &ldquo;{scene.audio_narration}&rdquo;
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LinkedIn / Press Body */}
                  {generatedContent.body && (
                    <div className="bg-[#F4E9D8]/60 p-4 rounded-xl border border-[#D8C2A8] text-sm text-[#3B261C] leading-relaxed whitespace-pre-line">
                      {generatedContent.body}
                    </div>
                  )}

                  {/* Press Release Details */}
                  {generatedContent.lead_paragraph && (
                    <div className="space-y-4 text-sm leading-relaxed text-[#3B261C]">
                      <div className="font-mono text-xs font-bold text-[#A67C5B]">
                        {generatedContent.dateline}
                      </div>
                      <p className="font-medium">{generatedContent.lead_paragraph}</p>
                      {generatedContent.quote && (
                        <blockquote className="p-3 border-l-4 border-[#A67C5B] bg-[#F4E9D8] italic text-xs">
                          {generatedContent.quote}
                        </blockquote>
                      )}
                      <p className="text-xs text-[#523528]">{generatedContent.public_context}</p>
                    </div>
                  )}

                  {/* Caption / Hashtags */}
                  {generatedContent.caption && (
                    <div className="bg-[#F4E9D8]/50 p-4 rounded-xl border border-[#D8C2A8] space-y-2">
                      <span className="font-mono text-xs font-bold text-[#76543F] block">
                        Social Media Caption:
                      </span>
                      <p className="text-xs text-[#3B261C] leading-relaxed whitespace-pre-line">
                        {generatedContent.caption}
                      </p>
                    </div>
                  )}

                  {/* Hashtags */}
                  {generatedContent.hashtags && (
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {generatedContent.hashtags.map((tag: string, i: number) => (
                        <span key={i} className="bg-[#FFF8ED] px-2 py-0.5 rounded border border-[#B49A82] text-amber-900">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                </>
              ) : null}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
