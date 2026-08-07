/* ApplianceHub Admin Portal — theme (dark/light) + direction (LTR/RTL) toggles */

(function () {
  // Admin portal defaults to DARK (its native design) unless the user
  // has explicitly switched to light mode before.
  var savedTheme = localStorage.getItem('adminTheme'); // 'dark' | 'light'
  var savedDir = localStorage.getItem('adminDir') || localStorage.getItem('direction'); // 'ltr' | 'rtl'

  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
  }
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
})();

// Watch for manual RTL toggles to persist globally
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'dir') {
            var dir = document.documentElement.getAttribute('dir');
            try { localStorage.setItem('adminDir', dir); } catch(e){}
            try { localStorage.setItem('direction', dir); } catch(e){}
        }
    });
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });

function toggleAdminDarkMode() {
  var html = document.documentElement;
  var icon = document.getElementById('adminThemeIcon');
  var isLight = html.classList.toggle('light');
  localStorage.setItem('adminTheme', isLight ? 'light' : 'dark');
  if (icon) icon.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
  if (window.lucide) lucide.createIcons();
}

function toggleAdminRTL() {
  var html = document.documentElement;
  var isRtl = html.getAttribute('dir') === 'rtl';
  if (isRtl) {
    html.setAttribute('dir', 'ltr');
    localStorage.setItem('adminDir', 'ltr');
  } else {
    html.setAttribute('dir', 'rtl');
    localStorage.setItem('adminDir', 'rtl');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Sync icon/label with whatever state was restored above
  var html = document.documentElement;
  var icon = document.getElementById('adminThemeIcon');
  if (icon) icon.setAttribute('data-lucide', html.classList.contains('light') ? 'moon' : 'sun');
  if (window.lucide) lucide.createIcons();
});
