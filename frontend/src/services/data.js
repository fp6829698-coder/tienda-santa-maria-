// ===== DATOS DE LA APLICACIÓN =====

const productos = [
  {
    id: 1, nombre: "Té de Manzanilla Orgánica", cat: "Tés Herbales", emoji: "🌼",
    precio: 24900, stock: 85, invima: true,
    desc: "Manzanilla 100% orgánica cultivada en los Andes colombianos. Perfecta para el descanso y la digestión.",
    props: "Calmante, digestiva, antiinflamatoria, antiespasmódica",
    uso: "1 cucharadita por taza de agua caliente. Reposar 5 minutos."
  },
  {
    id: 2, nombre: "Aceite Esencial de Lavanda", cat: "Aceites Esenciales", emoji: "💜",
    precio: 52000, stock: 40, invima: true,
    desc: "Aceite esencial puro de lavanda angustifolia, extraído por destilación al vapor.",
    props: "Relajante, ansiolítica, cicatrizante, aromática",
    uso: "3-5 gotas en difusor o diluir 2% en aceite portador para uso tópico."
  },
  {
    id: 3, nombre: "Cúrcuma Orgánica en Cápsulas", cat: "Suplementos", emoji: "🟡",
    precio: 45800, stock: 120, invima: true,
    desc: "Cúrcuma longa con piperina para máxima absorción. Potente antiinflamatorio natural.",
    props: "Antiinflamatoria, antioxidante, hepatoprotectora, inmunoestimulante",
    uso: "1-2 cápsulas al día con las comidas."
  },
  {
    id: 4, nombre: "Crema Facial Aloe & Rosa Mosqueta", cat: "Cosméticos", emoji: "🌹",
    precio: 68000, stock: 30, invima: true,
    desc: "Crema hidratante con aloe vera orgánico y aceite de rosa mosqueta chilena. Sin parabenos.",
    props: "Hidratante, regeneradora, antienvejecimiento, cicatrizante",
    uso: "Aplicar en piel limpia mañana y noche con suaves masajes circulares."
  },
  {
    id: 5, nombre: "Tintura de Equinácea", cat: "Tintura", emoji: "🧪",
    precio: 38500, stock: 5, invima: false,
    desc: "Extracto hidroalcohólico de Echinacea purpurea para fortalecer el sistema inmune.",
    props: "Inmunoestimulante, antiviral, antibacteriana",
    uso: "20-30 gotas en agua 3 veces al día durante periodos de mayor riesgo."
  },
  {
    id: 6, nombre: "Plantas Secas - Kit Relajación", cat: "Plantas Secas", emoji: "🌾",
    precio: 32000, stock: 0, invima: true,
    desc: "Mix de valeriana, pasiflora y tilo secos. Ideal para preparar infusiones relajantes en casa.",
    props: "Sedante suave, ansiolítica, hipnótica leve",
    uso: "1 cucharada del mix en agua caliente. Tomar antes de dormir."
  },
  {
    id: 7, nombre: "Aceite de Árbol de Té", cat: "Aceites Esenciales", emoji: "🌿",
    precio: 41200, stock: 65, invima: true,
    desc: "Aceite esencial puro Melaleuca alternifolia. Potente antiséptico y antifúngico natural.",
    props: "Antiséptica, antifúngica, antibacteriana, antivirales",
    uso: "Diluir 1-2% en aceite portador. No ingerir."
  },
  {
    id: 8, nombre: "Té Verde Matcha Ceremonial", cat: "Tés Herbales", emoji: "🍵",
    precio: 58900, stock: 22, invima: true,
    desc: "Matcha de grado ceremonial, molido en piedra, de primera cosecha. Alto contenido de antioxidantes.",
    props: "Antioxidante, energizante, neuroprotectora, detoxificante",
    uso: "1 gramo en agua caliente (70°C). Batir con chasen hasta formar espuma."
  }
];

const blogPosts = [
  {
    id: 1, emoji: "🌿", tiempo: "5 min", fecha: "28 Feb 2026",
    titulo: "10 Plantas Medicinales que Deberías Conocer",
    extracto: "Descubre las plantas más poderosas de la farmacopea colombiana y cómo incorporarlas en tu rutina de bienestar diario.",
    tags: ["Plantas", "Bienestar"],
    gradiente: "linear-gradient(135deg, #1a3d2b, #2d6a4f)"
  },
  {
    id: 2, emoji: "🌙", tiempo: "7 min", fecha: "15 Feb 2026",
    titulo: "Guía Completa del Té de Cúrcuma",
    extracto: "Todo lo que necesitas saber sobre el té dorado: beneficios antiinflamatorios, recetas y contraindicaciones a tener en cuenta.",
    tags: ["Recetas", "Antiinflamatorio"],
    gradiente: "linear-gradient(135deg, #c9a84c, #8b5e3c)"
  },
  {
    id: 3, emoji: "💆", tiempo: "6 min", fecha: "5 Mar 2026",
    titulo: "Aceites Esenciales para el Estrés y la Ansiedad",
    extracto: "Aromaterapia aplicada al bienestar mental. Conoce los mejores aceites y técnicas de aplicación respaldadas por estudios.",
    tags: ["Aromaterapia", "Salud Mental"],
    gradiente: "linear-gradient(135deg, #52b788, #1a3d2b)"
  }
];

const adminOrders = [
  { id: "ORD-0356", cliente: "María García",  productos: "Cúrcuma × 1, Equinácea × 1",    total: "$75.200",  estado: "enviado"    },
  { id: "ORD-0355", cliente: "Carlos Ruiz",   productos: "Kit Bienestar Marzo",             total: "$89.900",  estado: "procesando" },
  { id: "ORD-0354", cliente: "Ana López",     productos: "Aceite Lavanda × 2",              total: "$104.000", estado: "pendiente"  },
  { id: "ORD-0353", cliente: "Luis Martínez", productos: "Matcha Ceremonial × 1",           total: "$58.900",  estado: "entregado"  }
];

const adminUsers = [
  { nombre: "María García", email: "maria@email.com",  tel: "+57 310 123 4567", pedidos: 8,  rol: "cliente",        registro: "15 Ene 2025" },
  { nombre: "Carlos Ruiz",  email: "carlos@email.com", tel: "+57 320 987 6543", pedidos: 3,  rol: "cliente",        registro: "3 Mar 2025"  },
  { nombre: "Ana López",    email: "ana@email.com",    tel: "+57 300 456 7890", pedidos: 12, rol: "cliente",        registro: "20 Ago 2024" },
  { nombre: "Admin Santa",  email: "admin@herbal.co",  tel: "+57 601 234 5678", pedidos: 0,  rol: "administrador",  registro: "1 Ene 2024"  }
];

const adminSubs = [
  { cliente: "María García",   plan: "Mensual", inicio: "15 Ene 2025", proximo: "1 Abr 2026",  estado: "activo"  },
  { cliente: "Carlos Ruiz",    plan: "Mensual", inicio: "3 Mar 2025",  proximo: "3 Abr 2026",  estado: "activo"  },
  { cliente: "Paula Jiménez",  plan: "Mensual", inicio: "20 Feb 2026", proximo: "20 Mar 2026", estado: "pausado" },
  { cliente: "Luis Martínez",  plan: "Mensual", inicio: "10 Dic 2025", proximo: "10 Abr 2026", estado: "activo"  }
];
