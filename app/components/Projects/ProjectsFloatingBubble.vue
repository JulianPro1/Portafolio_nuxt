<template>
  <!-- Solo visible en mobile -->
  <div class="fixed bottom-6 right-5 z-50 md:hidden" ref="bubbleRef">
    <!-- Dropdown hacia arriba -->
    <div
      v-if="isOpen"
      ref="menuRef"
      class="absolute bottom-16 right-0 w-64 rounded-2xl border border-white/10 bg-neutral-950/95 backdrop-blur-2xl shadow-[0_-12px_48px_rgba(0,0,0,0.7)] overflow-hidden"
    >
      <!-- Header del menú -->
      <div class="px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-white/40 animate-pulse"></div>
        <span class="text-xs font-semibold uppercase tracking-widest text-white/50">Proyectos</span>
      </div>

      <!-- Lista de categorías con proyectos -->
      <div class="py-1.5 max-h-[60vh] overflow-y-auto scrollbar-thin">
        <template v-for="(category, catIdx) in categoriesWithProjects" :key="category.id">
          <!-- Separador de categoría -->
          <div class="px-4 pt-3 pb-1.5 flex items-center gap-2">
            <Icon
              :name="category.icon"
              class="w-3.5 h-3.5 shrink-0"
              :style="{ color: `var(--projects-accent-${categoryKey(category.id)})` }"
            />
            <span
              class="text-[10px] font-bold uppercase tracking-widest"
              :style="{ color: `var(--projects-accent-${categoryKey(category.id)})` }"
            >
              {{ category.label }}
            </span>
          </div>

          <!-- Items de proyectos -->
          <button
            v-for="project in category.projects"
            :key="project.id"
            @click="handleSelect(project.id, category.id)"
            class="bubble-item w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-neutral-400 hover:text-white transition-all duration-200 cursor-pointer group"
            :data-accent="`var(--projects-accent-${categoryKey(category.id)})`"
          >
            <Icon
              :name="project.icon || 'mdi:cube-outline'"
              class="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
              :style="{ color: `var(--projects-accent-${categoryKey(category.id)})` }"
            />
            <span class="truncate font-medium group-hover:text-white">{{ project.title }}</span>
            <Icon
              name="mdi:chevron-right"
              class="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-60 transition-all duration-200 shrink-0"
            />
          </button>

          <!-- Separador visual entre categorías -->
          <div
            v-if="catIdx < categoriesWithProjects.length - 1"
            class="mx-4 my-1 h-px bg-white/5"
          ></div>
        </template>
      </div>
    </div>

    <!-- Botón burbuja flotante -->
    <div class="relative flex flex-col items-center" ref="buttonWrapRef">
      <button
        @click.stop="toggleMenu"
        class="bubble-btn relative rounded-full border-2 bg-neutral-900/95 backdrop-blur-xl flex items-center justify-center cursor-pointer group overflow-hidden"
        :class="isOpen ? 'scale-95' : 'active:scale-95'"
        :style="bubbleStyle"
        style="width: 60px; height: 60px;"
        aria-label="Navegar a proyectos"
      >
        <!-- Glow interior permanente -->
        <div
          class="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500"
          :style="{ background: `radial-gradient(circle at 35% 35%, ${accentColor}44 0%, transparent 65%)`, opacity: isOpen ? 0.3 : 1 }"
        ></div>

        <!-- Glow exterior hover -->
        <div
          class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          :style="{ background: `radial-gradient(circle, ${accentColor}55 0%, transparent 70%)` }"
        ></div>

        <!-- Anillo pulsante rápido -->
        <div
          v-if="!isOpen"
          class="absolute rounded-full border-2 animate-ping pointer-events-none"
          :style="{ inset: '-4px', borderColor: accentColor, animationDuration: '1.8s', opacity: 0.55 }"
        ></div>
        <!-- Anillo pulsante lento -->
        <div
          v-if="!isOpen"
          class="absolute rounded-full border animate-ping pointer-events-none"
          :style="{ inset: '-10px', borderColor: accentColor, animationDuration: '2.8s', opacity: 0.25 }"
        ></div>

        <!-- Icono -->
        <Icon
          :name="isOpen ? 'mdi:close' : 'mdi:format-list-bulleted'"
          class="w-6 h-6 relative z-10 transition-all duration-300"
          :style="{ color: isOpen ? '#fff' : accentColor, filter: isOpen ? '' : `drop-shadow(0 0 6px ${accentColor})`, transform: isOpen ? 'rotate(90deg)' : '' }"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { getProjectsData } from '~/data/projectsData'

const props = defineProps<{
  activeTab?: string
}>()

const emit = defineEmits<{
  (e: 'select', projectId: string, categoryId: string): void
}>()

const isOpen = ref(false)
const bubbleRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const tabs = [
  { id: 'destacados', label: 'Destacados', icon: 'mdi:star' },
  { id: 'en-produccion', label: 'En producción', icon: 'mdi:rocket-launch' },
  { id: 'en-desarrollo', label: 'En desarrollo', icon: 'mdi:code' },
  { id: 'personales', label: 'Personales', icon: 'mdi:account' },
]

const categoryKey = (id: string) => {
  const map: Record<string, string> = {
    'destacados': 'destacados',
    'en-produccion': 'produccion',
    'en-desarrollo': 'desarrollo',
    'personales': 'personales',
  }
  return map[id] || 'produccion'
}

// Color de acento basado en el tab activo (igual que la toolbar)
const accentVarName = computed(() => {
  const key = categoryKey(props.activeTab || 'destacados')
  return `var(--projects-accent-${key})`
})

const accentColor = computed(() => accentVarName.value)

// Estilos dinámicos del botón burbuja sincronizados con la toolbar
const bubbleStyle = computed(() => ({
  borderColor: accentVarName.value,
  boxShadow: `0 8px 40px rgba(0,0,0,0.7), 0 0 24px ${accentVarName.value}88, 0 0 48px ${accentVarName.value}33`,
  transition: 'border-color 0.5s ease, box-shadow 0.5s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
}))

const categoriesWithProjects = computed(() =>
  tabs.map(tab => ({
    ...tab,
    projects: getProjectsData(tab.id).flatMap((slide: any) => slide.cards),
  })).filter(cat => cat.projects.length > 0)
)

const toggleMenu = () => {
  if (isOpen.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

const openMenu = () => {
  isOpen.value = true
  nextTick(() => {
    if (!menuRef.value) return
    gsap.fromTo(
      menuRef.value,
      { opacity: 0, y: 16, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.4)', overwrite: 'auto' }
    )
    const items = menuRef.value.querySelectorAll('.bubble-item')
    if (items.length > 0) {
      gsap.fromTo(
        items,
        { opacity: 0, x: 8 },
        { opacity: 1, x: 0, stagger: 0.02, duration: 0.22, ease: 'power2.out', overwrite: 'auto' }
      )
    }
  })
}

const closeMenu = () => {
  if (!menuRef.value) {
    isOpen.value = false
    return
  }
  gsap.to(menuRef.value, {
    opacity: 0,
    y: 12,
    scale: 0.94,
    duration: 0.2,
    ease: 'power2.in',
    overwrite: 'auto',
    onComplete: () => { isOpen.value = false },
  })
}

const handleSelect = (projectId: string, categoryId: string) => {
  emit('select', projectId, categoryId)
  closeMenu()
}

const handleClickOutside = (e: MouseEvent) => {
  if (bubbleRef.value && !bubbleRef.value.contains(e.target as Node)) {
    if (isOpen.value) closeMenu()
  }
}

const buttonWrapRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('click', handleClickOutside)
    // Bounce-in intro animation
    nextTick(() => {
      if (buttonWrapRef.value) {
        gsap.fromTo(
          buttonWrapRef.value,
          { scale: 0, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: 'back.out(2)', overwrite: 'auto' }
        )
      }
    })
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('click', handleClickOutside)
  }
})
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 3px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}

.bubble-item:hover {
  background-color: rgba(255, 255, 255, 0.04);
}

/* Tooltip oculto por defecto, visible en hover del wrapper */
.bubble-tooltip {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
}

.relative:hover .bubble-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Animación flotante continua del botón */
.bubble-btn {
  animation: bubble-float 3s ease-in-out infinite;
  transform-origin: center;
}

.bubble-btn:hover,
.bubble-btn:active {
  animation-play-state: paused;
}

@keyframes bubble-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
</style>
