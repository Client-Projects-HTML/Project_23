const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Decreasing logo size and adjusting mobile navbar layout across all pages...\n');

let updatedCount = 0;

// 1. Process Root HTML Files
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

rootFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace brand logo HTML in public store pages
  const oldLogoRegex = /<a href="index\.html" class="flex items-center gap-3 shrink-0">[\s\S]*?<\/a>/g;
  const newLogoHtml = `<a href="index.html" class="flex items-center gap-2 sm:gap-3 shrink-0">
        <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-base sm:text-xl shadow-md shadow-hub-blue/20">
          <i data-lucide="wrench" class="w-4 h-4 sm:w-5 sm:h-5"></i>
        </div>
        <div>
          <span class="font-extrabold text-base sm:text-xl tracking-tight text-hub-dark dark:text-white block leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
        </div>
      </a>`;

  if (oldLogoRegex.test(content)) {
    content = content.replace(oldLogoRegex, newLogoHtml);
    changed = true;
  }

  // Update action buttons padding in utilities header for mobile
  content = content.replace(/class="p-2\.5 rounded-xl bg-slate-100/g, 'class="p-2 sm:p-2.5 rounded-xl bg-slate-100');

  if (changed || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED Mobile Logo & Nav: ${file}`);
    updatedCount++;
  }
});

// 2. Process Admin HTML Files
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace mobile admin logo
  const oldAdminLogoRegex = /<a href="\.\.\/index\.html" class="flex lg:hidden items-center gap-2 shrink-0">[\s\S]*?<\/a>/g;
  const newAdminLogoHtml = `<a href="../index.html" class="flex lg:hidden items-center gap-2 shrink-0">
          <div class="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shadow-md">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
          </div>
          <span class="font-extrabold text-sm sm:text-lg tracking-tight text-white leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
        </a>`;

  if (oldAdminLogoRegex.test(content)) {
    content = content.replace(oldAdminLogoRegex, newAdminLogoHtml);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED Admin Mobile Logo: ${file}`);
    updatedCount++;
  }
});

console.log(`\nSuccessfully adjusted logo size and mobile navbar layout across ${updatedCount} files.`);
