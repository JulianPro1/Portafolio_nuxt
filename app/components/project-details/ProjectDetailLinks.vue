<template>
  <div class="rounded-3xl p-6 space-y-4 border border-white/15 bg-neutral-950">
    <h3 class="text-lg font-bold text-white border-b border-gray-800 pb-3">
      Enlaces del Proyecto
    </h3>
    
    <div class="flex flex-col gap-3 pt-2">
      <BaseGradientButton
        v-if="liveUrl"
        :href="liveUrl"
        icon="mdi:external-link"
        icon-position="left"
        text="Visitar Sitio Web"
        class="w-full text-center py-3.5 rounded-2xl font-semibold hover:scale-[1.02]"
      />

      <div v-if="!liveUrl && !githubUrl" class="text-center py-4 text-sm text-global-text-dim italic">
        Sin enlaces públicos disponibles
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseGradientButton from '~/components/Common/BaseGradientButton.vue';

defineProps({
  liveUrl: {
    type: String,
    default: "",
  },
  githubUrl: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>

</style>
