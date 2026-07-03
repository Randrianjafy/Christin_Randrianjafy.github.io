/* ============================================================
   script.js – Portfolio Randrianjafy Fanomezana Jean Christin
   ============================================================ */

// ── NAV scroll state ─────────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}, { passive: true });

// ── Burger menu (mobile) ─────────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── Intersection Observer helpers ────────────────────────────

/**
 * Animates language bars when the About section enters viewport.
 */
function observeLangBars() {
  const bars = document.querySelectorAll('.lang-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => bar.classList.add('animated'));
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
}

/**
 * Staggered reveal for timeline items.
 */
function observeTimeline() {
  const items = document.querySelectorAll('.timeline__item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.index) * 120;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}

/**
 * Generic fade-in for any element with [data-fade].
 */
function observeFadeElements() {
  const style = document.createElement('style');
  style.textContent = `
    [data-fade] {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    [data-fade].visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const elements = document.querySelectorAll('[data-fade]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/**
 * Staggered card entrances (skill cards, cert cards, volu cards).
 */
function observeCards() {
  const cardGroups = [
    '.skill-card',
    '.cert-card',
    '.volu-card',
  ];

  cardGroups.forEach(selector => {
    const cards = document.querySelectorAll(selector);
    if (!cards.length) return;

    // Add initial hidden state via inline style
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(card => observer.observe(card));
  });
}

// ── Active nav link on scroll ─────────────────────────────────
function trackActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav__links a');

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));

  // Add active link style
  const style = document.createElement('style');
  style.textContent = `.nav__links a.active { color: var(--accent2); }`;
  document.head.appendChild(style);
}

// ── Smooth scroll offset (because of fixed nav) ───────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── Typed effect on hero title ────────────────────────────────
function heroTypeEffect() {
  const title = document.querySelector('.hero__title');
  if (!title) return;

  const text = title.textContent;
  title.textContent = '';
  title.style.visibility = 'visible';

  let i = 0;
  function type() {
    if (i < text.length) {
      title.textContent += text[i];
      i++;
      setTimeout(type, 28);
    }
  }

  // Delay slightly so page has painted
  setTimeout(type, 600);
}

// ── Year in footer ────────────────────────────────────────────
function setFooterYear() {
  const copy = document.querySelector('.footer__copy');
  if (copy) {
    copy.textContent = copy.textContent.replace('2026', new Date().getFullYear());
  }
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  observeLangBars();
  observeTimeline();
  observeFadeElements();
  observeCards();
  trackActiveSection();
  initSmoothScroll();
  heroTypeEffect();
  setFooterYear();
});
