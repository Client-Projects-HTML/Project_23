const fs = require('fs');
const path = require('path');

console.log('Verifying sticky navbar configurations...\n');

let failed = false;

// 1. Verify Public & User Dashboard Pages
const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

rootFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  const headerMatch = content.match(/<header[^>]*class="([^"]*)"[^>]*>/i);
  
  if (headerMatch) {
    const classes = headerMatch[1];
    if (!classes.includes('sticky') || !classes.includes('top-0')) {
      console.error(`ERROR: ${file} header is missing sticky top-0! Classes: ${classes}`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${file} header is sticky top-0`);
    }
  }
});

// 2. Verify Admin Pages
const adminDir = path.join(rootDir, 'admin');
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const content = fs.readFileSync(path.join(adminDir, file), 'utf8');
  const headerMatch = content.match(/<header[^>]*class="([^"]*)"[^>]*>/i);
  
  if (headerMatch) {
    const classes = headerMatch[1];
    if (!classes.includes('sticky') || !classes.includes('top-0') || !classes.includes('shrink-0')) {
      console.error(`ERROR: admin/${file} header is missing sticky top-0 shrink-0! Classes: ${classes}`);
      failed = true;
    } else {
      console.log(`SUCCESS: admin/${file} header is sticky top-0 shrink-0`);
    }
  }
});

if (!failed) {
  console.log('\nAll navbars across Public, User Dashboard, and Admin Dashboard pages are verified 100% sticky!');
}
