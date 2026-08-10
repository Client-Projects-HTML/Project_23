const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';

console.log('Adding generous top and bottom padding to hero section in homepage1 and homepage2...\n');

// 1. Homepage 1 (index.html)
const indexFile = path.join(rootDir, 'index.html');
let indexContent = fs.readFileSync(indexFile, 'utf8');

indexContent = indexContent.replace(
  /<section class="relative[^"]*">/i,
  '<section class="relative pt-32 sm:pt-36 md:pt-40 pb-20 lg:pb-32 bg-gradient-to-br from-white via-sky-50 to-sky-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden z-0">'
);

fs.writeFileSync(indexFile, indexContent, 'utf8');
console.log('UPDATED Hero Padding: index.html (Homepage 1)');

// 2. Homepage 2 (home-v2.html)
const homeV2File = path.join(rootDir, 'home-v2.html');
let homeV2Content = fs.readFileSync(homeV2File, 'utf8');

homeV2Content = homeV2Content.replace(
  /<!-- HERO SECTION WITH SLIDER CAROUSEL -->\s*<section class="[^"]*">/i,
  '<!-- HERO SECTION WITH SLIDER CAROUSEL -->\n  <section class="relative bg-slate-900 text-white overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-20 lg:pb-32">'
);

fs.writeFileSync(homeV2File, homeV2Content, 'utf8');
console.log('UPDATED Hero Padding: home-v2.html (Homepage 2)');

console.log('\nSuccessfully added generous hero section padding for both homepage1 and homepage2.');
