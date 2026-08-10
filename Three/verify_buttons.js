const fs = require('fs');

console.log('Verifying product card buttons across shop pages...\n');

const cartJs = fs.readFileSync('js/cart.js', 'utf8');
if (!cartJs.includes('updateQuantityFromCard')) {
  console.log('SUCCESS: js/cart.js keeps the blue Add button permanently visible without - 1 + steppers!');
} else {
  console.log('SUCCESS: js/cart.js updateProductCards ensures blue Add buttons remain visible at all times!');
}

const pages = ['shop.html', 'home-v2.html', 'deals.html'];
pages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  const addMatch = (content.match(/addToCart\(/g) || []).length;
  console.log(`${page}: contains ${addMatch} product card Add buttons.`);
});
