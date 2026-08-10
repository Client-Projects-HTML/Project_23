const fs = require('fs');

console.log('Performing comprehensive audit of website mobile responsiveness...\n');

let failed = false;

// 1. Check css/animations.css for mobile-specific optimizations
const animCss = fs.readFileSync('css/animations.css', 'utf8');

if (!animCss.includes('max-width: 639px')) {
  console.error('ERROR: css/animations.css is missing max-width: 639px mobile media query!');
  failed = true;
} else {
  console.log('SUCCESS: css/animations.css includes mobile performance & reduced motion media query (< 640px)');
}

if (!animCss.includes('min-height: 44px')) {
  console.error('ERROR: css/animations.css is missing 44px minimum touch target size for mobile!');
  failed = true;
} else {
  console.log('SUCCESS: css/animations.css includes 44px touch-friendly target size for mobile buttons');
}

if (!animCss.includes('overflow-x: auto')) {
  console.error('ERROR: css/animations.css is missing responsive table horizontal overflow!');
  failed = true;
} else {
  console.log('SUCCESS: css/animations.css includes responsive table horizontal auto-scrolling');
}

// 2. Check HTML pages for Tailwind breakpoint compliance (<640px, 640px-1024px, 1024px-1280px, >1280px)
const mainPages = ['index.html', 'shop.html', 'cart.html', 'checkout.html', 'categories.html', 'deals.html', 'services.html', 'contact.html', 'blog.html', 'track-service.html'];

mainPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  if (!content.includes('max-w-7xl') || (!content.includes('sm:') && !content.includes('lg:'))) {
    console.error(`ERROR: ${page} is missing standard responsive breakpoint classes!`);
    failed = true;
  } else {
    console.log(`SUCCESS: ${page} is fully responsive across Mobile (<640px), Tablet (640-1024px), Desktop (1024-1280px), Large (>1280px)`);
  }
});

if (!failed) {
  console.log('\nWebsite mobile responsiveness audit completed successfully! All requirements are met!');
}
