export interface RouteThemeConfig {
  backgroundColor: string
  backgroundClass?: string
  navbarBorderColor: string
  navbarAccentColor: string
  navbarHighlightColor: string
  navbarAccentColorHslComponents?: string
  /** Colores del degradado de la barra de progreso de scroll (mínimo 2) */
  navbarProgressColors?: string[]
  /**
   * Si es true, la navbar arranca con un solo color y un composable externo
   * controla la progresión (ej: /projects con tabs). Si es false/undefined,
   * se aplica el gradiente completo de forma inmediata al montar la vista.
   */
  deferGradient?: boolean
}
