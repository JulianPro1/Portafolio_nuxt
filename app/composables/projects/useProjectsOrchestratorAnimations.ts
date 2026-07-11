import { type Ref, watch, nextTick, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import { useLenis } from '~/composables/useLenis';
import { useBackgroundStore } from '~/store';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface UseProjectsOrchestratorAnimationsOptions {
  tabs: Tab[];
  activeTab: Ref<string>;
  isScrollingTo: Ref<boolean>;
  tabsContainer: Ref<HTMLElement | null>;
  activeBgIndicator: Ref<HTMLElement | null>;
  activeLineIndicator: Ref<HTMLElement | null>;
  tabElements: Ref<Record<string, HTMLElement>>;
}

export const useProjectsOrchestratorAnimations = ({
  tabs,
  activeTab,
  isScrollingTo,
  tabsContainer,
  activeBgIndicator,
  activeLineIndicator,
  tabElements,
}: UseProjectsOrchestratorAnimationsOptions) => {
  const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();
  const lenis = useLenis();
  const backgroundStore = useBackgroundStore();
  let gsapContext: any = null;

  // ─── Indicador de tab activo ───────────────────────────────────────────────

  const updateActiveIndicator = (id: string, immediate = false) => {
    const container = tabsContainer.value;
    const button = tabElements.value[id];
    const bg = activeBgIndicator.value;
    const line = activeLineIndicator.value;

    if (!container || !button || !bg || !line) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const relativeLeft = buttonRect.left - containerRect.left;
    const width = buttonRect.width;

    // Animar el fondo flotante con efecto elástico fluido
    gsap.to(bg, {
      left: relativeLeft + 6,
      width: width - 12,
      duration: immediate ? 0 : 0.45,
      ease: 'back.out(1.1)',
      overwrite: 'auto',
    });

    // Animar el indicador inferior
    const lineWidth = Math.min(width * 0.4, 48);
    const lineLeft = relativeLeft + (width - lineWidth) / 2;

    gsap.to(line, {
      left: lineLeft,
      width: lineWidth,
      duration: immediate ? 0 : 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  // ─── Scroll hacia una sección ──────────────────────────────────────────────

  const scrollToSection = (id: string) => {
    if (!import.meta.client) return;

    isScrollingTo.value = true;
    activeTab.value = id;

    const onScrollFinished = () => {
      setTimeout(() => {
        isScrollingTo.value = false;
      }, 100);
    };

    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        offset: -120,
        duration: 1.0,
        immediate: false,
        onComplete: onScrollFinished,
      });
    } else {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: `#${id}`, offsetY: 120 },
        ease: 'power3.inOut',
        onComplete: onScrollFinished,
      });
    }
  };

  // ─── Scroll hacia un proyecto específico ──────────────────────────────────

  const scrollToProject = (projectId: string) => {
    if (!import.meta.client) return;

    const element = document.querySelector(`[data-project-id="${projectId}"]`);
    if (!element) return;

    isScrollingTo.value = true;

    // Sincronizar el tab activo si el proyecto está en otra sección
    const parentSection = element.closest('[data-category-section]');
    if (parentSection) {
      const categoryId = parentSection.getAttribute('data-category-section');
      if (categoryId && activeTab.value !== categoryId) {
        activeTab.value = categoryId;
      }
    }

    const triggerHighlight = () => {
      gsap.fromTo(
        element,
        { filter: 'brightness(1) drop-shadow(0 0 0px transparent)' },
        {
          filter: 'brightness(1.15) drop-shadow(0 0 15px var(--category-accent))',
          duration: 0.4,
          yoyo: true,
          repeat: 3,
          ease: 'sine.inOut',
          onComplete: () => {
            gsap.set(element, { clearProps: 'filter' });
            isScrollingTo.value = false;
          },
        }
      );
    };

    if (lenis) {
      lenis.scrollTo(element, {
        offset: -140,
        duration: 1.2,
        immediate: false,
        onComplete: triggerHighlight,
      });
    } else {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 140 },
        ease: 'power4.inOut',
        onComplete: triggerHighlight,
      });
    }
  };

  // ─── Init: ScrollTriggers para el tab activo ───────────────────────────────

  /** Calcula el slice de colores activos para un índice de tab dado */
  const getProgressColorsForTabIndex = (tabIndex: number): string[] => {
    const all = backgroundStore.navbarProgressColors
    if (!all || all.length === 0) return []
    const end = Math.max(1, Math.min(tabIndex + 1, all.length))
    const slice = all.slice(0, end)
    // Mínimo 2 colores para que el gradiente CSS sea válido
    return slice.length === 1 ? [slice[0]!, slice[0]!] : slice
  };

  const init = () => {
    if (!import.meta.client || !gsap || !ScrollTrigger) return;

    // ── Inicializar los colores activos ANTES del primer render de la navbar ──
    // Esto evita el flash del gradiente completo al entrar a la página
    const initialIndex = tabs.findIndex((t) => t.id === activeTab.value);
    backgroundStore.setNavbarProgressColorsActive(
      getProgressColorsForTabIndex(Math.max(0, initialIndex))
    );

    gsapContext = gsap.context(() => {
      tabs.forEach((tab) => {
        ScrollTrigger.create({
          trigger: `#${tab.id}`,
          start: 'top 35%',
          end: 'bottom 35%',
          onToggle: (self: any) => {
            if (self.isActive && !isScrollingTo.value) {
              activeTab.value = tab.id;
            }
          },
        });
      });
    });

    // Posicionar el indicador tras el renderizado inicial
    nextTick(() => {
      setTimeout(() => {
        updateActiveIndicator(activeTab.value, true);
      }, 200);
    });
  };

  // ─── Resize handler ───────────────────────────────────────────────────────

  const handleResize = () => {
    updateActiveIndicator(activeTab.value, true);
  };

  // ─── Watcher: sincronizar indicador al cambiar de tab ─────────────────────

  watch(activeTab, (newId) => {
    updateActiveIndicator(newId);

    // Actualizar los colores activos de la navbar según el tab activo
    const tabIndex = tabs.findIndex((t) => t.id === newId);
    if (tabIndex !== -1) {
      backgroundStore.setNavbarProgressColorsActive(
        getProgressColorsForTabIndex(tabIndex)
      );
    }
  });

  // ─── Cleanup ──────────────────────────────────────────────────────────────

  const cleanup = () => {
    if (gsapContext) {
      gsapContext.revert();
      gsapContext = null;
    }
    if (import.meta.client) {
      window.removeEventListener('resize', handleResize);
    }
  };

  onUnmounted(cleanup);

  return {
    init,
    cleanup,
    handleResize,
    scrollToSection,
    scrollToProject,
    updateActiveIndicator,
  };
};
