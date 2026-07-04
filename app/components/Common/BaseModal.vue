<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop/Overlay -->
        <div
          class="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
          @click="close"
        ></div>

        <!-- Modal Wrapper Panel -->
        <div
          class="relative w-full max-w-lg transform rounded-2xl border border-white/10 bg-[#0f172a]/90 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 modal-content-anim"
        >
          <!-- Close Button -->
          <button
            @click="close"
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            aria-label="Cerrar modal"
          >
            <Icon name="mdi:close" class="w-4 h-4" />
          </button>

          <!-- Slot for modal content -->
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    close();
  }
};

// Prevent scroll when modal is open
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  // Restore scroll just in case
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Transición moderna */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content-anim {
  animation: modal-pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.modal-fade-leave-active .modal-content-anim {
  animation: modal-pop-out 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;
}

@keyframes modal-pop-in {
  0% {
    transform: scale(0.9) translateY(10px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@keyframes modal-pop-out {
  0% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  100% {
    transform: scale(0.95) translateY(5px);
    opacity: 0;
  }
}
</style>
