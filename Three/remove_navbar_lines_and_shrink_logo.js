const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Removing vertical divider lines from navbar and decreasing logo size further...\n');

let updatedCount = 0;

// 1. Process Root HTML Files
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

rootFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace brand logo HTML to shrink mobile logo size further (w-7 h-7, text-sm)
  const oldLogoRegex = /<a href="index\.html" class="flex items-center gap-[^"]*shrink-0">[\s\S]*?<\/a>/gi;
  const newLogoHtml = `<a href="index.html" class="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <div class="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-lg sm:rounded-2xl flex items-center justify-center font-bold text-xs sm:text-xl shadow-md shadow-hub-blue/20">
          <i data-lucide="wrench" class="w-3.5 h-3.5 sm:w-5 sm:h-5"></i>
        </div>
        <div>
          <span class="font-extrabold text-sm sm:text-xl tracking-tight text-hub-dark dark:text-white block leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
        </div>
      </a>`;

  content = content.replace(oldLogoRegex, newLogoHtml);

  // Remove border-l and border-r vertical divider lines from toggles container
  content = content.replace(
    /class="flex items-center gap-1 sm:gap-1\.5 px-[^"]*border-l border-r border-slate-200 dark:border-slate-700"/g,
    'class="flex items-center gap-1 sm:gap-1.5"'
  );
  content = content.replace(
    /class="flex items-center gap-1.5 px-1 border-l border-r border-slate-200 dark:border-slate-700"/g,
    'class="flex items-center gap-1 sm:gap-1.5"'
  );
  content = content.replace(
    /class="flex items-center gap-1.5 pl-1 pr-2 border-l border-r border-slate-200 dark:border-slate-700"/g,
    'class="flex items-center gap-1 sm:gap-1.5"'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED Page: ${file}`);
  updatedCount++;
});

// 2. Process Admin HTML Files
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace admin mobile logo
  const oldAdminLogoRegex = /<a href="\.\.\/index\.html" class="flex lg:hidden items-center gap-[^"]*shrink-0">[\s\S]*?<\/a>/gi;
  const newAdminLogoHtml = `<a href="../index.html" class="flex lg:hidden items-center gap-1.5 shrink-0">
          <div class="w-6.5 h-6.5 sm:w-8 sm:h-8 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shadow-md">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
          </div>
          <span class="font-extrabold text-xs sm:text-lg tracking-tight text-white leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
        </a>`;

  content = content.replace(oldAdminLogoRegex, newAdminLogoHtml);

  // Remove vertical borders in admin top headers
  content = content.replace(/border-l border-r border-slate-800/g, '');
  content = content.replace(/border-slate-800/g, 'border-slate-800/60');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED Admin Page: ${file}`);
  updatedCount++;
});

console.log(`\nSuccessfully removed divider lines and decreased logo sizes across ${updatedCount} files.`);
