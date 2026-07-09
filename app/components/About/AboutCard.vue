<template>
  <div
    class="group relative bg-gradient-to-br from-about-base/90 to-about-accent-dark/30 rounded-2xl border border-about-accent p-5 shadow-[0_18px_45px_hsla(0,0%,0%,0.65)] h-full hover:-translate-y-2 hover:border-about-fuchsia hover:shadow-[0_20px_40px_rgba(217,70,239,0.15),0_0_30px_rgba(244,63,94,0.1)] transition-all duration-300"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-about-fuchsia/15 via-transparent to-about-pink/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
    ></div>

    <div class="relative z-10 space-y-3 flex flex-col h-full justify-between">
      <div class="space-y-3">
        <h2
          class="text-xl md:text-2xl font-semibold text-white flex items-center gap-2"
        >
          <span
            class="w-1 h-7 bg-gradient-to-b from-about-fuchsia to-about-pink rounded-full animate-pulse origin-center group-hover:scale-y-125 group-hover:shadow-[0_0_12px_var(--about-fuchsia)] transition-all duration-300"
          ></span>
          {{ title }}
        </h2>

        <div class="text-gray-300 leading-relaxed text-sm space-y-3">
          <slot />
        </div>
      </div>

      <div v-if="buttonText && buttonTo" class="pt-2">
        <BaseGradientButton
          :to="buttonTo"
          :text="buttonText"
          :icon="buttonIcon || 'mdi:arrow-right'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseGradientButton from '~/components/Common/BaseGradientButton.vue';

defineProps<{
  title: string
  buttonText?: string
  buttonTo?: string
  buttonIcon?: string
}>()
</script>
