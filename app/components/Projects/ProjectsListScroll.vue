<template>
  <div class="space-y-24 py-10">
    <div
      v-for="(project, index) in allProjects"
      :key="project.id"
      class="project-bento-wrapper opacity-0 translate-y-12"
      :data-project-id="project.id"
    >
      <!-- Layout Desktop: Bento Grid 4 columnas -->
      <div class="hidden md:grid md:grid-cols-4 gap-6 md:h-[450px]">
        <!-- Card principal (grande) -->
        <div class="md:col-span-2 md:row-span-2 h-full">
          <ProjectCard
            :project="project"
            variant="large"
            :badge-config="config.badge"
            :color-scheme="config.colors"
            :links-config="config.links"
          />
        </div>

        <!-- Cards secundarias desktop -->
        <div class="col-span-1 h-full" v-if="project.collaborators">
          <CollaboratorsCard :count="project.collaborators" />
        </div>
        <div class="col-span-1 h-full" v-if="project.developmentTime">
          <DevelopmentTimeCard :time="project.developmentTime" />
        </div>
        <div class="col-span-1 h-full" v-if="project.showTechCard">
          <TechnologiesCard :technologies="project.technologies || []" />
        </div>
        <div class="col-span-1 h-full" v-if="project.showProductionLink && project.liveUrl">
          <ProductionLinkCard :url="project.liveUrl" />
        </div>
      </div>

      <!-- Layout Mobile: Card principal + grid 2x2 de cards pequeñas -->
      <div class="flex flex-col gap-4 md:hidden">
        <!-- Card principal con altura reducida en mobile -->
        <div class="h-[320px]">
          <ProjectCard
            :project="project"
            variant="large"
            :badge-config="config.badge"
            :color-scheme="config.colors"
            :links-config="config.links"
          />
        </div>

        <!-- Grid 2x2 compacto para cards secundarias -->
        <div class="grid grid-cols-2 gap-3">
          <div class="h-[120px]" v-if="project.collaborators">
            <CollaboratorsCard :count="project.collaborators" />
          </div>
          <div class="h-[120px]" v-if="project.developmentTime">
            <DevelopmentTimeCard :time="project.developmentTime" />
          </div>
          <div
            class="h-[120px]"
            :class="{ 'col-span-2': !project.showProductionLink || !project.liveUrl }"
            v-if="project.showTechCard"
          >
            <TechnologiesCard :technologies="project.technologies || []" />
          </div>
          <div class="h-[120px]" v-if="project.showProductionLink && project.liveUrl">
            <ProductionLinkCard :url="project.liveUrl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '~/components/Projects/cards/ProjectCard.vue'
import CollaboratorsCard from '~/components/Projects/cards/CollaboratorsCard.vue'
import DevelopmentTimeCard from '~/components/Projects/cards/DevelopmentTimeCard.vue'
import TechnologiesCard from '~/components/Projects/cards/TechnologiesCard.vue'
import ProductionLinkCard from '~/components/Projects/cards/ProductionLinkCard.vue'
import { getCategoryConfig } from '~/constants/projectCategories'

const props = defineProps<{
  category: string
}>()

const { data: projectsData } = await useAsyncData('projects', () => queryCollection('projects').all())

const config = getCategoryConfig(props.category)

const allProjects = computed(() => {
  if (!projectsData.value) return [];
  return projectsData.value.filter(p => p.categories?.includes(props.category));
})

let ctx: gsap.Context | null = null

onMounted(() => {
  if (import.meta.client) {
    // ScrollTrigger ya está registrado por gsap.client.ts (plugin global)
    ctx = gsap.context(() => {
      // Seleccionar todos los contenedores de proyectos bento en esta lista
      const elements = document.querySelectorAll('.project-bento-wrapper')
      
      elements.forEach((el) => {
        // Solo animar si pertenece a esta categoría para evitar cruces
        const parentSection = el.closest(`[data-category-section="${props.category}"]`)
        if (!parentSection) return

        gsap.fromTo(el,
          {
            opacity: 0,
            y: 35,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        )
      })
    })
  }
})

onUnmounted(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

<style scoped>
/* Aseguramos transiciones suaves */
.project-bento-wrapper {
  will-change: transform, opacity;
}
</style>
