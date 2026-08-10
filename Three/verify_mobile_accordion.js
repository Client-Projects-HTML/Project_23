const fs = require('fs');

console.log('Verifying Home dropdown accordion behavior in mobile navigation drawer...\n');

let failed = false;

const mobileNavJs = fs.readFileSync('js/mobile-nav.js', 'utf8');

if (!mobileNavJs.includes("dropdownMenu.className = 'hidden") || !mobileNavJs.includes("dropdownMenu.classList.remove('hidden')")) {
  console.error('ERROR: js/mobile-nav.js Home dropdown is not collapsed by default or missing click toggle!');
  failed = true;
} else {
  console.log('SUCCESS: Home dropdown in mobile menu is collapsed by default and expands on click');
}

if (!failed) {
  console.log('\nMobile navigation drawer Home dropdown accordion verified!');
}
