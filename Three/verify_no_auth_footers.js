const fs = require('fs');

console.log('Verifying footer removal from login.html and signup.html...\n');

['login.html', 'signup.html'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('<footer')) {
    console.log(`SUCCESS: ${file} does NOT contain a footer!`);
  } else {
    console.error(`ERROR: ${file} still contains a footer!`);
  }
});
