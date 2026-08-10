const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';

console.log('Applying wrench brand logo to mobile sidebar drawer header across User Dashboards...\n');

let updatedCount = 0;

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

  // Replace plain text logo in mobile sidebar drawer with full wrench brand logo
  const oldDrawerHeaderRegex = /<div class="flex items-center justify-between p-6">\s*<span class="font-extrabold text-xl tracking-tight text-hub-dark dark:text-white leading-none">Appliance<span class="text-hub-blue">Hub<\/span><\/span>\s*<button id="closeSidebarBtn"/g;

  const newDrawerHeaderHtml = `<div class="flex items-center justify-between p-5 border-b border-hub-border dark:border-slate-800">
        <a href="index.html" class="flex items-center gap-2.5 shrink-0">
          <div class="w-7 h-7 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-hub-blue/20">
            <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
          </div>
          <span class="font-extrabold text-base sm:text-lg tracking-tight text-hub-dark dark:text-white leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
        </a>
        <button id="closeSidebarBtn"`;

  if (oldDrawerHeaderRegex.test(content)) {
    content = content.replace(oldDrawerHeaderRegex, newDrawerHeaderHtml);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED User Mobile Drawer Logo: ${file}`);
    updatedCount++;
  }
});

console.log(`\nSuccessfully applied brand logo to mobile drawer headers across ${updatedCount} user dashboard pages.`);
