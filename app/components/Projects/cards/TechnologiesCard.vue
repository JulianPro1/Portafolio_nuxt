<template>
  <div class="group relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-950 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-1 hover:border-[color:var(--category-accent)] col-span-1 row-span-1 h-full">
    <!-- Contenido -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full p-4 gap-2 transition-transform duration-300 will-change-transform group-hover:scale-[1.02]">
      <!-- Header icon -->
      <div class="w-10 h-10 hidden sm:flex items-center justify-center rounded-xl border border-[color:var(--category-accent)] bg-[color:color-mix(in_srgb,var(--category-accent)_15%,transparent)] transition-[transform,background-color] duration-300 will-change-transform group-hover:scale-105 group-hover:bg-[color:color-mix(in_srgb,var(--category-accent)_25%,transparent)]">
        <Icon name="mdi:code-tags" class="w-8 h-8 text-[var(--category-accent)] " />
      </div>

      <!-- Label -->
      <span class="text-xs font-semibold uppercase tracking-widest text-white  select-none my-2">
        Tecnologías
      </span>

      <!-- Tech chips -->
      <div class="flex flex-wrap gap-1.5 justify-center max-w-full">
        <span
          v-for="tech in technologies"
          :key="tech"
          class="flex items-center gap-1 px-2 py-1 text-[10px] tech-pill rounded-lg"
        >
          <Icon
            v-if="getTechIcon(tech)"
            :name="getTechIcon(tech)"
            class="w-3 h-3 shrink-0"
          />
          <span class="hidden sm:inline">{{ tech }}</span>
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

<style scoped>
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

