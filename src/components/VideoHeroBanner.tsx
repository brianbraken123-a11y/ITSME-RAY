import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Sparkles, Film } from 'lucide-react';

interface VideoHeroBannerProps {
  onWatch: () => void;
}

const STORAGE_KEY = 'ray_session_career_video_banner';

export const VideoHeroBanner: React.FC<VideoHeroBannerProps> = ({ onWatch }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const hasDismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!hasDismissed) {
        // Small delay for smooth entrance after page loads
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case sessionStorage is blocked in private browsing
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore storage error
    }
  };

  const handleWatchClick = () => {
    handleDismiss();
    onWatch();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -16, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -12, height: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-2">
            <div className="relative rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-purple-500/15 dark:from-amber-950/50 dark:via-orange-950/40 dark:to-purple-950/40 border border-amber-400/40 dark:border-amber-700/50 p-4 sm:p-5 shadow-md shadow-amber-500/5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Left Content */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 dark:bg-amber-500/25 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-700 dark:text-amber-300 shadow-xs">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono-tag uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                      <Sparkles className="w-2.5 h-2.5" />
                      Visual Story
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-mono-tag hidden md:inline">
                      • Ryan "Ray" Hidayat Taylor
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-sans-ui leading-tight">
                    Tonton rangkuman perjalanan karir Ray — dari usaha pertama sampai karya hari ini.
                  </p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                <button
                  id="banner-watch-video-btn"
                  onClick={handleWatchClick}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-semibold font-sans-ui transition-all cursor-pointer shadow-sm shadow-amber-600/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nonton Video</span>
                </button>

                <button
                  id="banner-dismiss-video-btn"
                  onClick={handleDismiss}
                  className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title="Tutup banner"
                  aria-label="Tutup banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
