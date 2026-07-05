<template>
  <div class="hidden md:block relative md:col-start-2 md:col-end-3 h-full">
    <svg ref="svgRef" class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <!-- Desktop Lines -->
      <g data-group="desktop" class="hidden md:block">
        <line
          v-if="config.desktop.line"
          v-bind="config.desktop.line"
          stroke-width="3.5"
          :stroke="isActive ? 'var(--about-fuchsia)' : 'rgba(75, 85, 99, 0.25)'"
        />
        <path
          v-for="(path, idx) in config.desktop.paths"
          :key="'d-path-' + idx"
          v-bind="path"
          stroke-width="3.5"
          fill="none"
          :stroke="isActive ? config.curveColor : 'rgba(75, 85, 99, 0.25)'"
        />
      </g>
      <!-- Mobile Lines -->
      <g data-group="mobile" class="block md:hidden">
        <line
          v-if="config.mobile.line"
          v-bind="config.mobile.line"
          stroke-width="3.5"
          :stroke="isActive ? 'var(--about-fuchsia)' : 'rgba(75, 85, 99, 0.25)'"
        />
        <path
          v-for="(path, idx) in config.mobile.paths"
          :key="'m-path-' + idx"
          v-bind="path"
          stroke-width="3.5"
          fill="none"
          :stroke="isActive ? config.curveColor : 'rgba(75, 85, 99, 0.25)'"
        />
      </g>
    </svg>

    <!-- Commit Node -->
    <div
      class="step-node absolute w-5 h-5 rounded-full border-2 transition-all duration-700 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer z-10"
      :class="[
        isActive
          ? `border-white ${config.nodeBgClass}`
          : 'border-gray-700 bg-gray-950 text-gray-700'
      ]"
      :style="[
        { left: leftPosition, top: '32px' },
        isActive ? { boxShadow: `0 0 15px ${config.nodeColor}` } : {}
      ]"
    >
      <span
        v-if="activeStep === stepIndex"
        class="absolute inset-0 rounded-full animate-ping opacity-60"
        :class="config.nodeBgClass"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useNuxtApp } from '#app'

const props = defineProps({
  stepIndex: {
    type: Number,
    required: true
  },
  activeStep: {
    type: Number,
    default: null
  },
  isDesktop: {
    type: Boolean,
    default: false
  }
})

// Configuration for each step's layout and colors
const stepConfigs = {
  0: {
    curveColor: 'var(--about-fuchsia)',
    nodeColor: 'var(--about-fuchsia)',
    nodeBgClass: 'bg-about-fuchsia',
    alwaysRightNode: false,
    desktop: {
      line: null,
      paths: [{ d: 'M 0 32 C 25 32, 50 60, 50 100' }]
    },
    mobile: {
      line: null,
      paths: [{ d: 'M 100 32 C 75 32, 25 60, 25 100' }]
    }
  },
  1: {
    curveColor: 'var(--about-accent-light)',
    nodeColor: 'var(--about-accent-light)',
    nodeBgClass: 'bg-about-accent-light',
    alwaysRightNode: true,
    desktop: {
      line: { x1: '50', y1: '0', x2: '50', y2: '100' },
      paths: [
        { d: 'M 50 0 C 50 15, 75 32, 100 32' },
        { d: 'M 100 32 C 75 32, 50 85, 50 100' }
      ]
    },
    mobile: {
      line: { x1: '25', y1: '0', x2: '25', y2: '100' },
      paths: [
        { d: 'M 25 0 C 25 15, 75 32, 100 32' },
        { d: 'M 100 32 C 75 32, 25 85, 25 100' }
      ]
    }
  },
  2: {
    curveColor: 'var(--about-accent-light)',
    nodeColor: 'var(--about-accent-light)',
    nodeBgClass: 'bg-about-accent-light',
    alwaysRightNode: false,
    desktop: {
      line: { x1: '50', y1: '0', x2: '50', y2: '100' },
      paths: [
        { d: 'M 50 0 C 50 15, 25 32, 0 32' },
        { d: 'M 0 32 C 25 32, 50 85, 50 100' }
      ]
    },
    mobile: {
      line: { x1: '25', y1: '0', x2: '25', y2: '100' },
      paths: [
        { d: 'M 25 0 C 25 15, 75 32, 100 32' },
        { d: 'M 100 32 C 75 32, 25 85, 25 100' }
      ]
    }
  },
  3: {
    curveColor: 'var(--about-pink)',
    nodeColor: 'var(--about-pink)',
    nodeBgClass: 'bg-about-pink',
    alwaysRightNode: true,
    desktop: {
      line: { x1: '50', y1: '0', x2: '50', y2: '100' },
      paths: [
        { d: 'M 50 0 C 50 15, 75 32, 100 32' },
        { d: 'M 100 32 C 75 32, 50 85, 50 100' }
      ]
    },
    mobile: {
      line: { x1: '25', y1: '0', x2: '25', y2: '100' },
      paths: [
        { d: 'M 25 0 C 25 15, 75 32, 100 32' },
        { d: 'M 100 32 C 75 32, 25 85, 25 100' }
      ]
    }
  },
  4: {
    curveColor: 'var(--about-accent-light)',
    nodeColor: 'var(--about-accent-light)',
    nodeBgClass: 'bg-about-accent-light',
    alwaysRightNode: false,
    desktop: {
      line: null,
      paths: [{ d: 'M 50 0 C 50 15, 25 32, 0 32' }]
    },
    mobile: {
      line: null,
      paths: [{ d: 'M 25 0 C 25 15, 75 32, 100 32' }]
    }
  }
}

const config = computed(() => stepConfigs[props.stepIndex] || stepConfigs[0])

const isActive = computed(() => props.activeStep !== null && props.activeStep >= props.stepIndex)

const leftPosition = computed(() => {
  if (props.activeStep === null) return '0%'
  if (config.value.alwaysRightNode) return '100%'
  return props.isDesktop ? '0%' : '100%'
})

// ─── GSAP Draw Animation ────────────────────────────────────────────────────
const svgRef = ref(null)
const { $gsap: gsap } = useNuxtApp()
let drawTimeline = null

/**
 * Returns the strokes from the visible group (desktop or mobile)
 * based on the current viewport width.
 */
const getVisibleStrokes = () => {
  if (!svgRef.value) return []
  const isMd = typeof window !== 'undefined' && window.innerWidth >= 768
  const group = svgRef.value.querySelector(
    isMd ? '[data-group="desktop"]' : '[data-group="mobile"]'
  )
  if (!group) return []
  return Array.from(group.querySelectorAll('line, path'))
}

/**
 * Set all visible strokes to fully "invisible" state (dashoffset = length)
 * without any animation, so they start hidden before the draw effect.
 */
const hideAllStrokes = () => {
  if (!gsap) return
  getVisibleStrokes().forEach(el => {
    try {
      const length = el.getTotalLength()
      if (length > 0) {
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })
      }
    } catch (_) {}
  })
}

/**
 * Animate each stroke being "drawn" sequentially — like a pen tracing the path.
 */
const playDraw = () => {
  if (!gsap || !svgRef.value) return
  if (drawTimeline) { drawTimeline.kill(); drawTimeline = null }

  const strokes = getVisibleStrokes()
  if (!strokes.length) return

  // Prepare: ensure dasharray is set to each stroke's total length
  strokes.forEach(el => {
    try {
      const length = el.getTotalLength()
      if (length > 0) {
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })
      }
    } catch (_) {}
  })

  // Build a sequential timeline — each segment draws one after the other
  // with a small overlap for a fluid, continuous feel
  drawTimeline = gsap.timeline()
  strokes.forEach((el, i) => {
    try {
      drawTimeline.to(
        el,
        {
          strokeDashoffset: 0,
          duration: 0.45,
          ease: 'power2.inOut'
        },
        // First element at t=0; subsequent ones start 0.2s after the previous begins
        i === 0 ? 0 : `>-0.2`
      )
    } catch (_) {}
  })
}

/**
 * Animate strokes back to invisible — used when the step becomes inactive.
 */
const resetDraw = () => {
  if (!gsap || !svgRef.value) return
  if (drawTimeline) { drawTimeline.kill(); drawTimeline = null }

  const strokes = getVisibleStrokes()
  strokes.forEach(el => {
    try {
      const length = el.getTotalLength()
      if (length > 0) {
        gsap.to(el, {
          strokeDashoffset: length,
          duration: 0.25,
          ease: 'power2.in'
        })
      }
    } catch (_) {}
  })
}

onMounted(async () => {
  // Wait for Vue to render the SVG paths into the DOM
  await nextTick()
  hideAllStrokes()

  // If this step is already active on mount (e.g. step 0 is always active at start),
  // trigger the draw immediately
  if (isActive.value) {
    playDraw()
  }
})

onUnmounted(() => {
  if (drawTimeline) { drawTimeline.kill(); drawTimeline = null }
})

watch(isActive, (active) => {
  if (active) playDraw()
  else resetDraw()
})
</script>
