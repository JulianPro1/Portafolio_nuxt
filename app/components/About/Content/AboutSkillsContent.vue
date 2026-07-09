<script setup lang="ts">
defineProps<{
  data?: {
    specialty: string;
    workflowBase: string;
    intro: string;
    midText: string;
    endText: string;
    description: string;
  }
}>()
</script>

<template>
  <div class="space-y-4" v-if="data">
    <p>
      {{ data.intro }}<span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-fuchsia">{{ data.specialty }}</span>{{ data.midText }}<span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-pink">{{ data.workflowBase }}</span>{{ data.endText }}
    </p>
    <p>
      {{ data.description }}
    </p>
  </div>
</template>
