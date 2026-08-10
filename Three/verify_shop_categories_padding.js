const fs = require('fs');

console.log('Verifying top header padding in shop.html and categories.html...\n');

let failed = false;

// 1. shop.html
const shopHtml = fs.readFileSync('shop.html', 'utf8');
if (!shopHtml.includes('pt-32 sm:pt-36 md:pt-40 pb-20 lg:pb-24')) {
  console.error('ERROR: shop.html is missing generous header banner padding!');
  failed = true;
} else {
  console.log('SUCCESS: shop.html has generous top and bottom header banner padding');
}

// 2. categories.html
const catHtml = fs.readFileSync('categories.html', 'utf8');
if (!catHtml.includes('pt-32 sm:pt-36 md:pt-40 pb-20 lg:pb-24')) {
  console.error('ERROR: categories.html is missing generous hero section padding!');
  failed = true;
} else {
  console.log('SUCCESS: categories.html has generous top and bottom hero section padding');
}

if (!failed) {
  console.log('\nBoth Shop and Categories pages verified! Header section padding applied perfectly!');
}
