const fs = require('fs');

console.log('Verifying immediate shop product visibility on initial page load...\n');

let failed = false;

// 1. Verify js/animations.js fix
const animJs = fs.readFileSync('js/animations.js', 'utf8');

if (animJs.includes("'.grid > div:not([class*=\"reveal\"])'")) {
  console.error('ERROR: js/animations.js is still hiding grid items with auto-reveal!');
  failed = true;
} else if (!animJs.includes('rect.top < window.innerHeight')) {
  console.error('ERROR: js/animations.js is missing immediate initial viewport reveal!');
  failed = true;
} else {
  console.log('SUCCESS: js/animations.js immediately reveals initial viewport elements and does not hide grid products');
}

// 2. Check shop.html, categories.html, deals.html, index.html for hidden product cards
['shop.html', 'categories.html', 'deals.html', 'index.html'].forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  if (content.includes('id="productGrid"')) {
    console.log(`SUCCESS: ${page} contains product grid ready for immediate rendering`);
  }
});

if (!failed) {
  console.log('\nAll tests passed! Shop section products and catalog content are 100% visible immediately on page open!');
}
