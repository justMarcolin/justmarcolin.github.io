/**
 * script.js — purpleGPT landing page behaviours
 * Handles: nav scroll, mobile menu, scroll reveal,
 *          scroll reveal, smooth scroll, lightbox.
 *
 * Language logic lives separately in i18n.js.
 */

const BOT_STATS = {
  servers: 25,   // real server count
  users:   180,  // real user count
};

/* ─── ENTRY POINT ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initSmoothScroll();
  initCardGlow();
});

/* ─── NAV: sticky background on scroll + mobile hamburger ───────────────────── */
function initNav() {
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Add a subtle border when the user has scrolled past the hero
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Toggle the mobile overlay
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close the mobile menu when any link inside it is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ─── SCROLL REVEAL: fade-up elements as they enter the viewport ─────────────── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal so it only animates once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}



/* ─── SMOOTH SCROLL for anchor links (respects nav height offset) ────────────── */
function initSmoothScroll() {
  const NAV_HEIGHT = 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href   = anchor.getAttribute('href');
      const target = href === '#' ? document.body : document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─── CARD GLOW: subtle radial highlight that follows the cursor ─────────────── */
function initCardGlow() {
  document.querySelectorAll('.feat-card, .plan-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', ((e.clientX - left) / width  * 100).toFixed(1) + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - top)  / height * 100).toFixed(1) + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}
