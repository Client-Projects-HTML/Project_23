import os
import re

files = [
    "user-dashboard.html",
    "user-orders.html",
    "user-track.html",
    "user-wishlist.html",
    "user-addresses.html",
    "user-wallet.html",
    "user-alerts.html",
    "user-settings.html"
]

desktop_nav_template = """      <nav class="flex-1 px-4 space-y-1 overflow-y-auto">
        <a href="user-dashboard.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {dash_cls} text-xs font-bold transition-all">
          <i data-lucide="layout-dashboard" class="w-4 h-4"></i> <span>User Dashboard</span>
        </a>
        <a href="user-orders.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {orders_cls} text-xs font-bold transition-all">
          <i data-lucide="history" class="w-4 h-4"></i> <span>My Orders & Tracking</span>
        </a>
        <a href="user-wishlist.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {wishlist_cls} text-xs font-bold transition-all">
          <i data-lucide="heart" class="w-4 h-4"></i> <span>Wishlist & Favorites</span>
        </a>
        <a href="user-addresses.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {addresses_cls} text-xs font-bold transition-all">
          <i data-lucide="map-pin" class="w-4 h-4"></i> <span>Delivery Addresses</span>
        </a>
        <a href="user-wallet.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {wallet_cls} text-xs font-bold transition-all">
          <i data-lucide="credit-card" class="w-4 h-4"></i> <span>Payment Methods & Wallet</span>
        </a>
        <a href="user-alerts.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {alerts_cls} text-xs font-bold transition-all">
          <i data-lucide="bell" class="w-4 h-4"></i> <span>Alerts & Promotions</span>
        </a>
        <a href="user-settings.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {settings_cls} text-xs font-bold transition-all">
          <i data-lucide="user-cog" class="w-4 h-4"></i> <span>Profile Settings</span>
        </a>
      </nav>"""

mobile_nav_template = """      <nav class="flex-1 px-4 space-y-1 overflow-y-auto">
        <a href="user-dashboard.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {dash_m_cls} text-xs font-bold">
          <i data-lucide="layout-dashboard" class="w-4 h-4"></i> <span>User Dashboard</span>
        </a>
        <a href="user-orders.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {orders_m_cls} text-xs font-bold">
          <i data-lucide="history" class="w-4 h-4"></i> <span>My Orders & Tracking</span>
        </a>
        <a href="user-wishlist.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {wishlist_m_cls} text-xs font-bold">
          <i data-lucide="heart" class="w-4 h-4"></i> <span>Wishlist & Favorites</span>
        </a>
        <a href="user-addresses.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {addresses_m_cls} text-xs font-bold">
          <i data-lucide="map-pin" class="w-4 h-4"></i> <span>Delivery Addresses</span>
        </a>
        <a href="user-wallet.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {wallet_m_cls} text-xs font-bold">
          <i data-lucide="credit-card" class="w-4 h-4"></i> <span>Payment Methods & Wallet</span>
        </a>
        <a href="user-alerts.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {alerts_m_cls} text-xs font-bold">
          <i data-lucide="bell" class="w-4 h-4"></i> <span>Alerts & Promotions</span>
        </a>
        <a href="user-settings.html" class="flex items-center gap-3 px-4 py-3 rounded-xl {settings_m_cls} text-xs font-bold">
          <i data-lucide="user-cog" class="w-4 h-4"></i> <span>Profile Settings</span>
        </a>
      </nav>"""

base_dir = r"d:\Project_23\Three"

inactive = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
active = "bg-hub-blue text-white shadow-md shadow-hub-blue/20"

inactive_m = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
active_m = "bg-hub-blue text-white shadow-md shadow-hub-blue/20"

for filename in files:
    filepath = os.path.join(base_dir, filename)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    d = inactive; o = inactive; w = inactive; a = inactive; wal = inactive; al = inactive; s = inactive
    dm = inactive_m; om = inactive_m; wm = inactive_m; am = inactive_m; walm = inactive_m; alm = inactive_m; sm = inactive_m

    if filename == "user-dashboard.html": d = active; dm = active_m
    elif filename in ["user-orders.html", "user-track.html"]: o = active; om = active_m
    elif filename == "user-wishlist.html": w = active; wm = active_m
    elif filename == "user-addresses.html": a = active; am = active_m
    elif filename == "user-wallet.html": wal = active; walm = active_m
    elif filename == "user-alerts.html": al = active; alm = active_m
    elif filename == "user-settings.html": s = active; sm = active_m

    new_desktop = desktop_nav_template.format(dash_cls=d, orders_cls=o, wishlist_cls=w, addresses_cls=a, wallet_cls=wal, alerts_cls=al, settings_cls=s)
    new_mobile = mobile_nav_template.format(dash_m_cls=dm, orders_m_cls=om, wishlist_m_cls=wm, addresses_m_cls=am, wallet_m_cls=walm, alerts_m_cls=alm, settings_m_cls=sm)

    # Replace first match (desktop)
    content = re.sub(r'(?s)      <nav class="flex-1 px-4 space-y-1 overflow-y-auto">.*?</nav>', new_desktop, content, count=1)
    
    # Replace second match (mobile)
    content = re.sub(r'(?s)      <nav class="flex-1 px-4 space-y-1 overflow-y-auto">.*?</nav>', new_mobile, content, count=1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated navigation sidebars across {len(files)} files.")
