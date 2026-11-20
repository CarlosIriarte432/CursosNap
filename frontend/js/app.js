const COURSES = [
  {
    id: 1,
    title: "Excel Avanzado para Gestión y Reportes",
    category: "Gestión",
    modality: "Online en vivo",
    duration: "16 horas",
    price: 89990,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Domina tablas dinámicas, Power Query, macros básicas y dashboards ejecutivos listos para presentar en tu trabajo.",
    syllabus: [
      "Fórmulas lógicas y de búsqueda avanzada (BUSCARX, INDICE/COINCIDIR)",
      "Automatización de datos con Power Query",
      "Diseño de Dashboards interactivos",
      "Introducción a Macros y automatización de reportes"
    ]
  },
  {
    id: 2,
    title: "Prevención de Riesgos y Seguridad Industrial",
    category: "Operaciones",
    modality: "Presencial / Online",
    duration: "24 horas",
    price: 120000,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    description: "Normativa vigente, identificación de peligros, matrices de riesgo y protocolos de respuesta ante emergencias.",
    syllabus: [
      "Marco legal y normativa chilena vigente",
      "Elaboración de Matrices IPER",
      "Uso correcto de EPP y señalética",
      "Protocolos de emergencia e investigación de incidentes"
    ]
  },
  {
    id: 3,
    title: "Marketing Digital y Ventas por Redes Sociales",
    category: "Marketing",
    modality: "Grabado + Tutorías",
    duration: "12 horas",
    price: 65000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "Aprende a crear campañas rentables en Meta Ads, estructurar contenido que vende y cerrar clientes por WhatsApp.",
    syllabus: [
      "Definición de cliente ideal y propuesta de valor",
      "Creación de campañas en Meta Ads desde cero",
      "Estrategia de contenido para Instagram y TikTok",
      "Embudo de ventas y cierre por WhatsApp Business"
    ]
  },
  {
    id: 4,
    title: "Liderazgo y Gestión de Equipos",
    category: "Gestión",
    modality: "Online en vivo",
    duration: "10 horas",
    price: 75000,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    description: "Herramientas prácticas para delegar, dar feedback efectivo y resolver conflictos en equipos presenciales o remotos.",
    syllabus: [
      "Estilos de liderazgo y comunicación asertiva",
      "Delegación efectiva y seguimiento de KPIs",
      "Manejo de conversaciones difíciles y feedback",
      "Resolución de conflictos y motivación"
    ]
  },
  {
    id: 2,
    title: "Prevención de Riesgos y Seguridad Industrial",
    category: "Operaciones",
    modality: "Presencial / Online",
    duration: "24 horas",
    price: 120000,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    description: "Normativa vigente, identificación de peligros, matrices de riesgo y protocolos de respuesta ante emergencias.",
    syllabus: [
      "Marco legal y normativa chilena vigente",
      "Elaboración de Matrices IPER",
      "Uso correcto de EPP y señalética",
      "Protocolos de emergencia e investigación de incidentes"
    ]
  },
  {
    id: 3,
    title: "Marketing Digital y Ventas por Redes Sociales",
    category: "Marketing",
    modality: "Grabado + Tutorías",
    duration: "12 horas",
    price: 65000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "Aprende a crear campañas rentables en Meta Ads, estructurar contenido que vende y cerrar clientes por WhatsApp.",
    syllabus: [
      "Definición de cliente ideal y propuesta de valor",
      "Creación de campañas en Meta Ads desde cero",
      "Estrategia de contenido para Instagram y TikTok",
      "Embudo de ventas y cierre por WhatsApp Business"
    ]
  }
];

let state = {
  activeCategory: "Todos",
  searchQuery: "",
  cart: JSON.parse(localStorage.getItem("demo_cart")) || [],
  user: JSON.parse(localStorage.getItem("demo_user")) || null,
  purchasedIds: JSON.parse(localStorage.getItem("demo_purchased")) || [],
  selectedCourseId: null
};

const saveState = () => {
  localStorage.setItem("demo_cart", JSON.stringify(state.cart));
  localStorage.setItem("demo_user", JSON.stringify(state.user));
  localStorage.setItem("demo_purchased", JSON.stringify(state.purchasedIds));
};

const formatCLP = (amount) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount);

// ================= SCROLL REVEAL ANIMATION =================
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ================= TOAST =================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const colors = {
    info: "bg-slate-900 text-white",
    success: "bg-emerald-600 text-white",
    warning: "bg-amber-500 text-white"
  };

  const toast = document.createElement("div");
  toast.className = `${colors[type]} px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 transition-all duration-300`;
  toast.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-info"}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ================= NAVBAR AUTH =================
function renderAuthSection() {
  const authSection = document.getElementById("authSection");

  if (!state.user) {
    authSection.innerHTML = `
      <button id="openLoginBtn" class="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition">
        Ingresar
      </button>
      <button id="openRegisterBtn" class="bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-sm font-bold px-4 py-2 rounded-xl transition">
        Registrarse
      </button>
    `;
    document.getElementById("openLoginBtn").addEventListener("click", () => openAuthModal("login"));
    document.getElementById("openRegisterBtn").addEventListener("click", () => openAuthModal("register"));
  } else {
    authSection.innerHTML = `
      <button id="openMyCoursesBtn" class="text-xs sm:text-sm font-semibold text-cyan-300 bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 rounded-xl transition flex items-center gap-1.5">
        <i class="fa-solid fa-book-open"></i> Mis Cursos (${state.purchasedIds.length})
      </button>
      <div class="hidden sm:flex items-center gap-2 pl-2 border-l border-white/15">
        <span class="text-xs font-semibold text-slate-200">${state.user.name.split(" ")[0]}</span>
        <button id="logoutBtn" class="text-slate-400 hover:text-red-400 text-sm" title="Cerrar sesión">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    `;
    document.getElementById("openMyCoursesBtn").addEventListener("click", openMyCoursesModal);
    document.getElementById("logoutBtn").addEventListener("click", logout);
  }
}

// ================= CATÁLOGO =================
function renderCategories() {
  const container = document.getElementById("categoryFilters");
  const categories = ["Todos", ...new Set(COURSES.map((c) => c.category))];

  container.innerHTML = categories
    .map((cat) => {
      const isActive = cat === state.activeCategory;
      const classes = isActive
        ? "bg-slate-900 text-white shadow-md"
        : "bg-white text-slate-700 border border-slate-200 hover:border-blue-400";
      return `<button data-category="${cat}" class="px-4 py-2 rounded-full text-sm font-semibold transition ${classes}">${cat}</button>`;
    })
    .join("");

  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeCategory = btn.dataset.category;
      renderCategories();
      renderCourses();
    });
  });
}

function renderCourses() {
  const grid = document.getElementById("coursesGrid");
  const filtered = COURSES.filter((c) => {
    const matchCat = state.activeCategory === "Todos" || c.category === state.activeCategory;
    const matchSearch = c.title.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500">No se encontraron cursos.</div>`;
    return;
  }

  grid.innerHTML = filtered
    .map((course) => {
      const isPurchased = state.purchasedIds.includes(course.id);
      const inCart = state.cart.includes(course.id);

      let actionButton = `
        <button data-add="${course.id}" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition">
          <i class="fa-solid fa-cart-plus mr-1"></i> Agregar
        </button>`;

      if (isPurchased) {
        actionButton = `<span class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl"><i class="fa-solid fa-check mr-1"></i> Adquirido</span>`;
      } else if (inCart) {
        actionButton = `<button data-open-cart="true" class="bg-slate-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl">En carrito</button>`;
      }

      return `
        <article class="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
          <div class="relative h-48 overflow-hidden">
            <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <span class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg">
              ${course.modality}
            </span>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">${course.category}</span>
            <h3 class="font-display font-bold text-lg text-slate-900 mt-1 mb-2 leading-snug">${course.title}</h3>
            <p class="text-sm text-slate-600 mb-5 line-clamp-2">${course.description}</p>

            <div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <p class="text-xs text-slate-500">${course.duration}</p>
                <p class="font-display text-lg font-extrabold text-slate-900">${formatCLP(course.price)}</p>
              </div>
              <div class="flex items-center gap-2">
                <button data-detail="${course.id}" class="text-xs font-semibold text-slate-600 hover:text-blue-600 px-2 py-2 transition">
                  Temario
                </button>
                ${actionButton}
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  grid.querySelectorAll("[data-detail]").forEach((btn) =>
    btn.addEventListener("click", () => openCourseModal(Number(btn.dataset.detail)))
  );
  grid.querySelectorAll("[data-add]").forEach((btn) =>
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.add)))
  );
  grid.querySelectorAll("[data-open-cart]").forEach((btn) =>
    btn.addEventListener("click", openCart)
  );
}

// ================= CARRITO =================
function addToCart(courseId) {
  if (state.purchasedIds.includes(courseId)) {
    showToast("Ya tienes este curso en tu cuenta.", "info");
    return;
  }
  if (state.cart.includes(courseId)) {
    openCart();
    return;
  }
  state.cart.push(courseId);
  saveState();
  renderCart();
  renderCourses();
  showToast("Curso agregado al carrito", "success");
}

function removeFromCart(courseId) {
  state.cart = state.cart.filter((id) => id !== courseId);
  saveState();
  renderCart();
  renderCourses();
}

function renderCart() {
  const badge = document.getElementById("cartBadge");
  const container = document.getElementById("cartItemsContainer");
  const totalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (state.cart.length > 0) {
    badge.textContent = state.cart.length;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }

  const cartCourses = state.cart.map((id) => COURSES.find((c) => c.id === id)).filter(Boolean);
  const total = cartCourses.reduce((sum, c) => sum + c.price, 0);
  totalEl.textContent = formatCLP(total);
  checkoutBtn.disabled = cartCourses.length === 0;

  if (cartCourses.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-slate-400">
        <i class="fa-solid fa-cart-shopping text-4xl mb-3 opacity-30"></i>
        <p class="text-sm">Tu carrito está vacío.</p>
      </div>`;
    return;
  }

  container.innerHTML = cartCourses
    .map(
      (course) => `
      <div class="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 items-center">
        <img src="${course.image}" alt="${course.title}" class="w-16 h-16 rounded-lg object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-sm text-slate-900 truncate">${course.title}</h4>
          <p class="text-xs text-slate-500">${course.modality}</p>
          <p class="text-sm font-extrabold text-blue-600 mt-1">${formatCLP(course.price)}</p>
        </div>
        <button data-remove="${course.id}" class="text-slate-400 hover:text-red-500 p-2">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `
    )
    .join("");

  container.querySelectorAll("[data-remove]").forEach((btn) =>
    btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.remove)))
  );
}

function openCart() {
  document.getElementById("cartOverlay").classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cartOverlay").classList.add("hidden");
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!state.user) {
    closeCart();
    openAuthModal("register");
    showToast("Crea una cuenta o inicia sesión para completar tu compra", "warning");
    return;
  }

  state.purchasedIds = [...new Set([...state.purchasedIds, ...state.cart])];
  state.cart = [];
  saveState();

  renderCart();
  renderCourses();
  renderAuthSection();
  closeCart();
  showToast("¡Compra exitosa! Ya puedes ver tus cursos.", "success");
  openMyCoursesModal();
});

// ================= MODALES =================
function openCourseModal(courseId) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return;
  state.selectedCourseId = courseId;

  document.getElementById("modalCategory").textContent = course.category;
  document.getElementById("modalTitle").textContent = course.title;
  document.getElementById("modalDuration").textContent = course.duration;
  document.getElementById("modalModality").textContent = course.modality;
  document.getElementById("modalPrice").textContent = formatCLP(course.price);
  document.getElementById("modalDescription").textContent = course.description;
  document.getElementById("modalSyllabus").innerHTML = course.syllabus
    .map((item) => `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 mt-1"></i><span>${item}</span></li>`)
    .join("");

  const modal = document.getElementById("courseModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeCourseModal() {
  const modal = document.getElementById("courseModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

document.getElementById("modalAddToCartBtn").addEventListener("click", () => {
  if (state.selectedCourseId) {
    addToCart(state.selectedCourseId);
    closeCourseModal();
  }
});

function openAuthModal(mode = "login") {
  const modal = document.getElementById("authModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  switchAuthTab(mode);
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function switchAuthTab(mode) {
  const isLogin = mode === "login";
  document.getElementById("loginForm").classList.toggle("hidden", !isLogin);
  document.getElementById("registerForm").classList.toggle("hidden", isLogin);

  document.getElementById("tabLogin").className = isLogin
    ? "flex-1 py-3.5 text-sm font-bold text-blue-600 border-b-2 border-blue-600 bg-blue-50/40"
    : "flex-1 py-3.5 text-sm font-bold text-slate-500 hover:text-slate-700";

  document.getElementById("tabRegister").className = !isLogin
    ? "flex-1 py-3.5 text-sm font-bold text-blue-600 border-b-2 border-blue-600 bg-blue-50/40"
    : "flex-1 py-3.5 text-sm font-bold text-slate-500 hover:text-slate-700";
}

document.getElementById("tabLogin").addEventListener("click", () => switchAuthTab("login"));
document.getElementById("tabRegister").addEventListener("click", () => switchAuthTab("register"));

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const name = email.split("@")[0];
  state.user = { name: name.charAt(0).toUpperCase() + name.slice(1), email };
  saveState();
  renderAuthSection();
  closeAuthModal();
  showToast(`¡Bienvenido de vuelta, ${state.user.name}!`, "success");
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  state.user = { name, email };
  saveState();
  renderAuthSection();
  closeAuthModal();
  showToast(`Cuenta creada para ${name}`, "success");
});

function logout() {
  state.user = null;
  saveState();
  renderAuthSection();
  showToast("Sesión cerrada", "info");
}

function openMyCoursesModal() {
  const modal = document.getElementById("myCoursesModal");
  document.getElementById("myCoursesUserLabel").textContent = `Alumno: ${state.user.name} (${state.user.email})`;

  const list = document.getElementById("myCoursesList");
  const myCourses = state.purchasedIds.map((id) => COURSES.find((c) => c.id === id)).filter(Boolean);

  if (myCourses.length === 0) {
    list.innerHTML = `<p class="text-center text-slate-500 py-8 text-sm">Aún no has adquirido ningún curso.</p>`;
  } else {
    list.innerHTML = myCourses
      .map(
        (course) => `
        <div class="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 items-center">
          <img src="${course.image}" class="w-full sm:w-24 h-24 rounded-lg object-cover" />
          <div class="flex-1 w-full">
            <span class="text-[11px] font-bold uppercase text-emerald-600">Acceso Activo</span>
            <h4 class="font-bold text-slate-900">${course.title}</h4>
            <div class="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
              <div class="bg-blue-600 h-full w-1/4 rounded-full"></div>
            </div>
            <p class="text-xs text-slate-500 mt-1">Progreso: 25% completado</p>
          </div>
          <button onclick="alert('Aquí se abriría el reproductor de clases o el link a Zoom/Meet.')" class="w-full sm:w-auto bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition">
            Ir al Aula
          </button>
        </div>
      `
      )
      .join("");
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeMyCoursesModal() {
  const modal = document.getElementById("myCoursesModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// ================= FORMULARIO DE CONTACTO =================
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  showToast("¡Mensaje enviado! Te contactaremos a la brevedad.", "success");
});

// ================= EVENT LISTENERS =================
document.getElementById("searchInput").addEventListener("input", (e) => {
  state.searchQuery = e.target.value;
  renderCourses();
});

document.getElementById("openCartBtn").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", (e) => {
  if (e.target.id === "cartOverlay") closeCart();
});

document.getElementById("closeCourseModalBtn").addEventListener("click", closeCourseModal);
document.getElementById("closeAuthModalBtn").addEventListener("click", closeAuthModal);
document.getElementById("closeMyCoursesBtn").addEventListener("click", closeMyCoursesModal);
document.getElementById("heroRegisterBtn").addEventListener("click", () => openAuthModal("register"));

// ================= INIT =================
renderAuthSection();
renderCategories();
renderCourses();
renderCart();
initScrollReveal();