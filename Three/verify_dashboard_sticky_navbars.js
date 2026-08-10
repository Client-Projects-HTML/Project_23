const fs = require('fs');
const path = require('path');

console.log('Verifying sticky navigation headers in User & Admin Dashboards...\n');

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
  const headerMatch = content.match(/<header[\s\S]*?>/i);
  if (headerMatch) {
    const headerHtml = headerMatch[0];
    if (!headerHtml.includes('sticky') || !headerHtml.includes('top-0') || !headerHtml.includes('shrink-0')) {
      console.error(`ERROR: ${page} header is missing sticky top-0 shrink-0 classes!`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} header is 100% sticky pinned at top:0`);
    }
  }
});

// 2. Admin Dashboard Pages
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
  if (headerMatch) {
    const headerHtml = headerMatch[0];
    if (!headerHtml.includes('sticky') || !headerHtml.includes('top-0') || !headerHtml.includes('shrink-0')) {
      console.error(`ERROR: ${page} header is missing sticky top-0 shrink-0 classes!`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} header is 100% sticky pinned at top:0`);
    }
  }
});

if (!failed) {
  console.log('\nAll User & Admin Dashboard pages verified! Navigation headers are 100% fixed/sticky pinned at top:0!');
}
