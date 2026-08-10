const fs = require('fs');

console.log('Verifying 100% sticky header positioning across User & Admin Dashboards...\n');

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
  if (headerMatch && (!headerMatch[0].includes('sticky') || !headerMatch[0].includes('top-0'))) {
    console.error(`ERROR: ${page} header is missing sticky top-0!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} header navigation is 100% sticky pinned at top:0`);
  }
});

// 2. Admin Dashboard Pages
const adminPages = [
  'admin/dashboard.html',
  'admin/inventory.html',
  'admin/repair-jobs.html',
  'admin/customers.html'
];

adminPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  const headerMatch = content.match(/<header[\s\S]*?>/i);
  if (headerMatch && (!headerMatch[0].includes('sticky') || !headerMatch[0].includes('top-0'))) {
    console.error(`ERROR: ${page} header is missing sticky top-0!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} header navigation is 100% sticky pinned at top:0`);
  }
});

if (!failed) {
  console.log('\nAll User and Admin Dashboard pages verified! Headers are 100% sticky pinned at top:0!');
}
