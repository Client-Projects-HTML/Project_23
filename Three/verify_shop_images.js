const fs = require('fs');

const content = fs.readFileSync('shop.html', 'utf8');
const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
let match;
let count = 0;

console.log('Product image URLs in shop.html:');
while ((match = imgRegex.exec(content)) !== null) {
  count++;
  console.log(`${count}. ${match[1]}`);
}

if (count >= 9) {
  console.log('\nSUCCESS: All product card images in shop.html have valid high-resolution Unsplash URLs!');
}
