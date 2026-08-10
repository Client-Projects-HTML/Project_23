const fs = require('fs');

console.log('Verifying User Dashboard layout structure & image fixes...\n');

const file = 'user-dashboard.html';
if (!fs.existsSync(file)) {
  console.error(`ERROR: File missing ${file}`);
  process.exit(1);
}

const content = fs.readFileSync(file, 'utf8');
let failed = false;

const checks = [
  '<main class="flex-1 overflow-y-auto',
  '<div class="max-w-6xl mx-auto space-y-6">',
  'grid grid-cols-2 lg:grid-cols-4 gap-4',
  'Affresh Cleaner Tabs',
  'onerror='
];

checks.forEach(check => {
  if (!content.includes(check)) {
    console.error(`ERROR: ${file} is missing check "${check}"`);
    failed = true;
  } else {
    console.log(`SUCCESS: Found "${check}" in ${file}`);
  }
});

if (!failed) {
  console.log('\nUser Dashboard layout grid and image fixes verified successfully!');
}
