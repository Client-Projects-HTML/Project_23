const fs = require('fs');

const userHeaderTemplate = `  <!-- USER DASHBOARD HEADER (STREAMLINED: NO DUPLICATE LOGO ON DESKTOP, RIGHT UTILITIES ONLY) -->
  <header class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-hub-border dark:border-slate-800 sticky top-0 z-30 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between lg:justify-end gap-4">
      
      <!-- MOBILE MENU BUTTON (SHOWN ONLY ON MOBILE WHEN SIDEBAR IS HIDDEN) -->
      <button id="openMobileSidebarBtn" class="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-2">
        <i data-lucide="menu" class="w-5 h-5"></i>
        <span class="font-extrabold text-sm tracking-tight text-hub-dark dark:text-white leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
      </button>

      <!-- RIGHT ACTION UTILITIES & TOGGLES ONLY -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- CART BUTTON -->
        <a href="cart.html" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all relative shrink-0" title="Shopping Cart">
          <i data-lucide="shopping-cart" class="w-4 h-4"></i>
          <span id="cartBadge" class="absolute -top-1 -right-1 w-4 h-4 bg-hub-orange text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-sm" style="display: none;">0</span>
        </a>

        <!-- RTL AND THEME BUTTONS -->
        <div class="flex items-center gap-1.5 pl-1 pr-2 border-l border-r border-slate-200 dark:border-slate-700">
          <button id="rtlToggleBtn" onclick="toggleRTL()" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0" title="Toggle Direction (LTR/RTL)">
            <i data-lucide="globe" class="w-4 h-4"></i>
          </button>

          <button id="themeToggleBtn" onclick="toggleDarkMode()" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0" title="Toggle Dark/Light Mode">
            <i data-lucide="moon" id="themeIcon" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

    </div>
  </header>`;

const userFiles = [
  'user-dashboard.html',
  'user-orders.html',
  'user-services.html',
  'user-wishlist.html',
  'user-addresses.html',
  'user-wallet.html',
  'user-alerts.html',
  'user-settings.html',
  'user-track.html'
];

userFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace header tag
  const headerRegex = /<header[\s\S]*?<\/header>/i;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, userHeaderTemplate);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated header in ${file}`);
  } else {
    console.log(`No <header> tag found in ${file}`);
  }
});
