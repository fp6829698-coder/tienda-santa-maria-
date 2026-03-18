// ===== INICIALIZACIÓN DE LA APP =====

document.addEventListener('DOMContentLoaded', () => {
  // Verificar si hay callback de Google OAuth2
  if (window.location.hash.includes('access_token=')) {
    // Verificar si es callback de Google o Facebook
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const state = hashParams.get('state');
    
    if (state && state.includes('facebook_auth')) {
      handleFacebookCallback();
    } else {
      handleGoogleCallback();
    }
    return;
  }
  
  // Verificar si hay error en OAuth2
  if (window.location.hash.includes('error=')) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const state = hashParams.get('state');
    
    if (state && state.includes('facebook_auth')) {
      handleFacebookCallback();
    } else {
      handleGoogleCallback();
    }
    return;
  }
  
  // Verificar si hay sesión existente
  if (checkExistingSession()) {
    return; // Si hay sesión, no cargar el resto
  }
  
  // Renderizar secciones principales
  renderProducts();
  renderBlog();
  updateCartUI();

  // Admin
  renderChartBars();
  renderAdminOrdersTable('adminOrderTable', false);
  renderAdminOrdersTable('adminAllOrderTable', true);
  renderAdminProducts();
  renderAdminUsers();
  renderAdminSubs();
  renderAdminBlog();
});

// ===== FUNCIONES DE NAVEGACIÓN =====

function showView(viewId) {
  // Ocultar todas las vistas
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  
  // Mostrar vista seleccionada
  document.getElementById(`view-${viewId}`).classList.add('active');
  
  // Actualizar navegación
  document.querySelectorAll('.nav-links a, .nav-actions button').forEach(link => {
    link.classList.remove('active');
  });
  
  // Actualizar estado del carrito
  if (viewId !== 'checkout') {
    updateCartUI();
  }
  
  // Si es la vista de admin, actualizar información del usuario
  if (viewId === 'admin' && typeof updateAdminUserInfo === 'function') {
    setTimeout(() => updateAdminUserInfo(), 100); // Pequeño delay para asegurar que el DOM esté listo
  }
}

function toggleView(viewId) {
  const currentView = document.querySelector('.view.active');
  const targetView = document.getElementById(`view-${viewId}`);
  
  if (currentView === targetView) {
    showView('home');
  } else {
    showView(viewId);
  }
}
