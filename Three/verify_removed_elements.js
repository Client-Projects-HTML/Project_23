const fs = require('fs');

console.log('Verifying removal of requested buttons & sections...\n');

const checks = [
  { file: 'user-services.html', text: 'Book New Service' },
  { file: 'user-dashboard.html', text: 'Book Service' },
  { file: 'user-dashboard.html', text: 'Shop Parts' },
  { file: 'user-dashboard.html', text: 'Need an Appliance Fixed?' },
  { file: 'user-dashboard.html', text: 'Schedule a Service' }
];

let failed = false;

checks.forEach(check => {
  if (!fs.existsSync(check.file)) return;
  const content = fs.readFileSync(check.file, 'utf8');
  if (content.includes(check.text)) {
    console.error(`ERROR: "${check.text}" is still present in ${check.file}`);
    failed = true;
  } else {
    console.log(`SUCCESS: "${check.text}" removed from ${check.file}`);
  }
});

if (!failed) {
  console.log('\nAll requested buttons and sections have been completely removed!');
}
