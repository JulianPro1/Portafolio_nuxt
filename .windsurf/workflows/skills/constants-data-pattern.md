# Patrón de Constantes y Datos — Portafolio Julian

## Filosofía
Los datos estáticos del portafolio (proyectos, skills, info personal) viven en `app/data/`. Las constantes de configuración (como mapas de categorías) viven en `app/constants/`. Ambos son importados directamente por los componentes y stores, sin API intermediaria.

## Separación: `constants/` vs `data/`

| Carpeta | Qué contiene | Ejemplo |
|---------|-------------|---------|
| `app/constants/` | Configuraciones y mapas de comportamiento | `projectCategories.ts` (mapeo de categoría → badge, colores, links) |
| `app/data/` | Datos de contenido estático (proyectos, skills, info) | Archivos con arrays de datos que se renderizan |

## Estructura de una Constante

```ts
// app/constants/nombreModulo.ts
import type { MiInterface } from '~/types/nombre'
import { colorMap } from '~/utils/colorConverter'  // si usa colores

export const nombreMapa: Record<string, MiInterface> = {
  clave: {
    propiedad: valor,
    color: colorMap['#HEXVALUE'] || 'hsl(h, s%, l%)',  // siempre HSL con fallback
  },
}

// Función helper para acceso seguro (patrón usado en projectCategories.ts)
export function getNombreConfig(key: string): MiInterface {
  const config = nombreMapa[key]
  return config || nombreMapa['default']
}
```

## Ejemplo Real: `projectCategories.ts`

```ts
import type { CategoryConfig } from '~/types/projects'
import { colorMap } from '~/utils/colorConverter'

export const categoryConfigs: Record<string, CategoryConfig> = {
  destacados: {
    badge: { text: 'Destacado', icon: 'mdi:star', color: colorMap['#06B6D4'] || 'hsl(187, 94%, 43%)' },
    colors: { primary: colorMap['#06B6D4'] || 'hsl(187, 94%, 43%)', secondary: ..., hover: ... },
    links: { showGithub: true, showCaseStudy: false },
  },
}

export function getCategoryConfig(category: string): CategoryConfig {
  return categoryConfigs[category] || categoryConfigs.destacados
}
```

## Convenciones

- **Nombres de archivos**: `camelCase` (ej: `projectCategories.ts`, `socialLinks.ts`)
- **Exports**: named exports siempre (no default exports en constants ni data)
- **Colores**: siempre HSL via `colorMap` con fallback string HSL explícito
- **Tipos**: importar las interfaces correspondientes desde `~/types/`
- **Función helper**: incluir una función `getXxxConfig(key)` para acceso seguro con fallback

## Estructura de un Archivo de Data

```ts
// app/data/nombreData.ts
import type { MiInterface } from '~/types/nombre'

export const nombreData: MiInterface[] = [
  {
    id: 'identificador-unico',
    titulo: 'Texto',
    // ...
  },
]
```

## Convenciones de Data

- **Formato**: array de objetos con `id` único (siempre string kebab-case)
- **Iconos**: usar prefijo `mdi:` del sistema @nuxt/icon (ej: `mdi:code`, `mdi:star`)
- **Colores** en data: referenciar colores del store o de constants, no hardcodear
- No mezclar lógica de negocio con datos en el mismo archivo
