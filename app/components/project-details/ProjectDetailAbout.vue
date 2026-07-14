<template>
  <section class="space-y-6">

      <h2 class="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 mb-4">
        <Icon name="mdi:text-subject" class="w-7 h-7 text-projects-accent" />
        Resumen
      </h2>
    <!-- Resumen -->
    <div v-if="project.shortDescription" class="rounded-3xl p-6 md:p-8 border border-white/15 bg-neutral-950">
      <p class="text-lg md:text-xl text-global-text-muted leading-relaxed font-light">
        {{ project.shortDescription }}
      </p>
    </div>

    <!-- Sobre el Proyecto -->
    <h2 class="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
      <Icon name="mdi:information" class="w-7 h-7 text-projects-accent" />
      Sobre el Proyecto
    </h2>

    <div class="rounded-3xl p-6 md:p-8 space-y-8 border border-white/15 bg-neutral-950">
      <!-- Renderer de Nuxt Content o texto plano -->
      <div class="prose prose-invert prose-lg max-w-none">
        <ContentRenderer 
          v-if="projectDetailDoc && projectDetailDoc.body" 
          :value="projectDetailDoc" 
          class="text-global-text-muted leading-relaxed markdown-body" 
        />
        <ContentRenderer 
          v-else-if="projectDoc && projectDoc.body" 
          :value="projectDoc" 
          class="text-global-text-muted leading-relaxed markdown-body" 
        />
        <template v-else>
          <p 
            v-for="(paragraph, index) in (project.description || '').split(/\n\s*\n/)" 
            :key="index"
            class="text-global-text-muted leading-relaxed font-light mb-4 last:mb-0"
          >
            {{ paragraph }}
          </p>
        </template>
      </div>

      <!-- Objetivos del proyecto -->
      <div v-if="project.objectives && project.objectives.length > 0" class="pt-6 border-t border-gray-800/50">
        <h3 class="text-lg font-semibold text-global-text mb-4 flex items-center gap-3">
          <Icon name="mdi:target" class="w-5 h-5 text-projects-accent" />
          Objetivos Clave
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li
            v-for="objective in project.objectives"
            :key="objective"
            class="flex items-start gap-3 text-global-text-muted text-sm md:text-base font-light"
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
      <div v-if="project.features && project.features.length > 0" class="pt-6 border-t border-gray-800/50">
        <h3 class="text-lg font-semibold text-global-text mb-4 flex items-center gap-3">
          <Icon name="mdi:star" class="w-5 h-5 text-projects-accent-light" />
          Funcionalidades Destacadas
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="feature in project.features"
            :key="feature"
            class="flex items-start gap-3 p-4 feature-item rounded-2xl"
          >
            <Icon
              name="mdi:check-bold"
              class="w-4 h-4 text-projects-accent mt-1 flex-shrink-0"
            />
            <span class="text-global-text-muted text-sm leading-relaxed font-light">{{ feature }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
  projectDoc: {
    type: Object,
    default: null,
  },
  projectDetailDoc: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>

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
