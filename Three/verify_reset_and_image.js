const fs = require('fs');

console.log('Verifying Reset button behavior & Product 9 image fix...\n');

const shopHtml = fs.readFileSync('shop.html', 'utf8');

// 1. Verify resetFilters function
if (shopHtml.includes("document.querySelectorAll('.cat-checkbox, .brand-checkbox').forEach(cb => cb.checked = false);")) {
  console.log('SUCCESS: resetFilters() unchecks ALL category and brand checkboxes (tick marks become empty)!');
} else {
  console.error('ERROR: resetFilters() does not uncheck all checkboxes!');
}

// 2. Verify Product 9 image URL & onerror attribute
if (shopHtml.includes('photo-1617881840158-83582680d905') && shopHtml.includes('onerror="this.onerror=null')) {
  console.log('SUCCESS: Product 9 (Aquaguard RO Water Purifier) image URL updated with fallback protection!');
} else {
  console.error('ERROR: Product 9 image URL or onerror attribute missing!');
}
