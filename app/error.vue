<template>
  <div
    class="min-h-screen bg-global-bg flex items-center justify-center relative overflow-hidden"
  >
    <!-- Fondo decorativo -->
    <div class="pointer-events-none absolute inset-0 opacity-40">
      <div
        class="absolute -top-32 -right-24 w-96 h-96 bg-about-accent/25 blur-3xl rounded-full"
      ></div>
      <div
        class="absolute -bottom-40 -left-24 w-80 h-80 bg-about-highlight/20 blur-3xl rounded-full"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-about-accent/15 blur-2xl rounded-full"
      ></div>
    </div>

    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <!-- Mensaje principal -->
      <div class="mb-8 mt-6 space-y-4">
        <h2 class="text-3xl md:text-4xl font-bold text-global-text mb-2">
          {{ getErrorTitle() }}
        </h2>
        <p
          class="text-global-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {{ getErrorMessage() }}
        </p>
      </div>

      <!-- Ilustración decorativa -->
      <div class="mb-10 flex justify-center">
        <div class="relative">
          <div
            class="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-global-base via-global-base to-global-bg border border-about-accent/80 flex items-center justify-center shadow-[0_20px_40px_hsla(0,0%,0%,0.3)]"
          >
            <span
              class="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-about-accent to-about-highlight"
            >
              404
            </span>
          </div>
          <div
            class="absolute -top-2 -right-2 w-8 h-8 bg-about-highlight rounded-full flex items-center justify-center"
          >
            <Icon name="mdi:help" class="w-5 h-5 text-global-text" />
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="handleError"
          class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-about-accent to-about-highlight text-global-text font-semibold rounded-full hover:shadow-[0_0_30px_hsla(270,67%,45%,0.5)] transition-all duration-300 transform hover:scale-105"
        >
          <Icon name="mdi:home" class="w-5 h-5" />
          <span>Volver al inicio</span>
        </button>

        <button
          @click="goBack"
          class="inline-flex items-center gap-3 px-8 py-4 bg-global-base/80 text-global-text font-semibold rounded-full border border-global-base/60 hover:bg-white/10 hover:border-about-accent/50 transition-all duration-300"
        >
          <Icon name="mdi:arrow-left" class="w-5 h-5" />
          <span>Página anterior</span>
        </button>
      </div>

      <!-- Sugerencias -->
      <div class="mt-10 pt-8 border-t border-global-base/50">
        <p class="text-global-text-dim text-sm mb-4">
          ¿Estabas buscando alguna de estas páginas?
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <NuxtLink
            to="/about"
            class="px-4 py-2 text-sm text-global-text-muted hover:text-global-text hover:bg-about-accent/20 rounded-full border border-global-text-dim/50 hover:border-about-accent/50 transition-all duration-300"
          >
            Sobre mí
          </NuxtLink>
          <NuxtLink
            to="/projects"
            class="px-4 py-2 text-sm text-global-text-muted hover:text-global-text hover:bg-about-accent/20 rounded-full border border-global-text-dim/50 hover:border-about-accent/50 transition-all duration-300"
          >
            Proyectos
          </NuxtLink>
          <NuxtLink
            to="/skills"
            class="px-4 py-2 text-sm text-global-text-muted hover:text-global-text hover:bg-about-accent/20 rounded-full border border-global-text-dim/50 hover:border-about-accent/50 transition-all duration-300"
          >
            Habilidades
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="px-4 py-2 text-sm text-global-text-muted hover:text-global-text hover:bg-about-accent/20 rounded-full border border-global-text-dim/50 hover:border-about-accent/50 transition-all duration-300"
          >
            Contacto
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Elementos decorativos flotantes -->
    <div
      class="absolute top-20 left-10 w-2 h-2 bg-about-accent rounded-full animate-pulse"
    ></div>
    <div
      class="absolute top-40 right-20 w-3 h-3 bg-about-highlight rounded-full animate-pulse delay-75"
    ></div>
    <div
      class="absolute bottom-32 left-20 w-2 h-2 bg-about-accent rounded-full animate-pulse delay-150"
    ></div>
    <div
      class="absolute bottom-20 right-10 w-4 h-4 bg-about-highlight rounded-full animate-pulse"
    ></div>
  </div>
</template>

<script setup>
// Props para el error de Nuxt
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

// Funciones para manejar diferentes tipos de error
const getErrorTitle = () => {
  switch (props.error.statusCode) {
    case 404:
      return "Página no encontrada";
    case 500:
      return "Error del servidor";
    case 403:
      return "Acceso denegado";
    default:
      return "Ha ocurrido un error";
  }
};

const getErrorMessage = () => {
  switch (props.error.statusCode) {
    case 404:
      return "Ups! Parece que te has perdido en el código. Esta página no existe o ha sido movida a otra ubicación.";
    case 500:
      return "Ha ocurrido un error interno en el servidor. Estamos trabajando para solucionarlo lo antes posible.";
    case 403:
      return "No tienes permisos para acceder a esta página. Por favor, inicia sesión o contacta al administrador.";
    default:
      return "Ha ocurrido un error inesperado. Por favor, intenta nuevamente o contacta al soporte técnico.";
  }
};

// Meta tags para SEO dinámicos
useHead({
  title: `${props.error.statusCode} - ${getErrorTitle()} | Julian Alejos`,
  meta: [
    {
      name: "description",
      content: getErrorMessage(),
    },
  ],
});

// Función para volver a la página anterior
const goBack = () => {
  if (typeof window !== "undefined") {
    window.history.back();
  }
};

// Función para limpiar el error y recargar
const handleError = () => {
  clearError();
  navigateTo("/");
};
</script>

<style scoped>
.delay-75 {
  animation-delay: 75ms;
}

.delay-150 {
  animation-delay: 150ms;
}
</style>
