// ===== AUTENTICACIÓN =====

function switchAuthTab(tab, btn) {
  document.getElementById('auth-login').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('auth-register').style.display = tab === 'register' ? 'block' : 'none';
  document.querySelectorAll('.auth-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else document.querySelectorAll('.auth-tab')[tab === 'login' ? 0 : 1].classList.add('active');
}

function doLogin(e) {
  e.preventDefault();
  showView('portal');
  showToast('👋 Bienvenida, María García');
}

function doRegister(e) {
  e.preventDefault();
  showView('portal');
  showToast('🌿 ¡Cuenta creada! Te damos la bienvenida a Santa Maria');
}

// ===== PORTAL USUARIO =====

function setPortalTab(el) {
  document.querySelectorAll('.portal-menu li').forEach(li => li.classList.remove('active'));
  if (el) el.classList.add('active');
}
