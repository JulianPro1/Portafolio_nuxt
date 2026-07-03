<template>
  <div class="group relative rounded-2xl overflow-hidden border border-[var(--category-accent)] transition-all duration-500 hover:shadow-2xl col-span-1 row-span-1 h-full">
     <!-- Contenido -->
     <div class="relative z-10 flex flex-col items-center justify-center h-full p-6 transition-transform duration-300 group-hover:scale-105">
       <div class="w-14 h-14 flex items-center justify-center rounded-xl bg-[var(--category-accent)]/20 border border-[var(--category-accent)] mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--category-accent)]/30">
         <Icon name="mdi:clock-outline" class="w-8 h-8 text-[var(--category-accent)]" />
       </div>
       <span class="text-xl font-bold text-white mb-2 text-center">{{ time }}</span>
       <span class="text-xs text-global-text-muted text-center">Tiempo de desarrollo</span>
     </div>
   </div>
 </template>

<script setup lang="ts">
const props = defineProps<{
  time: string
}>()
</script>
