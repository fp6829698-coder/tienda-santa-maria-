// ===== INICIALIZACIÓN DE LA APP =====

document.addEventListener('DOMContentLoaded', () => {
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
