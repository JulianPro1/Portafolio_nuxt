<template>
  <div class="relative min-h-screen isolate">
    <div class="relative z-10">
      <ProjectsSectionOrchestrator />
    </div>
  </div>
</template>

<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useScrollStore } from "~/store";
import ProjectsSectionOrchestrator from "~/components/Projects/SectionOrchestrator.vue";

const scrollStore = useScrollStore();

onBeforeRouteLeave((to) => {
  // Si no navegamos al detalle de un proyecto, reiniciamos el estado del scroll
  if (!to.path.startsWith("/project-detail/")) {
    scrollStore.clearScrollState();
  }
});

// Meta tags para SEO
useHead({
  title: "Proyectos | Julian Alejos",
  meta: [
    {
      name: "description",
      content:
        "Explora mi portafolio de proyectos web: aplicaciones comerciales, herramientas personales y experimentos de desarrollo.",
    },
    {
      name: "keywords",
      content:
        "proyectos web, desarrollo frontend, portafolio, Vue.js, React, JavaScript",
    },
    { property: "og:title", content: "Proyectos | Julian Alejos" },
    {
      property: "og:description",
      content:
        "Explora mi portafolio de proyectos web y aplicaciones desarrolladas con las mejores tecnologías.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>
