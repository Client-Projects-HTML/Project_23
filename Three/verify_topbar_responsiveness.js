const fs = require('fs');

console.log('Verifying topbar text sizing and non-wrapping formatting across all pages...\n');

const pages = [
  'index.html',
  'shop.html',
  'categories.html',
  'deals.html',
  'blog.html',
  'home-v2.html',
  'contact.html',
  'services.html',
  'track-service.html',
  'blog-detail.html',
  'blog-detail-2.html',
  'blog-detail-3.html'
];

let failed = false;

pages.forEach(page => {
  if (fs.existsSync(page)) {
    const html = fs.readFileSync(page, 'utf8');
    if (!html.includes('whitespace-nowrap') || !html.includes('text-[11px] sm:text-xs')) {
      console.error(`ERROR: ${page} topbar is missing responsive font size or whitespace-nowrap!`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} topbar has responsive text sizing and no-wrap alignment`);
    }
  }
});

if (!failed) {
  console.log('\nTop Utility Bar text sizing and alignment successfully verified across all pages!');
}
