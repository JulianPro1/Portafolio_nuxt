<template>
  <component
    :is="tag"
    v-bind="linkProps"
    class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm hover:scale-105 active:scale-95 transition-all duration-300"
    :class="[
      gradientClass ? gradientClass : '',
      shadowClass ? shadowClass : 'dynamic-shadow'
    ]"
    :style="buttonStyle"
  >
    <slot name="icon-left">
      <Icon
        v-if="icon && iconPosition === 'left'"
        :name="icon"
        class="w-4.5 h-4.5"
      />
    </slot>

    <slot>
      <span v-if="text">{{ text }}</span>
    </slot>

    <slot name="icon-right">
      <Icon
        v-if="icon && iconPosition === 'right'"
        :name="icon"
        class="w-4.5 h-4.5"
      />
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resolveComponent } from 'vue';
import { useBackgroundStore } from '~/store';

const props = withDefaults(
  defineProps<{
    to?: string | object;
    href?: string;
    text?: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
    gradientClass?: string;
    shadowClass?: string;
  }>(),
  {
    iconPosition: 'right',
  }
);

const backgroundStore = useBackgroundStore();

// Determine the tag to render dynamically
const tag = computed(() => {
  if (props.to) {
    return resolveComponent('NuxtLink');
  }
  if (props.href) {
    return 'a';
  }
  return 'button';
});

// Determine dynamic link attributes
const linkProps = computed(() => {
  if (props.to) {
    return { to: props.to };
  }
  if (props.href) {
    return {
      href: props.href,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }
  return {};
});

// Compute dynamic inline styles using store values
const buttonStyle = computed(() => {
  const styles: Record<string, string> = {};

  if (!props.gradientClass) {
    const accent = backgroundStore.navbarAccentColor;
    const highlight = backgroundStore.navbarHighlightColor;
    styles.backgroundImage = `linear-gradient(135deg, ${accent} 0%, ${highlight} 100%)`;
  }

  if (!props.shadowClass) {
    const hsl = backgroundStore.navbarAccentColorHslComponents;
    styles['--btn-shadow'] = `0 4px 15px hsla(${hsl}, 0.35)`;
    styles['--btn-shadow-hover'] = `0 6px 20px hsla(${hsl}, 0.55)`;
  }

  return styles;
});
</script>

<style scoped>
.dynamic-shadow {
  box-shadow: var(--btn-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.dynamic-shadow:hover {
  box-shadow: var(--btn-shadow-hover);
}
</style>

