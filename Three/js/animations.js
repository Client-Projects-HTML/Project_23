/**
 * ApplianceHub — Global Animation Engine
 * js/animations.js
 *
 * Auto-injects scroll reveal, counter animations, navbar scroll effect,
 * card hover lifts, stagger animations, and cursor ripple effects.
 * Drop this script on any page and it works automatically.
 */

(function () {
  'use strict';

  /* ── Inject animations.css if not already linked ── */
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

  /* ─────────────────────────────────────────────────────────────
   *  1. SCROLL REVEAL — Intersection Observer
   * ───────────────────────────────────────────────────────────── */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // Respect stagger delay from data-delay attribute
            const delay = el.dataset.delay || 0;
            setTimeout(() => {
              el.classList.add('is-visible');
            }, parseInt(delay, 10));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Auto-observe all reveal-class elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach(el => observer.observe(el));

    // Auto-apply 'reveal' class to common content elements
    const autoRevealSelectors = [
      'section > div > h1, section > div > h2, section > div > h3',
      '.grid > div:not([class*="reveal"])',
      'article',
      '.card',
    ];
    autoRevealSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('reveal') &&
            !el.classList.contains('reveal-left') &&
            !el.classList.contains('reveal-scale')) {
          el.classList.add('reveal');
          observer.observe(el);
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
   *  2. NAVBAR SCROLL EFFECT — Shrink & Blur on scroll
   * ───────────────────────────────────────────────────────────── */
  function initNavbarScroll() {
    const navbar = document.querySelector('header, nav.fixed, nav.sticky, header.fixed, header.sticky');
    if (!navbar) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 60) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.transition = 'box-shadow 0.3s ease, backdrop-filter 0.3s ease';
          } else {
            navbar.classList.remove('navbar-scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ─────────────────────────────────────────────────────────────
   *  3. ANIMATED NUMBER COUNTER
   * ───────────────────────────────────────────────────────────── */
  function animateCounter(el, target, duration = 1200) {
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      el.textContent = isFloat
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString();

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
    };
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const raw = el.textContent.trim().replace(/,/g, '');
            const num = parseFloat(raw);
            if (!isNaN(num) && num > 0) {
              animateCounter(el, num, 1400);
              el.classList.add('counter-animate');
            }
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Target data-counter elements or common stat displays
    document.querySelectorAll('[data-counter], .stat-number').forEach(el => {
      counterObserver.observe(el);
    });
  }

  /* ─────────────────────────────────────────────────────────────
   *  4. CARD HOVER LIFT — Auto-applies to product/service cards
   * ───────────────────────────────────────────────────────────── */
  function initCardHover() {
    const cardSelectors = [
      '.product-card',
      '.service-card',
      '[class*="rounded-2xl"][class*="border"]:not(nav):not(aside):not(header)',
      '[class*="rounded-3xl"][class*="shadow"]',
    ];

    cardSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(card => {
        if (!card.classList.contains('no-hover') &&
            !card.closest('nav') &&
            !card.closest('aside') &&
            !card.closest('header') &&
            !card.closest('footer')) {
          card.style.transition = 'transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease';
          card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px) scale(1.005)';
            card.style.boxShadow = '0 16px 36px -8px rgba(0,0,0,0.12)';
          });
          card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
          });
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
   *  5. BUTTON PRESS EFFECT — Haptic-feel micro-animation
   * ───────────────────────────────────────────────────────────── */
  function initButtonPress() {
    document.querySelectorAll('button, a[class*="px-"]').forEach(btn => {
      if (btn.closest('nav') && !btn.closest('nav.menu')) return;
      btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.965)';
        btn.style.transition = 'transform 0.1s ease';
      });
      btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
   *  6. PAGE ENTRANCE — Fade in on load
   * ───────────────────────────────────────────────────────────── */
  function initPageEntrance() {
    const main = document.querySelector('main, #main-content, .page-content');
    if (main) {
      main.style.opacity = '0';
      main.style.transform = 'translateY(16px)';
      main.style.transition = 'opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1)';
      requestAnimationFrame(() => {
        setTimeout(() => {
          main.style.opacity = '1';
          main.style.transform = 'translateY(0)';
        }, 60);
      });
    }
  }

  /* ─────────────────────────────────────────────────────────────
   *  7. STAGGER GRID ITEMS — Auto-stagger cards in grids
   * ───────────────────────────────────────────────────────────── */
  function initStaggerGrids() {
    const grids = document.querySelectorAll('[class*="grid"]:not(nav):not(aside)');
    grids.forEach(grid => {
      const children = Array.from(grid.children).filter(
        c => !c.classList.contains('col-span-full') && !c.tagName.match(/^(SCRIPT|STYLE|HEAD)$/i)
      );
      if (children.length < 2 || children.length > 20) return;

      const staggerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, i * 70);
            });
            staggerObserver.unobserve(grid);
          }
        });
      }, { threshold: 0.08 });

      // Initialize invisible
      children.forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        child.style.transition = 'opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1)';
      });
      staggerObserver.observe(grid);
    });
  }

  /* ─────────────────────────────────────────────────────────────
   *  8. IMAGE LAZY FADE-IN
   * ───────────────────────────────────────────────────────────── */
  function initImageFadeIn() {
    const imgObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
          imgObserver.unobserve(img);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('img:not([src^="data"])').forEach(img => {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.97)';
      img.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(.22,1,.36,1)';
      if (img.complete) {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      } else {
        imgObserver.observe(img);
        img.addEventListener('load', () => {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
          imgObserver.unobserve(img);
        });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────
   *  9. ACTIVE NAV LINK INDICATOR — Smooth underline slide
   * ───────────────────────────────────────────────────────────── */
  function initNavIndicator() {
    const navLinks = document.querySelectorAll('header nav a, header .nav-link');
    navLinks.forEach(link => {
      link.style.position = 'relative';
      link.style.transition = 'color 0.2s ease';
    });
  }

  /* ─────────────────────────────────────────────────────────────
   *  10. FLOATING PARTICLE DECORATIONS (subtle background dots)
   * ───────────────────────────────────────────────────────────── */
  function initFloatingParticles() {
    const hero = document.querySelector('.hero, [class*="hero"], section:first-of-type');
    if (!hero || hero.querySelector('.particle-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.4;';
    hero.style.position = 'relative';
    hero.style.overflow = 'hidden';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W = canvas.width  = hero.offsetWidth;
    let H = canvas.height = hero.offsetHeight;

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    });
  }

  /* ─────────────────────────────────────────────────────────────
   *  INIT — Run all modules on DOMContentLoaded
   * ───────────────────────────────────────────────────────────── */
  function init() {
    initPageEntrance();
    initNavbarScroll();
    initScrollReveal();
    initStaggerGrids();
    initCardHover();
    initButtonPress();
    initCounters();
    initImageFadeIn();
    initNavIndicator();
    initFloatingParticles();

    // Re-run card hover on dynamic content
    const mutationObserver = new MutationObserver(() => {
      initCardHover();
      initButtonPress();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
