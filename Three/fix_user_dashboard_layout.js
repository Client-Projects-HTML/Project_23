const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Fixing User Dashboard and Admin Dashboard layout and mobile-nav exclusions...\n');

let updatedCount = 0;

// 1. Update js/mobile-nav.js to exclude user-*.html and admin pages from dynamic drawer generation
const mobileNavJsPath = path.join(rootDir, 'js/mobile-nav.js');
if (fs.existsSync(mobileNavJsPath)) {
  let content = fs.readFileSync(mobileNavJsPath, 'utf8');

  // Ensure early return checks for user- and admin pages
  const oldReturn = /if \(path\.endsWith\('login\.html'\) \|\| path\.endsWith\('signup\.html'\) \|\| path\.endsWith\('404\.html'\) \|\| path\.endsWith\('coming-soon\.html'\)\) return;/g;
  const newReturn = `var filename = path.split('/').pop();
  if (filename.endsWith('login.html') || filename.endsWith('signup.html') || filename.endsWith('404.html') || filename.endsWith('coming-soon.html') || filename.startsWith('user-') || path.includes('/admin')) return;`;

  content = content.replace(oldReturn, newReturn);
  fs.writeFileSync(mobileNavJsPath, content, 'utf8');
  console.log('UPDATED js/mobile-nav.js: Excluded dashboard templates');
  updatedCount++;
}

// 2. Update User Dashboard Pages (<header> class in flex column layout)
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

  // Fix header class for clean flex column pinning
  content = content.replace(/<header class="([^"]*?)">/i, '<header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-hub-border dark:border-slate-800 shrink-0 w-full shadow-sm">');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`FIXED User Dashboard Layout: ${file}`);
  updatedCount++;
});

// 3. Update Admin Dashboard Pages (<header> class in flex column layout)
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/<header class="([^"]*?)">/i, '<header class="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60 px-4 sm:px-6 flex items-center justify-between shrink-0 w-full shadow-sm">');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`FIXED Admin Dashboard Layout: admin/${file}`);
  updatedCount++;
});

console.log(`\nSuccessfully fixed User & Admin Dashboard layouts across ${updatedCount} files.`);
