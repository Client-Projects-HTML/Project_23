const fs = require('fs');

['404.html', 'coming-soon.html'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('rtlToggleBtn') && content.includes('themeToggleBtn')) {
    console.log(`SUCCESS: ${file} contains RTL and Theme buttons in navbar!`);
  } else {
    console.error(`ERROR: ${file} missing RTL or Theme button!`);
  }
});
