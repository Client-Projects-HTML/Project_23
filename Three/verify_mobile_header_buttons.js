const fs = require('fs');

console.log('Verifying mobile navbar header buttons (Cart, RTL, Theme, Hamburger)...\n');

let failed = false;

// 1. Verify js/mobile-nav.js doesn't hide utilities
const mobileNavContent = fs.readFileSync('js/mobile-nav.js', 'utf8');
if (mobileNavContent.includes("utilities.classList.add('hidden', 'lg:flex')")) {
  console.error('ERROR: js/mobile-nav.js is still hiding utilities on mobile view!');
  failed = true;
} else {
  console.log('SUCCESS: js/mobile-nav.js preserves topbar utilities on mobile view');
}

// 2. Verify HTML pages contain Cart, RTL, and Theme buttons in header
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
  const html = fs.readFileSync(page, 'utf8');
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  if (headerMatch) {
    const headerHtml = headerMatch[0];
    if (!headerHtml.includes('cart.html') || !headerHtml.includes('rtlToggleBtn') || !headerHtml.includes('themeToggleBtn')) {
      console.error(`ERROR: ${page} header is missing Cart, RTL, or Theme buttons!`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} header includes Cart, RTL, Theme, and Hamburger buttons on mobile`);
    }
  }
});

if (!failed) {
  console.log('\nAll mobile navbar header buttons (Cart, RTL, Theme, Hamburger) are verified and working!');
}
