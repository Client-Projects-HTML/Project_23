/**
 * ApplianceHub — Dynamic Navbar Active Link Highlighter
 * js/nav-active.js
 * Automatically highlights clicked navbar buttons based on the active page URL.
 */

(function () {
  'use strict';

  function highlightActiveNav() {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === '') currentPath = 'index.html';

    // Highlight Desktop Header Nav Links
    const headerNav = document.querySelector('header nav');
    if (headerNav) {
      const topNavLinks = headerNav.querySelectorAll(':scope > a, :scope > div > a');
      topNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
        
        const linkFile = href.split('/').pop();

        let isMatch = (currentPath === linkFile);
        if ((linkFile === 'index.html' || href === 'index.html') && (currentPath === 'index.html' || currentPath === 'home-v2.html')) {
          isMatch = true;
        } else if (linkFile === 'shop.html' && currentPath === 'product-detail.html') {
          isMatch = true;
        } else if (linkFile === 'blog.html' && (currentPath.startsWith('blog-detail') || currentPath === 'blog.html')) {
          isMatch = true;
        }

        if (isMatch) {
          link.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-hub-blue', 'font-extrabold');
          link.classList.remove('text-slate-700', 'dark:text-slate-200');
        } else {
          // Remove active styles from inactive links
          if (!link.querySelector('i[data-lucide="chevron-down"]')) {
            link.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-hub-blue', 'font-extrabold');
          }
        }
      });
    }

    // Highlight Mobile Drawer Nav Links
    const mobileDrawer = document.getElementById('mobileMenuDrawer');
    if (mobileDrawer) {
      const drawerLinks = mobileDrawer.querySelectorAll('a');
      drawerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkFile = href.split('/').pop();

        let isMatch = (currentPath === linkFile);
        if ((linkFile === 'index.html' || href === 'index.html') && (currentPath === 'index.html' || currentPath === 'home-v2.html')) {
          isMatch = true;
        } else if (linkFile === 'shop.html' && currentPath === 'product-detail.html') {
          isMatch = true;
        } else if (linkFile === 'blog.html' && currentPath.startsWith('blog-detail')) {
          isMatch = true;
        }

        if (isMatch) {
          link.classList.add('bg-hub-blue/10', 'text-hub-blue', 'font-extrabold');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightActiveNav);
  } else {
    highlightActiveNav();
  }
})();
