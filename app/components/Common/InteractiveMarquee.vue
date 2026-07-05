<template>
  <div class="marquee-root relative overflow-hidden">
    <div
      ref="marqueeContainer"
      class="marquee-track flex select-none overflow-x-hidden"
      :style="{
        cursor: isDragging ? 'grabbing' : 'grab',
        gap: `${gap * 4}px`,
        paddingTop: `${verticalPadding * 4}px`,
        paddingBottom: `${verticalPadding * 4}px`,
      }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <div
        v-for="(item, index) in duplicatedItems"
        :key="index"
        class="marquee-item flex-shrink-0 flex items-center pointer-events-none"
        :class="iconsOnly ? 'marquee-item--icon-only' : 'marquee-item--badge'"
        :style="iconsOnly ? {} : {
          paddingLeft: `${badgePaddingX * 4}px`,
          paddingRight: `${badgePaddingX * 4}px`,
          paddingTop: `${badgePaddingY * 4}px`,
          paddingBottom: `${badgePaddingY * 4}px`,
          gap: `${iconTextGap * 4}px`,
          background: badgeBackground,
          border: `1px solid ${borderColor}`,
          fontSize: `${textSize}rem`,
          color: textColor,
        }"
      >
        <!-- Contenedor del ícono -->
        <div
          v-if="item.icon"
          class="marquee-icon-wrap flex items-center justify-center"
          :style="iconsOnly ? {
            width: `${iconContainerSize}rem`,
            height: `${iconContainerSize}rem`,
            background: iconContainerBackground,
            border: `1px solid ${iconContainerBorder}`,
            borderRadius: iconContainerBorderRadius,
          } : {
            width: `${(iconSize + 0.4)}rem`,
            height: `${(iconSize + 0.4)}rem`,
          }"
        >
          <Icon
            :name="item.icon"
            :style="{
              width: `${iconSize}rem`,
              height: `${iconSize}rem`,
            }"
            class="marquee-icon"
          />
        </div>

        <!-- Nombre del skill -->
        <span
          v-if="!iconsOnly"
          class="marquee-label font-semibold whitespace-nowrap tracking-wide"
        >{{ item.name }}</span>

        <!-- Shimmer interno (solo en modo badge) -->
        <span v-if="!iconsOnly" class="marquee-shimmer" aria-hidden="true"></span>
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
  badgeBackground: 'linear-gradient(135deg, hsla(0, 0%, 10%, 0.85) 0%, hsla(270, 80%, 18%, 0.55) 100%)',
  borderColor: 'hsla(270, 67%, 55%, 0.35)',
  textColor: 'hsl(215, 20%, 85%)',
  fadeWidth: 80,
  fadeColor: 'hsla(267, 50%, 11%, 1)',
  baseSpeed: 0.5,
  momentumDecay: 0.92,
  momentumThreshold: 0.01,
  iconsOnly: false,
  iconContainerSize: 2.5,
  iconContainerBackground: 'hsla(270, 67%, 45%, 0.12)',
  iconContainerBorder: 'hsla(270, 67%, 55%, 0.3)',
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
/* ── Track ─────────────────────────────────────────────── */
.marquee-track {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.marquee-track::-webkit-scrollbar {
  display: none;
}

/* ── Badge item ─────────────────────────────────────────── */
.marquee-item--badge {
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.28s ease,
    border-color 0.28s ease;
}

.marquee-item--badge:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.35),
    0 0 16px hsla(270, 67%, 55%, 0.18);
}

/* ── Shimmer sweep ──────────────────────────────────────── */
.marquee-shimmer {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 255, 255, 0.06) 50%,
    transparent 70%
  );
  background-size: 200% 100%;
  background-position: -100% 0;
  pointer-events: none;
  transition: background-position 0.55s ease;
}

.marquee-item--badge:hover .marquee-shimmer {
  background-position: 200% 0;
}

/* ── Ícono en modo badge ─────────────────────────────────── */
.marquee-item--badge .marquee-icon-wrap {
  border-radius: 0.45rem;
  background: hsla(270, 67%, 55%, 0.14);
  border: 1px solid hsla(270, 67%, 55%, 0.22);
  box-shadow: 0 0 8px hsla(270, 67%, 55%, 0.1);
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.marquee-item--badge:hover .marquee-icon-wrap {
  background: hsla(270, 67%, 55%, 0.22);
  box-shadow: 0 0 14px hsla(270, 67%, 55%, 0.3);
  transform: scale(1.1) rotate(-3deg);
}

/* ── Ícono SVG ──────────────────────────────────────────── */
.marquee-icon {
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 0 3px hsla(270, 67%, 70%, 0.15));
}

.marquee-item--badge:hover .marquee-icon {
  transform: scale(1.15);
  filter: drop-shadow(0 0 6px hsla(270, 67%, 70%, 0.45));
}

/* ── Label ──────────────────────────────────────────────── */
.marquee-label {
  background: linear-gradient(
    135deg,
    hsl(215, 20%, 92%) 0%,
    hsl(270, 20%, 80%) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: filter 0.25s ease;
}

.marquee-item--badge:hover .marquee-label {
  filter: brightness(1.2);
}

/* ── Icon-only mode ─────────────────────────────────────── */
.marquee-item--icon-only {
  transition:
    transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
    filter 0.25s ease;
}

.marquee-item--icon-only:hover {
  transform: translateY(-3px) scale(1.1);
  filter: drop-shadow(0 4px 12px hsla(270, 67%, 55%, 0.4));
}

.marquee-item--icon-only .marquee-icon-wrap {
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.marquee-item--icon-only:hover .marquee-icon-wrap {
  background: hsla(270, 67%, 55%, 0.2) !important;
  box-shadow: 0 0 16px hsla(270, 67%, 55%, 0.35);
  border-color: hsla(270, 67%, 65%, 0.5) !important;
}

.marquee-item--icon-only:hover .marquee-icon {
  transform: scale(1.12);
  filter: drop-shadow(0 0 5px hsla(270, 67%, 70%, 0.5));
}

</style>
