<template>
  <div class="min-h-screen overflow-hidden isolate"
    <!-- Header con navegación -->
    <header
      class="relative z-50 border-b border-global-base/50 bg-global-bg/80 backdrop-blur-xl"
    >
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/projects"
            class="flex items-center gap-3 text-global-text-muted hover:text-global-text transition-colors duration-300"
          >
            <Icon name="mdi:arrow-left" class="w-5 h-5" />
            <span class="font-medium">Volver a proyectos</span>
          </NuxtLink>

          <div class="flex items-center gap-4">
            <button
              @click="toggleFavorite"
              class="p-2 rounded-full bg-global-base/50 text-global-text-muted hover:text-global-text hover:bg-global-base transition-all duration-300"
            >
              <Icon
                :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
                class="w-5 h-5"
              />
            </button>
            <button
              @click="shareProject"
              class="p-2 rounded-full bg-global-base/50 text-global-text-muted hover:text-global-text hover:bg-global-base transition-all duration-300"
            >
              <Icon name="mdi:share-variant" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="relative">
      <!-- Hero Section -->
      <section class="relative py-16 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <!-- Badge de categoría -->
            <div class="inline-flex items-center gap-2 mb-6">
              <span
                class="px-4 py-2 rounded-full text-sm font-semibold text-white"
                :class="getCategoryBadgeClass(project.category)"
              >
                {{ project.category }}
              </span>
              <span
                v-if="project.status"
                class="px-4 py-2 rounded-full text-sm font-semibold text-white"
                :class="getStatusBadgeClass(project.status)"
              >
                {{ getStatusText(project.status) }}
              </span>
            </div>

            <!-- Título principal -->
            <h1
              class="text-5xl md:text-6xl font-bold text-global-text mb-6 bg-gradient-to-r from-global-text to-global-text-muted bg-clip-text text-transparent"
            >
              {{ project.title }}
            </h1>

            <!-- Descripción breve -->
            <p class="text-xl text-global-text-muted max-w-3xl mx-auto leading-relaxed">
              {{ project.shortDescription }}
            </p>
          </div>

          <!-- Información clave -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div
              class="bg-gradient-to-br from-global-base to-global-bg rounded-2xl p-6 border border-global-base"
            >
              <div class="flex items-center gap-3 mb-3">
                <Icon name="mdi:account-tie" class="w-5 h-5 text-projects-accent" />
                <span class="text-global-text-muted text-sm">Cliente</span>
              </div>
              <div class="text-global-text font-semibold text-lg">
                {{ project.client || "Proyecto personal" }}
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-global-base to-global-bg rounded-2xl p-6 border border-global-base"
            >
              <div class="flex items-center gap-3 mb-3">
                <Icon name="mdi:calendar" class="w-5 h-5 text-projects-accent-light" />
                <span class="text-global-text-muted text-sm">Fecha</span>
              </div>
              <div class="text-global-text font-semibold text-lg">
                {{ project.date || "2024" }}
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-global-base to-global-bg rounded-2xl p-6 border border-global-base"
            >
              <div class="flex items-center gap-3 mb-3">
                <Icon
                  name="mdi:clock-time-eight"
                  class="w-5 h-5 text-projects-accent"
                />
                <span class="text-global-text-muted text-sm">Duración</span>
              </div>
              <div class="text-global-text font-semibold text-lg">
                {{ project.duration || "3 meses" }}
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-global-base to-global-bg rounded-2xl p-6 border border-global-base"
            >
              <div class="flex items-center gap-3 mb-3">
                <Icon name="mdi:web" class="w-5 h-5 text-projects-accent-light" />
                <span class="text-global-text-muted text-sm">Tipo</span>
              </div>
              <div class="text-global-text font-semibold text-lg">
                {{ project.type || "Web Application" }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Galería de imágenes -->
      <section
        class="py-16 px-6 bg-gradient-to-b from-transparent to-global-bg"
      >
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-global-text mb-4">
              Galería del Proyecto
            </h2>
            <p class="text-global-text-muted text-lg">
              Explora las capturas de pantalla y vistas del proyecto
            </p>
          </div>

          <!-- Galería principal -->
          <div class="relative">
            <!-- Contenedor de imágenes con scroll horizontal -->
            <div class="overflow-x-auto overflow-y-hidden pb-6">
              <div class="flex gap-6" style="width: max-content">
                <div
                  v-for="(image, index) in project.gallery"
                  :key="index"
                  class="relative group cursor-pointer"
                  @click="openImageModal(image, index)"
                >
                  <div
                    class="relative w-[400px] h-[300px] rounded-2xl overflow-hidden border border-global-base hover:border-projects-accent/50 transition-all duration-300"
                  >
                    <img
                      :src="image.url"
                      :alt="image.alt"
                      class="w-full h-full object-cover"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div class="absolute bottom-4 left-4 right-4">
                        <p class="text-global-text text-sm font-medium">
                          {{ image.title || `Vista ${index + 1}` }}
                        </p>
                        <p class="text-global-text-muted text-xs mt-1">
                          {{ image.description || "Haz clic para ampliar" }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Indicadores de scroll -->
            <div class="flex justify-center mt-4 gap-2">
              <div
                v-for="(_, index) in project.gallery"
                :key="index"
                class="w-2 h-2 rounded-full bg-global-text-dim"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Descripción detallada -->
      <section class="py-16 px-6">
        <div class="max-w-4xl mx-auto">
          <h2
            class="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
          >
            Sobre el Proyecto
          </h2>

          <div class="prose prose-invert prose-lg max-w-none">
            <div
              class="bg-gradient-to-br from-global-base to-global-bg rounded-2xl p-8 border border-global-base"
            >
              <p class="text-global-text-muted leading-relaxed mb-6">
                {{ project.description }}
              </p>

              <!-- Objetivos -->
              <div v-if="project.objectives" class="mb-8">
                <h3
                  class="text-xl font-semibold text-global-text mb-4 flex items-center gap-2"
                >
                  <Icon name="mdi:target" class="w-5 h-5 text-projects-accent" />
                  Objetivos del Proyecto
                </h3>
                <ul class="space-y-3">
                  <li
                    v-for="objective in project.objectives"
                    :key="objective"
                    class="flex items-start gap-3 text-global-text-muted"
                  >
                    <Icon
                      name="mdi:check-circle"
                      class="w-5 h-5 text-projects-accent-light mt-0.5 flex-shrink-0"
                    />
                    <span>{{ objective }}</span>
                  </li>
                </ul>
              </div>

              <!-- Características principales -->
              <div v-if="project.features" class="mb-8">
                <h3
                  class="text-xl font-semibold text-global-text mb-4 flex items-center gap-2"
                >
                  <Icon name="mdi:star" class="w-5 h-5 text-projects-accent-light" />
                  Características Principales
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="feature in project.features"
                    :key="feature"
                    class="flex items-start gap-3 p-4 bg-global-bg/50 rounded-xl border border-global-base"
                  >
                    <Icon
                      name="mdi:check-bold"
                      class="w-4 h-4 text-projects-accent mt-0.5 flex-shrink-0"
                    />
                    <span class="text-global-text-muted text-sm">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tecnologías utilizadas -->
      <section
        class="py-16 px-6 bg-gradient-to-b from-transparent to-[#121212]"
      >
        <div class="max-w-7xl mx-auto">
          <h2
            class="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
          >
            Tecnologías Utilizadas
          </h2>

          <div class="flex flex-wrap justify-center gap-4">
            <div
              v-for="tech in project.technologies"
              :key="tech"
              class="px-6 py-3 bg-gradient-to-r from-projects-accent-dark/40 to-[#121212] rounded-full border border-gray-800 hover:border-projects-accent/50 transition-all duration-300"
            >
              <span class="text-white font-medium">{{ tech }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Enlaces del proyecto -->
      <section class="py-16 px-6">
        <div class="max-w-4xl mx-auto">
          <div
            class="bg-gradient-to-br from-projects-accent-dark/40 to-[#121212] rounded-2xl p-8 border border-gray-800"
          >
            <h2 class="text-2xl font-bold text-white mb-6 text-center">
              Explora el Proyecto
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                class="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-projects-accent to-projects-accent-light text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(31,77,214,0.4)] transition-all duration-300"
              >
                <Icon name="mdi:external-link" class="w-5 h-5" />
                <span>Visitar Sitio Web</span>
              </a>

              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                class="flex items-center justify-center gap-3 px-6 py-4 bg-projects-accent-dark/80 text-white font-semibold rounded-full border border-gray-800/60 hover:bg-white/10 hover:border-projects-accent/50 transition-all duration-300"
              >
                <Icon name="mdi:github" class="w-5 h-5" />
                <span>Ver Código Fuente</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Modal de imagen -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
      @click="closeImageModal"
    >
      <div class="relative max-w-6xl max-h-[90vh] w-full">
        <button
          @click="closeImageModal"
          class="absolute -top-12 right-0 p-3 text-white hover:text-projects-accent transition-colors duration-300"
        >
          <Icon name="mdi:close" class="w-8 h-8" />
        </button>

        <img
          :src="selectedImage.url"
          :alt="selectedImage.alt"
          class="w-full h-full object-contain rounded-2xl"
        />

        <div
          class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl"
        >
          <h3 class="text-white text-xl font-semibold mb-2">
            {{ selectedImage.title || `Vista ${selectedImageIndex + 1}` }}
          </h3>
          <p class="text-gray-300 text-sm">
            {{
              selectedImage.description || "Captura de pantalla del proyecto"
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Estado
const isFavorite = ref(false);
const selectedImage = ref(null);
const selectedImageIndex = ref(0);

// Props (viene de la ruta dinámica)
const route = useRoute();
const projectId = route.params.id_project;

// Datos del proyecto (ejemplo - en producción vendría de una API)
const project = ref({
  id: projectId,
  title: "Banking Portal Moderno",
  category: "FinTech",
  status: "production",
  client: "FinTech Corp",
  date: "Enero 2024",
  duration: "4 meses",
  type: "Web Application",
  shortDescription:
    "Portal bancario seguro con transferencias, gestión de cuentas y dashboard financiero en tiempo real.",
  description:
    "Desarrollo completo de un portal bancario moderno que ofrece una experiencia de usuario excepcional para la gestión financiera. El proyecto incluye autenticación segura, transferencias en tiempo real, gestión de cuentas múltiples, dashboard analítico con gráficos interactivos, notificaciones push, y soporte para múltiples dispositivos. Se implementaron las mejores prácticas de seguridad y se optimizó el rendimiento para manejar miles de usuarios concurrentes.",
  objectives: [
    "Crear una experiencia bancaria digital moderna e intuitiva",
    "Implementar seguridad de nivel empresarial para todas las transacciones",
    "Desarrollar un dashboard analítico con visualización de datos en tiempo real",
    "Garantizar compatibilidad con dispositivos móviles y escritorio",
    "Optimizar el rendimiento para alta concurrencia de usuarios",
  ],
  features: [
    "Autenticación biométrica y doble factor",
    "Transferencias instantáneas entre cuentas",
    "Dashboard con gráficos interactivos",
    "Notificaciones push y email",
    "Gestión de presupuestos y metas",
    "Exportación de informes en PDF",
    "Soporte 24/7 integrado",
    "API RESTful completa",
  ],
  technologies: [
    "Vue.js",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Redis",
    "AWS",
    "Stripe API",
    "Socket.io",
  ],
  liveUrl: "https://banking-fintech.com",
  githubUrl: "https://github.com/username/banking-portal",
  gallery: [
    {
      url: "https://picsum.photos/seed/banking1/400/300.jpg",
      alt: "Dashboard principal",
      title: "Dashboard Principal",
      description: "Vista general del dashboard con métricas financieras",
    },
    {
      url: "https://picsum.photos/seed/banking2/400/300.jpg",
      alt: "Transferencias",
      title: "Transferencias",
      description: "Interfaz para realizar transferencias entre cuentas",
    },
    {
      url: "https://picsum.photos/seed/banking3/400/300.jpg",
      alt: "Gestión de cuentas",
      title: "Gestión de Cuentas",
      description: "Panel de administración de cuentas bancarias",
    },
    {
      url: "https://picsum.photos/seed/banking4/400/300.jpg",
      alt: "Móvil",
      title: "Versión Móvil",
      description: "Interfaz optimizada para dispositivos móviles",
    },
    {
      url: "https://picsum.photos/seed/banking5/400/300.jpg",
      alt: "Análisis",
      title: "Análisis Financiero",
      description: "Gráficos y reportes de análisis financiero",
    },
  ],
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
    // Aquí podrías mostrar una notificación
  }
};

const openImageModal = (image, index) => {
  selectedImage.value = image;
  selectedImageIndex.value = index;
};

const closeImageModal = () => {
  selectedImage.value = null;
  selectedImageIndex.value = 0;
};

// Classes dinámicas
const getCategoryBadgeClass = (category) => {
  const classes = {
    FinTech: "bg-gradient-to-r from-projects-accent-light to-projects-accent",
    Education: "bg-gradient-to-r from-projects-accent to-projects-accent-dark",
    Health: "bg-gradient-to-r from-projects-accent-light to-projects-accent",
    Creative: "bg-gradient-to-r from-projects-accent to-projects-accent-light",
    Utility: "bg-gradient-to-r from-projects-accent to-projects-accent-light",
    Entertainment: "bg-gradient-to-r from-projects-accent-light to-projects-accent",
    Content: "bg-gradient-to-r from-projects-accent-light to-projects-accent",
    default: "bg-gradient-to-r from-projects-accent to-projects-accent-light",
  };
  return classes[category] || classes["default"];
};

const getStatusBadgeClass = (status) => {
  const classes = {
    production: "bg-gradient-to-r from-projects-accent-light to-projects-accent animate-pulse",
    development: "bg-gradient-to-r from-projects-accent to-projects-accent-dark",
    personal: "bg-gradient-to-r from-projects-accent-light to-projects-accent",
  };
  return classes[status] || classes["development"];
};

const getStatusText = (status) => {
  const texts = {
    production: "En producción",
    development: "En desarrollo",
    personal: "Proyecto personal",
  };
  return texts[status] || "En desarrollo";
};

// Meta tags para SEO
useHead({
  title: `${project.value.title} - Portfolio`,
  meta: [
    { name: "description", content: project.value.shortDescription },
    { property: "og:title", content: project.value.title },
    { property: "og:description", content: project.value.shortDescription },
    { property: "og:image", content: project.value.gallery[0]?.url },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>

<style scoped>
/* Scroll horizontal personalizado */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, var(--projects-accent), var(--projects-accent-light));
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, var(--projects-accent-light), var(--projects-accent));
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

main > section {
  animation: fadeIn 0.8s ease-out;
}

/* Efectos hover */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }

  .text-6xl {
    font-size: 3rem;
  }
}
</style>
