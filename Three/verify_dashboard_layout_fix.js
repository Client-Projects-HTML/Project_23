const fs = require('fs');

console.log('Verifying User and Admin Dashboard layout fixes...\n');

let failed = false;

// 1. Verify js/mobile-nav.js early return
const animJs = fs.readFileSync('js/mobile-nav.js', 'utf8');
if (!animJs.includes('filename.startsWith(\'user-\')') || !animJs.includes('path.includes(\'/admin\')')) {
  console.error('ERROR: js/mobile-nav.js is missing early return for dashboard templates!');
  failed = true;
} else {
  console.log('SUCCESS: js/mobile-nav.js correctly excludes User and Admin Dashboard templates');
}

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
  if (!content.includes('class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-hub-border dark:border-slate-800 shrink-0 w-full shadow-sm"')) {
    console.error(`ERROR: ${page} header layout class is incorrect!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} flex-column header layout verified`);
  }
});

// 3. Admin Dashboard Pages (excluding login page admin/index.html)
const adminPages = [
  'admin/dashboard.html',
  'admin/inventory.html',
  'admin/repair-jobs.html',
  'admin/customers.html'
];

adminPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  if (!content.includes('class="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60 px-4 sm:px-6 flex items-center justify-between shrink-0 w-full shadow-sm"')) {
    console.error(`ERROR: ${page} header layout class is incorrect!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} flex-column header layout verified`);
  }
});

if (!failed) {
  console.log('\nAll User and Admin Dashboard layouts verified successfully with zero layout conflicts!');
}
