<template>
  <div ref="pickerRef" class="relative inline-block">
    <!-- Trigger Button -->
    <button
      type="button"
      @click="toggleOpen"
      :class="[
        'flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-contact-accent hover:bg-contact-accent/10 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-contact-accent/30',
        isOpen ? 'text-contact-accent bg-contact-accent/15' : ''
      ]"
      title="Insertar emoji"
    >
      <Icon name="heroicons:face-smile" class="w-5 h-5" />
    </button>

    <!-- Popover Menu -->
    <Transition
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <div
        v-if="isOpen"
        data-lenis-prevent
        class="absolute right-0 bottom-full mb-2 w-72 h-80 flex flex-col bg-[#121212] border border-emerald-500/30 rounded-xl shadow-2xl overflow-hidden z-50 select-none"
      >
        <!-- Search bar -->
        <div class="p-2 border-b border-emerald-500/20 flex items-center gap-1.5 bg-contact-accent-dark/20">
          <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-gray-400 shrink-0" />
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            placeholder="Buscar emoji..."
            class="w-full bg-transparent border-none text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-0 py-0.5"
            @keydown.esc="isOpen = false"
          />
          <button
            v-if="searchQuery"
            type="button"
            @click="searchQuery = ''"
            class="text-gray-500 hover:text-white transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Emojis Grid / Scroll Area -->
        <div
          ref="scrollAreaRef"
          class="flex-1 overflow-y-auto overflow-x-hidden p-2 custom-scrollbar"
          @scroll="onScroll"
        >
          <!-- Search Results -->
          <div v-if="searchQuery" class="space-y-2">
            <h3 class="text-[10px] uppercase tracking-wider font-semibold text-gray-500 px-1">
              Resultados de búsqueda
            </h3>
            <div v-if="filteredEmojis.length === 0" class="text-center py-8 text-xs text-gray-500">
              No se encontraron emojis
            </div>
            <div v-else class="grid grid-cols-8 gap-1">
              <button
                v-for="emoji in filteredEmojis"
                :key="emoji.char"
                type="button"
                @click="selectEmoji(emoji.char)"
                class="w-7 h-7 flex items-center justify-center text-lg rounded-md hover:bg-contact-accent/20 transition-all duration-150 hover:scale-115 active:scale-90"
                :title="emoji.name"
              >
                {{ emoji.char }}
              </button>
            </div>
          </div>

          <!-- Categorized Emojis (Default view) -->
          <div v-else class="space-y-4">
            <div
              v-for="category in EMOJI_CATEGORIES"
              :key="category.id"
              :id="`category-sec-${category.id}`"
              class="space-y-1.5"
            >
              <h3 class="text-[10px] uppercase tracking-wider font-semibold text-contact-accent/80 px-1 sticky top-0 bg-[#121212] py-0.5 z-10">
                {{ category.name }}
              </h3>
              <div class="grid grid-cols-8 gap-1">
                <button
                  v-for="emoji in category.emojis"
                  :key="emoji.char"
                  type="button"
                  @click="selectEmoji(emoji.char)"
                  class="w-7 h-7 flex items-center justify-center text-lg rounded-md hover:bg-contact-accent/20 transition-all duration-150 hover:scale-115 active:scale-90"
                  :title="emoji.name"
                >
                  {{ emoji.char }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Categories navigation bar at the bottom -->
        <div class="h-9 border-t border-emerald-500/20 bg-contact-accent-dark/10 flex items-center justify-around px-1 shrink-0">
          <button
            v-for="category in EMOJI_CATEGORIES"
            :key="category.id"
            type="button"
            @click="scrollToCategory(category.id)"
            :class="[
              'p-1.5 rounded-lg transition-all duration-200 focus:outline-none',
              activeCategory === category.id
                ? 'text-contact-accent bg-contact-accent/10'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            ]"
            :title="category.name"
            :disabled="!!searchQuery"
          >
            <Icon :name="category.icon" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { EMOJI_CATEGORIES, type EmojiItem } from '~/constants/emojis';
import { gsap } from 'gsap';

const emit = defineEmits<{
  (e: 'select', emoji: string): void;
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const activeCategory = ref('smileys');

const pickerRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const scrollAreaRef = ref<HTMLElement | null>(null);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

// GSAP Transition Hooks
const onBeforeEnter = (el: Element) => {
  gsap.set(el, {
    opacity: 0,
    scale: 0.92,
    y: 10,
    transformOrigin: 'bottom right'
  });
};

const onEnter = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.3,
    ease: 'back.out(1.5)',
    onComplete: done
  });
};

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    scale: 0.92,
    y: 10,
    duration: 0.2,
    ease: 'power2.inOut',
    onComplete: done
  });
};

// Flattened emojis for searching
const allEmojis = computed(() => {
  return EMOJI_CATEGORIES.flatMap(cat => cat.emojis);
});

// Filtering logic
const filteredEmojis = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return [];
  
  return allEmojis.value.filter(emoji => 
    emoji.name.toLowerCase().includes(query) ||
    emoji.keywords.some(kw => kw.toLowerCase().includes(query))
  );
});

// Reset search and focus input when opened
watch(isOpen, (newVal) => {
  if (newVal) {
    searchQuery.value = '';
    activeCategory.value = 'smileys';
    nextTick(() => {
      searchInputRef.value?.focus();
      // Add event listener to detect click outside
      document.addEventListener('click', handleClickOutside);
    });
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

const selectEmoji = (emojiChar: string) => {
  emit('select', emojiChar);
};

// Scroll to category in the viewport
const scrollToCategory = (categoryId: string) => {
  activeCategory.value = categoryId;
  const section = document.getElementById(`category-sec-${categoryId}`);
  if (section && scrollAreaRef.value) {
    const topPos = section.offsetTop - scrollAreaRef.value.offsetTop;
    scrollAreaRef.value.scrollTo({
      top: topPos,
      behavior: 'smooth'
    });
  }
};

// Auto update active category on scroll
const onScroll = () => {
  if (searchQuery.value || !scrollAreaRef.value) return;

  const scrollContainer = scrollAreaRef.value;
  const scrollTop = scrollContainer.scrollTop;
  const containerOffset = scrollContainer.offsetTop;

  let currentCategory = EMOJI_CATEGORIES[0]?.id || 'smileys';

  for (const category of EMOJI_CATEGORIES) {
    const section = document.getElementById(`category-sec-${category.id}`);
    if (section) {
      const sectionTop = section.offsetTop - containerOffset;
      // If we've scrolled past this section's header
      if (scrollTop >= sectionTop - 10) {
        currentCategory = category.id;
      }
    }
  }

  activeCategory.value = currentCategory;
};

// Handle click outside to close picker
const handleClickOutside = (event: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.45);
}
</style>
