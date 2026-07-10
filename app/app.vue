<template>
  <div class="app-root">
    <PreLoader v-if="!preloaderDone" @done="preloaderDone = true" />
    <Transition name="page-reveal">
      <div v-if="preloaderDone" class="page-reveal-wrapper">
        <NuxtLayout />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const preloaderDone = ref(false)
</script>

<style>
/* Fondo oscuro siempre presente para evitar destello blanco */
.app-root {
  background: hsl(0, 0%, 4%);
  min-height: 100vh;
}

/* Reveal del contenido después del preloader */
.page-reveal-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-reveal-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-reveal-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.page-reveal-wrapper {
  min-height: 100vh;
  background: hsl(0, 0%, 4%);
}
</style>
