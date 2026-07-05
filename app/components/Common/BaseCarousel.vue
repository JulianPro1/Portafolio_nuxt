<template>
  <ClientOnly>
    <Swiper
      v-bind="(swiperOptions as any)"
      :modules="activeModules"
      class="w-full h-full"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <!-- Slides via slot con acceso al índice -->
      <SwiperSlide
        v-for="(_, index) in slideCount"
        :key="index"
        class="h-full"
      >
        <slot name="slide" :index="index" :is-active="index === activeIndex" />
      </SwiperSlide>

      <!-- Slot de paginación custom (dots, numeración, etc.) -->
      <template v-if="$slots.pagination" #container-end>
        <slot name="pagination" :active-index="activeIndex" :go-to="goTo" />
      </template>
    </Swiper>

    <!-- Slot de navegación custom (botones prev/next con diseño propio) -->
    <slot
      name="navigation"
      :prev="prev"
      :next="next"
      :active-index="activeIndex"
    />

    <!-- Fallback SSR -->
    <template #fallback>
      <div class="w-full h-full flex items-center justify-center">
        <slot name="slide" :index="0" :is-active="true" />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper/types'
import { useBaseCarousel, type BaseCarouselProps } from '~/composables/useBaseCarousel'

// ─── Imports de CSS de Swiper (único lugar en el proyecto) ───────────────────
import 'swiper/css'
import 'swiper/css/pagination'

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props {
  /** Número total de slides a renderizar */
  slideCount: number
  /** Slides visibles al mismo tiempo */
  slidesPerView?: number | 'auto'
  /** Espacio entre slides en px */
  spaceBetween?: number
  /** ¿Carousel infinito? */
  loop?: boolean
  /** ¿Activar autoplay? */
  autoplay?: boolean
  /** Delay del autoplay en ms */
  autoplayDelay?: number
  /** Pausa autoplay al interactuar */
  autoplayPauseOnHover?: boolean
  /** Efecto de transición */
  effect?: 'slide' | 'fade'
  /** ¿Mostrar paginación interna de Swiper? (false si usas paginación custom) */
  showPagination?: boolean
  /** Velocidad de transición en ms */
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: false,
  autoplay: false,
  autoplayDelay: 4000,
  autoplayPauseOnHover: true,
  effect: 'slide',
  showPagination: false,
  speed: 400,
})

// ─── Emits ───────────────────────────────────────────────────────────────────
const emit = defineEmits<{
  slideChange: [index: number]
}>()

// ─── Estado interno ───────────────────────────────────────────────────────────
const swiperInstance = ref<SwiperInstance | null>(null)
const activeIndex = ref(0)

// ─── Configuración (via useBaseCarousel) ──────────────────────────────────────
const swiperOptions = computed(() => useBaseCarousel(props))

// Módulos activos según props — no cargamos lo que no usamos
const activeModules = computed(() => {
  const mods = [A11y]
  if (props.showPagination) mods.push(Pagination)
  if (props.autoplay) mods.push(Autoplay)
  return mods
})

// ─── Handlers ─────────────────────────────────────────────────────────────────
const onSwiper = (swiper: SwiperInstance) => {
  swiperInstance.value = swiper
}

const onSlideChange = () => {
  if (!swiperInstance.value) return
  activeIndex.value = swiperInstance.value.realIndex
  emit('slideChange', activeIndex.value)
}

// ─── API de navegación expuesta al padre via slots ───────────────────────────
const prev = () => swiperInstance.value?.slidePrev()
const next = () => swiperInstance.value?.slideNext()
const goTo = (index: number) => swiperInstance.value?.slideTo(index)

defineExpose({ prev, next, goTo, activeIndex })
</script>