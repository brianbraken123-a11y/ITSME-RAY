import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09070f" />
      <stop offset="45%" stop-color="#120d24" />
      <stop offset="100%" stop-color="#0a0a0c" />
    </linearGradient>

    <!-- Purple to Indigo Ambient Mesh -->
    <radialGradient id="purpleMesh" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#4f46e5" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
    </radialGradient>

    <!-- Warm Amber Glow Mesh -->
    <radialGradient id="amberMesh" cx="85%" cy="65%" r="55%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35" />
      <stop offset="45%" stop-color="#b45309" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#b45309" stop-opacity="0" />
    </radialGradient>

    <!-- Indigo Center Accent -->
    <radialGradient id="centerIndigo" cx="50%" cy="50%" r="40%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
    </radialGradient>

    <!-- Text Gradients -->
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#f5f3ff" />
      <stop offset="100%" stop-color="#fed7aa" />
    </linearGradient>

    <linearGradient id="rayLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>

    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
    </linearGradient>

    <!-- Shadow filters -->
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6" />
    </filter>
    <filter id="glowRay" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- 1. Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- 2. Ambient Lighting Orbs -->
  <rect width="1200" height="630" fill="url(#purpleMesh)" />
  <rect width="1200" height="630" fill="url(#amberMesh)" />
  <rect width="1200" height="630" fill="url(#centerIndigo)" />

  <!-- 3. Fine Grid Pattern overlay for tech/modern craftsmanship aesthetic -->
  <g opacity="0.07" stroke="#ffffff" stroke-width="1">
    <line x1="80" y1="0" x2="80" y2="630" />
    <line x1="240" y1="0" x2="240" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="560" y1="0" x2="560" y2="630" />
    <line x1="720" y1="0" x2="720" y2="630" />
    <line x1="880" y1="0" x2="880" y2="630" />
    <line x1="1040" y1="0" x2="1040" y2="630" />
    <line x1="0" y1="90" x2="1200" y2="90" />
    <line x1="0" y1="210" x2="1200" y2="210" />
    <line x1="0" y1="330" x2="1200" y2="330" />
    <line x1="0" y1="450" x2="1200" y2="450" />
    <line x1="0" y1="570" x2="1200" y2="570" />
  </g>

  <!-- 4. Subtle Outer Border -->
  <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="#a78bfa" stroke-width="1" stroke-opacity="0.18" />

  <!-- 5. Header / Brand Top Row -->
  <g transform="translate(80, 80)">
    <!-- Pill badge -->
    <rect x="0" y="0" width="280" height="38" rx="19" fill="#1e1b4b" stroke="#6366f1" stroke-width="1" stroke-opacity="0.4" />
    <circle cx="20" cy="19" r="5" fill="#f59e0b" />
    <text x="36" y="24" font-family="Plus Jakarta Sans, system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#c7d2fe" letter-spacing="1.5">PERSONAL ARCHIVE &amp; PORTFOLIO</text>
  </g>

  <!-- URL on top right -->
  <g transform="translate(890, 80)">
    <text x="230" y="25" text-anchor="end" font-family="Space Grotesk, monospace, sans-serif" font-size="15" font-weight="500" fill="#a1a1aa" letter-spacing="0.5">itsme-ray.vercel.app</text>
  </g>

  <!-- 6. Central Hero Content -->
  <g transform="translate(80, 180)">
    <!-- Main Big Name: Ray -->
    <text x="0" y="90" font-family="Plus Jakarta Sans, system-ui, -apple-system, sans-serif" font-size="92" font-weight="800" fill="url(#titleGrad)" letter-spacing="-1">
      Ray
      <tspan fill="#f59e0b">.</tspan>
    </text>

    <!-- Subtitle / Identity Statement -->
    <text x="4" y="152" font-family="Newsreader, Georgia, serif" font-size="34" font-style="italic" font-weight="400" fill="#e4e4e7">
      Storyteller, Communicator, Learner &amp; Builder
    </text>

    <!-- Narrative Description -->
    <text x="4" y="205" font-family="Plus Jakarta Sans, system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#a1a1aa" letter-spacing="0.2">
      An archive of deep essays, psychology &amp; human behavior notes, career journeys,
    </text>
    <text x="4" y="235" font-family="Plus Jakarta Sans, system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#a1a1aa" letter-spacing="0.2">
      and creative web experiments by Ryan Hidayat Taylor.
    </text>

    <!-- Bottom Category Tags -->
    <g transform="translate(4, 280)">
      <!-- Tag 1: Stories & Essays -->
      <g transform="translate(0, 0)">
        <rect width="180" height="42" rx="10" fill="#ffffff" fill-opacity="0.06" stroke="#7c3aed" stroke-width="1" stroke-opacity="0.5" />
        <text x="90" y="26" text-anchor="middle" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="14" font-weight="600" fill="#ddd6fe">✦ Stories &amp; Essays</text>
      </g>

      <!-- Tag 2: Psychology & Thought -->
      <g transform="translate(196, 0)">
        <rect width="210" height="42" rx="10" fill="#ffffff" fill-opacity="0.06" stroke="#6366f1" stroke-width="1" stroke-opacity="0.5" />
        <text x="105" y="26" text-anchor="middle" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="14" font-weight="600" fill="#c7d2fe">✦ Philosophy &amp; Mind</text>
      </g>

      <!-- Tag 3: Projects & Code -->
      <g transform="translate(422, 0)">
        <rect width="190" height="42" rx="10" fill="#ffffff" fill-opacity="0.06" stroke="#f59e0b" stroke-width="1" stroke-opacity="0.5" />
        <text x="95" y="26" text-anchor="middle" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="14" font-weight="600" fill="#fde68a">✦ Works &amp; Archive</text>
      </g>
    </g>
  </g>

  <!-- 7. Right Side Visual Badge / Monogram Shield -->
  <g transform="translate(860, 180)" filter="url(#cardShadow)">
    <!-- Card Frame -->
    <rect width="260" height="330" rx="24" fill="url(#cardGrad)" stroke="#a78bfa" stroke-width="1.5" stroke-opacity="0.3" />
    
    <!-- Inner Accent Glow -->
    <circle cx="130" cy="130" r="70" fill="url(#purpleMesh)" opacity="0.8" />

    <!-- Monogram Circle -->
    <g transform="translate(70, 70)">
      <circle cx="60" cy="60" r="54" fill="#18142a" stroke="url(#rayLogoGrad)" stroke-width="2.5" />
      <text x="60" y="78" text-anchor="middle" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="52" font-weight="800" fill="url(#titleGrad)">R</text>
    </g>

    <!-- Card Text -->
    <text x="130" y="235" text-anchor="middle" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="18" font-weight="700" fill="#ffffff" letter-spacing="0.5">Ryan H. Taylor</text>
    <text x="130" y="260" text-anchor="middle" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="13" font-weight="500" fill="#f59e0b" letter-spacing="1">COMMUNICATOR &amp; WRITER</text>
    
    <!-- Mini status indicator -->
    <g transform="translate(68, 282)">
      <rect width="124" height="26" rx="13" fill="#0c0a09" fill-opacity="0.8" stroke="#22c55e" stroke-width="1" stroke-opacity="0.4" />
      <circle cx="16" cy="13" r="4" fill="#22c55e" />
      <text x="28" y="17" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="11" font-weight="600" fill="#86efac">Open for Ideas</text>
    </g>
  </g>
</svg>
`;

async function generate() {
  const buffer = Buffer.from(svg);
  
  // 1. Output JPG (1200x630, quality 92)
  await sharp(buffer)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(path.resolve('./public/og-image.jpg'));
  console.log('Created public/og-image.jpg');

  // 2. Output PNG (1200x630, high quality)
  await sharp(buffer)
    .png({ compressionLevel: 8 })
    .toFile(path.resolve('./public/og-image.png'));
  console.log('Created public/og-image.png');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
