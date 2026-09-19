import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { ArrowRight, BookOpen, Layers, RefreshCw, MessageCircle, Instagram, Mail, Sparkles, User } from 'lucide-react';

interface HeroProps {
  onExploreStories: () => void;
  onSeeWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreStories, onSeeWork }) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const rotateHeadline = () => {
    setHeadlineIndex((prev) => (prev + 1) % profileData.headlineOptions.length);
  };

  const currentHeadline = profileData.headlineOptions[headlineIndex];

  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Top subtle status pill */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-tag bg-purple-500/10 dark:bg-purple-400/15 text-purple-700 dark:text-purple-300 border border-purple-300/60 dark:border-purple-700/60">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{profileData.statusNote}</span>
        </div>
        <div className="text-xs text-stone-500 dark:text-stone-400 font-mono-tag hidden sm:inline">
          📍 {profileData.location}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Headlines, Bio, CTAs */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono-tag bg-amber-500/15 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Personal Hub & Creative Archive</span>
          </div>

          {/* Main Headline */}
          <div className="relative mb-6">
            <h1
              id="hero-headline"
              className="font-editorial text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.15] transition-all duration-300"
            >
              "{currentHeadline}"
            </h1>

            {/* Headline selector button */}
            <div className="mt-4 flex items-center gap-2">
              <button
                id="rotate-headline-btn"
                onClick={rotateHeadline}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-purple-600 dark:text-stone-400 dark:hover:text-purple-400 font-mono-tag transition-colors cursor-pointer py-1 px-2.5 rounded-md hover:bg-purple-100/50 dark:hover:bg-purple-950/40 border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
                title="Ganti sudut pandang headline"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Ganti sudut pandang ({headlineIndex + 1}/{profileData.headlineOptions.length})</span>
              </button>
            </div>
          </div>

          {/* Bio Description - Casual tone */}
          <p
            id="hero-bio"
            className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed mb-8 font-sans-ui font-normal"
          >
            {profileData.bioShort}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <button
              id="hero-cta-stories"
              onClick={onExploreStories}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white text-sm font-semibold transition-all transform active:scale-95 shadow-md shadow-purple-500/20 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Baca Cerita Gue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-work"
              onClick={onSeeWork}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-stone-200/90 hover:bg-stone-300 dark:bg-stone-800/90 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-sm font-semibold transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Tentang Ray</span>
            </button>
          </div>

          {/* Quick Contact Links (ONLY WhatsApp, Instagram, Email) */}
          <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
            <span className="text-xs font-mono-tag text-stone-500 dark:text-stone-400 block mb-3 uppercase tracking-wider font-semibold">
              Kanal Obrolan Langsung:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={profileData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold font-mono-tag bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp (+855 886 772 979)</span>
              </a>

              <a
                href={profileData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold font-mono-tag bg-pink-500/10 hover:bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-500/30 transition-all hover:scale-[1.02]"
              >
                <Instagram className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                <span>@brainbreak19</span>
              </a>

              <a
                href={`mailto:${profileData.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold font-mono-tag bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 transition-all hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{profileData.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Ray's Photo Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Glowing Backdrop Accents */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 rounded-3xl blur-md opacity-35 dark:opacity-40 -z-10 group-hover:opacity-60 transition duration-500"></div>

            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900 border-2 border-purple-500/40 shadow-2xl">
              <img
                src={imageError ? '/ray-photo.svg' : '/ray-photo.jpg'}
                alt="Ray (Ryan Hidayat Taylor) - Built Different, Identity is Architecture"
                className="w-full aspect-[3/4] object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (!imageError) setImageError(true);
                }}
              />

              {/* Minimal Bottom Glass Badge so it doesn't obscure the sneakers */}
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-stone-950/85 backdrop-blur-md border border-white/15 p-3 text-white shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-editorial text-base sm:text-lg font-bold text-white tracking-tight leading-none mb-1">
                      Ray (Ryan Hidayat Taylor)
                    </h3>
                    <p className="text-[11px] text-purple-300 font-mono-tag">
                      Storyteller • Communicator • Builder
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono-tag text-emerald-300 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Online</span>
                  </div>
                </div>
              </div>

              {/* Top Tag */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-stone-950/75 backdrop-blur-sm border border-white/20 text-[10px] font-mono-tag text-white shadow-xs">
                Banjar, Jawa Barat
              </div>
            </div>

            {/* Bottom Caption Pill */}
            <div className="mt-3 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono-tag px-1">
              <span>"Built Different • Identity is Architecture"</span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">#LearnAdaptBuild</span>
            </div>
          </div>
        </div>
      </div>

      {/* Archive Meta Metrics - with color touches */}
      <div className="mt-14 pt-8 border-t border-stone-200/80 dark:border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-2xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-200/60 dark:border-purple-800/40">
          <div className="text-2xl font-editorial font-bold text-purple-700 dark:text-purple-300">7+</div>
          <div className="text-xs text-stone-600 dark:text-stone-400 font-mono-tag">Cerita & Arsip Sejarah</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-800/40">
          <div className="text-2xl font-editorial font-bold text-amber-700 dark:text-amber-300">9</div>
          <div className="text-xs text-stone-600 dark:text-stone-400 font-mono-tag">Eksplorasi Disiplin Ilmu</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-800/40">
          <div className="text-2xl font-editorial font-bold text-blue-700 dark:text-blue-300">6</div>
          <div className="text-xs text-stone-600 dark:text-stone-400 font-mono-tag">Proyek & Eksperimen Web</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-800/40">
          <div className="text-2xl font-editorial font-bold text-emerald-700 dark:text-emerald-300">10+ Thn</div>
          <div className="text-xs text-stone-600 dark:text-stone-400 font-mono-tag">Pengalaman Nyata Lapangan</div>
        </div>
      </div>
    </section>
  );
};

