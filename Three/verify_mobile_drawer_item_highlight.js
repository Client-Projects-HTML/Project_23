const fs = require('fs');

console.log('Verifying mobile hamburger menu drawer item click highlighting...\n');

let failed = false;

// 1. Verify js/mobile-nav.js
const mobileNavJs = fs.readFileSync('js/mobile-nav.js', 'utf8');

if (!mobileNavJs.includes('bg-hub-blue/10') || !mobileNavJs.includes('link.addEventListener(\'click\'')) {
  console.error('ERROR: js/mobile-nav.js is missing drawer item active click highlight logic!');
  failed = true;
} else {
  console.log('SUCCESS: js/mobile-nav.js contains active item highlight and click event listeners for mobile drawer');
}

if (!failed) {
  console.log('\nMobile drawer menu item click highlight verification passed successfully!');
}
