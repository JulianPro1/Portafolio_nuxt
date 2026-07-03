<template>
  <div class="relative h-full p-4 sm:p-5 flex flex-col overflow-hidden text-left select-none">
    <div class="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-about-accent/30 blur-3xl border border-about-accent"></div>
    <div class="absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-about-accent/20 blur-3xl"></div>
    <div class="relative z-10 mb-3 sm:mb-5 rounded-2xl border border-about-accent p-1.5 sm:p-2">
      <InteractiveMarquee
        :items="techSkills"
        :badge-background="'linear-gradient(to bottom right, hsla(270, 67%, 45%, 0.24), hsla(270, 60%, 65%, 0.14))'"
        :text-color="'#F9FAFB'"
        :fade-color="'hsla(267, 50%, 11%, 1)'"
        :badge-padding-x="1.5"
        :badge-padding-y="1"
        :icon-text-gap="1.5"
        :text-size="0.7"
        :icon-size="0.7"
        :base-speed="0.45"
      />
    </div>

    <div class="relative z-10 flex flex-1 flex-col justify-between">
      <div>
        <div class="mb-3 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-about-accent bg-about-accent/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-about-accent-light">
          <span class="h-1.5 w-1.5 rounded-full bg-about-accent-light shadow-[0_0_12px_hsla(270,67%,45%,1)]"></span>
          Frontend Developer
        </div>

        <p class="text-xs sm:text-sm leading-relaxed text-global-text-muted">
          Soy <span class="font-bold text-about-accent-light">Julian</span>, desarrollador frontend especializado en Vue, Nuxt y TypeScript. Construyo experiencias digitales rápidas, limpias y visualmente cuidadas, combinando performance, UX y detalle estético.
        </p>
      </div>

      <div class="mt-3 sm:mt-5 flex items-center justify-center gap-3">
        <PreviewCardButton
          to="/about"
          variant="about"
        >
          Saber más
        </PreviewCardButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InteractiveMarquee from '@/components/Common/InteractiveMarquee.vue';
import PreviewCardButton from '@/components/Index/PreviewCardButton.vue';

interface TechSkill {
  name: string;
  icon?: string;
}

interface Props {
  techSkills: TechSkill[];
}

defineProps<Props>();
</script>
