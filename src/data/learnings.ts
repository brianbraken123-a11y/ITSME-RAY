import { LearningItem } from '../types';

export const learningsData: LearningItem[] = [
  {
    id: 'learn-storytelling',
    subject: 'Storytelling & Narrative Architecture',
    category: 'Story & Writing',
    status: 'Applied',
    statusDescription: 'Secara aktif digunakan dalam penulisan script, artikel editorial, dan materi presentasi bisnis.',
    whatILearned: 'Struktur kurva naratif (Story Grid, Dan Harmon Story Circle), transisi emosional, teknik showing vs telling, dan framing perspektif dalam tulisan non-fiksi.',
    booksAndSources: [
      'Story: Style, Structure, Substance by Robert McKee',
      'The Anatomy of Story by John Truby',
      'Wired for Story by Lisa Cron'
    ],
    notesAndInsights: [
      'Fakta hanya menginformasikan, tetapi cerita melahirkan empati dan tindakan nyata.',
      'Konflik terbaik bukan antara yang baik melawan yang jahat, melainkan antara dua hal baik yang saling berbenturan dalam nilai moral.'
    ],
    currentProjects: ['Personal Hub Story Archive', 'YouTube Long-form Narrative Scripting'],
    lastUpdated: 'Januari 2025'
  },
  {
    id: 'learn-b2b-sales',
    subject: 'B2B Sales & High-Stakes Negotiation',
    category: 'Sales & Business',
    status: 'Deep Dive',
    statusDescription: 'Ditempa langsung melalui door-to-door sales, cold pitching, dan negosiasi F&B/multimedia bertahun-tahun.',
    whatILearned: 'Framework kualifikasi prospek (MEDDIC, BANT), pemetaan hierarki pembuat keputusan, seni handling objections tanpa bersikap defensif, dan consultative selling.',
    booksAndSources: [
      'Never Split the Difference by Chris Voss',
      'The Challenger Sale by Matthew Dixon & Brent Adamson',
      'SPIN Selling by Neil Rackham'
    ],
    notesAndInsights: [
      'Negosiasi bukan pertarungan adu argumen, melainkan proses penemuan apa yang sesungguhnya ditakuti lawan bicara.',
      'Jangan menjual fitur sebelum Anda memvalidasi luka finansial yang sedang dialami calon klien.'
    ],
    currentProjects: ['B2B Event Equipment Consulting Model', 'Outreach Playbook for Independent Brands'],
    lastUpdated: 'Desember 2024'
  },
  {
    id: 'learn-psychology',
    subject: 'Behavioral Psychology & Decision Making',
    category: 'Psychology & Thinking',
    status: 'Deep Dive',
    statusDescription: 'Fondasi utama cara saya membaca karakter pelanggan, menulis copy, dan mengelola dinamika tim.',
    whatILearned: 'Heuristik kognitif, confirmation bias, loss aversion, status signaling, dan bagaimana stres fisik memicu pembajakan amigdala pada manusia.',
    booksAndSources: [
      'Thinking, Fast and Slow by Daniel Kahneman',
      'The Elephant in the Brain by Kevin Simler & Robin Hanson',
      'Influence: The Psychology of Persuasion by Robert Cialdini'
    ],
    notesAndInsights: [
      'Manusia hampir tidak pernah mengambil keputusan secara logis; mereka memutuskan secara emosional lalu merasionalisasikannya dengan logika.',
      'Jika Anda ingin memahami seseorang, amati apa yang mereka korbankan saat berada di bawah tekanan.'
    ],
    currentProjects: ['Psychology Insights Archive', 'Customer Relations Playbook'],
    lastUpdated: 'Februari 2025'
  },
  {
    id: 'learn-copywriting',
    subject: 'Direct-Response & Editorial Copywriting',
    category: 'Story & Writing',
    status: 'Applied',
    statusDescription: 'Diterapkan untuk promosi cafe, materi penawaran e-commerce, dan newsletter pribadi.',
    whatILearned: 'Penulisan headline hook, pembongkaran penawaran (offer architecture), ritmo kalimat pendek vs panjang, serta micro-copy pada antarmuka web.',
    booksAndSources: [
      'The Adweek Copywriting Handbook by Joseph Sugarman',
      'Breakthrough Advertising by Eugene Schwartz',
      'The Boron Letters by Gary Halbert'
    ],
    notesAndInsights: [
      'Tugas utama kalimat pertama adalah membuat pembaca membaca kalimat kedua.',
      'Kejelasan selalu mengalahkan kecerdikan kata-kata (Clarity > Cleverness).'
    ],
    currentProjects: ['Sunmore Coffee Promotional Campaign (Historic)', 'Personal Brand Landing Copy'],
    lastUpdated: 'November 2024'
  },
  {
    id: 'learn-web-tech',
    subject: 'Modern Web & App Development (React, TS, Vite)',
    category: 'Tech & Systems',
    status: 'Practicing',
    statusDescription: 'Membangun aplikasi fungsional, website personal, dan antarmuka web modern dengan TypeScript & Tailwind.',
    whatILearned: 'Component lifecycle, state management, modern CSS layouting (Flexbox/Grid/Tailwind), modular data architecture, responsive design, dan Vercel deployment pipelines.',
    booksAndSources: [
      'Full Stack Open (University of Helsinki)',
      'React & TypeScript Documentation (Official)',
      'Refactoring UI by Adam Wathan & Steve Schoger'
    ],
    notesAndInsights: [
      'Kode yang baik bukan yang paling canggih, melainkan yang paling mudah dipahami dan dimodifikasi oleh diri Anda enam bulan ke depan.',
      'Memisahkan data layer dari presentation layer adalah kunci menjaga ketenangan batin saat membangun web.'
    ],
    currentProjects: ['Personal Portfolio Hub (Active)', 'Personal Finance Tracker Prototype'],
    lastUpdated: 'Februari 2025'
  },
  {
    id: 'learn-ai-workflows',
    subject: 'AI-Assisted Workflows & Prompt Engineering',
    category: 'Tech & Systems',
    status: 'Applied',
    statusDescription: 'Mengintegrasikan model AI sebagai mitra riset, sparring partner logika, dan akselerator coding.',
    whatILearned: 'Few-shot prompting, chain-of-thought structuring, retrieval-augmented brainstorming, dan evaluasi bias pada output model cerdas.',
    booksAndSources: [
      'Prompt Engineering Guides & Anthropic/OpenAI Documentation',
      'Co-Intelligence by Ethan Mollick',
      'Personal Prompt & Iteration Logs'
    ],
    notesAndInsights: [
      'AI mengekspos kemalasan berpikir. Jika instruksi Anda kabur, outputnya adalah sampah terstruktur.',
      'Nilai tambah manusia bukan lagi mengingat fakta, melainkan kurasi rasa, selera, dan integritas konteks.'
    ],
    currentProjects: ['Storytelling Research Prompt Engine', 'Interactive Code Prototyping Pipeline'],
    lastUpdated: 'Januari 2025'
  },
  {
    id: 'learn-finance',
    subject: 'Personal Finance, Cashflow & Value Investing',
    category: 'Finance',
    status: 'Learning',
    statusDescription: 'Mempelajari cara membaca laporan keuangan, alokasi aset defensif, dan psikologi mengelola risiko.',
    whatILearned: 'Konsep margin of safety, compounding interest, pemisahan arus kas pribadi vs bisnis, dan menghindari leverage berlebihan.',
    booksAndSources: [
      'The Psychology of Money by Morgan Housel',
      'The Intelligent Investor by Benjamin Graham',
      'One Up On Wall Street by Peter Lynch'
    ],
    notesAndInsights: [
      'Menjadi kaya adalah tentang menghasilkan uang; tetap kaya adalah tentang mengendalikan ego dan rasa serakah.',
      'Investasi terbaik saat usia muda bukanlah instrumen spekulatif, melainkan peningkatan kapasitas menghasilkan nilai (earning ability).'
    ],
    currentProjects: ['Personal Cashflow Sheet System', 'Expense Ledger Experiment'],
    lastUpdated: 'Oktober 2024'
  },
  {
    id: 'learn-public-speaking',
    subject: 'Public Speaking & Verbal Articulation',
    category: 'Communication',
    status: 'Practicing',
    statusDescription: 'Melatih ritme vokal, intonasi jeda, bahasa tubuh, dan berbicara tanpa mengandalkan teks kaku.',
    whatILearned: 'Teknik pernapasan diafragma, penggunaan keheningan strategis (strategic pauses), eye-contact tracking, dan simplifikasi konsep rumit menjadi analogi membumi.',
    booksAndSources: [
      'Talk Like TED by Carmine Gallo',
      'Steal the Show by Michael Port',
      'Toastmasters & Internal Training Sessions'
    ],
    notesAndInsights: [
      'Orang tidak mengingat slide presentasi Anda; mereka mengingat bagaimana Anda membuat mereka merasa dipahami.',
      'Jeda hening selama 2 detik sebelum menjawab pertanyaan membuat Anda terlihat tenang dan berwibawa, bukan lambat.'
    ],
    currentProjects: ['Internal F&B Briefing Sessions', 'Spontaneous Topic Monologues'],
    lastUpdated: 'Januari 2025'
  },
  {
    id: 'learn-android',
    subject: 'Android Application Prototyping',
    category: 'Tech & Systems',
    status: 'Exploring',
    statusDescription: 'Memahami dasar Kotlin dan Android Studio untuk mengeksplorasi pembuatan aplikasi utilitas sederhana.',
    whatILearned: 'Android layouting dasar, activity lifecycle, emulator testing, dan arsitektur aplikasi mobile sederhana.',
    booksAndSources: [
      'Android Basics in Kotlin (Google Developers)',
      'Official Jetpack Compose Tutorials'
    ],
    notesAndInsights: [
      'Membangun aplikasi mobile membutuhkan kehati-hatian ekstra pada manajemen memori dan batasan baterai perangkat fisik.'
    ],
    currentProjects: ['Habit / Simple Reminder Experiment'],
    lastUpdated: 'September 2024'
  }
];
