const fs = require('fs');

console.log('Verifying removal of Nav links and Login button from User Dashboard headers...\n');

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
  const hasNav = header.includes('<nav');
  const hasLoginBtn = header.includes('login.html');
  const hasCart = header.includes('cart.html');
  const hasRtl = header.includes('toggleRTL()');
  const hasTheme = header.includes('toggleDarkMode()');

  if (!hasNav && !hasLoginBtn && hasCart && hasRtl && hasTheme) {
    console.log(`SUCCESS: ${file} header has been cleanly streamlined!`);
  } else {
    console.error(`ERROR: ${file} header check failed! hasNav=${hasNav}, hasLoginBtn=${hasLoginBtn}`);
    failed = true;
  }
});

if (!failed) {
  console.log('\nALL User Dashboard headers have been verified clean!');
}
