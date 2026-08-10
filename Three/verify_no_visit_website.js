const fs = require('fs');
const path = require('path');

console.log('Verifying removal of "Visit Website" across all files...\n');

let found = false;

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') scanDir(fullPath);
    } else if ((file.endsWith('.html') || file.endsWith('.js')) && file !== 'verify_no_visit_website.js') {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.toLowerCase().includes('visit website')) {
        console.error(`ERROR: "Visit Website" found in ${fullPath}`);
        found = true;
      }
    }
  });
}

scanDir('.');

if (!found) {
  console.log('SUCCESS: "Visit Website" link has been completely removed from all pages!');
}
