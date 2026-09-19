import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { Mail, MessageCircle, Instagram, Send, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    topic: 'Ngobrol Santai',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleQuickWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Ray! Gue ${formData.name}. Topik: ${formData.topic}. Pesan: ${formData.message}`;
    const url = `https://wa.me/855886772979?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-stone-200/80 dark:border-stone-800/80">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-purple-700 dark:text-purple-400 font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>Yuk Ngobrol</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Ada ide seru yang pengen diobrolin?
        </h2>
        <p className="mt-3 text-base text-stone-600 dark:text-stone-400 font-sans-ui leading-relaxed">
          Mau sharing soal psikologi sales, ide naskah cerita, proyek web baru, atau sekadar barter rekomendasi buku bagus—pintu chat gue selalu terbuka lebar.
        </p>
      </div>

      {/* Direct Contact Options Cards (WhatsApp, Instagram, Email) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {/* WhatsApp Card */}
        <div className="p-5 rounded-2xl bg-stone-50/90 dark:bg-stone-900/50 border border-emerald-500/30 flex flex-col justify-between gap-3 hover:border-emerald-500/60 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono-tag text-emerald-700 dark:text-emerald-400 font-semibold block">WhatsApp</span>
              <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 font-mono-tag">
                +855 886 772 979
              </span>
            </div>
          </div>
          <a
            href={profileData.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold font-mono-tag bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            <span>Chat Langsung</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Instagram Card */}
        <div className="p-5 rounded-2xl bg-stone-50/90 dark:bg-stone-900/50 border border-pink-500/30 flex flex-col justify-between gap-3 hover:border-pink-500/60 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono-tag text-pink-700 dark:text-pink-400 font-semibold block">Instagram</span>
              <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 font-mono-tag">
                @brainbreak19
              </span>
            </div>
          </div>
          <a
            href={profileData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold font-mono-tag bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 transition-colors"
          >
            <span>Buka Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Email Card */}
        <div className="p-5 rounded-2xl bg-stone-50/90 dark:bg-stone-900/50 border border-amber-500/30 flex flex-col justify-between gap-3 hover:border-amber-500/60 transition-colors">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono-tag text-amber-700 dark:text-amber-400 font-semibold block">Email</span>
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 font-mono-tag truncate block">
                  {profileData.email}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors shrink-0 cursor-pointer"
              title="Salin email"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <a
            href={`mailto:${profileData.email}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold font-mono-tag bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-950 hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors"
          >
            <span>Kirim Email</span>
            <Mail className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Quick Message Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-50/90 dark:bg-[#12100e] border border-stone-200 dark:border-stone-800 shadow-sm">
        {formSubmitted ? (
          <div className="p-8 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-stone-900 dark:text-stone-100">
              Keren! Tinggal Kirim Pesannya
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 font-sans-ui max-w-md mx-auto leading-relaxed">
              Kamu bisa langsung teruskan pesan ini via WhatsApp atau buka aplikasi email kamu.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={profileData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buka WhatsApp</span>
              </a>
              <a
                href={`mailto:${profileData.email}?subject=${encodeURIComponent(
                  `[${formData.topic}] dari ${formData.name}`
                )}&body=${encodeURIComponent(formData.message)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 hover:bg-amber-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Buka Email</span>
              </a>
            </div>
            <button
              onClick={() => {
                setFormSubmitted(false);
                setFormData({ name: '', topic: 'Ngobrol Santai', message: '' });
              }}
              className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-mono-tag underline cursor-pointer block mx-auto mt-2"
            >
              Tulis pesan lain
            </button>
          </div>
        ) : (
          <form id="portfolio-contact-form" onSubmit={handleQuickWhatsApp} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tag font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
                  Nama Kamu
                </label>
                <input
                  type="text"
                  required
                  placeholder="Siapa nama panggilanmu?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tag font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
                  Mau Ngobrolin Apa?
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/50 font-sans-ui"
                >
                  <option value="Kolaborasi Proyek">Kolaborasi Proyek / Bikin Karya</option>
                  <option value="Diskusi Sales & Komunikasi">Diskusi Sales, Negosiasi, & Komunikasi</option>
                  <option value="Storytelling & Narasi">Storytelling & Seni Menulis</option>
                  <option value="Ngobrol Santai / Kopi">Ngobrol Santai / Virtual Coffee</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-tag font-bold uppercase text-stone-600 dark:text-stone-400 mb-1.5">
                Ceritakan Singkat Idenya
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tulis apa aja yang lagi kamu pikirin atau pengen didiskusikan..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/50 font-sans-ui resize-y"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <span className="text-[11px] font-mono-tag text-stone-500 dark:text-stone-400">
                Pesan ini bisa langsung kamu kirim ke WhatsApp atau Email Ray.
              </span>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-mono-tag bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shrink-0 shadow-md shadow-emerald-600/20"
              >
                <span>Kirim via WhatsApp</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

