<template>
  <div 
    ref="cardRef"
    class="w-full font-mono text-xs rounded-xl border border-white/[0.08] hover:border-about-fuchsia/40 bg-gradient-to-br from-about-base/95 to-about-accent-dark/20 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(217,70,239,0.08)] transition-all duration-500"
  >
    <!-- Cabecera de la ventana -->
    <div class="flex items-center justify-between pb-3 border-b border-white/5 mb-4 select-none">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80"></span>
      </div>
      <span class="text-[10px] text-gray-500 font-medium tracking-wide">developer.json</span>
      <span class="w-4"></span>
    </div>
    <!-- Contenido JSON -->
    <div class="text-[11px] leading-relaxed text-gray-300 flex flex-col gap-0.5">
      <div class="json-line-wrapper inline-block whitespace-nowrap overflow-hidden border-r-2 border-transparent pr-1">
        <span class="text-about-fuchsia">{</span>
      </div>
      <div class="pl-4 flex flex-col gap-0.5">
        <div class="json-line-wrapper inline-block whitespace-nowrap overflow-hidden border-r-2 border-transparent pr-1">
          <span class="text-about-pink">"name"</span>: <span class="text-emerald-400">"Julian"</span>,
        </div>
        <div class="json-line-wrapper inline-block whitespace-nowrap overflow-hidden border-r-2 border-transparent pr-1">
          <span class="text-about-pink">"role"</span>: <span class="text-emerald-400">"Frontend Developer"</span>,
        </div>
        <div class="json-line-wrapper inline-block whitespace-nowrap overflow-hidden border-r-2 border-transparent pr-1">
          <span class="text-about-pink">"location"</span>: <span class="text-emerald-400">"Venezuela"</span>,
        </div>
        <div class="json-line-wrapper inline-block whitespace-nowrap overflow-hidden border-r-2 border-transparent pr-1">
          <span class="text-about-pink">"skills"</span>: <span class="text-about-fuchsia">[</span><span class="text-emerald-400">"Vue"</span>, <span class="text-emerald-400">"Nuxt"</span>, <span class="text-emerald-400">"TypeScript"</span><span class="text-about-fuchsia">]</span>,
        </div>
        <div class="json-line-wrapper inline-block whitespace-nowrap overflow-hidden border-r-2 border-transparent pr-1">
          <span class="text-about-pink">"status"</span>: <span class="text-emerald-400">"building_the_future"</span>
        </div>
      </div>
      <div class="json-line-wrapper inline-block whitespace-nowrap overflow-hidden border-r-2 border-transparent pr-1">
        <span class="text-about-fuchsia">}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNuxtApp } from '#app'

const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { $gsap: gsap } = useNuxtApp()
  if (!gsap || !cardRef.value) return

  const lines = cardRef.value.querySelectorAll('.json-line-wrapper')
  
  // Inicialmente ocultas
  gsap.set(lines, { width: 0, borderRightColor: 'transparent' })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cardRef.value,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })

  lines.forEach((line, index) => {
    const htmlLine = line as HTMLElement
    // Mostrar cursor antes de escribir
    tl.to(htmlLine, {
      borderRightColor: '#d946ef', // about-fuchsia
      duration: 0.05
    })

    // Escribir la línea
    tl.to(htmlLine, {
      width: () => `${htmlLine.scrollWidth}px`,
      duration: 0.15 + (htmlLine.textContent?.length || 0) * 0.009,
      ease: 'steps(25)'
    })

    // Ocultar cursor si no es la última línea
    if (index < lines.length - 1) {
      tl.to(htmlLine, {
        borderRightColor: 'transparent',
        duration: 0.05
      })
    } else {
      // Parpadeo infinito del cursor al final
      tl.to(htmlLine, {
        borderRightColor: 'transparent',
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: 'power1.inOut'
      })
    }
  })
})
</script>

