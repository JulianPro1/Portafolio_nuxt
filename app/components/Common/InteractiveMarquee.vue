<template>
  <div class="relative overflow-hidden">
    <!-- Degradado izquierdo -->
    <div
      class="absolute left-0 top-0 bottom-0 pointer-events-none z-20"
      :style="{
        width: `${fadeWidth}px`,
        background: `linear-gradient(to right, ${fadeColor}, transparent)`
      }"
    ></div>
    <!-- Degradado derecho -->
    <div
      class="absolute right-0 top-0 bottom-0 pointer-events-none z-20"
      :style="{
        width: `${fadeWidth}px`,
        background: `linear-gradient(to left, ${fadeColor}, transparent)`
      }"
    ></div>

    <div
      ref="marqueeContainer"
      class="flex select-none"
      :class="[
        `gap-${gap}`,
        `py-${verticalPadding}`,
        'overflow-x-hidden'
      ]"
      :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <div
        v-for="(item, index) in duplicatedItems"
        :key="index"
        class="flex-shrink-0 flex items-center gap-2 pointer-events-none group"
        :class="[
          iconsOnly ? '' : [
            `px-${badgePaddingX}`,
            `py-${badgePaddingY}`,
            `gap-${iconTextGap}`,
            badgeBorderRadius,
            'transition-all duration-300 hover:scale-105'
          ]
        ]"
        :style="iconsOnly ? {} : {
          background: badgeBackground,
          border: `1px solid ${borderColor}`,
          fontSize: `${textSize}rem`,
          color: textColor,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }"
      >
        <div
          v-if="item.icon"
          class="flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
          :class="[
            iconsOnly ? iconContainerBorderRadius : ''
          ]"
          :style="iconsOnly ? {
            width: `${iconContainerSize}rem`,
            height: `${iconContainerSize}rem`,
            background: iconContainerBackground,
            border: `1px solid ${iconContainerBorder}`,
            borderRadius: iconContainerBorderRadius
          } : {}"
        >
          <Icon
            :name="item.icon"
            :style="{
              width: `${iconSize}rem`,
              height: `${iconSize}rem`
            }"
            class="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <span v-if="!iconsOnly" class="font-medium whitespace-nowrap">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useInteractiveMarquee } from '~/composables/useInteractiveMarquee';

interface MarqueeItem {
  name: string;
  icon?: string;
}

interface Props {
  items: MarqueeItem[];
  gap?: number;
  verticalPadding?: number;
  badgePaddingX?: number;
  badgePaddingY?: number;
  iconTextGap?: number;
  iconSize?: number;
  textSize?: number;
  badgeBorderRadius?: string;
  badgeBackground?: string;
  borderColor?: string;
  textColor?: string;
  fadeWidth?: number;
  fadeColor?: string;
  baseSpeed?: number;
  momentumDecay?: number;
  momentumThreshold?: number;
  iconsOnly?: boolean;
  iconContainerSize?: number;
  iconContainerBackground?: string;
  iconContainerBorder?: string;
  iconContainerBorderRadius?: string;
}

const props = withDefaults(defineProps<Props>(), {
  gap: 3,
  verticalPadding: 1,
  badgePaddingX: 4,
  badgePaddingY: 2.5,
  iconTextGap: 2.5,
  iconSize: 1.5,
  textSize: 0.875,
  badgeBorderRadius: '0.75rem',
  badgeBackground: 'linear-gradient(to bottom right, hsla(0, 0%, 7%, 0.8), hsla(270, 100%, 14%, 0.4))',
  borderColor: 'hsla(270, 67%, 45%, 0.3)',
  textColor: 'hsl(215, 16%, 77%)',
  fadeWidth: 64,
  fadeColor: 'hsla(267, 50%, 11%, 1)',
  baseSpeed: 0.5,
  momentumDecay: 0.92,
  momentumThreshold: 0.01,
  iconsOnly: false,
  iconContainerSize: 2.5,
  iconContainerBackground: 'hsla(270, 67%, 45%, 0.1)',
  iconContainerBorder: 'hsla(270, 67%, 45%, 0.3)',
  iconContainerBorderRadius: '0.5rem',
});

const duplicatedItems = computed(() => [...props.items, ...props.items]);

const {
  marqueeContainer,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
} = useInteractiveMarquee({
  baseSpeed: props.baseSpeed,
  momentumDecay: props.momentumDecay,
  momentumThreshold: props.momentumThreshold,
});
</script>

<style scoped>
.overflow-x-hidden {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-x-hidden::-webkit-scrollbar {
  display: none;
}
</style>
