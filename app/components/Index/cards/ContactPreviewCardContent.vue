<template>
  <div class="relative h-full p-4 sm:p-5 flex flex-col overflow-hidden text-left select-none">
    <div class="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-contact-accent/20 blur-xl"></div>
    <div class="absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-contact-accent-light/10 blur-xl"></div>

    <div class="relative z-10 mb-3 sm:mb-5 flex items-center justify-between gap-3">
      <div class="inline-flex items-center gap-2 rounded-full border border-contact-accent bg-contact-accent/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-contact-accent-light">
        <span class="h-1.5 w-1.5 rounded-full bg-contact-accent-light shadow-[0_0_12px_hsla(160,90%,31%,0.9)]"></span>
        {{ item.badge }}
      </div>
    </div>

    <div class="relative z-10 flex flex-1 flex-col justify-between ">
      <div>
        <h3 class="mb-2 sm:mb-3 text-xl sm:text-2xl font-black leading-tight text-global-text">
          {{ item.titlePrefix }}
          <span class="block bg-gradient-to-r from-contact-accent to-contact-accent-light bg-clip-text text-transparent">
            {{ item.titleHighlight }}
          </span>
        </h3>

        <p class="text-xs sm:text-sm leading-relaxed text-global-text-muted" v-html="item.cardDescription"></p>
      </div>

      <div class="mt-3 sm:mt-5 space-y-3 sm:space-y-4">
        <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
          <div
            v-for="social in socialLinksData"
            :key="social.label"
            class="flex h-9 sm:h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
          >
            <Icon :name="social.icon" class="h-4.5 w-4.5 sm:h-5 sm:w-5 text-contact-accent-light" />
          </div>
        </div>

        <PreviewCardButton
          :to="item.href"
          variant="contact"
          full-width
        >
          {{ item.buttonText }}
        </PreviewCardButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PortfolioItemCard } from '~/types';
import PreviewCardButton from '@/components/Index/PreviewCardButton.vue';

const props = defineProps<{
  item: PortfolioItemCard
}>();

const socialLinksData = computed(() => props.item.details || []);
</script>
