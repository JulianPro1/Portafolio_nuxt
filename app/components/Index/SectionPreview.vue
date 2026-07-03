<template>
  <section class="relative min-h-screen overflow-hidden isolate bg-global-bg flex items-center justify-center">
    <!-- Flecha Izquierda (Desktop) -->
    <button
      v-if="!isMobile"
      ref="btnPrevRef"
      @click="onPrev"
      @mousemove="onMouseMove($event, 'prev')"
      @mouseleave="onMouseLeave('prev')"
      class="absolute left-8 lg:left-16 z-40 hidden md:flex items-center justify-center w-16 h-16 rounded-full border backdrop-blur-md shadow-2xl transition-colors duration-300 focus:outline-none group/arrow cursor-pointer"
      :class="[arrowBorderColor, arrowBgColor]"
      style="perspective: 1000px; transform-style: preserve-3d;"
      aria-label="Anterior"
    >
      <div class="arrow-content flex items-center justify-center w-full h-full pointer-events-none" style="transform-style: preserve-3d; transition: transform 0.1s ease-out;">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-6 h-6 transition-transform duration-300 group-hover/arrow:-translate-x-1"
          :class="arrowTextColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>
      <!-- Glow de fondo -->
      <div
        class="absolute inset-0 rounded-full opacity-0 group-hover/arrow:opacity-20 transition-opacity duration-300 blur-lg pointer-events-none"
        :class="arrowGlowColor"
      ></div>
    </button>

    <!-- Flecha Derecha (Desktop) -->
    <button
      v-if="!isMobile"
      ref="btnNextRef"
      @click="onNext"
      @mousemove="onMouseMove($event, 'next')"
      @mouseleave="onMouseLeave('next')"
      class="absolute right-8 lg:right-16 z-40 hidden md:flex items-center justify-center w-16 h-16 rounded-full border backdrop-blur-md shadow-2xl transition-colors duration-300 focus:outline-none group/arrow cursor-pointer"
      :class="[arrowBorderColor, arrowBgColor]"
      style="perspective: 1000px; transform-style: preserve-3d;"
      aria-label="Siguiente"
    >
      <div class="arrow-content flex items-center justify-center w-full h-full pointer-events-none" style="transform-style: preserve-3d; transition: transform 0.1s ease-out;">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-6 h-6 transition-transform duration-300 group-hover/arrow:translate-x-1"
          :class="arrowTextColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <!-- Glow de fondo -->
      <div
        class="absolute inset-0 rounded-full opacity-0 group-hover/arrow:opacity-20 transition-opacity duration-300 blur-lg pointer-events-none"
        :class="arrowGlowColor"
      ></div>
    </button>

    <div class="w-full h-[480px] md:h-[560px]">
      <CylindricalCarousel
        ref="carouselRef"
        :item-count="4"
        :radius="carouselRadius"
        :perspective="carouselPerspective"
        :card-width="carouselCardWidth"
        :card-height="carouselCardHeight"
        :scale-step="carouselScaleStep"
        :opacity-step="carouselOpacityStep"
        :autoplay="false"
        @change="onCarouselChange"
        @drag="onCarouselDrag"
        @drag-end="onCarouselDragEnd"
      >
        <template #card="{ index, isActive }">
          <AnimatedElement :variant="isActive ? 'carouselCard' : 'card'" :delay="isActive ? '300ms' : '0ms'">
            <PortfolioCard
              :title="portfolioItems[index]!.title"
              :description="portfolioItems[index]!.description"
              :icon="portfolioItems[index]!.icon"
              :is-active="isActive"
              :border-color="getBorderColor(portfolioItems[index]!.id)"
              :gradient-from="getGradientFrom(portfolioItems[index]!.id)"
              :gradient-to="getGradientTo(portfolioItems[index]!.id)"
              :text-color="getTextColor(portfolioItems[index]!.id)"
            >
              <AboutPreviewCardContent
                v-if="portfolioItems[index]!.id === 'about'"
                :tech-skills="techSkillsData"
              />
              <ProjectsPreviewCardContent
                v-else-if="portfolioItems[index]!.id === 'projects'"
              />
              <SkillsPreviewCardContent
                v-else-if="portfolioItems[index]!.id === 'skills'"
              />
              <ContactPreviewCardContent
                v-else-if="portfolioItems[index]!.id === 'contact'"
              />
              
              <PreviewCardSkeleton v-else />
            </PortfolioCard>
          </AnimatedElement>
        </template>
      </CylindricalCarousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CylindricalCarousel from '@/components/Index/CylindricalCarousel.vue';
import PortfolioCard from '@/components/Index/PortfolioCard.vue';
import AboutPreviewCardContent from '@/components/Index/AboutPreviewCardContent.vue';
import ContactPreviewCardContent from '@/components/Index/ContactPreviewCardContent.vue';
import ProjectsPreviewCardContent from '@/components/Index/ProjectsPreviewCardContent.vue';
import SkillsPreviewCardContent from '@/components/Index/SkillsPreviewCardContent.vue';
import PreviewCardSkeleton from '@/components/Index/PreviewCardSkeleton.vue';
import AnimatedElement from '@/components/Common/AnimatedElement.vue';
import { techSkillsData } from '~/data/techSkillsData';
import { gsap } from 'gsap';

const isMobile = ref(false);
const carouselRef = ref<any>(null);
const activeIndex = ref(0);
const btnPrevRef = ref<HTMLElement | null>(null);
const btnNextRef = ref<HTMLElement | null>(null);

const updateSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768;
  }
};

onMounted(() => {
  updateSize();
  window.addEventListener('resize', updateSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSize);
});

const onCarouselChange = (index: number) => {
  const oldIndex = activeIndex.value;
  if (oldIndex !== index) {
    const count = 4;
    const rawDiff = index - oldIndex;
    const diff = ((rawDiff + count / 2) % count + count) % count - count / 2;
    const direction = diff > 0 ? 'next' : 'prev';
    animateArrowsCylindrical(direction);
  }
  activeIndex.value = index;
};

const animateArrowsCylindrical = (direction: 'next' | 'prev') => {
  // Las flechas siguen el movimiento rotativo (e.g. hacia la izquierda al ir al "next", hacia la derecha al ir al "prev")
  const shiftX = direction === 'next' ? -50 : 50;
  const rotY = direction === 'next' ? -35 : 35;

  [btnPrevRef.value, btnNextRef.value].forEach((btn) => {
    if (!btn) return;
    gsap.timeline()
      .to(btn, {
        x: shiftX,
        rotateY: rotY,
        z: -60,
        scale: 0.9,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      })
      .to(btn, {
        x: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.6)'
      });
  });
};

const onCarouselDrag = ({ offset, isDragging }: { offset: number; isDragging: boolean }) => {
  if (!isDragging) return;
  const maxDragShiftX = 80;
  const maxDragRotY = 40;
  const maxDragZ = -50;

  const currentShiftX = offset * maxDragShiftX;
  const currentRotY = offset * maxDragRotY;
  const currentZ = -Math.abs(offset) * Math.abs(maxDragZ);

  [btnPrevRef.value, btnNextRef.value].forEach((btn) => {
    if (!btn) return;
    gsap.to(btn, {
      x: currentShiftX,
      rotateY: currentRotY,
      z: currentZ,
      duration: 0.1,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  });
};

const onCarouselDragEnd = () => {
  [btnPrevRef.value, btnNextRef.value].forEach((btn) => {
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.6)',
      overwrite: 'auto'
    });
  });
};

const currentItemId = computed(() => portfolioItems[activeIndex.value]?.id || 'about');

const arrowBorderColor = computed(() => {
  const borderColors: Record<string, string> = {
    about: 'border-about-accent hover:border-about-accent/80',
    contact: 'border-contact-accent hover:border-contact-accent/80',
    projects: 'border-projects-accent hover:border-projects-accent/80',
    skills: 'border-skills-accent hover:border-skills-accent/80',
  };
  return borderColors[currentItemId.value] || 'border-about-accent';
});

const arrowBgColor = computed(() => {
  return 'bg-neutral-900/40 hover:bg-neutral-900/60';
});

const arrowTextColor = computed(() => {
  const textColors: Record<string, string> = {
    about: 'text-about-accent',
    contact: 'text-contact-accent',
    projects: 'text-projects-accent',
    skills: 'text-skills-accent',
  };
  return textColors[currentItemId.value] || 'text-about-accent';
});

const arrowGlowColor = computed(() => {
  const glowColors: Record<string, string> = {
    about: 'bg-about-accent',
    contact: 'bg-contact-accent',
    projects: 'bg-projects-accent',
    skills: 'bg-skills-accent',
  };
  return glowColors[currentItemId.value] || 'bg-about-accent';
});

const onMouseMove = (e: MouseEvent, type: 'prev' | 'next') => {
  const btn = type === 'prev' ? btnPrevRef.value : btnNextRef.value;
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  // Rotar en base a la posición del mouse
  const rotateX = -y * 0.4;
  const rotateY = x * 0.4;
  const transX = x * 0.2;
  const transY = y * 0.2;

  gsap.to(btn, {
    rotateX: rotateX,
    rotateY: rotateY,
    x: transX,
    y: transY,
    scale: 1.1,
    duration: 0.3,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  const arrowContent = btn.querySelector('.arrow-content');
  if (arrowContent) {
    gsap.to(arrowContent, {
      z: 15,
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }
};

const onMouseLeave = (type: 'prev' | 'next') => {
  const btn = type === 'prev' ? btnPrevRef.value : btnNextRef.value;
  if (!btn) return;

  gsap.to(btn, {
    rotateX: 0,
    rotateY: 0,
    x: 0,
    y: 0,
    scale: 1,
    duration: 0.5,
    ease: 'elastic.out(1, 0.5)',
    overwrite: 'auto'
  });

  const arrowContent = btn.querySelector('.arrow-content');
  if (arrowContent) {
    gsap.to(arrowContent, {
      z: 0,
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto'
    });
  }
};

const onPrev = () => {
  if (carouselRef.value) {
    carouselRef.value.prev();
  }
};

const onNext = () => {
  if (carouselRef.value) {
    carouselRef.value.next();
  }
};

const carouselRadius = computed(() => (isMobile.value ? 120 : 280));
const carouselPerspective = computed(() => (isMobile.value ? 600 : 900));
const carouselCardWidth = computed(() => (isMobile.value ? 280 : 320));
const carouselCardHeight = computed(() => (isMobile.value ? 370 : 400));
const carouselScaleStep = computed(() => (isMobile.value ? 0.15 : 0.08));
const carouselOpacityStep = computed(() => (isMobile.value ? 0.35 : 0.18));

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

const getBorderColor = (id: string): string => {
  const colors: Record<string, string> = {
    about: 'border-about-accent',
    contact: 'border-contact-accent',
    projects: 'border-projects-accent',
    skills: 'border-skills-accent',
  };
  return colors[id] || 'border-about-accent';
};

const getGradientFrom = (id: string): string => {
  const gradients: Record<string, string> = {
    about: 'from-about-accent',
    contact: 'from-contact-accent',
    projects: 'from-projects-accent',
    skills: 'from-skills-accent',
  };
  return gradients[id] || 'from-about-accent';
};

const getGradientTo = (id: string): string => {
  const gradients: Record<string, string> = {
    about: 'to-about-highlight',
    contact: 'to-contact-accent-light',
    projects: 'to-projects-accent-light',
    skills: 'to-skills-highlight',
  };
  return gradients[id] || 'to-about-highlight';
};

const getTextColor = (id: string): string => {
  const colors: Record<string, string> = {
    about: 'text-about-accent',
    contact: 'text-contact-accent',
    projects: 'text-projects-accent',
    skills: 'text-skills-accent',
  };
  return colors[id] || 'text-about-accent';
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 'about',
    title: 'Sobre Mí',
    description: 'Conoce mi historia, habilidades y trayectoria como desarrollador frontend.',
    icon: 'mdi:account',
    href: '/about',
  },
  {
    id: 'projects',
    title: 'Proyectos',
    description: 'Explora mis proyectos más recientes y destacados en desarrollo web.',
    icon: 'mdi:folder-multiple',
    href: '/projects',
  },
  {
    id: 'skills',
    title: 'Habilidades',
    description: 'Descubre las tecnologías y herramientas que domino profesionalmente.',
    icon: 'mdi:tools',
    href: '/skills',
  },
  {
    id: 'contact',
    title: 'Contacto',
    description: 'Conéctate conmigo para colaborar en proyectos o simplemente saludar.',
    icon: 'mdi:email',
    href: '/contact',
  },
];
</script>

