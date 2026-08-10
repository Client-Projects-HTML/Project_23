const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Configuring true sticky scrolling header in User and Admin Dashboards...\n');

let updatedCount = 0;

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

userPages.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Update container to overflow-y-auto
  content = content.replace(
    /<div class="flex-1 flex flex-col h-screen overflow-hidden">/g,
    '<div class="flex-1 flex flex-col h-screen overflow-y-auto">'
  );

  // Update main to flex-1 relative (remove overflow-y-auto from main since parent container handles scrolling)
  content = content.replace(
    /<main class="flex-1 overflow-y-auto([^"]*?)">/g,
    '<main class="flex-1$1">'
  );

  // Ensure header has sticky top-0 z-40
  content = content.replace(
    /<header class="([^"]*?)">/i,
    '<header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-hub-border dark:border-slate-800 sticky top-0 z-40 shrink-0 w-full shadow-sm">'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED True Sticky Dashboard: ${file}`);
  updatedCount++;
});

// 2. Admin Dashboard Pages
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  if (!fs.existsSync(filePath) || file === 'index.html') return;

  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /<div class="flex-1 flex flex-col h-screen overflow-hidden min-w-0">/g,
    '<div class="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">'
  );

  content = content.replace(
    /<main class="flex-1 overflow-y-auto([^"]*?)">/g,
    '<main class="flex-1$1">'
  );

  content = content.replace(
    /<header class="([^"]*?)">/i,
    '<header class="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 w-full shadow-sm">'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED True Sticky Admin: admin/${file}`);
  updatedCount++;
});

console.log(`\nSuccessfully applied true sticky header layout across ${updatedCount} dashboard pages.`);
