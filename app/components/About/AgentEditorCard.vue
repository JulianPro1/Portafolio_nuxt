<template>
  <div 
    class="w-full h-[250px] font-mono text-xs rounded-xl border border-white/[0.08] bg-gradient-to-br from-about-base/95 to-about-accent-dark/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
  >
    <!-- Cabecera Editor -->
    <div class="flex items-center justify-between px-4 py-3 bg-black/45 border-b border-white/5 select-none">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80"></span>
      </div>
      <div class="flex items-center gap-1 text-[9px] text-gray-400 font-medium">
        <Icon name="mdi:file-document-outline" class="w-3.5 h-3.5 text-about-pink" />
        <span>{{ modelValue }}</span>
      </div>
      <div class="w-4"></div>
    </div>
    
    <!-- Cuerpo Editor (Sidebar + Visualizador) -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar Explorer -->
      <div class="w-[130px] border-r border-white/5 bg-black/30 p-3.5 overflow-y-auto select-none text-[9px] text-gray-400 shrink-0 scrollbar-thin">
        <div class="font-bold text-gray-500 uppercase tracking-wider mb-2.5 text-[8px]">Explorer</div>
        
        <!-- Archivo AGENT.md -->
        <div class="mb-2">
          <button 
            @click="$emit('update:modelValue', 'AGENT.md')"
            class="flex items-center gap-1 w-full text-left py-0.5 px-1 rounded hover:bg-white/5 hover:text-white transition-colors"
            :class="modelValue === 'AGENT.md' ? 'text-about-fuchsia font-semibold bg-white/5' : ''"
          >
            <span>📄</span>
            <span>AGENT.md</span>
          </button>
        </div>

        <!-- Carpeta skills -->
        <div>
          <button 
            @click="skillsOpen = !skillsOpen"
            class="flex items-center gap-1 text-gray-300 font-medium py-0.5 w-full text-left hover:bg-white/5 px-1 rounded transition-colors"
          >
            <span>{{ skillsOpen ? '📂' : '📁' }}</span>
            <span>skills</span>
          </button>
          <!-- Contenido de skills -->
          <div v-show="skillsOpen" class="pl-3 space-y-0.5 mt-0.5">
            <button 
              v-for="file in ['nuxt.md', 'astro.md', 'vue.md', 'gsap.md', 'tailwind.md', 'bootstrap.md', 'scss.md', 'angular.md', 'etc.md']"
              :key="file"
              @click="$emit('update:modelValue', file)"
              class="flex items-center gap-1 w-full text-left py-0.5 px-1 rounded hover:bg-white/5 hover:text-white transition-colors"
              :class="modelValue === file ? 'text-about-fuchsia font-semibold bg-white/5' : ''"
            >
              <span>📄</span>
              <span class="truncate">{{ file }}</span>
            </button>
          </div>
        </div>

        <!-- Carpeta sub-agents -->
        <div class="mt-1">
          <button 
            @click="subAgentsOpen = !subAgentsOpen"
            class="flex items-center gap-1 text-gray-300 font-medium py-0.5 w-full text-left hover:bg-white/5 px-1 rounded transition-colors"
          >
            <span>{{ subAgentsOpen ? '📂' : '📁' }}</span>
            <span>sub-agents</span>
          </button>
          
          <!-- Archivos sub-agents -->
          <div v-show="subAgentsOpen" class="pl-3 space-y-0.5 mt-0.5">
            <button 
              v-for="file in ['coder.md', 'documenter.md', 'summary.md', 'tasker.md', 'tester.md', 'viewer.md']"
              :key="file"
              @click="$emit('update:modelValue', file)"
              class="flex items-center gap-1 w-full text-left py-0.5 px-1 rounded hover:bg-white/5 hover:text-white transition-colors"
              :class="modelValue === file ? 'text-about-fuchsia font-semibold bg-white/5' : ''"
            >
              <span>📄</span>
              <span class="truncate">{{ file }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Visor de Archivos MD -->
      <div class="flex-1 p-5 overflow-y-auto text-[10px] leading-relaxed text-gray-300 bg-black/10 scrollbar-thin">
        <div class="text-[11px] font-bold text-about-pink border-b border-about-pink/20 pb-1.5 mb-3">
          # {{ files[modelValue]?.title }}
        </div>
        <div class="whitespace-pre-line text-gray-300 text-[10px] leading-relaxed">
          {{ displayedContent }}<span v-if="isTyping" class="animate-pulse text-about-fuchsia font-bold">█</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

interface AgentFile {
  title: string
  content: string
}

const props = defineProps<{
  modelValue: string
  files: Record<string, AgentFile>
  isActive?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const skillsOpen = ref(true)
const subAgentsOpen = ref(true)

const displayedContent = ref('')
const isTyping = ref(false)
let typingInterval: any = null

const startTyping = (text: string) => {
  if (typingInterval) clearInterval(typingInterval)
  displayedContent.value = ''
  isTyping.value = true
  
  let i = 0
  // Ajustar la velocidad según el largo para evitar esperas muy largas
  const speed = text.length > 200 ? 6 : 15 // ms por caracter
  
  typingInterval = setInterval(() => {
    if (i < text.length) {
      displayedContent.value += text.charAt(i)
      i++
    } else {
      clearInterval(typingInterval)
      isTyping.value = false
    }
  }, speed)
}

// Arrancar escritura cuando el archivo cambia (solo si está activo)
watch(() => props.modelValue, (newVal) => {
  if (!props.isActive) return
  const content = props.files[newVal]?.content || ''
  startTyping(content)
})

// Arrancar/detener según el foco de la sección
watch(() => props.isActive, (active) => {
  if (active) {
    const content = props.files[props.modelValue]?.content || ''
    startTyping(content)
  } else {
    if (typingInterval) clearInterval(typingInterval)
    displayedContent.value = ''
    isTyping.value = false
  }
})

onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval)
})
</script>

