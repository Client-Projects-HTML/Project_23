const fs = require('fs');
const path = require('path');

const dir = 'd:\\Project_23\\Three';

const newFooter = `  <!-- FOOTER -->
  <footer class="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-12 border-t border-slate-200 dark:border-slate-800 text-xs mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      
      <div class="space-y-4">
        <span class="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-hub-blue flex items-center justify-center text-white">
            <i data-lucide="shopping-bag" class="w-4 h-4"></i>
          </span>
          Appliance<span class="text-hub-blue">Hub</span>
        </span>
        <p class="leading-relaxed pr-4">ApplianceHub is your trusted destination for genuine appliance sales and 24/7 doorstep repair services, delivering quality straight to your home.</p>
        <div class="flex space-x-3 pt-2">
          <a href="#" class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:text-hub-blue transition-colors shadow-sm"><i data-lucide="facebook" class="w-4 h-4"></i></a>
          <a href="#" class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:text-hub-blue transition-colors shadow-sm"><i data-lucide="twitter" class="w-4 h-4"></i></a>
          <a href="#" class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:text-hub-blue transition-colors shadow-sm"><i data-lucide="instagram" class="w-4 h-4"></i></a>
        </div>
      </div>

      <div>
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h4>
        <ul class="space-y-2.5">
          <li><a href="index.html" class="hover:text-hub-blue transition-colors">Home</a></li>
          <li><a href="shop.html" class="hover:text-hub-blue transition-colors">Shop</a></li>
          <li><a href="services.html" class="hover:text-hub-blue transition-colors">Book Repair Service</a></li>
          <li><a href="deals.html" class="hover:text-hub-blue transition-colors">Deals</a></li>
          <li><a href="blog.html" class="hover:text-hub-blue transition-colors">Blog</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">Shop Categories</h4>
        <ul class="space-y-2.5">
          <li><a href="shop.html" class="hover:text-hub-blue transition-colors">All Products</a></li>
          <li><a href="shop.html?cat=refrigerators" class="hover:text-hub-blue transition-colors">Refrigerators</a></li>
          <li><a href="shop.html?cat=washing-machines" class="hover:text-hub-blue transition-colors">Washing Machines</a></li>
          <li><a href="shop.html?cat=air-conditioners" class="hover:text-hub-blue transition-colors">Air Conditioners</a></li>
          <li><a href="shop.html?cat=ovens" class="hover:text-hub-blue transition-colors">Built-in Ovens</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">Customer Support</h4>
        <ul class="space-y-2.5">
          <li><a href="contact.html" class="hover:text-hub-blue transition-colors">Help & FAQ Center</a></li>
          <li><a href="track-service.html" class="hover:text-hub-blue transition-colors">Live Order Tracking</a></li>
          <li><a href="login.html" class="hover:text-hub-blue transition-colors">Order History</a></li>
          <li><a href="404.html" class="hover:text-hub-blue transition-colors">Returns & Refunds</a></li>
          <li><a href="coming-soon.html" class="hover:text-hub-blue transition-colors">Terms of Service</a></li>
        </ul>
      </div>

    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
      <p>&copy; 2026 ApplianceHub Inc. All rights reserved.</p>
      <div class="text-right text-[10px] text-slate-500 flex items-center justify-center gap-1">
        <span>Developed by</span>
        <span class="font-bold text-hub-blue">Abhivorn Technologies Pvt.Ltd.</span>
      </div>
    </div>
  </footer>\n`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const footerRegex = /<footer[\s\S]*?<\/footer>/g;
  
  const fileName = path.basename(filePath);
  const isDashboard = filePath.includes(path.sep + 'admin' + path.sep) || fileName.startsWith('user-');

  if (isDashboard) {
    // If it's a dashboard file, REMOVE any footer found (and any preceding <!-- FOOTER --> comment)
    let modified = false;
    if (footerRegex.test(content)) {
      content = content.replace(footerRegex, '');
      modified = true;
    }
    if (content.includes('<!-- FOOTER -->')) {
      content = content.replace(/[\ \t]*<!-- FOOTER -->\n?/g, '');
      modified = true;
    }
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Removed footer from dashboard file', filePath);
    } else {
      console.log('Skipped dashboard file', filePath);
    }
    return;
  }
  
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, newFooter.trim());
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated existing footer in', filePath);
  } else {
    // Inject footer before the closing main or body tag, or before the first script at the bottom
    let injected = false;
    
    if (content.includes('</main>')) {
      content = content.replace('</main>', '</main>\n' + newFooter);
      injected = true;
    } else if (content.includes('</body>')) {
      // Find the first <script> right before body and inject before it if possible, else just before </body>
      const scriptBodyMatch = content.match(/<script[\s\S]*?<\/script>[\s]*<\/body>/);
      if(scriptBodyMatch) {
         content = content.replace(scriptBodyMatch[0], newFooter + '\n' + scriptBodyMatch[0]);
      } else {
         content = content.replace('</body>', newFooter + '\n</body>');
      }
      injected = true;
    }
    
    if (injected) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Added missing footer to', filePath);
    } else {
      console.log('Could not determine where to add footer in', filePath);
    }
  }
}

function traverse(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    if (file === 'node_modules' || file.startsWith('.')) continue;
    const fullPath = path.join(currentPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverse(fullPath);
    } else if (file.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

traverse(dir);
