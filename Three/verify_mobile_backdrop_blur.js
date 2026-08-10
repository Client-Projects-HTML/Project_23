const fs = require('fs');

console.log('Verifying mobile hamburger menu backdrop blur overlay...\n');

let failed = false;

// 1. js/mobile-nav.js
const mobileNavJs = fs.readFileSync('js/mobile-nav.js', 'utf8');
if (!mobileNavJs.includes('backdrop-blur-md')) {
  console.error('ERROR: js/mobile-nav.js is missing backdrop-blur-md!');
  failed = true;
} else {
  console.log('SUCCESS: js/mobile-nav.js contains backdrop-blur-md for Public Store pages');
}

// 2. User Dashboard Pages
const userPages = [
  'user-dashboard.html',
  'user-orders.html',
  'user-services.html',
  'user-wallet.html',
  'user-addresses.html',
  'user-alerts.html',
  'user-settings.html',
  'user-track.html',
  'user-wishlist.html'
];

userPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  if (!content.includes('id="mobileSidebarBackdrop"') || !content.includes('backdrop-blur-md')) {
    console.error(`ERROR: ${page} backdrop is missing backdrop-blur-md!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} mobile backdrop features backdrop-blur-md glassmorphism effect`);
  }
});

if (!failed) {
  console.log('\nAll mobile hamburger menu backdrops verified with rich backdrop-blur-md glassmorphism effect!');
}
