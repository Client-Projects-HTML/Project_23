const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';

console.log('Injecting js/nav-active.js and configuring static active link highlights across all store pages...\n');

let updatedCount = 0;

const pagesConfig = [
  { file: 'index.html', activeId: 'nav-home' },
  { file: 'home-v2.html', activeId: 'nav-home' },
  { file: 'shop.html', activeId: 'nav-shop' },
  { file: 'categories.html', activeId: 'nav-categories' },
  { file: 'deals.html', activeId: 'nav-deals' },
  { file: 'blog.html', activeId: 'nav-blog' },
  { file: 'contact.html', activeId: 'nav-contact' },
  { file: 'cart.html', activeId: null },
  { file: 'checkout.html', activeId: null },
  { file: 'services.html', activeId: null },
  { file: 'track-service.html', activeId: null },
  { file: 'blog-detail.html', activeId: 'nav-blog' },
  { file: 'blog-detail-2.html', activeId: 'nav-blog' },
  { file: 'blog-detail-3.html', activeId: 'nav-blog' },
  { file: 'product-detail.html', activeId: 'nav-shop' }
];

pagesConfig.forEach(({ file, activeId }) => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Inject js/nav-active.js into head if missing
  if (!content.includes('js/nav-active.js')) {
    content = content.replace(
      /<script src="js\/cart.js" defer><\/script>/i,
      '<script src="js/cart.js" defer></script>\n  <script src="js/nav-active.js" defer></script>'
    );
  }

  // Update static active classes in navbar
  const navItemIds = ['nav-home', 'nav-shop', 'nav-categories', 'nav-deals', 'nav-blog', 'nav-contact'];

  navItemIds.forEach(id => {
    const isActive = (id === activeId);

    // Replace class for target link id
    const activeRegex = new RegExp(`id="${id}" class="([^"]*?)"`, 'g');
    content = content.replace(activeRegex, (match, classes) => {
      let clsList = classes.split(/\s+/);
      if (isActive) {
        if (!clsList.includes('bg-slate-100')) clsList.push('bg-slate-100');
        if (!clsList.includes('dark:bg-slate-800')) clsList.push('dark:bg-slate-800');
        if (!clsList.includes('text-hub-blue')) clsList.push('text-hub-blue');
        if (!clsList.includes('font-extrabold')) clsList.push('font-extrabold');
        clsList = clsList.filter(c => c !== 'hover:bg-slate-100' && c !== 'dark:hover:bg-slate-800');
      } else {
        clsList = clsList.filter(c => c !== 'bg-slate-100' && c !== 'dark:bg-slate-800' && c !== 'text-hub-blue');
        if (!clsList.includes('hover:bg-slate-100')) clsList.push('hover:bg-slate-100');
        if (!clsList.includes('dark:hover:bg-slate-800')) clsList.push('dark:hover:bg-slate-800');
        if (!clsList.includes('hover:text-hub-blue')) clsList.push('hover:text-hub-blue');
      }
      return `id="${id}" class="${clsList.join(' ')}"`;
    });
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED Nav Active Highlighter: ${file}`);
  updatedCount++;
});

console.log(`\nSuccessfully applied navbar active link highlighter across ${updatedCount} store pages.`);
