const fs = require('fs');

console.log('Verifying brand logo inside user mobile sidebar drawer headers...\n');

let failed = false;

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
  const sidebarMatch = content.match(/<aside id="mobileSidebar"[\s\S]*?<\/aside>/i);
  if (sidebarMatch) {
    const sidebarHtml = sidebarMatch[0];
    if (!sidebarHtml.includes('data-lucide="wrench"') || !sidebarHtml.includes('w-7 h-7')) {
      console.error(`ERROR: ${page} mobile sidebar drawer is missing wrench icon brand logo box!`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} mobile drawer header features the full ApplianceHub wrench logo`);
    }
  }
});

if (!failed) {
  console.log('\nAll User Dashboard pages verified! Mobile drawer header features the signature ApplianceHub brand logo!');
}
