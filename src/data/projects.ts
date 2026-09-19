import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Personal Hub & Narrative Archive',
    tagline: 'Personal digital garden, arsip cerita, dan wadah refleksi pemikiran.',
    description: 'Website portfolio dan arsip pemikiran santai dengan pendekatan editorial modern, bebas dari template korporat yang kaku.',
    problem: 'CV konvensional dan profil LinkedIn terlalu steril dan kaku, gagal merefleksikan cara berpikir dinamis serta pengalaman lapangan yang multidimensi.',
    whatIBuilt: 'Sistem web berbasis React, TypeScript, dan Tailwind CSS. Mendukung pembacaan artikel editorial, mode gelap/terang, dan tautan kontak langsung WhatsApp/Instagram.',
    whatILearned: 'Bagaimana menstrukturisasi data TypeScript secara rapi dan merancang tata letak editorial dengan sentuhan warna yang estetik.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    status: 'Completed',
    liveUrl: '#',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'AI-Assisted Storytelling & Research Engine',
    tagline: 'Sistem kurasi ide dan sparring partner logika untuk penulisan narasi panjang.',
    description: 'Alur kerja terstruktur yang memanfaatkan Large Language Models untuk melakukan stress-testing pada argumen esai dan meneliti data historis tanpa bias.',
    problem: 'Penggunaan AI generatif standar menghasilkan tulisan yang generik, datar, dan sering mengalami halusinasi fakta ketika menyusun skrip narasi edukatif.',
    whatIBuilt: 'Serangkaian prompt bertahap (multi-step chain-of-thought) dan template verifikasi fakta yang memaksa model AI bertindak sebagai kritikus sokratik sebelum draf final ditulis tangan.',
    whatILearned: 'Kekuatan AI bukan pada fungsi "tuliskan artikel untuk saya", melainkan pada kemampuannya membongkar premis argumen dan menemukan celah logika.',
    technologies: ['Prompt Engineering', 'Markdown Architecture', 'LLM Workflow Tools', 'Notion Database'],
    status: 'Building',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Personal Cashflow & Expense Ledger',
    tagline: 'Aplikasi pencatat arus kas sederhana berbasis prinsip keuangan defensif.',
    description: 'Eksperimen alat pencatatan keuangan pribadi dengan penekanan pada pemisahan pos darurat, biaya operasional harian, dan investasi defensif.',
    problem: 'Sebagian besar aplikasi budgeting komersial terlalu rumit, dipenuhi iklan, dan memaksa pengguna menghubungkan rekening bank secara invasif.',
    whatIBuilt: 'Antarmuka web minimalis yang memungkinkan input cepat transaksi dalam waktu kurang dari 5 detik dengan visualisasi alokasi kas bulanan.',
    whatILearned: 'Pentingnya merancang alur interaksi (UX) yang minim hambatan (frictionless) agar kebiasaan mencatat tidak ditinggalkan setelah seminggu.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Local State Storage'],
    status: 'Experiment',
    featured: false
  },
  {
    id: 'proj-4',
    title: 'B2B Field Prospecting Playbook & CRM Sheet',
    tagline: 'Sistem pemetaan rute dan pipeline prospek toko kelontong & hotel.',
    description: 'Dokumentasi strategi dan spreadsheet otomatis untuk mencatat siklus kunjungan, objection handling, dan tingkat konversi door-to-door.',
    problem: 'Pekerjaan sales lapangan sering kali berjalan tanpa struktur data yang jelas, mengakibatkan banyak lead potensial terabaikan setelah kunjungan pertama.',
    whatIBuilt: 'Alat bantu operasional lapangan sederhana yang mengklasifikasikan toko berdasarkan tipe keberatan harga, frekuensi restock, dan histori respons pemilik toko.',
    whatILearned: 'Data lapangan mentah adalah emas jika dikelompokkan berdasarkan psikologi pembeli, bukan sekadar tanggal kalender.',
    technologies: ['Google Workspace Sheets', 'Data Modeling', 'B2B Qualification Frameworks'],
    status: 'Completed',
    featured: false
  },
  {
    id: 'proj-5',
    title: 'Minimal Habit Pulse & Focus Alarm',
    tagline: 'Eksperimen aplikasi mobile Android sederhana buat disiplin rutinitas harian.',
    description: 'Eksplorasi bikin aplikasi Android ringan buat pengingat tempo kerja tanpa notifikasi yang bikin stres atau kecanduan layar.',
    problem: 'Aplikasi habit modern terlalu banyak gamifikasi lebay (streak rewards, badge mencolok) yang malah mendistraksi fokus inti.',
    whatIBuilt: 'Prototipe aplikasi Android ringan dengan interval tenang dan pencatat konsistensi kerja fokus harian.',
    whatILearned: 'Manajemen siklus hidup Activity di Android Studio dan state management lokal tanpa server.',
    technologies: ['Kotlin', 'Android Studio Basics', 'XML Layouts'],
    status: 'Archived',
    featured: false
  },
  {
    id: 'proj-6',
    title: 'Sunmore Coffee Operational & Menu Audit',
    tagline: 'Audit alur operasional F&B dan rekomendasi strategi produk menu.',
    description: 'Proyek independen pasca promosi dari dishwasher sampai tim marketing, membenahi efisiensi operasional dan perombakan hierarki menu.',
    problem: 'Komunikasi antar divisi F&B yang terfragmentasi sering bikin pesanan numpuk di jam sibuk dan menu yang bikin tamu bingung milih.',
    whatIBuilt: 'Laporan audit alur dapur-ke-meja, restrukturisasi cara penulisan menu dengan pendekatan visual merchandising, dan tips komunikasi staf.',
    whatILearned: 'Merombak menu bukan cuma ganti harga atau foto, tapi merekayasa psikologi pilihan (choice architecture) konsumen.',
    technologies: ['Menu Engineering', 'Operational Audit', 'Service Blueprint Design'],
    status: 'Completed',
    featured: false
  }
];
