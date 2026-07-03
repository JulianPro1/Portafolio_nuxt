<template>
  <div :class="`text-${align} mb-6`">
    <span
      v-if="badge"
      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4"
      :style="{
        backgroundColor: `${accentColor}20`,
        color: accentColor,
        borderColor: `${accentColor}50`
      }"
    >
      {{ badge }}
    </span>
    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
      {{ title }}
      <span
        v-if="highlight"
        :style="{
          color: accentColor
        }"
        >{{ highlight }}</span
      >
    </h2>
    <p v-if="description" :class="`text-gray-400 text-lg ${align === 'right' ? 'ml-auto' : align === 'left' ? 'mr-auto' : 'mx-auto'}`" :style="{ maxWidth: align === 'right' ? '16rem' : '32rem' }">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBackgroundStore } from '~/store/modules/background';

const backgroundStore = useBackgroundStore();

const props = defineProps({
  badge: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  highlight: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  align: {
    type: String,
    default: "center",
    validator: (value: string) => ["left", "center", "right"].includes(value),
  },
  domain: {
    type: String,
    default: "",
    validator: (value: string) => ["", "about", "contact", "projects", "skills"].includes(value),
  },
});

const accentColor = computed(() => {
  return props.domain && props.domain in backgroundStore.domainAccentColors
    ? backgroundStore.domainAccentColors[props.domain as keyof typeof backgroundStore.domainAccentColors]
    : backgroundStore.navbarAccentColor;
});
</script>
