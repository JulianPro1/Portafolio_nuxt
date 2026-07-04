<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Arquitectura -->
    <div
      class="group relative  rounded-2xl border border-skills-base p-6 transition-all duration-300 hover:border-skills-accent hover:shadow-[0_10px_35px_-10px_rgba(14,165,233,0.15)]"
    >
      <div class="relative z-10">
        <h3
          class="text-xl font-semibold text-white mb-6 flex items-center gap-3"
        >
          <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-skills-accent/10 text-skills-accent border border-skills-accent group-hover:scale-110 transition-transform duration-300">
            <Icon
              name="mdi:code-braces"
              class="w-5 h-5"
            />
          </div>
          Principios de Arquitectura
        </h3>
        
        <div class="space-y-4">
          <div
            v-for="(principle, idx) in architecturePrinciples"
            :key="idx"
            class="flex gap-4 items-start p-3 rounded-lg hover:bg-white/[0.02] transition-colors duration-200"
          >
            <div
              class="w-6 h-6 flex items-center justify-center rounded-full bg-skills-accent/10 border border-skills-accent mt-0.5 flex-shrink-0 text-skills-accent"
            >
              <Icon
                name="mdi:check"
                class="w-3.5 h-3.5"
              />
            </div>
            <div>
              <h4 class="text-white text-sm font-semibold mb-1 group-hover:text-skills-accent-light transition-colors duration-300">
                {{ principle.title }}
              </h4>
              <p class="text-gray-400 text-xs leading-relaxed">
                {{ principle.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Calidad -->
    <div
      class="group relative rounded-2xl border border-skills-base p-6 transition-all duration-300 hover:border-skills-accent hover:shadow-[0_10px_35px_-10px_rgba(20,184,166,0.15)]"
    >
      <div class="relative z-10">
        <h3
          class="text-xl font-semibold text-white mb-6 flex items-center gap-3"
        >
          <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-skills-accent/10 text-skills-accent border border-skills-accent group-hover:scale-110 transition-transform duration-300">
            <Icon name="mdi:star" class="w-5 h-5" />
          </div>
          Principios de Calidad
        </h3>
        
        <div class="space-y-4">
          <div
            v-for="(principle, idx) in qualityPrinciples"
            :key="idx"
            class="flex gap-4 items-start p-3 rounded-lg hover:bg-white/[0.02] transition-colors duration-200"
          >
            <div
              class="w-6 h-6 flex items-center justify-center rounded-full bg-skills-accent/10 border border-skills-accent mt-0.5 flex-shrink-0 text-skills-accent"
            >
              <Icon
                name="mdi:check"
                class="w-3.5 h-3.5"
              />
            </div>
            <div>
              <h4 class="text-white text-sm font-semibold mb-1 group-hover:text-skills-accent-light transition-colors duration-300">
                {{ principle.title }}
              </h4>
              <p class="text-gray-400 text-xs leading-relaxed">
                {{ principle.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const architecturePrinciples = [
  {
    title: "Separación de responsabilidades",
    description: "Cada componente y módulo tiene una única responsabilidad bien definida, facilitando el mantenimiento y testing.",
  },
  {
    title: "Composición sobre herencia",
    description: "Prefiero componer comportamientos y funcionalidades en lugar de crear jerarquías de herencia complejas.",
  },
  {
    title: "Inversión de dependencias",
    description: "Las dependencias fluyen hacia adentro, permitiendo mayor flexibilidad y facilitando el testing unitario.",
  },
]

const qualityPrinciples = [
  {
    title: "Performance-first",
    description: "Cada decisión de arquitectura considera el impacto en el rendimiento y la experiencia del usuario.",
  },
  {
    title: "Accesibilidad integrada",
    description: "Diseño con accesibilidad desde el inicio, no como un añadido posterior al desarrollo.",
  },
  {
    title: "Código auto-documentado",
    description: "Nombres claros, estructuras intuitivas y patrones reconocibles que minimizan la necesidad de documentación externa.",
  },
]
</script>
