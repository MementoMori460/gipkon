const fs = require('fs');
const path = require('path');

// 1. Read the extracted content
const extractedData = JSON.parse(fs.readFileSync('extracted_content.json', 'utf8'));

// 2. Read existing projects and services
const projectsPath = path.join(__dirname, 'data/projects.json');
const servicesPath = path.join(__dirname, 'data/services.json');

const currentProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
const currentServices = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

// 3. Helper to clean text
function cleanText(text) {
    if (!text) return "";
    return text
        .replace(/\[siteorigin_widget[^\]]*\].*?\[\/siteorigin_widget\]/gs, '') // Remove widget shortcodes
        .replace(/\\n/g, '\n')
        .replace(/\s+/g, ' ')
        .trim();
}

// 4. Merge Projects
// We append new projects to the current list.
// We map extracted sector names to our schema if needed, but they seem correct based on extract_content.js
let maxId = currentProjects.reduce((max, p) => Math.max(max, p.id), 0);

extractedData.projects.forEach(p => {
    // Check if duplicate by slug
    if (currentProjects.find(cp => cp.slug === p.slug)) return;

    maxId++;
    const cleanDesc = cleanText(p.fullDescription);
    const shortDesc = cleanDesc.length > 150 ? cleanDesc.substring(0, 150) + '...' : cleanDesc;

    currentProjects.push({
        id: maxId,
        title: p.title,
        slug: p.slug,
        sector: p.sector,
        client: "Gipkon Müşterisi", // Placeholder
        location: "Türkiye",
        year: p.year,
        description: shortDesc || p.description, // Fallback if cleaning removed everything
        fullDescription: cleanDesc || p.fullDescription,
        image: p.image,
        gallery: [],
        features: p.features,
        technologies: ["Automation", "SCADA", "Process Control"]
    });
});

// 5. Merge Services
// We update descriptions of existing services
Object.keys(extractedData.services).forEach(slug => {
    const extractedService = extractedData.services[slug];
    const serviceIndex = currentServices.findIndex(s => s.slug === slug);

    if (serviceIndex !== -1) {
        let cleanDesc = cleanText(extractedService.description);

        // If the description became empty due to shortcode removal (some pages were only widgets), keep original Lorem Ipsum for now or use title
        if (cleanDesc.length < 10) {
            console.log(`Warning: Service ${slug} has empty content after cleaning. Keeping original.`);
        } else {
            currentServices[serviceIndex].description = cleanDesc;
            currentServices[serviceIndex].details.overview = cleanDesc; // Update overview too
        }
    }
});

// 6. Save back
fs.writeFileSync(projectsPath, JSON.stringify(currentProjects, null, 4));
fs.writeFileSync(servicesPath, JSON.stringify(currentServices, null, 4));

console.log(`Merged ${extractedData.projects.length} extracted projects.`);
console.log('Updated services data.');
