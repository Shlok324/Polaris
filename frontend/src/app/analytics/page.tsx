'use client';

import React from 'react';
import { 
  BarChart2, TrendingUp, Search, Eye, Download, 
  Sparkles, Award, Globe, Database, Radio, CheckCircle 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { INITIAL_ANALYTICS } from '@/lib/data';

export default function AnalyticsPage() {
  const { summary_metrics, monthly_access_trend, regional_distribution, content_type_breakdown, top_searched_keywords, station_activity_levels } = INITIAL_ANALYTICS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#B49A82] pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold uppercase tracking-wider mb-2">
          <BarChart2 className="w-4 h-4" />
          <span>National Polar Repository Telemetry &amp; Insights</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B261C]">
              Institutional Analytics &amp; Impact
            </h1>
            <p className="text-sm sm:text-base text-[#523528] mt-2 max-w-2xl leading-relaxed">
              Real-time monitoring of repository access patterns, student learning engagement, open dataset downloads, and AI query trends across India&apos;s polar programs.
            </p>
          </div>
          <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#FFF8ED] text-[#76543F] border border-[#B49A82]">
            Sample / Demo Analytics Dataset
          </span>
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="journal-card-static rounded-xl p-5 border-l-4 border-l-[#523528]">
          <div className="flex items-center justify-between text-[#76543F] mb-1 font-mono text-xs">
            <span>REPOSITORY VIEWS</span>
            <Eye className="w-4 h-4" />
          </div>
          <span className="font-serif text-3xl font-bold text-[#3B261C]">
            {summary_metrics.total_repository_views.toLocaleString()}
          </span>
          <span className="text-[11px] font-mono text-emerald-800 block mt-1">
            +18.4% YoY Growth
          </span>
        </div>

        <div className="journal-card-static rounded-xl p-5 border-l-4 border-l-[#76543F]">
          <div className="flex items-center justify-between text-[#76543F] mb-1 font-mono text-xs">
            <span>DATASETS DOWNLOADED</span>
            <Download className="w-4 h-4" />
          </div>
          <span className="font-serif text-3xl font-bold text-[#3B261C]">
            {summary_metrics.datasets_downloaded.toLocaleString()}
          </span>
          <span className="text-[11px] font-mono text-emerald-800 block mt-1">
            Standard NetCDF / CSV / GeoTIFF
          </span>
        </div>

        <div className="journal-card-static rounded-xl p-5 border-l-4 border-l-[#A67C5B]">
          <div className="flex items-center justify-between text-[#76543F] mb-1 font-mono text-xs">
            <span>AI QUERIES ANSWERED</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <span className="font-serif text-3xl font-bold text-[#3B261C]">
            {summary_metrics.ai_queries_answered.toLocaleString()}
          </span>
          <span className="text-[11px] font-mono text-emerald-800 block mt-1">
            Polaris AI Assistant
          </span>
        </div>

        <div className="journal-card-static rounded-xl p-5 border-l-4 border-l-[#3B261C]">
          <div className="flex items-center justify-between text-[#76543F] mb-1 font-mono text-xs">
            <span>STUDENT QUIZZES PASSED</span>
            <Award className="w-4 h-4 text-amber-700" />
          </div>
          <span className="font-serif text-3xl font-bold text-[#3B261C]">
            {summary_metrics.student_lessons_completed.toLocaleString()}
          </span>
          <span className="text-[11px] font-mono text-emerald-800 block mt-1">
            Across 420+ Schools &amp; Colleges
          </span>
        </div>

      </div>

      {/* Chart Row 1: Access Trends (Area Chart) & Region Popularity (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Trend Area Chart */}
        <div className="lg:col-span-8 journal-card-static rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#D8C2A8] pb-3">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#3B261C]">
                Monthly Research Access &amp; Query Trends
              </h3>
              <p className="font-mono text-xs text-[#76543F]">
                Indexed views, dataset downloads, and conversational AI interactions
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly_access_trend}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#523528" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#523528" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A67C5B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#A67C5B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#D8C2A8" opacity={0.5} />
                <XAxis dataKey="month" stroke="#76543F" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#76543F" fontSize={11} fontFamily="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFF8ED', borderColor: '#B49A82', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="views" name="Repository Views" stroke="#523528" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="ai_queries" name="AI Queries" stroke="#A67C5B" strokeWidth={2} fillOpacity={1} fill="url(#colorAI)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Research Distribution */}
        <div className="lg:col-span-4 journal-card-static rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-[#D8C2A8] pb-3 mb-4">
              <h3 className="font-serif font-bold text-xl text-[#3B261C]">
                Regional Distribution
              </h3>
              <p className="font-mono text-xs text-[#76543F]">
                Indexed publications &amp; datasets by polar realm
              </p>
            </div>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regional_distribution}
                    dataKey="count"
                    nameKey="region"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    innerRadius={45}
                    paddingAngle={3}
                  >
                    {regional_distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFF8ED', borderColor: '#B49A82', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs border-t border-[#D8C2A8] pt-3">
            {regional_distribution.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-[#523528]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }}></span>
                  <span>{r.region}</span>
                </div>
                <strong>{r.percentage}% ({r.count})</strong>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Chart Row 2: Content Breakdown (Bar) & Top Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Content Type Breakdown */}
        <div className="lg:col-span-7 journal-card-static rounded-2xl p-6 space-y-4">
          <div className="border-b border-[#D8C2A8] pb-3">
            <h3 className="font-serif font-bold text-xl text-[#3B261C]">
              Repository Assets by Classification
            </h3>
            <p className="font-mono text-xs text-[#76543F]">
              Total volume across publications, datasets, reports, media &amp; educational modules
            </p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={content_type_breakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#D8C2A8" opacity={0.5} />
                <XAxis type="number" stroke="#76543F" fontSize={11} fontFamily="monospace" />
                <YAxis dataKey="type" type="category" stroke="#76543F" fontSize={10} width={130} fontFamily="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFF8ED', borderColor: '#B49A82', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px' }}
                />
                <Bar dataKey="count" name="Total Indexed Assets" fill="#76543F" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Searched Scientific Keywords */}
        <div className="lg:col-span-5 journal-card-static rounded-2xl p-6 space-y-4">
          <div className="border-b border-[#D8C2A8] pb-3">
            <h3 className="font-serif font-bold text-xl text-[#3B261C] flex items-center gap-2">
              <Search className="w-5 h-5 text-[#A67C5B]" />
              <span>Top Searched Scientific Terms</span>
            </h3>
            <p className="font-mono text-xs text-[#76543F]">
              Most frequent semantic and catalog queries
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {top_searched_keywords.map((kw, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#F4E9D8] border border-[#D8C2A8]">
                <div className="flex items-center gap-2 text-[#3B261C]">
                  <span className="text-[#A67C5B] font-bold">#{i + 1}</span>
                  <span className="font-semibold">&ldquo;{kw.keyword}&rdquo;</span>
                </div>
                <span className="text-[#76543F]">{kw.searches.toLocaleString()} queries</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Station Activity Levels Table */}
      <div className="journal-card-static rounded-2xl p-6 space-y-4">
        <div className="border-b border-[#D8C2A8] pb-3">
          <h3 className="font-serif font-bold text-xl text-[#3B261C]">
            Live Station Telemetry &amp; Field Project Activity
          </h3>
          <p className="font-mono text-xs text-[#76543F]">
            Continuous sensor pipeline health across national facilities
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#F4E9D8] text-[#523528] border-b border-[#D8C2A8]">
              <tr>
                <th className="p-3">STATION</th>
                <th className="p-3">ACTIVE PROJECTS</th>
                <th className="p-3">FIELD PERSONNEL</th>
                <th className="p-3">DATA STREAMS</th>
                <th className="p-3">CAMPAIGN STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C2A8] text-[#3B261C]">
              {station_activity_levels.map((st, i) => (
                <tr key={i} className="hover:bg-[#F4E9D8]/50">
                  <td className="p-3 font-serif font-bold text-sm">{st.station}</td>
                  <td className="p-3">{st.active_projects} active studies</td>
                  <td className="p-3">{st.scientists_field} deployed</td>
                  <td className="p-3">{st.data_streams} telemetry channels</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
