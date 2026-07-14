// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/about",
        "/projects",
        "/skills",
        "/contact",
        // Rutas dinámicas de proyectos
        "/project-detail/chami",
        "/project-detail/changan",
        "/project-detail/colaboradores",
        "/project-detail/fsi",
        "/project-detail/fvf-ccd",
        "/project-detail/keystone",
        "/project-detail/lmbp",
        "/project-detail/oilstone",
        "/project-detail/quic",
        "/project-detail/ticz",
      ],
      ignore: ["/project-detail/undefined"],
      failOnError: false,
    },
  },
  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollToPlugin', 'lenis']
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Julian.dev — Desarrollador Frontend',
      meta: [
        { name: 'description', content: 'Portfolio de Julian, desarrollador frontend especializado en Vue, Nuxt y animaciones web premium.' },
        { name: 'theme-color', content: '#0a0a0a' },
        { property: 'og:title', content: 'Julian.dev — Desarrollador Frontend' },
        { property: 'og:description', content: 'Portfolio de Julian, desarrollador frontend especializado en Vue, Nuxt y animaciones web premium.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    }
  },
  css: ['~/assets/css/animations.css', '~/assets/css/main.css'],
  modules: [
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/content",
  ],
  icon: {
    serverBundle: 'local',
  },
});