const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';

console.log('Adding generous top and bottom padding for Shop and Categories header sections...\n');

// 1. shop.html
const shopFile = path.join(rootDir, 'shop.html');
let shopContent = fs.readFileSync(shopFile, 'utf8');

shopContent = shopContent.replace(
  /<!-- HEADER BANNER -->\s*<div class="[^"]*">/i,
  '<!-- HEADER BANNER -->\n  <div class="bg-gradient-to-br from-white via-sky-50 to-sky-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden border-b border-hub-border dark:border-slate-800 z-0 pt-32 sm:pt-36 md:pt-40 pb-20 lg:pb-24">'
);

fs.writeFileSync(shopFile, shopContent, 'utf8');
console.log('UPDATED Header Padding: shop.html');

// 2. categories.html
const catFile = path.join(rootDir, 'categories.html');
let catContent = fs.readFileSync(catFile, 'utf8');

catContent = catContent.replace(
  /<!-- HERO SECTION -->\s*<section class="[^"]*">/i,
  '<!-- HERO SECTION -->\n  <section class="relative bg-gradient-to-b from-slate-900 via-hub-dark to-slate-950 text-white overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-20 lg:pb-24">'
);

fs.writeFileSync(catFile, catContent, 'utf8');
console.log('UPDATED Hero Padding: categories.html');

console.log('\nSuccessfully applied generous header section padding for both shop.html and categories.html.');
