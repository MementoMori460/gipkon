const fs = require('fs');
const readline = require('readline');
const path = require('path');

// Mappings from the Implementation Plan
// Post ID -> Sector Slug
const postMapping = {
    // Maden Sektörü
    651: 'maden-sektoru',
    654: 'maden-sektoru',
    661: 'maden-sektoru',
    663: 'maden-sektoru',
    // Gıda Sektörü
    610: 'gida-sektoru',
    612: 'gida-sektoru',
    614: 'gida-sektoru',
    620: 'gida-sektoru',
    616: 'gida-sektoru',
    // Sağlık Sektörü
    622: 'saglik-sektoru',
    624: 'saglik-sektoru',
    626: 'saglik-sektoru',
    628: 'saglik-sektoru',
    // Savunma
    800: 'savunma-sanayi'
};

// Page ID -> Service Slug
const pageMapping = {
    154: 'proje-danismanlik',
    157: 'anahtar-teslim-tesisler',
    160: 'fabrika-revizyonlari',
    169: 'devreye-alma-ve-servis',
    172: 'mekanik-bakim-ve-servis'
};

const extractedProjects = [];
const extractedServices = {};

async function extract() {
    const fileStream = fs.createReadStream('/Users/ydmacm1/gipkon/natroSon.sql');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let inWpPosts = false;

    for await (const line of rl) {
        if (line.startsWith('INSERT INTO `wp_posts`')) {
            inWpPosts = true;
        }

        if (inWpPosts) {
            // Check if this line contains any of our target IDs
            // Line starts with (ID, ...
            // ID match
            const idMatch = line.match(/^\((\d+),/);
            if (!idMatch) continue;

            const id = parseInt(idMatch[1]);

            if (postMapping[id] || pageMapping[id]) {
                // Determine content
                // Content is the 5th column. 
                // Using a more robust regex to capture content: it's the 3rd quoted string.
                // (ID, author, date, date_gmt, 'CONTENT', ...

                // Regex to find 4th comma, then capture until next comma followed by quote? No, strings can have commas.
                // We rely on 'content' being the first very long string.

                // Let's try splitting by `', '` again, but be careful.
                // Or better, find the position of the 4th comma and 5th comma (ignoring quoted commas - hard with simple split).

                // Actually, the content in this SQL seems to be HTML encoded or at least standard SQL string.
                // Let's grab the content using a specific regex for the beginning of the line.
                // `(ID, X, 'DATE', 'DATE', 'CONTENT', 'TITLE'`

                const contentMatch = line.match(/^\(\d+,\s*\d+,\s*'[^']+',\s*'[^']+',\s*'((?:[^']|'')*)',\s*'((?:[^']|'')*)',/);

                if (contentMatch) {
                    let content = contentMatch[1];
                    let title = contentMatch[2];

                    // Unescape SQL
                    content = content.replace(/\\r\\n/g, '\n').replace(/\\"/g, '"').replace(/''/g, "'");

                    // Simple HTML cleanup
                    const plainText = content
                        .replace(/<[^>]+>/g, ' ') // strip tags
                        .replace(/\s+/g, ' ') // normalize whitespace
                        .trim();

                    if (postMapping[id]) {
                        extractedProjects.push({
                            originalId: id,
                            title: title,
                            sector: postMapping[id],
                            description: plainText.substring(0, 200) + '...', // Short desc
                            fullDescription: plainText,
                            // Generated fields
                            slug: title.toLowerCase()
                                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                                .replace(/[^a-z0-9]/g, '-')
                                .replace(/-+/g, '-').replace(/^-|-$/g, ''),
                            image: '/images/projects/placeholder.jpg',
                            year: 2024,
                            features: ["Otomatik Kontrol", "Yüksek Verimlilik", "7/24 Teknik Destek"]
                        });
                    }

                    if (pageMapping[id]) {
                        extractedServices[pageMapping[id]] = {
                            title: title,
                            description: plainText
                        };
                    }
                }
            }
        }
    }

    // Output results
    console.log('--- Extracted Projects ---');
    console.log(JSON.stringify(extractedProjects, null, 2));

    console.log('\n--- Extracted Services Data ---');
    console.log(JSON.stringify(extractedServices, null, 2));

    // Write to a temporary JSON file to be used by the next step
    fs.writeFileSync('extracted_content.json', JSON.stringify({ projects: extractedProjects, services: extractedServices }, null, 2));
}

extract();
