const fs = require('fs');
const readline = require('readline');

async function analyze() {
    const fileStream = fs.createReadStream('/Users/ydmacm1/gipkon/natroSon.sql');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let inWpPosts = false;

    console.log('--- PAGES ---');
    const pages = [];
    const posts = [];

    for await (const line of rl) {
        if (line.startsWith('INSERT INTO `wp_posts`')) {
            inWpPosts = true;
        }

        if (inWpPosts) {
            // Regex to capture: ID, post_title, post_type, post_status
            // Layout: INSERT INTO ... VALUES (ID, author, date, date_gmt, content, title ... -> 
            // We need to be careful with capturing title as it might contain commas.
            // But usually titles are simple.
            // Let's assume title is the 6th quoted string? No, that's risky.

            // Let's try to match based on the end of the line (post_type) and work backwards or just match broadly.
            // ID is first number.

            // Matches: (ID, ..., 'Title', ..., 'post_type', ..., 'post_status', ...
            // Let's try to just extract the whole line and split by `',` which is a common separator for SQL strings.

            // Actually, we specifically want to see if we can find titles like "Süt", "Tekstil", "Otomasyon".

            // Regex to match type at the end:
            const typeMatch = line.match(/'(page|post)',\s*'[^']*',\s*\d+\)(?:,|;)$/);

            if (typeMatch) {
                const type = typeMatch[1];

                // Extract ID (start of line after `(`)
                const idMatch = line.match(/^\((\d+),/);
                const id = idMatch ? idMatch[1] : '???';

                // Extract Title
                // Title is after content. Content is the 5th column. Title is 6th.
                // ID(0), author(1), date(2), date_gmt(3), content(4), title(5)
                // If we split by `', '` we might get it right if content doesn't have that pattern.
                // It's risky but let's try a regex for the title.
                // It usually looks like: ... , 'Post Title', ...

                // Let's print the whole line for manual inspection if needed, or try to parse.
                // parsing 10MB file line by line with regex is fine.

                // Attempt to find title: it is the string before the excerpt (which is often empty '').
                // ..., 'Content', 'Title', 'Excerpt', 'Status', ...
                // ..., '...html...', 'Hakkımızda', '', 'publish', ...

                // Let's look for `'publish'` and take the string just before the empty string before it?
                // OR just print the line limited to 200 chars to see the title manually.

                // Better: regex for `..., '([^']*)', '', 'publish', ...`
                // This assumes excerpt is empty.
                const titleMatch = line.match(/,\s*'([^']*)',\s*'',\s*'publish'/);
                let title = titleMatch ? titleMatch[1] : 'UNKNOWN TITLE';

                if (title === 'UNKNOWN TITLE') {
                    // Try finding it earlier.
                    // The date is reliable: '2024-01-01 00:00:00', ...
                    // content follows date_gmt.
                    // (ID, author, 'date', 'date_gmt', 'content', 'title'

                    // We can try to grab the string after the dates.
                    // But content can be huge.

                    // If title is unknown, just print substring to help identify.
                    // title = line.substring(0, 100) + '...';
                }

                if (type === 'page') pages.push({ id, title });
                if (type === 'post') posts.push({ id, title });
            }

            if (line.endsWith(';')) {
                inWpPosts = false;
            }
        }
    }

    console.log('Pages:', pages.length);
    pages.forEach(p => console.log(`PAGE ${p.id}: ${p.title}`));

    console.log('\n--- POSTS ---');
    console.log('Posts:', posts.length);
    posts.forEach(p => console.log(`POST ${p.id}: ${p.title}`));
}

analyze();
