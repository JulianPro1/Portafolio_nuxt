<template>
  <div class="relative">
    <!-- Contenedor del carrusel -->
    <div class="overflow-hidden rounded-2xl">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <!-- Slides de proyectos estilo bento -->
        <div
          v-for="(project, projectIndex) in validProjects"
          :key="projectIndex"
          class="w-full flex-shrink-0 px-4"
        >
          <div class="grid grid-cols-4 grid-rows-4 gap-4 h-[600px]">
            <!-- Card principal grande (Hero) -->
            <div
              v-if="project.hero"
              class="col-span-2 row-span-3 group relative bg-gradient-to-br from-projects-accent-dark/40 to-[#121212] rounded-2xl overflow-hidden border border-gray-800 hover:border-projects-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-projects-accent/20"
            >
              <!-- Etiqueta del proyecto -->
              <div class="absolute top-4 left-4 z-10">
                <span
                  class="px-3 py-1 bg-gradient-to-r from-projects-accent to-projects-accent-light text-white text-xs font-semibold rounded-full"
                >
                  {{ project.id }}
                </span>
              </div>

              <!-- Imagen del proyecto -->
              <div class="relative h-60 overflow-hidden">
                <img
                  :src="project.hero.image"
                  :alt="project.hero.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                 <div
                  class="absolute inset-0 bg-gradient-to-t from-projects-accent-dark/95 to-transparent"
                ></div>
              </div>

              <!-- Contenido de la card -->
              <div class="p-4">
                <h3
                  class="text-xl font-bold text-white mb-2 group-hover:text-projects-accent-light transition-colors duration-300"
                >
                  {{ project.hero.title }}
                </h3>
                <p class="text-gray-400 text-sm mb-3 line-clamp-2">
                  {{ project.hero.description }}
                </p>

                <!-- Tecnologías (usando metadata como tecnologías) -->
                <div class="flex flex-wrap gap-1 mb-3">
                  <span
                    v-for="meta in project.metadata.slice(0, 3)"
                    :key="meta.id"
                    class="px-2 py-1 bg-projects-accent/10 text-projects-accent-light text-xs rounded-md border border-projects-accent/30"
                  >
                    {{ meta.value }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Card de métricas -->
            <div
              v-if="project.metrics"
              class="col-span-2 row-span-1 group relative bg-gradient-to-br from-projects-accent-dark/40 to-[#121212] rounded-2xl overflow-hidden border border-gray-800 hover:border-projects-accent-light/50 transition-all duration-300 hover:shadow-xl hover:shadow-projects-accent-light/20"
            >
              <!-- Etiqueta del proyecto -->
              <div class="absolute top-2 left-3 z-10">
                <span
                  class="px-2 py-1 bg-gradient-to-r from-projects-accent-light to-projects-accent text-white text-xs font-semibold rounded-full"
                >
                  {{ project.metrics.title }}
                </span>
              </div>

              <!-- Contenido de métricas -->
              <div class="mt-10 pt-4">
                <div class="flex justify-around items-center h-full">
                  <div
                    v-for="stat in project.metrics.stats"
                    :key="stat.label"
                    class="text-center flex-1"
                  >
                    <div
                      class="text-xl font-bold mb-1"
                      :style="{ color: stat.color }"
                    >
                      {{ stat.value }}
                    </div>
                    <div class="text-gray-400 text-xs leading-tight">
                      {{ stat.label }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Efecto hover -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-projects-accent-light/10 to-projects-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              ></div>
            </div>

            <!-- Cards de metadata (dinámicas) -->
            <template
              v-for="(meta, index) in project.metadata.slice(0, 4)"
              :key="meta.id"
            >
              <div
                :class="[
                  'group relative bg-gradient-to-br from-projects-accent-dark/40 to-[#121212] rounded-2xl overflow-hidden border border-gray-800 hover:border-projects-accent-light/50 transition-all duration-300 hover:shadow-xl hover:shadow-projects-accent-light/20',
                  index === 0
                    ? 'col-span-1 row-span-1'
                    : 'col-span-1 row-span-1',
                ]"
              >
                <!-- Etiqueta del proyecto -->
                <div class="absolute top-3 left-3 z-10">
                  <span
                    class="px-2 py-1 bg-gradient-to-r from-projects-accent-light to-projects-accent text-white text-xs font-semibold rounded-full"
                  >
                    {{ meta.label }}
                  </span>
                </div>

                <!-- Contenido -->
                <div
                  class="p-4 flex flex-col items-center justify-center h-full"
                >
                  <Icon
                    :name="`mdi:${meta.icon}`"
                    class="w-8 h-8 text-projects-accent-light mb-2"
                  />
                  <h4
                    class="text-lg font-bold text-white mb-1 group-hover:text-projects-accent-light transition-colors duration-300 text-center"
                  >
                    {{ meta.value }}
                  </h4>
                  <p class="text-gray-400 text-xs text-center">
                    {{ meta.label }}
                  </p>
                </div>

                <!-- Efecto hover -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-projects-accent-light/10 to-projects-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                ></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Navegación del carrusel -->
    <button
      @click="prevSlide"
      class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-projects-accent-dark/80 border border-gray-800 rounded-full flex items-center justify-center text-white hover:bg-projects-accent/20 hover:border-projects-accent/50 transition-all duration-300 z-10"
    >
      <Icon name="mdi:chevron-left" class="w-6 h-6" />
    </button>
    <button
      @click="nextSlide"
      class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-projects-accent-dark/80 border border-gray-800 rounded-full flex items-center justify-center text-white hover:bg-projects-accent/20 hover:border-projects-accent/50 transition-all duration-300 z-10"
    >
      <Icon name="mdi:chevron-right" class="w-6 h-6" />
    </button>

    <!-- Indicadores -->
    <div class="flex justify-center space-x-2">
      <button
        v-for="(_, index) in validProjects"
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="
          index === currentSlide
            ? 'bg-projects-accent w-8'
            : 'bg-gray-600 hover:bg-gray-500'
        "
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  projects: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const currentSlide = ref(0);
const autoplayInterval = ref(null);

// Validar que los proyectos tengan la estructura correcta
const validProjects = computed(() => {
  return props.projects.filter(
    (project) =>
      project &&
      project.hero &&
      project.metrics &&
      project.metadata &&
      Array.isArray(project.metadata) &&
      project.metadata.length >= 1
  );
});

const nextSlide = () => {
  if (validProjects.value.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % validProjects.value.length;
  }
};

const prevSlide = () => {
  if (validProjects.value.length > 0) {
    currentSlide.value =
      currentSlide.value === 0
        ? validProjects.value.length - 1
        : currentSlide.value - 1;
  }
};

const goToSlide = (index) => {
  if (index >= 0 && index < validProjects.value.length) {
    currentSlide.value = index;
  }
};

const startAutoplay = () => {
  autoplayInterval.value = setInterval(nextSlide, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
