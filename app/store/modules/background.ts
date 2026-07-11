import { defineStore } from 'pinia'
import { ROUTE_DEFAULTS } from '@/constants/colors'
import type { RouteThemeConfig } from '@/types/route-themes'

/** Fallback absoluto si la ruta no coincide con ninguna entrada de ROUTE_DEFAULTS */
const ABSOLUTE_FALLBACK = ROUTE_DEFAULTS['/']!

export const useBackgroundStore = defineStore('background', {
  state: () => ({
    backgroundColor: ABSOLUTE_FALLBACK.backgroundColor as string,
    backgroundClass: ABSOLUTE_FALLBACK.backgroundClass as string,
    navbarBorderColor: ABSOLUTE_FALLBACK.navbarBorderColor as string,
    navbarAccentColor: ABSOLUTE_FALLBACK.navbarAccentColor as string,
    navbarHighlightColor: ABSOLUTE_FALLBACK.navbarHighlightColor as string,
    navbarAccentColorHslComponents: ABSOLUTE_FALLBACK.navbarAccentColorHslComponents as string,
    /** Colores base del degradado de la ruta actual (fuente de verdad) */
    navbarProgressColors: [...(ABSOLUTE_FALLBACK.navbarProgressColors ?? [])] as string[],
    /** Colores activos que renderiza la navbar (controlados por componentes via store) */
    navbarProgressColorsActive: [...(ABSOLUTE_FALLBACK.navbarProgressColors ?? [])] as string[],
    domainAccentColors: {
      about: 'hsl(270, 67%, 45%)',
      contact: 'hsl(145, 65%, 42%)',
      projects: 'hsl(225, 75%, 48%)',
      skills: 'hsl(180, 70%, 60%)',
    },
    routeThemes: {
      '/': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(271, 100%, 14%)',
        navbarAccentColor: 'hsl(272, 63%, 46%)',
        navbarHighlightColor: 'hsl(330, 90%, 55%)',
        navbarProgressColors: ['hsl(272, 63%, 46%)', 'hsl(310, 80%, 55%)', 'hsl(330, 90%, 55%)'],
      },
      '/about': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(271, 100%, 14%)',
        navbarAccentColor: 'hsl(272, 63%, 46%)',
        navbarHighlightColor: 'hsl(330, 90%, 55%)',
        navbarProgressColors: ['hsl(272, 63%, 46%)', 'hsl(310, 80%, 55%)', 'hsl(330, 90%, 55%)'],
      },
      '/projects': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(225, 80%, 35%)',
        navbarAccentColor: 'hsl(225, 75%, 48%)',
        navbarHighlightColor: 'hsl(189, 95%, 43%)',
        navbarProgressColors: ['hsl(225, 75%, 48%)', 'hsl(207, 85%, 55%)', 'hsl(189, 95%, 43%)', 'hsl(135, 70%, 42%)'],
        deferGradient: true,
      },
      '/skills': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(180, 100%, 15%)',
        navbarAccentColor: 'hsl(189, 95%, 43%)',
        navbarHighlightColor: 'hsl(161, 94%, 30%)',
        navbarProgressColors: ['hsl(189, 95%, 43%)', 'hsl(175, 90%, 38%)', 'hsl(161, 94%, 30%)'],
      },
      '/contact': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(163, 94%, 24%)',
        navbarAccentColor: 'hsl(161, 94%, 30%)',
        navbarHighlightColor: 'hsl(115, 70%, 45%)',
        navbarProgressColors: ['hsl(161, 94%, 30%)', 'hsl(138, 80%, 40%)', 'hsl(115, 70%, 45%)'],
      },
      '/project-detail/:id': {
        backgroundColor: 'hsl(0, 0%, 4%)',
        navbarBorderColor: 'hsl(225, 80%, 35%)',
        navbarAccentColor: 'hsl(225, 75%, 48%)',
        navbarHighlightColor: 'hsl(189, 95%, 43%)',
        navbarProgressColors: ['hsl(225, 75%, 48%)', 'hsl(207, 85%, 55%)', 'hsl(189, 95%, 43%)'],
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


    setNavbarColors(
      borderColor: string,
      accentColor: string,
      highlightColor: string,
      progressColors?: string[],
      deferGradient?: boolean,
    ) {
      this.navbarBorderColor = borderColor
      this.navbarAccentColor = accentColor
      this.navbarHighlightColor = highlightColor
      this.navbarAccentColorHslComponents = this.extractHslComponents(accentColor)
      if (progressColors && progressColors.length >= 2) {
        this.navbarProgressColors = progressColors
        if (deferGradient) {
          // Rutas con tabs (ej: /projects): arrancar con un solo color.
          // El composable externo ajustará progresivamente según el tab activo.
          const firstColor = progressColors[0]!
          this.navbarProgressColorsActive = [firstColor, firstColor]
        } else {
          // Rutas sin tabs (about, skills, contact, etc.): gradiente completo de inmediato.
          this.navbarProgressColorsActive = progressColors
        }
      }
    },

    /**
     * Actualiza los colores activos que renderiza la navbar.
     * Llamado directamente por componentes/composables para controlar el estado visual
     * sin necesidad de lógica de slicing en el store.
     * @param colors Array de colores HSL (mínimo 2 para gradiente válido)
     */
    setNavbarProgressColorsActive(colors: string[]) {
      if (!colors || colors.length === 0) return
      // Garantizar mínimo 2 colores para que el gradiente CSS sea válido
      this.navbarProgressColorsActive = colors.length === 1
        ? [colors[0]!, colors[0]!]
        : colors
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

    /**
     * Resetea el estado al default de la ruta indicada.
     * Si la ruta no tiene entrada en ROUTE_DEFAULTS se usa ABSOLUTE_FALLBACK.
     * Esto evita que un error en /projects aplique los colores de /about.
     */
    resetBackground(routePath?: string) {
      const defaults = routePath
        ? this.resolveRouteDefaults(routePath)
        : ABSOLUTE_FALLBACK
      this.backgroundColor = defaults.backgroundColor
      this.backgroundClass = defaults.backgroundClass ?? ''
      this.navbarBorderColor = defaults.navbarBorderColor
      this.navbarAccentColor = defaults.navbarAccentColor
      this.navbarHighlightColor = defaults.navbarHighlightColor
      this.navbarAccentColorHslComponents = defaults.navbarAccentColorHslComponents ?? this.extractHslComponents(defaults.navbarAccentColor)
      this.navbarProgressColors = [...(defaults.navbarProgressColors ?? [])]
      this.navbarProgressColorsActive = [...(defaults.navbarProgressColors ?? [])]
    },

    /**
     * Resuelve el default correcto para una ruta dada.
     * Prueba match exacto primero, luego por prefijo (ej: /project-detail/123 → /project-detail).
     */
    resolveRouteDefaults(routePath: string) {
      // Match exacto
      if (ROUTE_DEFAULTS[routePath]) return ROUTE_DEFAULTS[routePath]!
      // Match por prefijo (rutas dinámicas como /project-detail/:id)
      const prefix = Object.keys(ROUTE_DEFAULTS).find(key => routePath.startsWith(key + '/'))
      return prefix ? ROUTE_DEFAULTS[prefix]! : ABSOLUTE_FALLBACK
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
        this.setNavbarColors(
          theme.navbarBorderColor,
          theme.navbarAccentColor,
          theme.navbarHighlightColor,
          theme.navbarProgressColors,
          theme.deferGradient,
        )
      } else {
        // Pasar la ruta para que el reset use los colores correctos de esa vista
        this.resetBackground(routePath)
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
