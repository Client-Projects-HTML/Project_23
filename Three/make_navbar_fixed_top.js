const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';

console.log('Converting navigation bar to 100% position: fixed across all store pages...\n');

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

  // Replace sticky navbar container with fixed navbar container
  content = content.replace(/<div class="sticky top-0 z-50 shadow-sm">/g, '<div class="fixed top-0 left-0 right-0 w-full z-50 shadow-md">');
  content = content.replace(/<div class="sticky top-0 z-50">/g, '<div class="fixed top-0 left-0 right-0 w-full z-50 shadow-md">');

  // Add pt-28 sm:pt-32 offset to section/main directly after fixed navbar if not already present
  content = content.replace(/<\/header>\s*<\/div>\s*<section class="/g, '</header>\n  </div>\n\n  <section class="pt-28 sm:pt-32 ');
  content = content.replace(/<\/header>\s*<\/div>\s*<main class="/g, '</header>\n  </div>\n\n  <main class="pt-28 sm:pt-32 ');
  content = content.replace(/<\/header>\s*<\/div>\s*<div class="bg-/g, '</header>\n  </div>\n\n  <div class="pt-28 sm:pt-32 bg-');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED Fixed Navbar: ${file}`);
  updatedCount++;
});

console.log(`\nSuccessfully converted navbar to 100% position: fixed across ${updatedCount} pages.`);
