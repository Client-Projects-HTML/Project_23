const fs = require('fs');

console.log('Verifying Categories link in navigation bar across all HTML pages...\n');

const pages = [
  'index.html',
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
  'blog-detail-3.html'
];

let failed = false;

pages.forEach(page => {
  if (fs.existsSync(page)) {
    const html = fs.readFileSync(page, 'utf8');
    
    // Check if Categories item has dropdown div or chevron
    if (html.includes('id="nav-categories"') && (html.includes('group-hover:rotate-180') && html.includes('categories.html#refrigerators'))) {
      console.error(`ERROR: ${page} navbar still has dropdown menu for Categories!`);
      failed = true;
    } else if (html.includes('id="nav-categories"')) {
      console.log(`SUCCESS: ${page} navbar has a clean direct link for Categories (no dropdown menu)`);
    }
  }
});

if (!failed) {
  console.log('\nCategories dropdown menu removed cleanly from all navigation bars!');
}
