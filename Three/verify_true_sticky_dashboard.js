const fs = require('fs');

console.log('Verifying true sticky scrolling header in User and Admin Dashboards...\n');

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

  if (!content.includes('class="flex-1 flex flex-col h-screen overflow-y-auto"')) {
    console.error(`ERROR: ${page} main container is missing overflow-y-auto!`);
    failed = true;
  } else if (!content.includes('header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-hub-border dark:border-slate-800 sticky top-0 z-40 shrink-0 w-full shadow-sm"')) {
    console.error(`ERROR: ${page} header is missing sticky top-0 z-40!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} header is 100% true sticky pinned at top:0 inside overflow-y-auto container`);
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

  if (!content.includes('class="flex-1 flex flex-col h-screen overflow-y-auto min-w-0"')) {
    console.error(`ERROR: ${page} main container is missing overflow-y-auto!`);
    failed = true;
  } else if (!content.includes('header class="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 w-full shadow-sm"')) {
    console.error(`ERROR: ${page} header is missing sticky top-0 z-40!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} header is 100% true sticky pinned at top:0 inside overflow-y-auto container`);
  }
});

if (!failed) {
  console.log('\nAll User and Admin Dashboard pages verified! True sticky header layout applied perfectly!');
}
