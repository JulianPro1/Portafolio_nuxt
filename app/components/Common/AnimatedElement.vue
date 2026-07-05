<template>
  <div
    ref="elementRef"
    :class="[
      animationClass,
      isVisible ? '' : 'opacity-0',
      { 'h-full': fullHeight }
    ]"
    :style="isVisible ? { animationDelay: computedDelay } : {}"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  variant?: 'title' | 'desc' | 'card' | 'cta' | 'tab' | 'carouselCard';
  delay?: string;
  index?: number;
  fullHeight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'card',
  delay: '0ms',
  fullHeight: true,
});

const elementRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

const animationClass = computed(() => {
  const classes: Record<string, string> = {
    title: 'animate-slide-fade-up',
    desc: 'animate-slide-fade-up',
    card: 'animate-scale-fade-in',
    cta: 'animate-slide-fade-up',
    tab: 'animate-slide-fade-right',
    carouselCard: 'animate-stagger-card',
  };
  return isVisible.value ? classes[props.variant] : '';
});

const computedDelay = computed(() => {
  if (props.index !== undefined) {
    const baseDelays: Record<string, number> = {
      title: 300,
      desc: 400,
      card: 500,
      cta: 600,
      tab: 280,
      carouselCard: 450,
    };
    const baseDelay = baseDelays[props.variant] || 100;
    return `${baseDelay + (props.index * 60)}ms`;
  }
  return props.delay;
});

onMounted(() => {
  if (!elementRef.value || typeof IntersectionObserver === 'undefined') {
    // Fallback: mostrar inmediatamente si no hay soporte
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          // Una vez visible, dejar de observar
          observer?.disconnect()
          observer = null
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  observer.observe(elementRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>
