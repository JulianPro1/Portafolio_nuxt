<template>
  <div class="min-h-screen overflow-hidden isolate relative page-container" :style="categoryStyles">

    <!-- Contenido principal -->
    <main class="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
      <!-- Hero Section / Header de Proyecto -->
      <ProjectDetailsProjectDetailHero
        :title="project.title"
        :category="project.category"
        :status="project.status"
        :categories="projectDoc?.categories || []"
        @back="goBack"
      />

      <!-- Layout Asimétrico de 2 Columnas -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <!-- Columna Izquierda: Galería e Información Detallada (span 8) -->
        <div class="lg:col-span-8 space-y-12">
          
          <ProjectDetailsProjectDetailGallery
            v-if="project.gallery && project.gallery.length > 0"
            :gallery="project.gallery"
          />

          <!-- Descripción detallada ("Sobre el Proyecto") -->
          <ProjectDetailsProjectDetailAbout
            :project="project"
            :project-doc="projectDoc"
            :project-detail-doc="projectDetailDoc"
          />
        </div>

        <!-- Columna Derecha: Barra Lateral Fija (span 4) -->
        <aside class="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <!-- Ficha Técnica -->
          <!-- Ficha Técnica -->
          <ProjectDetailsProjectDetailTechSheet
            :category="project.category"
            :duration="project.duration"
            :collaborators="project.collaborators"
            :status="project.status"
          />

          <!-- Acciones / Enlaces de despliegue -->
          <ProjectDetailsProjectDetailLinks
            :live-url="project.liveUrl"
            :github-url="project.githubUrl"
          />

          <!-- Tecnologías Utilizadas -->
          <ProjectDetailsProjectDetailTechnologies
            :technologies="project.technologies"
          />
        </aside>

      </div>
    </main>

    <!-- Botón flotante volver para móviles/acceso rápido -->
    <NuxtLink
      to="/projects"
      @click.prevent="goBack"
      class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full glass-header action-btn shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 group md:hidden"
      aria-label="Volver a proyectos"
    >
      <Icon name="mdi:arrow-left" class="w-6 h-6 text-global-text transform group-hover:-translate-x-0.5 transition-transform" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useScrollStore } from "~/store";

const router = useRouter();
const scrollStore = useScrollStore();

const projectCategory = computed(() => {
  // 1. Usar la pestaña/categoría activa guardada en el store si coincide con las categorías del proyecto
  if (scrollStore.activeTab && projectDoc.value?.categories?.includes(scrollStore.activeTab)) {
    return scrollStore.activeTab;
  }
  // 2. Si no, usar la primera categoría definida en el documento
  if (projectDoc.value?.categories && projectDoc.value.categories.length > 0) {
    return projectDoc.value.categories[0];
  }
  // 3. Fallback
  return "destacados";
});

const categoryStyles = computed(() => {
  const categoryId = projectCategory.value;
  const map = {
    "destacados": "destacados",
    "en-produccion": "produccion",
    "en-desarrollo": "desarrollo",
    "personales": "personales",
  };
  const suffix = map[categoryId] || "produccion";
  return {
    "--projects-accent": `var(--projects-accent-${suffix})`,
    "--projects-accent-light": `var(--projects-accent-light-${suffix})`,
    "--projects-accent-dark": `var(--projects-accent-dark-${suffix})`,
  };
});

onBeforeRouteLeave((to) => {
  // Si salimos del detalle del proyecto y no vamos a /projects o a otro /project-detail/, reiniciamos el scroll
  if (!to.path.startsWith("/projects") && !to.path.startsWith("/project-detail/")) {
    scrollStore.clearScrollState();
  }
});

// Estado
const isFavorite = ref(false);

const goBack = () => {
  router.push("/projects");
};

// Props (viene de la ruta dinámica)
const route = useRoute();
const projectId = route.params.id_project;

// Obtener datos del proyecto con Nuxt Content
const { data: projectDoc } = await useAsyncData(`project-${projectId}`, async () => {
  // 1. Intentar buscar por el campo 'id' de frontmatter
  let doc = await queryCollection('projects').where('id', '=', projectId).first()
  
  // 2. Intentar buscar por el campo 'stem' del archivo (ej: 'projects/chami')
  if (!doc) {
    doc = await queryCollection('projects').where('stem', '=', `projects/${projectId}`).first()
  }
  
  // 3. Intentar buscar por el campo 'path' del archivo (ej: '/projects/chami')
  if (!doc) {
    doc = await queryCollection('projects').where('path', '=', `/projects/${projectId}`).first()
  }
  
  return doc
})

// Si no se encuentra el proyecto, lanzar un error 404 de Nuxt
if (!projectDoc.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Proyecto no encontrado: ${projectId}`,
    fatal: true
  })
}

// Obtener información en profundidad de la subcarpeta del proyecto (ej: 'projects/chami/index.md')
const { data: projectDetailDoc } = await useAsyncData(`project-detail-body-${projectId}`, async () => {
  let doc = await queryCollection('projectDetails').where('stem', '=', `projects/${projectId}/index`).first()
  if (!doc) {
    doc = await queryCollection('projectDetails').where('stem', '=', `projects/${projectId}/${projectId}`).first()
  }
  return doc
})

const project = computed(() => {
  const p = projectDoc.value || {};
  return {
    id: projectId,
    title: p.title || "Proyecto",
    category: p.category || "Desarrollo",
    status: p.categories?.includes('en-produccion') ? 'production' : (p.categories?.includes('en-desarrollo') ? 'development' : (p.categories?.includes('personales') ? 'personal' : p.status || 'production')),
    client: p.client || "Proyecto personal",
    date: p.date || "2024",
    duration: p.developmentTime || p.duration || "Variable",
    collaborators: p.collaborators || 1,
    type: p.type || "Sitio Web",
    shortDescription: p.shortDescription || p.description || "",
    description: p.description || "",
    objectives: p.objectives || [],
    features: p.features || [],
    technologies: p.technologies || [],
    liveUrl: p.liveUrl || "",
    githubUrl: p.githubUrl || "",
    icon: p.icon || "",
    gallery: p.gallery || (p.icon ? [
      {
        url: p.icon,
        alt: p.title || "Logo del proyecto",
        title: p.title || "Identidad Visual",
        description: "Logotipo oficial del proyecto"
      }
    ] : []),
    _path: p._path,
    body: p.body
  };
});

// Métodos
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};



const shareProject = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: project.value.title,
        text: project.value.shortDescription,
        url: window.location.href,
      });
    } catch (err) {
      console.log("Error al compartir:", err);
    }
  } else {
    // Fallback: copiar al portapapeles
    navigator.clipboard.writeText(window.location.href);
  }
};






// Meta tags para SEO
useHead({
  title: `${project.value.title} - Portfolio`,
  meta: [
    { name: "description", content: project.value.shortDescription },
    { property: "og:title", content: project.value.title },
    { property: "og:description", content: project.value.shortDescription },
    { property: "og:image", content: project.value.gallery[0]?.url || project.value.icon || "" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});

</script>

<style scoped>
/* Contenedor general */
.page-container {
  background-color: var(--global-bg);
}

/* Efectos de luces de fondo (Glow) */
.glow-primary {
  background: radial-gradient(circle, var(--projects-accent) 0%, transparent 70%);
}
.glow-secondary {
  background: radial-gradient(circle, var(--projects-accent-light) 0%, transparent 70%);
}

/* Encabezado Glassmorphic sin barra '/' */
.glass-header {
  background-color: color-mix(in srgb, var(--global-bg) 80%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--global-base) 50%, transparent);
  backdrop-filter: blur(20px);
}

/* Botones de acción del encabezado */
.action-btn {
  background-color: color-mix(in srgb, var(--global-base) 60%, transparent);
  border: 1px solid color-mix(in srgb, var(--global-base) 80%, transparent);
}
.action-btn:hover {
  background-color: var(--global-base);
  border-color: color-mix(in srgb, var(--projects-accent-light) 50%, transparent);
}

/* Tarjetas base estilo cristal */
.glass-card {
  background: linear-gradient(135deg, color-mix(in srgb, var(--global-base) 60%, transparent), color-mix(in srgb, var(--global-bg) 80%, transparent));
  border: 1px solid color-mix(in srgb, var(--global-base) 80%, transparent);
  backdrop-filter: blur(12px);
}

/* Ítems de características */
.feature-item {
  background-color: color-mix(in srgb, var(--global-bg) 50%, transparent);
  border: 1px solid color-mix(in srgb, var(--global-base) 60%, transparent);
  transition: all 0.3s ease;
}
.feature-item:hover {
  border-color: color-mix(in srgb, var(--projects-accent-light) 40%, transparent);
  transform: translateY(-2px);
}

/* Botones de despliegue */
.btn-live {
  background: linear-gradient(135deg, var(--projects-accent) 0%, var(--projects-accent-light) 100%);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--projects-accent) 30%, transparent);
}
.btn-live:hover {
  box-shadow: 0 6px 20px color-mix(in srgb, var(--projects-accent) 55%, transparent);
}

.btn-github {
  background-color: color-mix(in srgb, var(--global-base) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--global-base) 90%, transparent);
}
.btn-github:hover {
  background-color: color-mix(in srgb, var(--global-base) 100%, transparent);
  border-color: color-mix(in srgb, var(--projects-accent) 50%, transparent);
}

/* Píldoras de tecnología */
.tech-pill {
  background: linear-gradient(135deg, color-mix(in srgb, var(--projects-accent-dark) 20%, transparent), color-mix(in srgb, var(--global-bg) 90%, transparent));
  border: 1px solid color-mix(in srgb, var(--global-base) 80%, transparent);
  transition: all 0.3s ease;
}
.tech-pill:hover {
  border-color: color-mix(in srgb, var(--projects-accent) 50%, transparent);
  transform: translateY(-1px);
}

/* Ocultar scrollbar horizontal en miniaturas */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Animación de entrada de contenido */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

main {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Transiciones de imagen activa */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos para el renderizador de Markdown (Nuxt Content) */
.markdown-body :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.75;
}
.markdown-body :deep(p:last-child) {
  margin-bottom: 0;
}
.markdown-body :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}
.markdown-body :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}
.markdown-body :deep(li) {
  margin-bottom: 0.75rem;
}
.markdown-body :deep(li:last-child) {
  margin-bottom: 0;
}
.markdown-body :deep(strong) {
  color: var(--global-text);
  font-weight: 600;
}
.markdown-body :deep(code) {
  font-family: monospace;
  background-color: color-mix(in srgb, var(--global-base) 80%, transparent);
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  font-size: 0.875em;
  color: var(--projects-accent-light);
}
</style>
