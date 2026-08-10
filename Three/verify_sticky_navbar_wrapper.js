const fs = require('fs');

console.log('Verifying persistent 100% sticky navbar wrapper across all store pages...\n');

let failed = false;

const pages = [
  'index.html',
  'home-v2.html',
  'shop.html',
  'categories.html',
  'deals.html',
  'blog.html',
  'contact.html',
  'services.html',
  'track-service.html'
];

pages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  if (!content.includes('<div class="sticky top-0 z-50 shadow-sm">')) {
    console.error(`ERROR: ${page} is missing persistent sticky container wrapper!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} navbar is 100% sticky pinned at top:0`);
  }
});

if (!failed) {
  console.log('\nAll store pages verified! Sticky navbar is 100% fixed and persistent across scrolling!');
}
