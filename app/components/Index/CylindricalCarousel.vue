<template>
  <div
    ref="containerRef"
    class="relative w-full h-full cursor-grab"
    :class="{ 'cursor-grabbing': isDragging }"
    :style="{ perspective: `${perspective}px` }"
  >
    <!-- Escena 3D -->
    <div
      class="absolute inset-0"
      :style="{ transformStyle: 'preserve-3d' }"
    >
      <!-- Tarjetas 3D -->
      <div
        v-for="(style, index) in cardStyles"
        :key="index"
        class="absolute"
        :style="{
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) ${style.transform}`,
          opacity: style.opacity,
          zIndex: style.zIndex,
          cursor: isDragging ? 'grabbing' : 'grab',
          transition: isDragging ? 'transform 0.1s ease-out, opacity 0.1s ease-out' : 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }"
      >
        <slot name="card" :index="index" :is-active="index === activeIndex" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useCylindricalCarousel } from '~/composables/useCylindricalCarousel';

interface Props {
  itemCount: number;
  cardWidth?: number;
  cardHeight?: number;
  perspective?: number;
  radius?: number;
  scaleStep?: number;
  opacityStep?: number;
  dragThreshold?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  cardWidth: 320,
  cardHeight: 400,
  perspective: 1000,
  radius: 320,
  scaleStep: 0.12,
  opacityStep: 0.25,
  dragThreshold: 70,
  autoplay: true,
  autoplayInterval: 4000,
});

const {
  containerRef,
  activeIndex,
  isDragging,
  dragOffset,
  cardStyles,
  next,
  prev,
} = useCylindricalCarousel({
  itemCount: props.itemCount,
  radius: () => props.radius,
  scaleStep: () => props.scaleStep,
  opacityStep: () => props.opacityStep,
  dragThreshold: props.dragThreshold,
  autoplay: props.autoplay,
  autoplayInterval: props.autoplayInterval,
});

const emit = defineEmits(['change', 'drag', 'dragEnd']);
import { watch } from 'vue';
watch(activeIndex, (newVal) => {
  emit('change', newVal);
});
watch(dragOffset, (newVal) => {
  emit('drag', { offset: newVal, isDragging: isDragging.value });
});
watch(isDragging, (newVal) => {
  if (!newVal) {
    emit('dragEnd');
  }
});

defineExpose({
  next,
  prev,
  activeIndex,
});
</script>


