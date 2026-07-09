<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 border-b navbar-scrollable"
    :style="navbarDynamicStyle"
  >
    <!-- Línea de progreso de scroll -->
    <div
      class="absolute bottom-0 left-0 h-[2px] w-full pointer-events-none"
      style="transform-origin: left; transition: opacity 0.3s ease, box-shadow 0.3s ease; will-change: transform;"
      :style="{
        transform: `scaleX(${scrollProgress / 100})`,
        background: `linear-gradient(to right, ${backgroundStore.navbarAccentColor}, ${backgroundStore.navbarHighlightColor}, ${scrollSecondaryColor})`,
        opacity: scrollProgress > 2 ? 1 : 0,
        boxShadow: `0 0 8px ${backgroundStore.navbarAccentColor}80`
      }"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="group">
            <span
              class="text-2xl font-bold text-white transition-all duration-300"
              :style="{ textShadow: scrolled ? `0 0 20px ${backgroundStore.navbarAccentColor}60` : 'none' }"
            >
              Julian.dev
            </span>
            <!-- Línea de degradado con colores análogos -->
            <span
              class="block h-0.5 w-0 transition-all duration-500 group-hover:w-full mt-1"
              style="background: linear-gradient(to right, var(--nav-grad-start), var(--nav-grad-mid), var(--nav-grad-end));"
            ></span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden">
          <div class="ml-10 flex items-baseline space-x-8">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.href"
              class="nav-link relative text-global-text-muted hover:text-global-text px-3 py-2 text-sm font-medium transition-all duration-300"
              :class="{ 'text-global-text': isActiveRoute(item.href) }"
            >
              {{ item.name }}
              <span
                class="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                :class="
                  isActiveRoute(item.href) ? 'w-full' : 'w-0 hover:w-full'
                "
                :style="{
                  background: `linear-gradient(to right, ${backgroundStore.navbarAccentColor}, ${backgroundStore.navbarHighlightColor})`
                }"
              ></span>
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div>
          <button
            @click="toggleMobileMenu"
            class="text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-300 relative z-[80] menu-hamburguer-pulse"
            aria-label="Toggle mobile menu"
          >
            <Icon
              :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
              class="h-6 w-6 transition-all duration-300"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Sidebar desplegable -->
    <SideBar v-model:isOpen="mobileMenuOpen" />
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useBackgroundStore } from "~/store";
import SideBar from "~/components/SideBar.vue";

const route = useRoute();
const backgroundStore = useBackgroundStore();
const mobileMenuOpen = ref(false);

// ── Scroll state ────────────────────────────────────────────
const scrollY = ref(0);
const scrolled = computed(() => scrollY.value > 20);

/** Porcentaje de scroll sobre la página (0-100) */
const scrollProgress = computed(() => {
  if (!import.meta.client) return 0;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 0;
  return Math.min(100, (scrollY.value / docHeight) * 100);
});

/** Color análogo secundario para el gradiente de la línea de progreso */
const scrollSecondaryColor = computed(() => {
  // Desplaza la línea de color 30° más en el espectro análogo
  const accent = backgroundStore.navbarHighlightColor;
  // Extraer hue del highlight y añadir 30 grados análogos
  const m = /hsl\(\s*(\d+)/i.exec(accent);
  if (m) {
    const h = ((parseInt(m[1]) - 30) + 360) % 360;
    return `hsl(${h}, 80%, 55%)`;
  }
  return accent;
});

/** Estilo dinámico de la navbar basado en el scroll */
const navbarDynamicStyle = computed(() => {
  const progress = Math.min(1, scrollY.value / 80); // satura en 80px
  const bgAlpha = 0.7 + progress * 0.26; // 0.70 → 0.96
  const blurPx = 8 + progress * 8; // 8px → 16px blur
  const borderAlpha = 0.3 + progress * 0.7; // borde más visible al scroll

  // Color del borde interpolado dinámicamente
  const borderColor = backgroundStore.navbarBorderColor;

  // Gradientes análogos para el logo (colores cálidos/fríos según ruta)
  const gradStart = backgroundStore.navbarAccentColor;
  const gradMid = backgroundStore.navbarHighlightColor;
  const gradEnd = scrollSecondaryColor.value;

  return {
    backgroundColor: `hsla(0, 0%, 4%, ${bgAlpha})`,
    backdropFilter: `blur(${blurPx}px)`,
    WebkitBackdropFilter: `blur(${blurPx}px)`,
    borderColor: borderColor,
    borderBottomColor: scrolled.value
      ? borderColor
      : `${borderColor.replace('hsl(', 'hsla(').replace(')', `, ${borderAlpha})`)}`,
    boxShadow: scrolled.value
      ? `0 4px 32px hsla(0,0%,0%,0.5), 0 1px 0 ${backgroundStore.navbarBorderColor}40`
      : 'none',
    transition: 'background-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
    '--navbar-accent-color': backgroundStore.navbarAccentColorRgb,
    '--nav-grad-start': gradStart,
    '--nav-grad-mid': gradMid,
    '--nav-grad-end': gradEnd,
  };
});

let ticking = false;
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      scrollY.value = window.scrollY;
      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    scrollY.value = window.scrollY;
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll);
  }
});
// ────────────────────────────────────────────────────────────

const navigationItems = [
  { name: "Inicio", href: "/" },
  { name: "Sobre Mí", href: "/about" },
  { name: "Proyectos", href: "/projects" },
  { name: "Habilidades", href: "/skills" },
  { name: "Contacto", href: "/contact" },
];

const isActiveRoute = (href) => {
  return route.path === href;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;

  // Emitir eventos para comunicarse con el layout
  if (mobileMenuOpen.value) {
    window.dispatchEvent(new CustomEvent("drawer-open"));
  } else {
    window.dispatchEvent(new CustomEvent("drawer-close"));
  }
};
</script>

<style scoped>
/* Hover reactivo para links de navegación */
.group:hover {
  background-color: var(--hover-bg, rgba(var(--navbar-accent-color), 0.3));
}

/* Estilos adicionales para efectos de brillo neón */
.nav-link:hover {
  text-shadow: 0 0 10px rgba(var(--navbar-accent-color), 0.5);
}

.nav-link[class*="text-white"] {
  text-shadow: 0 0 15px rgba(var(--navbar-accent-color), 0.7);
}

/* Hover sutil en el botón hamburguesa */
.menu-hamburguer-pulse:hover {
  box-shadow: 0 0 0 6px rgba(var(--navbar-accent-color), 0.15);
  transition: box-shadow 0.3s ease;
}

/* Navbar con blur y degradado suave al hacer scroll */
.navbar-scrollable {
  will-change: background-color, box-shadow;
}
</style>
