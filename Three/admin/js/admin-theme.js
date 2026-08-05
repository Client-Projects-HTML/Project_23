/* ApplianceHub Admin Portal — theme (dark/light) + direction (LTR/RTL) toggles */

(function () {
  // Admin portal defaults to DARK (its native design) unless the user
  // has explicitly switched to light mode before.
  var savedTheme = localStorage.getItem('adminTheme'); // 'dark' | 'light'
  var savedDir = localStorage.getItem('adminDir'); // 'ltr' | 'rtl'

  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
  }
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }
})();

function toggleAdminDarkMode() {
  var html = document.documentElement;
  var icon = document.getElementById('adminThemeIcon');
  var isLight = html.classList.toggle('light');
  localStorage.setItem('adminTheme', isLight ? 'light' : 'dark');
  if (icon) icon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
  if (window.lucide) lucide.createIcons();
}

function toggleAdminRTL() {
  var html = document.documentElement;
  var label = document.getElementById('adminRtlLabel');
  var isRtl = html.getAttribute('dir') === 'rtl';
  if (isRtl) {
    html.setAttribute('dir', 'ltr');
    localStorage.setItem('adminDir', 'ltr');
    if (label) label.innerText = 'RTL';
  } else {
    html.setAttribute('dir', 'rtl');
    localStorage.setItem('adminDir', 'rtl');
    if (label) label.innerText = 'LTR';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Sync icon/label with whatever state was restored above
  var html = document.documentElement;
  var icon = document.getElementById('adminThemeIcon');
  var label = document.getElementById('adminRtlLabel');
  if (icon) icon.setAttribute('data-lucide', html.classList.contains('light') ? 'sun' : 'moon');
  if (label) label.innerText = html.getAttribute('dir') === 'rtl' ? 'LTR' : 'RTL';
  if (window.lucide) lucide.createIcons();
});
