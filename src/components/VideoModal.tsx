import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Film, Maximize2, Minimize2 } from 'lucide-react';
import { profileData } from '../data/profile';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video Perjalanan Karir"
    >
      {/* Video Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black group"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar: Fullscreen & Close */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
            aria-label={isFullscreen ? "Keluar layar penuh" : "Layar penuh"}
            title={isFullscreen ? "Keluar layar penuh" : "Layar penuh"}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
            aria-label="Tutup video"
            title="Tutup video (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Play Icon Overlay (sembunyi saat video jalan) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors pointer-events-none z-10">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
              <Play className="w-8 h-8 text-white ml-1 fill-white" />
            </div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          src="/career-journey.mp4"
          controls
          autoPlay
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setVideoError(true)}
          onLoadedData={() => setVideoError(false)}
          className="w-full h-full object-contain relative z-0"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Fallback if video is not yet placed in public/career-journey.mp4 */}
        {videoError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-950/95 p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-500/10">
              <Film className="w-8 h-8" />
            </div>
            <h4 className="font-editorial text-xl font-bold text-stone-100 mb-2">
              Video Perjalanan Karir Ray
            </h4>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md font-sans-ui mb-3">
              Player video siap memutar <code className="text-amber-300 bg-black/50 px-2 py-0.5 rounded font-mono-tag">public/career-journey.mp4</code>.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-400 font-mono-tag">
              <span>Status: Menunggu file di folder <code className="text-amber-300">/public/career-journey.mp4</code></span>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="mt-4 text-center px-4" onClick={(e) => e.stopPropagation()}>
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
