const fs = require('fs');
const path = require('path');

console.log('Verifying removal of vertical divider lines and logo size adjustments...\n');

let failed = false;

const pages = [
  'index.html',
  'shop.html',
  'categories.html',
  'deals.html',
  'blog.html',
  'contact.html',
  'cart.html',
  'checkout.html',
  'services.html',
  'track-service.html'
];

pages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/i);
  
  if (headerMatch) {
    const headerHtml = headerMatch[0];
    if (headerHtml.includes('border-l border-r')) {
      console.error(`ERROR: ${page} navbar header still contains vertical divider lines (border-l border-r)!`);
      failed = true;
    } else if (!headerHtml.includes('w-7 h-7 sm:w-10 sm:h-10') || !headerHtml.includes('text-sm sm:text-xl')) {
      console.error(`ERROR: ${page} logo size is not updated to ultra-compact w-7 h-7 / text-sm!`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} navbar has no vertical divider lines and logo size is ultra-compact`);
    }
  }
});

if (!failed) {
  console.log('\nAll pages verified! Vertical divider lines ( | ) removed and brand logo size further decreased!');
}
