import React, { useEffect, useRef, useState } from 'react';
import { Story } from '../types';
import { X, Clock, Calendar, Tag, Share2, Check, ArrowRight, BookOpen } from 'lucide-react';
import { storiesData } from '../data/stories';

interface StoryReaderModalProps {
  story: Story | null;
  onClose: () => void;
  onSelectStory: (story: Story) => void;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({
  story,
  onClose,
  onSelectStory
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock background body scroll when modal open
  useEffect(() => {
    if (story) {
      document.body.style.overflow = 'hidden';
      setScrollProgress(0);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [story]);

  if (!story) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100));
    setScrollProgress(progress);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#stories?story=${story.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedStories = storiesData
    .filter((s) => s.id !== story.id && (s.category === story.category || s.tags.some((t) => story.tags.includes(t))))
    .slice(0, 2);

  return (
    <div
      id="story-reader-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="story-reader-modal"
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#faf9f6] dark:bg-[#12100e] text-stone-900 dark:text-stone-100 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reading Progress Indicator */}
        <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 shrink-0">
          <div
            className="h-full bg-amber-600 dark:bg-amber-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Reader Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 dark:border-stone-800/80 bg-[#faf9f6]/95 dark:bg-[#12100e]/95 backdrop-blur-xs shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono-tag text-stone-500 dark:text-stone-400">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 font-medium">
              {story.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {story.readingTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {story.date}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="copy-story-link-btn"
              onClick={handleCopyLink}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
              title="Copy link to story"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              id="close-story-reader-btn"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
              title="Close reader (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Content */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="overflow-y-auto px-6 sm:px-10 py-8 space-y-8 font-sans-ui"
        >
          {/* Article Header */}
          <div className="space-y-4">
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.18]">
              {story.title}
            </h2>
            <p className="font-editorial italic text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed">
              {story.subtitle}
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-stone-500 dark:text-stone-400 font-mono-tag">
              <span>By Ryan Hidayat Taylor (Ray)</span>
              <span>·</span>
              <span>Personal Archive</span>
            </div>
          </div>

          {/* Key Excerpt Quote */}
          <div className="p-4 sm:p-5 rounded-xl bg-stone-100/80 dark:bg-stone-900/60 border-l-4 border-amber-600 dark:border-amber-500 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            {story.shortDescription}
          </div>

          {/* Full Article Body */}
          <div className="space-y-6 text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-[1.8] tracking-normal">
            {story.fullArticle.map((paragraph, idx) => (
              <p key={idx} className="font-sans-ui">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Takeaway Callout */}
          {story.keyTakeaway && (
            <div className="my-8 p-6 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-stone-900 dark:text-stone-100 space-y-2">
              <div className="text-xs font-mono-tag uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Inti Pembelajaran / Core Takeaway</span>
              </div>
              <p className="font-editorial text-lg sm:text-xl font-medium leading-relaxed text-stone-900 dark:text-stone-100">
                "{story.keyTakeaway}"
              </p>
            </div>
          )}

          {/* WhatsApp Discussion Callout */}
          <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tag font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                Punya Tanggapan atau Ide Serupa?
              </div>
              <p className="text-sm text-stone-700 dark:text-stone-300">
                Mau diskusi santai tentang naskah ini? Langsung chat Ray di WhatsApp.
              </p>
            </div>
            <a
              href={`https://wa.me/855886772979?text=${encodeURIComponent(`Halo Ray, gue baru baca tulisan kamu tentang "${story.title}". Menarik banget!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all shrink-0 cursor-pointer"
            >
              <span>Ngobrol di WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono-tag flex items-center gap-1">
              <Tag className="w-3 h-3" /> Tags:
            </span>
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono-tag"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Stories */}
          {relatedStories.length > 0 && (
            <div className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono-tag">
                Cerita Terkait Lainnya
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedStories.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectStory(rel)}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 hover:border-amber-500/50 transition-all cursor-pointer group"
                  >
                    <div className="text-xs text-amber-600 dark:text-amber-400 font-mono-tag mb-1">
                      {rel.category} · {rel.readingTime}
                    </div>
                    <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <div className="mt-2 flex items-center text-xs font-medium text-stone-500 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-200">
                      <span>Buka cerita</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
