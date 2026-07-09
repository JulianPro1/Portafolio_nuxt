import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return

  // Desactivar Lenis en móviles y tablets para priorizar scroll nativo acelerado por hardware y reducir TBT
  const isMobile = window.matchMedia('(max-width: 1023px)').matches
  if (isMobile) {
    return {
      provide: {
        lenis: null as Lenis | null
      }
    }
  }

  const { $gsap, $ScrollTrigger } = nuxtApp as any

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing premium
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  })

  // Sincronizar Lenis con ScrollTrigger
  if ($ScrollTrigger) {
    lenis.on('scroll', () => {
      $ScrollTrigger.update()
    })
  }

  // Integrar con el ticker de GSAP para mayor rendimiento y fluidez
  if ($gsap) {
    $gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })
    $gsap.ticker.lagSmoothing(0)
  }

  return {
    provide: {
      lenis: lenis as Lenis | null
    }
  }
})
