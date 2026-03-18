// ===== BLOG HERBAL =====

function renderBlog() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;

  grid.innerHTML = blogPosts.map(p => `
    <div class="blog-card" onclick="showToast('📖 Leyendo: ${p.titulo}')">
      <div class="blog-img" style="background: ${p.gradiente};">
        <span style="font-size:3.5rem;">${p.emoji}</span>
      </div>
      <div class="blog-body">
        <div class="blog-tags">
          ${p.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}
        </div>
        <div class="blog-title">${p.titulo}</div>
        <div class="blog-excerpt">${p.extracto}</div>
        <div class="blog-meta">
          <span>📅 ${p.fecha}</span>
          <span>⏱ ${p.tiempo} de lectura</span>
        </div>
        <div class="blog-share">
          <button class="filter-btn" style="font-size:0.72rem; padding:5px 12px;"
            onclick="event.stopPropagation(); showToast('📤 Compartido en Instagram')">📸 Instagram</button>
          <button class="filter-btn" style="font-size:0.72rem; padding:5px 12px;"
            onclick="event.stopPropagation(); showToast('💬 Enlace de WhatsApp copiado')">💬 WhatsApp</button>
          <button class="filter-btn" style="font-size:0.72rem; padding:5px 12px;"
            onclick="event.stopPropagation(); showToast('👥 Compartido en Facebook')">👥 Facebook</button>
        </div>
      </div>
    </div>`).join('');
}

// ===== SUSCRIPCIÓN =====
function suscribirse() {
  showView('auth');
  showToast('🌿 Inicia sesión para suscribirte al Kit Bienestar');
}

// ===== CONTACTO =====
function submitContact(e) {
  e.preventDefault();
  showToast('📧 Mensaje enviado. Te responderemos en menos de 24h');
  e.target.reset();
}
