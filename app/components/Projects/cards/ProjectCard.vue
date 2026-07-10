<template>
  <div
    class="group relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-950 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-1 hover:border-[color:var(--category-accent)] h-full"
    :class="[
      variant === 'large' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
    ]"
  >
    <!-- Etiqueta del proyecto -->
    <div
      class="absolute z-20 rounded-lg transition-transform duration-300 will-change-transform group-hover:scale-[1.02]"
      :class="variant === 'large' ? 'top-4 left-4' : 'top-3 left-3'"
    >
      <span
        class="rounded-full text-xs font-semibold tracking-wide"
        :class="[
          variant === 'large' ? 'px-3 py-1.5' : 'px-2 py-1',
          'bg-white/10 border border-white/20 text-white/90'
        ]"
      >
        {{ project.category }}
      </span>
    </div>

    <!-- Badge de estado -->
    <div
      class="absolute z-20 rounded-lg transition-transform duration-300 will-change-transform group-hover:scale-[1.02]"
      :class="variant === 'large' ? 'top-4 right-4' : 'top-3 right-3'"
    >
      <span
        class="inline-flex items-center rounded-full text-xs font-semibold tracking-wide"
        :class="[
          variant === 'large' ? 'px-3 py-1.5' : 'px-2 py-1'
        ]"
        :style="`background: var(--category-accent); color: white; box-shadow: 0 4px 12px color-mix(in srgb, var(--category-accent) 40%, transparent); border: 1px solid rgba(255,255,255,0.2)`"
      >
        <Icon :name="badgeConfig.icon" class="w-3 h-3 mr-1" />
        {{ badgeConfig.text }}
      </span>
    </div>

    <!-- Indicador Live URL -->
    <div
      v-if="project.liveUrl"
      class="absolute z-20 top-4 left-1/2 -translate-x-1/2 transition-transform duration-300 will-change-transform group-hover:scale-[1.02]"
      :class="variant === 'large' ? 'top-4' : 'top-3'"
    >
      <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[color:color-mix(in_srgb,var(--contact-accent)_20%,transparent)] border border-[color:var(--contact-accent)]">
        <span class="w-1.5 h-1.5 rounded-full bg-[color:var(--contact-accent)] animate-pulse"></span>
        <span class="text-[10px] font-medium text-[color:var(--contact-accent)]">Live</span>
      </span>
    </div>

    <!-- Imagen del proyecto -->
    <div
      class="relative overflow-hidden"
      :class="variant === 'large' ? 'h-64' : 'h-40'"
    >
      <div
        class="absolute inset-0 flex items-center justify-center"
        :style="`background: color-mix(in srgb, var(--category-accent) 60%, rgba(9,9,11,0.7)); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid color-mix(in srgb, var(--category-accent) 30%, transparent)`"
      >
        <img
          v-if="project.icon"
          :src="project.icon"
          :alt="project.id"
          class="object-contain transition-transform duration-300 will-change-transform group-hover:scale-110 "
          :class="variant === 'large' ? 'max-h-28 max-w-[55%]' : 'max-h-16 max-w-[55%]'"
        />
        <Icon
          v-else
          name="mdi:application-braces"
          class="text-white/60 transition-colors duration-300 group-hover:text-white/80"
          :class="variant === 'large' ? 'w-16 h-16' : 'w-10 h-10'"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
    </div>

    <!-- Contenido de la card -->
    <div
      class="absolute bottom-0 left-0 right-0 z-10"
      :class="variant === 'large' ? 'p-5' : 'p-4'"
    >
      <h3
        class="font-bold text-white mb-2 transition-[transform,colors] duration-300 will-change-transform group-hover:translate-x-1 hover:text-[var(--category-light)] cursor-pointer"
        :class="[
          variant === 'large' ? 'text-xl' : 'text-sm'
        ]"
      >
        {{ project.title }}
      </h3>
      <p class="text-global-text-muted line-clamp-2 leading-relaxed" :class="variant === 'large' ? 'text-xs mb-4' : 'text-[11px] mb-3'">
        {{ project.description }}
      </p>

      <!-- Enlaces del proyecto -->
      <div class="flex items-center justify-between">
        <NuxtLink
          :to="`/project-detail/${project.id}`"
          class="text-xs font-medium flex items-center gap-1.5 transition-[transform,colors] duration-300 will-change-transform hover:translate-x-1 text-white/80 hover:text-[var(--category-light)]"
        >
          <Icon name="mdi:arrow-right" class="w-3 h-3" />
          Ver detalles
        </NuxtLink>
        <div class="flex items-center gap-2">
          <a
            v-if="linksConfig.showGithub && project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-[var(--category-light)] transition-[background-color,border-color,color] duration-300"
          >
            <Icon name="mdi:github" :class="variant === 'large' ? 'w-4 h-4' : 'w-3.5 h-3.5'" />
          </a>
          <a
            v-if="linksConfig.showCaseStudy && project.caseStudyUrl"
            :href="project.caseStudyUrl"
            target="_blank"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-[var(--category-light)] transition-[background-color,border-color,color] duration-300"
          >
            <Icon name="mdi:file-document" :class="variant === 'large' ? 'w-4 h-4' : 'w-3.5 h-3.5'" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BadgeConfig, ColorScheme, LinksConfig } from '~/types/projects'

const props = defineProps<{
  project: any
  variant: 'large' | 'medium' | 'small'
  badgeConfig: BadgeConfig
  colorScheme: ColorScheme
  linksConfig: LinksConfig
}>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
