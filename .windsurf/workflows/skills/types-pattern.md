# Patrón de Tipos TypeScript — Portafolio Julian

## Filosofía

Tipos explícitos para todos los dominios del proyecto. Los tipos se centralizan en `app/types/`, agrupados por dominio. Nunca usar `any`; preferir interfaces sobre types para objetos.

## Archivos de Tipos Existentes

### `app/types/index.ts` — Tipos globales básicos

Tipos transversales a toda la app.

### `app/types/projects.ts` — Dominio de proyectos

```ts
// Interfaz de configuración de badge de categoría
export interface BadgeConfig {
  text: string
  icon: string // formato mdi: (ej: 'mdi:star')
  color: string // siempre HSL string
}

// Esquema de colores de una categoría
export interface ColorScheme {
  primary: string // HSL string
  secondary: string // HSL string
  hover: string // HSL string
}

// Configuración de links de un proyecto
export interface LinksConfig {
  showGithub: boolean
  showCaseStudy: boolean
}

// Configuración completa de categoría
export interface CategoryConfig {
  badge: BadgeConfig
  colors: ColorScheme
  links: LinksConfig
}

// Datos de un proyecto
export interface ProjectData {
  id: string // kebab-case único
  title: string
  category: string // coincide con clave en categoryConfigs
  description: string
  icon: string // prefijo mdi:
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  collaborators?: number
  developmentTime?: string
  showTechCard?: boolean
  showProductionLink?: boolean
}

// Slide de carrusel de proyectos
export interface ProjectSlide {
  cards: ProjectData[]
}
```

## Convenciones

- **Ubicación**: `app/types/[dominio].ts`
- **Naming**: `PascalCase` para interfaces (ej: `ProjectData`, `CategoryConfig`)
- **Prefijo de interfaz**: no usar prefijo `I` — solo `PascalCase` directo
- **Colores en interfaces**: siempre `string` (el valor será HSL), nunca union types de colores
- **IDs**: siempre `string`, formato kebab-case en la data
- **Opcionales**: usar `?` para campos opcionales, no `undefined` explícito
- **Exports**: siempre named exports (no default exports en tipos)
- **Imports**: importar con `import type { ... }` cuando solo se usa el tipo

## Cuándo Crear un Nuevo Tipo

- Si un objeto se usa en 2+ archivos distintos → extraer interfaz a `app/types/`
- Si un componente tiene props complejas → definir interfaz `Props` local en el componente
- Props locales de componente: interfaz `Props` dentro del `<script setup>`, no exportar

## Patrón de Interface Local en Componente

```vue
<script setup lang="ts">
  // Interface local — no se exporta
  interface Props {
    title: string
    items: ItemType[] // importar ItemType de ~/types/
    color?: string // HSL string, opcional
  }

  const props = defineProps<Props>()
</script>
```

## Reglas TypeScript Estrictas del Proyecto

- No `any` — usar `unknown` si el tipo es desconocido y luego narrows
- Aserciones de tipo con `!` (non-null assertion) solo cuando se está seguro (ej: en regex results)
- Tipos de retorno explícitos en funciones de composables y stores
- Los stores de Pinia usan interfaces locales para el state complejo (ver `RouteThemeConfig` en `background.ts`)
