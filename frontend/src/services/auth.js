// ===== AUTENTICACIÓN =====

// Sistema de usuarios y roles
const USERS = {
  'fernandoperezgestion225@gmail.com': {
    email: 'fernandoperezgestion225@gmail.com',
    name: 'Fernando Pérez',
    role: 'admin',
    password: 'admin123' // En producción usar hash
  },
  'maria@email.com': {
    email: 'maria@email.com',
    name: 'María García',
    role: 'cliente',
    password: 'cliente123'
  }
};

let currentUser = null;

// Sistema de persistencia de sesión
const SESSION_KEY = 'tienda_santa_maria_session';

// Guardar sesión en localStorage
function saveSession(user) {
  const sessionData = {
    user: user,
    timestamp: Date.now(),
    expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 días
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

// Cargar sesión desde localStorage
function loadSession() {
  try {
    const sessionData = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (sessionData && sessionData.expires > Date.now()) {
      currentUser = sessionData.user;
      return true;
    } else {
      // Sesión expirada, eliminar
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
  } catch (e) {
    localStorage.removeItem(SESSION_KEY);
    return false;
  }
}

// Eliminar sesión
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  currentUser = null;
}

// Verificar si hay sesión activa al cargar
function checkExistingSession() {
  if (loadSession()) {
    // Mostrar botón de admin si es administrador
    updateAdminButtonVisibility();
    
    if (currentUser.role === 'admin') {
      showView('admin');
      updateAdminUserInfo();
      showToast('👑 Sesión de administrador restaurada');
    } else {
      showView('portal');
      updatePortalUserInfo();
      showToast(`👋 Bienvenida de nuevo, ${currentUser.name}`);
    }
    return true;
  }
  return false;
}

// Actualizar visibilidad del botón de admin
function updateAdminButtonVisibility() {
  const adminBtn = document.getElementById('adminNavBtn');
  if (adminBtn) {
    if (currentUser && currentUser.role === 'admin') {
      adminBtn.style.display = 'block';
    } else {
      adminBtn.style.display = 'none';
    }
  }
}

// Actualizar información del usuario admin
function updateAdminUserInfo() {
  console.log('Actualizando info del admin:', currentUser); // Debug
  
  // Esperar un poco si el DOM no está listo
  setTimeout(() => {
    if (currentUser) {
      const adminName = document.getElementById('adminUserName');
      const adminEmail = document.getElementById('adminUserEmail');
      
      console.log('Elementos encontrados:', { adminName, adminEmail }); // Debug
      
      if (adminName) {
        adminName.textContent = currentUser.name;
        console.log('Nombre actualizado:', currentUser.name);
      } else {
        console.log('No se encontró el elemento adminUserName');
      }
      
      if (adminEmail) {
        adminEmail.textContent = currentUser.email;
        console.log('Email actualizado:', currentUser.email);
      } else {
        console.log('No se encontró el elemento adminUserEmail');
      }
    } else {
      console.log('No hay currentUser para actualizar');
    }
  }, 50);
}

function switchAuthTab(tab, btn) {
  document.getElementById('auth-login').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('auth-register').style.display = tab === 'register' ? 'block' : 'none';
  document.querySelectorAll('.auth-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else document.querySelectorAll('.auth-tab')[tab === 'login' ? 0 : 1].classList.add('active');
}

function doLogin(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  
  // Verificar credenciales
  const user = USERS[email];
  if (user && user.password === password) {
    currentUser = user;
    saveSession(user); // Guardar sesión persistente
    updateAdminButtonVisibility(); // Actualizar visibilidad del botón
    
    if (user.role === 'admin') {
      showView('admin');
      updateAdminUserInfo();
      showToast('👑 Bienvenido al panel administrativo');
    } else {
      showView('portal');
      updatePortalUserInfo();
      showToast(`👋 Bienvenida, ${user.name}`);
    }
  } else {
    showToast('❌ Credenciales incorrectas');
  }
}

function doRegister(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[placeholder="Tu nombre"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  
  // Crear nuevo usuario
  USERS[email] = {
    email: email,
    name: name,
    role: 'cliente',
    password: password
  };
  
  currentUser = USERS[email];
  saveSession(currentUser); // Guardar sesión persistente
  updateAdminButtonVisibility(); // Actualizar visibilidad del botón
  showView('portal');
  updatePortalUserInfo();
  showToast('🌿 ¡Cuenta creada! Te damos la bienvenida a Santa Maria');
}

function updatePortalUserInfo() {
  if (currentUser) {
    document.querySelector('.portal-name').textContent = currentUser.name;
    document.querySelector('.portal-email').textContent = currentUser.email;
  }
}

function checkAdminAccess() {
  if (!currentUser || currentUser.role !== 'admin') {
    showToast('❌ Acceso denegado. Se requieren privilegios de administrador.');
    showView('home');
    return false;
  }
  return true;
}

// Login con Google OAuth2 (Real)
function loginWithGoogle() {
  // Configuración OAuth2 de Google
  const CLIENT_ID = '1047481229233-.apps.googleusercontent.com'; // Client ID de demostración
  const REDIRECT_URI = window.location.origin + window.location.pathname;
  const SCOPE = 'email profile openid';
  
  // Construir URL de autorización de Google
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=token&` +
    `scope=${encodeURIComponent(SCOPE)}&` +
    `access_type=online&` +
    `prompt=select_account`;
  
  // Mostrar mensaje de carga
  showToast('🔐 Redirigiendo a Google...');
  
  // Redirigir a Google para autenticación real
  window.location.href = authUrl;
}

// Versión real para producción (descomentar cuando tengas Client ID)
/*
function loginWithGoogle() {
  const CLIENT_ID = 'TU_CLIENT_ID_DE_GOOGLE'; // Reemplazar con tu Client ID real
  const REDIRECT_URI = window.location.origin + '/auth/google/callback';
  const SCOPE = 'email profile';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(SCOPE)}&` +
    `access_type=offline&` +
    `prompt=consent`;
  
  showToast('🔐 Redirigiendo a Google...');
  window.location.href = authUrl;
}
*/

// Función para manejar el callback de Google (se llama después de la redirección)
function handleGoogleCallback() {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get('access_token');
  const error = hashParams.get('error');
  
  if (error) {
    showToast('❌ Error en autenticación con Google');
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }
  
  if (accessToken) {
    // Obtener información del usuario con el token de acceso
    fetchUserInfo(accessToken);
  }
}

// Obtener información del usuario de Google
async function fetchUserInfo(accessToken) {
  try {
    showToast('🔐 Obteniendo información de tu cuenta...');
    
    // Llamar a la API de Google para obtener datos del usuario
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
    const userData = await response.json();
    
    if (userData.email) {
      // Procesar datos del usuario
      processGoogleUser(userData);
    } else {
      showToast('❌ No se pudo obtener información de la cuenta');
    }
  } catch (error) {
    console.error('Error al obtener info de Google:', error);
    showToast('❌ Error al conectar con Google');
  }
  
  // Limpiar URL
  window.history.replaceState({}, document.title, window.location.pathname);
}

// Procesar datos del usuario de Google
function processGoogleUser(userData) {
  const googleUser = {
    email: userData.email,
    name: userData.name || userData.email.split('@')[0],
    picture: userData.picture,
    verified: userData.verified_email
  };
  
  // Verificar si es el admin
  if (googleUser.email === 'fernandoperezgestion225@gmail.com') {
    currentUser = {
      email: googleUser.email,
      name: 'Fernando Pérez',
      role: 'admin',
      picture: googleUser.picture,
      provider: 'google'
    };
    saveSession(currentUser);
    updateAdminButtonVisibility();
    showView('admin');
    updateAdminUserInfo();
    showToast('👑 Bienvenido al panel administrativo');
  } else {
    currentUser = {
      email: googleUser.email,
      name: googleUser.name,
      role: 'cliente',
      picture: googleUser.picture,
      provider: 'google'
    };
    saveSession(currentUser);
    updateAdminButtonVisibility();
    showView('portal');
    updatePortalUserInfo();
    showToast(`👋 Bienvenida, ${googleUser.name}`);
  }
}

// Login con Facebook OAuth2 (Real)
function loginWithFacebook() {
  // Configuración OAuth2 de Facebook
  const APP_ID = '1234567890123456'; // Reemplazar con tu App ID real de Facebook
  const REDIRECT_URI = window.location.origin + window.location.pathname;
  const SCOPE = 'email,public_profile';
  
  // Construir URL de autorización de Facebook
  const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
    `client_id=${APP_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=token&` +
    `scope=${encodeURIComponent(SCOPE)}&` +
    `state=facebook_auth_${Date.now()}`;
  
  // Mostrar mensaje de carga
  showToast('🔐 Redirigiendo a Facebook...');
  
  // Redirigir a Facebook para autenticación real
  window.location.href = authUrl;
}

// Función para manejar el callback de Facebook
function handleFacebookCallback() {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get('access_token');
  const error = hashParams.get('error');
  const state = hashParams.get('state');
  
  // Verificar que sea callback de Facebook
  if (state && state.includes('facebook_auth')) {
    if (error) {
      showToast('❌ Error en autenticación con Facebook');
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    
    if (accessToken) {
      // Obtener información del usuario con el token de acceso
      fetchFacebookUserInfo(accessToken);
    }
  }
}

// Obtener información del usuario de Facebook
async function fetchFacebookUserInfo(accessToken) {
  try {
    showToast('🔐 Obteniendo información de tu cuenta de Facebook...');
    
    // Llamar a la API de Facebook para obtener datos del usuario
    const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`);
    const userData = await response.json();
    
    if (userData.email) {
      // Procesar datos del usuario
      processFacebookUser(userData);
    } else {
      // Si no hay email, intentar obtener información básica
      if (userData.id && userData.name) {
        userData.email = `${userData.id.replace(/\d/g, '')}@facebook.user`;
        processFacebookUser(userData);
      } else {
        showToast('❌ No se pudo obtener información de la cuenta de Facebook');
      }
    }
  } catch (error) {
    console.error('Error al obtener info de Facebook:', error);
    showToast('❌ Error al conectar con Facebook');
  }
  
  // Limpiar URL
  window.history.replaceState({}, document.title, window.location.pathname);
}

// Procesar datos del usuario de Facebook
function processFacebookUser(userData) {
  const facebookUser = {
    email: userData.email,
    name: userData.name,
    picture: userData.picture?.data?.url || `https://picsum.photos/seed/facebook-${userData.id}/100/100.jpg`,
    verified: true,
    provider: 'facebook'
  };
  
  // Verificar si es el admin (aunque unlikely para Facebook)
  if (facebookUser.email === 'fernandoperezgestion225@gmail.com') {
    currentUser = {
      email: facebookUser.email,
      name: 'Fernando Pérez',
      role: 'admin',
      picture: facebookUser.picture,
      provider: 'facebook'
    };
    saveSession(currentUser);
    updateAdminButtonVisibility();
    showView('admin');
    updateAdminUserInfo();
    showToast('👑 Bienvenido al panel administrativo');
  } else {
    currentUser = {
      email: facebookUser.email,
      name: facebookUser.name,
      role: 'cliente',
      picture: facebookUser.picture,
      provider: 'facebook'
    };
    saveSession(currentUser);
    updateAdminButtonVisibility();
    showView('portal');
    updatePortalUserInfo();
    showToast(`👋 Bienvenida, ${facebookUser.name}`);
  }
}

function logout() {
  clearSession(); // Eliminar sesión persistente
  updateAdminButtonVisibility(); // Ocultar botón de admin
  showView('home');
  showToast('👋 Sesión cerrada correctamente');
}

// ===== PORTAL USUARIO =====

function setPortalTab(el) {
  document.querySelectorAll('.portal-menu li').forEach(li => li.classList.remove('active'));
  if (el) el.classList.add('active');
}
