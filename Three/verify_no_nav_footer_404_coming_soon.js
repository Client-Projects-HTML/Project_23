const fs = require('fs');

console.log('Verifying removal of navbar and footer for 404.html and coming-soon.html...\n');

let failed = false;

['404.html', 'coming-soon.html'].forEach(page => {
  const content = fs.readFileSync(page, 'utf8');

  if (content.includes('<header') || content.includes('<footer')) {
    console.error(`ERROR: ${page} still contains <header> or <footer> tags!`);
    failed = true;
  } else if (!content.includes('toggleRTL()') || !content.includes('toggleDarkMode()')) {
    console.error(`ERROR: ${page} is missing RTL/Theme toggle capabilities!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} is a clean standalone page (navbar & footer completely removed)`);
  }
});

if (!failed) {
  console.log('\nBoth 404.html and coming-soon.html are verified clean standalone pages!');
}
