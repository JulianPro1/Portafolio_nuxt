import { type Ref, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';

export const useAboutOrchestratorAnimations = (
  activeStep: Ref<number>,
  isDesktop: Ref<boolean>
) => {
  const { $gsap: gsap } = useNuxtApp();
  let gsapContext: any = null;

  const init = (scopeSelector: string = '.max-w-5xl') => {
    if (!gsap) return;

    gsapContext = gsap.context(() => {
      const stepRows = document.querySelectorAll('.step-row');

      stepRows.forEach((row: Element) => {
        const index = Number(row.getAttribute('data-index'));
        if (isNaN(index)) return;

        const card = row.querySelector('.step-card');
        const panel = row.querySelector('.step-panel');
        const node = row.querySelector('.step-node');

        // ScrollTrigger para orquestar el activeStep dinámicamente al entrar/salir de sección
        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
            onEnter: () => { activeStep.value = index; },
            onEnterBack: () => { activeStep.value = index; }
          }
        });

        // Timeline de animaciones de entrada fluidas
        const entryTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none none'
          }
        });

        if (card) {
          const fromState = isDesktop.value
            ? { opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20, scale: 0.98 }
            : { opacity: 0, x: 0, y: 35, scale: 0.98 };

          entryTimeline.fromTo(card,
            fromState,
            { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9, ease: 'power4.out' }
          );
        }

        if (panel) {
          const slideX = isDesktop.value ? (index % 2 === 0 ? 40 : -40) : 0;
          const rotationY = isDesktop.value ? (index % 2 === 0 ? 5 : -5) : 0;

          entryTimeline.fromTo(panel,
            {
              opacity: 0,
              x: slideX,
              y: isDesktop.value ? 20 : 35,
              rotationY: rotationY,
              scale: 0.98,
              transformPerspective: 1000
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power4.out'
            },
            '-=0.7'
          );

          // Animaciones secundarias específicas para ciertos paneles
          if (index === 1) {
            // Animación Staggered para el Grid de GitHub
            entryTimeline.fromTo(panel.querySelectorAll('.github-cell'),
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                stagger: {
                  grid: [7, 16],
                  from: 'random',
                  amount: 0.5
                },
                duration: 0.45,
                ease: 'power4.out'
              },
              '-=0.3'
            );
          }
        }

        if (node) {
          entryTimeline.fromTo(node,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
            '-=0.8'
          );
        }
      });
    }, scopeSelector);
  };

  const cleanup = () => {
    if (gsapContext) {
      gsapContext.revert();
      gsapContext = null;
    }
  };

  onUnmounted(cleanup);

  return { init, cleanup };
};
