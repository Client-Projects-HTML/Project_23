const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Fixing and reinforcing sticky navbars in User & Admin Dashboards...\n');

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

  // Replace header class in User Dashboards with sticky top-0 z-40 shrink-0 w-full shadow-sm
  content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
    let clsList = classes.split(/\s+/);
    if (!clsList.includes('sticky')) clsList.push('sticky');
    if (!clsList.includes('top-0')) clsList.push('top-0');
    if (!clsList.includes('z-40')) clsList.push('z-40');
    if (!clsList.includes('shrink-0')) clsList.push('shrink-0');
    if (!clsList.includes('w-full')) clsList.push('w-full');
    if (!clsList.includes('shadow-sm')) clsList.push('shadow-sm');
    return `<header class="${clsList.join(' ')}">`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`REINFORCED User Dashboard Sticky Header: ${file}`);
  updatedCount++;
});

// 2. Admin Dashboard Pages
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
    let clsList = classes.split(/\s+/);
    if (!clsList.includes('sticky')) clsList.push('sticky');
    if (!clsList.includes('top-0')) clsList.push('top-0');
    if (!clsList.includes('z-40')) clsList.push('z-40');
    if (!clsList.includes('shrink-0')) clsList.push('shrink-0');
    if (!clsList.includes('w-full')) clsList.push('w-full');
    if (!clsList.includes('shadow-sm')) clsList.push('shadow-sm');
    return `<header class="${clsList.join(' ')}">`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`REINFORCED Admin Dashboard Sticky Header: ${file}`);
  updatedCount++;
});

console.log(`\nSuccessfully fixed and reinforced dashboard sticky headers across ${updatedCount} pages.`);
