const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') || f.endsWith('.js'));

console.log('Updating Top Utility Bar text sizing and alignment for seamless mobile responsiveness...\n');

let updatedCount = 0;

const oldTopbarRegex = /<!-- TOP UTILITY BAR -->
  <div class="bg-slate-950 text-slate-400 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto flex justify-between items-center gap-2">
      <div class="flex items-center gap-3 sm:gap-6 min-w-0">
        <span class="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"><i data-lucide="map-pin" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-hub-blue shrink-0"></i> Delivering to: <strong class="text-white ml-0.5 sm:ml-1">Downtown 10001</strong></span>
        <span class="hidden md:flex items-center gap-1.5 whitespace-nowrap"><i data-lucide="zap" class="w-3.5 h-3.5 text-hub-blue shrink-0"></i> Express delivery in 24 hours available</span>
      </div>
      <div class="flex items-center gap-3 sm:gap-5 font-medium shrink-0">
        <a href="tel:18002775426" class="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap hover:text-white transition-colors">
          <i data-lucide="phone" class="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"></i> <span class="hidden sm:inline">Support: </span>1-800-APPLIANCE
        </a>
      </div>
    </div>
  </div>

  <!-- MAIN REDESIGNED NAVIGATION BAR/gi;

const newTopbarContent = `<!-- TOP UTILITY BAR -->
  <div class="bg-slate-950 text-slate-400 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto flex justify-between items-center gap-2">
      <div class="flex items-center gap-3 sm:gap-6 min-w-0">
        <span class="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"><i data-lucide="map-pin" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-hub-blue shrink-0"></i> Delivering to: <strong class="text-white ml-0.5 sm:ml-1">Downtown 10001</strong></span>
        <span class="hidden md:flex items-center gap-1.5 whitespace-nowrap"><i data-lucide="zap" class="w-3.5 h-3.5 text-hub-blue shrink-0"></i> Express delivery in 24 hours available</span>
      </div>
      <div class="flex items-center gap-3 sm:gap-5 font-medium shrink-0">
        <a href="tel:18002775426" class="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap hover:text-white transition-colors">
          <i data-lucide="phone" class="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"></i> <span class="hidden sm:inline">Support: </span>1-800-APPLIANCE
        </a>
      </div>
    </div>
  </div>

  <!-- MAIN REDESIGNED NAVIGATION BAR`;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (oldTopbarRegex.test(content)) {
    content = content.replace(oldTopbarRegex, newTopbarContent);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED Topbar in: ${file}`);
    updatedCount++;
  }
});

console.log(`\nSuccessfully updated topbar text sizing across ${updatedCount} files.`);
