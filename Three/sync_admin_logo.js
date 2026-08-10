const fs = require('fs');
const path = require('path');

const adminDir = 'c:/Users/geeth/project_23/Project_23/Three/admin';

console.log('Syncing brand logo across all admin dashboard pages...\n');

let updatedCount = 0;

const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Replace desktop sidebar logo (change shield-check to wrench if present)
  content = content.replace(/data-lucide="shield-check"/g, 'data-lucide="wrench"');
  content = content.replace(/data-lucide="shield"/g, 'data-lucide="wrench"');

  // 2. Standardize admin mobile logo HTML to match store logo
  const oldMobileLogoRegex = /<a href="\.\.\/index\.html" class="flex lg:hidden items-center gap-[^"]*shrink-0">[\s\S]*?<\/a>/g;
  const newMobileLogoHtml = `<a href="../index.html" class="flex lg:hidden items-center gap-1.5 shrink-0">
          <div class="w-7 h-7 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-md shadow-hub-blue/20">
            <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
          </div>
          <span class="font-extrabold text-sm tracking-tight text-white leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
        </a>`;

  if (oldMobileLogoRegex.test(content)) {
    content = content.replace(oldMobileLogoRegex, newMobileLogoHtml);
    changed = true;
  }

  // 3. Standardize admin sidebar top logo HTML
  const oldSidebarLogoRegex = /<a href="dashboard\.html" class="flex items-center gap-3">[\s\S]*?<\/a>/g;
  const newSidebarLogoHtml = `<a href="dashboard.html" class="flex items-center gap-2.5">
          <div class="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md shadow-hub-blue/20">
            <i data-lucide="wrench" class="w-4 h-4"></i>
          </div>
          <span class="font-extrabold text-base sm:text-lg tracking-tight text-white leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
        </a>`;

  if (oldSidebarLogoRegex.test(content)) {
    content = content.replace(oldSidebarLogoRegex, newSidebarLogoHtml);
    changed = true;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED Admin Logo: ${file}`);
  updatedCount++;
});

console.log(`\nSuccessfully applied standard ApplianceHub logo across ${updatedCount} admin pages.`);
