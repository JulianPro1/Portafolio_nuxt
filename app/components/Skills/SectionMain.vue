<template>
  <section class="py-20 px-4 relative overflow-hidden">
    <!-- Fondo decorativo -->
    <div class="pointer-events-none absolute inset-0 opacity-40">
      <div
        class="absolute -top-32 -right-24 w-72 h-72 bg-skills-accent/25 blur-3xl rounded-full"
      ></div>
      <div
        class="absolute -bottom-40 left-0 w-80 h-80 bg-skills-highlight blur-3xl rounded-full"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto">
      <!-- Header -->
      <AnimatedElement variant="title" delay="300ms">
        <SectionTitle
          domain="skills"
          badge="Fundamentos técnicos"
          title="Mis"
          highlight="Habilidades"
          description="Los fundamentos teóricos y técnicos que definen mi enfoque como desarrollador frontend moderno."
        />
      </AnimatedElement>

      <!-- Cards organizadas por categorías -->
      <AnimatedElement variant="card" delay="400ms">
        <div class="space-y-12">
        <!-- Arquitectura y Patrones -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-skills-accent/20 to-skills-highlight/20 border border-skills-accent/50"
            >
              <Icon name="mdi:architecture" class="w-6 h-6 text-skills-accent" />
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-white">
                Arquitectura y Patrones
              </h2>
              <p class="text-gray-400 text-sm">
                Fundamentos estructurales del desarrollo frontend
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              class="group relative bg-gradient-to-br from-skills-base via-skills-base to-skills-base rounded-2xl border border-skills-base/80 p-6 hover:border-skills-accent/50 transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-skills-accent/10 to-skills-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              ></div>
              <div class="relative z-10">
                <h3
                  class="text-xl font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <Icon name="mdi:view-quilt" class="w-5 h-5 text-skills-accent" />
                  Arquitectura MVVM
                </h3>
                <p class="text-gray-300 text-sm mb-4">
                  Separación clara entre Modelo, Vista y ViewModel para mantener
                  el código organizado y testeable.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >Vue.js</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >Reactividad</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >State Management</span
                  >
                </div>
              </div>
            </div>

            <div
              class="group relative bg-gradient-to-br from-skills-base via-skills-base to-skills-base rounded-2xl border border-skills-base/80 p-6 hover:border-skills-accent/50 transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-skills-accent/10 to-skills-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              ></div>
              <div class="relative z-10">
                <h3
                  class="text-xl font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <Icon
                    name="mdi:cube-outline"
                    class="w-5 h-5 text-skills-accent"
                  />
                  Componentización
                </h3>
                <p class="text-gray-300 text-sm mb-4">
                  Diseño de componentes atómicos, reutilizables y composables
                  following Atomic Design principles.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >Single Responsibility</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >Composición</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >Reusabilidad</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estructura y Organización -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-skills-highlight/20 to-skills-accent/20 border border-skills-highlight/50"
            >
              <Icon name="mdi:folder-tree" class="w-6 h-6 text-skills-highlight" />
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-white">
                Estructura y Organización
              </h2>
              <p class="text-gray-400 text-sm">
                Cómo organizo el código y los proyectos
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              class="group relative bg-gradient-to-br from-skills-base via-[#121212] to-skills-base rounded-2xl border border-skills-base/80 p-6 hover:border-skills-highlight/50 transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-skills-highlight/10 to-skills-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              ></div>
              <div class="relative z-10">
                <h3
                  class="text-xl font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <Icon
                    name="mdi:folder-multiple"
                    class="w-5 h-5 text-skills-highlight"
                  />
                  Estructura de Directorios
                </h3>
                <p class="text-gray-300 text-sm mb-4">
                  Organización feature-first con separación clara entre
                  componentes, composables y utilidades.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-highlight/40 text-[#F9FAFB] bg-skills-highlight/20"
                    >Feature-first</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-highlight/40 text-[#F9FAFB] bg-skills-highlight/20"
                    >Domain-driven</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-highlight/40 text-[#F9FAFB] bg-skills-highlight/20"
                    >Scalability</span
                  >
                </div>
              </div>
            </div>

            <div
              class="group relative bg-gradient-to-br from-skills-base via-[#121212] to-skills-base rounded-2xl border border-skills-base/80 p-6 hover:border-skills-highlight/50 transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-skills-highlight/10 to-skills-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              ></div>
              <div class="relative z-10">
                <h3
                  class="text-xl font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <Icon
                    name="mdi:database-sync"
                    class="w-5 h-5 text-skills-highlight"
                  />
                  Gestión de Estado
                </h3>
                <p class="text-gray-300 text-sm mb-4">
                  Patrones de estado centralizado y distribuido con Pinia,
                  principios de inmutabilidad y reactividad.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-highlight/40 text-[#F9FAFB] bg-skills-highlight/20"
                    >Pinia</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-highlight/40 text-[#F9FAFB] bg-skills-highlight/20"
                    >Inmutabilidad</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-highlight/40 text-[#F9FAFB] bg-skills-highlight/20"
                    >Reactive State</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance y Calidad -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-skills-accent/20 to-skills-highlight/20 border border-skills-accent/50"
            >
              <Icon name="mdi:speedometer" class="w-6 h-6 text-skills-accent" />
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-white">
                Performance y Calidad
              </h2>
              <p class="text-gray-400 text-sm">
                Optimización y buenas prácticas
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="group relative bg-gradient-to-br from-skills-base via-skills-base to-skills-base rounded-2xl border border-skills-base/80 p-6 hover:border-skills-accent/50 transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-skills-accent/10 to-skills-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              ></div>
              <div class="relative z-10">
                <h3
                  class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <Icon name="mdi:rocket" class="w-5 h-5 text-skills-accent" />
                  Optimización
                </h3>
                <p class="text-gray-300 text-sm mb-4">
                  Lazy loading, code splitting, memoización y análisis de Web
                  Vitals.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >Performance</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >Web Vitals</span
                  >
                </div>
              </div>
            </div>

            <div
              class="group relative bg-gradient-to-br from-skills-base via-[#121212] to-skills-base rounded-2xl border border-skills-base/80 p-6 hover:border-skills-highlight/50 transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-skills-highlight/10 to-skills-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              ></div>
              <div class="relative z-10">
                <h3
                  class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <Icon name="mdi:test-tube" class="w-5 h-5 text-skills-highlight" />
                  Testing
                </h3>
                <p class="text-gray-300 text-sm mb-4">
                  Pirámide de testing: unit, integration y E2E con Vitest y
                  Cypress.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-highlight/40 text-[#F9FAFB] bg-skills-highlight/20"
                    >Unit Tests</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-highlight/40 text-[#F9FAFB] bg-skills-highlight/20"
                    >E2E</span
                  >
                </div>
              </div>
            </div>

            <div
              class="group relative bg-gradient-to-br from-skills-base via-skills-base to-skills-base rounded-2xl border border-skills-base/80 p-6 hover:border-skills-accent/50 transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-skills-accent/10 to-skills-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              ></div>
              <div class="relative z-10">
                <h3
                  class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <Icon
                    name="mdi:accessibility"
                    class="w-5 h-5 text-skills-accent"
                  />
                  Accesibilidad
                </h3>
                <p class="text-gray-300 text-sm mb-4">
                  Diseño inclusivo desde el inicio, WCAG 2.1 y semantic HTML.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >WCAG 2.1</span
                  >
                  <span
                    class="px-2 py-1 rounded-full text-xs border border-skills-accent/40 text-[#F9FAFB] bg-skills-accent/20"
                    >A11y</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Principios Fundamentales -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-skills-highlight/20 to-skills-accent/20 border border-skills-highlight/50"
            >
              <Icon name="mdi:lightbulb" class="w-6 h-6 text-skills-highlight" />
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-white">
                Principios Fundamentales
              </h2>
              <p class="text-gray-400 text-sm">
                Los pilares que guían mi desarrollo
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-4">
              <div
                class="relative bg-gradient-to-br from-skills-base via-[#121212] to-skills-base rounded-2xl border border-skills-base/80 p-6"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-skills-highlight/10 to-skills-accent/10 opacity-50 rounded-2xl pointer-events-none"
                ></div>
                <div class="relative z-10">
                  <h3
                    class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
                  >
                    <Icon
                      name="mdi:code-braces"
                      class="w-5 h-5 text-skills-highlight"
                    />
                    Principios de Arquitectura
                  </h3>
                  <div class="space-y-3">
                    <div class="flex gap-3 items-start">
                      <div
                        class="w-5 h-5 flex items-center justify-center rounded-full bg-skills-accent/20 border border-skills-accent/50 mt-0.5 flex-shrink-0"
                      >
                        <Icon
                          name="mdi:check"
                          class="w-2.5 h-2.5 text-skills-accent"
                        />
                      </div>
                      <div>
                        <h4 class="text-white text-sm font-medium mb-1">
                          Separación de responsabilidades
                        </h4>
                        <p class="text-gray-400 text-xs">
                          Cada componente con una única responsabilidad bien
                          definida.
                        </p>
                      </div>
                    </div>
                    <div class="flex gap-3 items-start">
                      <div
                        class="w-5 h-5 flex items-center justify-center rounded-full bg-skills-accent/20 border border-skills-accent/50 mt-0.5 flex-shrink-0"
                      >
                        <Icon
                          name="mdi:check"
                          class="w-2.5 h-2.5 text-skills-accent"
                        />
                      </div>
                      <div>
                        <h4 class="text-white text-sm font-medium mb-1">
                          Composición sobre herencia
                        </h4>
                        <p class="text-gray-400 text-xs">
                          Prefiero componer comportamientos en lugar de
                          jerarquías complejas.
                        </p>
                      </div>
                    </div>
                    <div class="flex gap-3 items-start">
                      <div
                        class="w-5 h-5 flex items-center justify-center rounded-full bg-skills-accent/20 border border-skills-accent/50 mt-0.5 flex-shrink-0"
                      >
                        <Icon
                          name="mdi:check"
                          class="w-2.5 h-2.5 text-skills-accent"
                        />
                      </div>
                      <div>
                        <h4 class="text-white text-sm font-medium mb-1">
                          Inversión de dependencias
                        </h4>
                        <p class="text-gray-400 text-xs">
                          Dependencias fluyen hacia adentro para mayor
                          flexibilidad.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div
                class="relative bg-gradient-to-br from-skills-base via-[#121212] to-skills-base rounded-2xl border border-skills-base/80 p-6"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-skills-accent/10 to-skills-highlight/10 opacity-50 rounded-2xl pointer-events-none"
                ></div>
                <div class="relative z-10">
                  <h3
                    class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
                  >
                    <Icon name="mdi:star" class="w-5 h-5 text-skills-accent" />
                    Principios de Calidad
                  </h3>
                  <div class="space-y-3">
                    <div class="flex gap-3 items-start">
                      <div
                        class="w-5 h-5 flex items-center justify-center rounded-full bg-skills-highlight/20 border border-skills-highlight/50 mt-0.5 flex-shrink-0"
                      >
                        <Icon
                          name="mdi:check"
                          class="w-2.5 h-2.5 text-skills-highlight"
                        />
                      </div>
                      <div>
                        <h4 class="text-white text-sm font-medium mb-1">
                          Performance-first
                        </h4>
                        <p class="text-gray-400 text-xs">
                          Cada decisión considera el impacto en el rendimiento.
                        </p>
                      </div>
                    </div>
                    <div class="flex gap-3 items-start">
                      <div
                        class="w-5 h-5 flex items-center justify-center rounded-full bg-skills-highlight/20 border border-skills-highlight/50 mt-0.5 flex-shrink-0"
                      >
                        <Icon
                          name="mdi:check"
                          class="w-2.5 h-2.5 text-skills-highlight"
                        />
                      </div>
                      <div>
                        <h4 class="text-white text-sm font-medium mb-1">
                          Accesibilidad integrada
                        </h4>
                        <p class="text-gray-400 text-xs">
                          Diseño inclusivo desde el inicio, no como añadido.
                        </p>
                      </div>
                    </div>
                    <div class="flex gap-3 items-start">
                      <div
                        class="w-5 h-5 flex items-center justify-center rounded-full bg-skills-highlight/20 border border-skills-highlight/50 mt-0.5 flex-shrink-0"
                      >
                        <Icon
                          name="mdi:check"
                          class="w-2.5 h-2.5 text-skills-highlight"
                        />
                      </div>
                      <div>
                        <h4 class="text-white text-sm font-medium mb-1">
                          Código auto-documentado
                        </h4>
                        <p class="text-gray-400 text-xs">
                          Nombres claros y patrones reconocibles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup>
import AnimatedElement from '@/components/Common/AnimatedElement.vue';
import SectionTitle from '@/components/Common/SectionTitle.vue';

const skills = [
  {
    id: "architecture",
    title: "Arquitectura MVVM",
    category: "Patrones de diseño",
    icon: "mdi:architecture",
    description:
      "Comprensión profunda del patrón Model-View-ViewModel y su aplicación en frameworks modernos como Vue.js para separar la lógica de negocio de la presentación.",
    tags: ["MVVM", "Vue.js", "Reactividad", "State Management"],
  },
  {
    id: "componentization",
    title: "Componentización",
    category: "Estructura de código",
    icon: "mdi:view-module",
    description:
      "Diseño de sistemas de componentes reutilizables, atómicos y escalables que siguen principios de single responsibility y composición.",
    tags: ["Componentes", "Reusabilidad", "Composición", "Atomic Design"],
  },
  {
    id: "directory",
    title: "Estructura de Directorios",
    category: "Organización de proyecto",
    icon: "mdi:folder-tree",
    description:
      "Organización lógica de archivos y carpetas following feature-first y domain-driven approaches para mantener código mantenible y escalable.",
    tags: ["Feature-first", "DDD", "Scalability", "Maintainability"],
  },
  {
    id: "state",
    title: "Gestión de Estado",
    category: "Estado de aplicación",
    icon: "mdi:database-sync",
    description:
      "Implementación de patrones de gestión de estado centralizado y distribuido usando Pinia, Vuex y principios de inmutabilidad.",
    tags: ["Pinia", "Vuex", "Inmutabilidad", "Reactive State"],
  },
  {
    id: "performance",
    title: "Optimización de Rendimiento",
    category: "Performance",
    icon: "mdi:speedometer",
    description:
      "Técnicas de optimización包括 lazy loading, code splitting, memoización y análisis de performance para garantizar experiencias fluidas.",
    tags: ["Lazy Loading", "Code Splitting", "Memoization", "Web Vitals"],
  },
  {
    id: "testing",
    title: "Testing Estratégico",
    category: "Calidad de código",
    icon: "mdi:test-tube",
    description:
      "Implementación de pirámide de testing con unit tests, integration tests y E2E testing usando Vitest, Cypress y Jest.",
    tags: ["Unit Tests", "Integration", "E2E", "TDD"],
  },
];

const architecturePrinciples = [
  {
    title: "Separación de responsabilidades",
    description:
      "Cada componente y módulo tiene una única responsabilidad bien definida, facilitando el mantenimiento y testing.",
  },
  {
    title: "Composición sobre herencia",
    description:
      "Prefiero componer comportamientos y funcionalidades en lugar de crear jerarquías de herencia complejas.",
  },
  {
    title: "Inversión de dependencias",
    description:
      "Las dependencias fluyen hacia adentro, permitiendo mayor flexibilidad y facilitando el testing unitario.",
  },
];

const qualityPrinciples = [
  {
    title: "Performance-first",
    description:
      "Cada decisión de arquitectura considera el impacto en el rendimiento y la experiencia del usuario.",
  },
  {
    title: "Accesibilidad integrada",
    description:
      "Diseño con accesibilidad desde el inicio, no como un añadido posterior al desarrollo.",
  },
  {
    title: "Código auto-documentado",
    description:
      "Nombres claros, estructuras intuitivas y patrones reconocibles que minimizan la necesidad de documentación externa.",
  },
];
</script>
