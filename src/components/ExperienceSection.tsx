import React, { useState } from 'react';
import { experiencesData } from '../data/experiences';
import { Briefcase, MapPin, Calendar, ArrowRight, CheckCircle2, Zap, Award } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(experiencesData[0].id);

  const selectedExp = experiencesData.find((e) => e.id === selectedExpId) || experiencesData[0];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-stone-200/80 dark:border-stone-800/80">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Real-World Evolution</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Career & Skill Timeline
        </h2>
        <p className="mt-3 text-base text-stone-600 dark:text-stone-400 max-w-2xl font-sans-ui">
          Bukan deretan titel tanpa makna. Sebuah rekam jejak tentang apa yang dikerjakan di lapangan, keterampilan apa yang ditempa, dan bagaimana pengalaman itu mengubah cara berpikir.
        </p>
      </div>

      {/* Two-Column Responsive Layout: Left Timeline Navigation, Right Detailed Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Timeline selector list */}
        <div className="lg:col-span-5 space-y-3">
          {experiencesData.map((item) => {
            const isSelected = item.id === selectedExpId;
            return (
              <button
                key={item.id}
                id={`exp-tab-${item.id}`}
                onClick={() => setSelectedExpId(item.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 border-stone-900 dark:border-stone-100 shadow-md scale-[1.01]'
                    : 'bg-stone-50/70 dark:bg-stone-900/40 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800 hover:border-amber-500/50 hover:bg-stone-100 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono-tag mb-1.5 opacity-80">
                  <span>{item.period}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>

                <h3 className="font-editorial text-lg font-bold leading-snug mb-1">
                  {item.role}
                </h3>

                <div className="text-xs font-mono-tag opacity-75">
                  {item.organization}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Experience Breakdown */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-stone-50/90 dark:bg-[#12100e] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          {/* Header */}
          <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tag text-amber-700 dark:text-amber-400 font-semibold mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                {selectedExp.period}
              </span>
              <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {selectedExp.location}
              </span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-1">
              {selectedExp.role}
            </h3>
            <div className="text-sm font-mono-tag text-stone-600 dark:text-stone-400">
              {selectedExp.organization}
            </div>

            <p className="mt-4 text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans-ui">
              {selectedExp.summary}
            </p>
          </div>

          {/* What I Did */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>What I Did (Eksekusi Nyata)</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
              {selectedExp.whatIDid.map((act, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What I Learned */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>What I Learned (Keterampilan yang Ditempa)</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
              {selectedExp.whatILearned.map((lrn, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">→</span>
                  <span>{lrn}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Changed */}
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-stone-900 dark:text-stone-100">
            <div className="text-[11px] font-mono-tag font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
              What Changed Because of This Experience:
            </div>
            <p className="font-editorial text-sm sm:text-base italic leading-relaxed text-stone-900 dark:text-stone-100">
              "{selectedExp.whatChanged}"
            </p>
          </div>

          {/* Key Competencies Badges */}
          <div>
            <div className="text-[11px] font-mono-tag font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Core Competencies:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedExp.keyCompetencies.map((comp) => (
                <span
                  key={comp}
                  className="px-2.5 py-1 rounded-lg bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono-tag"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
