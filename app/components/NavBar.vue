<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-global-bg backdrop-blur-md bg-opacity-90 border-b"
    :style="{
      borderColor: backgroundStore.navbarBorderColor,
      '--navbar-accent-color': backgroundStore.navbarAccentColorRgb
    }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="group">
            <span
              class="text-2xl font-bold text-white  transition-all duration-300"
            >
              Julian.dev
            </span>
            <span
              class="block h-0.5 w-0 transition-all duration-300 group-hover:w-full mt-1"
              :style="{
                background: `linear-gradient(to right, ${backgroundStore.navbarAccentColor}, ${backgroundStore.navbarHighlightColor})`
              }"
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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useBackgroundStore } from "~/store";
import SideBar from "~/components/SideBar.vue";

const route = useRoute();
const backgroundStore = useBackgroundStore();
const mobileMenuOpen = ref(false);

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
/* Estilos locales */

/* Efecto de texto moderno con subrayado animado */
@keyframes menu-typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes menu-blink {
  50% {
    opacity: 0;
  }
}

.menu-text-modern {
  position: relative;
  color: hsl(0, 0%, 100%);
  font-weight: bold;
  overflow: hidden;
}

.menu-text-modern::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #7B2CBF, #FCA311, #7B2CBF);
  background-size: 200% 100%;
  animation: gradient-slide 3s ease-in-out infinite;
}

@keyframes gradient-slide {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Efecto de pulso sutil para el menú hamburguesa */
@keyframes menu-pulse-subtle {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(var(--navbar-accent-color), 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(var(--navbar-accent-color), 0);
  }
}

.menu-hamburguer-pulse {
  animation: menu-pulse-subtle 3s ease-in-out infinite;
}

.menu-hamburguer-pulse:hover {
  animation: none;
}

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

/* Animación de fondo sutil */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
  }
}

nav {
  animation: pulse 4s ease-in-out infinite;
}
</style>
