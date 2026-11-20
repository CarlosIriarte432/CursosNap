const COURSES = [
  {
    id: 1,
    title: "Prevención y Control de IAAS (80 Horas)",
    category: "Gestión y Normativa",
    modality: "Online Asincrónico",
    duration: "80 hrs pedagógicas",
    price: 49990,
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80",
    description: "Actualización en normativa MINSAL sobre Infecciones Asociadas a la Atención de Salud, precauciones estándar y vigilancia epidemiológica.",
    syllabus: [
      "Marco normativo y programa nacional de control de IAAS",
      "Precauciones estándar e higiene de manos clínica",
      "Prevención de infecciones asociadas a dispositivos invasivos",
      "Manejo de brotes epidémicos y bioseguridad hospitalaria"
    ]
  },
  {
    id: 2,
    title: "Soporte Vital Básico (RCP y Uso de DEA)",
    category: "Urgencias y RCP",
    modality: "Semipresencial",
    duration: "24 hrs pedagógicas",
    price: 65000,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
    description: "Protocolos actualizados AHA para reanimación cardiopulmonar en adultos, pediátricos y lactantes, más manejo de obstrucción de vía aérea.",
    syllabus: [
      "Cadena de supervivencia y reconocimiento precoz del paro",
      "RCP de alta calidad en adulto, niño y lactante",
      "Operación segura del Desfibrilador Externo Automático (DEA)",
      "Taller práctico de simulación clínica evaluada"
    ]
  },
  {
    id: 3,
    title: "Manejo Avanzado de Heridas y Ostomías",
    category: "Enfermería y Cuidados",
    modality: "Online en Vivo",
    duration: "40 hrs pedagógicas",
    price: 79990,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    description: "Valoración integral de heridas complejas, úlceras por presión, pie diabético y selección basada en evidencia de apósitos activos.",
    syllabus: [
      "Fisiología de la cicatrización y valoración con diagrama INH",
      "Clasificación y manejo de apósitos pasivos, interactivos y bioactivos",
      "Abordaje integral de úlceras venosas y pie diabético",
      "Cuidados de enfermería en pacientes ostomizados"
    ]
  },
  {
    id: 4,
    title: "Toma de Muestras Clínicas y Flebotomía",
    category: "Enfermería y Cuidados",
    modality: "Presencial / Taller",
    duration: "32 hrs pedagógicas",
    price: 69990,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    description: "Técnicas seguras de punción venosa, orden de llenado de tubos, fase preanalítica y manejo de muestras biológicas.",
    syllabus: [
      "Anatomía vascular periférica y selección del sitio de punción",
      "Fase preanalítica, rotulación y orden correcto de tubos",
      "Prevención de complicaciones y manejo de accidentes cortopunzantes",
      "Práctica supervisada en fantomas clínicos"
    ]
  },
  {
    id: 5,
    title: "Calidad y Acreditación en Prestadores de Salud",
    category: "Gestión y Normativa",
    modality: "Online Asincrónico",
    duration: "60 hrs pedagógicas",
    price: 85000,
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80",
    description: "Herramientas para implementar y auditar los estándares de acreditación de la Superintendencia de Salud en clínicas y centros médicos.",
    syllabus: [
      "Sistema Nacional de Acreditación y marco legal vigente",
      "Diseño de protocolos, indicadores y umbrales de cumplimiento",
      "Gestión de eventos adversos y seguridad del paciente",
      "Preparación de auditorías internas y documentación"
    ]
  },
  {
    id: 6,
    title: "Farmacología Clínica y Administración Segura",
    category: "Urgencias y RCP",
    modality: "Online en Vivo",
    duration: "36 hrs pedagógicas",
    price: 59990,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    description: "Cálculo de dosis, diluciones, fármacos de alto riesgo en urgencias y prevención de errores de medicación.",
    syllabus: [
      "Cálculo de dosis, goteos y bombas de infusión continua",
      "Manejo de fármacos vasoactivos y de carro de paro",
      "Interacciones medicamentosas frecuentes en hospitalización",
      "Protocolos de los 10 correctos y farmacovigilancia"
    ]
  }
];

let state = {
  activeCategory: "Todos",
  searchQuery: "",
  cart: JSON.parse(localStorage.getItem("salud_cart")) || [],
  user: JSON.parse(localStorage.getItem("salud_user")) || null,
  purchasedIds: JSON.parse(localStorage.getItem("salud_purchased")) || [],
  selectedCourseId: null
};

const saveState = () => {
  localStorage.setItem("salud_cart", JSON.stringify(state.cart));
  localStorage.setItem("salud_user", JSON.stringify(state.user));
  localStorage.setItem("salud_purchased", JSON.stringify(state.purchasedIds));
};

const formatCLP = (amount) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount);

// ================= SCROLL REVEAL =================
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
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ================= TOAST =================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const styles = {
    info: "bg-slate-800 text-white",
    success: "bg-emerald-600 text-white",
    warning: "bg-amber-500 text-white"
  };

  const toast = document.createElement("div");
  toast.className = `${styles[type]} px-4 py-3 rounded-2xl shadow-lg text-sm font-medium flex items-center gap-2 transition-all duration-300`;
  toast.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-info"}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "-translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ================= NAVBAR AUTH =================
function renderAuthSection() {
  const authSection = document.getElementById("authSection");

  if (!state.user) {
    authSection.innerHTML = `
      <button id="openLoginBtn" class="text-sm font-medium text-slate-600 hover:text-sky-600 px-3 py-2 transition">
        Ingresar
      </button>
      <button id="openRegisterBtn" class="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition">
        Registrarse
      </button>
    `;
    document.getElementById("openLoginBtn").addEventListener("click", () => openAuthModal("login"));
    document.getElementById("openRegisterBtn").addEventListener("click", () => openAuthModal("register"));
  } else {
    authSection.innerHTML = `
      <button id="openMyCoursesBtn" class="text-xs sm:text-sm font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-4 py-2 rounded-full transition flex items-center gap-1.5">
        <i class="fa-solid fa-book-medical"></i> Mi Aula (${state.purchasedIds.length})
      </button>
      <div class="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
        <span class="text-xs font-semibold text-slate-700">${state.user.name.split(" ")[0]}</span>
        <button id="logoutBtn" class="text-slate-400 hover:text-red-500 text-sm" title="Cerrar sesión">
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
        ? "bg-sky-600 text-white shadow-sm"
        : "bg-white text-slate-600 border border-slate-200 hover:border-sky-400 hover:text-sky-600";
      return `<button data-category="${cat}" class="px-5 py-2 rounded-full text-sm font-medium transition ${classes}">${cat}</button>`;
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
    grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400 text-sm">No se encontraron cursos con ese criterio.</div>`;
    return;
  }

  grid.innerHTML = filtered
    .map((course) => {
      const isPurchased = state.purchasedIds.includes(course.id);
      const inCart = state.cart.includes(course.id);

      let actionButton = `
        <button data-add="${course.id}" class="bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition">
          Agregar
        </button>`;

      if (isPurchased) {
        actionButton = `<span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full"><i class="fa-solid fa-check mr-1"></i> Inscrito</span>`;
      } else if (inCart) {
        actionButton = `<button data-open-cart="true" class="bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-full">En carrito</button>`;
      }

      return `
        <article class="group bg-white rounded-3xl border border-slate-200/70 overflow-hidden hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 flex flex-col">
          <div class="relative h-48 overflow-hidden bg-slate-100">
            <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <span class="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm text-slate-700 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
              ${course.modality}
            </span>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <span class="text-[11px] font-semibold text-sky-600 uppercase tracking-wider">${course.category}</span>
            <h3 class="font-display font-bold text-lg text-slate-800 mt-1.5 mb-2 leading-snug">${course.title}</h3>
            <p class="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">${course.description}</p>

            <div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <p class="text-[11px] text-slate-400">${course.duration}</p>
                <p class="font-display text-lg font-bold text-slate-800">${formatCLP(course.price)}</p>
              </div>
              <div class="flex items-center gap-2">
                <button data-detail="${course.id}" class="text-xs font-semibold text-slate-500 hover:text-sky-600 px-2 py-2 transition">
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

// Acceso rápido desde los círculos de especialidad
document.querySelectorAll("[data-quick-cat]").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.activeCategory = btn.dataset.quickCat;
    renderCategories();
    renderCourses();
    document.getElementById("cursos").scrollIntoView({ behavior: "smooth" });
  });
});

// ================= CARRITO =================
function addToCart(courseId) {
  if (state.purchasedIds.includes(courseId)) {
    showToast("Ya estás inscrito en este curso.", "info");
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
      <div class="text-center py-14 text-slate-400">
        <i class="fa-solid fa-bag-shopping text-4xl mb-3 opacity-25"></i>
        <p class="text-sm">Tu carrito está vacío.</p>
      </div>`;
    return;
  }

  container.innerHTML = cartCourses
    .map(
      (course) => `
      <div class="flex gap-3.5 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 items-center">
        <img src="${course.image}" alt="${course.title}" class="w-16 h-16 rounded-xl object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold text-sm text-slate-800 truncate">${course.title}</h4>
          <p class="text-xs text-slate-400">${course.modality}</p>
          <p class="text-sm font-bold text-sky-600 mt-1">${formatCLP(course.price)}</p>
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
    showToast("Crea una cuenta o inicia sesión para completar tu inscripción", "warning");
    return;
  }

  state.purchasedIds = [...new Set([...state.purchasedIds, ...state.cart])];
  state.cart = [];
  saveState();

  renderCart();
  renderCourses();
  renderAuthSection();
  closeCart();
  showToast("¡Inscripción exitosa! Accede ahora a tu aula virtual.", "success");
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
    .map((item) => `<li class="flex items-start gap-2.5"><i class="fa-solid fa-check text-sky-600 mt-1 text-xs"></i><span>${item}</span></li>`)
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
    ? "flex-1 py-4 text-sm font-semibold text-sky-600 border-b-2 border-sky-600 bg-sky-50/40"
    : "flex-1 py-4 text-sm font-semibold text-slate-400 hover:text-slate-600";

  document.getElementById("tabRegister").className = !isLogin
    ? "flex-1 py-4 text-sm font-semibold text-sky-600 border-b-2 border-sky-600 bg-sky-50/40"
    : "flex-1 py-4 text-sm font-semibold text-slate-400 hover:text-slate-600";
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
  showToast(`Bienvenido, ${state.user.name}`, "success");
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
  document.getElementById("myCoursesUserLabel").textContent = `Estudiante: ${state.user.name} (${state.user.email})`;

  const list = document.getElementById("myCoursesList");
  const myCourses = state.purchasedIds.map((id) => COURSES.find((c) => c.id === id)).filter(Boolean);

  if (myCourses.length === 0) {
    list.innerHTML = `<p class="text-center text-slate-400 py-8 text-sm">Aún no tienes cursos inscritos.</p>`;
  } else {
    list.innerHTML = myCourses
      .map(
        (course) => `
        <div class="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/70 items-center">
          <img src="${course.image}" class="w-full sm:w-24 h-24 rounded-xl object-cover" />
          <div class="flex-1 w-full">
            <span class="text-[11px] font-semibold uppercase text-emerald-600">Matrícula Activa</span>
            <h4 class="font-display font-bold text-slate-800">${course.title}</h4>
            <div class="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div class="bg-sky-600 h-full w-1/4 rounded-full"></div>
            </div>
            <p class="text-xs text-slate-400 mt-1">Avance: 25%</p>
          </div>
          <button onclick="alert('Aquí se abriría el módulo de clases grabadas, material PDF y evaluación final.')" class="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition">
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
  showToast("¡Consulta enviada! Te responderemos a la brevedad.", "success");
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

// ================= INIT =================
renderAuthSection();
renderCategories();
renderCourses();
renderCart();
initScrollReveal();