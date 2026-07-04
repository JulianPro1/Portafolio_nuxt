<template>
  <div
    v-if="isVisible"
    ref="containerRef"
    class="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none select-none"
  >
    <!-- Text Bubble -->
    <div
      v-if="isOpen"
      ref="bubbleRef"
      class="pointer-events-auto relative max-w-xs md:max-w-sm rounded-2xl bg-black/90 backdrop-blur-md border border-white/10 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-start gap-3 text-white"
    >
      <!-- Icon indicator -->
      <div class="flex-shrink-0 mt-0.5 text-[#22c55e]">
        <Icon :name="icon" class="w-5 h-5 animate-pulse" />
      </div>

      <!-- Text content -->
      <div class="flex-grow pr-4">
        <p class="text-xs md:text-sm font-medium leading-relaxed text-gray-200">
          {{ message }}
        </p>
      </div>

      <!-- Close Button -->
      <button
        type="button"
        class="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors duration-200"
        @click="dismiss"
        aria-label="Cerrar sugerencia"
      >
        <Icon name="mdi:close" class="w-4 h-4" />
      </button>

      <!-- Bubble pointer (arrow) -->
      <div
        class="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 bg-black/90 border-r border-b border-white/10"
      ></div>
    </div>

    <!-- Floating Bubble Trigger/Avatar -->
    <button
      ref="triggerRef"
      type="button"
      class="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg hover:shadow-[#22c55e]/30 hover:scale-110 active:scale-95 transition-all duration-300 group relative cursor-pointer"
      @click="toggleBubble"
      aria-label="Mostrar sugerencia"
    >
      <!-- Glow effect -->
      <span class="absolute inset-0 rounded-full bg-[#22c55e]/40 animate-ping opacity-75 group-hover:opacity-0 transition-opacity"></span>
      <!-- Main Icon -->
      <Icon :name="triggerIcon" class="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  storageKey: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'mdi:lightbulb-on-outline'
  },
  triggerIcon: {
    type: String,
    default: 'mdi:comment-text-outline'
  }
})

const emit = defineEmits(['update:open', 'dismiss'])

const isVisible = ref(false)
const isOpen = ref(false)

const containerRef = ref<HTMLElement | null>(null)
const bubbleRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)

watch(() => props.open, (newVal) => {
  if (newVal) {
    isOpen.value = true
    nextTick(() => {
      if (bubbleRef.value) {
        gsap.fromTo(bubbleRef.value,
          { scale: 0, opacity: 0, y: 20, rotation: 5, transformOrigin: 'bottom right' },
          { scale: 1, opacity: 1, y: 0, rotation: 0, ease: 'back.out(1.5)', duration: 0.5 }
        )
      }
    })
  } else {
    if (bubbleRef.value && isOpen.value) {
      gsap.to(bubbleRef.value, {
        scale: 0,
        opacity: 0,
        y: 20,
        rotation: 5,
        duration: 0.35,
        ease: 'back.in(1.5)',
        onComplete: () => {
          isOpen.value = false
        }
      })
    } else {
      isOpen.value = false
    }
  }
}, { immediate: true })

onMounted(() => {
  isVisible.value = true
  nextTick(() => {
    if (triggerRef.value) {
      gsap.fromTo(triggerRef.value, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.5 }
      )
    }
  })
})

const toggleBubble = () => {
  emit('update:open', !props.open)
}

const dismiss = () => {
  if (props.storageKey) {
    localStorage.setItem(props.storageKey, 'true')
  }
  emit('dismiss')
  emit('update:open', false)
}
</script>
