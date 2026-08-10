const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';
const adminDir = path.join(rootDir, 'admin');

console.log('Fixing premature closing </div> tags in User and Admin Dashboards...\n');

let fixedCount = 0;

// 1. User Dashboard Pages
const userPages = [
  'user-dashboard.html',
  'user-orders.html',
  'user-services.html',
  'user-wallet.html',
  'user-addresses.html',
  'user-alerts.html',
  'user-settings.html',
  'user-track.html',
  'user-wishlist.html'
];

userPages.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('id="mobileSidebarBackdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 hidden lg:hidden transition-opacity opacity-0"></div></div>')) {
    content = content.replace(
      'id="mobileSidebarBackdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 hidden lg:hidden transition-opacity opacity-0"></div></div>',
      'id="mobileSidebarBackdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 hidden lg:hidden transition-opacity opacity-0"></div>'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED Extra Closing Tag: ${file}`);
    fixedCount++;
  }
});

// 2. Admin Dashboard Pages
const adminFiles = fs.readdirSync(adminDir).filter(f => f.endsWith('.html'));

adminFiles.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('id="mobileSidebarBackdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 hidden lg:hidden transition-opacity opacity-0"></div></div>')) {
    content = content.replace(
      'id="mobileSidebarBackdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 hidden lg:hidden transition-opacity opacity-0"></div></div>',
      'id="mobileSidebarBackdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 hidden lg:hidden transition-opacity opacity-0"></div>'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED Extra Closing Tag: admin/${file}`);
    fixedCount++;
  }
});

console.log(`\nSuccessfully removed premature closing </div> tags across ${fixedCount} dashboard templates.`);
