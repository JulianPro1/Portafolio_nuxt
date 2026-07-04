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

const DEFAULT_CONFIG = {
  backgroundColor: 'hsl(0, 0%, 4%)',
  backgroundClass: '',
  showWaves: false,
  wavesGradient: 'about-gradient-subtle',
  navbarBorderColor: 'hsl(271, 100%, 14%)',
  navbarAccentColor: 'hsl(272, 63%, 46%)',
  navbarHighlightColor: 'hsl(225, 75%, 48%)',
  navbarAccentColorHslComponents: '272, 63%, 46%',
} as const

export const useBackgroundStore = defineStore('background', {
  state: () => ({
    backgroundColor: DEFAULT_CONFIG.backgroundColor as string,
    backgroundClass: DEFAULT_CONFIG.backgroundClass as string,
    showWaves: DEFAULT_CONFIG.showWaves as boolean,
    wavesGradient: DEFAULT_CONFIG.wavesGradient as string,
    navbarBorderColor: DEFAULT_CONFIG.navbarBorderColor as string,
    navbarAccentColor: DEFAULT_CONFIG.navbarAccentColor as string,
    navbarHighlightColor: DEFAULT_CONFIG.navbarHighlightColor as string,
    navbarAccentColorHslComponents: DEFAULT_CONFIG.navbarAccentColorHslComponents as string,
    domainAccentColors: {
      about: 'hsl(270, 67%, 45%)',
      contact: 'hsl(145, 65%, 42%)',
      projects: 'hsl(225, 75%, 48%)',
      skills: 'hsl(180, 70%, 60%)',
    },
    routeThemes: {
      '/': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        showWaves: true,
        wavesGradient: 'about-gradient-subtle',
        navbarBorderColor: 'hsl(271, 100%, 14%)',
        navbarAccentColor: 'hsl(272, 63%, 46%)',
        navbarHighlightColor: 'hsl(330, 90%, 55%)',
      },
      '/about': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(271, 100%, 14%)',
        navbarAccentColor: 'hsl(272, 63%, 46%)',
        navbarHighlightColor: 'hsl(330, 90%, 55%)',
      },
      '/projects': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(225, 80%, 35%)',
        navbarAccentColor: 'hsl(225, 75%, 48%)',
        navbarHighlightColor: 'hsl(189, 95%, 43%)',
      },
      '/skills': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(180, 100%, 15%)',
        navbarAccentColor: 'hsl(189, 95%, 43%)',
        navbarHighlightColor: 'hsl(161, 94%, 30%)',
      },
      '/contact': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(163, 94%, 24%)',
        navbarAccentColor: 'hsl(161, 94%, 30%)',
        navbarHighlightColor: 'hsl(115, 70%, 45%)',
      },
      '/project-detail/:id': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(225, 80%, 35%)',
        navbarAccentColor: 'hsl(225, 75%, 48%)',
        navbarHighlightColor: 'hsl(189, 95%, 43%)',
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
      this.navbarAccentColorHslComponents = this.extractHslComponents(accentColor)
    },

    extractHslComponents(color: string): string {
      const hslMatch = /hsl\(\s*(\d+)\s*,\s*([\d.]+%)\s*,\s*([\d.]+%)\s*\)/i.exec(color)
      if (hslMatch) {
        return `${hslMatch[1]}, ${hslMatch[2]}, ${hslMatch[3]}`
      }
      
      // Fallback conversion for HEX if needed
      if (color.startsWith('#')) {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16) / 255
        const g = parseInt(hex.substring(2, 4), 16) / 255
        const b = parseInt(hex.substring(4, 6), 16) / 255
        const max = Math.max(r, g, b), min = Math.min(r, g, b)
        let h = 0, s = 0, l = (max + min) / 2
        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
          }
          h /= 6
        }
        return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
      }
      
      return '272, 63%, 46%'
    },

    resetBackground() {
      this.backgroundColor = DEFAULT_CONFIG.backgroundColor
      this.backgroundClass = DEFAULT_CONFIG.backgroundClass
      this.showWaves = DEFAULT_CONFIG.showWaves
      this.wavesGradient = DEFAULT_CONFIG.wavesGradient
      this.navbarBorderColor = DEFAULT_CONFIG.navbarBorderColor
      this.navbarAccentColor = DEFAULT_CONFIG.navbarAccentColor
      this.navbarHighlightColor = DEFAULT_CONFIG.navbarHighlightColor
      this.navbarAccentColorHslComponents = DEFAULT_CONFIG.navbarAccentColorHslComponents
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
