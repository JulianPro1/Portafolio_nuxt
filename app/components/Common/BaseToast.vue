<template>
  <Teleport to="body" v-if="isMounted">
    <Transition
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <div
        v-if="show"
        ref="toastRef"
        class="fixed top-6 right-6 z-[9999] flex items-start gap-3 p-4 bg-zinc-950/90 border border-l-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md max-w-sm pointer-events-auto"
        :class="typeClasses"
      >
        <!-- Icon/Emoji -->
        <div class="flex-shrink-0 text-lg mt-0.5">
          <slot name="icon">
            {{ iconEmoji }}
          </slot>
        </div>

        <!-- Content -->
        <div class="flex-1 pr-2">
          <h4 class="font-semibold text-white text-xs">
            {{ title }}
          </h4>
          <p class="text-[11px] text-gray-300 mt-1 leading-relaxed">
            {{ message }}
          </p>
        </div>

        <!-- Close Button -->
        <button
          @click="close"
          class="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="Cerrar notificación"
        >
          <Icon name="mdi:close" class="w-4 h-4" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { gsap } from 'gsap';

interface Props {
  show: boolean;
  title?: string;
  message?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: '¡Mensaje enviado!',
  message: 'Mensaje enviado correctamente. Te responderé lo antes posible.',
  type: 'success',
  duration: 5000,
});

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
  (e: 'close'): void;
}>();

const isMounted = ref(false);
const toastRef = ref<HTMLElement | null>(null);
let autoCloseTimeout: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  isMounted.value = true;
});

onUnmounted(() => {
  clearTimeoutInterval();
});

const typeClasses = computed(() => {
  switch (props.type) {
    case 'error':
      return 'border-red-500/30 border-l-4 border-l-red-500';
    case 'warning':
      return 'border-yellow-500/30 border-l-4 border-l-yellow-500';
    case 'info':
      return 'border-blue-500/30 border-l-4 border-l-blue-500';
    case 'success':
    default:
      return 'border-green-500/30 border-l-4 border-l-green-500';
  }
});

const iconEmoji = computed(() => {
  switch (props.type) {
    case 'error':
      return '❌';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    case 'success':
    default:
      return '✅';
  }
});

const clearTimeoutInterval = () => {
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout);
    autoCloseTimeout = null;
  }
};

const startTimeout = () => {
  clearTimeoutInterval();
  if (props.duration > 0) {
    autoCloseTimeout = setTimeout(() => {
      close();
    }, props.duration);
  }
};

const close = () => {
  emit('update:show', false);
  emit('close');
};

// Reset or start timer when shown changes
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      startTimeout();
    } else {
      clearTimeoutInterval();
    }
  },
  { immediate: true }
);

// GSAP Animations
const onEnter = (el: Element, done: () => void) => {
  gsap.fromTo(el,
    { x: 150, opacity: 0, scale: 0.95 },
    { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', onComplete: done }
  );
};

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    x: 150,
    opacity: 0,
    scale: 0.9,
    duration: 0.4,
    ease: 'power3.in',
    onComplete: done
  });
};
</script>
