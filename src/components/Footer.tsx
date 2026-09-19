import React from 'react';
import { profileData } from '../data/profile';
import { ArrowUp, Heart, Terminal, Compass, Download, FileText } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCv?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCv }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="portfolio-footer" className="border-t border-stone-200 dark:border-stone-800 bg-[#faf9f6] dark:bg-[#0c0a09] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-editorial font-bold text-xs">
              R
            </div>
            <span className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
              {profileData.name} ({profileData.shortName})
            </span>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 font-sans-ui max-w-sm mb-2">
            {profileData.tagline}
          </p>

          <p className="text-[11px] font-mono-tag text-stone-500 dark:text-stone-500">
            {profileData.location} · {new Date().getFullYear()} Personal Archive.
          </p>
        </div>

        {/* Quick links & Back to top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tag text-stone-600 dark:text-stone-400">
            <a
              href={profileData.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
            >
              WhatsApp
            </a>
            <span>•</span>
            <a
              href={profileData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
            >
              Instagram
            </a>
            <span>•</span>
            <a
              href={`mailto:${profileData.email}`}
              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
            >
              Email
            </a>
            <span>•</span>
            <button onClick={() => onNavigate('stories')} className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
              Cerita
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('experience')} className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
              Perjalanan
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('about')} className="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer">
              Tentang Ray
            </button>
            {onOpenCv && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenCv}
                  className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline font-semibold cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Download CV</span>
                </button>
              </>
            )}
          </div>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 dark:border-stone-700 text-xs font-mono-tag text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 hover:border-purple-400 transition-colors cursor-pointer"
          >
            <span>Ke atas</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-stone-200/50 dark:border-stone-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono-tag text-stone-500 dark:text-stone-500">
        <div>
          Vercel-ready static architecture · TypeScript & Tailwind CSS
        </div>
        <div className="italic">
          "Not finished, perpetually evolving."
        </div>
      </div>
    </footer>
  );
};
