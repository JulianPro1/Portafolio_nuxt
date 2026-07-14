<template>
  <div class="relative overflow-hidden rounded-3xl border border-[var(--category-accent)] bg-neutral-900/40 backdrop-blur-md px-6 py-20 text-center flex flex-col items-center justify-center gap-6 group transition-all duration-500 hover:border-[var(--category-accent)]/40 hover:bg-neutral-900/50">
    <!-- Glowing background aura -->
    <div class="absolute -inset-px rounded-3xl bg-gradient-to-b from-[var(--category-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
    
    <!-- Icon Container with floating and pulsing effects -->
    <div class="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--category-accent)]/10 border border-[var(--category-accent)] group-hover:scale-110 group-hover:border-[var(--category-accent)]/60 transition-all duration-500">
      <Icon 
        :name="iconName" 
        class="w-10 h-10 text-[var(--category-accent)] opacity-85 group-hover:opacity-100 transition-opacity duration-300"
      />
      <!-- Extra micro-ring decoration -->
      <div class="absolute inset-0 rounded-2xl border-2 border-dashed border-[var(--category-accent)] animate-[spin_20s_linear_infinite] group-hover:border-[var(--category-accent)]"></div>
    </div>

    <!-- Text content -->
    <div class="max-w-md space-y-2 z-10">
      <h3 class="text-xl md:text-2xl font-bold text-neutral-100 tracking-wide">
        {{ title }}
      </h3>
      <p class="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
        {{ description }}
      </p>
    </div>

    <!-- Subtle interactive/animated accent line -->
    <div class="w-12 h-1 rounded-full bg-[var(--category-accent)]/40 group-hover:w-20 transition-all duration-500"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  category: string;
}>(), {
  category: 'default'
});

const config = computed(() => {
  const map: Record<string, { title: string; description: string; icon: string }> = {
    'destacados': {
      title: 'No hay proyectos destacados aún',
      description: 'Estamos seleccionando los mejores proyectos para mostrarlos aquí. ¡Vuelve pronto!',
      icon: 'mdi:star-outline'
    },
    'en-produccion': {
      title: 'Sin proyectos en producción',
      description: 'Actualmente no hay proyectos lanzados en esta sección. ¡Pronto subiremos nuevas aplicaciones web!',
      icon: 'mdi:rocket-launch-outline'
    },
    'en-desarrollo': {
      title: 'Desarrollos en marcha',
      description: 'Los proyectos actuales están en fase privada o desarrollo activo. ¡Muy pronto verás novedades aquí!',
      icon: 'mdi:code-tags'
    },
    'personales': {
      title: 'Espacio personal en construcción',
      description: 'Experimentos, plantillas y herramientas de código abierto que se publicarán próximamente.',
      icon: 'mdi:account-outline'
    }
  };
  
  return map[props.category] || {
    title: 'No se encontraron proyectos',
    description: 'No hay elementos para mostrar en esta categoría en este momento.',
    icon: 'mdi:folder-open-outline'
  };
});

const title = computed(() => config.value.title);
const description = computed(() => config.value.description);
const iconName = computed(() => config.value.icon);
</script>
