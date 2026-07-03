import type { CategoryConfig } from '~/types/projects'
import { colorMap } from '~/utils/colorConverter'

export const categoryConfigs: Record<string, CategoryConfig> = {
  destacados: {
    badge: {
      text: 'Destacado',
      icon: 'mdi:star',
      color: 'hsl(50, 80%, 48%)',
    },
    colors: {
      primary: 'hsl(50, 80%, 48%)',
      secondary: 'hsl(50, 75%, 65%)',
      hover: 'hsl(50, 80%, 48%)',
    },
    links: {
      showGithub: true,
      showCaseStudy: false,
    },
  },
  'en-produccion': {
    badge: {
      text: 'En producción',
      icon: 'mdi:rocket-launch',
      color: 'hsl(50, 75%, 65%)',
    },
    colors: {
      primary: 'hsl(50, 75%, 65%)',
      secondary: 'hsl(50, 80%, 48%)',
      hover: 'hsl(50, 75%, 65%)',
    },
    links: {
      showGithub: false,
      showCaseStudy: true,
    },
  },
  'en-desarrollo': {
    badge: {
      text: 'En desarrollo',
      icon: 'mdi:code',
      color: 'hsl(50, 80%, 48%)',
    },
    colors: {
      primary: 'hsl(50, 80%, 48%)',
      secondary: 'hsl(50, 75%, 65%)',
      hover: 'hsl(50, 80%, 48%)',
    },
    links: {
      showGithub: true,
      showCaseStudy: false,
    },
  },
  personales: {
    badge: {
      text: 'Personal',
      icon: 'mdi:heart',
      color: 'hsl(50, 75%, 65%)',
    },
    colors: {
      primary: 'hsl(50, 75%, 65%)',
      secondary: 'hsl(50, 80%, 48%)',
      hover: 'hsl(50, 75%, 65%)',
    },
    links: {
      showGithub: true,
      showCaseStudy: false,
    },
  },
}

export function getCategoryConfig(category: string): CategoryConfig {
  const config = categoryConfigs[category as keyof typeof categoryConfigs]
  return (config || categoryConfigs.destacados) as CategoryConfig
}
