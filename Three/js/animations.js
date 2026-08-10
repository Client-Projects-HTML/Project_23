/**
 * ApplianceHub — Global Animation Engine (Disabled for instant load)
 * js/animations.js
 */

(function () {
  'use strict';

  // Inject animations.css if not present
  (function injectCSS() {
    const alreadyLinked = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .some(l => l.href && l.href.includes('animations.css'));
    if (!alreadyLinked) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'css/animations.css';
      document.head.prepend(link);
    }
  })();

  function showAllElementsImmediately() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach(el => el.classList.add('is-visible'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showAllElementsImmediately);
  } else {
    showAllElementsImmediately();
  }
})();
