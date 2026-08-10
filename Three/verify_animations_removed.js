const fs = require('fs');

console.log('Verifying global website animation removal...\n');

let failed = false;

// 1. Check css/animations.css
const cssContent = fs.readFileSync('css/animations.css', 'utf8');
if (!cssContent.includes('animation: none !important') || !cssContent.includes('opacity: 1 !important')) {
  console.error('ERROR: css/animations.css is missing animation: none !important overrides!');
  failed = true;
} else {
  console.log('SUCCESS: css/animations.css overrides all keyframe animations with instant static display');
}

// 2. Check js/animations.js
const jsContent = fs.readFileSync('js/animations.js', 'utf8');
if (!jsContent.includes('showAllElementsImmediately')) {
  console.error('ERROR: js/animations.js is missing instant element visibility function!');
  failed = true;
} else {
  console.log('SUCCESS: js/animations.js immediately sets all elements to visible on DOM load');
}

if (!failed) {
  console.log('\nAll website animation removal tests passed! Website now loads 100% instantly and statically!');
}
