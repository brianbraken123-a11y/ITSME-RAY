import React, { useEffect, useState } from 'react';
import { Film, ChevronRight, X } from 'lucide-react';
import { profileData } from '../data/profile';

interface VideoHeroBannerProps {
  onWatch: () => void;
  className?: string;
}

export const VideoHeroBanner: React.FC<VideoHeroBannerProps> = ({ onWatch, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah pernah nampol banner ini (pakai sessionStorage)
    const seen = sessionStorage.getItem('has_seen_career_banner');
    if (seen === 'true') {
      setHasDismissed(true);
      setIsVisible(false);
      return;
    }

    // Tunggu sebentar sebelum muncul (biar nggak appearance mendadak)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('has_seen_career_banner', 'true');
    setHasDismissed(true);
    setIsVisible(false);
  };

  if (hasDismissed || !isVisible) return null;

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {/* Banner container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-amber-900/95 border border-white/10 shadow-2xl mx-4 sm:mx-6 lg:mx-8 my-4">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur flex-shrink-0">
            <Film className="w-6 h-6 text-white/90" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-mono-tag uppercase tracking-wider text-purple-300 font-semibold mb-1">
              Perjalanan Karir
            </p>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-white leading-tight">
              {profileData.name} — Perjalanan Tak Terputus
            </h3>
            <p className="text-xs text-white/70 font-sans-ui mt-1 max-w-md">
              Dari usaha pertama, hustle lapangan, sampai leadership di Kamboja.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onWatch}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-purple-900 hover:bg-purple-50 font-semibold text-xs transition-all cursor-pointer shadow-lg hover:shadow-xl"
              aria-label="Nonton video perjalanan karir"
            >
              <Film className="w-3.5 h-3.5" />
              <span>Nonton Video</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleDismiss}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup banner"
              title="Tutup banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
