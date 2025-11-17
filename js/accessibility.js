
(function() {
  const body = document.body;
  let fontScale = parseFloat(localStorage.getItem('usb-font-scale') || '1');
  let theme = localStorage.getItem('usb-theme') || 'dark';

  function applyFontScale() {
    document.documentElement.style.setProperty('--font-scale', fontScale.toString());
  }

  function applyTheme() {
    if (theme === 'light') {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
    } else {
      body.classList.add('theme-dark');
      body.classList.remove('theme-light');
    }
  }

  applyFontScale();
  applyTheme();

  function speak(text) {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz.');
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'es-ES';
    window.speechSynthesis.speak(utter);
  }

  function handleControl(action) {
    switch (action) {
      case 'go-home':
        window.location.href = 'index.html';
        break;
      case 'toggle-reader': {
        const main = document.getElementById('main-content');
        if (main) speak(main.innerText.slice(0, 1200));
        break;
      }
      case 'toggle-theme':
        theme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('usb-theme', theme);
        applyTheme();
        break;
      case 'font-inc':
        fontScale = Math.min(fontScale + 0.1, 1.5);
        localStorage.setItem('usb-font-scale', fontScale.toString());
        applyFontScale();
        break;
      case 'font-dec':
        fontScale = Math.max(fontScale - 0.1, 0.8);
        localStorage.setItem('usb-font-scale', fontScale.toString());
        applyFontScale();
        break;
      case 'toggle-lang':
        alert('Versión EN en preparación. Actualmente el contenido está en español.');
        break;
      case 'focus-mode':
        document.body.classList.toggle('focus-mode');
        break;
      case 'open-search': {
        const dialog = document.getElementById('search-dialog');
        if (dialog) dialog.hidden = false;
        const input = document.getElementById('search-input');
        if (input) input.focus();
        break;
      }
    }
  }

  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.ctrl-btn');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    if (action) {
      ev.preventDefault();
      handleControl(action);
    }
  });

  const closeBtn = document.getElementById('search-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const dialog = document.getElementById('search-dialog');
      if (dialog) dialog.hidden = true;
    });
  }
})();
