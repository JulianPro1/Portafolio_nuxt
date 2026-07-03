<template>
  <a
    :href="url"
    target="_blank"
    class="group relative rounded-2xl overflow-hidden border border-[var(--category-accent)] transition-all duration-500 hover:shadow-2xl col-span-1 row-span-1 cursor-pointer block h-full"
  >
    <!-- Contenido -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full p-6 transition-transform duration-300 group-hover:scale-105">
      <div class="w-14 h-14 flex items-center justify-center rounded-xl bg-[var(--category-accent)]/20 border border-[var(--category-accent)] mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--category-accent)]/30">
        <Icon name="mdi:rocket-launch" class="w-8 h-8 text-[var(--category-accent)]" />
      </div>
      <span class="text-sm font-semibold text-white mb-1 text-center">Link de producción</span>
      <span class="text-[10px] text-global-text-muted text-center flex items-center gap-1">
        <Icon name="mdi:external-link" class="w-3 h-3" />
        Abrir en nueva pestaña
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  url: string
}>()
</script>
