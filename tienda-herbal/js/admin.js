// ===== PANEL ADMINISTRATIVO =====

const statusMap = {
  enviado:    'status-enviado',
  procesando: 'status-procesando',
  pendiente:  'status-procesando',
  entregado:  'status-entregado',
  activo:     'status-entregado',
  pausado:    'status-procesando'
};

// ===== TAB SWITCH =====
function setAdminTab(tab, el) {
  document.querySelectorAll('[id^="admin-"]').forEach(d => d.style.display = 'none');
  const target = document.getElementById('admin-' + tab);
  if (target) target.style.display = 'block';
  document.querySelectorAll('.admin-menu li').forEach(li => li.classList.remove('active'));
  if (el) el.classList.add('active');
  if (tab === 'reportes') renderTopProducts();
}

// ===== DASHBOARD =====
function renderChartBars() {
  const meses = ['Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'];
  const vals  = [65, 72, 88, 95, 110, 85, 98, 120];
  const max   = Math.max(...vals);

  const barsEl   = document.getElementById('chartBars');
  const labelsEl = document.getElementById('chartLabels');
  if (!barsEl) return;

  barsEl.innerHTML = vals.map((v, i) =>
    `<div class="chart-bar" style="height:${(v / max) * 100}%;" title="${meses[i]}: $${v}0.000"></div>`
  ).join('');

  labelsEl.innerHTML = meses.map(m =>
    `<div class="chart-label-item">${m}</div>`
  ).join('');
}

// ===== PEDIDOS =====
function renderAdminOrdersTable(tableId, extended = false) {
  const tbody = document.getElementById(tableId);
  if (!tbody) return;

  tbody.innerHTML = adminOrders.map(o => {
    const statusClass = statusMap[o.estado] || '';
    if (!extended) {
      return `<tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.cliente}</td>
        <td>${o.productos}</td>
        <td><strong>${o.total}</strong></td>
        <td><span class="order-status ${statusClass}">${o.estado}</span></td>
        <td><button class="add-cart-btn" onclick="showToast('📋 Detalle del pedido ${o.id}')">Ver</button></td>
      </tr>`;
    } else {
      return `<tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.cliente}</td>
        <td>9 Mar 2026</td>
        <td><strong>${o.total}</strong></td>
        <td><span class="order-status ${statusClass}">${o.estado}</span></td>
        <td style="font-size:0.8rem; color:var(--texto-suave);">—</td>
        <td><button class="add-cart-btn" onclick="showToast('✏️ Editando pedido ${o.id}')">Editar</button></td>
      </tr>`;
    }
  }).join('');
}

// ===== PRODUCTOS ADMIN =====
function renderAdminProducts() {
  const tbody = document.getElementById('adminProductTable');
  if (!tbody) return;

  tbody.innerHTML = productos.map(p => {
    const stockCls = p.stock === 0 ? 'stock-agotado' : p.stock < 15 ? 'status-procesando' : 'status-enviado';
    return `<tr>
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:1.5rem;">${p.emoji}</span>
          <strong>${p.nombre}</strong>
        </div>
      </td>
      <td>${p.cat}</td>
      <td>$${p.precio.toLocaleString('es-CO')}</td>
      <td><span class="order-status ${stockCls}">${p.stock} un.</span></td>
      <td>${p.invima ? '<span class="badge-invima">✓ INVIMA</span>' : '<span style="font-size:0.8rem;color:var(--texto-suave);">—</span>'}</td>
      <td><span class="order-status status-entregado">Activo</span></td>
      <td style="display:flex; gap:6px;">
        <button class="add-cart-btn" onclick="showToast('✏️ Editando ${p.nombre}')">Editar</button>
        <button class="add-cart-btn" style="background:var(--rojo);" onclick="showToast('⚠️ Producto desactivado')">Desactivar</button>
      </td>
    </tr>`;
  }).join('');
}

// ===== USUARIOS ADMIN =====
function renderAdminUsers() {
  const tbody = document.getElementById('adminUserTable');
  if (!tbody) return;

  tbody.innerHTML = adminUsers.map(u => `
    <tr>
      <td><strong>${u.nombre}</strong></td>
      <td>${u.email}</td>
      <td>${u.tel}</td>
      <td>${u.pedidos} pedidos</td>
      <td><span class="order-status ${u.rol === 'administrador' ? 'status-procesando' : 'status-enviado'}">${u.rol}</span></td>
      <td style="font-size:0.8rem; color:var(--texto-suave);">${u.registro}</td>
    </tr>`).join('');
}

// ===== SUSCRIPCIONES ADMIN =====
function renderAdminSubs() {
  const tbody = document.getElementById('adminSubTable');
  if (!tbody) return;

  tbody.innerHTML = adminSubs.map(s => `
    <tr>
      <td><strong>${s.cliente}</strong></td>
      <td>Kit Bienestar ${s.plan}</td>
      <td>${s.inicio}</td>
      <td>${s.proximo}</td>
      <td><span class="order-status ${statusMap[s.estado]}">${s.estado}</span></td>
    </tr>`).join('');
}

// ===== BLOG ADMIN =====
function renderAdminBlog() {
  const tbody = document.getElementById('adminBlogTable');
  if (!tbody) return;

  tbody.innerHTML = blogPosts.map(p => `
    <tr>
      <td><strong>${p.titulo}</strong></td>
      <td>${p.tags.join(', ')}</td>
      <td>${p.fecha}</td>
      <td><span class="order-status status-entregado">Publicado</span></td>
      <td><button class="add-cart-btn" onclick="showToast('✏️ Editando artículo')">Editar</button></td>
    </tr>`).join('');
}

// ===== TOP PRODUCTOS =====
function renderTopProducts() {
  const el = document.getElementById('topProducts');
  if (!el) return;

  el.innerHTML = productos.slice(0, 4).map((p, i) => `
    <div style="display:flex; align-items:center; gap:12px;">
      <span style="font-size:1.5rem;">${p.emoji}</span>
      <div style="flex:1;">
        <div style="font-size:0.85rem; font-weight:500;">${p.nombre}</div>
        <div style="background:rgba(82,183,136,0.15); border-radius:4px; height:6px; margin-top:4px;">
          <div style="background:var(--verde-claro); height:100%; border-radius:4px; width:${90 - i * 15}%;"></div>
        </div>
      </div>
      <span style="font-size:0.8rem; color:var(--texto-suave);">${90 - i * 15}%</span>
    </div>`).join('');
}

// ===== MODAL PRODUCTO =====
function openProductModal() {
  document.getElementById('productModal').classList.add('open');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
}

function saveProduct() {
  closeProductModal();
  showToast('✅ Producto guardado correctamente');
}

function exportarReporte() {
  showToast('📄 Generando reporte PDF con TCPDF...');
}
