const fs = require('fs');

console.log('Verifying removal of Categories dropdown menu...\n');

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
  'track-service.html'
];

let failed = false;

pages.forEach(page => {
  if (fs.existsSync(page)) {
    const html = fs.readFileSync(page, 'utf8');
    if (html.includes('id="nav-categories"') && html.includes('categories.html#refrigerators')) {
      console.error(`ERROR: ${page} still contains a Categories dropdown menu!`);
      failed = true;
    } else {
      console.log(`SUCCESS: ${page} has a clean direct link for Categories (no dropdown)`);
    }
  }
});

if (!failed) {
  console.log('\nCategories dropdown menu removed cleanly from all navigation bars!');
}
