const fs = require('fs');
const path = require('path');

console.log('Removing "Store & Service" subtitle from all headers across the website...\n');

const targetStr1 = '';
const targetStr2 = '';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(targetStr1) || content.includes(targetStr2)) {
    content = content.split(targetStr1).join('');
    content = content.split(targetStr2).join('');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed subtitle from: ${path.relative('.', filePath)}`);
  }
}

function scanAndClean(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') scanAndClean(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.js')) {
      processFile(fullPath);
    }
  });
}

scanAndClean('.');
console.log('\nFinished cleaning Store & Service subtitles!');
