<template>
  <div 
    ref="terminalRef"
    class="w-full font-mono text-xs rounded-xl border border-white/[0.08] bg-gradient-to-br from-about-base/95 to-about-accent-dark/20 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
  >
    <div class="flex items-center justify-between pb-3 border-b border-white/5 mb-4 select-none">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80"></span>
      </div>
      <span class="text-[10px] text-gray-500 font-medium tracking-wide">iujo-terminal</span>
      <span class="w-4"></span>
    </div>
    <div class="space-y-3 text-[10px] text-gray-300">
      <div class="terminal-line flex items-center gap-1.5">
        <span class="text-about-pink font-semibold">$</span>
        <span>iujo run build --project="tesis-grado"</span>
      </div>
      <div class="text-gray-400 pl-3 border-l border-about-pink/20 space-y-1.5 py-0.5">
        <div class="terminal-line">ℹ [1/3] Cargando módulos de informática...</div>
        <div class="terminal-line">ℹ [2/3] Resolviendo dependencias de bases de datos...</div>
        <div class="terminal-line text-emerald-400 flex items-center gap-1">
          <span>✔</span>
          <span>[3/3] Proyecto de Grado compilado con éxito.</span>
        </div>
      </div>
      <div class="terminal-line pt-1 text-about-fuchsia font-bold">
        🎓 Grado: TSU en Informática
      </div>
      <div class="terminal-line text-gray-500 text-[9px]">
        Barquisimeto, Venezuela 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
  isActive?: boolean
}>()

const terminalRef = ref<HTMLElement | null>(null)
const hasAnimated = ref(false)

const runAnimation = () => {
  if (hasAnimated.value || !terminalRef.value) return
  hasAnimated.value = true

  const lines = terminalRef.value.querySelectorAll('.terminal-line')
  
  // Set initial state: hide all lines
  gsap.set(lines, { opacity: 0, x: -10 })

  const tl = gsap.timeline()

  lines.forEach((line, index) => {
    let delay = 0.12
    let duration = 0.22
    let ease = 'power2.out'

    if (index === 0) {
      delay = 0.05
      duration = 0.3
    } else if (index === 4) {
      // The graduation line pops in with back ease
      delay = 0.2
      duration = 0.35
      ease = 'back.out(1.5)'
    }

    tl.to(line, {
      opacity: 1,
      x: 0,
      duration: duration,
      ease: ease
    }, `+=${delay}`)
  })
}

watch(() => props.isActive, (active) => {
  if (active) {
    runAnimation()
  }
}, { immediate: true })
</script>
