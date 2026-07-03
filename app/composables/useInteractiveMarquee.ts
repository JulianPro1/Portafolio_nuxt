import { ref, onMounted, onUnmounted } from 'vue';

export interface UseInteractiveMarqueeOptions {
  baseSpeed?: number;
  momentumDecay?: number;
  momentumThreshold?: number;
}

export function useInteractiveMarquee(options: UseInteractiveMarqueeOptions = {}) {
  const {
    baseSpeed = 0.5,
    momentumDecay = 0.92,
    momentumThreshold = 0.01,
  } = options;

  const marqueeContainer = ref<HTMLElement | null>(null);
  const isDragging = ref(false);

  let dragStartX = 0;
  let dragStartScroll = 0;
  let lastDragX = 0;
  let momentum = 0;
  let rafId: number | null = null;

  const getHalfWidth = () => {
    const el = marqueeContainer.value;
    if (!el) return 0;
    return el.scrollWidth / 2;
  };

  const normalizeScroll = () => {
    const el = marqueeContainer.value;
    if (!el) return;
    const half = getHalfWidth();
    if (half <= 0) return;

    // Si el scroll avanza más allá de la mitad, reinicia al inicio
    if (el.scrollLeft >= half) {
      el.scrollLeft -= half;
    }
    // Si el scroll retrocede más allá de 0, reinicia a la mitad
    else if (el.scrollLeft <= 0) {
      el.scrollLeft += half;
    }
  };

  const animate = () => {
    const el = marqueeContainer.value;
    if (el) {
      if (!isDragging.value) {
        // El auto-scroll base nunca se detiene; el momentum del arrastre
        // se suma por encima y decae hacia cero. Así, aunque se arrastre
        // en sentido contrario, el cruce por cero es instantáneo y no se
        // percibe ninguna pausa.
        el.scrollLeft += baseSpeed + momentum;
        momentum *= momentumDecay;
        if (Math.abs(momentum) < momentumThreshold) momentum = 0;
        normalizeScroll();
      }
    }
    rafId = requestAnimationFrame(animate);
  };

  const onPointerDown = (e: PointerEvent) => {
    const el = marqueeContainer.value;
    if (!el) return;
    isDragging.value = true;
    dragStartX = e.clientX;
    lastDragX = e.clientX;
    dragStartScroll = el.scrollLeft;
    momentum = 0;
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging.value) return;
    const el = marqueeContainer.value;
    if (!el) return;
    const delta = e.clientX - dragStartX;
    el.scrollLeft = dragStartScroll - delta;
    // Momentum de scroll (inverso al movimiento del cursor)
    momentum = -(e.clientX - lastDragX);
    lastDragX = e.clientX;
    // Normalizar el scroll también durante el arrastre para evitar quedar atrapado en los bordes
    normalizeScroll();
  };

  const onPointerUp = (e: PointerEvent) => {
    if (!isDragging.value) return;
    isDragging.value = false;
    const el = marqueeContainer.value;
    el?.releasePointerCapture?.(e.pointerId);
    // Normalizar al soltar para asegurar una posición válida
    normalizeScroll();
  };

  onMounted(() => {
    rafId = requestAnimationFrame(animate);
  });

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId);
  });

  return {
    marqueeContainer,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
