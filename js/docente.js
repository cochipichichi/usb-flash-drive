
(function() {
  const PASS = 'neotech2025';

  const input = document.getElementById('docente-pass');
  const loginBtn = document.getElementById('docente-login');
  const toggleBtn = document.getElementById('docente-toggle-pass');
  const errorEl = document.getElementById('docente-error');

  if (toggleBtn && input) {
    toggleBtn.addEventListener('click', () => {
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  }

  function doLogin() {
    if (!input) return;
    if (input.value === PASS) {
      localStorage.setItem('usb-docente-ok', '1');
      window.location.href = 'docente.html';
    } else if (errorEl) {
      errorEl.textContent = 'Clave incorrecta. Vuelve a intentarlo.';
    }
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', doLogin);
  }

  if (input) {
    input.addEventListener('keypress', (ev) => {
      if (ev.key === 'Enter') doLogin();
    });
  }

  if (window.location.pathname.endsWith('docente.html')) {
    const ok = localStorage.getItem('usb-docente-ok') === '1';
    if (!ok) window.location.href = 'login-docente.html';
  }
})();
