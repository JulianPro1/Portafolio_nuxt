# Patrón de Store (Pinia) — Portafolio Julian

## Filosofía
Un único store activo (`background`) que gestiona el estado visual global: color de fondo, colores de navbar y temas por ruta. Los stores son módulos independientes en `app/store/modules/`.

## Store Existente: `background`

**Archivo**: `app/store/modules/background.ts`  
**Uso**: controla el color de fondo de la app y los colores de la navbar según la ruta activa.

### State
```ts
{
  backgroundColor: string,        // color HSL del fondo de la página
  backgroundClass: string,        // clase CSS adicional (gradients, etc.)
  showWaves: boolean,             // mostrar BackgroundWaves.vue
  wavesGradient: string,          // gradiente para las olas ('urban-gradient-subtle', etc.)
  navbarBorderColor: string,      // color HSL del borde de la navbar
  navbarAccentColor: string,      // color HSL del acento de la navbar
  navbarAccentColorRgb: string,   // valor RGB del acento (para CSS var legacy)
  cardBorderColors: { about, contact, projects, skills },  // clases Tailwind de borde por dominio
  domainAccentColors: { about, contact, projects, skills }, // colores HSL de acento por dominio
  routeThemes: Record<string, RouteThemeConfig>  // temas por ruta
}
```

### Actions Principales
- `setBackground(color)` — cambia el color de fondo
- `setNavbarColors(borderColor, accentColor)` — cambia colores de navbar
- `setWaves(show, gradient)` — activa/desactiva las olas de fondo
- `resetBackground()` — resetea al tema por defecto (/)
- `applyThemeForRoute(routePath)` — aplica automáticamente el tema de la ruta actual

### Uso en Componentes
```ts
const backgroundStore = useBackgroundStore()

// En template:
:style="{ borderColor: backgroundStore.navbarBorderColor }"
:style="{ background: backgroundStore.navbarAccentColor }"
```

## Estructura de un Módulo de Store

```ts
// app/store/modules/nombre.ts
import { defineStore } from 'pinia'

// Interfaces para tipado del state
interface MiInterface { ... }

export const useMiStore = defineStore('nombre', {
  state: () => ({
    // estado inicial
  }),

  getters: {
    // derivaciones del state (si aplica)
  },

  actions: {
    // métodos que mutan el state
  },
})
```

## Convenciones

- **Archivo**: `camelCase` en `app/store/modules/` (ej: `background.ts`, `user.ts`)
- **ID del store**: string sin prefijo, camelCase (ej: `'background'`, `'user'`)
- **Nombre de la función**: `use[Nombre]Store` (ej: `useBackgroundStore`)
- **State**: siempre como función `state: () => ({...})`, nunca objeto directo
- **Tipado**: interfaces explícitas para objetos complejos del state
- **Colores**: siempre en HSL string (importar de `colorMap` en `~/utils/colorConverter`)
- **Re-export**: añadir al `app/store/index.ts` si se crea un store nuevo

## Re-export en index

```ts
// app/store/index.ts
export { useBackgroundStore } from './modules/background'
// agregar aquí cualquier store nuevo
```

## Aplicación del Tema por Ruta
El layout `default.vue` llama a `backgroundStore.applyThemeForRoute(route.path)` en cada cambio de ruta. Si se agrega una nueva página, agregar su entrada en `routeThemes`:

```ts
'/nueva-ruta': {
  backgroundColor: colorMap['#0a0a0a'] || 'hsl(0, 0%, 4%)',
  navbarBorderColor: colorMap['#240046'] || 'hsl(270, 100%, 14%)',
  navbarAccentColor: colorMap['#7B2CBF'] || 'hsl(270, 67%, 45%)',
},
```
