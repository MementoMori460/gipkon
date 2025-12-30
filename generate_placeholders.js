const fs = require('fs');
const path = require('path');

const references = [
    { name: 'Gemak', file: 'gemak.png', color: '#1a365d' },
    { name: 'ROKETSAN', file: 'roketsan.png', color: '#002855' },
    { name: 'Smart Proses', file: 'smart-proses.png', color: '#2d3748' },
    { name: 'Neosis', file: 'neosis.png', color: '#2b6cb0' },
    { name: 'Eti Gıda', file: 'eti.png', color: '#c53030' },
    { name: 'Çamlıca', file: 'camlica.png', color: '#2f855a' },
    { name: 'Altın Köy', file: 'altin-koy.png', color: '#d69e2e' },
    { name: 'Amak Co.', file: 'amak.png', color: '#4a5568' }
];

const dir = path.join(process.cwd(), 'public/images/references');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

references.forEach(ref => {
    // Note: We are saving as .png in name to match database, but writing SVG content.
    // Browsers often handle mismatched extensions if headers are right, but for static files this might be an issue.
    // Ideally we should update DB to .svg, OR use sharp to convert.
    // Since I can't easily use sharp without install issues sometimes, let's try to update DB to .svg first?
    // User wants "restore", so updating DB is acceptable.
    // ACTUALLY: The user's code expects the exact filename in database.
    // Let's create SVGs but name them .svg and UPDATE the json to point to .svg

    const svgContent = `
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <rect width="100%" height="100%" fill="${ref.color}" opacity="0.1"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="${ref.color}" dominant-baseline="middle" text-anchor="middle">
    ${ref.name}
  </text>
  <rect x="10" y="10" width="380" height="180" stroke="${ref.color}" stroke-width="5" fill="none" opacity="0.5" rx="20"/>
</svg>`;

    const svgFilename = ref.file.replace('.png', '.svg');
    fs.writeFileSync(path.join(dir, svgFilename), svgContent.trim());
    console.log(`Generated ${svgFilename}`);
});
