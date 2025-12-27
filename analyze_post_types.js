const fs = require('fs');
const readline = require('readline');

async function analyze() {
    const fileStream = fs.createReadStream('/Users/ydmacm1/gipkon/natroSon.sql');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let inWpPosts = false;
    const postTypes = {};

    for await (const line of rl) {
        if (line.startsWith('INSERT INTO `wp_posts`')) {
            inWpPosts = true;
        }

        if (inWpPosts) {
            // Processing lines inside wp_posts insert
            // Each line typically starts with "(" if it's a new row in a multi-line insert, 
            // OR it's one huge line.
            // The previous `read_chunk` output showed newlines:
            // (24, ...),
            // (587, ...),

            // We can try to split by "),(" or similar if it's one line, 
            // OR if it's multiple lines, we regex each line.

            // Regex to find 'post_type' (which is the 3rd column from the end)
            // `post_type`, `post_mime_type`, `comment_count`)

            // Example end of line: 'nav_menu_item', '', 0),

            const typeMatch = line.match(/'([^']+)',\s*'[^']*',\s*\d+\)(?:,|;)$/);
            if (typeMatch) {
                const type = typeMatch[1];
                postTypes[type] = (postTypes[type] || 0) + 1;
            }

            if (line.endsWith(';')) {
                inWpPosts = false;
                // If we found the end, we can probably stop scanning or scan for more inserts if split
            }
        }
    }

    console.log('Post Types Found:', postTypes);
}

analyze();
