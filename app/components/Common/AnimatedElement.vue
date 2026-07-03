<template>
  <div
    :class="[
      animationClass,
      { 'opacity-0': !hasAnimated },
      { 'h-full': fullHeight }
    ]"
    :style="{ animationDelay: computedDelay }"
    @animationend="hasAnimated = true"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
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

const hasAnimated = ref(false);

const animationClass = computed(() => {
  const classes: Record<string, string> = {
    title: 'animate-slide-fade-up',
    desc: 'animate-slide-fade-up',
    card: 'animate-scale-fade-in',
    cta: 'animate-slide-fade-up',
    tab: 'animate-slide-fade-right',
    carouselCard: 'animate-stagger-card',
  };
  return classes[props.variant];
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
</script>
