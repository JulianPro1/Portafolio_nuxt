import { useNuxtApp } from '#app'

export const useLenis = () => {
  if (import.meta.server) return null
  const nuxtApp = useNuxtApp()
  return (nuxtApp.$lenis as any) || null
}
