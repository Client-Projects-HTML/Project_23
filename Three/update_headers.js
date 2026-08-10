const fs = require('fs');
const path = require('path');

const headerTemplate = `  <!-- MAIN NAVIGATION BAR (Home | Shop | Categories | Deals | Blog | Contact) -->
  <header class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-hub-border dark:border-slate-800 sticky top-0 z-50 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      
      <!-- 1. BRAND LOGO -->
      <a href="index.html" class="flex items-center gap-3 shrink-0">
        <div class="w-10 h-10 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-md shadow-hub-blue/20">
          <i data-lucide="wrench" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="font-extrabold text-xl tracking-tight text-hub-dark dark:text-white block leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
          
        </div>
      </a>

      <!-- 2. NAVIGATION MENU: Home | Shop | Categories | Deals | Blog | Contact -->
      <nav class="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-200">
        
        <!-- 1. HOME -->
        <div class="relative group py-2">
          <a href="index.html" class="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-hub-blue transition-all" id="nav-home">
            <i data-lucide="home" class="w-4 h-4"></i>
            <span>Home</span>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200"></i>
          </a>
          <div class="absolute top-full left-0 w-64 bg-white dark:bg-slate-800 border border-hub-border dark:border-slate-700/80 rounded-2xl shadow-xl p-2 hidden group-hover:block transition-all duration-200 z-50">
            <a href="index.html" class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all">
              <div class="w-8 h-8 rounded-lg bg-hub-blue/10 text-hub-blue flex items-center justify-center shrink-0 mt-0.5">
                <i data-lucide="store" class="w-4 h-4"></i>
              </div>
              <div>
                <span class="block text-xs font-bold text-hub-dark dark:text-white">Home V1: Sales & Repair</span>
                <span class="text-[10px] text-slate-400 font-normal">Hybrid store, products & booking</span>
              </div>
            </a>
            <a href="home-v2.html" class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all mt-1">
              <div class="w-8 h-8 rounded-lg bg-hub-orange/10 text-hub-orange flex items-center justify-center shrink-0 mt-0.5">
                <i data-lucide="shield-alert" class="w-4 h-4"></i>
              </div>
              <div>
                <span class="block text-xs font-bold text-hub-dark dark:text-white">Home V2: Emergency Repairs</span>
                <span class="text-[10px] text-slate-400 font-normal">High-conversion repair focus</span>
              </div>
            </a>
          </div>
        </div>

        <!-- 2. SHOP -->
        <a href="shop.html" class="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-hub-blue transition-all" id="nav-shop">
          Shop
        </a>

        <!-- 3. CATEGORIES -->
        <a href="categories.html" class="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-hub-blue transition-all" id="nav-categories">
          Categories
        </a>

        <!-- 4. DEALS -->
        <a href="deals.html" class="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-hub-blue transition-all" id="nav-deals">
          Deals
        </a>

        <!-- 5. BLOG -->
        <a href="blog.html" class="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-hub-blue transition-all" id="nav-blog">
          Blog
        </a>

        <!-- 6. CONTACT -->
        <a href="contact.html" class="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-hub-blue transition-all" id="nav-contact">
          Contact
        </a>
      </nav>

      <!-- 3. RIGHT ACTION UTILITIES & TOGGLES -->
      <div class="flex items-center gap-2 sm:gap-3">
        
        <!-- CART BUTTON -->
        <a href="cart.html" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all relative shrink-0" title="Shopping Cart">
          <i data-lucide="shopping-cart" class="w-4 h-4"></i>
          <span id="cartBadge" class="absolute -top-1 -right-1 w-4 h-4 bg-hub-orange text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-sm" style="display: none;">0</span>
        </a>

        <!-- === TOGGLES === -->
        <div class="flex items-center gap-1.5 pl-1 pr-2 border-l border-r border-slate-200 dark:border-slate-700">
          <button id="rtlToggleBtn" onclick="toggleRTL()" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0" title="Toggle Direction (LTR/RTL)">
            <i data-lucide="globe" class="w-4 h-4"></i>
          </button>

          <button id="themeToggleBtn" onclick="toggleDarkMode()" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all shrink-0" title="Toggle Dark/Light Mode">
            <i data-lucide="moon" id="themeIcon" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- LOGIN BUTTON -->
        <a href="login.html" class="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-hub-blue hover:bg-hub-blueDark text-white text-xs font-bold transition-all shadow-md shadow-hub-blue/20">
          <i data-lucide="log-in" class="w-3.5 h-3.5"></i> Login
        </a>

        <!-- MOBILE MENU BUTTON -->
        <button id="mobileNavToggleBtn" onclick="toggleMobileNav()" class="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-all">
          <i data-lucide="menu" class="w-5 h-5"></i>
        </button>
      </div>
    </div>
  </header>`;

const activeClass = 'bg-slate-100 dark:bg-slate-800 text-hub-blue font-extrabold transition-all';

const files = [
    { name: 'index.html', activeId: 'nav-home' },
    { name: 'home-v2.html', activeId: 'nav-home' },
    { name: 'shop.html', activeId: 'nav-shop' },
    { name: 'categories.html', activeId: 'nav-categories' },
    { name: 'product-detail.html', activeId: 'nav-shop' },
    { name: 'deals.html', activeId: 'nav-deals' },
    { name: 'blog.html', activeId: 'nav-blog' },
    { name: 'blog-detail.html', activeId: 'nav-blog' },
    { name: 'blog-detail-2.html', activeId: 'nav-blog' },
    { name: 'blog-detail-3.html', activeId: 'nav-blog' },
    { name: 'cart.html', activeId: 'nav-shop' },
    { name: 'checkout.html', activeId: 'nav-shop' },
    { name: 'contact.html', activeId: 'nav-contact' },
    { name: 'services.html', activeId: 'nav-categories' },
    { name: 'track-service.html', activeId: 'nav-contact' },
    { name: '404.html', activeId: 'nav-home' },
    { name: 'coming-soon.html', activeId: 'nav-home' }
];

files.forEach(file => {
    if (!fs.existsSync(file.name)) return;
    let content = fs.readFileSync(file.name, 'utf8');
    
    let customHeader = headerTemplate;
    
    // Set active link
    customHeader = customHeader.replace(
      new RegExp('id="' + file.activeId + '"'),
      'id="' + file.activeId + '" class="flex items-center gap-1.5 px-3 py-2 rounded-xl ' + activeClass + '"'
    );
    
    const startIdx = content.indexOf('<header');
    const endIdx = content.indexOf('</header>', startIdx) + '</header>'.length;
    
    if (startIdx !== -1 && endIdx > startIdx) {
        content = content.substring(0, startIdx) + customHeader + content.substring(endIdx);
        fs.writeFileSync(file.name, content, 'utf8');
        console.log("Successfully updated header in " + file.name);
    }
});
