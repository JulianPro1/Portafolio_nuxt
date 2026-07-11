import type { RouteThemeConfig } from '@/types/route-themes'

/**
 * Fallbacks por ruta (o prefijo de ruta).
 * Se usa cuando ocurre un error / no existe tema y hay que resetear el estado.
 * Así cada vista resetea a sus propios colores en lugar de a los de /about.
 */
 export const ROUTE_DEFAULTS: Record<string, RouteThemeConfig> = {
  '/': {
    backgroundColor: 'hsl(0, 0%, 4%)',
    backgroundClass: '',
    navbarBorderColor: 'hsl(271, 100%, 14%)',
    navbarAccentColor: 'hsl(272, 63%, 46%)',
    navbarHighlightColor: 'hsl(330, 90%, 55%)',
    navbarAccentColorHslComponents: '272, 63%, 46%',
    navbarProgressColors: ['hsl(272, 63%, 46%)', 'hsl(310, 80%, 55%)', 'hsl(330, 90%, 55%)'],
  },
  '/about': {
    backgroundColor: 'hsl(0, 0%, 4%)',
    backgroundClass: '',
    navbarBorderColor: 'hsl(271, 100%, 14%)',
    navbarAccentColor: 'hsl(272, 63%, 46%)',
    navbarHighlightColor: 'hsl(330, 90%, 55%)',
    navbarAccentColorHslComponents: '272, 63%, 46%',
    navbarProgressColors: ['hsl(272, 63%, 46%)', 'hsl(310, 80%, 55%)', 'hsl(330, 90%, 55%)'],
  },
  '/projects': {
    backgroundColor: 'hsl(0, 0%, 4%)',
    backgroundClass: '',
    navbarBorderColor: 'hsl(225, 80%, 35%)',
    navbarAccentColor: 'hsl(225, 75%, 48%)',
    navbarHighlightColor: 'hsl(189, 95%, 43%)',
    navbarAccentColorHslComponents: '225, 75%, 48%',
    navbarProgressColors: ['hsl(225, 75%, 48%)', 'hsl(207, 85%, 55%)', 'hsl(189, 95%, 43%)', 'hsl(135, 70%, 42%)'],
  },
  '/skills': {
    backgroundColor: 'hsl(0, 0%, 4%)',
    backgroundClass: '',
    navbarBorderColor: 'hsl(180, 100%, 15%)',
    navbarAccentColor: 'hsl(189, 95%, 43%)',
    navbarHighlightColor: 'hsl(161, 94%, 30%)',
    navbarAccentColorHslComponents: '189, 95%, 43%',
    navbarProgressColors: ['hsl(189, 95%, 43%)', 'hsl(175, 90%, 38%)', 'hsl(161, 94%, 30%)'],
  },
  '/contact': {
    backgroundColor: 'hsl(0, 0%, 4%)',
    backgroundClass: '',
    navbarBorderColor: 'hsl(163, 94%, 24%)',
    navbarAccentColor: 'hsl(161, 94%, 30%)',
    navbarHighlightColor: 'hsl(115, 70%, 45%)',
    navbarAccentColorHslComponents: '161, 94%, 30%',
    navbarProgressColors: ['hsl(161, 94%, 30%)', 'hsl(138, 80%, 40%)', 'hsl(115, 70%, 45%)'],
  },
  '/project-detail': {
    backgroundColor: 'hsl(0, 0%, 4%)',
    backgroundClass: '',
    navbarBorderColor: 'hsl(225, 80%, 35%)',
    navbarAccentColor: 'hsl(225, 75%, 48%)',
    navbarHighlightColor: 'hsl(189, 95%, 43%)',
    navbarAccentColorHslComponents: '225, 75%, 48%',
    navbarProgressColors: ['hsl(225, 75%, 48%)', 'hsl(207, 85%, 55%)', 'hsl(189, 95%, 43%)'],
  },
}
