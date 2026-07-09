<script setup lang="ts">
defineProps<{
  data?: {
    intro: string;
    principles: Array<{
      title: string;
      description: string;
    }>;
  }
}>()
</script>

<template>
  <div class="space-y-4" v-if="data">
    <p>
      {{ data.intro }}
    </p>
    <ul class="list-none space-y-2 mt-2 pl-1 text-sm text-gray-300">
      <li class="flex items-start gap-2">
        <span class="text-about-fuchsia mt-1 shrink-0">✔</span>
        <span><strong>{{ data.principles[0]?.title }}:</strong> {{ data.principles[0]?.description }}</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-about-pink mt-1 shrink-0">✔</span>
        <span><strong>{{ data.principles[1]?.title }}:</strong> {{ data.principles[1]?.description }}</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-about-accent-light mt-1 shrink-0">✔</span>
        <span><strong>{{ data.principles[2]?.title }}:</strong> {{ data.principles[2]?.description }}</span>
      </li>
    </ul>
  </div>
</template>
