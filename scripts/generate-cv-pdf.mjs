import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'a4'
});

// A4 size in points: 595.28 x 841.89
const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 45;
const contentWidth = pageWidth - margin * 2;

// Colors
const primaryColor = [109, 40, 217]; // #6d28d9 purple
const darkColor = [24, 24, 27]; // #18181b
const grayColor = [82, 82, 91]; // #52525b
const lightBg = [250, 249, 246];
const accentOrange = [234, 88, 12]; // #ea580c

// Helper function: Draw Section Header with amber dash
function drawSectionHeader(doc, title, y) {
  doc.setDrawColor(245, 158, 11); // Amber
  doc.setLineWidth(3);
  doc.line(margin, y - 5, margin + 18, y - 5);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...darkColor);
  doc.text(title, margin + 25, y);
  return y + 15;
}

// Helper function: Draw Role Entry
function drawRoleEntry(doc, title, dateRange, roleCompany, description, y) {
  // Dot marker
  doc.setFillColor(...primaryColor);
  doc.circle(margin + 5, y - 4, 3, 'F');
  
  // Title & Date
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...darkColor);
  doc.text(title, margin + 18, y);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...primaryColor);
  const dateWidth = doc.getTextWidth(dateRange);
  doc.text(dateRange, pageWidth - margin - dateWidth, y);
  
  y += 14;
  
  // Role & Company
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(82, 82, 91);
  doc.text(roleCompany, margin + 18, y);
  
  y += 14;
  
  // Description paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(63, 63, 70);
  const lines = doc.splitTextToSize(description, contentWidth - 18);
  doc.text(lines, margin + 18, y);
  
  const blockHeight = lines.length * 12 + 10;
  return y + blockHeight;
}

// ================= PAGE 1 =================
// Decorative top-left accent bar
doc.setDrawColor(109, 40, 217);
doc.setLineWidth(5);
doc.line(margin, 40, margin, 110);

// Header Name
doc.setFont('helvetica', 'bold');
doc.setFontSize(26);
doc.setTextColor(...primaryColor);
doc.text('RYAN HIDAYAT', margin + 15, 65);
doc.text('TAYLOR', margin + 15, 92);

// Title Pill
doc.setFillColor(15, 23, 42); // slate-900
doc.roundedRect(margin + 15, 105, 175, 20, 10, 10, 'F');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(255, 255, 255);
doc.text('Sales & Business Development', margin + 28, 118);

// Contact Grid (Right-aligned / Column)
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...grayColor);
const contactX = margin + 15;
doc.text('+855 886 772 979', contactX, 142);
doc.text('Banjar, Jawa Barat, ID', contactX + 130, 142);
doc.text('brianbraken123@gmail.com', contactX, 156);
doc.text('linkedin.com/in/ryan-taylor', contactX + 130, 156);

let curY = 190;

// Section: Profil Naratif
curY = drawSectionHeader(doc, 'Profil Naratif', curY);

// Narrative Box with left purple accent
const narrativeText = 'Saya adalah profesional Sales & Business Development yang dibentuk langsung oleh realitas lapangan. Perjalanan saya dimulai dari merintis usaha mandiri di usia muda, belajar dari kegagalan awal untuk bangkit membangun kemitraan bisnis, hingga melakukan door-to-door sales memetakan target pasar. Saat ini, saya dipercaya mengelola operasional dan pelayanan pelanggan multikultural di Kamboja dengan ritme kerja intensif 16 jam per hari. Saya terbiasa membaca karakter, bernegosiasi dengan pemilik warung hingga klien internasional, dan menemukan peluang di segala situasi. Saya memadukan mentalitas hustler ini dengan keterampilan teknis mutakhir (web/app development & digital storytelling) untuk menjadi komunikator persuasif di industri modern.';

doc.setDrawColor(229, 231, 235);
doc.setFillColor(250, 250, 250);
doc.roundedRect(margin, curY, contentWidth, 105, 6, 6, 'FD');

// Left purple border line inside box
doc.setDrawColor(109, 40, 217);
doc.setLineWidth(3);
doc.line(margin + 1, curY + 2, margin + 1, curY + 103);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(39, 39, 42);
const narrativeLines = doc.splitTextToSize(narrativeText, contentWidth - 25);
doc.text(narrativeLines, margin + 14, curY + 16);

curY += 128;

// Section: Perjalanan Karir & Dampak
curY = drawSectionHeader(doc, 'Perjalanan Karir & Dampak', curY);

curY = drawRoleEntry(
  doc,
  'Menjaga Nadi Operasional & Komunikasi',
  'Feb 2024 - Skrg',
  'Captain, Admin & Server F&B | Kamboja',
  'Bekerja di lingkungan bertempo tinggi dengan ritme operasional 16 jam per hari. Bertindak sebagai jembatan komunikasi antara bisnis dan pelanggan multikultural, sekaligus merangkap fungsi administratif dan rotasi dapur. Fleksibilitas dan manajemen stres ini melatih pengambilan keputusan operasional secara cepat dan menjaga standar retensi pelanggan dalam kondisi penuh tekanan.',
  curY
);

curY += 8;

curY = drawRoleEntry(
  doc,
  'Mentalitas Hustler & Ekosistem Digital',
  '2018-20 & 2022-23',
  'Independent Sales & E-commerce Operator | Jawa Barat',
  'Mengasah kemampuan prospecting dengan terjun langsung ke lapangan. Memetakan wilayah dan bernegosiasi dengan >10 toko kelontong/hari untuk membangun jaringan distribusi B2B (2018-2020). Mengadaptasi insting pasar ini ke ranah digital melalui bisnis dropship, memvalidasi produk potensial, dan menangani seluruh siklus transaksi e-commerce secara independen (2022-2023).',
  curY
);

// Footer Page 1
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(161, 161, 170);
doc.text('Ryan Hidayat Taylor - Portfolio & CV', margin, pageHeight - 30);
doc.text('Halaman 1 dari 2', pageWidth - margin - doc.getTextWidth('Halaman 1 dari 2'), pageHeight - 30);


// ================= PAGE 2 =================
doc.addPage('a4', 'portrait');

// Header Page 2
doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.setTextColor(...primaryColor);
doc.text('RYAN HIDAYAT TAYLOR', margin, 45);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...grayColor);
const subHeader = 'Pengalaman Karir (Lanjutan)';
doc.text(subHeader, pageWidth - margin - doc.getTextWidth(subHeader), 45);

doc.setDrawColor(229, 231, 235);
doc.setLineWidth(0.8);
doc.line(margin, 55, pageWidth - margin, 55);

let curY2 = 78;

curY2 = drawRoleEntry(
  doc,
  'Dari Dapur ke Strategi Pemasaran',
  '2021 - 2022',
  'Marketing, Komunikasi & Konsultan Independen | Sunmore Coffee',
  'Memulai karir dari posisi dishwasher. Kemampuan observasi dan komunikasi persuasif membawa saya dipromosikan menjadi waiter, hingga akhirnya dipercaya menangani divisi marketing. Pencapaian ini berlanjut menjadi konsultan independen selama dua bulan, memberikan audit operasional dan rekomendasi produk yang diimplementasikan secara permanen pada menu.',
  curY2
);

curY2 += 8;

curY2 = drawRoleEntry(
  doc,
  'Kemitraan F&B & Eksekusi Lapangan',
  '2017 - 2018',
  'Sales Lapangan | Pasar Kemis, Tangerang',
  'Berkolaborasi dengan rekanan yang bertindak sebagai pemasok untuk menjalankan operasional harian. Fokus penuh pada eksekusi pemenuhan target penjualan langsung (direct sales) dan membangun interaksi pelanggan di lingkungan sekitar.',
  curY2
);

curY2 += 8;

curY2 = drawRoleEntry(
  doc,
  'Negosiasi B2B Peralatan Event',
  '2016 - 2017',
  'Sales Peralatan Multimedia | Banten & Jawa Barat',
  'Melakukan cold-pitching secara proaktif ke pengelola hotel dan penyelenggara acara untuk menawarkan jasa penyewaan alat multimedia. Menyesuaikan pendekatan presentasi dengan skala bisnis calon klien B2B.',
  curY2
);

curY2 += 8;

curY2 = drawRoleEntry(
  doc,
  'Perintis Usaha & Manuver Kemitraan',
  '2014 - 2015',
  'Operator & Kemitraan F&B | Banjar & Bekasi',
  'Membangun mentalitas bisnis dengan merintis usaha kuliner mandiri. Meski menghadapi penutupan usaha dalam dua bulan, pengalaman ini memacu adaptasi cepat; merantau ke Bekasi dan sukses mengamankan kemitraan dengan pemodal lokal untuk mengeksekusi operasional penjualan fried chicken di lapangan.',
  curY2
);

curY2 += 15;

// Section: Kompetensi & Nilai Tambah
curY2 = drawSectionHeader(doc, 'Kompetensi & Nilai Tambah', curY2);
curY2 += 5;

// 4 Skill Cards Grid
const colW = (contentWidth - 16) / 2;
const cardH = 65;

// Card 1: Sales & Bus. Dev.
doc.setDrawColor(167, 139, 250);
doc.setFillColor(245, 243, 255); // purple-50
doc.roundedRect(margin, curY2, colW, cardH, 6, 6, 'FD');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(109, 40, 217);
doc.text('Sales & Bus. Dev.', margin + 12, curY2 + 18);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(75, 85, 99);
const c1Text = 'B2B/B2C Sales, Cold Pitching, Lead Generation, Market Mapping, Direct Selling, Negotiation.';
doc.text(doc.splitTextToSize(c1Text, colW - 24), margin + 12, curY2 + 32);

// Card 2: Customer Relations
const col2X = margin + colW + 16;
doc.setDrawColor(167, 139, 250);
doc.setFillColor(245, 243, 255);
doc.roundedRect(col2X, curY2, colW, cardH, 6, 6, 'FD');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(109, 40, 217);
doc.text('Customer Relations', col2X + 12, curY2 + 18);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(75, 85, 99);
const c2Text = 'Persuasive Communication, Cross-cultural Interaction, Client Retention, Problem Solving.';
doc.text(doc.splitTextToSize(c2Text, colW - 24), col2X + 12, curY2 + 32);

curY2 += cardH + 12;

// Card 3: Tech & Digital Projects
doc.setDrawColor(167, 139, 250);
doc.setFillColor(245, 243, 255);
doc.roundedRect(margin, curY2, colW, cardH, 6, 6, 'FD');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(109, 40, 217);
doc.text('Tech & Digital Projects', margin + 12, curY2 + 18);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(75, 85, 99);
const c3Text = 'React & TypeScript (Web App Deployment), Android Studio, Prompt Engineering, Storytelling.';
doc.text(doc.splitTextToSize(c3Text, colW - 24), margin + 12, curY2 + 32);

// Card 4: Operational Excellence
doc.setDrawColor(167, 139, 250);
doc.setFillColor(245, 243, 255);
doc.roundedRect(col2X, curY2, colW, cardH, 6, 6, 'FD');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(109, 40, 217);
doc.text('Operational Excellence', col2X + 12, curY2 + 18);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(75, 85, 99);
const c4Text = 'High-Stress Time Management, Administrative Efficiency, Resilience & Adaptability.';
doc.text(doc.splitTextToSize(c4Text, colW - 24), col2X + 12, curY2 + 32);

// Footer Page 2
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(161, 161, 170);
doc.text('Ryan Hidayat Taylor - Portfolio & CV', margin, pageHeight - 30);
doc.text('Halaman 2 dari 2', pageWidth - margin - doc.getTextWidth('Halaman 2 dari 2'), pageHeight - 30);

// Save PDF
const outPath = path.resolve(process.cwd(), 'public/Ryan-Hidayat-Taylor-CV.pdf');
const pdfData = doc.output('arraybuffer');
fs.writeFileSync(outPath, Buffer.from(pdfData));
console.log('Successfully generated CV PDF at:', outPath);
