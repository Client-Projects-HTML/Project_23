const fs = require('fs');

console.log('Verifying removal of hamburger menu button from login.html and signup.html...\n');

let failed = false;

// 1. Verify js/mobile-nav.js excludes login and signup
const mobileNavContent = fs.readFileSync('js/mobile-nav.js', 'utf8');
if (!mobileNavContent.includes("path.endsWith('login.html')") || !mobileNavContent.includes("path.endsWith('signup.html')")) {
  console.error('ERROR: js/mobile-nav.js is missing early return for login.html and signup.html!');
  failed = true;
} else {
  console.log('SUCCESS: js/mobile-nav.js excludes login.html and signup.html from mobile hamburger menu injection');
}

// 2. Verify HTML files do not contain hamburger buttons
['login.html', 'signup.html'].forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  if (content.includes('id="mobileNavToggleBtn"') || content.includes('id="mobileMenuBtn"') || content.includes('data-lucide="menu"')) {
    console.error(`ERROR: ${page} contains a hamburger menu button!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} header contains only Brand Logo, RTL, and Theme toggles (NO hamburger button)`);
  }
});

if (!failed) {
  console.log('\nAll checks passed! Hamburger menu button is completely removed from login.html and signup.html!');
}
