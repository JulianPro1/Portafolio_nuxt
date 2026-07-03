<template>
  <div 
    class="w-full rounded-xl border border-white/[0.08] bg-gradient-to-br from-about-base/95 to-about-accent-dark/20 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
  >
    <div class="flex items-center justify-between pb-3 mb-4 border-b border-white/5 select-none">
      <span class="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Actividad de Contribuciones</span>
      <span class="text-[9px] text-about-pink font-semibold">{{ displayCommits }} commits</span>
    </div>
    <!-- Contribution cells grid (simulating GitHub commits) -->
    <div ref="gridRef" class="grid grid-flow-col grid-rows-7 gap-1 h-20 overflow-hidden justify-center py-0.5">
      <div 
        v-for="cell in contributions" 
        :key="cell.id"
        class="github-cell w-2.5 h-2.5 rounded-[1.5px] transition-all duration-300 hover:scale-125"
        :class="cell.color"
        :title="cell.tooltip"
      ></div>
    </div>
    <div class="flex items-center justify-between mt-4 text-[9px] text-gray-500 select-none">
      <span>Menos</span>
      <div class="flex gap-1">
        <div class="w-2 h-2 rounded-[1.5px] bg-white/10"></div>
        <div class="w-2 h-2 rounded-[1.5px] bg-about-fuchsia/20"></div>
        <div class="w-2 h-2 rounded-[1.5px] bg-about-fuchsia/45"></div>
        <div class="w-2 h-2 rounded-[1.5px] bg-about-fuchsia/70"></div>
        <div class="w-2 h-2 rounded-[1.5px] bg-about-pink/80"></div>
        <div class="w-2 h-2 rounded-[1.5px] bg-about-pink"></div>
      </div>
      <span>Más</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { gsap } from 'gsap'

interface ContributionCell {
  id: number
  color: string
  tooltip: string
}

const props = defineProps<{
  contributions: ContributionCell[]
  isActive?: boolean
}>()

const gridRef = ref<HTMLElement | null>(null)
const commitsCount = ref({ value: 0 })
const hasAnimated = ref(false)

const displayCommits = computed(() => {
  return Math.floor(commitsCount.value.value).toLocaleString('en-US')
})

const animateCard = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true

  // Animate the commits counter
  gsap.to(commitsCount.value, {
    value: 1248,
    duration: 1.5,
    ease: 'power2.out'
  })

  if (gridRef.value) {
    const cells = gridRef.value.querySelectorAll('.github-cell')
    gsap.fromTo(cells,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: {
          grid: [7, 16],
          from: 'random',
          amount: 0.6
        },
        duration: 0.5,
        ease: 'back.out(1.2)'
      }
    )
  }
}

watch(() => props.isActive, (active) => {
  if (active) {
    animateCard()
  }
}, { immediate: true })
</script>
