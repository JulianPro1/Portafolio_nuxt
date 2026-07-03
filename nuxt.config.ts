// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/about", "/projects", "/skills", "/contact"],
      ignore: ["/project-detail/undefined"],
      failOnError: false,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  css: ['~/assets/css/animations.css', '~/assets/css/main.css'],
  modules: [
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],
});