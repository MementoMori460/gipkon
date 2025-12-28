const fs = require('fs');
const path = require('path');

// Helper to create directory
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// SVG Templates
const createSvg = (width, height, color1, color2, text, subtext = "") => {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1" opacity="0.1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <rect width="100%" height="100%" fill="url(#grid)" />
  <text x="50%" y="45%" font-family="Arial, sans-serif" font-weight="bold" font-size="${width / 15}" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="${width / 25}" fill="white" fill-opacity="0.8" text-anchor="middle" dominant-baseline="middle">${subtext}</text>
</svg>`;
};

// Configurations
const assets = {
    hero: [
        { name: 'slider1', text: 'ENDÜSTRİYEL OTOMASYON', subtext: 'Geleceğin Teknolojisi', c1: '#0f172a', c2: '#1e40af' },
        { name: 'slider2', text: 'MÜHENDİSLİK ÇÖZÜMLERİ', subtext: 'Profesyonel Yaklaşım', c1: '#1e3a8a', c2: '#3b82f6' },
        { name: 'slider3', text: 'ANAHTAR TESLİM PROJE', subtext: 'uçtan Uca Hizmet', c1: '#0284c7', c2: '#0ea5e9' }
    ],
    sectors: [
        { name: 'gida-sektoru', text: 'GIDA SEKTÖRÜ', subtext: 'Hijyenik Prosesler', c1: '#166534', c2: '#22c55e' }, // Green
        { name: 'tekstil-sektoru', text: 'TEKSTİL SEKTÖRÜ', subtext: 'Hassas Kontrol', c1: '#9f1239', c2: '#f43f5e' }, // Rose
        { name: 'saglik-sektoru', text: 'SAĞLIK SEKTÖRÜ', subtext: 'GMP Standartları', c1: '#0891b2', c2: '#06b6d4' }, // Cyan
        { name: 'kimya-sektoru', text: 'KİMYA SEKTÖRÜ', subtext: 'Güvenli Üretim', c1: '#7c2d12', c2: '#f97316' }, // Orange
        { name: 'ilac-sektoru', text: 'İLAÇ SEKTÖRÜ', subtext: 'Validasyonlu Sistemler', c1: '#4c1d95', c2: '#8b5cf6' }, // Violet
        { name: 'kozmetik-sektoru', text: 'KOZMETİK SEKTÖRÜ', subtext: 'Hassas Dozajlama', c1: '#be185d', c2: '#ec4899' }, // Pink
        { name: 'enerji-sektoru', text: 'ENERJİ SEKTÖRÜ', subtext: 'Verimlilik & İzleme', c1: '#eab308', c2: '#facc15' }, // Yellow/Gold
        { name: 'maden-sektoru', text: 'MADEN SEKTÖRÜ', subtext: 'Ağır Sanayi Çözümleri', c1: '#422006', c2: '#78350f' }, // Brown
        { name: 'savunma-sanayi', text: 'SAVUNMA SANAYİ', subtext: 'Yüksek Teknoloji', c1: '#172554', c2: '#1e3a8a' } // Dark Blue
    ]
};

// Execution
const publicDir = path.join(__dirname, 'public/images');
ensureDir(path.join(publicDir, 'hero'));
ensureDir(path.join(publicDir, 'sectors'));
ensureDir(path.join(publicDir, 'projects'));
ensureDir(path.join(publicDir, 'references'));

console.log('Generating Hero Images...');
assets.hero.forEach(item => {
    const svg = createSvg(1920, 1080, item.c1, item.c2, item.text, item.subtext);
    fs.writeFileSync(path.join(publicDir, 'hero', `${item.name}.svg`), svg);
});

console.log('Generating Sector Images...');
assets.sectors.forEach(item => {
    const svg = createSvg(800, 600, item.c1, item.c2, item.text, item.subtext);
    fs.writeFileSync(path.join(publicDir, 'sectors', `${item.name}.svg`), svg);
});

console.log('Generating Project Placeholder...');
const projectSvg = createSvg(800, 600, '#374151', '#6b7280', 'PROJE DETAYI', 'Gipkon Teknoloji');
fs.writeFileSync(path.join(publicDir, 'projects', 'placeholder.svg'), projectSvg);

console.log('Done!');
