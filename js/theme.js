/**
 * theme.js
 * Light / Dark mode toggle.
 * Default theme is LIGHT. The very first inline script in <head> already
 * applies any saved theme before paint (to avoid a flash); this file just
 * wires up the toggle button and keeps everything in sync afterwards.
 */

(function () {
  const STORAGE_KEY = 'hh-theme';
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* localStorage unavailable (e.g. private mode) — theme just won't persist */
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggleBtn) {
      const isDark = theme === 'dark';
      toggleBtn.setAttribute('aria-checked', isDark ? 'true' : 'false');
      toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Sync the toggle's ARIA state with whatever the anti-flash script already set
  applyTheme(root.getAttribute('data-theme') || 'light');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      storeTheme(next);
      applyTheme(next);
    });
  }
})();
