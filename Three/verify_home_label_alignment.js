const fs = require('fs');

console.log('Verifying Home text and icon tight alignment in mobile drawer...\n');

let failed = false;

const mobileNavJs = fs.readFileSync('js/mobile-nav.js', 'utf8');

if (!mobileNavJs.includes('mobile-nav-label-group') || !mobileNavJs.includes('gap-2.5')) {
  console.error('ERROR: js/mobile-nav.js is missing labelGroup flex container for Home text and icon!');
  failed = true;
} else {
  console.log('SUCCESS: Home text is tightly grouped with Home icon (gap-2.5) in mobile menu');
}

if (!failed) {
  console.log('\nHome text and icon alignment verified!');
}
