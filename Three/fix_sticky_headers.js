const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Ensuring all navbars and headers are 100% sticky and fixed across all pages...\n');

// 1. Process Admin Files
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure body has h-screen overflow-hidden flex
  content = content.replace(/<body class="([^"]*?)">/i, (match, classes) => {
    let newClasses = classes;
    if (!newClasses.includes('h-screen')) newClasses += ' h-screen';
    if (!newClasses.includes('overflow-hidden')) newClasses += ' overflow-hidden';
    return `<body class="${newClasses.trim()}">`;
  });

  // Ensure main content wrapper div has h-screen overflow-hidden
  content = content.replace(/<div class="flex-1 flex flex-col min-w-0">/g, '<div class="flex-1 flex flex-col h-screen overflow-hidden min-w-0">');

  // Ensure header has sticky top-0 shrink-0 z-30
  content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
    let newClasses = classes;
    if (!newClasses.includes('sticky')) newClasses += ' sticky';
    if (!newClasses.includes('top-0')) newClasses += ' top-0';
    if (!newClasses.includes('shrink-0')) newClasses += ' shrink-0';
    if (!newClasses.includes('z-30') && !newClasses.includes('z-50')) newClasses += ' z-30';
    return `<header class="${newClasses.trim()}">`;
  });

  // Ensure main has flex-1 overflow-y-auto
  content = content.replace(/<main class="flex-1 ([^"]*?)">/i, (match, rest) => {
    let classes = rest;
    if (!classes.includes('overflow-y-auto')) classes += ' overflow-y-auto';
    return `<main class="flex-1 ${classes.trim()}">`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED Admin Page: ${file}`);
});

// 2. Process Root Files
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

rootFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (file.startsWith('user-')) {
    // User Dashboard pages
    content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
      let newClasses = classes;
      if (!newClasses.includes('sticky')) newClasses += ' sticky';
      if (!newClasses.includes('top-0')) newClasses += ' top-0';
      if (!newClasses.includes('shrink-0')) newClasses += ' shrink-0';
      if (!newClasses.includes('z-30')) newClasses += ' z-30';
      return `<header class="${newClasses.trim()}">`;
    });
    console.log(`UPDATED User Dashboard Page: ${file}`);
  } else {
    // Public Store pages
    content = content.replace(/<header class="([^"]*?)">/i, (match, classes) => {
      let newClasses = classes;
      if (!newClasses.includes('sticky')) newClasses += ' sticky';
      if (!newClasses.includes('top-0')) newClasses += ' top-0';
      if (!newClasses.includes('z-50')) newClasses += ' z-50';
      if (!newClasses.includes('shadow-sm')) newClasses += ' shadow-sm';
      return `<header class="${newClasses.trim()}">`;
    });
    console.log(`UPDATED Public Store Page: ${file}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('\nSticky header fixes applied successfully across all pages!');
