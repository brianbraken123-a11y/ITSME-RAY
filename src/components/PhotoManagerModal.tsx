import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { X, Upload, Image as ImageIcon, RotateCcw, Check, Sparkles, Camera, ShieldCheck } from 'lucide-react';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({ isOpen, onClose }) => {
  const { profilePhoto, setProfilePhoto, resetProfilePhoto } = useContent();
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<string>(profilePhoto);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Harap pilih berkas gambar (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('Ukuran berkas maksimal 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewPhoto(result);
        setProfilePhoto(result);
        showToast('Foto profil baru berhasil diterapkan & disimpan!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlApply = () => {
    if (!photoUrlInput.trim()) return;
    setPreviewPhoto(photoUrlInput.trim());
    setProfilePhoto(photoUrlInput.trim());
    setPhotoUrlInput('');
    showToast('Foto dari URL berhasil disimpan!');
  };

  const handleReset = () => {
    resetProfilePhoto();
    setPreviewPhoto('/ray-photo.jpg');
    showToast('Foto profil dikembalikan ke default hyper-realistic studio!');
  };

  const presetOptions = [
    {
      name: 'Hyper-Realistic Studio Ray',
      url: '/ray-photo.jpg',
      tag: 'Bawaan Studio 8K'
    },
    {
      name: 'Sunset Study Scene',
      url: '/about-window-sunset.svg',
      tag: 'Golden Hour'
    }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-manager-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check className="w-3.5 h-3.5" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 id="photo-manager-title" className="font-editorial text-xl font-bold text-stone-900 dark:text-stone-100">
                Ganti Foto Profil (Hyper-Realistic)
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-mono-tag">
                Unggah foto ChatGPT / foto nyata Anda langsung ke website
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Live Preview Card */}
          <div className="p-4 rounded-2xl bg-stone-100/80 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-28 h-36 rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-md shrink-0 bg-stone-950">
              <img
                src={previewPhoto}
                alt="Preview Foto Ray"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono-tag bg-stone-950/80 text-white border border-white/20">
                Live
              </span>
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 font-mono-tag">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Foto Aktif Website</span>
              </div>
              <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                Ray (Ryan Hidayat Taylor)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Foto ini langsung muncul di Hero Section, About Section, dan seluruh halaman website Anda.
              </p>
            </div>
          </div>

          {/* Upload Method 1: Local File from Device */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider font-mono-tag text-stone-700 dark:text-stone-300">
              Opsi 1: Unggah dari Komputer / HP (image.png atau Foto ChatGPT)
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-purple-400/60 dark:border-purple-600/50 hover:border-purple-600 dark:hover:border-purple-400 rounded-2xl p-6 text-center cursor-pointer bg-purple-50/30 dark:bg-purple-950/20 hover:bg-purple-50/60 dark:hover:bg-purple-950/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                Klik untuk memilih foto Anda
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Pilih foto hyper-realistic dari ChatGPT (PNG, JPG, hingga 10MB)
              </p>
            </div>
          </div>

          {/* Upload Method 2: Image URL */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider font-mono-tag text-stone-700 dark:text-stone-300">
              Opsi 2: Tautan URL Foto (Online)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <ImageIcon className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="https://example.com/foto-ray.jpg"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                onClick={handleUrlApply}
                disabled={!photoUrlInput.trim()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Gunakan URL
              </button>
            </div>
          </div>

          {/* Preset Choices */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider font-mono-tag text-stone-700 dark:text-stone-300">
              Pilihan Preset Bawaan:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {presetOptions.map((preset) => (
                <button
                  key={preset.url}
                  onClick={() => {
                    setPreviewPhoto(preset.url);
                    setProfilePhoto(preset.url);
                    showToast(`Preset "${preset.name}" diterapkan!`);
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    previewPhoto === preset.url
                      ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-900/50 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-10 h-12 rounded-lg object-cover bg-stone-950 border border-stone-200/40 dark:border-stone-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="overflow-hidden">
                    <span className="block text-xs font-semibold truncate">{preset.name}</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono-tag">{preset.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ke Default</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
