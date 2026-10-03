'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, Plus, Trash2, Edit3, CheckCircle, Clock, 
  FileText, Database, BookOpen, AlertCircle, Sparkles, Filter 
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { INITIAL_PUBLICATIONS, INITIAL_DATASETS } from '@/lib/data';
import { Publication, Dataset } from '@/lib/types';

export default function AdminPage() {
  const { user, setRole } = useAuth();
  
  // State for content management
  const [activeTab, setActiveTab] = useState<'publications' | 'datasets'>('publications');
  const [publicationsList, setPublicationsList] = useState<Publication[]>(INITIAL_PUBLICATIONS);
  const [datasetsList, setDatasetsList] = useState<Dataset[]>(INITIAL_DATASETS);
  
  // New Publication Modal State
  const [isNewPubModalOpen, setIsNewPubModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthors, setNewAuthors] = useState('');
  const [newRegion, setNewRegion] = useState('Antarctica');
  const [newStation, setNewStation] = useState('Bharati');
  const [newDomain, setNewDomain] = useState('Atmospheric Sciences');
  const [newAbstract, setNewAbstract] = useState('');
  const [newStatus, setNewStatus] = useState('Published');
  const [successMsg, setSuccessMsg] = useState('');

  // Delete handler
  const handleDeletePub = (id: string) => {
    setPublicationsList(prev => prev.filter(p => p.id !== id));
    setSuccessMsg('Publication deleted from repository.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Create new publication handler
  const handleCreatePub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRecordId = `POLARIS-PUB-2026-${String(publicationsList.length + 1).padStart(3, '0')}`;
    const newPub: Publication = {
      id: `pub-${Date.now()}`,
      title: newTitle,
      authors: newAuthors.split(',').map(a => a.trim()) || ["Dr. Polaris Scientist"],
      year: 2026,
      publication_date: new Date().toISOString().split('T')[0],
      journal: "Indian Journal of Polar & Cryospheric Sciences",
      doi: `10.1029/polaris.${Date.now()}`,
      record_id: newRecordId,
      region: newRegion,
      station_name: newStation,
      domain_name: newDomain,
      abstract: newAbstract || "Observational evaluation conducted during recent national expedition campaign.",
      simplified_school: "Indian polar researchers collected vital seasonal data to safeguard our future environment.",
      simplified_college: "In-situ field investigations evaluate cryospheric dynamics under changing planetary temperature regimes.",
      executive_summary: "Expedition field research successfully logged and validated against global calibration benchmarks.",
      keywords: ["polar", "research", "new"],
      download_url: `/api/publications/download/${newRecordId}.pdf`,
      citations_count: 0,
      view_count: 1,
      status: newStatus
    };

    setPublicationsList(prev => [newPub, ...prev]);
    setIsNewPubModalOpen(false);
    setNewTitle('');
    setNewAuthors('');
    setNewAbstract('');
    setSuccessMsg(`Publication ${newRecordId} created and published successfully!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#B49A82] pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-red-800 font-bold uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4" />
          <span>Content Management System &amp; Institutional Governance</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B261C]">
              Polaris Admin CMS
            </h1>
            <p className="text-sm sm:text-base text-[#523528] mt-2 max-w-2xl leading-relaxed">
              Curate, review, index, and publish research papers, environmental datasets, expedition archives, and outreach content across NCPOR and MoES channels.
            </p>
          </div>

          {/* Role Check Banner */}
          {user.role !== 'admin' && (
            <div className="bg-amber-100 border border-amber-300 p-3 rounded-xl flex items-center gap-3 text-xs font-mono text-amber-900">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
              <span>You are viewing as <strong>{user.role}</strong>.</span>
              <button
                onClick={() => setRole('admin')}
                className="px-2.5 py-1 bg-[#3B261C] hover:bg-[#523528] text-white rounded font-bold transition-colors"
              >
                Switch to Admin Role
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success alert */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-400 text-emerald-900 font-mono text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-700" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main CMS Workspace */}
      <div className="space-y-6">
        
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('publications')}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                activeTab === 'publications'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-bold shadow-xs'
                  : 'bg-[#FFF8ED] text-[#523528] border border-[#B49A82] hover:bg-[#F4E9D8]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Publications ({publicationsList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('datasets')}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                activeTab === 'datasets'
                  ? 'bg-[#3B261C] text-[#FFF8ED] font-bold shadow-xs'
                  : 'bg-[#FFF8ED] text-[#523528] border border-[#B49A82] hover:bg-[#F4E9D8]'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Datasets ({datasetsList.length})</span>
            </button>
          </div>

          {/* New Item Action Button */}
          <button
            onClick={() => setIsNewPubModalOpen(true)}
            className="px-4 py-2 bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Scientific Record</span>
          </button>
        </div>

        {/* Content Table */}
        <div className="journal-card-static rounded-2xl overflow-hidden border border-[#B49A82]">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#F4E9D8] text-[#523528] border-b border-[#D8C2A8]">
                <tr>
                  <th className="p-3">RECORD ID</th>
                  <th className="p-3">TITLE &amp; DOMAIN</th>
                  <th className="p-3">REGION / STATION</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8C2A8] text-[#3B261C]">
                {activeTab === 'publications' ? (
                  publicationsList.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F4E9D8]/50 transition-colors">
                      <td className="p-3 font-bold text-[#A67C5B] whitespace-nowrap">
                        {p.record_id}
                      </td>
                      <td className="p-3 max-w-md">
                        <div className="font-serif font-bold text-sm text-[#3B261C] line-clamp-1">
                          {p.title}
                        </div>
                        <span className="text-[11px] text-[#76543F]">
                          {p.domain_name} • {p.year}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap text-xs text-[#523528]">
                        {p.station_name || p.region}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          p.status === 'Published'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => alert(`Editing record ${p.record_id}`)}
                          className="p-1.5 hover:bg-[#D8C2A8] rounded text-[#523528] transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePub(p.id)}
                          className="p-1.5 hover:bg-red-100 rounded text-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  datasetsList.map((d) => (
                    <tr key={d.id} className="hover:bg-[#F4E9D8]/50 transition-colors">
                      <td className="p-3 font-bold text-[#A67C5B] whitespace-nowrap">
                        {d.record_id}
                      </td>
                      <td className="p-3 max-w-md">
                        <div className="font-serif font-bold text-sm text-[#3B261C] line-clamp-1">
                          {d.title}
                        </div>
                        <span className="text-[11px] text-[#76543F]">
                          Format: {d.format} • {d.file_size_mb} MB
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap text-xs text-[#523528]">
                        {d.station_name || d.region}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {d.status}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <span className="text-[11px] text-[#76543F]">Active</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* New Publication Modal Form */}
      {isNewPubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B261C]/60 backdrop-blur-xs font-sans">
          <div className="bg-[#FFF8ED] border-2 border-[#B49A82] rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[#D8C2A8] pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#A67C5B]" />
                <h3 className="font-serif font-bold text-xl text-[#3B261C]">
                  Add New Scientific Publication
                </h3>
              </div>
              <button
                onClick={() => setIsNewPubModalOpen(false)}
                className="text-[#76543F] hover:text-[#3B261C]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePub} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[#76543F] mb-1 font-bold">Paper Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Seasonal Ozone Flux Over Schirmacher Oasis..."
                  className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-lg p-2.5 text-[#3B261C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#76543F] mb-1 font-bold">Authors (comma-separated)</label>
                <input
                  type="text"
                  value={newAuthors}
                  onChange={(e) => setNewAuthors(e.target.value)}
                  placeholder="Dr. Rajesh Rao, Dr. Sunita Menon"
                  className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-lg p-2.5 text-[#3B261C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#76543F] mb-1 font-bold">Region</label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-lg p-2 text-[#3B261C]"
                  >
                    <option value="Antarctica">Antarctica</option>
                    <option value="Arctic">Arctic</option>
                    <option value="Himalayas / Third Pole">Himalayas / Third Pole</option>
                    <option value="Southern Ocean">Southern Ocean</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#76543F] mb-1 font-bold">Station / Base</label>
                  <select
                    value={newStation}
                    onChange={(e) => setNewStation(e.target.value)}
                    className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-lg p-2 text-[#3B261C]"
                  >
                    <option value="Bharati">Bharati</option>
                    <option value="Maitri">Maitri</option>
                    <option value="Himadri">Himadri</option>
                    <option value="Himansh">Himansh</option>
                    <option value="IndARC">IndARC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#76543F] mb-1 font-bold">Scientific Abstract</label>
                <textarea
                  rows={3}
                  value={newAbstract}
                  onChange={(e) => setNewAbstract(e.target.value)}
                  placeholder="Summary of research methodology and findings..."
                  className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-lg p-2.5 text-[#3B261C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#76543F] mb-1 font-bold">Domain</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-lg p-2 text-[#3B261C]"
                  >
                    <option value="Atmospheric Sciences">Atmospheric Sciences</option>
                    <option value="Glaciology">Glaciology</option>
                    <option value="Oceanography">Oceanography</option>
                    <option value="Polar Biology">Polar Biology</option>
                    <option value="Geology">Geology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#76543F] mb-1 font-bold">Workflow Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#F4E9D8] border border-[#D8C2A8] rounded-lg p-2 text-[#3B261C]"
                  >
                    <option value="Published">Published</option>
                    <option value="Review">In Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D8C2A8] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewPubModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#F4E9D8] hover:bg-[#D8C2A8] text-[#523528] font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#3B261C] hover:bg-[#523528] text-white font-bold transition-colors"
                >
                  Create &amp; Index Record
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
