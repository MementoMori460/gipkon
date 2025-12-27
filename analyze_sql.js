const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'natroSon.sql');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Find the INSERT INTO `wp_posts` line
const insertStart = fileContent.indexOf('INSERT INTO `wp_posts`');
if (insertStart === -1) {
    console.log('No wp_posts found');
    process.exit(1);
}

// Extract the values part (simplified parsing, assuming standard mysqldump format)
// mysqldump usually puts all values in one huge statement or multiple statements.
// We'll look for lines starting with "(" within the insert block or parse the big string.

// A safer simplistic approach for a 10MB file:
// Regex to match (ID, author, date, date_gmt, content, title, ..., post_type, ...)
// The schema of wp_posts varies but usually:
// ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count

// We will try to regex match basic info: ID, post_title, post_type, post_status
// Values are typically quoted.

const regex = /\((\d+),\s*\d+,\s*'[^']+',\s*'[^']+',\s*'((?:[^']|'')*)',\s*'((?:[^']|'')*)',/g;
// actually parsing SQL with regex is fragile. 

// Let's just dump the Titles and Types if possible. 
// We know `post_type` is near the end. `post_status` is somewhere in the middle.

// Let's try to find patterns like: 'publish', 'page' or 'publish', 'post'
const matches = fileContent.matchAll(/'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'/g);

// The columns are too many.

// Better approach: Split by `),(` and analyze.
const insertStatement = fileContent.substring(insertStart, insertStart + 10000000); // Read a large chunk
const endOfInsert = insertStatement.indexOf(';');
const valuesPart = insertStatement.substring(insertStatement.indexOf('VALUES') + 6, endOfInsert);

const rows = valuesPart.split('),(');

console.log(`Found approximately ${rows.length} rows.`);

rows.forEach((row, index) => {
    // Basic cleanup of the row string to simulate array
    // This is rough but might work for simple analysis
    // Columns (standard WP): 0:ID, ..., 4:content, 5:title, ..., 7:status, ..., 20:type (approx)

    // We can just search for the strings 'post', 'page', 'attachment', etc in the row
    let type = 'unknown';
    if (row.includes("'page'")) type = 'page';
    else if (row.includes("'post'")) type = 'post';
    else if (row.includes("'attachment'")) type = 'attachment';
    else if (row.includes("'nav_menu_item'")) type = 'nav_menu_item';
    else if (row.includes("'revision'")) type = 'revision';
    else {
        // extract type from end
        const parts = row.split(",");
        // post_type is usually around 20th index
        // let's print the last few parts
        // console.log(parts.slice(-5));
        type = 'custom: ' + parts[parts.length - 3]; // often near end
    }

    if (type === 'revision' || type === 'nav_menu_item' || type === 'attachment') return;

    // extract title - usually 6th element BUT content (5th) can have commas.
    // relying on 'publish' status
    if (!row.includes("'publish'")) return;

    // Try to extract title carefully: it's usually between the post_content and excerpt/status
    // ID, author, date, date_gmt, CONTENT, TITLE, EXCERPT, STATUS
    // Content can be huge. Title is usually short.

    console.log(`Row ${index}: Type: ${type}`);
    // console.log(row.substring(0, 200) + '...'); 
});
