# 🌿 Tienda Herbal Santa Maria — Web App

Plataforma web multiplataforma de e-commerce para productos herbales naturales certificados INVIMA.

---

## 📁 Estructura del Proyecto

```
tienda-herbal/
├── index.html              ← Punto de entrada principal (SPA)
├── css/
│   ├── variables.css       ← Variables CSS globales (colores, sombras, radios)
│   ├── base.css            ← Reset, tipografía, utilidades, toasts
│   ├── components.css      ← Botones, badges, formularios, tarjetas, modales
│   ├── layout.css          ← Navbar, Hero, Footer, Admin, Portal
│   └── responsive.css      ← Media queries (mobile-first)
├── js/
│   ├── data.js             ← Datos: productos, blog, pedidos, usuarios
│   ├── navigation.js       ← Navegación SPA, vistas, secciones, toasts
│   ├── products.js         ← Catálogo, filtros, búsqueda, detalle de producto
│   ├── cart.js             ← Carrito de compras (añadir, quitar, cantidades)
│   ├── checkout.js         ← Proceso de pago (3 pasos + MercadoPago)
│   ├── auth.js             ← Login, registro, portal de usuario
│   ├── blog.js             ← Blog herbal, suscripción, contacto
│   ├── admin.js            ← Panel administrativo completo
│   └── app.js              ← Inicialización general
└── README.md
```

---

## 🚀 Cómo Usar

1. Abre `index.html` en cualquier navegador moderno.
2. No requiere servidor ni instalación de dependencias.
3. Para producción, subir todos los archivos al servidor web.

---

## 🧩 Módulos Implementados

### Sitio Público
- **Hero** con estadísticas, CTA y fondo botánico animado
- **Barra de beneficios** (envío, INVIMA, seguridad)
- **Categorías** interactivas con filtrado automático
- **Catálogo** con filtros, búsqueda en tiempo real, badges de stock e INVIMA
- **Detalle de producto** con modal, propiedades medicinales, modo de uso y control de cantidad
- **Blog Herbal** con botones de compartir en RRSS
- **Kit Bienestar** — suscripción mensual con MercadoPago recurrente
- **Contacto** con formulario y datos de ubicación

### Autenticación
- Login con JWT (simulado)
- Registro con validación (nombre, email, contraseña min. 8 chars)
- Recuperación de contraseña

### Portal de Usuario
- Historial de pedidos con estados en tiempo real
- Gestión de suscripción Kit Bienestar
- Perfil y direcciones de envío

### Carrito & Checkout
- Carrito persistente (drawer lateral)
- Checkout en 3 pasos: Envío → Pago → Confirmación
- Métodos de pago: Tarjeta, PSE, Efecty, Baloto (MercadoPago)
- Cálculo de IVA (19%) y costo de envío

### Panel Administrativo
- **Dashboard** con métricas clave y gráfica de ventas
- **Gestión de Productos** — CRUD completo con hasta 5 imágenes, badge INVIMA, control de stock
- **Gestión de Pedidos** — filtros por estado, número de guía, exportar PDF
- **Usuarios** — listado con roles (cliente / administrador)
- **Suscripciones** — activas, pausadas, MRR, tasa de retención
- **Blog** — crear/editar artículos con TinyMCE (simulado)
- **Reportes** — exportar PDF (TCPDF) y Excel, top productos

---

## 🛠️ Stack Técnico (Frontend Demo)

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica |
| CSS3 (sin framework) | Diseño custom con variables CSS |
| JavaScript ES6+ (vanilla) | Lógica SPA sin dependencias |
| Google Fonts | Cormorant Garamond + DM Sans |

### Integraciones previstas (Backend PHP)
- **MercadoPago Checkout Pro** — pagos únicos y recurrentes
- **PHPMailer + SMTP** — emails transaccionales con templates HTML
- **Coordinadora / Envíame** — cotización y seguimiento de envíos
- **Google Analytics 4** — eventos de e-commerce
- **Meta Pixel** — retargeting

---

## 📐 Arquitectura Backend (PHP 8.2 + MVC)

```
app/
├── Controllers/    ← Reciben HTTP, validan inputs, invocan Models
├── Models/         ← Acceso a datos via PDO + Prepared Statements
├── Views/          ← HTML + PHP embebido (solo presentación)
├── Middleware/     ← JWT auth, CSRF, Rate Limiting
├── Routes/         ← Router principal
└── api/v1/         ← REST API (JSON) para mobile/terceros
```

### Base de Datos (MySQL 8 — UTF8mb4)
Entidades principales: `users`, `products`, `categories`, `orders`, `order_items`, `subscriptions`, `cart`, `blog_posts`, `token_blacklist`

---

## 🔒 Seguridad Implementada (Backend)

- JWT con expiración 7 días + blacklist
- Bloqueo tras 5 intentos fallidos (15 min)
- PDO Prepared Statements (anti SQL Injection)
- htmlspecialchars() en vistas (anti XSS)
- Tokens CSRF en todos los formularios
- Headers: HSTS, CSP, X-Frame-Options, nosniff
- Rate Limiting: 10 req/min login, 100 req/min API
- Validación MIME real en uploads de imágenes
- PCI-DSS via MercadoPago (datos de tarjeta nunca pasan por el servidor)

---

## 🌐 Compatibilidad

Chrome 90+ · Firefox 88+ · Safari 14+ · Edge 90+ · Android · iOS

---

## 📞 Contacto

**Tienda Herbal Santa Maria**  
Bogotá D.C., Colombia  
hola@herbalsantamaria.co  
+57 (601) 234-5678
