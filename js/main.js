/**
 * main.js
 * Scroll animations and category nav — runs after all sections are injected.
 */

function initMenu() {
  // ===== INTERSECTION OBSERVER for scroll animations =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.section-header').forEach(el => observer.observe(el));

  document.querySelectorAll('.card').forEach((card, i) => {
    card.style.transitionDelay = `${(i % 6) * 0.06}s`;
    observer.observe(card);
  });

  // ===== CATEGORY NAV scroll & active state =====
  const catBtns = document.querySelectorAll('.cat-btn');
  const sections = document.querySelectorAll('.section');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const scrollHandler = () => {
    let current = '';
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= 120) current = sec.id;
    });
    catBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === current);
    });
    const activeBtn = document.querySelector('.cat-btn.active');
    if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
}

// Wait for loader.js to finish injecting all sections
document.addEventListener('sectionsLoaded', initMenu);
