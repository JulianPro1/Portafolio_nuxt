import type { SwiperOptions } from 'swiper/types'

export interface BaseCarouselProps {
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

/**
 * Genera las SwiperOptions a partir de los props de BaseCarousel.
 * Solo maneja configuración (data), nunca importa módulos de Swiper.
 * Los módulos se cargan exclusivamente en BaseCarousel.vue.
 */
export function useBaseCarousel(props: BaseCarouselProps): SwiperOptions {
  return {
    slidesPerView: props.slidesPerView ?? 1,
    spaceBetween: props.spaceBetween ?? 0,
    loop: props.loop ?? false,
    speed: props.speed ?? 400,
    effect: props.effect ?? 'slide',
    autoplay: props.autoplay
      ? {
          delay: props.autoplayDelay ?? 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: props.autoplayPauseOnHover ?? true,
        }
      : false,
    pagination: props.showPagination
      ? { clickable: true }
      : false,
    a11y: {
      prevSlideMessage: 'Slide anterior',
      nextSlideMessage: 'Slide siguiente',
    },
  }
}
