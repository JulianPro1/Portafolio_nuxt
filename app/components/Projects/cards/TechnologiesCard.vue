<template>
  <div class="group relative  rounded-2xl overflow-hidden border border-[var(--category-accent)] transition-all duration-500 hover:shadow-2xl col-span-1 row-span-1 h-full">

    <!-- Contenido -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full p-4 transition-transform duration-300 group-hover:scale-105">
      <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--category-accent)]/20 border border-[var(--category-accent)] mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--category-accent)]/30">
        <Icon name="mdi:code-tags" class="w-6 h-6 text-[var(--category-accent)]" />
      </div>
      <div class="flex flex-wrap gap-1 justify-center max-w-full">
        <span
          v-for="tech in technologies.slice(0, 4)"
          :key="tech"
          class="px-2 py-1 text-[10px] font-medium rounded-lg border border-white/10 bg-white/5 text-white/80"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- Border gradient effect -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  technologies: string[]
}>()
</script>
