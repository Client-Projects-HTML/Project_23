const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/geeth/project_23/Project_23/Three';

console.log('Completely removing animations across the entire website for instant static loading...\n');

// 1. Update css/animations.css to disable all motion and keyframes
const cssPath = path.join(rootDir, 'css/animations.css');
const disabledCssContent = `/* =====================================================
   ApplianceHub — Animations System (Disabled)
   css/animations.css
   ===================================================== */

/* Completely disable all animations and transitions for instant load */
*,
*::before,
*::after {
  animation: none !important;
  transition: none !important;
}

/* Force all reveal and motion elements to be 100% visible immediately */
.reveal,
.reveal-left,
.reveal-right,
.reveal-scale,
.animate-fade-in-up,
.animate-float,
.animate-spin-slow,
.animate-pulse,
.animate-bounce,
.hero-bg-animate {
  opacity: 1 !important;
  transform: none !important;
  animation: none !important;
  transition: none !important;
}

.reveal.is-visible,
.reveal-left.is-visible,
.reveal-right.is-visible,
.reveal-scale.is-visible {
  opacity: 1 !important;
  transform: none !important;
}
`;

fs.writeFileSync(cssPath, disabledCssContent, 'utf8');
console.log('UPDATED css/animations.css: All CSS animations and keyframes disabled');

// 2. Update js/animations.js to immediately reveal all elements and disable motion loops
const jsPath = path.join(rootDir, 'js/animations.js');
const disabledJsContent = `/**
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
`;

fs.writeFileSync(jsPath, disabledJsContent, 'utf8');
console.log('UPDATED js/animations.js: Motion engine disabled & elements set to instant visibility');

console.log('\nSuccessfully disabled all animations across the website!');
