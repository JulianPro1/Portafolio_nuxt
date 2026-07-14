<template>
  <div class="rounded-3xl p-6 space-y-4 border border-white/15 bg-neutral-950" v-if="technologies && technologies.length > 0">
    <h3 class="text-lg font-bold text-white border-b border-gray-800 pb-3">
      Tecnologías
    </h3>
    <div class="flex flex-wrap gap-2 pt-2">
      <div
        v-for="tech in technologies"
        :key="tech"
        class="flex items-center gap-2 px-4 py-2 tech-pill rounded-xl"
      >
        <Icon
          v-if="getTechIcon(tech)"
          :name="getTechIcon(tech)"
          class="w-4 h-4 shrink-0"
        />
        <span class="text-white text-xs font-medium">{{ tech }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  technologies: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
/* Píldoras de tecnología */
.tech-pill {
  background: linear-gradient(135deg, color-mix(in srgb, var(--projects-accent-dark) 20%, transparent), color-mix(in srgb, var(--global-bg) 90%, transparent));
  border: 1px solid color-mix(in srgb, var(--global-base) 80%, transparent);
  transition: all 0.3s ease;
}
.tech-pill:hover {
  border-color: color-mix(in srgb, var(--projects-accent) 50%, transparent);
  transform: translateY(-1px);
}
</style>
