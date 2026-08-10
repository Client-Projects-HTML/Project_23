const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const requiredPages = [
  'index.html',
  'home-v2.html',
  'shop.html',
  'categories.html',
  'deals.html',
  'blog.html',
  'contact.html',
  'services.html',
  'cart.html',
  'checkout.html',
  'track-service.html',
  'login.html',
  'signup.html'
];

let failed = false;

requiredPages.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${file}`);
    failed = true;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('Developed by') || !content.includes('Abhivorn Technologies Pvt.Ltd.')) {
    console.error(`Footer missing in: ${file}`);
    failed = true;
  } else {
    console.log(`Verified global footer in: ${file}`);
  }
});

if (!failed) {
  console.log('\nSUCCESS: All primary pages contain the exact global footer!');
}
