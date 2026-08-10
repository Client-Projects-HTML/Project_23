const fs = require('fs');

console.log('Verifying hero section padding in Homepage 1 and Homepage 2...\n');

let failed = false;

// 1. Homepage 1 (index.html)
const indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('pt-32 sm:pt-36 md:pt-40 pb-20 lg:pb-32')) {
  console.error('ERROR: index.html (Homepage 1) is missing generous hero section padding!');
  failed = true;
} else {
  console.log('SUCCESS: index.html (Homepage 1) has generous top and bottom hero section padding');
}

// 2. Homepage 2 (home-v2.html)
const homeV2Html = fs.readFileSync('home-v2.html', 'utf8');
if (!homeV2Html.includes('pt-32 sm:pt-36 md:pt-40 pb-20 lg:pb-32')) {
  console.error('ERROR: home-v2.html (Homepage 2) is missing generous hero section padding!');
  failed = true;
} else {
  console.log('SUCCESS: home-v2.html (Homepage 2) has generous top and bottom hero section padding');
}

if (!failed) {
  console.log('\nBoth Homepage 1 and Homepage 2 verified! Hero section padding applied perfectly!');
}
