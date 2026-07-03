# Patrón de Páginas y Layouts — Nuxt 3

## Filosofía
Las páginas son componentes **delgados**. No contienen lógica compleja ni componentes UI directamente; delegan todo a un `SectionOrchestrator.vue` de su dominio.

## Estructura de una Página

```vue
<!-- app/pages/about.vue -->
<template>
  <div class="min-h-screen bg-urban-bg">
    <AboutSectionOrchestrator />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Sobre mí | Julian Alejos',
  meta: [{ name: 'description', content: 'Descripción para SEO' }],
})
</script>
```

## Rutas del Proyecto

| Archivo | Ruta |
|---------|------|
| `app/pages/index.vue` | `/` |
| `app/pages/about.vue` | `/about` |
| `app/pages/projects.vue` | `/projects` |
| `app/pages/skills.vue` | `/skills` |
| `app/pages/contact.vue` | `/contact` |
| `app/pages/project-detail/[id_project].vue` | `/project-detail/:id_project` |

## Routing Dinámico
- Los parámetros se acceden con `const route = useRoute()` y luego `route.params.id_project`
- No usar `$route` directamente en templates
- Para navegación programática: `navigateTo('/ruta')`

## Layout Principal (`app/layouts/default.vue`)
- Renderiza `<NavBar />` + `<NuxtPage />` con transiciones de página
- Está configurado en `nuxt.config.ts` con `pageTransition` y `layoutTransition`
- Las animaciones de transición están en `app/assets/css/animations.css`

## Nuxt Config Relevante

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  css: ['~/assets/css/animations.css'],
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', 'vue3-carousel-nuxt', '@pinia/nuxt'],
  nitro: {
    prerender: {
      routes: ['/', '/about', '/projects', '/skills', '/contact'],
    }
  }
})
```

## Prerendering
Las rutas estáticas se prerenderizan. Si se agrega una página nueva, agregarla a `nitro.prerender.routes` en `nuxt.config.ts`.

## Tema por Ruta
Cada ruta tiene un tema de colores definido en `app/store/modules/background.ts → routeThemes`. Si se crea una página nueva, agregar su entrada en `routeThemes` con `backgroundColor`, `navbarBorderColor` y `navbarAccentColor`.

## Auto-imports de Nuxt
Nuxt 3 auto-importa estas funciones (no hace falta importarlas):
- `useRoute`, `useRouter`, `useHead`, `navigateTo`, `clearError`
- `ref`, `computed`, `reactive`, `watch`, `onMounted` (Vue Composition API)
- Composables propios en `app/composables/`
- Stores de Pinia con `useXxxStore()`

## Middleware
La carpeta `app/middleware/` está vacía actualmente. El middleware global se registra en `nuxt.config.ts` si se necesita.
