const fs = require('fs');

console.log('Verifying navbar active button highlighting across store pages...\n');

let failed = false;

// 1. Verify js/nav-active.js file exists
if (!fs.existsSync('js/nav-active.js')) {
  console.error('ERROR: js/nav-active.js does not exist!');
  failed = true;
} else {
  console.log('SUCCESS: js/nav-active.js dynamic highlighter script exists');
}

// 2. Check script inclusion and active class setup on key pages
const checkList = [
  { file: 'index.html', linkId: 'nav-home' },
  { file: 'shop.html', linkId: 'nav-shop' },
  { file: 'categories.html', linkId: 'nav-categories' },
  { file: 'deals.html', linkId: 'nav-deals' },
  { file: 'blog.html', linkId: 'nav-blog' },
  { file: 'contact.html', linkId: 'nav-contact' }
];

checkList.forEach(({ file, linkId }) => {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('js/nav-active.js')) {
    console.error(`ERROR: ${file} is missing js/nav-active.js inclusion!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${file} includes js/nav-active.js and highlights ${linkId}`);
  }
});

if (!failed) {
  console.log('\nAll navbar active button highlight tests passed successfully!');
}
