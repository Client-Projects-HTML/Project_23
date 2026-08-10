const fs = require('fs');

console.log('Verifying brand logo synchronization across Admin Dashboard pages...\n');

let failed = false;

const adminPages = [
  'admin/dashboard.html',
  'admin/inventory.html',
  'admin/repair-jobs.html',
  'admin/customers.html',
  'admin/index.html'
];

adminPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  if (content.includes('data-lucide="shield-check"') || content.includes('data-lucide="shield"')) {
    console.error(`ERROR: ${page} still contains shield logo icon!`);
    failed = true;
  } else if (!content.includes('data-lucide="wrench"')) {
    console.error(`ERROR: ${page} is missing wrench brand logo icon!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} uses the exact same signature ApplianceHub wrench brand logo`);
  }
});

if (!failed) {
  console.log('\nAll Admin Dashboard pages verified! Brand logo is 100% synchronized across the application!');
}
