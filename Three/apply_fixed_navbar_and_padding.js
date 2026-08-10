const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';

console.log('Applying position: fixed navbar across all store pages including cart and checkout...\n');

let updatedCount = 0;

const publicPages = [
  'index.html',
  'home-v2.html',
  'shop.html',
  'categories.html',
  'deals.html',
  'blog.html',
  'contact.html',
  'cart.html',
  'checkout.html',
  'services.html',
  'track-service.html',
  'blog-detail.html',
  'blog-detail-2.html',
  'blog-detail-3.html',
  'product-detail.html'
];

publicPages.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Handle pages with top utility bar container
  if (content.includes('<!-- TOP UTILITY BAR -->') && !content.includes('class="fixed top-0 left-0 right-0 w-full z-50')) {
    content = content.replace(/<!-- TOP UTILITY BAR -->/g, '<div class="fixed top-0 left-0 right-0 w-full z-50 shadow-md">\n  <!-- TOP UTILITY BAR -->');
    content = content.replace(/<\/header>/g, '</header>\n</div>');
  } else if (!content.includes('class="fixed top-0 left-0 right-0 w-full z-50')) {
    // Handle cart.html and checkout.html (header alone)
    content = content.replace(/<header class="([^"]*?)">/g, (match, classes) => {
      let clsList = classes.split(/\s+/).filter(c => c !== 'sticky');
      if (!clsList.includes('fixed')) clsList.push('fixed');
      if (!clsList.includes('top-0')) clsList.push('top-0');
      if (!clsList.includes('left-0')) clsList.push('left-0');
      if (!clsList.includes('right-0')) clsList.push('right-0');
      if (!clsList.includes('w-full')) clsList.push('w-full');
      if (!clsList.includes('z-50')) clsList.push('z-50');
      if (!clsList.includes('shadow-md')) clsList.push('shadow-md');
      return `<header class="${clsList.join(' ')}">`;
    });
  }

  // Ensure main or first section has top padding offset
  if (file === 'cart.html' || file === 'checkout.html') {
    content = content.replace(/<main class="([^"]*?)"/i, (match, classes) => {
      let clsList = classes.split(/\s+/).filter(c => !c.startsWith('pt-') && !c.startsWith('py-'));
      clsList.push('pt-28', 'sm:pt-32', 'pb-16');
      return `<main class="${clsList.join(' ')}"`;
    });
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED 100% Fixed Navbar: ${file}`);
  updatedCount++;
});

console.log(`\nSuccessfully applied position: fixed navbar across ${updatedCount} store pages.`);
