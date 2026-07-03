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
    <div
      class="fixed inset-0 z-[9999] transition-all duration-300 ease-in-out"
      :class="
        mobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      "
      @click="closeMobileMenu"
    >
      <!-- Overlay oscuro (sin desenfoque) -->
      <div
        v-if="mobileMenuOpen"
        class="absolute inset-0 bg-black bg-opacity-60"
        style="z-index: 1"
      ></div>

      <!-- Sidebar Panel -->
      <div
        class="absolute right-0 top-0 bottom-0 w-80 bg-global-bg shadow-2xl transform transition-all duration-300 ease-in-out overflow-y-auto"
        :class="mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
        @click.stop
        style="
          box-shadow: -10px 0 40px hsla(0, 0%, 0%, 0.8);
          height: 100vh;
          z-index: 2;
        "
      >
        <!-- Header del Sidebar -->
        <div
          class="flex items-center justify-between p-6 border-b"
          :style="{ borderColor: backgroundStore.navbarBorderColor }"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center"
              :style="{
                background: `linear-gradient(to right, ${backgroundStore.navbarAccentColor}, ${backgroundStore.navbarHighlightColor})`
              }"
            >
              <span class="text-global-text font-bold text-lg">J</span>
            </div>
            <span class="text-xl font-bold text-global-text menu-text-modern"
              >Menú</span
            >
          </div>
          <button
            @click="closeMobileMenu"
            class="text-global-text-muted hover:text-global-text p-2 rounded-lg hover:bg-global-base transition-all duration-300"
            aria-label="Close menu"
          >
            <Icon name="mdi:close" class="h-6 w-6" />
          </button>
        </div>

        <!-- Navigation Links -->
        <div class="p-6 space-y-2">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            class="group flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:translate-x-1"
            :class="{
              'border-l-4': isActiveRoute(item.href),
            }"
            :style="isActiveRoute(item.href) ? {
              background: `linear-gradient(to right, ${backgroundStore.navbarAccentColor}20, ${backgroundStore.navbarHighlightColor}20)`,
              borderColor: backgroundStore.navbarAccentColor
            } : {
              '--hover-bg': backgroundStore.navbarBorderColor
            }"
            @click="closeMobileMenu"
          >
            <div class="flex items-center space-x-4">
              <!-- Iconos para cada sección -->
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                :style="{ backgroundColor: backgroundStore.navbarBorderColor }"
              >
                <!-- Icono Inicio -->
                <Icon
                  v-if="item.name === 'Inicio'"
                  name="mdi:home"
                  class="w-4 h-4 text-global-text-muted group-hover:text-global-text transition-colors duration-300"
                />
                <!-- Icono Sobre Mí -->
                <Icon
                  v-else-if="item.name === 'Sobre Mí'"
                  name="mdi:account"
                  class="w-4 h-4 text-global-text-muted group-hover:text-global-text transition-colors duration-300"
                />
                <!-- Icono Proyectos -->
                <Icon
                  v-else-if="item.name === 'Proyectos'"
                  name="mdi:folder-multiple"
                  class="w-4 h-4 text-global-text-muted group-hover:text-global-text transition-colors duration-300"
                />
                <!-- Icono Habilidades -->
                <Icon
                  v-else-if="item.name === 'Habilidades'"
                  name="mdi:tools"
                  class="w-4 h-4 text-global-text-muted group-hover:text-global-text transition-colors duration-300"
                />
                <!-- Icono Contacto -->
                <Icon
                  v-else-if="item.name === 'Contacto'"
                  name="mdi:email"
                  class="w-4 h-4 text-global-text-muted group-hover:text-global-text transition-colors duration-300"
                />
              </div>
              <span
                class="text-lg font-medium transition-colors duration-300"
                :class="
                  isActiveRoute(item.href)
                    ? 'text-global-text'
                    : 'text-global-text-muted group-hover:text-global-text'
                "
              >
                {{ item.name }}
              </span>
            </div>

            <!-- Flecha indicadora -->
            <Icon
              name="mdi:chevron-right"
              class="w-5 h-5 text-global-text-dim transition-all duration-300"
              :style="isActiveRoute(item.href) ? { color: backgroundStore.navbarAccentColor } : {}"
              :class="{ 'group-hover:text-global-text': !isActiveRoute(item.href) }"
            />
          </NuxtLink>
        </div>

        <!-- Footer del Sidebar -->
        <div
          class="absolute bottom-0 left-0 right-0 p-6 border-t"
          :style="{ borderColor: backgroundStore.navbarBorderColor }"
        >
          <div class="flex items-center justify-center space-x-4">
            <!-- Social Icons -->
            <a
              href="#"
              class="text-global-text-muted transition-colors duration-300"
              :style="{ color: backgroundStore.navbarAccentColor }"
            >
              <Icon name="mdi:github" class="w-6 h-6" />
            </a>
            <a
              href="#"
              class="text-global-text-muted transition-colors duration-300"
              :style="{ color: backgroundStore.navbarAccentColor }"
            >
              <Icon name="mdi:linkedin" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useBackgroundStore } from "~/store";

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

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  window.dispatchEvent(new CustomEvent("drawer-close"));
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
