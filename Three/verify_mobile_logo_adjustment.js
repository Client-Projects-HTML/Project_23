const fs = require('fs');
const path = require('path');

console.log('Verifying mobile logo and navbar layout adjustments...\n');

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
  if (!content.includes('w-8 h-8 sm:w-10 sm:h-10') || !content.includes('text-base sm:text-xl')) {
    console.error(`ERROR: ${page} does not have responsive logo sizing!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} logo size and text are dynamically adjusted for mobile view`);
  }
});

if (!failed) {
  console.log('\nAll pages verified! Mobile logo text and icon sizes are perfectly adjusted and responsive!');
}
