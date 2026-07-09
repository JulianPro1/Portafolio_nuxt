import { ref, computed, onMounted, onUnmounted, unref, type Ref } from 'vue';

export interface UseCylindricalCarouselOptions {
  itemCount: number;
  radius?: number | (() => number) | Ref<number>;
  scaleStep?: number | (() => number) | Ref<number>;
  opacityStep?: number | (() => number) | Ref<number>;
  dragThreshold?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function useCylindricalCarousel(options: UseCylindricalCarouselOptions) {
  const {
    itemCount,
    dragThreshold = 50,
    autoplay = true,
    autoplayInterval = 4000,
  } = options;

  const getValue = <T>(val: any, fallback: T): T => {
    if (val === undefined || val === null) return fallback;
    if (typeof val === 'function') return val();
    return unref(val);
  };

  const activeIndex = ref(0);
  const dragOffset = ref(0);
  const isDragging = ref(false);
  const dragStartX = ref(0);
  const dragStartY = ref(0);
  const isHorizontalSwipe = ref<boolean | null>(null);
  const containerRef = ref<HTMLElement | null>(null);
  const autoplayTimer = ref<number | null>(null);
  const isAutoplayPaused = ref(false);

  const cardStyles = computed(() => {
    const styles: Array<{
      transform: string;
      opacity: number;
      zIndex: number;
    }> = [];

    const radiusVal = getValue(options.radius, 320);
    const scaleStepVal = getValue(options.scaleStep, 0.12);
    const opacityStepVal = getValue(options.opacityStep, 0.25);

    for (let i = 0; i < itemCount; i++) {
      const rawDiff = i - activeIndex.value;
      const half = itemCount / 2;
      const diff = ((rawDiff + half) % itemCount + itemCount) % itemCount - half;
      const angleStep = 360 / itemCount;
      const angle = diff * angleStep;
      const theta = (angle * Math.PI) / 180;
      const tx = Math.sin(theta) * radiusVal;
      const tz = Math.cos(theta) * radiusVal;
      const ry = -angle;

      const distance = Math.abs(diff);
      const scale = 1 - (distance * scaleStepVal);
      const opacity = 1 - (distance * opacityStepVal);

      // Aplicar dragOffset durante el arrastre para respuesta en tiempo real
      let dragX = 0;
      let dragRotation = 0;
      if (isDragging.value) {
        const dragPixels = dragOffset.value * (containerRef.value?.offsetWidth || 0);
        dragX = dragPixels * 0.3; // Factor de suavidad reducido
        dragRotation = dragPixels * 0.02; // Rotación sutil durante drag reducida
      }

      styles.push({
        transform: `translate3d(${tx + dragX}px, 0, ${tz}px) rotateY(${ry + dragRotation}deg) scale(${Math.max(0.65, scale)})`,
        opacity: Math.max(0.25, opacity),
        zIndex: Math.round(tz + radiusVal),
      });
    }

    return styles;
  });

  // Manejar inicio del arrastre
  const onDragStart = (e: MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement | null;
    if (target) {
      // Evitar iniciar drag en elementos interactivos
      const interactiveSelector = 'button, a, input, textarea, select, [role="button"], .interactive-element';
      if (target.closest(interactiveSelector)) {
        return;
      }
    }

    isDragging.value = true;
    dragStartX.value = 'clientX' in e ? e.clientX : (e.touches?.[0]?.clientX ?? 0);
    dragStartY.value = 'clientY' in e ? e.clientY : (e.touches?.[0]?.clientY ?? 0);
    isHorizontalSwipe.value = null;
    pauseAutoplay();

    // Registrar listeners globales de movimiento y fin de arrastre dinámicamente
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', onDragMove);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchmove', onDragMove, { passive: false });
      window.addEventListener('touchend', onDragEnd);
    }
  };

  // Manejar movimiento del arrastre
  const onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value || !containerRef.value) return;

    const currentX = 'clientX' in e ? e.clientX : (e.touches?.[0]?.clientX ?? 0);
    const currentY = 'clientY' in e ? e.clientY : (e.touches?.[0]?.clientY ?? 0);

    const deltaX = currentX - dragStartX.value;
    const deltaY = currentY - dragStartY.value;

    // Determinar si es un arrastre horizontal en el primer movimiento perceptible
    if (isHorizontalSwipe.value === null && 'touches' in e) {
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        isHorizontalSwipe.value = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    // Prevenir scroll nativo de la página únicamente si es arrastre horizontal intencional
    if ('touches' in e && isHorizontalSwipe.value === true) {
      if (e.cancelable) {
        e.preventDefault();
      }
    }

    // Si es scroll vertical nativo en mobile, no arrastramos el carrusel
    if ('touches' in e && isHorizontalSwipe.value === false) {
      return;
    }

    // Normalizar el offset por el ancho del contenedor para suavidad
    const containerWidth = containerRef.value.offsetWidth || 1;
    dragOffset.value = deltaX / containerWidth;
  };

  // Manejar fin del arrastre
  const onDragEnd = () => {
    if (!isDragging.value) return;
    isDragging.value = false;

    // Remover listeners dinámicos del objeto global window
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDragMove);
      window.removeEventListener('touchend', onDragEnd);
    }

    const containerWidth = containerRef.value?.offsetWidth || 0;
    const offsetPixels = dragOffset.value * containerWidth;

    // Si el arrastre supera el umbral, cambiar de tarjeta
    if (Math.abs(offsetPixels) > dragThreshold) {
      if (offsetPixels > 0) {
        activeIndex.value = (activeIndex.value - 1 + itemCount) % itemCount;
      } else if (offsetPixels < 0) {
        activeIndex.value = (activeIndex.value + 1) % itemCount;
      }
    }

    // Resetear el offset
    dragOffset.value = 0;
    isHorizontalSwipe.value = null;

    // Reanudar autoplay después de un delay
    setTimeout(() => {
      resumeAutoplay();
    }, 2000);
  };

  // Navegar a una tarjeta específica
  const goToCard = (index: number) => {
    if (index >= 0 && index < itemCount) {
      activeIndex.value = index;
    }
  };

  // Navegar a la siguiente tarjeta
  const next = () => {
    activeIndex.value = (activeIndex.value + 1) % itemCount;
  };

  const prev = () => {
    activeIndex.value = (activeIndex.value - 1 + itemCount) % itemCount;
  };

  // Autoplay functions
  const startAutoplay = () => {
    if (!autoplay || isAutoplayPaused.value) return;
    stopAutoplay();
    autoplayTimer.value = window.setInterval(() => {
      next();
    }, autoplayInterval);
  };

  const stopAutoplay = () => {
    if (autoplayTimer.value) {
      clearInterval(autoplayTimer.value);
      autoplayTimer.value = null;
    }
  };

  const pauseAutoplay = () => {
    isAutoplayPaused.value = true;
    stopAutoplay();
  };

  const resumeAutoplay = () => {
    isAutoplayPaused.value = false;
    startAutoplay();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const activeEl = document.activeElement;
    if (activeEl && (
      activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      (activeEl as HTMLElement).isContentEditable
    )) {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      next();
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      prev();
    }
  };

  // Event listeners
  const addEventListeners = () => {
    if (!containerRef.value) return;

    const container = containerRef.value;

    // Iniciar arrastre con mousedown o touchstart
    container.addEventListener('mousedown', onDragStart);
    container.addEventListener('touchstart', onDragStart, { passive: true });

    // Keyboard events
    window.addEventListener('keydown', onKeyDown);
  };

  const removeEventListeners = () => {
    if (!containerRef.value) return;

    const container = containerRef.value;

    container.removeEventListener('mousedown', onDragStart);
    container.removeEventListener('touchstart', onDragStart);

    // Limpiar listeners dinámicos de window si quedaron activos
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('touchend', onDragEnd);

    // Keyboard events
    window.removeEventListener('keydown', onKeyDown);
  };

  onMounted(() => {
    addEventListeners();
    startAutoplay();
  });

  onUnmounted(() => {
    removeEventListeners();
    stopAutoplay();
  });

  return {
    containerRef,
    activeIndex,
    dragOffset,
    isDragging,
    cardStyles,
    goToCard,
    next,
    prev,
    startAutoplay,
    stopAutoplay,
    pauseAutoplay,
    resumeAutoplay,
  };
}
