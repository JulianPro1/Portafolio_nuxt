<template>
  <div 
    class="relative inline-block text-left select-container" 
    :class="[iconOnly ? '' : 'min-w-[200px] md:min-w-[240px]']"
    ref="dropdownRef"
  >
    <!-- Botón del selector -->
    <button
      @click="toggleDropdown"
      :class="[
        iconOnly
          ? 'p-1 rounded-md border border-[var(--category-accent)] bg-neutral-950/90 text-[var(--category-accent)] hover:bg-[var(--category-accent)] hover:text-neutral-950 hover:border-[var(--category-accent)] transition-all duration-300 cursor-pointer flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.5)]'
          : 'w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-[var(--category-accent)] hover:border-[var(--category-accent)]/80 bg-neutral-950/80 hover:bg-neutral-900/60 text-white text-sm font-medium transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md cursor-pointer group'
      ]"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <template v-if="!iconOnly">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-2 h-2 rounded-full bg-[var(--category-accent)] animate-pulse shadow-[0_0_8px_var(--category-accent)] shrink-0"></div>
          <span class="truncate tracking-wide text-neutral-300 group-hover:text-white transition-colors duration-200">
            {{ selectedTitle || placeholder }}
          </span>
        </div>
        <Icon
          name="mdi:chevron-down"
          class="w-5 h-5 text-neutral-400 group-hover:text-[var(--category-accent)] transition-all duration-300 shrink-0"
          ref="chevronRef"
        />
      </template>
      <template v-else>
        <!-- Icono minimalista para el Tab de la Toolbar (Flecha del selector) -->
        <Icon
          name="mdi:chevron-down"
          class="w-4 h-4 transition-colors duration-200"
          ref="chevronRef"
        />
      </template>
    </button>

    <!-- Menú desplegable -->
    <div
      v-show="isOpen"
      ref="menuRef"
      :class="[
        'absolute z-50 mt-2 origin-top rounded-xl border border-[var(--category-accent)] bg-neutral-950/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden opacity-0',
        iconOnly ? 'w-56 left-1/2 -translate-x-1/2' : 'w-full left-0'
      ]"
      style="transform-origin: top center;"
    >
      <div class="py-1.5 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800">
        <button
          v-for="project in projects"
          :key="project.id"
          @click="selectProject(project)"
          class="dropdown-item w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm text-neutral-400 hover:text-white hover:bg-[var(--category-accent)]/15 transition-all duration-200 cursor-pointer"
        >
          <Icon :name="project.icon || 'mdi:cube-outline'" class="w-4 h-4 text-[var(--category-accent)] shrink-0" />
          <span class="truncate font-medium">{{ project.title }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

interface ProjectItem {
  id: string
  title: string
  icon?: string
}

const props = withDefaults(
  defineProps<{
    projects: ProjectItem[]
    placeholder?: string
    iconOnly?: boolean
  }>(),
  {
    placeholder: 'Ir a un proyecto...',
    iconOnly: false,
  }
)

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const isOpen = ref(false)
const selectedTitle = ref('')
const dropdownRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const chevronRef = ref<any>(null)

const toggleDropdown = () => {
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = () => {
  isOpen.value = true
  nextTick(() => {
    if (!menuRef.value) return

    // Animación de apertura del menú
    gsap.fromTo(menuRef.value,
      {
        opacity: 0,
        scaleY: 0.8,
        y: -10
      },
      {
        opacity: 1,
        scaleY: 1,
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto'
      }
    )

    // Animación de rotación del chevron
    if (chevronRef.value?.$el) {
      gsap.to(chevronRef.value.$el, {
        rotation: 180,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    // Animación escalonada (stagger) para los items del menú
    const items = menuRef.value.querySelectorAll('.dropdown-item')
    if (items.length > 0) {
      gsap.fromTo(items,
        {
          opacity: 0,
          x: -12
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.03,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        }
      )
    }
  })
}

const closeDropdown = () => {
  if (!menuRef.value) return

  // Animación de cierre
  gsap.to(menuRef.value, {
    opacity: 0,
    scaleY: 0.8,
    y: -10,
    duration: 0.2,
    ease: 'power2.in',
    overwrite: 'auto',
    onComplete: () => {
      isOpen.value = false
    }
  })

  // Restaurar chevron
  if (chevronRef.value?.$el) {
    gsap.to(chevronRef.value.$el, {
      rotation: 0,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: 'auto'
    })
  }
}

const selectProject = (project: ProjectItem) => {
  selectedTitle.value = project.title
  emit('select', project.id)
  closeDropdown()
  
  // Limpiar selección después de un momento para mantener el placeholder limpio
  setTimeout(() => {
    selectedTitle.value = ''
  }, 1000)
}

// Cerrar si se hace click fuera
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('click', handleClickOutside)
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
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>
