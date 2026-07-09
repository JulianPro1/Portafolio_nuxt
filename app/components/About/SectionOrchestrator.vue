<template>
  <section class="px-4 relative overflow-hidden">
    <!-- Fondo decorativo sutil -->
    <div class="pointer-events-none absolute inset-0 opacity-40 overflow-hidden">
      <div
        class="absolute -top-32 -left-24 w-72 h-72 bg-about-accent/20 blur-3xl rounded-full"
      ></div>
      <div
        class="absolute -bottom-40 right-0 w-80 h-80 bg-about-fuchsia/20 blur-3xl rounded-full"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto pb-24">
      <!-- Header del componente SectionTitle -->
      <AnimatedElement variant="title" delay="300ms" v-if="header">
        <SectionTitle
          domain="about"
          :badge="header.badge || 'Conóceme'"
          :title="header.title || 'Sobre'"
          :highlight="header.highlight || 'Mí'"
          :description="header.description"
        />
      </AnimatedElement>

      <!-- Contenedor del Diagrama Interactivo Git Flow Alternado -->
      <div class="max-w-5xl mx-auto py-12 flex flex-col gap-0 relative" v-if="steps.length">
        
        <div 
          v-for="step in steps"
          :key="step.index"
          :data-index="step.index"
          class="step-row grid grid-cols-1 md:grid-cols-[1fr_6rem_1fr] items-stretch relative min-h-[180px] transition-all duration-500"
          :class="[activeStep === step.index ? 'opacity-100 scale-[1.01]' : 'opacity-70 md:opacity-40 scale-[0.99]']"
        >
          <!-- Elemento Izquierdo (Columna 1 en Desktop, Columna 2 en Móvil para contenido, oculta para panel) -->
          <div 
            v-if="step.index % 2 === 0"
            class="step-card col-span-1 md:col-start-1 md:col-end-2 flex items-center md:justify-end pb-10 w-full opacity-0"
          >
            <div class="w-full">
              <AboutCard 
                :title="step.title"
                :button-text="step.buttonText"
                :button-to="step.buttonTo"
                :button-icon="step.buttonIcon"
              >
                <component :is="contentComponents[step.contentComponent]" v-if="step.contentComponent" :data="step.contentData" />
              </AboutCard>
            </div>
          </div>
          <div 
            v-else
            class="step-panel hidden md:flex md:col-start-1 md:col-end-2 items-center justify-end pb-10 w-full pr-8 opacity-0"
          >
            <component 
              :is="widgetComponents[step.widgetType]" 
              v-model="selectedAgentFile"
              :contributions="githubContributions"
              :is-active="activeStep === step.index"
            />
          </div>

          <!-- Diagrama Track (Columna 2 en Desktop, Columna 1 en Móvil) -->
          <DiagramTrack :step-index="step.index" :active-step="activeStep" :is-desktop="isDesktop" />

          <!-- Elemento Derecho (Columna 3 en Desktop, Columna 2 en Móvil para contenido, oculta para panel) -->
          <div 
            v-if="step.index % 2 === 0"
            class="step-panel hidden md:flex md:col-start-3 md:col-end-4 items-center pb-10 w-full pl-8 opacity-0"
          >
            <component 
              :is="widgetComponents[step.widgetType]" 
              v-model="selectedAgentFile"
              :contributions="githubContributions"
              :is-active="activeStep === step.index"
            />
          </div>
          <div 
            v-else
            class="step-card col-span-1 md:col-start-3 md:col-end-4 flex items-center md:justify-start pb-10 w-full opacity-0"
          >
            <div class="w-full">
              <AboutCard 
                :title="step.title"
                :button-text="step.buttonText"
                :button-to="step.buttonTo"
                :button-icon="step.buttonIcon"
              >
                <component :is="contentComponents[step.contentComponent]" v-if="step.contentComponent" :data="step.contentData" />
              </AboutCard>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import SectionTitle from '@/components/Common/SectionTitle.vue';
import AboutCard from '@/components/About/AboutCard.vue';
import AnimatedElement from '@/components/Common/AnimatedElement.vue';
import JsonConfigCard from '@/components/About/JsonConfigCard.vue';
import GithubContributionsCard from '@/components/About/GithubContributionsCard.vue';
import AgentEditorCard from '@/components/About/AgentEditorCard.vue';
import TerminalGraduationCard from '@/components/About/TerminalGraduationCard.vue';
import QualityDashboardCard from '@/components/About/QualityDashboardCard.vue';
import DiagramTrack from '@/components/About/DiagramTrack.vue';
import { useAboutOrchestratorAnimations } from '@/composables/about/useAboutOrchestratorAnimations';

// Componentes de contenido de los pasos
import AboutWhoAmIContent from '@/components/About/Content/AboutWhoAmIContent.vue';
import AboutExperienceContent from '@/components/About/Content/AboutExperienceContent.vue';
import AboutSkillsContent from '@/components/About/Content/AboutSkillsContent.vue';
import AboutEducationContent from '@/components/About/Content/AboutEducationContent.vue';
import AboutPhilosophyContent from '@/components/About/Content/AboutPhilosophyContent.vue';

const contentComponents = {
  AboutWhoAmIContent,
  AboutExperienceContent,
  AboutSkillsContent,
  AboutEducationContent,
  AboutPhilosophyContent
};

// Registro de los componentes dinámicos de los widgets
const widgetComponents = {
  JsonConfigCard,
  GithubContributionsCard,
  AgentEditorCard,
  TerminalGraduationCard,
  QualityDashboardCard
};

const activeStep = ref(0);
const isDesktop = ref(false);

// Estado para el visor de la arquitectura de agentes
const selectedAgentFile = ref('AGENT.md');

// Consultas asíncronas de Nuxt Content v3
const { data: aboutIndex } = await useAsyncData('about-index', () => 
  queryCollection('about').where('path', '=', '/about').first()
);

const header = computed(() => aboutIndex.value || null);
const steps = computed(() => aboutIndex.value?.steps || []);

// Estado para el gráfico de contribuciones de GitHub
const githubContributions = ref([]);

const checkBreakpoint = () => {
  if (typeof window !== 'undefined') {
    isDesktop.value = window.innerWidth >= 768; // md breakpoint
  }
};

const { init: initAnimations, cleanup: cleanupAnimations } = useAboutOrchestratorAnimations(activeStep, isDesktop);

// Inicializar animaciones GSAP de forma segura cuando los datos estén listos en el DOM
watch(steps, async (newSteps) => {
  if (newSteps && newSteps.length > 0 && import.meta.client) {
    cleanupAnimations();
    await nextTick();
    initAnimations('.max-w-5xl');
  }
});

onMounted(async () => {
  checkBreakpoint();
  window.addEventListener('resize', checkBreakpoint);

  if (steps.value && steps.value.length > 0 && import.meta.client) {
    cleanupAnimations();
    await nextTick();
    initAnimations('.max-w-5xl');
  }

  // Generar celdas de contribuciones de GitHub con colores armónicos
  const levels = [
    'bg-white/10',
    'bg-about-fuchsia/20',
    'bg-about-fuchsia/45',
    'bg-about-fuchsia/70',
    'bg-about-pink/80',
    'bg-about-pink'
  ];
  const contributions = [];
  // 7 filas x 16 columnas = 112 celdas
  for (let i = 0; i < 112; i++) {
    let level = 0;
    const rand = Math.random();
    if (rand > 0.85) level = 5;
    else if (rand > 0.7) level = 4;
    else if (rand > 0.5) level = 3;
    else if (rand > 0.3) level = 2;
    else if (rand > 0.15) level = 1;
    
    contributions.push({
      id: i,
      color: levels[level],
      tooltip: `${Math.floor(Math.random() * 8)} commits`
    });
  }
  githubContributions.value = contributions;
});

onUnmounted(() => {
  window.removeEventListener('resize', checkBreakpoint);
});
</script>

<style scoped>
/* Transiciones suaves para los elementos de Git Flow */
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 700ms;
}

.glow-contact {
  text-shadow: 0 0 8px var(--contact-accent);
}

.link-ticktaps {
  transition: all 0.3s ease-in-out;
}

.link-ticktaps:hover,
.link-ticktaps:focus,
.group:hover .link-ticktaps,
.group:focus-within .link-ticktaps {
  text-shadow: 0 0 8px var(--contact-accent);
}

/* Estilos para scrollbars finas de los widgets */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: var(--about-fuchsia);
}
</style>
