<template>
  <Teleport to="body">
    <Transition name="preloader-fade">
      <div
        v-if="isVisible"
        ref="loaderEl"
        class="preloader-overlay"
        aria-label="Cargando"
        role="status"
        aria-live="polite"
      >
        <!-- Fondo con gradiente animado -->
        <div ref="bgEl" class="preloader-bg" />

        <!-- Contenido central -->
        <div ref="contentEl" class="preloader-content">

          <!-- Línea superior decorativa -->
          <div ref="lineTopEl" class="preloader-line preloader-line--top" />

          <!-- Texto principal -->
          <div class="preloader-text-wrapper">
            <span
              v-for="(char, i) in julianChars"
              :key="`j-${i}`"
              :ref="el => setCharRef(el, i)"
              class="preloader-char"
            >{{ char }}</span>
            <span ref="dotEl" class="preloader-dot">.</span>
            <span
              v-for="(char, i) in devChars"
              :key="`d-${i}`"
              :ref="el => setDevCharRef(el, i)"
              class="preloader-char preloader-char--dev"
            >{{ char }}</span>
          </div>

          <!-- Subtítulo -->
          <div ref="subtitleEl" class="preloader-subtitle">
            <span>Portfolio</span>
            <span class="preloader-subtitle-divider">·</span>
            <span>Frontend Developer</span>
          </div>

          <!-- Barra de progreso -->
          <div ref="progressWrapEl" class="preloader-progress-wrap">
            <div ref="progressBarEl" class="preloader-progress-bar" />
          </div>

          <!-- Contador de porcentaje -->
          <div ref="counterEl" class="preloader-counter">0%</div>
        </div>

        <!-- Línea inferior decorativa -->
        <div ref="lineBottomEl" class="preloader-line preloader-line--bottom" />

        <!-- Partículas decorativas -->
        <div
          v-for="n in 6"
          :key="`p-${n}`"
          :ref="el => setParticleRef(el, n - 1)"
          class="preloader-particle"
          :style="particleStyles[n - 1]"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits<{
  done: []
}>()

const isVisible = ref(true)
const loaderEl = ref<HTMLElement | null>(null)
const bgEl = ref<HTMLElement | null>(null)
const contentEl = ref<HTMLElement | null>(null)
const lineTopEl = ref<HTMLElement | null>(null)
const lineBottomEl = ref<HTMLElement | null>(null)
const dotEl = ref<HTMLElement | null>(null)
const subtitleEl = ref<HTMLElement | null>(null)
const progressWrapEl = ref<HTMLElement | null>(null)
const progressBarEl = ref<HTMLElement | null>(null)
const counterEl = ref<HTMLElement | null>(null)

const julianChars = 'julian'.split('')
const devChars = 'dev'.split('')

const charRefs: HTMLElement[] = []
const devCharRefs: HTMLElement[] = []
const particleRefs: HTMLElement[] = []

const setCharRef = (el: any, i: number) => { if (el) charRefs[i] = el }
const setDevCharRef = (el: any, i: number) => { if (el) devCharRefs[i] = el }
const setParticleRef = (el: any, i: number) => { if (el) particleRefs[i] = el }

const particleStyles = computed(() => [
  { top: '15%', left: '10%',  width: '4px', height: '4px' },
  { top: '25%', right: '12%', width: '6px', height: '6px' },
  { top: '70%', left: '8%',   width: '3px', height: '3px' },
  { top: '75%', right: '15%', width: '5px', height: '5px' },
  { top: '45%', left: '4%',   width: '4px', height: '4px' },
  { top: '55%', right: '6%',  width: '3px', height: '3px' },
])

onMounted(() => {
  if (!import.meta.client) return

  const tl = gsap.timeline({ timeScale: 2.2 })

  // Estado inicial
  gsap.set([...charRefs, ...devCharRefs, dotEl.value], {
    opacity: 0,
    y: 60,
    rotateX: -40,
  })
  gsap.set(subtitleEl.value, { opacity: 0, y: 12 })
  gsap.set(progressWrapEl.value, { scaleX: 0, opacity: 0 })
  gsap.set(progressBarEl.value, { scaleX: 0 })
  gsap.set(counterEl.value, { opacity: 0 })
  gsap.set(lineTopEl.value, { scaleX: 0 })
  gsap.set(lineBottomEl.value, { scaleX: 0 })
  gsap.set(particleRefs, { scale: 0, opacity: 0 })

  // 1. Líneas entran
  tl.to([lineTopEl.value, lineBottomEl.value], {
    scaleX: 1,
    duration: 0.4,
    ease: 'power3.out',
    stagger: 0.05,
  })

  // 2. "julian" entra letra por letra
  .to(charRefs, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.38,
    ease: 'back.out(1.5)',
    stagger: 0.04,
  }, '-=0.2')

  // 3. punto "." con rebote especial
  .to(dotEl.value, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.3,
    ease: 'bounce.out',
  }, '-=0.08')

  // 4. "dev" entra letra por letra con color diferente
  .to(devCharRefs, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.32,
    ease: 'back.out(1.7)',
    stagger: 0.045,
  }, '-=0.15')

  // 5. Subtítulo y partículas
  .to(subtitleEl.value, {
    opacity: 1,
    y: 0,
    duration: 0.28,
    ease: 'power2.out',
  }, '-=0.1')
  .to(particleRefs, {
    scale: 1,
    opacity: 0.6,
    duration: 0.25,
    stagger: 0.03,
    ease: 'back.out(2)',
  }, '<')

  // 6. Barra de progreso
  .to(progressWrapEl.value, {
    scaleX: 1,
    opacity: 1,
    duration: 0.25,
    ease: 'power2.out',
  })
  .to(counterEl.value, {
    opacity: 1,
    duration: 0.2,
  }, '<')

  // 7. Animar progreso al 100%
  .to(progressBarEl.value, {
    scaleX: 1,
    duration: 0.7,
    ease: 'power1.inOut',
  })
  .to(counterEl.value, {
    innerText: 100,
    duration: 0.7,
    ease: 'power1.inOut',
    snap: { innerText: 1 },
    onUpdate() {
      const el = counterEl.value
      if (el) el.textContent = Math.round(parseFloat(el.textContent || '0')) + '%'
    },
  }, '<')

  // 8. Pequeño pulso en el texto antes de salir
  .to([...charRefs, dotEl.value, ...devCharRefs], {
    scale: 1.04,
    duration: 0.12,
    ease: 'power1.in',
    stagger: { each: 0.015, from: 'center' },
  }, '+=0.03')
  .to([...charRefs, dotEl.value, ...devCharRefs], {
    scale: 1,
    duration: 0.12,
    ease: 'power1.out',
    stagger: { each: 0.015, from: 'center' },
  })

  // 9. Exit: todo sube y se desvanece
  .to(contentEl.value, {
    y: -30,
    opacity: 0,
    duration: 0.38,
    ease: 'power3.in',
  }, '+=0.1')
  .to(loaderEl.value, {
    opacity: 0,
    duration: 0.35,
    ease: 'power2.in',
    onComplete: () => {
      isVisible.value = false
      emit('done')
    },
  }, '-=0.18')
})
</script>

<style scoped>
/* =====================
   OVERLAY
   ===================== */
.preloader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #080810;
}

.preloader-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 50%, hsla(270, 67%, 45%, 0.15) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 20% 80%, hsla(270, 70%, 35%, 0.1) 0%, transparent 60%),
    radial-gradient(ellipse 40% 30% at 80% 20%, hsla(270, 60%, 65%, 0.07) 0%, transparent 60%),
    #080810;
}

/* =====================
   CONTENIDO CENTRAL
   ===================== */
.preloader-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  perspective: 600px;
}

/* =====================
   TEXTO PRINCIPAL
   ===================== */
.preloader-text-wrapper {
  display: flex;
  align-items: baseline;
  gap: 0;
  line-height: 1;
  user-select: none;
}

.preloader-char {
  display: inline-block;
  font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
  font-size: clamp(3.5rem, 12vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  will-change: transform, opacity;
  transform-origin: bottom center;
}

.preloader-dot {
  display: inline-block;
  font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
  font-size: clamp(3.5rem, 12vw, 7rem);
  font-weight: 800;
  color: hsl(270, 67%, 45%);
  will-change: transform, opacity;
  transform-origin: bottom center;
  margin: 0 1px;
  text-shadow: 0 0 32px hsla(270, 67%, 45%, 0.8);
}

.preloader-char--dev {
  background: linear-gradient(135deg, hsl(270, 70%, 35%) 0%, hsl(270, 67%, 45%) 50%, hsl(270, 60%, 65%) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px hsla(270, 67%, 45%, 0.6));
}

/* =====================
   SUBTÍTULO
   ===================== */
.preloader-subtitle {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(0.6rem, 2vw, 0.78rem);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  will-change: opacity, transform;
}

.preloader-subtitle-divider {
  color: hsl(270, 67%, 45%);
  opacity: 0.7;
}

/* =====================
   PROGRESO
   ===================== */
.preloader-progress-wrap {
  width: clamp(180px, 40vw, 280px);
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
  transform-origin: left center;
  will-change: transform, opacity;
}

.preloader-progress-bar {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, hsl(270, 70%, 35%), hsl(270, 67%, 45%), hsl(270, 60%, 65%));
  border-radius: 999px;
  transform-origin: left center;
  will-change: transform;
  box-shadow: 0 0 14px hsla(270, 67%, 45%, 0.7);
}

/* =====================
   CONTADOR
   ===================== */
.preloader-counter {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: hsla(270, 67%, 45%, 0.85);
  will-change: opacity;
  min-width: 3ch;
  text-align: center;
}

/* =====================
   LÍNEAS DECORATIVAS
   ===================== */
.preloader-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(200px, 50vw, 400px);
  height: 1px;
  background: linear-gradient(90deg, transparent, hsla(270, 67%, 45%, 0.4), transparent);
  transform-origin: center center;
  will-change: transform;
}

.preloader-line--top {
  top: calc(50% - 80px);
}

.preloader-line--bottom {
  bottom: calc(50% - 80px);
}

/* =====================
   PARTÍCULAS
   ===================== */
.preloader-particle {
  position: absolute;
  border-radius: 50%;
  background: hsl(270, 67%, 45%);
  will-change: transform, opacity;
  pointer-events: none;
  box-shadow: 0 0 10px hsla(270, 67%, 45%, 0.9);
}

/* =====================
   TRANSICIÓN DE SALIDA (v-if + Transition)
   ===================== */
.preloader-fade-leave-active {
  transition: none; /* GSAP maneja la salida */
}
</style>
