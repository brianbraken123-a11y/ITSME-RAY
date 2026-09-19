import React, { useEffect, useRef, useState } from 'react';
import { Opinion } from '../types';
import { X, Clock, Calendar, Tag, Share2, Check, Lightbulb } from 'lucide-react';

interface OpinionReaderModalProps {
  opinion: Opinion | null;
  onClose: () => void;
}

export const OpinionReaderModal: React.FC<OpinionReaderModalProps> = ({ opinion, onClose }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (opinion) {
      document.body.style.overflow = 'hidden';
      setScrollProgress(0);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [opinion]);

  if (!opinion) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100));
    setScrollProgress(progress);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#writings?id=${opinion.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="opinion-reader-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="opinion-reader-modal"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#faf9f6] dark:bg-[#12100e] text-stone-900 dark:text-stone-100 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 shrink-0">
          <div
            className="h-full bg-amber-600 dark:bg-amber-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 dark:border-stone-800/80 bg-[#faf9f6]/95 dark:bg-[#12100e]/95 backdrop-blur-xs shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono-tag text-stone-500 dark:text-stone-400">
            <span className="px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium">
              {opinion.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {opinion.readingTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {opinion.date}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="copy-opinion-link-btn"
              onClick={handleCopyLink}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              id="close-opinion-reader-btn"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
              title="Close reader (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="overflow-y-auto px-6 sm:px-10 py-8 space-y-6 font-sans-ui"
        >
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.2]">
            {opinion.title}
          </h2>

          {/* Core Perspective Box */}
          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-stone-900 dark:text-stone-100 space-y-1">
            <div className="text-[11px] font-mono-tag uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Sudut Pandang / Ray's Lens</span>
            </div>
            <p className="font-editorial text-base sm:text-lg italic text-stone-800 dark:text-stone-200 leading-snug">
              "{opinion.corePerspective}"
            </p>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-[1.8]">
            {opinion.fullContent.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* WhatsApp Discussion CTA */}
          <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tag font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                Punya Sudut Pandang Berbeda?
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                Gue suka diskusi jujur dan terbuka. Chat langsung ke WhatsApp gue.
              </p>
            </div>
            <a
              href={`https://wa.me/855886772979?text=${encodeURIComponent(`Halo Ray, gue baca opini lo tentang "${opinion.title}". Mau ngobrolin ini bentar dong.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all shrink-0 cursor-pointer"
            >
              <span>Chat WhatsApp</span>
            </a>
          </div>

          <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono-tag flex items-center gap-1">
              <Tag className="w-3 h-3" /> Tags:
            </span>
            {opinion.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono-tag"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
