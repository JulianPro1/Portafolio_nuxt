<template>
  <div
    class="group relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-950 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-1 hover:border-[color:var(--category-accent)] h-full"
    :class="[
      variant === 'large' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
    ]"
  >
    <!-- Etiqueta del proyecto -->
    <div
      class="absolute z-20 rounded-lg transition-transform duration-300 will-change-transform group-hover:scale-[1.02]"
      :class="variant === 'large' ? 'top-4 left-4' : 'top-3 left-3'"
    >
      <span
        class="rounded-full text-xs font-semibold tracking-wide"
        :class="[
          variant === 'large' ? 'px-3 py-1.5' : 'px-2 py-1',
          'bg-white/10 border border-white/20 text-white/90'
        ]"
      >
        {{ project.category }}
      </span>
    </div>

    <!-- Badge de estado -->
    <div
      class="absolute z-20 rounded-lg transition-transform duration-300 will-change-transform group-hover:scale-[1.02]"
      :class="variant === 'large' ? 'top-4 right-4' : 'top-3 right-3'"
    >
      <span
        class="inline-flex items-center rounded-full text-xs font-semibold tracking-wide"
        :class="[
          variant === 'large' ? 'px-3 py-1.5' : 'px-2 py-1'
        ]"
        :style="`background: var(--category-accent); color: white; box-shadow: 0 4px 12px color-mix(in srgb, var(--category-accent) 40%, transparent); border: 1px solid rgba(255,255,255,0.2)`"
      >
        <Icon :name="badgeConfig.icon" class="w-3 h-3 mr-1" />
        {{ badgeConfig.text }}
      </span>
    </div>

    <!-- Indicador Live URL -->
    <div
      v-if="project.liveUrl"
      class="absolute z-20 top-4 left-1/2 -translate-x-1/2 transition-transform duration-300 will-change-transform group-hover:scale-[1.02]"
      :class="variant === 'large' ? 'top-4' : 'top-3'"
    >
      <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[color:color-mix(in_srgb,var(--contact-accent)_20%,transparent)] border border-[color:var(--contact-accent)]">
        <span class="w-1.5 h-1.5 rounded-full bg-[color:var(--contact-accent)] animate-pulse"></span>
        <span class="text-[10px] font-medium text-[color:var(--contact-accent)]">Live</span>
      </span>
    </div>

    <!-- Imagen del proyecto -->
    <div
      class="relative overflow-hidden"
      :class="variant === 'large' ? 'h-64' : 'h-40'"
    >
      <div
        class="absolute inset-0 flex items-center justify-center"
        :style="`background: color-mix(in srgb, var(--category-accent) 60%, rgba(9,9,11,0.7)); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid color-mix(in srgb, var(--category-accent) 30%, transparent)`"
      >
        <img
          v-if="project.icon"
          :src="project.icon"
          :alt="project.id"
          class="object-contain transition-transform duration-300 will-change-transform group-hover:scale-110 "
          :class="variant === 'large' ? 'max-h-28 max-w-[55%]' : 'max-h-16 max-w-[55%]'"
        />
        <Icon
          v-else
          name="mdi:application-braces"
          class="text-white/60 transition-colors duration-300 group-hover:text-white/80"
          :class="variant === 'large' ? 'w-16 h-16' : 'w-10 h-10'"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
    </div>

    <!-- Contenido de la card -->
    <div
      class="absolute bottom-0 left-0 right-0 z-10 transition-[background,backdrop-filter] duration-300"
      :class="[
        variant === 'large' ? 'p-5' : 'p-4',
        isExpanded ? 'card-content-expanded' : ''
      ]"
    >
      <NuxtLink
        :to="`/project-detail/${cleanProjectId}`"
        @click="handleDetailClick"
        class="font-bold text-white mb-2 transition-[transform,colors] duration-300 will-change-transform group-hover:translate-x-1 hover:text-[var(--category-light)] cursor-pointer"
        :class="[
          variant === 'large' ? 'text-xl' : 'text-sm'
        ]"
      >
        {{ project.title }}
      </NuxtLink>
      <div :class="variant === 'large' ? 'mb-4' : 'mb-3'">
        <!-- Contenedor scrolleable al expandirse -->
        <div
          ref="wrapperRef"
          class="desc-scroll-wrapper"
          :class="[isScrollReady ? 'desc-scroll-ready' : '']"
        >
          <p
            ref="descRef"
            class="text-global-text-muted leading-relaxed"
            :class="[
              variant === 'large' ? 'text-xs' : 'text-[11px]',
              showFullText ? '' : 'line-clamp-2'
            ]"
          >
            {{ project.description }}
          </p>
        </div>
        <button
          v-if="isClamped"
          class="ver-mas-btn mt-1.5 text-[10px] font-semibold tracking-wide transition-colors duration-200"
          :style="`color: var(--category-light)`"
          @click.stop="toggleExpand"
        >
          {{ isExpanded ? 'ver menos ↑' : 'ver más ↓' }}
        </button>
      </div>

      <!-- Enlaces del proyecto -->
      <div class="flex items-center justify-end">
        <NuxtLink
          :to="`/project-detail/${cleanProjectId}`"
          @click="handleDetailClick"
          class="text-md font-medium flex items-center gap-1.5 transition-[transform,colors] duration-300 will-change-transform hover:translate-x-1 text-white hover:text-[var(--category-light)]"
        >
          <Icon name="mdi:arrow-right" class="w-3 h-3" />
          Ver detalles
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { useScrollStore } from '~/store'

const scrollStore = useScrollStore()

function handleDetailClick() {
  if (import.meta.client) {
    // Intentar obtener la categoría desde la sección padre o desde el objeto project
    const activeTab = props.project.categories?.[0] || 'destacados'
    scrollStore.saveScrollState(window.scrollY, activeTab, props.project.id)
  }
}
import type { BadgeConfig, ColorScheme, LinksConfig } from '~/types/projects'

const props = defineProps<{
  project: any
  variant: 'large' | 'medium' | 'small'
  badgeConfig: BadgeConfig
  colorScheme: ColorScheme
  linksConfig: LinksConfig
}>()

const cleanProjectId = computed(() => {
  if (!props.project?.id) return ''
  // Si el id es una ruta como 'projects/projects/changan.md' o 'projects/changan.md', extraer solo 'changan'
  return props.project.id.split('/').pop()?.replace('.md', '') || props.project.id
})

const isExpanded = ref(false)
const showFullText = ref(false)   // delayed so line-clamp fades with the container
const isScrollReady = ref(false)  // activated only after transition ends to avoid scrollbar flash
const isClamped = ref(false)
const isAnimating = ref(false)    // debounce: blocks new toggles while animation runs
const descRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)

// Max expanded height in px (~5 lines). Content taller than this will scroll.
const MAX_EXPANDED_HEIGHT = 128 // ~8em at 16px base

function toggleExpand() {
  const el = wrapperRef.value
  if (!el || isAnimating.value) return  // debounce: ignore while animating

  isAnimating.value = true

  if (!isExpanded.value) {
    // Reveal text first so GSAP can read the real scrollHeight
    isExpanded.value = true
    showFullText.value = true
    isScrollReady.value = false

    // Measure real content height with line-clamp removed
    const realHeight = descRef.value?.scrollHeight ?? MAX_EXPANDED_HEIGHT
    const targetHeight = Math.min(realHeight, MAX_EXPANDED_HEIGHT)
    const willScroll = realHeight > MAX_EXPANDED_HEIGHT

    gsap.fromTo(
      el,
      { height: el.offsetHeight },
      {
        height: targetHeight,
        duration: 0.42,
        ease: 'power2.out',
        onComplete: () => {
          // Enable scroll only when content exceeds the cap
          if (willScroll) isScrollReady.value = true
          isAnimating.value = false
        }
      }
    )
  } else {
    // Closing: apply line-clamp IMMEDIATELY to avoid layout shift at animation end
    showFullText.value = false
    isScrollReady.value = false
    const currentHeight = el.offsetHeight

    // Re-compute just before collapsing to account for any breakpoint/font change
    COLLAPSED_HEIGHT = computeCollapsedHeight()
    el.style.setProperty('--collapsed-h', `${COLLAPSED_HEIGHT}px`)

    gsap.fromTo(
      el,
      { height: currentHeight },
      {
        height: COLLAPSED_HEIGHT,
        duration: 0.38,
        ease: 'power2.inOut',
        onComplete: () => {
          isExpanded.value = false
          // Clear inline height so CSS takes over again
          gsap.set(el, { clearProps: 'height' })
          isAnimating.value = false
        }
      }
    )
  }
}

function checkClamped() {
  if (!descRef.value) return
  // Temporarily remove clamp to get the real scrollHeight
  const el = descRef.value
  el.style.webkitLineClamp = 'unset'
  el.style.overflow = 'visible'
  const fullHeight = el.scrollHeight
  el.style.webkitLineClamp = ''
  el.style.overflow = ''
  // Compare against 2-line height (lineHeight * 2)
  const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
  const maxHeight = lineHeight * 2
  isClamped.value = fullHeight > maxHeight + 2 // +2px tolerance
}

let _observer: ResizeObserver | null = null

/** Computes and stores the real 2-line height from the paragraph's lineHeight */
function computeCollapsedHeight(): number {
  if (!descRef.value) return 40 // safe fallback
  const lh = parseFloat(getComputedStyle(descRef.value).lineHeight)
  // lineHeight may be 'normal' → fallback to fontSize * 1.5
  const lineHeight = isNaN(lh)
    ? parseFloat(getComputedStyle(descRef.value).fontSize) * 1.5
    : lh
  return Math.ceil(lineHeight * 2)
}

// Collapsed height in pixels (~2 lines). Re-computed dynamically to stay in sync across breakpoints.
let COLLAPSED_HEIGHT = 0 // 0 = unset; resolved on mount and before each collapse

onMounted(() => {
  nextTick(() => {
    if (wrapperRef.value) {
      // Compute from real lineHeight so it stays in sync at every breakpoint
      COLLAPSED_HEIGHT = computeCollapsedHeight()
      // Sync the CSS custom property so CSS height matches JS value exactly
      wrapperRef.value.style.setProperty('--collapsed-h', `${COLLAPSED_HEIGHT}px`)
    }
    checkClamped()
    if (typeof ResizeObserver !== 'undefined' && descRef.value) {
      _observer = new ResizeObserver(() => {
        checkClamped()
        // Re-sync collapsed height when font/layout changes (e.g. orientation change)
        if (!isExpanded.value && wrapperRef.value) {
          COLLAPSED_HEIGHT = computeCollapsedHeight()
          wrapperRef.value.style.setProperty('--collapsed-h', `${COLLAPSED_HEIGHT}px`)
        }
      })
      _observer.observe(descRef.value)
    }
    // Fallback for desktop where grid layout settles slightly later
    setTimeout(() => {
      checkClamped()
      if (!isExpanded.value && wrapperRef.value) {
        COLLAPSED_HEIGHT = computeCollapsedHeight()
        wrapperRef.value.style.setProperty('--collapsed-h', `${COLLAPSED_HEIGHT}px`)
      }
    }, 150)
  })
})

onUnmounted(() => {
  _observer?.disconnect()
  gsap.killTweensOf(wrapperRef.value)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Fondo oscuro sólido cuando el texto está expandido */
/* La transición se define en el elemento padre (inline class) */
[class~="card-content-expanded"],
.card-content-expanded {
  background: linear-gradient(
    to top,
    rgba(9, 9, 11, 0.98) 0%,
    rgba(9, 9, 11, 0.95) 70%,
    rgba(9, 9, 11, 0.85) 100%
  ) !important;
  backdrop-filter: blur(4px) !important;
  -webkit-backdrop-filter: blur(4px) !important;
  transition:
    background 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    backdrop-filter 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Contenedor — GSAP controla height via JS, CSS sólo define el estado inicial.
   --collapsed-h se inyecta por JS en onMounted y antes de cada cierre,
   garantizando que CSS y GSAP usen exactamente el mismo valor de píxeles. */
.desc-scroll-wrapper {
  overflow: hidden;
  height: var(--collapsed-h, 3.2em);
  overscroll-behavior: contain;
}

/* Scroll habilitado sólo DESPUÉS de que la animación GSAP termina (evita flash de scrollbar) */
.desc-scroll-wrapper.desc-scroll-ready {
  overflow-y: auto;
}

/* Scrollbar sutil */
.desc-scroll-wrapper.desc-expanded::-webkit-scrollbar {
  width: 3px;
}

.desc-scroll-wrapper.desc-expanded::-webkit-scrollbar-track {
  background: transparent;
}

.desc-scroll-wrapper.desc-expanded::-webkit-scrollbar-thumb {
  background: var(--category-accent, rgba(255, 255, 255, 0.2));
  border-radius: 99px;
}

.ver-mas-btn {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.85;
  letter-spacing: 0.04em;
}

.ver-mas-btn:hover {
  opacity: 1;
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
