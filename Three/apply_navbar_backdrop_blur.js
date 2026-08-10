const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Applying glassmorphism backdrop-blur-md to top navbars across all pages...\n');

let updatedCount = 0;

// 1. Store Pages
const publicPages = [
  'index.html',
  'home-v2.html',
  'shop.html',
  'categories.html',
  'deals.html',
  'blog.html',
  'contact.html',
  'cart.html',
  'checkout.html',
  'services.html',
  'track-service.html',
  'blog-detail.html',
  'blog-detail-2.html',
  'blog-detail-3.html',
  'product-detail.html'
];

publicPages.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Update fixed navbar wrapper to include backdrop-blur-md if wrapper div exists
  content = content.replace(/<div class="fixed top-0 left-0 right-0 w-full z-50 shadow-md">/g, '<div class="fixed top-0 left-0 right-0 w-full z-50 shadow-md backdrop-blur-md bg-white/80 dark:bg-slate-900/80">');
  content = content.replace(/<div class="fixed top-0 left-0 right-0 w-full z-50">/g, '<div class="fixed top-0 left-0 right-0 w-full z-50 shadow-md backdrop-blur-md bg-white/80 dark:bg-slate-900/80">');

  // Update topbar bg opacity for glass effect
  content = content.replace(/class="bg-slate-950 text-slate-400/g, 'class="bg-slate-950/80 backdrop-blur-md text-slate-400');

  // Update header bg opacity to bg-white/85 dark:bg-slate-900/85 backdrop-blur-md
  content = content.replace(/class="bg-white\/95 dark:bg-slate-900\/95 backdrop-blur-md/g, 'class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md');
  content = content.replace(/class="bg-white dark:bg-slate-900/g, 'class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED Navbar Glass Blur: ${file}`);
  updatedCount++;
});

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

userPages.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
    let clsList = classes.split(/\s+/);
    if (!clsList.includes('backdrop-blur-md')) clsList.push('backdrop-blur-md');
    // Ensure semi-transparent background
    clsList = clsList.map(c => {
      if (c === 'bg-white') return 'bg-white/80';
      if (c === 'dark:bg-slate-900') return 'dark:bg-slate-900/80';
      return c;
    });
    return `<header class="${clsList.join(' ')}">`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED User Dashboard Navbar Blur: ${file}`);
  updatedCount++;
});

// 3. Admin Dashboard Pages
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
    let clsList = classes.split(/\s+/);
    if (!clsList.includes('backdrop-blur-md')) clsList.push('backdrop-blur-md');
    clsList = clsList.map(c => {
      if (c === 'bg-slate-900') return 'bg-slate-900/80';
      return c;
    });
    return `<header class="${clsList.join(' ')}">`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED Admin Navbar Blur: admin/${file}`);
  updatedCount++;
});

console.log(`\nSuccessfully applied glassmorphism backdrop-blur-md across ${updatedCount} navbars.`);
