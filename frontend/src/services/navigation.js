// ===== NAVEGACIÓN SPA =====

function showView(v) {
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  document.getElementById('view-' + v).classList.add('active');
  window.scrollTo(0, 0);
}

function toggleView(v) {
  const el = document.getElementById('view-' + v);
  if (el.classList.contains('active')) showView('home');
  else showView(v);
}

function showSection(id) {
  showView('home');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function filterByCategory(cat) {
  activeFilter = cat;
  showView('home');
  setTimeout(() => {
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    renderProducts();
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  }, 100);
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== TOAST =====
function showToast(msg, duration = 3500) {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => t.remove(), 300);
  }, duration);
}
