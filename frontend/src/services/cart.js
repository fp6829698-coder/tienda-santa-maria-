// ===== CARRITO DE COMPRAS =====

let cart = [];

function addToCart(id, toast = true) {
  const p = productos.find(p => p.id === id);
  if (!p || p.stock === 0) return;
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCartUI();
  if (toast) showToast(`🛒 ${p.nombre} agregado al carrito`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function changeCartQty(id, d) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + d);
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, c) => s + c.precio * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);

  document.getElementById('cartBadge').textContent = count;

  const itemsEl  = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🌿</div>
        <p>Tu carrito está vacío</p>
        <p style="font-size:0.8rem; margin-top:8px;">Explora nuestro catálogo herbal</p>
      </div>`;
    footerEl.innerHTML = `<button class="btn-primary btn-full" style="padding:14px;" onclick="toggleCart(); showSection('catalogo')">Ver Catálogo</button>`;
    return;
  }

  itemsEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-img">${c.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${c.nombre}</div>
        <div class="cart-item-price">$${c.precio.toLocaleString('es-CO')} COP</div>
        <div class="cart-item-qty">
          <button class="qty-mini" onclick="changeCartQty(${c.id}, -1)">−</button>
          <span>${c.qty}</span>
          <button class="qty-mini" onclick="changeCartQty(${c.id}, 1)">+</button>
        </div>
        <button class="cart-remove" onclick="removeFromCart(${c.id})">Eliminar</button>
      </div>
      <div style="font-weight:600; font-size:0.9rem; white-space:nowrap;">$${(c.precio * c.qty).toLocaleString('es-CO')}</div>
    </div>`).join('');

  footerEl.innerHTML = `
    <div class="cart-subtotal"><span>Subtotal</span><span>$${total.toLocaleString('es-CO')}</span></div>
    <div class="cart-subtotal"><span>Envío</span><span>$8.500</span></div>
    <div class="cart-total"><span>Total</span><span>$${(total + 8500).toLocaleString('es-CO')}</span></div>
    <button class="btn-primary btn-full" style="padding:14px; margin-top:8px;" onclick="goToCheckout()">Finalizar Compra →</button>
    <p style="text-align:center; font-size:0.75rem; color:var(--texto-suave); margin-top:8px;">🔒 Pago seguro con MercadoPago</p>`;
}

function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}
