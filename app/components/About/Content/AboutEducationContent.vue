<script setup lang="ts">
defineProps<{
  data?: {
    institute: string;
    instituteFullName: string;
    location: string;
    instituteUrl: string;
    description: string;
  }
}>()
</script>

<template>
  <div class="space-y-4" v-if="data">
    <p>
      Realicé mis estudios superiores de informática en el <NuxtLink :to="data.instituteUrl" target="_blank" rel="noopener noreferrer" class="text-about-accent-light font-medium transition-colors duration-300 hover:text-about-fuchsia group-hover:text-about-fuchsia cursor-pointer underline decoration-dotted underline-offset-2">{{ data.institute }}</NuxtLink> {{ data.instituteFullName }} en {{ data.location }}.
    </p>
    <p>
      {{ data.description }}
    </p>
  </div>
</template>
