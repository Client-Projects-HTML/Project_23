const fs = require('fs');
const path = require('path');

const targetDir = __dirname;

const globalFooter = `  <!-- FOOTER -->
  <footer class="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <!-- COLUMN 1: BRAND & SOCIAL LOGOS -->
        <div class="space-y-4">
          <a href="index.html" class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-hub-blue text-white flex items-center justify-center font-bold text-lg shadow-md shadow-hub-blue/20">
              <i data-lucide="shopping-bag" class="w-4.5 h-4.5"></i>
            </div>
            <span class="font-extrabold text-xl tracking-tight text-white">Appliance <span class="text-hub-blue">Hub</span></span>
          </a>
          <p class="leading-relaxed pr-4 text-slate-400 text-xs">
            ApplianceHub is your trusted destination for genuine appliance sales and 24/7 doorstep repair services, delivering quality straight to your home.
          </p>
          
          <!-- OFFICIAL BRAND SOCIAL LOGOS (FACEBOOK, TWITTER/X, INSTAGRAM, YOUTUBE, LINKEDIN) -->
          <div class="flex items-center gap-2.5 pt-2">
            <!-- Facebook -->
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white flex items-center justify-center transition-all shadow-sm group" title="Facebook">
              <svg class="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>

            <!-- Twitter / X -->
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-700 hover:border-slate-600 hover:text-white flex items-center justify-center transition-all shadow-sm group" title="Twitter / X">
              <svg class="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>

            <!-- Instagram -->
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:border-rose-500 hover:text-white flex items-center justify-center transition-all shadow-sm group" title="Instagram">
              <svg class="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>

            <!-- YouTube -->
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white flex items-center justify-center transition-all shadow-sm group" title="YouTube">
              <svg class="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>

            <!-- LinkedIn -->
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white flex items-center justify-center transition-all shadow-sm group" title="LinkedIn">
              <svg class="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
          </div>
        </div>

        <!-- COLUMN 2: QUICK NAVIGATION -->
        <div>
          <h4 class="font-bold text-white mb-4 text-sm">Quick Navigation</h4>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><a href="index.html" class="hover:text-white transition-colors">Home</a></li>
            <li><a href="shop.html" class="hover:text-white transition-colors">Shop</a></li>
            <li><a href="services.html" class="hover:text-white transition-colors">Book Repair Service</a></li>
            <li><a href="deals.html" class="hover:text-white transition-colors">Deals</a></li>
            <li><a href="blog.html" class="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        <!-- COLUMN 3: SHOP CATEGORIES -->
        <div>
          <h4 class="font-bold text-white mb-4 text-sm">Shop Categories</h4>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><a href="shop.html" class="hover:text-white transition-colors">All Products</a></li>
            <li><a href="categories.html#refrigerators" class="hover:text-white transition-colors">Refrigerators</a></li>
            <li><a href="categories.html#washing-machines" class="hover:text-white transition-colors">Washing Machines</a></li>
            <li><a href="categories.html#air-conditioners" class="hover:text-white transition-colors">Air Conditioners</a></li>
            <li><a href="categories.html#microwaves" class="hover:text-white transition-colors">Built-in Ovens</a></li>
          </ul>
        </div>

        <!-- COLUMN 4: CUSTOMER SUPPORT -->
        <div>
          <h4 class="font-bold text-white mb-4 text-sm">Customer Support</h4>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><a href="contact.html" class="hover:text-white transition-colors">Help & FAQ Center</a></li>
            <li><a href="track-service.html" class="hover:text-white transition-colors">Live Order Tracking</a></li>
            <li><a href="login.html" class="hover:text-white transition-colors">Order History</a></li>
            <li><a href="404.html" class="hover:text-white transition-colors">Returns & Refunds</a></li>
            <li><a href="coming-soon.html" class="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

      </div>

      <!-- BOTTOM BAR -->
      <div class="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-400">
        <p>&copy; 2026 ApplianceHub Inc. All rights reserved.</p>
        <div class="flex items-center gap-1">
          <span>Developed by</span>
          <span class="font-bold text-hub-blue">Abhivorn Technologies Pvt.Ltd.</span>
        </div>
      </div>

    </div>
  </footer>`;

function updateFooterInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const footerRegex = /<!-- FOOTER -->\s*<footer[\s\S]*?<\/footer>|<footer[\s\S]*?<\/footer>/g;

  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, globalFooter.trim());
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Successfully updated footer in:', path.basename(filePath));
  } else {
    console.log('No footer found in:', path.basename(filePath));
  }
}

const files = fs.readdirSync(targetDir);
files.forEach(file => {
  if (file.endsWith('.html') && file !== 'login.html' && file !== 'signup.html') {
    updateFooterInFile(path.join(targetDir, file));
  }
});
