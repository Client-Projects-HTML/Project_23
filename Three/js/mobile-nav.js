/* ApplianceHub — Mobile hamburger navigation.
   Works generically across every public page: on small screens the header
   collapses to just the logo + a hamburger button. Tapping the hamburger
   reveals a drawer with the nav links and the same actions (Admin, Cart,
   Account, Book Service, RTL, Dark Mode) that live in the desktop header. */

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header');
  if (!header) return;

  var inner = header.firstElementChild;
  if (!inner) return;

  var children = Array.prototype.slice.call(inner.children);
  if (children.length < 2) return;

  var navEl = header.querySelector('nav');
  var hasToggles = header.querySelector('#rtlToggleBtn');

  // Only pages that actually have a full nav/utility header need collapsing
  // (e.g. cart.html's minimal header is already mobile-friendly as-is).
  if (!navEl && !hasToggles) return;

  var utilities = children[children.length - 1];

  // Hide the utilities row on mobile, restore it at the lg breakpoint.
  if (utilities.classList.contains('flex')) {
    utilities.classList.remove('flex');
    utilities.classList.add('hidden', 'lg:flex');
  }

  // ---- Build the mobile drawer -------------------------------------
  var drawer = document.createElement('div');
  drawer.id = 'mobileMenuPanel';
  drawer.className = 'hidden lg:hidden border-t border-hub-border dark:border-slate-800 px-4 py-4 space-y-4';

  if (navEl) {
    var navClone = navEl.cloneNode(true);
    navClone.className = 'flex flex-col gap-1 text-xs font-bold text-slate-700 dark:text-slate-200';
    navClone.querySelectorAll('.group').forEach(function (g) { g.classList.remove('group'); });
    navClone.querySelectorAll('div[class*="absolute"]').forEach(function (d) {
      d.className = 'block mt-1 mb-1 ml-4 space-y-1 border-l border-hub-border dark:border-slate-700 pl-3 static shadow-none bg-transparent dark:bg-transparent p-0';
    });
    drawer.appendChild(navClone);
  }

  var utilClone = utilities.cloneNode(true);
  utilClone.className = 'flex flex-col gap-2 pt-3 border-t border-hub-border dark:border-slate-700';
  utilClone.querySelectorAll('*').forEach(function (el) {
    el.classList.remove('hidden');
    if (el.id) el.id = el.id + '-mobile';
  });
  if (utilClone.id) utilClone.id = utilClone.id + '-mobile';

  // Re-wire the RTL / dark-mode toggle clones so they drive the same
  // toggleRTL()/toggleDarkMode() functions and stay visually in sync.
  var rtlClone = utilClone.querySelector('#rtlToggleBtn-mobile');
  if (rtlClone) {
    rtlClone.removeAttribute('onclick');
    rtlClone.addEventListener('click', function () {
      if (typeof toggleRTL === 'function') toggleRTL();
      var src = document.getElementById('rtlLabel');
      var dst = document.getElementById('rtlLabel-mobile');
      if (src && dst) dst.innerText = src.innerText;
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

  drawer.appendChild(utilClone);
  header.appendChild(drawer);

  // ---- Hamburger button ----------------------------------------------
  var burger = document.createElement('button');
  burger.id = 'mobileMenuBtn';
  burger.setAttribute('aria-label', 'Toggle menu');
  burger.className = 'flex lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 transition-all';
  burger.innerHTML = '<i data-lucide="menu" id="mobileMenuIcon" class="w-5 h-5"></i>';
  burger.addEventListener('click', function () {
    var willOpen = drawer.classList.contains('hidden');
    drawer.classList.toggle('hidden');
    var icon = document.getElementById('mobileMenuIcon');
    if (icon) icon.setAttribute('data-lucide', willOpen ? 'x' : 'menu');
    if (window.lucide) lucide.createIcons();
  });

  inner.appendChild(burger);

  if (window.lucide) lucide.createIcons();
});
