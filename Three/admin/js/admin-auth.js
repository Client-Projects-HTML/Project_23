/* ApplianceHub Admin Portal — access guard.
   Include this on every protected admin page (dashboard, inventory,
   repair-jobs, customers). If no session is found, bounce to the login
   screen before the page content is visible. */
(function () {
  if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
    window.location.replace('../login.html');
  }
})();
