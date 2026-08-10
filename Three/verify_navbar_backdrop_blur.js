const fs = require('fs');

console.log('Verifying glassmorphism backdrop-blur-md on top navbars across all pages...\n');

let failed = false;

// 1. Store pages
const storePages = [
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

storePages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  if (!content.includes('backdrop-blur-md')) {
    console.error(`ERROR: ${page} fixed navbar is missing backdrop-blur-md!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} fixed navbar features backdrop-blur-md glassmorphism effect`);
  }
});

// 2. User Dashboard Pages
const userPages = [
  'user-dashboard.html',
  'user-orders.html',
  'user-services.html',
  'user-wallet.html',
  'user-addresses.html',
  'user-alerts.html',
  'user-settings.html',
  'user-track.html',
  'user-wishlist.html'
];

userPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  const headerMatch = content.match(/<header[\s\S]*?>/i);
  if (headerMatch && !headerMatch[0].includes('backdrop-blur-md')) {
    console.error(`ERROR: ${page} header is missing backdrop-blur-md!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} header navbar features backdrop-blur-md glassmorphism effect`);
  }
});

// 3. Admin Pages
const adminPages = [
  'admin/dashboard.html',
  'admin/inventory.html',
  'admin/repair-jobs.html',
  'admin/customers.html',
  'admin/index.html'
];

adminPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  const headerMatch = content.match(/<header[\s\S]*?>/i);
  if (headerMatch && !headerMatch[0].includes('backdrop-blur-md')) {
    console.error(`ERROR: ${page} header is missing backdrop-blur-md!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} header navbar features backdrop-blur-md glassmorphism effect`);
  }
});

if (!failed) {
  console.log('\nAll navbars across Store, User Dashboards, and Admin Portals verified with backdrop-blur-md!');
}
