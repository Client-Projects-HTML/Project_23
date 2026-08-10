const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';

console.log('Wrapping top utility bar & header in sticky container for 100% persistent navbar sticky behavior...\n');

let updatedCount = 0;

const publicPages = [
  'index.html',
  'home-v2.html',
  'shop.html',
  'categories.html',
  'deals.html',
  'blog.html',
  'contact.html',
  'cart.html',
  'checkout.html',
  'services.html',
  'track-service.html',
  'blog-detail.html',
  'blog-detail-2.html',
  'blog-detail-3.html',
  'product-detail.html'
];

publicPages.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // If already wrapped in sticky container, skip
  if (content.includes('<div class="sticky top-0 z-50">') || content.includes('<div class="sticky top-0 z-50 shadow-sm">')) {
    console.log(`ALREADY STICKY WRAPPED: ${file}`);
    return;
  }

  // Find start of TOP UTILITY BAR or HEADER
  const topbarRegex = /<!-- TOP UTILITY BAR -->[\s\S]*?<\/header>/g;

  if (topbarRegex.test(content)) {
    content = content.replace(topbarRegex, (match) => {
      // Remove sticky top-0 from internal header class if present
      let cleanMatch = match.replace(/header class="([^"]*?)sticky top-0 z-50([^"]*?)"/g, 'header class="$1$2"');
      cleanMatch = cleanMatch.replace(/header class="([^"]*?)sticky top-0 z-30([^"]*?)"/g, 'header class="$1$2"');
      return `<div class="sticky top-0 z-50 shadow-sm">\n  ${cleanMatch}\n  </div>`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED Sticky Navbar Wrapper: ${file}`);
    updatedCount++;
  }
});

console.log(`\nSuccessfully applied persistent 100% sticky navbar wrapper across ${updatedCount} store pages.`);
