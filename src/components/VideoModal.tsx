import React, { useEffect, useRef } from 'react';
import { X, Film } from 'lucide-react';
import { profileData } from '../data/profile';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video Perjalanan Karir"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black group"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button at top right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
          aria-label="Tutup video"
          title="Tutup video (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* YouTube Iframe */}
        <iframe
          src="https://www.youtube.com/embed/m3twycEQ4L4?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1&showinfo=0"
          title="Video Perjalanan Karir Ray"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-4 left-0 right-0 text-center px-4 pointer-events-none">
        <p className="text-sm text-white/80 font-sans-ui max-w-md mx-auto">
          Perjalanan Karir Ryan "Ray" Hidayat Taylor — dari usaha pertama sampai sekarang.
        </p>
        <p className="text-xs text-white/50 font-mono-tag mt-1">
          {profileData.name} · Career Journey
        </p>
      </div>
    </div>
  );
};
