// ===== CHECKOUT =====

function goToCheckout() {
  if (cart.length === 0) {
    showToast('🛒 Tu carrito está vacío');
    return;
  }
  toggleCart();
  showView('checkout');
  // Resetear pasos
  document.getElementById('checkoutStep2').style.display = 'block';
  document.getElementById('checkoutStep3').style.display = 'none';
  document.getElementById('step2').classList.add('active');
  document.getElementById('step2').classList.remove('done');
  document.getElementById('step2').querySelector('.step-num').textContent = '2';
  document.getElementById('step3').classList.remove('active');
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const summary = cart.map(c => `
    <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.85rem;">
      <span>${c.emoji} ${c.nombre} × ${c.qty}</span>
      <span>$${(c.precio * c.qty).toLocaleString('es-CO')}</span>
    </div>`).join('');

  document.getElementById('checkoutSummary').innerHTML = summary;

  const sub = cart.reduce((s, c) => s + c.precio * c.qty, 0);
  const iva = Math.round(sub * 0.19);

  document.getElementById('ckSubtotal').textContent = '$' + sub.toLocaleString('es-CO');
  document.getElementById('ckIva').textContent      = '$' + iva.toLocaleString('es-CO');
  document.getElementById('ckTotal').textContent    = '$' + (sub + 8500 + iva).toLocaleString('es-CO');
}

function goToPayment() {
  document.getElementById('checkoutStep2').style.display = 'none';
  document.getElementById('checkoutStep3').style.display = 'block';
  document.getElementById('step2').classList.remove('active');
  document.getElementById('step2').classList.add('done');
  document.getElementById('step2').querySelector('.step-num').textContent = '✓';
  document.getElementById('step3').classList.add('active');
}

function selectPayment(el) {
  document.querySelectorAll('.payment-option').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
}

function completePurchase() {
  cart = [];
  updateCartUI();
  showView('home');
  showToast('✅ ¡Pago exitoso! Recibirás un email de confirmación');
  setTimeout(() => showToast('📦 Tu pedido #ORD-2026-0400 está siendo preparado'), 2000);
}
