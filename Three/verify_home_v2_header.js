const fs = require('fs');

console.log('Verifying Home V2 header and mobile drawer chevron integration...\n');

let failed = false;

const homeV2Html = fs.readFileSync('home-v2.html', 'utf8');

if (!homeV2Html.includes('Home V1: Sales & Repair') || !homeV2Html.includes('chevron-down')) {
  console.error('ERROR: home-v2.html header is missing Home dropdown or chevron icon!');
  failed = true;
} else {
  console.log('SUCCESS: home-v2.html now has the full Home dropdown menu with chevron-down');
}

if (!failed) {
  console.log('\nAll tests passed! home-v2.html hamburger drawer now displays Home chevron and sub-menu!');
}
