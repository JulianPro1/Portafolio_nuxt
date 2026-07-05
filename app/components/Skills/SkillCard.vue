<template>
  <div
    ref="cardRef"
    class="group relative overflow-hidden bg-gradient-to-br rounded-2xl border border-skills-base p-6 cursor-pointer transition-all duration-300 ease-out hover:border-skills-accent"
    :class="[
      isHighlighted ? 'md:col-span-2 shadow-[0_0_30px_rgba(20,184,166,0.05)]' : 'md:col-span-1 shadow-[0_0_15px_rgba(20,184,166,0.02)]'
    ]"
    style="transform-style: preserve-3d;"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="$emit('select', skill)"
  >
    <!-- Brillo interactivo siguiendo al cursor -->
    <div
      class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"
      :style="glowStyle"
    ></div>

    <!-- Contenido -->
    <div class="relative z-10 flex flex-col h-full justify-between">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div
            ref="iconWrapperRef"
            class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-skills-accent/20 to-skills-accent-light/20 border border-skills-accent text-skills-accent transition-all duration-300"
          >
            <Icon :name="skill.icon" class="w-6 h-6" />
          </div>
        </div>

        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-skills-accent-light transition-colors duration-300 flex items-center gap-2">
          {{ skill.title }}
        </h3>
        
        <p class="text-gray-300 text-sm mb-6 leading-relaxed">
          {{ skill.shortDescription || skill.description }}
        </p>
      </div>

      <div>
        <!-- Tags y Acción de Ver Detalles -->
        <div class="flex items-end justify-between mt-4">
          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 max-w-[70%]">
            <span
              v-for="tag in skill.tags"
              :key="tag"
              class="px-2 py-1 rounded-md text-[10px] uppercase font-semibold tracking-wider border border-skills-accent text-skills-accent-light bg-skills-accent/5 transition-colors duration-300 group-hover:bg-skills-accent/10"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Acción Interactiva (Opción 3) -->
          <div class="flex items-center gap-1 text-xs font-semibold text-skills-accent-light opacity-100 md:opacity-0 translate-x-0 md:translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300 pb-1">
            <span>Detalles</span>
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { gsap } from 'gsap'
import type { Skill } from '@/types'

const props = defineProps<{
  skill: Skill
  isHighlighted?: boolean
}>()

defineEmits<{
  (e: 'select', skill: Skill): void
}>()

const cardRef = ref<HTMLElement | null>(null)
const iconWrapperRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)

// Coordenadas del ratón para el efecto de brillo
const mouseX = ref(0)
const mouseY = ref(0)

const glowStyle = computed(() => {
  return {
    background: `radial-gradient(600px circle at ${mouseX.value}px ${mouseY.value}px, rgba(20, 184, 166, 0.15), transparent 40%)`
  }
})

const onMouseMove = (event: MouseEvent) => {
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return

  const card = cardRef.value
  if (!card) return

  const rect = card.getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top

  if (!isHovered.value) return

  const xc = mouseX.value / rect.width - 0.5
  const yc = mouseY.value / rect.height - 0.5
  
  const maxTilt = props.isHighlighted ? 4 : 8

  gsap.to(card, {
    rotateX: -yc * maxTilt,
    rotateY: xc * maxTilt,
    transformPerspective: 800,
    ease: 'power1.out',
    duration: 0.3,
    overwrite: 'auto'
  })
}

const onMouseEnter = () => {
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return
  isHovered.value = true
  const card = cardRef.value
  const iconWrapper = iconWrapperRef.value

  if (card) {
    gsap.killTweensOf(card)
    gsap.set(card, { willChange: 'transform, box-shadow' })
    gsap.to(card, {
      scale: 1.01,
      boxShadow: '0 10px 30px -10px rgba(20, 184, 166, 0.25)',
      ease: 'power2.out',
      duration: 0.3
    })
  }

  if (iconWrapper) {
    gsap.killTweensOf(iconWrapper)
    gsap.set(iconWrapper, { willChange: 'transform' })
    gsap.to(iconWrapper, {
      scale: 1.1,
      rotate: 5,
      ease: 'back.out(1.5)',
      duration: 0.4
    })
  }
}

const onMouseLeave = () => {
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return
  isHovered.value = false
  const card = cardRef.value
  const iconWrapper = iconWrapperRef.value

  if (card) {
    gsap.killTweensOf(card)
    gsap.to(card, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: '0 0px 0px 0px rgba(0, 0, 0, 0)',
      ease: 'power2.out',
      duration: 0.4,
      clearProps: 'transform,box-shadow',
      onComplete: () => gsap.set(card, { willChange: 'auto' })
    })
  }

  if (iconWrapper) {
    gsap.killTweensOf(iconWrapper)
    gsap.to(iconWrapper, {
      scale: 1,
      rotate: 0,
      ease: 'power2.out',
      duration: 0.4,
      clearProps: 'transform',
      onComplete: () => gsap.set(iconWrapper, { willChange: 'auto' })
    })
  }
}
</script>
