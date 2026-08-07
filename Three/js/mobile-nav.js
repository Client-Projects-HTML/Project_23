/* ApplianceHub — Mobile hamburger navigation (Side Drawer).
   Generates a mobile sidebar dynamically from the desktop header. */

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header');
  if (!header || header.classList.contains('header')) return;

  var inner = header.querySelector('.max-w-7xl');
  if (!inner) return;

  var navEl = inner.querySelector('nav');
  
  // Find utilities by looking for the container of the toggles/login button
  // instead of relying on exact index, since hardcoded buttons might exist.
  var utilities = Array.from(inner.children).find(child => 
    child.tagName !== 'NAV' && 
    child.tagName !== 'A' && 
    child.tagName !== 'BUTTON' && 
    child.classList.contains('flex')
  );

  if (!navEl && !utilities) return;

  // Hide the utilities row on mobile, restore it at the lg breakpoint.
  if (utilities) {
    if (utilities.classList.contains('flex')) {
      utilities.classList.remove('flex');
      utilities.classList.add('hidden', 'lg:flex');
    }
  }

  // Hide the hardcoded button if it exists so we can create our own wired one
  var existingBtn = inner.querySelector('#mobileMenuBtn');
  if (existingBtn) {
    existingBtn.style.display = 'none';
  }

  // ---- Build the mobile drawer overlay --------------------------------
  var backdrop = document.createElement('div');
  backdrop.className = 'fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 hidden lg:hidden transition-opacity opacity-0';
  document.body.appendChild(backdrop);

  // ---- Build the mobile drawer ----------------------------------------
  var drawer = document.createElement('aside');
  drawer.className = 'fixed inset-y-0 start-0 w-72 bg-white dark:bg-slate-900 shadow-2xl z-50 transform -translate-x-full rtl:translate-x-full transition-transform duration-300 flex flex-col lg:hidden';
  
  // Drawer Header (Logo + Close btn)
  var drawerHeader = document.createElement('div');
  drawerHeader.className = 'flex items-center justify-between p-5 border-b border-hub-border dark:border-slate-800';
  
  var logoClone = inner.querySelector('a').cloneNode(true);
  logoClone.className = 'flex items-center gap-3 shrink-0';
  
  var closeBtn = document.createElement('button');
  closeBtn.className = 'p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-50 dark:bg-slate-800 transition-all';
  closeBtn.innerHTML = '<i data-lucide="x" class="w-5 h-5"></i>';
  
  drawerHeader.appendChild(logoClone);
  drawerHeader.appendChild(closeBtn);
  drawer.appendChild(drawerHeader);

  // Drawer Content (Nav)
  var drawerContent = document.createElement('div');
  drawerContent.className = 'flex-1 overflow-y-auto p-4 space-y-2';
  
  if (navEl) {
    var navClone = navEl.cloneNode(true);
    navClone.className = 'flex flex-col gap-2 text-sm font-bold text-slate-700 dark:text-slate-200';
    navClone.querySelectorAll('.group').forEach(function (g) { g.classList.remove('group'); });
    navClone.querySelectorAll('div[class*="absolute"]').forEach(function (d) {
      d.className = 'block mt-2 ml-4 space-y-1 border-l-2 border-hub-blue/20 dark:border-slate-700 pl-3 static shadow-none bg-transparent p-0';
    });
    
    // Convert desktop buttons into mobile links
    navClone.querySelectorAll('button').forEach(function (btn) {
      btn.className = 'flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-hub-blue font-extrabold';
    });
    
    // Style links
    navClone.querySelectorAll('a').forEach(function (a) {
      if (!a.parentElement.classList.contains('border-l-2')) {
        a.className = 'flex items-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-hub-blue transition-all';
      }
    });

    drawerContent.appendChild(navClone);
  }
  drawer.appendChild(drawerContent);

  // Drawer Footer (Utilities)
  if (utilities) {
    var drawerFooter = document.createElement('div');
    drawerFooter.className = 'p-5 border-t border-hub-border dark:border-slate-800 flex flex-col gap-3';
    
    var utilClone = utilities.cloneNode(true);
    utilClone.className = 'flex flex-col gap-3';
    
    // Make login button full width
    var loginBtn = utilClone.querySelector('a[href="login.html"]');
    if (loginBtn) {
      loginBtn.className = 'flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-hub-blue text-white font-bold shadow-md shadow-hub-blue/20';
    }

    // Adjust toggles container
    var togglesContainer = utilClone.querySelector('.border-l');
    if (togglesContainer) {
      togglesContainer.className = 'flex items-center justify-between w-full';
      togglesContainer.querySelectorAll('button').forEach(function(btn) {
        btn.className = 'flex-1 flex justify-center py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all mx-1';
      });
    }

    utilClone.querySelectorAll('*').forEach(function (el) {
      el.classList.remove('hidden');
      if (el.id) el.id = el.id + '-mobile';
    });
    
    // Re-wire the RTL / dark-mode toggle clones
    var rtlClone = utilClone.querySelector('#rtlToggleBtn-mobile');
    if (rtlClone) {
      rtlClone.removeAttribute('onclick');
      rtlClone.addEventListener('click', function () {
        if (typeof toggleRTL === 'function') toggleRTL();
      });
    }
    var themeClone = utilClone.querySelector('#themeToggleBtn-mobile');
    if (themeClone) {
      themeClone.removeAttribute('onclick');
      themeClone.addEventListener('click', function () {
        if (typeof toggleDarkMode === 'function') toggleDarkMode();
        var src = document.getElementById('themeIcon');
        var dst = document.getElementById('themeIcon-mobile');
        if (src && dst) {
          dst.setAttribute('data-lucide', src.getAttribute('data-lucide'));
          if (window.lucide) lucide.createIcons();
        }
      });
    }

    drawerFooter.appendChild(utilClone);
    drawer.appendChild(drawerFooter);
  }

  document.body.appendChild(drawer);

  // ---- Hamburger button ----------------------------------------------
  var burger = document.createElement('button');
  burger.id = 'mobileMenuBtn';
  burger.setAttribute('aria-label', 'Toggle menu');
  burger.className = 'flex lg:hidden p-2 rounded-xl text-slate-500 hover:text-hub-blue hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shrink-0';
  burger.innerHTML = '<i data-lucide="menu" id="mobileMenuIcon" class="w-6 h-6"></i>';
  
  function toggleMenu() {
    var isClosed = drawer.classList.contains('-translate-x-full') || drawer.classList.contains('rtl:translate-x-full');
    
    if (isClosed) {
      drawer.classList.remove('-translate-x-full', 'rtl:translate-x-full');
      backdrop.classList.remove('hidden');
      setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      var isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      drawer.classList.add(isRtl ? 'translate-x-full' : '-translate-x-full');
      backdrop.classList.add('opacity-0');
      setTimeout(() => backdrop.classList.add('hidden'), 300);
      document.body.style.overflow = '';
    }
  }

  burger.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', toggleMenu);

  inner.appendChild(burger);

  if (window.lucide) lucide.createIcons();
});
