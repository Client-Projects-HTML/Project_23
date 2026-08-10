const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Applying rich backdrop-blur-md to mobile hamburger menu overlays across all pages...\n');

let updatedCount = 0;

// 1. js/mobile-nav.js
const mobileNavJsPath = path.join(rootDir, 'js/mobile-nav.js');
if (fs.existsSync(mobileNavJsPath)) {
  let content = fs.readFileSync(mobileNavJsPath, 'utf8');
  content = content.replace(/backdrop\.className = '[^']*'/g, "backdrop.className = 'fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 hidden lg:hidden transition-opacity opacity-0'");
  fs.writeFileSync(mobileNavJsPath, content, 'utf8');
  console.log('UPDATED Backdrop Blur: js/mobile-nav.js');
  updatedCount++;
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

userPages.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('id="mobileSidebarBackdrop"')) {
    content = content.replace(
      /<div id="mobileSidebarBackdrop" class="[^"]*">/g,
      '<div id="mobileSidebarBackdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 hidden lg:hidden transition-opacity opacity-0"></div>'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED Backdrop Blur: ${file}`);
    updatedCount++;
  }
});

// 3. Admin Dashboard Pages
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('id="mobileSidebarBackdrop"')) {
    content = content.replace(
      /<div id="mobileSidebarBackdrop" class="[^"]*">/g,
      '<div id="mobileSidebarBackdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 hidden lg:hidden transition-opacity opacity-0"></div>'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED Backdrop Blur: admin/${file}`);
    updatedCount++;
  }
});

console.log(`\nSuccessfully applied rich backdrop-blur-md to mobile hamburger menu overlays across ${updatedCount} files.`);
