<template>
  <!-- Sidebar desplegable -->
  <div
    ref="containerRef"
    class="fixed inset-0 z-[9999] opacity-0 pointer-events-none"
    @click="close"
  >
    <!-- Overlay oscuro (sin desenfoque) -->
    <div
      ref="overlayRef"
      class="absolute inset-0 bg-black opacity-0"
      style="z-index: 1"
    ></div>

    <!-- Sidebar Panel -->
    <div
      ref="panelRef"
      class="absolute right-0 top-0 bottom-0 w-80 bg-global-bg shadow-2xl overflow-y-auto"
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
          <span class="text-xl font-bold text-global-text select-none">
            Julian.dev
          </span>
        </div>
        <button
          @click="close"
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
          class="group flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:translate-x-1 menu-link"
          :class="{
            'border-l-4': isActiveRoute(item.href),
          }"
          :style="isActiveRoute(item.href) ? {
            background: `linear-gradient(to right, ${backgroundStore.navbarAccentColor}20, ${backgroundStore.navbarHighlightColor}20)`,
            borderColor: backgroundStore.navbarAccentColor
          } : {
            '--hover-bg': backgroundStore.navbarBorderColor
          }"
          @click="close"
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
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useBackgroundStore } from "~/store";
import gsap from "gsap";

const isOpen = defineModel<boolean>("isOpen", { default: false });

const route = useRoute();
const backgroundStore = useBackgroundStore();

const containerRef = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);

const navigationItems = [
  { name: "Inicio", href: "/" },
  { name: "Sobre Mí", href: "/about" },
  { name: "Proyectos", href: "/projects" },
  { name: "Habilidades", href: "/skills" },
  { name: "Contacto", href: "/contact" },
];

const isActiveRoute = (href: string) => {
  return route.path === href;
};

const close = () => {
  isOpen.value = false;
  window.dispatchEvent(new CustomEvent("drawer-close"));
};

let ctx: gsap.Context | null = null;

const animateOpen = () => {
  if (ctx) ctx.revert();
  ctx = gsap.context(() => {
    // 1. Asegurar visibilidad del contenedor principal
    gsap.set(containerRef.value, { opacity: 1, pointerEvents: "auto" });
    
    // 2. Animar overlay de fondo (opacidad)
    gsap.fromTo(overlayRef.value, 
      { opacity: 0 }, 
      { opacity: 0.6, duration: 0.4, ease: "power2.out" }
    );

    // 3. Animar panel lateral (desplazamiento)
    gsap.fromTo(panelRef.value, 
      { xPercent: 100 }, 
      { xPercent: 0, duration: 0.4, ease: "power3.out" }
    );
  });
};

const animateClose = () => {
  if (ctx) ctx.revert();
  ctx = gsap.context(() => {
    // 1. Desplazar panel lateral hacia afuera (más rápido y responsivo)
    gsap.to(panelRef.value, { 
      xPercent: 100, 
      duration: 0.28, 
      ease: "power3.in" 
    });

    // 2. Desvanecer overlay de fondo
    gsap.to(overlayRef.value, { 
      opacity: 0, 
      duration: 0.28, 
      ease: "power2.in" 
    });

    // 3. Desvanecer contenedor principal y desactivar eventos de puntero al finalizar
    gsap.to(containerRef.value, {
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(containerRef.value, { pointerEvents: "none" });
      }
    });
  });
};

watch(isOpen, (newVal) => {
  nextTick(() => {
    if (newVal) {
      animateOpen();
    } else {
      animateClose();
    }
  });
});

onMounted(() => {
  // Inicializar estado del panel oculto por GSAP para evitar conflictos de clases CSS
  gsap.set(panelRef.value, { xPercent: 100 });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
@keyframes gradient-slide {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.group:hover {
  background-color: var(--hover-bg, rgba(var(--navbar-accent-color), 0.3));
}
</style>
