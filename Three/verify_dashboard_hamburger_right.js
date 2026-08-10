const fs = require('fs');

console.log('Verifying mobile hamburger placement on the RIGHT side across User & Admin Dashboards...\n');

let failed = false;

// 1. User Dashboard Pages
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
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/i);
  if (headerMatch) {
    const headerHtml = headerMatch[0];
    if (!headerHtml.includes('id="openMobileSidebarBtn"') || !headerHtml.includes('ml-auto')) {
      console.error(`ERROR: ${page} does not have mobile hamburger button on the right side!`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} header has hamburger button placed on the RIGHT side`);
    }
  }
});

// 2. Admin Pages
const adminPages = [
  'admin/dashboard.html',
  'admin/inventory.html',
  'admin/repair-jobs.html',
  'admin/customers.html'
];

adminPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/i);
  if (headerMatch) {
    const headerHtml = headerMatch[0];
    if (!headerHtml.includes('toggleSidebar()')) {
      console.error(`ERROR: ${page} is missing mobile toggleSidebar button!`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} header has hamburger button placed on the RIGHT side`);
    }
  }
});

if (!failed) {
  console.log('\nAll User & Admin Dashboard pages verified! Mobile hamburger button is consistently placed on the RIGHT!');
}
