# Ray — Personal Portfolio & Narrative Archive

Website personal hub dan arsip pemikiran untuk **Ryan Hidayat Taylor (Ray)**: *Storyteller, Communicator, Learner, and Builder.*

Didesain dengan pendekatan editorial magazine modern, minimalis, dan berfokus pada konten. Memisahkan data dari tata letak agar pemilik website yang bukan programmer dapat memperbarui tulisan, proyek, dan pengalaman hidup dengan mudah.

---

## 📁 Struktur Folder Project

```text
├── index.html                   # Entry point HTML dengan SEO tags, fonts, dan JSON-LD
├── metadata.json                # Metadata aplikasi
├── package.json                 # Konfigurasi dependensi & npm scripts (Vite build)
├── public/
│   ├── robots.txt               # Aturan crawling mesin pencari
│   └── sitemap.xml              # Peta situs sitemap SEO
├── src/
│   ├── main.tsx                 # React DOM root render
│   ├── App.tsx                  # Root layout & orkestrasi seluruh section
│   ├── index.css                # Konfigurasi Tailwind CSS & font kustom
│   ├── types/
│   │   └── index.ts             # Definisi TypeScript untuk Story, Opinion, Learning, Project, dll.
│   ├── context/
│   │   └── ThemeContext.tsx     # Provider mode gelap/terang (Dark/Light mode)
│   ├── data/                    # 📌 TEMPAT MENGUBAH SEMUA KONTEN & DATA (TANPA SENTUH KODE UI)
│   │   ├── profile.ts           # Data nama, headline, bio, email, dll.
│   │   ├── stories.ts           # Arsip cerita naratif & artikel (History, Psychology, dll.)
│   │   ├── writings.ts          # Arsip esai, opini, dan catatan personal
│   │   ├── learnings.ts         # Peta pembelajaran (status non-linear, buku, insight)
│   │   ├── projects.ts          # Daftar proyek & eksperimen digital
│   │   ├── experiences.ts       # Rekam jejak karir & perkembangan keahlian
│   │   └── socials.ts           # Tautan media sosial & deskripsi
│   └── components/              # Komponen visual modular
│       ├── Navbar.tsx           # Navigasi atas & toggle tema
│       ├── Hero.tsx             # Headline kuat dengan opsi rotasi perspektif
│       ├── StoriesSection.tsx   # Grid artikel editorial dengan filter & pencarian
│       ├── StoryReaderModal.tsx # Mode baca imersif dengan reading progress bar
│       ├── WritingsSection.tsx  # Section esai & opini personal
│       ├── OpinionReaderModal.tsx # Reader modal untuk opini
│       ├── LearningMapSection.tsx # Peta keahlian tanpa persentase palsu
│       ├── ProjectsSection.tsx  # Showcase proyek (Problem -> Built -> Learned)
│       ├── ExperienceSection.tsx # Timeline perkembangan skill
│       ├── AboutSection.tsx     # Kisah perjalanan naratif & filosofi
│       ├── SocialsSection.tsx   # Hub kartu media sosial
│       ├── ContactSection.tsx   # Formulir & kontak langsung
│       └── Footer.tsx           # Footer & tombol kembali ke atas
```

---

## 🚀 Cara Menjalankan Secara Lokal (Local Development)

1. Pastikan Anda telah menginstal **Node.js** (versi 18 ke atas) di komputer Anda.
2. Buka terminal di folder project ini.
3. Jalankan perintah instalasi dependensi:
   ```bash
   npm install
   ```
4. Jalankan server lokal:
   ```bash
   npm run dev
   ```
5. Buka browser dan akses alamat yang tertera di terminal (biasanya `http://localhost:3000` atau `http://localhost:5173`).

---

## ✍️ Cara Memasukkan Artikel / Cerita Baru

Semua konten dipisahkan rapi di dalam folder `src/data/`.

### 1. Menambahkan Cerita Naratif Baru (`Stories`)
Buka file `src/data/stories.ts`. Tambahkan objek baru di dalam array `storiesData`:

```typescript
{
  id: 'story-8',
  slug: 'judul-cerita-dalam-huruf-kecil',
  title: 'Judul Cerita Anda',
  subtitle: 'Subjudul atau pengantar menarik satu kalimat.',
  category: 'History', // Opsi: 'History' | 'Psychology' | 'Philosophy' | 'Science' | 'Society' | 'Technology' | 'Personal'
  date: '20 Mar 2025',
  readingTime: '5 min read',
  shortDescription: 'Ringkasan singkat 1-2 kalimat untuk kartu di halaman depan.',
  fullArticle: [
    'Paragraf pertama cerita Anda...',
    'Paragraf kedua cerita Anda...',
    'Paragraf ketiga cerita Anda...'
  ],
  keyTakeaway: 'Satu kalimat inti hikmah / pembelajaran dari cerita ini.',
  tags: ['History', 'Philosophy'],
  featured: false // Ubah ke true jika ingin ditampilkan di kartu hero paling atas
},
```

### 2. Menambahkan Opini / Esai Baru (`Writings`)
Buka file `src/data/writings.ts`. Tambahkan objek baru di dalam array `opinionsData`:

```typescript
{
  id: 'op-6',
  slug: 'judul-opini-anda',
  title: 'Judul Opini atau Catatan',
  category: 'OPINIONS', // Opsi: 'ESSAYS' | 'OPINIONS' | 'PERSONAL NOTES' | 'COPYWRITING' | 'IDEAS'
  date: '25 Mar 2025',
  readingTime: '3 min read',
  summary: 'Ringkasan singkat tentang apa yang dibahas.',
  corePerspective: 'Inti sudut pandang khas Ray yang berani dan reflektif.',
  fullContent: [
    'Paragraf 1 esai...',
    'Paragraf 2 esai...'
  ],
  tags: ['Communication', 'Ideas']
},
```

---

## 👤 Cara Mengganti Data Pribadi & Kontak

1. **Informasi Profil**: Buka `src/data/profile.ts`.
   - Ubah `name`, `shortName`, `headlineOptions`, `bioShort`, `bioNarrative`.
   - Ubah `email` dan tautan media sosial.
2. **Pengalaman Karir**: Buka `src/data/experiences.ts`.
   - Anda dapat menambah, mengubah, atau memperbarui peran kerja dengan format `whatIDid`, `whatILearned`, dan `whatChanged`.
3. **Peta Pembelajaran**: Buka `src/data/learnings.ts`.
   - Anda dapat mengubah status keahlian antara: `'Exploring'`, `'Learning'`, `'Practicing'`, `'Applied'`, atau `'Deep Dive'`.
4. **Proyek**: Buka `src/data/projects.ts`.
   - Ubah status proyek: `'Idea'`, `'Experiment'`, `'Building'`, `'Completed'`, atau `'Archived'`.

---

## 🔗 Cara Mengganti Social Media

Buka file `src/data/socials.ts`. Setiap platform memiliki pengaturan seperti berikut:

```typescript
{
  id: 'soc-instagram',
  platform: 'Instagram',
  handle: '@username_anda',
  url: 'https://instagram.com/username_anda',
  description: 'Deskripsi singkat mengenai apa yang Anda bagikan di sini.',
  badge: 'Follow'
}
```

---

## 🌐 Cara Deploy ke Vercel (Gratis & Cepat)

Project ini telah menggunakan arsitektur standar Vite + React yang didukung secara native oleh Vercel.

### Cara 1: Menggunakan GitHub (Sangat Direkomendasikan)
1. Unggah (push) kode repositori ini ke akun GitHub Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Ray personal hub"
   git branch -M main
   git remote add origin https://github.com/<username-anda>/<nama-repo>.git
   git push -u origin main
   ```
2. Buka [vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
3. Klik tombol **"Add New..."** lalu pilih **"Project"**.
4. Pilih repositori GitHub yang baru saja Anda buat.
5. Vercel akan otomatis mendeteksi:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Klik **"Deploy"**. Dalam ~30 detik website Anda sudah online di URL Vercel (misal `ray-archive.vercel.app`).
7. Setiap kali Anda menambahkan artikel baru dan push ke GitHub, Vercel akan otomatis memperbarui website Anda!

### Cara 2: Menggunakan Vercel CLI
1. Di terminal komputer Anda:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Ikuti instruksi di terminal, pilih default setting.

---

## ✅ Checklist Sebelum Deployment

- [x] Pastikan `npm run build` berhasil tanpa error (`dist/` dihasilkan).
- [x] Periksa `index.html`: judul `<title>`, meta deskripsi, dan structured data JSON-LD sudah sesuai dengan nama Anda.
- [x] Cek tautan email dan media sosial di `src/data/profile.ts` dan `src/data/socials.ts`.
- [x] Uji tombol toggle tema gelap / terang di navigasi.
- [x] Cek mode pembaca cerita (Story Reader Modal) dan pastikan tombol close & ESC berfungsi dengan baik.
- [x] Uji responsivitas di layar mobile menggunakan browser Inspect Element (Device Mode).
