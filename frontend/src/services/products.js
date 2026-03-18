// ===== CATÁLOGO DE PRODUCTOS =====

let activeFilter = 'todos';
let searchTerm = '';
let currentProduct = null;
let currentQty = 1;

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = productos
    .filter(p => {
      if (activeFilter === 'todos') return true;
      if (activeFilter === 'invima') return p.invima;
      return p.cat === activeFilter;
    })
    .filter(p => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return p.nombre.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.props.toLowerCase().includes(q);
    });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--texto-suave);">
      <div style="font-size:3rem; margin-bottom:16px;">🌿</div>
      <p>No se encontraron productos con ese criterio.</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const stockClass = p.stock === 0 ? 'stock-agotado' : p.stock < 15 ? 'stock-ultimas' : 'stock-disponible';
    const stockText  = p.stock === 0 ? 'Agotado' : p.stock < 15 ? 'Últimas unidades' : 'Disponible';
    return `
    <div class="product-card" onclick="openProduct(${p.id})">
      <div class="product-img">
        <span class="stock-badge ${stockClass}">${stockText}</span>
        <button class="wishlist-btn" onclick="event.stopPropagation(); showToast('❤️ Agregado a favoritos')">♡</button>
        <span style="font-size:4.5rem; position:relative; z-index:0;">${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-badges">
          ${p.invima ? '<span class="badge-invima">INVIMA ✓</span>' : ''}
          <span style="font-size:0.7rem; color:var(--texto-suave);">${p.cat}</span>
        </div>
        <div class="product-name">${p.nombre}</div>
        <div class="product-desc">${p.desc.substring(0, 80)}...</div>
        <div class="product-footer">
          <div class="product-price">$${p.precio.toLocaleString('es-CO')} <small>COP</small></div>
          <button class="add-cart-btn" ${p.stock === 0 ? 'disabled' : ''} onclick="event.stopPropagation(); addToCart(${p.id})">
            ${p.stock === 0 ? 'Agotado' : '+ Carrito'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function setFilter(btn, filter) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = filter;
  renderProducts();
}

function searchProducts(val) {
  searchTerm = val;
  renderProducts();
}

// ===== DETALLE DE PRODUCTO =====

function openProduct(id) {
  currentProduct = productos.find(p => p.id === id);
  if (!currentProduct) return;
  currentQty = 1;

  document.getElementById('detailImg').textContent    = currentProduct.emoji;
  document.getElementById('detailName').textContent   = currentProduct.nombre;
  document.getElementById('detailDesc').textContent   = currentProduct.desc;
  document.getElementById('detailProps').textContent  = currentProduct.props;
  document.getElementById('detailUso').textContent    = currentProduct.uso;
  document.getElementById('detailPrice').textContent  = '$' + currentProduct.precio.toLocaleString('es-CO') + ' COP';
  document.getElementById('detailQty').textContent    = 1;

  const stockEl = document.getElementById('detailStock');
  if (currentProduct.stock === 0) {
    stockEl.className   = 'stock-badge stock-agotado';
    stockEl.textContent = 'Agotado';
  } else if (currentProduct.stock < 15) {
    stockEl.className   = 'stock-badge stock-ultimas';
    stockEl.textContent = `Últimas ${currentProduct.stock} unidades`;
  } else {
    stockEl.className   = 'stock-badge stock-disponible';
    stockEl.textContent = 'En stock';
  }

  document.getElementById('detailBadges').innerHTML = currentProduct.invima
    ? '<span class="badge-invima">INVIMA Certificado ✓</span>'
    : '';

  document.getElementById('productDetailOverlay').classList.add('open');
}

function closeProductDetail() {
  document.getElementById('productDetailOverlay').classList.remove('open');
}

function changeQty(d) {
  if (!currentProduct) return;
  currentQty = Math.max(1, Math.min(currentProduct.stock || 1, currentQty + d));
  document.getElementById('detailQty').textContent = currentQty;
}

function addToCartFromDetail() {
  if (!currentProduct || currentProduct.stock === 0) return;
  for (let i = 0; i < currentQty; i++) addToCart(currentProduct.id, false);
  showToast(`🛒 ${currentProduct.nombre} × ${currentQty} agregado`);
  closeProductDetail();
}
