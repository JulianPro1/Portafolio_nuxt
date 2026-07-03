# Patrón de Composables — Portafolio Julian

## Filosofía
Los composables encapsulan lógica reactiva reutilizable. En este proyecto encapsulan principalmente lógica de animación UI e interacción del DOM. Se diferencian de los utils en que usan la Composition API (`ref`, `computed`, lifecycle hooks).

## Composables Existentes

| Archivo | Propósito |
|---------|-----------|
| `useAnimation.ts` | Mapa de clases CSS de animación y helpers de delay por variante |
| `useCarousel.ts` | Lógica básica de navegación de carrusel (índice activo) |
| `useCylindricalCarousel.ts` | Carrusel 3D cilíndrico con animación CSS `rotateY` |
| `useInteractiveMarquee.ts` | Marquee auto-scroll con drag + inercia via `requestAnimationFrame` |

## Estructura Base

```ts
// app/composables/useNombreDescriptivo.ts

// Imports de Vue si son necesarios (aunque normalmente auto-importados)
import { ref, onMounted, onUnmounted } from 'vue'

// Interface de opciones (si aplica)
export interface UseNombreOptions {
  opcionA?: number
  opcionB?: string
}

// La función composable — nombre con prefijo `use`
export function useNombre(options: UseNombreOptions = {}) {
  const { opcionA = 0 } = options

  // Estado reactivo
  const estado = ref(false)

  // Computed
  const valorDerivado = computed(() => ...)

  // Métodos
  function accion() { ... }

  // Lifecycle
  onMounted(() => { ... })
  onUnmounted(() => { /* limpiar listeners, RAF, timers */ })

  // Siempre retornar un objeto con las propiedades públicas
  return {
    estado,
    valorDerivado,
    accion,
  }
}
```

## Convenciones

- **Nombre de archivo**: `camelCase` con prefijo `use` — `useAnimation.ts`
- **Nombre de función**: mismo que el archivo — `export function useAnimation()`
- **Interface de opciones**: `Use[Nombre]Options` (exportada si se usa desde fuera)
- **Retorno**: siempre objeto destructurable `{ ... }`
- **Limpieza**: todo listener, `requestAnimationFrame` o timer debe limpiarse en `onUnmounted`
- **Ubicación**: `app/composables/` (auto-importados por Nuxt)

## Cuándo Crear un Composable
- La lógica se repite en 2+ componentes distintos
- La lógica usa state reactivo + lifecycle hooks
- La lógica del DOM es compleja (scrolling, drag, animaciones canvas)

## Cuándo NO Crear un Composable (usar util en su lugar)
- La lógica es una función pura sin estado reactivo (→ `app/utils/`)
- La lógica es un helper de transformación de datos (→ `app/utils/`)

## Ejemplo Real: useAnimation

```ts
// app/composables/useAnimation.ts
export const useAnimation = () => {
  const animationClasses = {
    title: 'animate-slide-fade-up',
    card: 'animate-scale-fade-in',
    tab: 'animate-slide-fade-right',
    // ...
  }

  const getStaggerDelay = (index: number, baseDelay: number = 100): string =>
    `${baseDelay + index * 60}ms`

  return { animationClasses, getStaggerDelay }
}
```

Uso en componente:
```vue
<script setup>
const { animationClasses, getStaggerDelay } = useAnimation()
</script>

<template>
  <AnimatedElement :variant="animationClasses.card" :delay="getStaggerDelay(index)">
    ...
  </AnimatedElement>
</template>
```
