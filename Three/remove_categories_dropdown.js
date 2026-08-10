const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/geeth/project_23/Project_23/Three';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.js'));

console.log('Processing files to remove Categories dropdown menu...\n');

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex pattern matching the entire Categories dropdown block
  const categoriesDropdownRegex = /<!--\s*3\.\s*CATEGORIES\s*-->\s*<div class="relative group py-2">\s*<a href="categories\.html"[^>]*id="nav-categories"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi;

  if (categoriesDropdownRegex.test(content)) {
    content = content.replace(categoriesDropdownRegex, `<!-- 3. CATEGORIES -->
        <a href="categories.html" class="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-hub-blue transition-all" id="nav-categories">
          Categories
        </a>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED: Removed Categories dropdown in ${file}`);
    updatedCount++;
  }
});

console.log(`\nCompleted! Categories dropdown removed across ${updatedCount} files.`);
