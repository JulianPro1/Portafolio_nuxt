<template>
  <a
    ref="cardRef"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="group relative flex items-center gap-4 p-4 rounded-xl border border-contact-accent hover:border-contact-accent/40 bg-contact-accent/5 hover:bg-contact-accent/10 shadow-[0_0_15px_rgba(34,197,94,0.02)] hover:shadow-[0_8px_20px_rgba(34,197,94,0.1)] transition-all duration-300 ease-out"
    style="--accent-color: var(--contact-accent); --accent-light: var(--contact-accent-light); --accent-dark: var(--contact-accent-dark); will-change: transform, box-shadow, border-color, background-color;"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      ref="iconWrapperRef"
      class="flex items-center justify-center w-12 h-12 rounded-xl bg-contact-accent/20 group-hover:bg-contact-accent/30 text-contact-accent transition-colors duration-300 ease-out"
      style="will-change: transform;"
    >
      <Icon :name="icon" class="w-6 h-6" />
    </div>
    <div>
      <h3 class="text-sm font-semibold text-white">{{ title }}</h3>
      <p class="text-xs text-gray-400 mt-0.5">{{ description }}</p>
    </div>
    <div ref="arrowRef" class="ml-auto flex items-center justify-center text-gray-500 group-hover:text-contact-accent transition-colors duration-300 ease-out" style="will-change: transform;">
      <Icon name="mdi:arrow-right" class="w-5 h-5" />
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

defineProps<{
  href: string
  icon: string
  title: string
  description: string
  external?: boolean
}>()

const cardRef = ref<HTMLElement | null>(null)
const iconWrapperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

const isHovered = ref(false)

// 3D Tilt Effect on Mouse Move (only active if hovered)
const onMouseMove = (event: MouseEvent) => {
  if (!isHovered.value) return
  const card = cardRef.value
  if (!card) return
  
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const xc = x / rect.width - 0.5
  const yc = y / rect.height - 0.5
  
  const maxTilt = 8
  
  gsap.to(card, {
    rotateX: -yc * maxTilt,
    rotateY: xc * maxTilt,
    transformPerspective: 600,
    ease: 'power1.out',
    duration: 0.3,
    overwrite: 'auto'
  })
}

// Mouse Enter: Scale card, scale & rotate icon, shift arrow
const onMouseEnter = () => {
  isHovered.value = true
  const card = cardRef.value
  const iconWrapper = iconWrapperRef.value
  const arrow = arrowRef.value
  
  if (card) {
    gsap.killTweensOf(card)
    gsap.to(card, {
      scale: 1.02,
      ease: 'power2.out',
      duration: 0.3
    })
  }
  
  if (iconWrapper) {
    gsap.killTweensOf(iconWrapper)
    gsap.to(iconWrapper, {
      scale: 1.12,
      rotate: 8,
      ease: 'back.out(2)',
      duration: 0.4
    })
  }
  
  if (arrow) {
    gsap.killTweensOf(arrow)
    gsap.to(arrow, {
      x: 6,
      ease: 'power2.out',
      duration: 0.3
    })
  }
}

// Mouse Leave: Return smoothly to base state and clear styles
const onMouseLeave = () => {
  isHovered.value = false
  const card = cardRef.value
  const iconWrapper = iconWrapperRef.value
  const arrow = arrowRef.value
  
  if (card) {
    gsap.killTweensOf(card)
    gsap.to(card, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      duration: 0.4,
      clearProps: 'transform'
    })
  }
  
  if (iconWrapper) {
    gsap.killTweensOf(iconWrapper)
    gsap.to(iconWrapper, {
      scale: 1,
      rotate: 0,
      ease: 'power2.out',
      duration: 0.4,
      clearProps: 'transform'
    })
  }
  
  if (arrow) {
    gsap.killTweensOf(arrow)
    gsap.to(arrow, {
      x: 0,
      ease: 'power2.out',
      duration: 0.4,
      clearProps: 'transform'
    })
  }
}
</script>

