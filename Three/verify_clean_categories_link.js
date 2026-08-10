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
    
    // Find lines containing nav-categories
    const lines = html.split('\n');
    const categoryLineIndex = lines.findIndex(l => l.includes('id="nav-categories"'));
    
    if (categoryLineIndex !== -1) {
      const surroundingContext = lines.slice(Math.max(0, categoryLineIndex - 2), categoryLineIndex + 5).join('\n');
      if (surroundingContext.includes('group-hover') || surroundingContext.includes('chevron-down')) {
        console.error(`ERROR: ${page} navbar Categories item has dropdown code! Context:\n${surroundingContext}`);
        failed = true;
      } else {
        console.log(`SUCCESS: ${page} navbar has a clean direct link for Categories`);
      }
    } else {
      console.log(`INFO: ${page} does not have id="nav-categories"`);
    }
  }
});

if (!failed) {
  console.log('\nAll navbars verified! Categories dropdown menu has been completely removed!');
}
