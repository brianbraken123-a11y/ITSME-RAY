import React, { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, FileText, Phone, MapPin, Mail, Linkedin, Sparkles } from 'lucide-react';
import { profileData } from '../data/profile';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-stone-100 dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-300 dark:border-stone-800 my-auto flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 leading-tight">
                Curriculum Vitae — Ryan Hidayat Taylor
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-mono-tag">
                Sales & Business Development • 2 Halaman
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Download Button */}
            <a
              href="/Ryan-Hidayat-Taylor-CV.pdf"
              download="Ryan-Hidayat-Taylor-CV.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all cursor-pointer"
              title="Cetak CV"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>

            {/* Open Raw PDF in New Tab */}
            <a
              href="/Ryan-Hidayat-Taylor-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all"
              title="Buka File PDF di Tab Baru"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body - Styled to look like the exact 2-page document */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8 bg-stone-200/50 dark:bg-stone-950/50">
          
          {/* ================= PAGE 1 ================= */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-10 shadow-lg text-stone-800 dark:text-stone-200 space-y-7 relative">
            <div className="text-[10px] font-mono-tag uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold absolute top-4 right-6">
              Halaman 1 dari 2
            </div>

            {/* Header: Name, Badge, Contact & Photo */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div className="space-y-3">
                <div className="border-l-4 border-purple-600 pl-3">
                  <h1 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 uppercase leading-none">
                    RYAN HIDAYAT<br />TAYLOR
                  </h1>
                </div>

                <div className="inline-block px-3 py-1 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold font-mono-tag tracking-wide">
                  Sales & Business Development
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-6 text-xs text-stone-600 dark:text-stone-400 font-mono-tag pt-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>+855 886 772 979</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Banjar, Jawa Barat, ID</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>brianbraken123@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>linkedin.com/in/ryan-taylor</span>
                  </div>
                </div>
              </div>

              {/* Profile Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-purple-500/40 shrink-0 shadow-md">
                <img
                  src={profileData.photoUrl || '/ray-photo.svg'}
                  alt="Ryan Hidayat Taylor"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Section: Profil Naratif */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-1 bg-amber-500 rounded-full"></span>
                <h2 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                  Profil Naratif
                </h2>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border-l-4 border-purple-600 border-t border-r border-b border-stone-200 dark:border-stone-700/60 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300 font-sans-ui">
                Saya adalah profesional <strong>Sales & Business Development</strong> yang dibentuk langsung oleh realitas lapangan. Perjalanan saya dimulai dari merintis usaha mandiri di usia muda, belajar dari kegagalan awal untuk bangkit membangun kemitraan bisnis, hingga melakukan <em>door-to-door sales</em> memetakan target pasar. Saat ini, saya dipercaya mengelola operasional dan pelayanan pelanggan multikultural di Kamboja dengan ritme kerja intensif 16 jam per hari. Saya terbiasa membaca karakter, bernegosiasi dengan pemilik warung hingga klien internasional, dan menemukan peluang di segala situasi. Saya memadukan mentalitas hustler ini dengan keterampilan teknis mutakhir (<em>web/app development & digital storytelling</em>) untuk menjadi komunikator persuasif di industri modern.
              </div>
            </div>

            {/* Section: Perjalanan Karir & Dampak */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-1 bg-amber-500 rounded-full"></span>
                <h2 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                  Perjalanan Karir & Dampak
                </h2>
              </div>

              {/* Item 1 */}
              <div className="relative pl-5 border-l-2 border-purple-500/40 space-y-1.5 pb-2">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-600"></span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                    Menjaga Nadi Operasional & Komunikasi
                  </h3>
                  <span className="text-xs font-mono-tag font-semibold text-purple-600 dark:text-purple-400">
                    Feb 2024 – Skrg
                  </span>
                </div>
                <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 font-mono-tag">
                  Captain, Admin & Server F&B | Kamboja
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-sans-ui leading-relaxed pt-1">
                  Bekerja di lingkungan bertempo tinggi dengan ritme operasional 16 jam per hari. Bertindak sebagai jembatan komunikasi antara bisnis dan pelanggan multikultural, sekaligus merangkap fungsi administratif dan rotasi dapur. Fleksibilitas dan manajemen stres ini melatih pengambilan keputusan operasional secara cepat dan menjaga standar retensi pelanggan dalam kondisi penuh tekanan.
                </p>
              </div>

              {/* Item 2 */}
              <div className="relative pl-5 border-l-2 border-purple-500/40 space-y-1.5">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-600"></span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                    Mentalitas Hustler & Ekosistem Digital
                  </h3>
                  <span className="text-xs font-mono-tag font-semibold text-purple-600 dark:text-purple-400">
                    2018–20 & 2022–23
                  </span>
                </div>
                <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 font-mono-tag">
                  Independent Sales & E-commerce Operator | Jawa Barat
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-sans-ui leading-relaxed pt-1">
                  Mengasah kemampuan prospecting dengan terjun langsung ke lapangan. Memetakan wilayah dan bernegosiasi dengan &gt;10 toko kelontong/hari untuk membangun jaringan distribusi B2B (2018-2020). Mengadaptasi insting pasar ini ke ranah digital melalui bisnis dropship, memvalidasi produk potensial, dan menangani seluruh siklus transaksi e-commerce secara independen (2022-2023).
                </p>
              </div>
            </div>

            {/* Page 1 Footer */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-between text-[11px] font-mono-tag text-stone-400">
              <span>Ryan Hidayat Taylor — Portfolio & CV</span>
              <span>Halaman 1 dari 2</span>
            </div>
          </div>


          {/* ================= PAGE 2 ================= */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-10 shadow-lg text-stone-800 dark:text-stone-200 space-y-7 relative">
            <div className="text-[10px] font-mono-tag uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold absolute top-4 right-6">
              Halaman 2 dari 2
            </div>

            {/* Header Page 2 */}
            <div className="flex justify-between items-baseline pb-4 border-b border-stone-200 dark:border-stone-800">
              <span className="font-editorial text-base font-bold text-purple-700 dark:text-purple-400 tracking-wide">
                RYAN HIDAYAT TAYLOR
              </span>
              <span className="text-xs font-mono-tag text-stone-500">
                Pengalaman Karir (Lanjutan)
              </span>
            </div>

            {/* Career Items Continue */}
            <div className="space-y-4">
              {/* Item 3 */}
              <div className="relative pl-5 border-l-2 border-purple-500/40 space-y-1.5 pb-2">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-600"></span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                    Dari Dapur ke Strategi Pemasaran
                  </h3>
                  <span className="text-xs font-mono-tag font-semibold text-purple-600 dark:text-purple-400">
                    2021 – 2022
                  </span>
                </div>
                <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 font-mono-tag">
                  Marketing, Komunikasi & Konsultan Independen | Sunmore Coffee
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-sans-ui leading-relaxed pt-1">
                  Memulai karir dari posisi dishwasher. Kemampuan observasi dan komunikasi persuasif membawa saya dipromosikan menjadi waiter, hingga akhirnya dipercaya menangani divisi marketing. Pencapaian ini berlanjut menjadi konsultan independen selama dua bulan, memberikan audit operasional dan rekomendasi produk yang diimplementasikan secara permanen pada menu.
                </p>
              </div>

              {/* Item 4 */}
              <div className="relative pl-5 border-l-2 border-purple-500/40 space-y-1.5 pb-2">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-600"></span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                    Kemitraan F&B & Eksekusi Lapangan
                  </h3>
                  <span className="text-xs font-mono-tag font-semibold text-purple-600 dark:text-purple-400">
                    2017 – 2018
                  </span>
                </div>
                <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 font-mono-tag">
                  Sales Lapangan | Pasar Kemis, Tangerang
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-sans-ui leading-relaxed pt-1">
                  Berkolaborasi dengan rekanan yang bertindak sebagai pemasok untuk menjalankan operasional harian. Fokus penuh pada eksekusi pemenuhan target penjualan langsung (direct sales) dan membangun interaksi pelanggan di lingkungan sekitar.
                </p>
              </div>

              {/* Item 5 */}
              <div className="relative pl-5 border-l-2 border-purple-500/40 space-y-1.5 pb-2">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-600"></span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                    Negosiasi B2B Peralatan Event
                  </h3>
                  <span className="text-xs font-mono-tag font-semibold text-purple-600 dark:text-purple-400">
                    2016 – 2017
                  </span>
                </div>
                <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 font-mono-tag">
                  Sales Peralatan Multimedia | Banten & Jawa Barat
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-sans-ui leading-relaxed pt-1">
                  Melakukan cold-pitching secara proaktif ke pengelola hotel dan penyelenggara acara untuk menawarkan jasa penyewaan alat multimedia. Menyesuaikan pendekatan presentasi dengan skala bisnis calon klien B2B.
                </p>
              </div>

              {/* Item 6 */}
              <div className="relative pl-5 border-l-2 border-purple-500/40 space-y-1.5">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-600"></span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                    Perintis Usaha & Manuver Kemitraan
                  </h3>
                  <span className="text-xs font-mono-tag font-semibold text-purple-600 dark:text-purple-400">
                    2014 – 2015
                  </span>
                </div>
                <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 font-mono-tag">
                  Operator & Kemitraan F&B | Banjar & Bekasi
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-sans-ui leading-relaxed pt-1">
                  Membangun mentalitas bisnis dengan merintis usaha kuliner mandiri. Meski menghadapi penutupan usaha dalam dua bulan, pengalaman ini memacu adaptasi cepat; merantau ke Bekasi dan sukses mengamankan kemitraan dengan pemodal lokal untuk mengeksekusi operasional penjualan fried chicken di lapangan.
                </p>
              </div>
            </div>

            {/* Section: Kompetensi & Nilai Tambah */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-1 bg-amber-500 rounded-full"></span>
                <h2 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                  Kompetensi & Nilai Tambah
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Card 1 */}
                <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/40 space-y-1">
                  <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300 font-mono-tag flex items-center gap-1.5">
                    <span>📈</span>
                    <span>Sales & Bus. Dev.</span>
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-sans-ui leading-relaxed">
                    B2B/B2C Sales, Cold Pitching, Lead Generation, Market Mapping, Direct Selling, Negotiation.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/40 space-y-1">
                  <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300 font-mono-tag flex items-center gap-1.5">
                    <span>🤝</span>
                    <span>Customer Relations</span>
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-sans-ui leading-relaxed">
                    Persuasive Communication, Cross-cultural Interaction, Client Retention, Problem Solving.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/40 space-y-1">
                  <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300 font-mono-tag flex items-center gap-1.5">
                    <span>💻</span>
                    <span>Tech & Digital Projects</span>
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-sans-ui leading-relaxed">
                    React & TypeScript (Web App Deployment), Android Studio, Prompt Engineering, Storytelling.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/40 space-y-1">
                  <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300 font-mono-tag flex items-center gap-1.5">
                    <span>⚙️</span>
                    <span>Operational Excellence</span>
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-sans-ui leading-relaxed">
                    High-Stress Time Management, Administrative Efficiency, Resilience & Adaptability.
                  </p>
                </div>
              </div>
            </div>

            {/* Page 2 Footer */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-between text-[11px] font-mono-tag text-stone-400">
              <span>Ryan Hidayat Taylor — Portfolio & CV</span>
              <span>Halaman 2 dari 2</span>
            </div>
          </div>

          {/* Bottom Call to Action within Modal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-purple-600/10 border border-purple-500/20">
            <div className="flex items-center gap-2 text-xs text-purple-800 dark:text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
              <span>File PDF resmi siap untuk diunduh dan dilampirkan dalam lamaran atau proposal kemitraan.</span>
            </div>
            <a
              href="/Ryan-Hidayat-Taylor-CV.pdf"
              download="Ryan-Hidayat-Taylor-CV.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-md transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF (19 KB)</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
