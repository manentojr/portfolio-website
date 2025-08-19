// Theme handling: 'auto' (system), 'dark', 'light'
(function() {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme') || 'auto';
  const btn = document.getElementById('themeBtn');
  const label = document.getElementById('themeLabel');
  const meta = document.getElementById('theme-color-meta');

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(mode) {
    if (mode === 'dark') {
      html.setAttribute('data-theme', 'dark');
      btn.setAttribute('aria-checked', 'true');
      label.textContent = 'Dark';
      meta.setAttribute('content', '#000000');
    } else if (mode === 'light') {
      html.setAttribute('data-theme', 'light');
      btn.setAttribute('aria-checked', 'false');
      label.textContent = 'Light';
      meta.setAttribute('content', '#ffffff');
    } else {
      html.setAttribute('data-theme', 'auto');
      const dark = systemPrefersDark();
      btn.setAttribute('aria-checked', dark ? 'true' : 'false');
      label.textContent = 'Auto';
      meta.setAttribute('content', dark ? '#000000' : '#ffffff');
    }
  }

  function nextMode(current) {
    return current === 'auto' ? 'dark' : current === 'dark' ? 'light' : 'auto';
  }

  applyTheme(stored);

  btn.addEventListener('click', () => {
    const current = localStorage.getItem('theme') || 'auto';
    const next = nextMode(current);
    localStorage.setItem('theme', next);
    applyTheme(next);
  });

  // Update when system theme changes in auto mode
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener && mq.addEventListener('change', () => {
      if ((localStorage.getItem('theme') || 'auto') === 'auto') applyTheme('auto');
    });
  }
})();

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});