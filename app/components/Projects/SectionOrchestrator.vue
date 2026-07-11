<template>
  <section class="py-16 px-4 relative">
    <div class="relative max-w-7xl mx-auto mt-6">
      <!-- Header de la página -->
      <AnimatedElement variant="title" delay="300ms">
        <SectionTitle
          domain="projects"
          badge="Portafolio completo"
          title="Mis"
          highlight="Proyectos"
          description="Explora mi trayectoria a través de proyectos reales."
          align="center"
        />
      </AnimatedElement>

      <!-- Toolbar / Tabs de navegación Sticky -->
      <div class="sticky top-20 z-40 w-full mb-16 px-2">
        <AnimatedElement variant="tab" delay="350ms">
          <div
            ref="tabsContainer"
            class="relative w-full flex backdrop-blur-xl rounded-2xl border border-[var(--category-accent)] bg-neutral-950/60 shadow-[0_8px_32px_hsla(0,0%,0%,0.3)] transition-all duration-500"
            :style="getCategoryStyles(activeTab)"
          >
            <!-- Fondo flotante activo animado con GSAP -->
            <div
              ref="activeBgIndicator"
              class="absolute bg-gradient-to-r from-[var(--category-dark)] via-[var(--category-accent)]/80 to-[var(--category-light)] rounded-xl pointer-events-none z-0"
              style="box-shadow: 0 2px 8px var(--category-accent); height: calc(100% - 10px); top: 5px; left: 0; width: 0;"
            ></div>

            <!-- Indicador activo inferior flotante animado con GSAP -->
            <div
              ref="activeLineIndicator"
              class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--category-light)] to-transparent rounded-full pointer-events-none z-10"
              style="width: 0;"
            ></div>

            <div
              v-for="tab in tabs"
              :key="tab.id"
              :ref="(el) => { if (el) tabElements[tab.id] = el as any }"
              @click="scrollToSection(tab.id)"
              class="relative flex-1 flex items-center justify-center gap-3 py-5 text-sm font-semibold transition-all duration-300 group cursor-pointer z-10 select-none"
              :class="
                activeTab === tab.id
                  ? 'text-global-text font-bold'
                  : 'text-global-text-muted hover:text-global-text'
              "
              :style="getCategoryStyles(tab.id)"
            >
              <!-- Efecto hover para tabs inactivos -->
              <div
                v-if="activeTab !== tab.id"
                class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
              ></div>

              <!-- Contenido del tab -->
              <div class="relative z-20 flex items-center gap-2">
                <Icon
                  :name="tab.icon"
                  class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  :class="
                    activeTab === tab.id
                      ? 'text-global-text drop-shadow-[0_0_8px_hsla(0,0%,100%,0.5)]'
                      : 'text-global-text-dim group-hover:text-[var(--category-accent)]'
                  "
                />
                <span class="tracking-wide hidden md:inline">{{ tab.label }}</span>
                
                <!-- Selector de Proyectos rápido tipo icono (solo desktop) -->
                <span class="hidden md:inline ml-1">
                  <ProjectsDropdown
                    :projects="getProjectsForCategory(tab.id)"
                    iconOnly
                    @select="scrollToProject"
                    @click.stop
                  />
                </span>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>

      <!-- Contenido de secciones consecutivas -->
      <div class="relative z-10 space-y-16">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :id="tab.id"
          :data-category-section="tab.id"
          class="project-category-section py-8 scroll-mt-32"
          :style="getCategoryStyles(tab.id)"
        >
          <!-- Encabezado de la Categoría -->
          <div class="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div class="flex items-center gap-3">
              <div class="p-2.5 rounded-xl bg-[var(--category-accent)]/20 border border-[var(--category-accent)] flex items-center justify-center">
                <Icon :name="tab.icon" class="w-6 h-6 text-[var(--category-accent)]" />
              </div>
              <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                {{ tab.label }}
              </h2>
            </div>
            <div class="flex items-center gap-4">
              <ProjectsDropdown
                :projects="getProjectsForCategory(tab.id)"
                placeholder="Ir a un proyecto..."
                @select="scrollToProject"
              />
              <div class="hidden md:block h-[1px] w-24 bg-gradient-to-r from-[var(--category-accent)]/40 to-transparent"></div>
            </div>
          </div>

          <!-- Listado de Proyectos Bento Grid en Scroll -->
          <ProjectsListScroll :category="tab.id" />
        </div>
      </div>
    </div>

    <!-- Burbuja flotante de proyectos para mobile -->
    <ProjectsFloatingBubble :active-tab="activeTab" @select="(pid) => scrollToProject(pid)" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SectionTitle from "~/components/Common/SectionTitle.vue";
import ProjectsListScroll from "~/components/Projects/ProjectsListScroll.vue";
import ProjectsDropdown from "~/components/Projects/ProjectsDropdown.vue";
import ProjectsFloatingBubble from "~/components/Projects/ProjectsFloatingBubble.vue";
import AnimatedElement from "~/components/Common/AnimatedElement.vue";
import { useProjectsOrchestratorAnimations } from "~/composables/projects/useProjectsOrchestratorAnimations";

const { data: projectsData } = await useAsyncData('projects', () => queryCollection('projects').all())

// ─── Refs del DOM para las animaciones GSAP ───────────────────────────────────
const tabsContainer = ref<HTMLElement | null>(null);
const activeBgIndicator = ref<HTMLElement | null>(null);
const activeLineIndicator = ref<HTMLElement | null>(null);
const tabElements = ref<Record<string, HTMLElement>>({});

// ─── Estado reactivo ──────────────────────────────────────────────────────────
const activeTab = ref("destacados");
const isScrollingTo = ref(false);

// ─── Definición de tabs ───────────────────────────────────────────────────────
const tabs = [
  { id: "destacados", label: "Destacados", icon: "mdi:star" },
  { id: "en-produccion", label: "En producción", icon: "mdi:rocket-launch" },
  { id: "en-desarrollo", label: "En desarrollo", icon: "mdi:code" },
  { id: "personales", label: "Personales", icon: "mdi:account" },
];

// ─── Helper de estilos de categoría (sin GSAP, puramente CSS vars) ────────────
const getCategoryStyles = (categoryId: string) => {
  const map: Record<string, string> = {
    "destacados": "destacados",
    "en-produccion": "produccion",
    "en-desarrollo": "desarrollo",
    "personales": "personales",
  };
  const suffix = map[categoryId] || "produccion";
  return {
    "--category-accent": `var(--projects-accent-${suffix})`,
    "--category-light": `var(--projects-accent-light-${suffix})`,
    "--category-dark": `var(--projects-accent-dark-${suffix})`,
  };
};

// ─── Helper de proyectos por categoría ───────────────────────────────────────
const getProjectsForCategory = (categoryId: string) => {
  if (!projectsData.value) return [];
  return projectsData.value.filter(p => p.categories?.includes(categoryId));
};

// ─── Composable GSAP: toda la lógica de animación centralizada ────────────────
const { init, handleResize, scrollToSection, scrollToProject } =
  useProjectsOrchestratorAnimations({
    tabs,
    activeTab,
    isScrollingTo,
    tabsContainer,
    activeBgIndicator,
    activeLineIndicator,
    tabElements,
  });

onMounted(() => {
  if (import.meta.client) {
    init();
    window.addEventListener("resize", handleResize);
  }
});
</script>

<style scoped>
.project-category-section {
  will-change: transform, opacity;
}
</style>
