import React, { useState } from 'react';
import { learningsData } from '../data/learnings';
import { LearningItem, LearningStatus } from '../types';
import { Compass, BookOpen, CheckCircle2, Flame, Layers, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const statuses: (LearningStatus | 'All')[] = [
  'All',
  'Deep Dive',
  'Applied',
  'Practicing',
  'Learning',
  'Exploring'
];

const getStatusBadgeStyle = (status: LearningStatus) => {
  switch (status) {
    case 'Deep Dive':
      return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30';
    case 'Applied':
      return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
    case 'Practicing':
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
    case 'Learning':
      return 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30';
    case 'Exploring':
      return 'bg-stone-500/15 text-stone-700 dark:text-stone-300 border-stone-500/30';
  }
};

export const LearningMapSection: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<LearningStatus | 'All'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(learningsData[0]?.id || null);

  const filteredLearnings = activeStatus === 'All'
    ? learningsData
    : learningsData.filter((item) => item.status === activeStatus);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="learning" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-stone-200/80 dark:border-stone-800/80">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-purple-700 dark:text-purple-400 font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>Peta Belajar & Eksplorasi</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Hal-Hal yang Lagi Gue Pelajari
        </h2>
        <p className="mt-3 text-base text-stone-600 dark:text-stone-400 max-w-2xl font-sans-ui">
          Bukan daftar sertifikat pajangan atau skill-bar 99% yang nggak masuk akal. Ini peta jujur mengenai topik yang lagi gue ulik, buku yang dibaca, dan eksperimen yang lagi dicoba.
        </p>
      </div>

      {/* Honest Status Philosophy Card */}
      <div className="p-4 sm:p-5 mb-8 rounded-2xl bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tag">
        <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Status Sistem Pengetahuan (Non-Linear):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded-md border text-[11px] bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30">
            Deep Dive = Obsesi inti & filosofi harian
          </span>
          <span className="px-2 py-0.5 rounded-md border text-[11px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
            Applied = Digunakan di proyek / kerja nyata
          </span>
          <span className="px-2 py-0.5 rounded-md border text-[11px] bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30">
            Practicing = Latihan & eksperimen berkala
          </span>
          <span className="px-2 py-0.5 rounded-md border text-[11px] bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30">
            Learning = Mengkaji literatur & fondasi
          </span>
          <span className="px-2 py-0.5 rounded-md border text-[11px] bg-stone-500/10 text-stone-700 dark:text-stone-300 border-stone-500/30">
            Exploring = Mengamati & membaca awal
          </span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {statuses.map((st) => (
          <button
            key={st}
            id={`filter-learning-${st.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setActiveStatus(st)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-tag whitespace-nowrap transition-all cursor-pointer ${
              activeStatus === st
                ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold shadow-xs'
                : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Learning Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLearnings.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              id={`learning-card-${item.id}`}
              className="p-6 rounded-2xl bg-stone-50/70 dark:bg-stone-900/30 border border-stone-200 dark:border-stone-800 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono-tag text-stone-500 dark:text-stone-400">
                    {item.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[11px] font-mono-tag font-semibold rounded-full border ${getStatusBadgeStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  {item.subject}
                </h3>

                <p className="text-xs text-stone-500 dark:text-stone-400 font-mono-tag italic mb-3">
                  {item.statusDescription}
                </p>

                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  {item.whatILearned}
                </p>
              </div>

              {/* Accordion Toggle for Deep Details */}
              <div className="pt-3 border-t border-stone-200/70 dark:border-stone-800/70">
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full flex items-center justify-between text-xs font-mono-tag text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 py-1 transition-colors cursor-pointer"
                >
                  <span className="font-semibold">
                    {isExpanded ? 'Tutup Catatan & Sumber' : 'Lihat Buku, Insight & Eksperimen'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800 space-y-4 animate-in fade-in duration-150">
                    {/* Books & Sources */}
                    <div>
                      <div className="text-[11px] font-mono-tag uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold mb-1.5 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>Buku & Referensi Studi</span>
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                        {item.booksAndSources.map((book, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-500">•</span>
                            <span>{book}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Insights */}
                    <div>
                      <div className="text-[11px] font-mono-tag uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Catatan & Insight Personal</span>
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                        {item.notesAndInsights.map((note, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500">→</span>
                            <span className="italic font-editorial text-sm leading-snug">"{note}"</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects */}
                    {item.currentProjects.length > 0 && (
                      <div>
                        <div className="text-[11px] font-mono-tag uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold mb-1.5 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          <span>Penerapan / Eksperimen Terkait</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.currentProjects.map((proj, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[11px] font-mono-tag"
                            >
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-[10px] text-stone-400 dark:text-stone-500 font-mono-tag text-right">
                      Terakhir diperbarui: {item.lastUpdated}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
