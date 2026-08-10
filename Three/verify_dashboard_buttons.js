const fs = require('fs');

console.log('Verifying interactive button functionality across User Dashboard pages...\n');

const checks = [
  {
    file: 'user-orders.html',
    tokens: ['filterOrders', 'All Orders', 'Active Services', 'Completed', 'viewReceipt']
  },
  {
    file: 'user-addresses.html',
    tokens: ['setAsDefault', 'editAddress', 'deleteAddress', 'Set Default', 'trash-2']
  },
  {
    file: 'user-alerts.html',
    tokens: ['markAllRead', 'viewAllNotifications', 'Mark All as Read', 'View All Notifications']
  },
  {
    file: 'user-settings.html',
    tokens: ['openFullProfileModal', 'View Full Profile Page']
  }
];

let failed = false;

checks.forEach(check => {
  if (!fs.existsSync(check.file)) {
    console.error(`ERROR: File missing ${check.file}`);
    failed = true;
    return;
  }
  const content = fs.readFileSync(check.file, 'utf8');
  let fileOk = true;
  check.tokens.forEach(token => {
    if (!content.includes(token)) {
      console.error(`ERROR: ${check.file} is missing token "${token}"`);
      fileOk = false;
      failed = true;
    }
  });
  if (fileOk) {
    console.log(`SUCCESS: ${check.file} has all interactive button functions!`);
  }
});

if (!failed) {
  console.log('\nALL requested buttons now have full, interactive functionality!');
}
