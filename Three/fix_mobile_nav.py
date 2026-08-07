import os
import re

directory = 'd:/Project_23/Three'

user_old = """    <!-- MOBILE TOP BAR -->
    <div class="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between shrink-0 relative z-20">
      <button class="p-2 -ms-2 text-slate-500 dark:text-slate-400 hover:text-hub-blue" id="dashboardMobileMenuBtn">
        <i data-lucide="menu" class="w-6 h-6"></i>
      </button>
      <div class="flex items-center gap-2">
        <button id="themeToggleBtnMobile" onclick="toggleDarkMode()" class="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          <i data-lucide="moon" id="themeIconMobile" class="w-4 h-4"></i>
        </button>
      </div>
    </div>"""

user_new = """    <!-- MOBILE TOP BAR -->
    <div class="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between shrink-0 relative z-20">
      <!-- Logo on the left -->
      <a href="index.html" class="flex items-center gap-2 shrink-0">
        <div class="w-8 h-8 bg-hub-blue text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md shadow-hub-blue/20">
          <i data-lucide="wrench" class="w-4 h-4"></i>
        </div>
        <span class="font-extrabold text-lg tracking-tight text-hub-dark dark:text-white leading-none">Appliance<span class="text-hub-blue">Hub</span></span>
      </a>
      <!-- Menu on the right -->
      <div class="flex items-center gap-2">
        <button id="themeToggleBtnMobile" onclick="toggleDarkMode()" class="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          <i data-lucide="moon" id="themeIconMobile" class="w-4 h-4"></i>
        </button>
        <button class="p-2 -me-2 text-slate-500 dark:text-slate-400 hover:text-hub-blue" id="dashboardMobileMenuBtn">
          <i data-lucide="menu" class="w-6 h-6"></i>
        </button>
      </div>
    </div>"""

# Replace in user-*.html
for filename in os.listdir(directory):
    if filename.startswith('user-') and filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            if user_old in content:
                content = content.replace(user_old, user_new)
                with open(filepath, 'w', encoding='utf-8') as fw:
                    fw.write(content)
                print(f"Updated {filename}")
            else:
                print(f"Skipped {filename} - Pattern not found")

# Now update admin dashboard pages
admin_dir = os.path.join(directory, 'admin')
for filename in os.listdir(admin_dir):
    if filename.endswith('.html') and filename != 'index.html':
        filepath = os.path.join(admin_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # The admin headers vary slightly because of the title, so we use regex
            # Find the header block
            header_pattern = re.compile(
                r'(<header class="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">)\s*'
                r'<div class="flex items-center gap-3">\s*'
                r'<button onclick="toggleSidebar\(\)" class="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white lg:hidden">\s*'
                r'<i data-lucide="menu" class="w-5 h-5"></i>\s*'
                r'</button>\s*'
                r'(<h1 class="text-base sm:text-lg font-bold text-white">.*?</h1>)\s*'
                r'</div>', re.DOTALL
            )
            
            def replace_left_side(match):
                prefix = match.group(1)
                title = match.group(2)
                return (
                    f"{prefix}\n"
                    f"      <div class=\"flex items-center gap-3\">\n"
                    f"        <!-- Mobile Logo -->\n"
                    f"        <a href=\"../index.html\" class=\"flex lg:hidden items-center gap-2 shrink-0\">\n"
                    f"          <div class=\"w-8 h-8 bg-gradient-to-tr from-hub-blueDark to-hub-blue text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md\">\n"
                    f"            <i data-lucide=\"shield-check\" class=\"w-4 h-4\"></i>\n"
                    f"          </div>\n"
                    f"        </a>\n"
                    f"        <!-- Desktop Title -->\n"
                    f"        <div class=\"hidden lg:block\">\n"
                    f"          {title}\n"
                    f"        </div>\n"
                    f"      </div>"
                )
            
            new_content = header_pattern.sub(replace_left_side, content)
            
            # Now we need to insert the menu button into the right-side gap block
            right_side_pattern = re.compile(
                r'(<div class="flex items-center gap-1\.5 sm:gap-2\.5">.*?)(</header>)', re.DOTALL
            )
            
            def replace_right_side(match):
                inner_content = match.group(1)
                closing = match.group(2)
                menu_btn = (
                    "        <!-- MOBILE MENU BTN ON RIGHT -->\n"
                    "        <button onclick=\"toggleSidebar()\" class=\"p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all lg:hidden\">\n"
                    "          <i data-lucide=\"menu\" class=\"w-4 h-4\"></i>\n"
                    "        </button>\n"
                )
                return inner_content + menu_btn + "      </div>\n    " + closing
            
            new_content2 = right_side_pattern.sub(replace_right_side, new_content)
            
            if new_content2 != content:
                with open(filepath, 'w', encoding='utf-8') as fw:
                    fw.write(new_content2)
                print(f"Updated {filename}")
            else:
                print(f"Skipped {filename} - No changes made")
