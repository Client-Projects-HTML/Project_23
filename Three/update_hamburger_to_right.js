const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Updating hamburger navigation drawer to open from RIGHT across all pages...\n');

// 1. Update js/mobile-nav.js
const mobileNavPath = path.join(rootDir, 'js', 'mobile-nav.js');
let mobileNavContent = fs.readFileSync(mobileNavPath, 'utf8');

mobileNavContent = mobileNavContent.replace(
  /drawer\.className = '[^']*'/g,
  "drawer.className = 'fixed inset-y-0 end-0 w-72 bg-white dark:bg-slate-900 shadow-2xl z-50 transform translate-x-full rtl:-translate-x-full transition-transform duration-300 flex flex-col lg:hidden';"
);

const newToggleMenuJs = `  function toggleMenu() {
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
  }`;

mobileNavContent = mobileNavContent.replace(/function toggleMenu\(\) \{[\s\S]*?\n  \}/, newToggleMenuJs);
fs.writeFileSync(mobileNavPath, mobileNavContent, 'utf8');
console.log('UPDATED: js/mobile-nav.js to slide from right');

// 2. Update User Dashboard Pages (user-*.html)
const userFiles = fs.readdirSync(rootDir).filter(f => f.startsWith('user-') && f.endsWith('.html'));

userFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace mobileSidebar element positioning and transforms
  content = content.replace(
    /<aside id="mobileSidebar" class="([^"]*?)">/g,
    '<aside id="mobileSidebar" class="fixed inset-y-0 end-0 w-64 bg-white dark:bg-slate-900 shadow-2xl z-50 transform translate-x-full rtl:-translate-x-full transition-transform duration-300 flex flex-col lg:hidden">'
  );

  // Replace toggleMobileMenu implementation
  const newToggleMobileMenuJs = `function toggleMobileMenu(show) {
      if (!sidebar || !backdrop) return;
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      const closedClass = isRTL ? '-translate-x-full' : 'translate-x-full';

      if (show) {
        sidebar.classList.remove('translate-x-full', '-translate-x-full', 'ltr:-translate-x-full', 'rtl:translate-x-full', 'rtl:-translate-x-full');
        backdrop.classList.remove('hidden');
        setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
      } else {
        sidebar.classList.add(closedClass);
        backdrop.classList.add('opacity-0');
        setTimeout(() => backdrop.classList.add('hidden'), 300);
      }
    }`;

  content = content.replace(/function toggleMobileMenu\(show\) \{[\s\S]*?\n    \}/g, newToggleMobileMenuJs);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED User Page: ${file}`);
});

// 3. Update Admin Dashboard Pages (admin/*.html)
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /<aside id="adminSidebar" class="([^"]*?)">/g,
    '<aside id="adminSidebar" class="fixed lg:static top-0 end-0 bottom-0 w-64 bg-slate-900 border-s border-slate-800 z-50 flex flex-col justify-between translate-x-full rtl:-translate-x-full lg:!translate-x-0 transition-transform duration-300 ease-in-out shrink-0">'
  );

  const newAdminToggleJs = `function toggleSidebar() {
      const sidebar = document.getElementById('adminSidebar');
      const overlay = document.getElementById('sidebarOverlay');
      if (!sidebar || !overlay) return;
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      const closedClass = isRtl ? '-translate-x-full' : 'translate-x-full';

      if (sidebar.classList.contains('translate-x-full') || sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('translate-x-full', '-translate-x-full', 'rtl:translate-x-full', 'rtl:-translate-x-full');
        overlay.classList.remove('hidden');
      } else {
        sidebar.classList.add(closedClass);
        overlay.classList.add('hidden');
      }
    }`;

  content = content.replace(/function toggleSidebar\(\) \{[\s\S]*?\n    \}/g, newAdminToggleJs);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED Admin Page: ${file}`);
});

console.log('\nHamburger menu drawers successfully configured to open from RIGHT across all pages!');
