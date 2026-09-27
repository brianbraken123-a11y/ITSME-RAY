import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Film, Maximize2, Minimize2, Settings, Cloud, Link as LinkIcon, Check, RotateCcw, ExternalLink } from 'lucide-react';
import { profileData } from '../data/profile';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOCAL_STORAGE_KEY = 'ray_custom_video_url';

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Video URL configuration (localStorage -> env -> profileData -> default)
  const defaultUrl = (import.meta.env.VITE_CAREER_VIDEO_URL as string) || profileData.careerVideoUrl || '/career-journey.mp4';
  const [currentUrl, setCurrentUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY) || defaultUrl;
    } catch {
      return defaultUrl;
    }
  });
  const [inputUrl, setInputUrl] = useState<string>(currentUrl);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setCurrentUrl(saved);
        setInputUrl(saved);
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        if (showConfig) {
          setShowConfig(false);
        } else {
          onClose();
        }
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
  }, [isOpen, onClose, showConfig]);

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

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      handleResetUrl();
      return;
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, trimmed);
    } catch {
      // ignore
    }
    setCurrentUrl(trimmed);
    setVideoError(false);
    setShowConfig(false);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handleResetUrl = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
    setCurrentUrl(defaultUrl);
    setInputUrl(defaultUrl);
    setVideoError(false);
    setShowConfig(false);
  };

  // Helper to parse embed URLs (YouTube, Vimeo) vs Direct video files
  const getEmbedInfo = (url: string) => {
    if (!url) return null;

    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`
      };
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/);
    if (vimeoMatch && (vimeoMatch[3] || vimeoMatch[1])) {
      const vimeoId = vimeoMatch[3] || vimeoMatch[1];
      return {
        type: 'vimeo',
        src: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`
      };
    }

    // Direct video (Vercel Blob, Cloudflare R2, AWS S3, or local mp4)
    return {
      type: 'direct',
      src: url
    };
  };

  if (!isOpen) return null;

  const embedInfo = getEmbedInfo(currentUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-in fade-in duration-200 overflow-y-auto"
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
        {/* Top Control Bar: Fullscreen, Settings & Close */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          {/* Cloud Storage / Video Source Settings */}
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              showConfig 
                ? 'bg-amber-600 text-white' 
                : 'bg-black/60 hover:bg-black/80 text-white/80 hover:text-white'
            }`}
            aria-label="Atur Sumber Video Cloud"
            title="Atur Sumber Video (Vercel Blob, Cloudflare R2, AWS S3, YouTube)"
          >
            <Settings className="w-5 h-5" />
          </button>

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

        {/* Video Player Render (Direct HTML5 Video or Embed Iframe) */}
        {embedInfo?.type === 'direct' ? (
          <>
            {/* Play Icon Overlay (sembunyi saat video jalan) */}
            {!isPlaying && !videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors pointer-events-none z-10">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                  <Play className="w-8 h-8 text-white ml-1 fill-white" />
                </div>
              </div>
            )}

            <video
              key={currentUrl}
              ref={videoRef}
              src={embedInfo.src}
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

            {/* Fallback if video file is missing or returns error */}
            {videoError && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-950/95 p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-lg shadow-amber-500/10">
                  <Film className="w-7 h-7" />
                </div>
                <h4 className="font-editorial text-lg sm:text-xl font-bold text-stone-100 mb-1">
                  Video Siap Ditautkan
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 max-w-md font-sans-ui mb-3">
                  Kamu bisa menggunakan file lokal <code className="text-amber-300 bg-black/50 px-1.5 py-0.5 rounded font-mono-tag">public/career-journey.mp4</code> atau memasukkan URL public dari <strong className="text-white">Vercel Blob</strong>, <strong className="text-white">Cloudflare R2</strong>, atau <strong className="text-white">AWS S3</strong>.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => setShowConfig(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Masukkan Cloud URL / YouTube</span>
                  </button>
                  <button
                    onClick={handleResetUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Coba File Lokal</span>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Embedded Iframe Player (YouTube / Vimeo) */
          <iframe
            key={embedInfo?.src}
            src={embedInfo?.src}
            title="Video Perjalanan Karir Ray"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* Cloud Storage / Video Source Configuration Drawer */}
      {showConfig && (
        <div
          className="w-full max-w-5xl mt-3 p-4 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 shadow-xl animate-in slide-in-from-top duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-amber-400" />
              <h5 className="text-sm font-semibold text-white">
                Pengaturan URL Video (Cloud Storage / Iframe Embed)
              </h5>
            </div>
            <button
              onClick={() => setShowConfig(false)}
              className="text-stone-400 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSaveUrl} className="space-y-3">
            <div>
              <label className="block text-xs font-mono-tag text-stone-400 mb-1">
                PUBLIC VIDEO URL (Vercel Blob, Cloudflare R2, AWS S3, atau Link YouTube):
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://...public.blob.vercel-storage.com/... atau https://youtu.be/..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-lg text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 font-mono-tag"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shrink-0 cursor-pointer shadow-xs transition-colors"
                >
                  Simpan & Putar
                </button>
                <button
                  type="button"
                  onClick={handleResetUrl}
                  className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                  title="Reset ke /career-journey.mp4"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Quick Helper Guides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 text-[11px] text-stone-400">
              <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/80">
                <span className="font-semibold text-amber-300 block mb-1">▲ Vercel Blob</span>
                <p className="leading-relaxed">
                  Buka Vercel Dashboard → Proyek → <strong>Storage</strong> → Buat <strong>Blob Store</strong> → Upload file → Salin <strong>Public URL</strong> (akhiran <code className="text-stone-300">.mp4</code>).
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/80">
                <span className="font-semibold text-orange-300 block mb-1">☁️ Cloudflare R2</span>
                <p className="leading-relaxed">
                  Buka Cloudflare R2 → Bucket → Upload <code className="text-stone-300">career-journey.mp4</code> → Nyalakan <strong>Public Access</strong> / Custom Domain → Dapatkan link publik.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/80">
                <span className="font-semibold text-emerald-300 block mb-1">📦 AWS S3</span>
                <p className="leading-relaxed">
                  Upload ke S3 Bucket → Pastikan bucket / object memiliki izin <strong>Public Read</strong> → Salin <strong>Object URL</strong>.
                </p>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Success Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-lg animate-in fade-in duration-200">
          <Check className="w-4 h-4" />
          <span>URL Video berhasil diperbarui dan disimpan!</span>
        </div>
      )}

      {/* Caption & Source Badge */}
      <div className="mt-4 text-center px-4 flex flex-col items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm text-white/80 font-sans-ui max-w-md mx-auto">
          Perjalanan Karir Ryan "Ray" Hidayat Taylor — dari usaha pertama sampai sekarang.
        </p>
        <div className="flex items-center gap-2 text-xs text-white/50 font-mono-tag">
          <span>{profileData.name} · Career Journey</span>
          <span>•</span>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="hover:text-amber-400 underline underline-offset-2 transition-colors cursor-pointer"
          >
            {showConfig ? 'Sembunyikan Pengaturan' : 'Atur Sumber Cloud Storage'}
          </button>
        </div>
      </div>
    </div>
  );
};
