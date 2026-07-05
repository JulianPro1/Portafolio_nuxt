<template>
  <div class="relative h-full p-4 sm:p-5 flex flex-col overflow-hidden text-left select-none">
    <div class="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-skills-accent/20 blur-xl"></div>
    <div class="absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-skills-accent/10 blur-xl"></div>

    <div class="relative z-10 mb-3 sm:mb-5 flex items-center justify-between gap-3">
      <div class="inline-flex items-center gap-2 rounded-full border border-skills-accent bg-skills-accent/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-skills-accent-light">
        <span class="h-1.5 w-1.5 rounded-full bg-skills-accent-light shadow-[0_0_12px_hsla(0,84%,50%,0.9)]"></span>
        Stack técnico
      </div>
    </div>

    <div class="relative z-10 flex flex-1 flex-col justify-between">
      <div>
        <h3 class="mb-2 sm:mb-3 text-xl sm:text-2xl font-black leading-tight text-global-text">
          Mis
          <span class="block bg-gradient-to-r from-skills-accent to-skills-accent-light bg-clip-text text-transparent">
            Habilidades
          </span>
        </h3>

        <p class="text-xs sm:text-sm leading-relaxed text-global-text-muted">
          Tecnologías y herramientas que domino para crear experiencias web modernas, performantes y escalables.
        </p>
      </div>

      <div class="mt-3 sm:mt-5 space-y-3 sm:space-y-4">
        <div class="grid grid-cols-4 gap-1.5 sm:gap-2">
          <div
            v-for="category in skillCategoriesData"
            :key="category.label"
            class="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 py-1 sm:py-2 transition-colors hover:bg-white/10"
          >
            <Icon :name="category.icon" class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-skills-accent-light mb-0.5 sm:mb-1" />
            <span class="text-[6px] sm:text-[8px] font-bold text-white text-center">{{ category.label }}</span>
          </div>
        </div>

        <PreviewCardButton
          to="/skills"
          variant="skills"
          full-width
        >
          Ver stack
        </PreviewCardButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { skillCategoriesData } from '~/data/skillsPreviewData';
import PreviewCardButton from '@/components/Index/PreviewCardButton.vue';
</script>
