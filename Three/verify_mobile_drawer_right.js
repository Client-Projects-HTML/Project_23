const fs = require('fs');
const path = require('path');

console.log('Verifying mobile hamburger menu slide-out direction...\n');

let failed = false;

// 1. Verify js/mobile-nav.js
const mobileNavJs = fs.readFileSync('js/mobile-nav.js', 'utf8');
if (!mobileNavJs.includes('inset-y-0 end-0') || !mobileNavJs.includes('translate-x-full')) {
  console.error('ERROR: js/mobile-nav.js drawer is not configured to slide from RIGHT!');
  failed = true;
} else {
  console.log('SUCCESS: js/mobile-nav.js drawer configured to slide in from RIGHT');
}

// 2. Verify user dashboard pages
const rootFiles = fs.readdirSync('.').filter(f => f.startsWith('user-') && f.endsWith('.html'));

rootFiles.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('inset-y-0 end-0') || !html.includes('translate-x-full')) {
    console.error(`ERROR: ${file} mobile sidebar is not opening from RIGHT!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${file} mobile sidebar opens from RIGHT`);
  }
});

// 3. Verify admin dashboard pages
const adminFiles = fs.readdirSync('admin').filter(f => f.endsWith('.html') && f !== 'index.html');

adminFiles.forEach(file => {
  const html = fs.readFileSync(path.join('admin', file), 'utf8');
  if (!html.includes('end-0') || !html.includes('translate-x-full')) {
    console.error(`ERROR: admin/${file} mobile sidebar is not opening from RIGHT!`);
    failed = true;
  } else {
    console.log(`SUCCESS: admin/${file} mobile sidebar opens from RIGHT`);
  }
});

if (!failed) {
  console.log('\nAll hamburger navigation menus across Public, User, and Admin views are verified to open from the RIGHT!');
}
