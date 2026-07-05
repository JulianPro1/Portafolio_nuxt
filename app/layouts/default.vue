<template>
  <div
    class="min-h-screen transition-colors duration-300 relative"
    :style="{ backgroundColor: backgroundStore.backgroundColor }"
    :class="backgroundStore.backgroundClass"
  >

    <NavBar />
    <div class="page-content relative z-10" :class="{ 'page-blurred': isDrawerOpen }">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useBackgroundStore } from "~/store";
import { useRoute } from "vue-router";
import { useLenis } from "~/composables/useLenis";
import { useNuxtApp } from "#app";

const backgroundStore = useBackgroundStore();
const route = useRoute();
const isDrawerOpen = ref(false);
const lenis = useLenis();
const { $ScrollTrigger } = useNuxtApp() as any;

const handleDrawerOpen = () => {
  isDrawerOpen.value = true;
  lenis?.stop();
};

const handleDrawerClose = () => {
  isDrawerOpen.value = false;
  lenis?.start();
};

onMounted(() => {
  // Escuchar eventos del NavBar
  window.addEventListener("drawer-open", handleDrawerOpen);
  window.addEventListener("drawer-close", handleDrawerClose);
  // Aplicar tema para la ruta actual
  backgroundStore.applyThemeForRoute(route.path);
});

onUnmounted(() => {
  window.removeEventListener("drawer-open", handleDrawerOpen);
  window.removeEventListener("drawer-close", handleDrawerClose);
});

// Watcher para aplicar tema cuando cambia la ruta
watch(
  () => route.path,
  (newPath) => {
    backgroundStore.applyThemeForRoute(newPath);
    // Reset scroll a la parte superior de inmediato al cambiar de página
    lenis?.scrollTo(0, { immediate: true });
    
    // Esperar a que el DOM se renderice antes de recalcular ScrollTrigger
    nextTick(() => {
      setTimeout(() => {
        $ScrollTrigger?.refresh();
      }, 100);
    });
  }
);
</script>

<style scoped>
.page-content {
  transition: opacity 0.3s ease-in-out;
}

.page-blurred {
  opacity: 0.35;
  pointer-events: none;
}
</style>
