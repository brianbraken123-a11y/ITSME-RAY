import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film } from 'lucide-react';

interface VideoHeroBannerProps {
  onWatch: () => void;
}

const STORAGE_KEY = 'has_seen_career_youtube_banner';

export const VideoHeroBanner: React.FC<VideoHeroBannerProps> = ({ onWatch }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem(STORAGE_KEY);
      if (!hasSeen) {
        // Auto-show smoothly after page loads
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
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
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -16, height: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-2">
            <div className="relative rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/25 to-amber-900/25 dark:from-purple-950/60 dark:via-indigo-950/50 dark:to-amber-950/50 border border-purple-500/30 dark:border-purple-500/40 p-4 sm:p-5 shadow-lg shadow-purple-950/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Left Content */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 dark:bg-purple-500/25 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-300 shadow-xs">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 font-sans-ui flex items-center gap-2">
                    <span>Ray — Perjalanan Tak Terputus</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans-ui mt-0.5">
                    Dari usaha pertama, hustle lapangan, sampai leadership di Kamboja
                  </p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                <button
                  id="banner-watch-video-btn"
                  onClick={handleWatchClick}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 text-white text-xs font-semibold font-sans-ui transition-all cursor-pointer shadow-sm shadow-purple-600/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nonton Video</span>
                </button>

                <button
                  id="banner-dismiss-video-btn"
                  onClick={handleDismiss}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
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
