const fs = require('fs');

console.log('Verifying removal of duplicate logo from User Dashboard top header...\n');

const userFiles = [
  'user-dashboard.html',
  'user-orders.html',
  'user-services.html',
  'user-wishlist.html',
  'user-addresses.html',
  'user-wallet.html',
  'user-alerts.html',
  'user-settings.html',
  'user-track.html'
];

let failed = false;

userFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/i);
  
  if (!headerMatch) {
    console.error(`ERROR: Header missing in ${file}`);
    failed = true;
    return;
  }

  const header = headerMatch[0];
  // Header should not have desktop logo link (<a href="index.html"... shrink-0)
  const hasDesktopLogo = header.includes('href="index.html"');

  if (!hasDesktopLogo) {
    console.log(`SUCCESS: ${file} header has NO duplicate logo!`);
  } else {
    console.error(`ERROR: ${file} header still contains a duplicate desktop logo!`);
    failed = true;
  }
});

if (!failed) {
  console.log('\nAll User Dashboard pages now have a single, clean brand logo!');
}
