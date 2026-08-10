const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('Ensuring Cart, RTL, and Theme buttons are visible in mobile navbar across all pages...\n');

let updatedCount = 0;

const utilitiesRegex = /<!-- 3\. RIGHT ACTION UTILITIES & TOGGLES -->[\s\S]*?<\/div>\s*<\/div>\s*<\/header>/gi;

const newUtilitiesHtml = `<!-- 3. RIGHT ACTION UTILITIES & TOGGLES -->
      <div class="flex items-center gap-1.5 sm:gap-3">
        
        <!-- CART BUTTON -->
        <a href="cart.html" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all relative shrink-0" title="Shopping Cart">
          <i data-lucide="shopping-cart" class="w-4 h-4"></i>
          <span id="cartBadge" class="absolute -top-1 -right-1 w-4 h-4 bg-hub-orange text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-sm" style="display: none;">0</span>
        </a>

        <!-- === TOGGLES === -->
        <div class="flex items-center gap-1 sm:gap-1.5 px-1 border-l border-r border-slate-200 dark:border-slate-700">
          <button id="rtlToggleBtn" onclick="toggleRTL()" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0" title="Toggle Direction (LTR/RTL)">
            <i data-lucide="globe" class="w-4 h-4"></i>
          </button>

          <button id="themeToggleBtn" onclick="toggleDarkMode()" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0" title="Toggle Dark/Light Mode">
            <i data-lucide="moon" id="themeIcon" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- LOGIN BUTTON -->
        <a href="login.html" class="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-hub-blue hover:bg-hub-blueDark text-white text-xs font-bold transition-all shadow-md shadow-hub-blue/20 shrink-0">
          <i data-lucide="log-in" class="w-3.5 h-3.5"></i> Login
        </a>
      </div>
    </div>
  </header>`;

files.forEach(file => {
  if (file.startsWith('user-') || file.startsWith('admin-')) return;
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (utilitiesRegex.test(content)) {
    content = content.replace(utilitiesRegex, newUtilitiesHtml);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED Mobile Navbar Utilities: ${file}`);
    updatedCount++;
  }
});

console.log(`\nSuccessfully updated mobile navbar utilities across ${updatedCount} pages.`);
