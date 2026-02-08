'use strict';

/* ========================================
   Typewriter Animation
   ======================================== */
class Typewriter {
  constructor(element, options = {}) {
    this.element = element;
    this.strings = options.strings || ['a Software Engineer'];
    this.typeSpeed = options.typeSpeed || 80;
    this.deleteSpeed = options.deleteSpeed || 40;
    this.pauseAfterType = options.pauseAfterType || 2000;
    this.pauseAfterDelete = options.pauseAfterDelete || 500;

    this.currentStringIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.timeoutId = null;

    this.tick();
  }

  tick() {
    const currentString = this.strings[this.currentStringIndex];

    if (this.isDeleting) {
      this.currentCharIndex--;
      this.element.textContent = currentString.substring(0, this.currentCharIndex);

      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
        this.timeoutId = setTimeout(() => this.tick(), this.pauseAfterDelete);
        return;
      }

      this.timeoutId = setTimeout(() => this.tick(), this.deleteSpeed);
    } else {
      this.currentCharIndex++;
      this.element.textContent = currentString.substring(0, this.currentCharIndex);

      if (this.currentCharIndex === currentString.length) {
        this.isDeleting = true;
        this.timeoutId = setTimeout(() => this.tick(), this.pauseAfterType);
        return;
      }

      this.timeoutId = setTimeout(() => this.tick(), this.typeSpeed);
    }
  }

  destroy() {
    clearTimeout(this.timeoutId);
  }
}

/* ========================================
   Main Initialization
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  /* ---- Network Background ---- */
  if (typeof NetworkBackground !== 'undefined') {
    new NetworkBackground('network-bg');
  }

  /* ---- Typewriter ---- */
  const typedElement = document.querySelector('.hero__typed');
  if (typedElement) {
    if (prefersReducedMotion) {
      typedElement.textContent = 'a Software Engineer';
    } else {
      new Typewriter(typedElement, {
        strings: [
          'a Software Engineer',
          'passionate about cloud technologies',
          'based in Seville, Spain',
        ],
        typeSpeed: 80,
        deleteSpeed: 40,
        pauseAfterType: 2000,
        pauseAfterDelete: 500,
      });
    }
  }

  /* ---- Nav Scroll Background ---- */
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  if (navbar && heroSection) {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        navbar.classList.toggle('nav--scrolled', !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    navObserver.observe(heroSection);
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');

      if (targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: scrollBehavior });
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      }
    });
  });

  /* ---- Scroll Spy ---- */
  const sections = document.querySelectorAll('main > section[id]');
  const navItems = document.querySelectorAll('.nav-links__item[href^="#"]');

  if (sections.length && navItems.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach(item => {
              item.classList.toggle(
                'nav-links__item--active',
                item.getAttribute('href') === `#${id}`
              );
            });
          }
        });
      },
      {
        rootMargin: '-70px 0px -50% 0px',
        threshold: 0,
      }
    );
    sections.forEach(section => spyObserver.observe(section));
  }

  /* ---- Mobile Hamburger Menu ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (navToggle && navLinksContainer && navbar) {
    navToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbar.classList.contains('nav-open')) {
        navbar.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }
});
