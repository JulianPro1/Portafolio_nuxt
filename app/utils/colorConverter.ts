/**
 * Utilidades de conversión de colores
 * Convierte colores hexadecimales y RGB a formato HSL
 */

/**
 * Convierte un color hexadecimal a HSL
 * @param hex - Color en formato hexadecimal (#RRGGBB o #RGB)
 * @returns String en formato hsl(h, s%, l%)
 */
export function hexToHsl(hex: string): string {
  // Eliminar # si está presente
  hex = hex.replace('#', '')
  
  // Manejar formato corto (#RGB)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }
  
  // Parsear valores RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

/**
 * Convierte un color hexadecimal a HSL con alpha
 * @param hex - Color en formato hexadecimal (#RRGGBB o #RGB)
 * @param alpha - Valor de transparencia (0-1)
 * @returns String en formato hsla(h, s%, l%, a)
 */
export function hexToHsla(hex: string, alpha: number): string {
  const hsl = hexToHsl(hex)
  return hsl.replace('hsl', 'hsla').replace(')', `, ${alpha})`)
}

/**
 * Convierte valores RGB a HSL
 * @param r - Rojo (0-255)
 * @param g - Verde (0-255)
 * @param b - Azul (0-255)
 * @returns String en formato hsl(h, s%, l%)
 */
export function rgbToHsl(r: number, g: number, b: number): string {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6
        break
      case gNorm:
        h = ((bNorm - rNorm) / d + 2) / 6
        break
      case bNorm:
        h = ((rNorm - gNorm) / d + 4) / 6
        break
    }
  }
  
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

/**
 * Convierte valores RGB a HSL con alpha
 * @param r - Rojo (0-255)
 * @param g - Verde (0-255)
 * @param b - Azul (0-255)
 * @param alpha - Valor de transparencia (0-1)
 * @returns String en formato hsla(h, s%, l%, a)
 */
export function rgbToHsla(r: number, g: number, b: number, alpha: number): string {
  const hsl = rgbToHsl(r, g, b)
  return hsl.replace('hsl', 'hsla').replace(')', `, ${alpha})`)
}

/**
 * Tabla de conversión de colores hexadecimales comunes del proyecto a HSL
 */
export const colorMap: Record<string, string> = {
  // Tonos oscuros
  '#0a0a0a': 'hsl(0, 0%, 4%)',
  '#121212': 'hsl(0, 0%, 7%)',
  '#1a1a2e': 'hsl(230, 29%, 14%)',
  
  // Púrpuras
  '#240046': 'hsl(270, 100%, 14%)',
  '#7B2CBF': 'hsl(270, 67%, 45%)',
  
  // Verde/Amarillo (Complementario de púrpura)
  '#FCA311': 'hsl(90, 98%, 52%)',
  
  // Cyan / Skills (Armonía Análoga)
  '#22D3EE': 'hsl(184, 85%, 53%)',
  '#06B6D4': 'hsl(180, 75%, 42%)',
  '#004D4D': 'hsl(180, 80%, 30%)',
  
  // Azules / Proyectos (Armonía Análoga)
  '#1F4DD6': 'hsl(225, 75%, 48%)',
  '#1236A1': 'hsl(225, 80%, 35%)',

  // Verdes / Contacto (Armonía Análoga)
  '#059669': 'hsl(145, 65%, 42%)',
  '#047857': 'hsl(145, 70%, 30%)',
  
  // Rojo
  '#DC2626': 'hsl(0, 84%, 50%)',
  
  // Grises
  '#F9FAFB': 'hsl(220, 20%, 97%)',
  '#e5e7eb': 'hsl(215, 16%, 77%)',
  '#ffffff': 'hsl(0, 0%, 100%)',
}

/**
 * Convierte valores rgba a hsla
 * @param r - Rojo (0-255)
 * @param g - Verde (0-255)
 * @param b - Azul (0-255)
 * @param a - Alpha (0-1)
 * @returns String en formato hsla(h, s%, l%, a)
 */
export function rgbaToHsla(r: number, g: number, b: number, a: number): string {
  return rgbToHsla(r, g, b, a)
}
