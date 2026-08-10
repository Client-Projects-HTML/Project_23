const fs = require('fs');

console.log('Verifying 100% position: fixed navigation bar across all store pages...\n');

let failed = false;

const pages = [
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
  'track-service.html'
];

pages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  if (!content.includes('fixed top-0 left-0 right-0 w-full z-50')) {
    console.error(`ERROR: ${page} is missing fixed navbar positioning!`);
    failed = true;
  } else if (!content.includes('pt-28') && !content.includes('pt-32') && !content.includes('pt-36')) {
    console.error(`ERROR: ${page} is missing top padding offset for fixed navbar!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} navbar is 100% position: fixed at top:0 left:0 right:0 with proper top padding offset`);
  }
});

if (!failed) {
  console.log('\nAll store pages verified! Navigation bar is 100% position: fixed!');
}
