import React from 'react';
import { profileData } from '../data/profile';
import { Feather, MessageSquare, TrendingUp, Box, ArrowRight, Sparkles, MessageCircle, Instagram, Mail, FileText, Download } from 'lucide-react';

interface AboutSectionProps {
  onExploreStories?: () => void;
  onOpenCv?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreStories, onOpenCv }) => {
  const pillars = [
    {
      icon: Feather,
      title: 'Storyteller',
      desc: 'Mengubah hal kompleks jadi cerita yang mudah dipahami.',
      color: 'text-purple-400',
      border: 'hover:border-purple-500/40'
    },
    {
      icon: MessageSquare,
      title: 'Communicator',
      desc: 'Percaya pada kekuatan komunikasi untuk menciptakan peluang.',
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/40'
    },
    {
      icon: TrendingUp,
      title: 'Learner',
      desc: 'Selalu penasaran, selalu belajar, selalu bertumbuh.',
      color: 'text-amber-400',
      border: 'hover:border-amber-500/40'
    },
    {
      icon: Box,
      title: 'Builder',
      desc: 'Mengubah ide jadi karya nyata, sekecil apa pun.',
      color: 'text-indigo-400',
      border: 'hover:border-indigo-500/40'
    }
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200/80 dark:border-stone-800/80 scroll-mt-16"
    >
      {/* Top Main Showcase Card - Atmospheric Dark Canvas */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0c0a09] text-stone-100 border border-stone-800/90 shadow-2xl p-6 sm:p-10 lg:p-12 mb-12">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-purple-400 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>TENTANG RAY</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Seseorang yang sedang belajar{' '}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                menjadi versi terbaik dari dirinya.
              </span>
            </h2>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans-ui max-w-xl">
              Dulu cuma anak yang bermimpi keluar dari lingkaran hidup yang itu-itu saja. Sekarang, gue masih di jalan — kerja, belajar, bikin cerita, dan mencoba membangun kebebasan finansial sambil tetap jadi manusia yang berguna.
            </p>

            {/* Signature Quote */}
            <div className="pt-2">
              <blockquote className="border-l-2 border-purple-500/60 pl-4 py-1 text-stone-300 italic text-sm sm:text-base font-sans-ui">
                "Bukan tentang seberapa jauh gue sudah sampai, tapi seberapa banyak yang masih ingin gue pelajari."
              </blockquote>
              <div className="mt-2 pl-4 text-xs font-mono-tag text-purple-400 font-semibold tracking-wider">
                — Ray
              </div>
            </div>

            {/* Action Buttons & Contact */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {onExploreStories && (
                <button
                  onClick={onExploreStories}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-purple-900/30 transition-all cursor-pointer"
                >
                  <span>Jelajahi Cerita</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onOpenCv && (
                <button
                  onClick={onOpenCv}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-mono-tag border border-purple-500/40 transition-all cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-purple-400" />
                  <span>Download CV</span>
                </button>
              )}

              <a
                href={profileData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 text-xs font-mono-tag border border-emerald-500/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={profileData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-pink-500/15 hover:bg-pink-500/25 text-pink-400 text-xs font-mono-tag border border-pink-500/30 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>

              <a
                href={`mailto:${profileData.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs font-mono-tag border border-stone-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Study Scene at Sunset */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-950 group">
              <img
                src="/about-window-sunset.svg"
                alt="Ray sitting thoughtfully at study desk by sunset window overlooking the city skyline"
                className="w-full h-auto object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Bottom tag on image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-tag text-stone-400 px-2">
                <span className="text-purple-300">History • Psychology • Finance • Tech • Stories</span>
                <span className="italic text-amber-300/90 font-sans">"Still in progress..."</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4 PILLARS / IDENTITIES ================= */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80 ${item.border} transition-all duration-300 space-y-2.5`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl bg-stone-800/80 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-editorial text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed font-sans-ui">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
