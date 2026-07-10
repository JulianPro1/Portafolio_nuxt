<template>
  <div class="group relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-950 transition-[transform,border-color] duration-300 will-change-transform hover:-translate-y-1 hover:border-[color:var(--category-accent)] col-span-1 row-span-1 h-full">
    <!-- Contenido -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full p-4 gap-2 transition-transform duration-300 will-change-transform group-hover:scale-[1.02]">
      <!-- Header icon -->
      <div class="w-10 h-10 flex items-center justify-center rounded-xl border border-[color:var(--category-accent)] bg-[color:color-mix(in_srgb,var(--category-accent)_15%,transparent)] transition-[transform,background-color] duration-300 will-change-transform group-hover:scale-105 group-hover:bg-[color:color-mix(in_srgb,var(--category-accent)_25%,transparent)]">
        <Icon name="mdi:code-tags" class="w-5 h-5 text-[var(--category-accent)]" />
      </div>

      <!-- Tech chips -->
      <div class="flex flex-wrap gap-1.5 justify-center max-w-full">
        <span
          v-for="tech in technologies"
          :key="tech"
          class="flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded-lg border border-white/20 bg-white/5 text-white/80 transition-colors duration-200 hover:border-[color:var(--category-accent)] hover:bg-[color:color-mix(in_srgb,var(--category-accent)_10%,transparent)] hover:text-white"
        >
          <Icon
            v-if="getTechIcon(tech)"
            :name="getTechIcon(tech)"
            class="w-3 h-3 shrink-0"
          />
          <span class="hidden sm:inline">{{ tech }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  technologies: string[]
}>()

/** Mapa de nombre normalizado → ícono de Iconify */
const TECH_ICON_MAP: Record<string, string> = {
  // JavaScript ecosystem
  'vue':              'logos:vue',
  'vue.js':           'logos:vue',
  'vue.js 3':         'logos:vue',
  'nuxt':             'logos:nuxt-icon',
  'nuxt.js':          'logos:nuxt-icon',
  'react':            'logos:react',
  'next':             'logos:nextjs-icon',
  'next.js':          'logos:nextjs-icon',
  'astro':            'logos:astro-icon',
  'vite':             'logos:vitejs',
  'typescript':       'logos:typescript-icon',
  'javascript':       'logos:javascript',
  'node':             'logos:nodejs-icon',
  'node.js':          'logos:nodejs-icon',
  'alpine.js':        'logos:alpinejs-icon',
  'alpine':           'logos:alpinejs-icon',

  // Animation & UI
  'gsap':             'simple-icons:greensock',
  'lenis scroll':     'mdi:scroll',
  'lenis':            'mdi:scroll',
  'swiper':           'simple-icons:swiper',

  // Styling
  'tailwind':         'logos:tailwindcss-icon',
  'tailwindcss':      'logos:tailwindcss-icon',
  'tailwind css':     'logos:tailwindcss-icon',
  'tailwind css v4':  'logos:tailwindcss-icon',
  'bootstrap':        'logos:bootstrap',
  'bootstrap 5':      'logos:bootstrap',
  'sass':             'logos:sass',
  'css':              'logos:css-3',
  'css3':             'logos:css-3',
  'html':             'logos:html-5',
  'html5':            'logos:html-5',

  // Maps & data viz
  'leaflet':          'logos:leaflet',
  'leaflet.js':       'logos:leaflet',
  'mapbox':           'logos:mapbox-icon',
  'd3':               'logos:d3',
  'd3.js':            'logos:d3',

  // Storage
  'dexie.js':         'mdi:database',
  'dexie':            'mdi:database',
  'indexeddb':        'mdi:database-outline',

  // Backend & DB
  'python':           'logos:python',
  'django':           'logos:django-icon',
  'fastapi':          'logos:fastapi-icon',
  'laravel':          'logos:laravel',
  'php':              'logos:php',
  'mysql':            'logos:mysql-icon',
  'postgresql':       'logos:postgresql',
  'postgres':         'logos:postgresql',
  'mongodb':          'logos:mongodb-icon',
  'redis':            'logos:redis',
  'supabase':         'logos:supabase-icon',
  'firebase':         'logos:firebase',

  // Cloud & DevOps
  'docker':           'logos:docker-icon',
  'aws':              'logos:aws',
  'git':              'logos:git-icon',
  'github':           'logos:github-icon',
  'vercel':           'logos:vercel-icon',

  // Other
  'pinia':            'logos:pinia',
  'graphql':          'logos:graphql',
  'prisma':           'logos:prisma',
  'figma':            'logos:figma',
}

function getTechIcon(tech: string): string {
  return TECH_ICON_MAP[tech.toLowerCase()] ?? 'mdi:puzzle-outline'
}
</script>
