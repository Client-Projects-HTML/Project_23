/* ApplianceHub — Mobile hamburger navigation (Side Drawer).
   Generates a mobile sidebar dynamically from the desktop header with expandable accordion dropdowns. */

document.addEventListener('DOMContentLoaded', function () {
  var path = window.location.pathname;
  var filename = path.split('/').pop();
  if (filename.endsWith('login.html') || filename.endsWith('signup.html') || filename.endsWith('404.html') || filename.endsWith('coming-soon.html') || filename.startsWith('user-') || path.includes('/admin')) return;

  var header = document.querySelector('header');
  if (!header || header.classList.contains('header')) return;

  var inner = header.querySelector('.max-w-7xl');
  if (!inner) return;

  var navEl = inner.querySelector('nav');
  
  var utilities = Array.from(inner.children).find(child => 
    child.tagName !== 'NAV' && 
    child.tagName !== 'A' && 
    child.tagName !== 'BUTTON' && 
    child.classList.contains('flex')
  );

  if (!navEl && !utilities) return;

  // Keep utilities container visible on mobile so Cart, RTL, and Theme toggles are always available on topbar
  if (utilities) {
    if (utilities.classList.contains('hidden')) {
      utilities.classList.remove('hidden');
    }
    if (!utilities.classList.contains('flex')) {
      utilities.classList.add('flex');
    }
  }

  // ---- Build the mobile drawer overlay --------------------------------
  var backdrop = document.createElement('div');
  backdrop.className = 'fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[60] hidden lg:hidden transition-opacity opacity-0';
  document.body.appendChild(backdrop);

  // ---- Build the mobile drawer ----------------------------------------
  var drawer = document.createElement('aside');
  drawer.className = 'fixed inset-y-0 end-0 w-72 bg-white dark:bg-slate-900 shadow-2xl z-[70] transform translate-x-full rtl:-translate-x-full transition-transform duration-300 flex flex-col lg:hidden';
  
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

    // Process containers with sub-menus (e.g. Home)
    var navItems = Array.from(navClone.children);
    navItems.forEach(function(item) {
      var dropdownMenu = item.querySelector('div[class*="absolute"]');
      var triggerBtn = item.querySelector('a') || item.querySelector('button');

      if (dropdownMenu && triggerBtn) {
        // Start COLLAPSED (hidden) by default
        dropdownMenu.className = 'hidden mt-2 ml-4 space-y-1 border-l-2 border-hub-blue/20 dark:border-slate-700 pl-3 static shadow-none bg-transparent p-0';
        triggerBtn.className = 'flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-hub-blue transition-all cursor-pointer';

        // Group Icon + Span together so "Home" sits right next to the home icon!
        var chevron = triggerBtn.querySelector('[data-lucide="chevron-down"]');
        var nonChevronNodes = Array.from(triggerBtn.childNodes).filter(function(node) {
          if (node === chevron) return false;
          if (node.nodeType === 1 && node.getAttribute && node.getAttribute('data-lucide') === 'chevron-down') return false;
          return true;
        });

        if (nonChevronNodes.length > 0 && !triggerBtn.querySelector('.mobile-nav-label-group')) {
          var labelGroup = document.createElement('div');
          labelGroup.className = 'flex items-center gap-2.5 mobile-nav-label-group';
          nonChevronNodes.forEach(function(node) {
            labelGroup.appendChild(node);
          });
          triggerBtn.innerHTML = '';
          triggerBtn.appendChild(labelGroup);
          if (chevron) {
            triggerBtn.appendChild(chevron);
          }
        }

        triggerBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var isHidden = dropdownMenu.classList.contains('hidden');
          var chevronIcon = triggerBtn.querySelector('[data-lucide="chevron-down"]');

          if (isHidden) {
            dropdownMenu.classList.remove('hidden');
            dropdownMenu.classList.add('block');
            if (chevronIcon) {
              chevronIcon.style.transform = 'rotate(180deg)';
              chevronIcon.style.transition = 'transform 0.2s ease-in-out';
            }
          } else {
            dropdownMenu.classList.remove('block');
            dropdownMenu.classList.add('hidden');
            if (chevronIcon) {
              chevronIcon.style.transform = 'rotate(0deg)';
            }
          }
        });
      }
    });

    // Style remaining direct links
    navClone.querySelectorAll('a').forEach(function (a) {
      if (!a.parentElement.classList.contains('border-l-2') && !a.querySelector('[data-lucide="chevron-down"]')) {
        a.className = 'flex items-center gap-2.5 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-hub-blue transition-all';
      }
    });

    // Highlight Active Link & Clicked Link inside Mobile Drawer
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navClone.querySelectorAll('a').forEach(function(link) {
      var href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) return;
      var linkFile = href.split('/').pop();

      var isMatch = (currentPath === linkFile);
      if ((linkFile === 'index.html' || href === 'index.html') && (currentPath === 'index.html' || currentPath === 'home-v2.html' || currentPath === '')) {
        isMatch = true;
      } else if (linkFile === 'shop.html' && currentPath === 'product-detail.html') {
        isMatch = true;
      } else if (linkFile === 'blog.html' && (currentPath.startsWith('blog-detail') || currentPath === 'blog.html')) {
        isMatch = true;
      }

      if (isMatch) {
        link.classList.add('bg-hub-blue/10', 'text-hub-blue', 'font-extrabold');
        link.classList.remove('text-slate-700', 'dark:text-slate-200');
      }

      link.addEventListener('click', function() {
        navClone.querySelectorAll('a').forEach(function(other) {
          other.classList.remove('bg-hub-blue/10', 'text-hub-blue', 'font-extrabold');
        });
        link.classList.add('bg-hub-blue/10', 'text-hub-blue', 'font-extrabold');
      });
    });

    drawerContent.appendChild(navClone);
  }
  drawer.appendChild(drawerContent);

  // Drawer Footer (Utilities / Login)
  /*
  if (utilities) {
    var drawerFooter = document.createElement('div');
    drawerFooter.className = 'p-5 border-t border-hub-border dark:border-slate-800 flex flex-col gap-3';
    
    var loginBtn = utilities.querySelector('a[href="login.html"]');
    if (loginBtn) {
      var loginClone = loginBtn.cloneNode(true);
      loginClone.className = 'flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-hub-blue text-white font-bold shadow-md shadow-hub-blue/20';
      loginClone.classList.remove('hidden');
      drawerFooter.appendChild(loginClone);
    }
    drawer.appendChild(drawerFooter);
  }
  */

  document.body.appendChild(drawer);

  // ---- Wire / Attach Hamburger button --------------------------------
  var burger = utilities ? (utilities.querySelector('#mobileNavToggleBtn') || utilities.querySelector('#mobileMenuBtn')) : null;
  
  if (!burger) {
    burger = document.createElement('button');
    burger.id = 'mobileMenuBtn';
    burger.setAttribute('aria-label', 'Toggle menu');
    burger.className = 'flex lg:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shrink-0';
    burger.innerHTML = '<i data-lucide="menu" id="mobileMenuIcon" class="w-5 h-5"></i>';
    if (utilities) {
      utilities.appendChild(burger);
    } else {
      inner.appendChild(burger);
    }
  }
  
  function toggleMenu() {
    var isClosed = drawer.classList.contains('translate-x-full') || drawer.classList.contains('-translate-x-full') || drawer.classList.contains('rtl:-translate-x-full') || drawer.classList.contains('rtl:translate-x-full');
    
    if (isClosed) {
      drawer.classList.remove('translate-x-full', '-translate-x-full', 'rtl:translate-x-full', 'rtl:-translate-x-full');
      backdrop.classList.remove('hidden');
      setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      var isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      drawer.classList.add(isRtl ? '-translate-x-full' : 'translate-x-full');
      backdrop.classList.add('opacity-0');
      setTimeout(() => backdrop.classList.add('hidden'), 300);
      document.body.style.overflow = '';
    }
  }

  burger.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', toggleMenu);

  if (window.lucide) lucide.createIcons();
});
