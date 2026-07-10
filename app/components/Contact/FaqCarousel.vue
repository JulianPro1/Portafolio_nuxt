<template>
  <div class="relative flex-1 flex flex-col gap-3">
    <!-- BaseCarousel maneja swipe touch nativo + autoplay -->
    <div class="flex-1 min-h-[12rem]">
      <BaseCarousel
        ref="faqCarouselRef"
        :slide-count="faqs.length"
        :autoplay="true"
        :autoplay-delay="5000"
        :autoplay-pause-on-hover="true"
        :loop="true"
        :speed="400"
        @slide-change="onFaqSlideChange"
      >
        <template #slide="{ index }">
          <div class="relative w-full h-full min-h-[12rem] px-1">
            <!-- FAQ Card (Static, modern, without flip) -->
            <div
              class="faq-card w-full h-full min-h-[12rem] rounded-xl border border-contact-accent-dark p-5 flex flex-col items-center justify-center text-center transition-colors duration-300"
              :class="faqActiveIndex === index ? 'bg-contact-accent/20' : 'bg-white/5'"
              @mousemove="onCardMouseMove"
              @mouseleave="onCardMouseLeave"
            >
              <div
                class="faq-icon-wrapper w-10 h-10 flex items-center justify-center rounded-xl mb-3 transition-colors duration-300"
                :class="faqActiveIndex === index ? 'bg-contact-accent/30 border border-contact-accent' : 'bg-contact-accent/10 border border-contact-accent'"
              >
                <Icon
                  name="mdi:help"
                  class="w-5 h-5 transition-colors duration-300"
                  :class="faqActiveIndex === index ? 'text-contact-accent' : 'text-contact-accent/70'"
                />
              </div>
              <h4 class="faq-question font-medium text-base md:text-lg leading-tight text-white mb-4">
                {{ faqs[index]?.question }}
              </h4>
              
              <button
                @click="faqs[index] && openAnswer(faqs[index])"
                class="faq-btn px-5 py-2 text-xs font-semibold rounded-lg bg-contact-accent/20 border border-contact-accent text-white hover:bg-contact-accent hover:border-contact-accent hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all duration-300 flex items-center gap-1.5"
              >
                <Icon name="mdi:message-text-outline" class="w-3.5 h-3.5" />
                Respuesta
              </button>
            </div>
          </div>
        </template>
      </BaseCarousel>
    </div>

    <!-- Controles: flechas + dots -->
    <div class="flex items-center justify-center gap-2">
      <button
        @click="prevSlide"
        class="faq-prev-btn w-7 h-7 flex items-center justify-center rounded-full bg-contact-accent/20 border border-contact-accent text-contact-accent hover:bg-contact-accent/30 hover:border-contact-accent transition-all duration-300"
      >
        <Icon name="mdi:chevron-left" class="w-3.5 h-3.5" />
      </button>

      <div class="flex gap-1">
        <button
          v-for="(_, index) in faqs"
          :key="index"
          @click="faqCarouselRef?.goTo(index)"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="faqActiveIndex === index ? 'bg-contact-accent w-4' : 'bg-contact-accent/30 w-1.5'"
        />
      </div>

      <button
        @click="nextSlide"
        class="faq-next-btn w-7 h-7 flex items-center justify-center rounded-full bg-contact-accent/20 border border-contact-accent text-contact-accent hover:bg-contact-accent/30 hover:border-contact-accent transition-all duration-300"
      >
        <Icon name="mdi:chevron-right" class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Modal Wrapper para Renderizar la Respuesta -->
    <BaseModal :is-open="isModalOpen" @close="closeModal">
      <div v-if="selectedFaq" class="faq-modal-content flex flex-col items-center text-center">
        <div class="faq-modal-icon w-12 h-12 flex items-center justify-center rounded-2xl bg-contact-accent/20 border border-contact-accent/40 mb-4 text-contact-accent shadow-[0_0_15px_rgba(20,184,166,0.2)] animate-pulse">
          <Icon name="mdi:comment-question-outline" class="w-6 h-6" />
        </div>
        
        <h3 class="faq-modal-title text-lg font-bold text-white mb-3 px-4">
          {{ selectedFaq.question }}
        </h3>
        
        <div class="faq-modal-divider w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>
        
        <p class="faq-modal-desc text-sm text-gray-300 leading-relaxed mt-3 px-2">
          {{ selectedFaq.answer }}
        </p>

        <button
          @click="closeModal"
          class="faq-modal-btn mt-6 px-6 py-2 bg-gradient-to-r from-contact-accent to-about-highlight text-white text-xs font-semibold rounded-lg hover:shadow-[0_4px_15px_rgba(20,184,166,0.3)] transition-all duration-300"
        >
          Entendido
        </button>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { gsap } from 'gsap';
import BaseCarousel from '~/components/Common/BaseCarousel.vue';
import BaseModal from '~/components/Common/BaseModal.vue';
import type { ContactFaq } from '~/types';

const faqCarouselRef = ref<InstanceType<typeof BaseCarousel> | null>(null);
const faqActiveIndex = ref(0);

const isModalOpen = ref(false);
const selectedFaq = ref<ContactFaq | null>(null);

// Animación de entrada coordinada de los elementos en el Slide activo
const animateActiveSlide = () => {
  nextTick(() => {
    const activeSlide = document.querySelector('.swiper-slide-active');
    if (activeSlide) {
      const icon = activeSlide.querySelector('.faq-icon-wrapper');
      const question = activeSlide.querySelector('.faq-question');
      const button = activeSlide.querySelector('.faq-btn');
      
      gsap.killTweensOf([icon, question, button]);
      
      gsap.fromTo(icon, 
        { scale: 0.8, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)', clearProps: 'all' }
      );
      
      gsap.fromTo(question, 
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.08, ease: 'power2.out', clearProps: 'all' }
      );
      
      gsap.fromTo(button, 
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'power2.out', clearProps: 'all' }
      );
    }
  });
};

const onFaqSlideChange = (index: number) => {
  faqActiveIndex.value = index;
  animateActiveSlide();
};

onMounted(() => {
  // Animación del slide inicial al montar
  setTimeout(() => {
    animateActiveSlide();
  }, 100);
});

// Card Hover: Efecto 3D Tilt premium
const onCardMouseMove = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  const xc = x / rect.width - 0.5;
  const yc = y / rect.height - 0.5;
  
  const maxTilt = 8;
  
  gsap.to(card, {
    scale: 1.025,
    rotateX: -yc * maxTilt,
    rotateY: xc * maxTilt,
    transformPerspective: 600,
    borderColor: 'rgba(20, 184, 166, 0.4)',
    backgroundColor: 'rgba(20, 184, 166, 0.25)',
    boxShadow: '0 12px 24px -10px rgba(20, 184, 166, 0.25)',
    ease: 'power1.out',
    duration: 0.3,
    overwrite: 'auto'
  });
};

const onCardMouseLeave = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  if (!card) return;
  gsap.to(card, {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    borderColor: 'rgba(20, 184, 166, 0.15)', // border-contact-accent-dark
    backgroundColor: faqActiveIndex.value === Number(card.getAttribute('data-index')) ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255, 255, 255, 0.05)',
    boxShadow: 'none',
    ease: 'power2.out',
    duration: 0.4,
    clearProps: 'transform,boxShadow,rotateX,rotateY,scale,transformPerspective',
    overwrite: 'auto'
  });
};

// Feedback sutil y elástico al hacer click en los botones de navegación
const animateArrow = (direction: 'left' | 'right') => {
  const selector = direction === 'left' ? '.faq-prev-btn' : '.faq-next-btn';
  const arrow = document.querySelector(selector);
  if (arrow) {
    const xVal = direction === 'left' ? -6 : 6;
    gsap.timeline()
      .to(arrow, { x: xVal, scale: 0.9, duration: 0.1, ease: 'power1.out' })
      .to(arrow, { x: 0, scale: 1, duration: 0.25, ease: 'back.out(2)' });
  }
};

const prevSlide = () => {
  faqCarouselRef.value?.prev();
  animateArrow('left');
};

const nextSlide = () => {
  faqCarouselRef.value?.next();
  animateArrow('right');
};

const openAnswer = (faq: ContactFaq) => {
  selectedFaq.value = faq;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    if (!isModalOpen.value) {
      selectedFaq.value = null;
    }
  }, 300);
};

// Animación de entrada coordinada de elementos internos del modal al abrirse
watch(isModalOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      const modalContent = document.querySelector('.faq-modal-content');
      if (modalContent) {
        const icon = modalContent.querySelector('.faq-modal-icon');
        const title = modalContent.querySelector('.faq-modal-title');
        const divider = modalContent.querySelector('.faq-modal-divider');
        const desc = modalContent.querySelector('.faq-modal-desc');
        const btn = modalContent.querySelector('.faq-modal-btn');

        gsap.killTweensOf([icon, title, divider, desc, btn]);

        gsap.fromTo(icon,
          { scale: 0, rotation: -20 },
          { scale: 1, rotation: 0, duration: 0.5, delay: 0.15, ease: 'back.out(1.7)' }
        );

        gsap.fromTo(title,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.25, ease: 'power2.out' }
        );

        gsap.fromTo(divider,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, delay: 0.3, ease: 'power2.inOut' }
        );

        gsap.fromTo(desc,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.35, ease: 'power2.out' }
        );

        gsap.fromTo(btn,
          { opacity: 0, y: 15, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, delay: 0.45, ease: 'back.out(1.5)' }
        );
      }
    });
  }
});

const props = defineProps<{
  faqs: ContactFaq[];
}>();
</script>
