import React, { useState, useMemo } from 'react';
import { opinionsData } from '../data/writings';
import { Opinion, OpinionCategory } from '../types';
import { Feather, Clock, ArrowUpRight, Lightbulb, Tag } from 'lucide-react';

interface WritingsSectionProps {
  onSelectOpinion: (opinion: Opinion) => void;
}

const categories: OpinionCategory[] = [
  'ALL',
  'ESSAYS',
  'OPINIONS',
  'PERSONAL NOTES',
  'COPYWRITING',
  'IDEAS'
];

export const WritingsSection: React.FC<WritingsSectionProps> = ({ onSelectOpinion }) => {
  const [selectedCategory, setSelectedCategory] = useState<OpinionCategory>('ALL');

  const filteredOpinions = useMemo(() => {
    if (selectedCategory === 'ALL') return opinionsData;
    return opinionsData.filter((op) => op.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="writings" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-stone-200/80 dark:border-stone-800/80">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold mb-2">
          <Feather className="w-3.5 h-3.5" />
          <span>Unfiltered Thoughts & Perspectives</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Writings & Opinions
            </h2>
            <p className="mt-3 text-base text-stone-600 dark:text-stone-400 max-w-2xl font-sans-ui">
              Ruang khusus untuk esai, catatan copywriting, dan sudut pandang pribadi Ray mengenai manusia, pekerjaan, uang, komunikasi, dan kecerdasan buatan.
            </p>
          </div>

          <div className="text-xs font-mono-tag px-3 py-1.5 rounded-lg bg-stone-200/50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-400 border border-stone-300/40 dark:border-stone-700/40 max-w-xs">
            <span className="font-bold text-stone-800 dark:text-stone-200">Ray's Lens:</span> Opini personal, bukan kompilasi cerita netral.
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-opinion-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-tag whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold shadow-xs'
                : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Writings List */}
      <div className="space-y-6">
        {filteredOpinions.map((op) => (
          <article
            key={op.id}
            id={`opinion-item-${op.id}`}
            onClick={() => onSelectOpinion(op)}
            className="group p-6 sm:p-7 rounded-2xl bg-stone-50/70 dark:bg-stone-900/30 border border-stone-200/80 dark:border-stone-800/80 hover:border-amber-500/50 hover:bg-stone-50 dark:hover:bg-stone-900/70 transition-all duration-200 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono-tag text-stone-500 dark:text-stone-400">
                  <span className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-[11px]">
                    {op.category}
                  </span>
                  <span>•</span>
                  <span>{op.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {op.readingTime}
                  </span>
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {op.title}
                </h3>

                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {op.summary}
                </p>

                {/* Core Perspective Box */}
                <div className="pt-2">
                  <div className="inline-flex items-start gap-2 p-3 rounded-xl bg-amber-500/8 dark:bg-amber-500/12 border border-amber-500/20 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-800 dark:text-amber-300 font-mono-tag text-[11px] block uppercase">
                        Ray's Perspective:
                      </span>
                      <span className="italic">"{op.corePerspective}"</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex sm:flex-col items-end justify-between pt-2 sm:pt-0">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono-tag rounded-full bg-stone-200/60 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors font-medium">
                  <span>Baca Opini</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
