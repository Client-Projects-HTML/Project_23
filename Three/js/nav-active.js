/**
 * ApplianceHub — Dynamic Navbar Active Link Highlighter
 * js/nav-active.js
 * Automatically highlights clicked navbar buttons based on the active page URL.
 */

(function () {
  'use strict';

  function setupDropdownsAndActiveNav() {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === '') currentPath = 'index.html';

    // 1. Setup Desktop Header Dropdown Toggle & Click Support
    const homeDropdownGroup = document.querySelector('header nav .relative.group, header nav div.relative');
    if (homeDropdownGroup) {
      const homeTrigger = homeDropdownGroup.querySelector('#nav-home, a[href="index.html"]');
      const homeMenu = homeDropdownGroup.querySelector('div[class*="absolute"]');
      const chevron = homeTrigger ? homeTrigger.querySelector('[data-lucide="chevron-down"]') : null;

      if (homeTrigger && homeMenu) {
        // Toggle on click (essential for tablet, iPad, touchscreen laptops, and mouse clicks)
        homeTrigger.addEventListener('click', function (e) {
          // If clicked directly, prevent instant redirect and toggle dropdown menu
          e.preventDefault();
          e.stopPropagation();
          const isOpen = homeMenu.classList.contains('!block') || (!homeMenu.classList.contains('hidden') && window.getComputedStyle(homeMenu).display !== 'none');
          
          if (isOpen) {
            homeMenu.classList.remove('!block');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
          } else {
            homeMenu.classList.add('!block');
            if (chevron) chevron.style.transform = 'rotate(180deg)';
          }
        });

        // Close when clicking outside
        document.addEventListener('click', function (e) {
          if (!homeDropdownGroup.contains(e.target)) {
            homeMenu.classList.remove('!block');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
          }
        });
      }

      // Highlight active dropdown item inside Home Menu
      if (homeMenu) {
        const homeMenuLinks = homeMenu.querySelectorAll('a');
        homeMenuLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (!href) return;
          const linkFile = href.split('/').pop();
          if (linkFile === currentPath || (linkFile === 'index.html' && (currentPath === 'index.html' || currentPath === ''))) {
            link.classList.add('bg-slate-100', 'dark:bg-slate-700/80', 'text-hub-blue');
          }
        });
      }
    }

    // 2. Highlight Desktop Header Nav Links
    const headerNav = document.querySelector('header nav');
    if (headerNav) {
      const topNavLinks = headerNav.querySelectorAll(':scope > a, :scope > div > a');
      topNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
        
        const linkFile = href.split('/').pop();

        let isMatch = (currentPath === linkFile);
        if ((linkFile === 'index.html' || href === 'index.html') && (currentPath === 'index.html' || currentPath === 'home-v2.html' || currentPath === '')) {
          isMatch = true;
        } else if (linkFile === 'shop.html' && currentPath === 'product-detail.html') {
          isMatch = true;
        } else if (linkFile === 'blog.html' && (currentPath.startsWith('blog-detail') || currentPath === 'blog.html')) {
          isMatch = true;
        }

        if (isMatch) {
          link.classList.add('text-hub-blue', 'font-extrabold');
          link.classList.remove('text-slate-700', 'dark:text-slate-200');
        } else {
          // Remove active styles from inactive links
          if (!link.querySelector('i[data-lucide="chevron-down"]')) {
            link.classList.remove('text-hub-blue', 'font-extrabold');
          }
        }
      });
    }

    // 3. Highlight Mobile Drawer Nav Links
    const mobileDrawer = document.getElementById('mobileMenuDrawer');
    if (mobileDrawer) {
      const drawerLinks = mobileDrawer.querySelectorAll('a');
      drawerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkFile = href.split('/').pop();

        let isMatch = false;
        if (linkFile === 'home-v2.html' && currentPath === 'home-v2.html') {
          isMatch = true;
        } else if (linkFile === 'index.html' && (currentPath === 'index.html' || currentPath === '')) {
          isMatch = true;
        } else if (linkFile === currentPath) {
          isMatch = true;
        } else if (linkFile === 'shop.html' && currentPath === 'product-detail.html') {
          isMatch = true;
        } else if (linkFile === 'blog.html' && currentPath.startsWith('blog-detail')) {
          isMatch = true;
        }

        if (isMatch) {
          link.classList.add('text-hub-blue', 'font-extrabold');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDropdownsAndActiveNav);
  } else {
    setupDropdownsAndActiveNav();
  }
})();
