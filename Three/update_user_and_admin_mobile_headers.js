const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Updating user dashboard and admin mobile headers to place hamburger button on the right...\n');

let updatedCount = 0;

// 1. Process User Dashboard Pages
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

  // Replace header block in User Dashboards
  const oldHeaderRegex = /<header class="bg-white\/95 dark:bg-slate-900\/95 backdrop-blur-md border-b border-hub-border dark:border-slate-800 sticky top-0 z-30 transition-all shrink-0">[\s\S]*?<\/header>/g;

  const newHeaderHtml = `<header class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-hub-border dark:border-slate-800 sticky top-0 z-30 transition-all shrink-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <!-- LEFT: MOBILE BRAND LOGO LINK -->
          <a href="index.html" class="flex lg:hidden items-center gap-1.5 shrink-0">
            <div class="w-7 h-7 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-md shadow-hub-blue/20">
              <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
            </div>
            <span class="font-extrabold text-sm tracking-tight text-hub-dark dark:text-white leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
          </a>

          <!-- RIGHT: ACTION UTILITIES & HAMBURGER ON RIGHT -->
          <div class="flex items-center gap-1.5 sm:gap-3 ml-auto">
            <a href="cart.html" class="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all relative shrink-0" title="Shopping Cart">
              <i data-lucide="shopping-cart" class="w-4 h-4"></i>
              <span id="cartBadge" class="absolute -top-1 -right-1 w-4 h-4 bg-hub-orange text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-sm" style="display: none;">0</span>
            </a>

            <div class="flex items-center gap-1 sm:gap-1.5">
              <button id="rtlToggleBtn" onclick="toggleRTL()" class="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0" title="Toggle Direction (LTR/RTL)">
                <i data-lucide="globe" class="w-4 h-4"></i>
              </button>

              <button id="themeToggleBtn" onclick="toggleDarkMode()" class="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0" title="Toggle Dark/Light Mode">
                <i data-lucide="moon" id="themeIcon" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- HAMBURGER MENU BUTTON ON RIGHT -->
            <button id="openMobileSidebarBtn" class="lg:hidden p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0" title="Open Navigation Menu">
              <i data-lucide="menu" class="w-4 h-4"></i>
            </button>
          </div>

        </div>
      </header>`;

  if (oldHeaderRegex.test(content)) {
    content = content.replace(oldHeaderRegex, newHeaderHtml);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED User Dashboard Header: ${file}`);
    updatedCount++;
  }
});

// 2. Process Admin Pages
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Verify hamburger button is placed on right in admin headers
  const oldAdminHeaderRegex = /<header class="h-16 bg-slate-900 border-b border-slate-800\/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">[\s\S]*?<\/header>/g;

  const newAdminHeaderHtml = `<header class="h-16 bg-slate-900 border-b border-slate-800/60 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
      <div class="flex items-center gap-3">
        <!-- Mobile Logo -->
        <a href="../index.html" class="flex lg:hidden items-center gap-1.5 shrink-0">
          <div class="w-6.5 h-6.5 sm:w-8 sm:h-8 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shadow-md">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
          </div>
          <span class="font-extrabold text-xs sm:text-lg tracking-tight text-white leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
        </a>
      </div>

      <div class="flex items-center gap-1.5 sm:gap-2.5">
        <!-- RTL TOGGLE -->
        <button id="rtlToggleBtn" onclick="toggleAdminRTL()" class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all" title="Toggle Direction (LTR/RTL)">
          <i data-lucide="globe" class="w-4 h-4"></i>
        </button>

        <!-- DARK / LIGHT TOGGLE -->
        <button id="themeToggleBtn" onclick="toggleAdminDarkMode()" class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all" title="Toggle Dark/Light Mode">
          <i data-lucide="moon" id="adminThemeIcon" class="w-4 h-4"></i>
        </button>

        <!-- MOBILE MENU BTN ON RIGHT -->
        <button onclick="toggleSidebar()" class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all lg:hidden" title="Open Navigation Menu">
          <i data-lucide="menu" class="w-4 h-4"></i>
        </button>
      </div>
    </header>`;

  if (oldAdminHeaderRegex.test(content)) {
    content = content.replace(oldAdminHeaderRegex, newAdminHeaderHtml);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED Admin Header: ${file}`);
    updatedCount++;
  }
});

console.log(`\nSuccessfully placed hamburger button on the right across ${updatedCount} dashboard & admin pages.`);
