<template>
  <div class="group relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-950 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-1 hover:border-[color:var(--category-accent)] col-span-1 row-span-1 h-full">
    <!-- Contenido -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full p-4 transition-transform duration-300 will-change-transform group-hover:scale-[1.02]">
      <div class="w-12 h-12 flex items-center justify-center rounded-xl border border-[color:var(--category-accent)] bg-[color:color-mix(in_srgb,var(--category-accent)_15%,transparent)] mb-3 transition-[transform,background-color] duration-300 will-change-transform group-hover:scale-105 group-hover:bg-[color:color-mix(in_srgb,var(--category-accent)_25%,transparent)]">
        <Icon name="mdi:code-tags" class="w-6 h-6 text-[var(--category-accent)]" />
      </div>
      <div class="flex flex-wrap gap-1 justify-center max-w-full">
        <span
          v-for="tech in technologies.slice(0, 4)"
          :key="tech"
          class="px-2 py-1 text-[10px] font-medium rounded-lg border border-white/30 bg-white/5 text-white/80"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  technologies: string[]
}>()
</script>
