import React, { useState } from 'react';
import { socialsData } from '../data/socials';
import { MessageCircle, Instagram, Mail, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';

export const SocialsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (handle: string, id: string) => {
    navigator.clipboard.writeText(handle);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      case 'email':
        return <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    }
  };

  const getPlatformTheme = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-500/60',
          bg: 'hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20',
          badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
          btn: 'bg-emerald-600 hover:bg-emerald-700 text-white'
        };
      case 'instagram':
        return {
          border: 'border-pink-500/30 hover:border-pink-500/60',
          bg: 'hover:bg-pink-50/50 dark:hover:bg-pink-950/20',
          badgeBg: 'bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20',
          btn: 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white'
        };
      case 'email':
        return {
          border: 'border-amber-500/30 hover:border-amber-500/60',
          bg: 'hover:bg-amber-50/50 dark:hover:bg-amber-950/20',
          badgeBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20',
          btn: 'bg-stone-900 hover:bg-amber-600 dark:bg-stone-100 dark:hover:bg-amber-400 dark:text-stone-950 text-white'
        };
      default:
        return {
          border: 'border-purple-500/30 hover:border-purple-500/60',
          bg: 'hover:bg-purple-50/50 dark:hover:bg-purple-950/20',
          badgeBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
          btn: 'bg-purple-600 hover:bg-purple-700 text-white'
        };
    }
  };

  return (
    <section id="socials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-stone-200/80 dark:border-stone-800/80">
      {/* Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-purple-700 dark:text-purple-400 font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>Kanal Terhubung</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Nggak Perlu Banyak Medsos, Ngobrol di Sini Aja
        </h2>
        <p className="mt-3 text-base text-stone-600 dark:text-stone-400 font-sans-ui">
          Gue cuma fokus di 3 jalur ini: WhatsApp buat chat cepat, Instagram buat update ide & visual, dan Email buat diskusi mendalam.
        </p>
      </div>

      {/* 3 Dedicated Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {socialsData.map((social) => {
          const theme = getPlatformTheme(social.platform);
          return (
            <div
              key={social.id}
              id={`social-card-${social.id}`}
              className={`p-6 rounded-3xl bg-stone-50/80 dark:bg-stone-900/50 border ${theme.border} ${theme.bg} flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-lg group`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-stone-800 shadow-xs flex items-center justify-center">
                      {getPlatformIcon(social.platform)}
                    </div>
                    <span className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                      {social.platform}
                    </span>
                  </div>
                  {social.badge && (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono-tag font-semibold border ${theme.badgeBg}`}>
                      {social.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-stone-100 truncate">
                    {social.handle}
                  </h3>
                  <button
                    onClick={() => handleCopy(social.handle, social.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer shrink-0"
                    title="Salin ke clipboard"
                  >
                    {copiedId === social.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans-ui mb-6">
                  {social.description}
                </p>
              </div>

              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold font-mono-tag ${theme.btn} transition-all transform active:scale-98 shadow-xs cursor-pointer`}
              >
                <span>Buka {social.platform}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

