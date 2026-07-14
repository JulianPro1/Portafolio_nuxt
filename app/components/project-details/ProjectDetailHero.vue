<template>
  <section class="mb-16">
    <!-- Badges de categoría/estado y botón Volver -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="flex flex-wrap items-center gap-3">
        <!-- Badge de categoría principal -->
        <span
          class="px-4 py-1.5 rounded-full text-xs font-semibold text-white tracking-wide bg-white/10 border border-white/20 text-white/90"
        >
          {{ category }}
        </span>

        <!-- Badges dinámicos de las 4 categorías con iconos y colores específicos -->
        <span
          v-for="catId in resolvedCategories"
          :key="catId"
          class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white tracking-wide uppercase shadow-sm border border-white/10"
          :style="getCategoryBadgeStyle(catId)"
        >
          <Icon :name="getCategoryIcon(catId)" class="w-3.5 h-3.5" />
          <span>{{ getCategoryText(catId) }}</span>
        </span>
      </div>

      <!-- Botón Volver a proyectos -->
      <NuxtLink
        to="/projects"
        @click.prevent="$emit('back')"
        class="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-projects-accent-light border border-projects-accent hover:border-projects-accent bg-transparent hover:bg-projects-accent hover:text-white shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <Icon name="mdi:arrow-left" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Volver a proyectos</span>
      </NuxtLink>
    </div>

    <div class="text-left md:max-w-4xl">
      <!-- Título principal -->
      <h1
        class="text-4xl md:text-6xl font-extrabold text-global-text mb-6 tracking-tight leading-tight bg-gradient-to-r from-global-text via-global-text to-global-text-muted bg-clip-text text-transparent"
      >
        {{ title }}
      </h1>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

defineEmits(["back"]);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "",
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const resolvedCategories = computed(() => {
  if (props.categories && props.categories.length > 0) {
    return props.categories.filter(c =>
      ["destacados", "en-produccion", "en-desarrollo", "personales"].includes(c)
    );
  }
  // Mapeo de respaldo por si solo viene el status
  const statusMap = {
    production: "en-produccion",
    development: "en-desarrollo",
    personal: "personales",
    destacado: "destacados",
  };
  if (props.status && statusMap[props.status]) {
    return [statusMap[props.status]];
  }
  return [];
});

const getCategoryIcon = (catId) => {
  const icons = {
    "destacados": "mdi:star",
    "en-produccion": "mdi:rocket-launch",
    "en-desarrollo": "mdi:code",
    "personales": "mdi:account",
  };
  return icons[catId] || "mdi:code";
};

const getCategoryText = (catId) => {
  const texts = {
    "destacados": "Destacado",
    "en-produccion": "En producción",
    "en-desarrollo": "En desarrollo",
    "personales": "Personal",
  };
  return texts[catId] || "En desarrollo";
};

const getCategoryBadgeStyle = (catId) => {
  const map = {
    "destacados": "destacados",
    "en-produccion": "produccion",
    "en-desarrollo": "desarrollo",
    "personales": "personales",
  };
  const suffix = map[catId] || "produccion";
  return {
    background: `linear-gradient(135deg, var(--projects-accent-light-${suffix}) 0%, var(--projects-accent-${suffix}) 100%)`,
    boxShadow: `0 4px 12px color-mix(in srgb, var(--projects-accent-${suffix}) 40%, transparent)`
  };
};
</script>

