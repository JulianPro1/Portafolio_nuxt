<template>
  <section
    v-if="computedGallery && computedGallery.length > 0"
    class="rounded-3xl overflow-hidden p-4 md:p-6 border border-white/15 bg-neutral-950"
  >
    <div class="relative group/gallery">
      <!-- Imagen principal activa -->
      <div 
        class="relative h-[300px] md:h-[480px] w-full rounded-2xl overflow-hidden cursor-pointer shadow-inner bg-black/40 border border-gray-800"
        @click="openModal"
      >
        <Transition
          :css="false"
          @before-enter="beforeEnterImage"
          @enter="enterImage"
          @leave="leaveImage"
          mode="out-in"
        >
          <img
            :key="activeImageIndex"
            :src="computedGallery[activeImageIndex].url"
            :alt="computedGallery[activeImageIndex].alt"
            class="absolute inset-0 w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700"
          />
        </Transition>

        <!-- Backdrop oscuro para mejorar legibilidad -->
        <div class="absolute inset-0 bg-black/50 pointer-events-none z-10"></div>
        
        <!-- Info overlay en la imagen activa -->
        <Transition
          :css="false"
          @before-enter="beforeEnterOverlay"
          @enter="enterOverlay"
          @leave="leaveOverlay"
          mode="out-in"
        >
          <div 
            :key="activeImageIndex" 
            class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20"
          >
            <span class="text-xs text-projects-accent-light font-semibold uppercase tracking-wider block">
              Vista {{ activeImageIndex + 1 }} de {{ computedGallery.length }}
            </span>
            <h3 class="text-white text-lg font-semibold mt-1">
              {{ computedGallery[activeImageIndex].title || 'Captura de pantalla' }}
            </h3>
            <p class="text-global-text-muted text-sm mt-1 font-light" v-if="computedGallery[activeImageIndex].description">
              {{ computedGallery[activeImageIndex].description }}
            </p>
          </div>
        </Transition>

        <!-- Botones de Navegación Rápida -->
        <button
          v-if="computedGallery.length > 1"
          @click.stop="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/10 hover:scale-110 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 z-30"
          aria-label="Imagen anterior"
        >
          <Icon name="mdi:chevron-left" class="w-6 h-6" />
        </button>
        <button
          v-if="computedGallery.length > 1"
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/10 hover:scale-110 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 z-30"
          aria-label="Siguiente imagen"
        >
          <Icon name="mdi:chevron-right" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Miniaturas (Thumbnails) -->
    <div v-if="computedGallery.length > 1" class="mt-4 flex gap-3 overflow-x-auto py-2 scroll-smooth-x no-scrollbar">
      <button
        v-for="(image, index) in computedGallery"
        :key="index"
        @click="selectImage(index)"
        class="relative flex-shrink-0 w-20 h-16 md:w-24 md:h-18 rounded-lg overflow-hidden border transition-all duration-300"
        :class="index === activeImageIndex ? 'border-projects-accent ring-2 ring-projects-accent-light/30 scale-[0.97]' : 'border-gray-800 opacity-60 hover:opacity-100 hover:scale-[1.03]'"
      >
        <img :src="image.url" :alt="image.alt" class="w-full h-full object-cover" />
      </button>
    </div>

    <!-- Fullscreen Modal View -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-lg select-none"
          @click="closeModal"
          @wheel.prevent
          @touchmove.prevent
        >
          <!-- Modal Top Bar -->
          <div class="w-full p-4 md:p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
            <span class="text-sm font-semibold text-projects-accent-light uppercase tracking-wider">
              {{ activeImageIndex + 1 }} / {{ computedGallery.length }}
            </span>
            <button
              @click.stop="closeModal"
              class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
              aria-label="Cerrar vista completa"
            >
              <Icon name="mdi:close" class="w-8 h-8" />
            </button>
          </div>

          <!-- Modal Main Image Viewport -->
          <div class="relative flex-1 w-full h-full flex items-center justify-center p-4">
            <!-- Left Arrow -->
            <button
              v-if="computedGallery.length > 1"
              @click.stop="prevImage"
              class="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:scale-105 transition-all duration-300 z-20"
              aria-label="Imagen anterior"
            >
              <Icon name="mdi:chevron-left" class="w-8 h-8" />
            </button>

            <!-- Large image container -->
            <div class="w-full h-full max-h-[80vh] flex items-center justify-center" @click.stop>
              <Transition name="fade" mode="out-in">
                <img
                  :key="activeImageIndex"
                  :src="computedGallery[activeImageIndex].url"
                  :alt="computedGallery[activeImageIndex].alt"
                  class="max-w-full max-h-full object-contain pointer-events-none"
                />
              </Transition>
            </div>

            <!-- Right Arrow -->
            <button
              v-if="computedGallery.length > 1"
              @click.stop="nextImage"
              class="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:scale-105 transition-all duration-300 z-20"
              aria-label="Siguiente imagen"
            >
              <Icon name="mdi:chevron-right" class="w-8 h-8" />
            </button>
          </div>

        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  gallery: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const route = useRoute();
const projectId = route.params.id_project;

// Intentar consumir la colección de galerías JSON
const { data: galleryData } = await useAsyncData(`gallery-${projectId}`, () => {
  return queryCollection('projectGalleries')
    .where('stem', '=', `projects/${projectId}/gallery`)
    .first();
});

const computedGallery = computed(() => {
  return galleryData.value?.images || props.gallery || [];
});

const activeImageIndex = ref(0);
const direction = ref("next");
const isTransitioning = ref(false);
const isModalOpen = ref(false);

const nextImage = () => {
  if (isTransitioning.value || computedGallery.value.length <= 1) return;
  isTransitioning.value = true;
  direction.value = "next";
  activeImageIndex.value = (activeImageIndex.value + 1) % computedGallery.value.length;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const prevImage = () => {
  if (isTransitioning.value || computedGallery.value.length <= 1) return;
  isTransitioning.value = true;
  direction.value = "prev";
  activeImageIndex.value = (activeImageIndex.value - 1 + computedGallery.value.length) % computedGallery.value.length;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const selectImage = (index) => {
  if (isTransitioning.value || index === activeImageIndex.value) return;
  isTransitioning.value = true;
  direction.value = index > activeImageIndex.value ? "next" : "prev";
  activeImageIndex.value = index;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

// Modal handlers
const openModal = () => {
  isModalOpen.value = true;
  window.addEventListener("keydown", handleKeyDown);
};

const closeModal = () => {
  isModalOpen.value = false;
  window.removeEventListener("keydown", handleKeyDown);
};

const handleKeyDown = (e) => {
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
};

watch(isModalOpen, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  document.body.style.overflow = "";
});

// GSAP Image Transitions
const beforeEnterImage = (el) => {
  gsap.set(el, {
    scale: 1.02,
    opacity: 0,
  });
};

const enterImage = (el, done) => {
  gsap.to(el, {
    scale: 1,
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
    onComplete: done,
  });
};

const leaveImage = (el, done) => {
  gsap.to(el, {
    scale: 0.98,
    opacity: 0,
    duration: 0.4,
    ease: "power2.out",
    onComplete: done,
  });
};

// GSAP Overlay Transitions
const beforeEnterOverlay = (el) => {
  gsap.set(el, {
    opacity: 0,
    y: 8,
  });
};

const enterOverlay = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out",
    onComplete: done,
  });
};

const leaveOverlay = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: -8,
    duration: 0.25,
    ease: "power2.in",
    onComplete: done,
  });
};
</script>

<style scoped>
/* Ocultar scrollbar horizontal en miniaturas */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Modal Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
