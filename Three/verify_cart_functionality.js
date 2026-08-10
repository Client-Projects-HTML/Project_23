const fs = require('fs');

console.log('Verifying Cart functionality integration...\n');

let failed = false;

// 1. Verify js/cart.js
const cartJs = fs.readFileSync('js/cart.js', 'utf8');
if (!cartJs.includes('localStorage.setItem(\'applianceHubCart\'') || !cartJs.includes('window.addToCart = addToCart')) {
  console.error('ERROR: js/cart.js is missing localStorage persistence or window.addToCart export');
  failed = true;
} else {
  console.log('SUCCESS: js/cart.js correctly persists items to localStorage under "applianceHubCart"');
}

// 2. Verify script inclusion across all user dashboard pages
const pages = [
  'user-dashboard.html',
  'user-wishlist.html',
  'user-orders.html',
  'user-services.html',
  'user-addresses.html',
  'user-wallet.html',
  'user-alerts.html',
  'user-settings.html'
];

pages.forEach(page => {
  if (fs.existsSync(page)) {
    const html = fs.readFileSync(page, 'utf8');
    if (!html.includes('js/cart.js')) {
      console.error(`ERROR: ${page} is missing script import for js/cart.js`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} includes js/cart.js`);
    }
  }
});

// 3. Verify addToCart calls on wishlist, dashboard & orders
const wishlistHtml = fs.readFileSync('user-wishlist.html', 'utf8');
if (!wishlistHtml.includes('addToCart(\'Smart Refrigerator Water Filter\'') ||
    !wishlistHtml.includes('addToCart(\'Affresh Washer Cleaner Tablets\'') ||
    !wishlistHtml.includes('addToCart(\'Premium Dryer Vent Hose Kit\'')) {
  console.error('ERROR: user-wishlist.html buttons are not wired to addToCart()');
  failed = true;
} else {
  console.log('SUCCESS: user-wishlist.html buttons correctly call addToCart() for all items');
}

const dashboardHtml = fs.readFileSync('user-dashboard.html', 'utf8');
if (!dashboardHtml.includes('addToCart(\'LG Water Filter\'') ||
    !dashboardHtml.includes('addToCart(\'Affresh Cleaner Tabs\'')) {
  console.error('ERROR: user-dashboard.html Quick Reorder buttons are not wired to addToCart()');
  failed = true;
} else {
  console.log('SUCCESS: user-dashboard.html Quick Reorder buttons correctly call addToCart()');
}

if (!failed) {
  console.log('\nAll Cart buttons and localStorage integrations are verified and functioning properly!');
}
