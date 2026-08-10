const fs = require('fs');

console.log('Verifying streamlined navbar in login.html and signup.html...\n');

['login.html', 'signup.html'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/);
  
  if (!headerMatch) {
    console.error(`ERROR: Header missing in ${file}`);
    return;
  }

  const header = headerMatch[0];
  const hasNav = header.includes('<nav');
  const hasCart = header.includes('cart.html');
  const hasLoginBtn = header.includes('href="login.html"');
  const hasRtl = header.includes('toggleRTL()');
  const hasTheme = header.includes('toggleDarkMode()');
  const hasBrand = header.includes('Appliance');

  if (!hasNav && !hasCart && !hasLoginBtn && hasRtl && hasTheme && hasBrand) {
    console.log(`SUCCESS: ${file} header has been cleanly streamlined! (Nav links, Cart, and Login buttons removed; Logo, RTL & Theme toggles retained)`);
  } else {
    console.error(`ERROR: ${file} header check failed! hasNav=${hasNav}, hasCart=${hasCart}, hasLoginBtn=${hasLoginBtn}`);
  }
});
