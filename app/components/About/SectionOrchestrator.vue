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
      <AnimatedElement variant="title" delay="300ms">
        <SectionTitle
          domain="about"
          badge="Conoceme"
          title="Sobre"
          highlight="Mí"
          description="Explora mi historia, habilidades y trayectoria como desarrollador."
        />
      </AnimatedElement>

      <!-- Contenedor del Diagrama Interactivo Git Flow Alternado -->
      <div class="max-w-5xl mx-auto py-12 flex flex-col gap-0 relative">
        
        <!-- Fila 0: ¿Quién soy? (Par -> Izquierda en Desktop) -->
        <div 
          data-index="0"
          class="step-row grid grid-cols-1 md:grid-cols-[1fr_6rem_1fr] items-stretch relative min-h-[180px] transition-all duration-500"
          :class="[activeStep === 0 ? 'opacity-100 scale-[1.01]' : 'opacity-70 md:opacity-40 scale-[0.99]']"
        >
          <!-- Tarjeta de Contenido (Columna 1 en Desktop, Columna 2 en Móvil) -->
          <div class="step-card col-span-1 md:col-start-1 md:col-end-2 flex items-center md:justify-end pb-10 w-full">
            <div class="w-full">
              <AboutCard title="¿Quién soy?">
                <AboutWhoAmI />
              </AboutCard>
            </div>
          </div>

          <!-- Diagrama Track (Columna 2 en Desktop, Columna 1 en Móvil) -->
          <DiagramTrack :step-index="0" :active-step="activeStep" :is-desktop="isDesktop" />

          <!-- Panel de Configuración JSON (Columna 3 en Desktop, oculta en Móvil) -->
          <div class="step-panel hidden md:flex md:col-start-3 md:col-end-4 items-center pb-10 w-full pl-8">
            <JsonConfigCard />
          </div>

        </div>

        <!-- Fila 1: Experiencia Laboral (Impar -> Derecha en Desktop) -->
        <div 
          data-index="1"
          class="step-row grid grid-cols-1 md:grid-cols-[1fr_6rem_1fr] items-stretch relative min-h-[180px] transition-all duration-500"
          :class="[activeStep === 1 ? 'opacity-100 scale-[1.01]' : 'opacity-70 md:opacity-40 scale-[0.99]']"
        >
          <!-- Gráfico de Contribuciones de GitHub (Columna 1 en Desktop, oculta en Móvil) -->
          <div class="step-panel hidden md:flex md:col-start-1 md:col-end-2 items-center justify-end pb-10 w-full pr-8">
            <GithubContributionsCard :contributions="githubContributions" :is-active="activeStep === 1" />
          </div>

          <!-- Diagrama Track (Columna 2 en Desktop, Columna 1 en Móvil) -->
          <DiagramTrack :step-index="1" :active-step="activeStep" :is-desktop="isDesktop" />

          <!-- Tarjeta de Contenido (Columna 3 en Desktop, Columna 2 en Móvil) -->
          <div class="step-card col-span-1 md:col-start-3 md:col-end-4 flex items-center md:justify-start pb-10 w-full">
            <div class="w-full">
              <AboutCard title="Experiencia Laboral">
                <AboutExperience :is-active="activeStep === 1" />
              </AboutCard>
            </div>
          </div>
        </div>

        <!-- Fila 2: Habilidades Efectivas (Par -> Izquierda en Desktop) -->
        <div 
          data-index="2"
          class="step-row grid grid-cols-1 md:grid-cols-[1fr_6rem_1fr] items-stretch relative min-h-[180px] transition-all duration-500"
          :class="[activeStep === 2 ? 'opacity-100 scale-[1.01]' : 'opacity-70 md:opacity-40 scale-[0.99]']"
        >
          <!-- Tarjeta de Contenido (Columna 1 en Desktop, Columna 2 en Móvil) -->
          <div class="step-card col-span-1 md:col-start-1 md:col-end-2 flex items-center md:justify-end pb-10 w-full">
            <div class="w-full">
              <AboutCard title="Habilidades Efectivas">
                <AboutSkills />
              </AboutCard>
            </div>
          </div>

          <!-- Diagrama Track (Columna 2 en Desktop, Columna 1 en Móvil) -->
          <DiagramTrack :step-index="2" :active-step="activeStep" :is-desktop="isDesktop" />

          <!-- Editor VS Code: Arquitectura de Agentes (Columna 3 en Desktop, oculta en Móvil) -->
          <div class="step-panel hidden md:flex md:col-start-3 md:col-end-4 items-center pb-10 w-full pl-8">
            <AgentEditorCard v-model="selectedAgentFile" :files="agentFiles" :is-active="activeStep === 2" />
          </div>
        </div>

        <!-- Fila 3: Estudios Universitarios (Impar -> Derecha en Desktop) -->
        <div 
          data-index="3"
          class="step-row grid grid-cols-1 md:grid-cols-[1fr_6rem_1fr] items-stretch relative min-h-[180px] transition-all duration-500"
          :class="[activeStep === 3 ? 'opacity-100 scale-[1.01]' : 'opacity-70 md:opacity-40 scale-[0.99]']"
        >
          <!-- Terminal de Grado IUJO (Columna 1 en Desktop, oculta en Móvil) -->
          <div class="step-panel hidden md:flex md:col-start-1 md:col-end-2 items-center justify-end pb-10 w-full pr-8">
            <TerminalGraduationCard :is-active="activeStep === 3" />
          </div>

          <!-- Diagrama Track (Columna 2 en Desktop, Columna 1 en Móvil) -->
          <DiagramTrack :step-index="3" :active-step="activeStep" :is-desktop="isDesktop" />

          <!-- Tarjeta de Contenido (Columna 3 en Desktop, Columna 2 en Móvil) -->
          <div class="step-card col-span-1 md:col-start-3 md:col-end-4 flex items-center md:justify-start pb-10 w-full">
            <div class="w-full">
              <AboutCard title="Estudios Universitarios">
                <AboutEducation />
              </AboutCard>
            </div>
          </div>
        </div>

        <!-- Fila 4: Filosofía de Código (Par -> Izquierda en Desktop) -->
        <div 
          data-index="4"
          class="step-row grid grid-cols-1 md:grid-cols-[1fr_6rem_1fr] items-stretch relative min-h-[180px] transition-all duration-500"
          :class="[activeStep === 4 ? 'opacity-100 scale-[1.01]' : 'opacity-70 md:opacity-40 scale-[0.99]']"
        >
          <!-- Tarjeta de Contenido (Columna 1 en Desktop, Columna 2 en Móvil) -->
          <div class="step-card col-span-1 md:col-start-1 md:col-end-2 flex items-center md:justify-end pb-10 w-full">
            <div class="w-full">
              <AboutCard title="Filosofía de Código">
                <AboutPhilosophy />
              </AboutCard>
            </div>
          </div>

          <!-- Diagrama Track (Columna 2 en Desktop, Columna 1 en Móvil) -->
          <DiagramTrack :step-index="4" :active-step="activeStep" :is-desktop="isDesktop" />

          <!-- Panel de Calidad de Código (Columna 3 en Desktop, oculta en Móvil) -->
          <div class="step-panel hidden md:flex md:col-start-3 md:col-end-4 items-center pb-10 w-full pl-8">
            <QualityDashboardCard :is-active="activeStep === 4" />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SectionTitle from '@/components/Common/SectionTitle.vue';
import AboutCard from '@/components/About/AboutCard.vue';
import AnimatedElement from '@/components/Common/AnimatedElement.vue';
import JsonConfigCard from '@/components/About/JsonConfigCard.vue';
import GithubContributionsCard from '@/components/About/GithubContributionsCard.vue';
import AgentEditorCard from '@/components/About/AgentEditorCard.vue';
import TerminalGraduationCard from '@/components/About/TerminalGraduationCard.vue';
import QualityDashboardCard from '@/components/About/QualityDashboardCard.vue';
import DiagramTrack from '@/components/About/DiagramTrack.vue';
import AboutWhoAmI from '@/components/About/AboutWhoAmI.vue';
import AboutExperience from '@/components/About/AboutExperience.vue';
import AboutSkills from '@/components/About/AboutSkills.vue';
import AboutEducation from '@/components/About/AboutEducation.vue';
import AboutPhilosophy from '@/components/About/AboutPhilosophy.vue';
import { useAboutOrchestratorAnimations } from '@/composables/about/useAboutOrchestratorAnimations';

const activeStep = ref(0);
const isDesktop = ref(false);

// Estado para el visor de la arquitectura de agentes
const selectedAgentFile = ref('AGENT.md');

const agentFiles = {
  'AGENT.md': {
    title: 'AGENT.md',
    content: 'Coordinador central del sistema. Supervisa la ejecución de objetivos y orquesta las tareas complejas distribuyendo el trabajo en sub-agentes especializados.\n\n• Estado: Activo\n• Rol: Principal Supervisor\n• Dependencias: skills/*, sub-agents/*'
  },
  'coder.md': {
    title: 'coder.md',
    content: 'Especialista en desarrollo frontend.\n\n• Tareas:\n  - Escribir e iterar componentes Vue/Nuxt\n  - Implementar diseños responsive con Tailwind\n  - Mantener refactorizaciones limpias'
  },
  'documenter.md': {
    title: 'documenter.md',
    content: 'Especialista en documentación.\n\n• Tareas:\n  - Escribir especificaciones y planes de desarrollo\n  - Generar bitácoras y resúmenes de cambios'
  },
  'summary.md': {
    title: 'summary.md',
    content: 'Especialista en síntesis.\n\n• Tareas:\n  - Analizar el estado de tareas y redactar walkthroughs de alto nivel para el usuario final'
  },
  'tasker.md': {
    title: 'tasker.md',
    content: 'Gestor del checklist de tareas.\n\n• Tareas:\n  - Mantener y sincronizar el archivo de tareas (task.md) marcando pendientes y progresos'
  },
  'tester.md': {
    title: 'tester.md',
    content: 'Encargado del control de calidad.\n\n• Tareas:\n  - Ejecutar suites de test\n  - Validar reglas de linter y analizar errores de compilación'
  },
  'viewer.md': {
    title: 'viewer.md',
    content: 'Sub-agente de lectura y análisis de código.\n\n• Tareas:\n  - Leer archivos locales\n  - Analizar árboles de directorios\n  - Proveer contexto semántico'
  },
  'nuxt.md': {
    title: 'nuxt.md (Skills)',
    content: 'Tecnología: Nuxt.js\n• Nivel: Experto\n• Características:\n  - SSR & SSG avanzados\n  - Estructura basada en directorios\n  - Middleware e integraciones de servidor (h3)\n  - Optimización SEO y rendimiento web'
  },
  'astro.md': {
    title: 'astro.md (Skills)',
    content: 'Tecnología: Astro\n• Nivel: Avanzado\n• Características:\n  - Arquitectura de islas (Islands Architecture)\n  - Cero JavaScript del lado del cliente por defecto\n  - Integraciones dinámicas de múltiples frameworks\n  - Rendimiento óptimo en carga estática'
  },
  'vue.md': {
    title: 'vue.md (Skills)',
    content: 'Tecnología: Vue.js\n• Nivel: Experto\n• Características:\n  - Composition API & Reactividad profunda\n  - Gestión de estado global con Pinia\n  - Vue Router & Transiciones de página avanzadas\n  - Creación de componentes altamente reutilizables'
  },
  'gsap.md': {
    title: 'gsap.md (Skills)',
    content: 'Tecnología: GSAP (GreenSock)\n• Nivel: Avanzado\n• Características:\n  - Timelines y secuencias dinámicas de animación\n  - ScrollTrigger para efectos basados en el scroll del usuario\n  - Animaciones fluidas de hardware-accelerated\n  - Microinteracciones responsivas de alto impacto visual'
  },
  'tailwind.md': {
    title: 'tailwind.md (Skills)',
    content: 'Tecnología: Tailwind CSS\n• Nivel: Experto\n• Características:\n  - Maquetación rápida utility-first\n  - Customización mediante tailwind.config\n  - Arbitrary values y layouts complejos de Grid/Flexbox\n  - Animaciones y transiciones de estado personalizadas'
  },
  'bootstrap.md': {
    title: 'bootstrap.md (Skills)',
    content: 'Tecnología: Bootstrap\n• Nivel: Avanzado\n• Características:\n  - Grid system robusto y layouts consistentes\n  - Personalización mediante variables Sass/SCSS\n  - Prototipado y maquetación ágil de componentes responsivos'
  },
  'scss.md': {
    title: 'scss.md (Skills)',
    content: 'Tecnología: SCSS / SASS\n• Nivel: Avanzado\n• Características:\n  - Uso avanzado de Mixins, Funciones y Directivas\n  - Estructuración modular de hojas de estilo (Pattern 7-1)\n  - Anidamientos lógicos y uso de BEM'
  },
  'angular.md': {
    title: 'angular.md (Skills)',
    content: 'Tecnología: Angular\n• Nivel: Intermedio\n• Características:\n  - Estructuración por módulos y componentes en TS\n  - Data binding bidireccional y directivas personalizadas\n  - Integración básica con RxJS para programación reactiva'
  },
  'etc.md': {
    title: 'etc.md (Otras Habilidades)',
    content: 'Otras Herramientas & Tecnologías\n• Control de Versiones: Git & GitHub\n• Lenguajes: JavaScript (ES6+), HTML5, CSS3\n• Entornos: Node.js, npm, pnpm, Bun\n• Bundlers: Vite, Webpack\n• Diseño UI/UX: Figma (lectura e interpretación de mockups)'
  }
};

// Estado para el gráfico de contribuciones de GitHub
const githubContributions = ref([]);

const checkBreakpoint = () => {
  if (typeof window !== 'undefined') {
    isDesktop.value = window.innerWidth >= 768; // md breakpoint
  }
};

const { init: initAnimations } = useAboutOrchestratorAnimations(activeStep, isDesktop);

onMounted(() => {
  checkBreakpoint();
  window.addEventListener('resize', checkBreakpoint);

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

  // Inicializar animaciones GSAP vía composable
  initAnimations('.max-w-5xl');
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
