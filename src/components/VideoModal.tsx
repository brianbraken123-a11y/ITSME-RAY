import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const YOUTUBE_EMBED_URL =
  'https://www.youtube.com/embed/m3twycEQ4L4?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1';

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-3 sm:p-6 md:p-8 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ray — Perjalanan Tak Terputus"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button at top right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white/90 hover:text-white transition-colors cursor-pointer border border-white/10 shadow-lg"
          aria-label="Tutup video"
          title="Tutup video (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* YouTube Iframe Embed */}
        <iframe
          src={YOUTUBE_EMBED_URL}
          title="Ray — Perjalanan Tak Terputus"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full aspect-video rounded-2xl border-0"
        />
      </div>
    </div>
  );
};
