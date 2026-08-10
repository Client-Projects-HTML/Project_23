const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Auditing and reinforcing sticky navbar headers across all pages...\n');

let updatedCount = 0;

// 1. Process Public Store Pages & User Dashboard Pages
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

rootFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (file.startsWith('user-')) {
    // User Dashboard pages
    content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
      let clsList = classes.split(/\s+/);
      if (!clsList.includes('sticky')) clsList.push('sticky');
      if (!clsList.includes('top-0')) clsList.push('top-0');
      if (!clsList.includes('shrink-0')) clsList.push('shrink-0');
      if (!clsList.includes('z-30') && !clsList.includes('z-50')) clsList.push('z-30');
      return `<header class="${clsList.join(' ')}">`;
    });
  } else if (file !== '404.html' && file !== 'coming-soon.html') {
    // Public Store pages
    // Ensure body doesn't have overflow-hidden or overflow-x-hidden that breaks sticky
    content = content.replace(/<body class="([^"]*?)">/i, (match, classes) => {
      let clsList = classes.split(/\s+/).filter(c => c !== 'overflow-hidden' && c !== 'overflow-x-hidden');
      return `<body class="${clsList.join(' ')}">`;
    });

    // Ensure header has sticky top-0 z-50 shadow-sm backdrop-blur-md
    content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
      let clsList = classes.split(/\s+/);
      if (!clsList.includes('sticky')) clsList.push('sticky');
      if (!clsList.includes('top-0')) clsList.push('top-0');
      if (!clsList.includes('z-50')) clsList.push('z-50');
      if (!clsList.includes('shadow-sm')) clsList.push('shadow-sm');
      if (!clsList.includes('backdrop-blur-md')) clsList.push('backdrop-blur-md');
      return `<header class="${clsList.join(' ')}">`;
    });
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`REINFORCED Sticky Navbar: ${file}`);
    updatedCount++;
  }
});

// 2. Process Admin Pages
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
    let clsList = classes.split(/\s+/);
    if (!clsList.includes('sticky')) clsList.push('sticky');
    if (!clsList.includes('top-0')) clsList.push('top-0');
    if (!clsList.includes('shrink-0')) clsList.push('shrink-0');
    if (!clsList.includes('z-30') && !clsList.includes('z-50')) clsList.push('z-30');
    return `<header class="${clsList.join(' ')}">`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`REINFORCED Sticky Admin Header: ${file}`);
    updatedCount++;
  }
});

console.log(`\nSuccessfully verified and reinforced sticky navbars across ${updatedCount} files.`);
