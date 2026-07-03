import { defineStore } from 'pinia'

interface RouteThemeConfig {
  backgroundColor: string
  backgroundClass?: string
  showWaves?: boolean
  wavesGradient?: string
  navbarBorderColor: string
  navbarAccentColor: string
  navbarHighlightColor: string
}

export const useBackgroundStore = defineStore('background', {
  state: () => ({
    backgroundColor: '#0a0a0a',
    backgroundClass: '',
    showWaves: false,
    wavesGradient: 'about-gradient-subtle',
    navbarBorderColor: '#240046',
    navbarAccentColor: '#7B2CBF',
    navbarHighlightColor: '#1F4DD6',
    navbarAccentColorRgb: '123, 44, 191',
    cardBorderColors: {
      about: 'border-about-accent-dark/80',
      contact: 'border-contact-accent/80',
      projects: 'border-projects-accent/80',
      skills: 'border-skills-accent/80',
    },
    domainAccentColors: {
      about: '#7B2CBF',
      contact: '#059669',
      projects: '#1F4DD6',
      skills: '#06B6D4',
    },
    routeThemes: {
      '/': {
        backgroundColor: '#0a0a0a',
        showWaves: true,
        wavesGradient: 'about-gradient-subtle',
        navbarBorderColor: '#240046',
        navbarAccentColor: '#7B2CBF',
        navbarHighlightColor: '#1F4DD6',
      },
      '/about': {
        backgroundColor: '#0a0a0a',
        navbarBorderColor: '#240046',
        navbarAccentColor: '#7B2CBF',
        navbarHighlightColor: '#1F4DD6',
      },
      '/projects': {
        backgroundColor: '#0a0a0a',
        navbarBorderColor: '#1236A1',
        navbarAccentColor: '#1F4DD6',
        navbarHighlightColor: '#06B6D4',
      },
      '/skills': {
        backgroundColor: '#0a0a0a',
        navbarBorderColor: '#004D4D',
        navbarAccentColor: '#06B6D4',
        navbarHighlightColor: '#059669',
      },
      '/contact': {
        backgroundColor: '#0a0a0a',
        navbarBorderColor: '#047857',
        navbarAccentColor: '#059669',
        navbarHighlightColor: '#7B2CBF',
      },
      '/project-detail/:id': {
        backgroundColor: '#0a0a0a',
        navbarBorderColor: '#1236A1',
        navbarAccentColor: '#1F4DD6',
        navbarHighlightColor: '#06B6D4',
      },
    } as Record<string, RouteThemeConfig>,
  }),

  actions: {
    setBackground(color: string) {
      this.backgroundColor = color
    },

    setBackgroundClass(className: string) {
      this.backgroundClass = className
    },

    setBackgroundBoth(color: string, className: string) {
      this.backgroundColor = color
      this.backgroundClass = className
    },

    setWaves(show: boolean, gradient: string = 'about-gradient-subtle') {
      this.showWaves = show
      this.wavesGradient = gradient
    },

    setNavbarColors(borderColor: string, accentColor: string, highlightColor: string) {
      this.navbarBorderColor = borderColor
      this.navbarAccentColor = accentColor
      this.navbarHighlightColor = highlightColor
      this.navbarAccentColorRgb = this.hexToRgb(accentColor)
    },

    hexToRgb(hex: string): string {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      if (!result) return '123, 44, 191'
      return `${parseInt(result[1]!, 16)}, ${parseInt(result[2]!, 16)}, ${parseInt(result[3]!, 16)}`
    },

    resetBackground() {
      this.backgroundColor = '#0a0a0a'
      this.backgroundClass = ''
      this.showWaves = false
      this.wavesGradient = 'about-gradient-subtle'
      this.navbarBorderColor = '#240046'
      this.navbarAccentColor = '#7B2CBF'
      this.navbarHighlightColor = '#1F4DD6'
      this.navbarAccentColorRgb = '123, 44, 191'
    },

    applyThemeForRoute(routePath: string) {
      // Primero intentar match exacto
      let theme = this.routeThemes[routePath]
      
      // Si no hay match exacto, intentar con patrones dinámicos
      if (!theme) {
        for (const [pattern, config] of Object.entries(this.routeThemes)) {
          if (this.matchRoutePattern(pattern, routePath)) {
            theme = config
            break
          }
        }
      }
      
      if (theme) {
        this.setBackground(theme.backgroundColor)
        if (theme.backgroundClass) {
          this.setBackgroundClass(theme.backgroundClass)
        }
        if (theme.showWaves !== undefined) {
          this.setWaves(theme.showWaves, theme.wavesGradient || 'about-gradient-subtle')
        }
        this.setNavbarColors(theme.navbarBorderColor, theme.navbarAccentColor, theme.navbarHighlightColor)
      } else {
        this.resetBackground()
      }
    },

    matchRoutePattern(pattern: string, routePath: string): boolean {
      // Convertir patrón :param a regex
      const regexPattern = pattern
        .replace(/:([a-zA-Z0-9_]+)/g, '([^/]+)')
        .replace(/\*/g, '.*')
      
      const regex = new RegExp(`^${regexPattern}$`)
      return regex.test(routePath)
    },
  },
})
