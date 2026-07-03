<template>
  <div
    class="flex flex-row items-center overflow-x-auto rounded-2xl border border-contact-accent-dark/60 shadow-[0_8px_32px_hsla(0,0%,0%,0.3)] scrollbar-hide relative"
  >
    <!-- Fondo deslizante -->
    <div
      class="absolute inset-y-0 bg-gradient-to-br from-contact-accent-dark via-[#121212] to-contact-accent-dark shadow-[0_4px_20px_hsla(160,90%,31%,0.4)] transition-all duration-300 ease-in-out rounded-2xl"
      :style="{
        width: `${100 / tabs.length}%`,
        transform: `translateX(${activeTabIndex * 100}%)`
      }"
    ></div>

    <button
      v-for="(tab, index) in tabs"
      :key="tab.id"
      @click="$emit('update:activeTab', tab.id)"
      class="relative flex items-center justify-center gap-3 py-2 px-1 text-sm font-semibold transition-all duration-300 overflow-hidden group flex-1 z-10"
      :class="
        activeTab === tab.id
          ? 'text-white'
          : 'text-gray-400 hover:text-white'
      "
    >
      <!-- Contenido del tab -->
      <div class="relative z-10 flex flex-col items-center gap-1">
        <Icon
          :name="tab.icon"
          class="w-5 h-5 transition-all duration-300 ease-in-out group-hover:scale-110"
          :class="
            activeTab === tab.id
              ? 'text-white drop-shadow-[0_0_8px_hsla(0,0%,100%,0.5)]'
              : 'text-gray-500 group-hover:text-contact-accent'
          "
        />
        <span class="tracking-wide transition-colors duration-300 ease-in-out">{{ tab.label }}</span>
      </div>

      <!-- Indicador activo -->
      <div
        v-if="activeTab === tab.id"
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-white to-white rounded-full transition-all duration-300 ease-in-out"
      ></div>
    </button>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
});

defineEmits(['update:activeTab']);

const activeTabIndex = computed(() => {
  return props.tabs.findIndex(tab => tab.id === props.activeTab);
});
</script>
