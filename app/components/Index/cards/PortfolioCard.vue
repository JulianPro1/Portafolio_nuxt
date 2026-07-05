<template>
  <div
    class="relative w-full h-full rounded-2xl border shadow-2xl overflow-hidden group"
    :class="[
      {
        'opacity-50 scale-90': !isActive,
        'opacity-100 scale-100 backdrop-blur-xl': isActive,
      },
      borderColor
    ]"
    style="will-change: transform;"
  >

      <div class="relative z-10 h-full">
        <slot>
          <div class="p-6 h-full flex flex-col items-center justify-center text-center">
            <!-- Icono -->
            <div
              class="w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300"
              :class="gradientClasses"
            >
              <Icon
                :name="icon"
                class="w-8 h-8 text-global-text"
              />
            </div>

            <!-- Título -->
            <h3 class="text-xl font-bold text-global-text mb-2">
              {{ title }}
            </h3>

            <!-- Descripción -->
            <p class="text-sm text-global-text-muted">
              {{ description }}
            </p>

            <!-- Indicador de navegación -->
            <div
              class="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              :class="textColor"
            >
              <span>Explorar</span>
              <Icon
                name="mdi:arrow-right"
                class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </slot>
      </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  description: string;
  icon: string;
  isActive?: boolean;
  borderColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  borderColor: 'border-about-accent-dark/80',
  gradientFrom: 'from-about-accent',
  gradientTo: 'to-about-highlight',
  textColor: 'text-about-accent',
});

const gradientClasses = computed(() => `${props.gradientFrom} ${props.gradientTo}`);
</script>
