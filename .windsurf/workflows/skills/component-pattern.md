# Patrón de Componentes — Portafolio Julian

## Filosofía
Componentes pequeños, enfocados en un dominio, organizados por carpeta de dominio. Los componentes `Common/` son reutilizables globalmente; los de dominio (About, Projects, etc.) solo existen dentro de su contexto.

## Estructura Base de un Componente

```vue
<template>
  <!-- Template minimalista, sin lógica compleja inline -->
</template>

<script setup lang="ts">
// 1. Imports (solo lo que no está auto-importado)
import ComponenteExterno from '@/components/Common/ComponenteExterno.vue'

// 2. Props con TypeScript
interface Props {
  propA: string
  propB?: number
}
const props = defineProps<Props>()

// También usando withDefaults para defaults:
// const props = withDefaults(defineProps<Props>(), { propB: 0 })

// 3. Emits (si aplica)
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

// 4. Composables
const { animationClasses } = useAnimation()

// 5. Estado reactivo local
const isOpen = ref(false)

// 6. Computed
const computedValue = computed(() => props.propA.toUpperCase())

// 7. Métodos
function handleClick() { ... }

// 8. Lifecycle (si aplica)
onMounted(() => { ... })
</script>

<style scoped>
/* Solo si no puede hacerse con Tailwind */
</style>
```

## Organización por Dominio

```
app/components/
├── About/          ← TimelineAccordion.vue, AboutCard.vue, SectionOrchestrator.vue
├── Common/         ← BackgroundWaves.vue, ProjectsCarousel.vue, TabComponent.vue,
│                      InteractiveMarquee.vue, AnimatedElement.vue, SectionTitle.vue
├── Contact/        ← ContactForm.vue
├── Index/          ← tarjetas preview para la home (AboutPreviewCardContent, etc.)
├── Projects/       ← ProjectCard.vue, SectionOrchestrator.vue
├── Skills/         ← SectionMain.vue
└── NavBar.vue      ← único componente global fuera de carpeta de dominio
```

## Convenciones de Props y Estilos

**Colores en props**: Siempre en formato HSL o HSLA string (nunca hex ni rgba).
```ts
// ✅ Correcto
:text-color="'hsl(220, 20%, 97%)'"
:fade-color="'hsla(267, 50%, 11%, 1)'"
:badge-background="'linear-gradient(to bottom right, hsla(270, 67%, 45%, 0.24), hsla(38, 98%, 52%, 0.14))'"

// ❌ Incorrecto
:text-color="'#F9FAFB'"
:fade-color="'rgba(30, 14, 42, 1)'"
```

**Estilos inline**: Usar object syntax en `:style`, nunca string concatenation salvo en gradients dinámicos.
```vue
<!-- ✅ Correcto -->
:style="{ backgroundColor: store.color, borderColor: store.borderColor }"

<!-- ❌ Incorrecto -->
:style="`background-color: ${store.color}`"
```

**Shadows en clases Tailwind**: Usar `hsla()` en arbitrary values, no `rgba()`.
```
shadow-[0_8px_32px_hsla(0,0%,0%,0.3)]   ✅
shadow-[0_8px_32px_rgba(0,0,0,0.3)]     ❌
```

## AnimatedElement
Componente reutilizable en `Common/AnimatedElement.vue`. Envuelve elementos para darles entrada animada.
```vue
<AnimatedElement variant="card" delay="400ms">
  <div>...</div>
</AnimatedElement>
```
Variantes disponibles (de `useAnimation.ts`): `title`, `desc`, `card`, `cta`, `tab`, `carouselCard`.

## SectionTitle
Componente reutilizable en `Common/SectionTitle.vue` para títulos de sección.
```vue
<SectionTitle
  title="Texto principal"
  highlight="Texto destacado"
  description="Descripción opcional"
  align="center"
/>
```

## InteractiveMarquee
Componente en `Common/InteractiveMarquee.vue`. Acepta items con `{ name, icon? }`. Props de color siempre en HSL/HSLA.

## Patrón de "SectionOrchestrator"
Cada dominio con múltiples secciones usa un `SectionOrchestrator.vue` como orquestador que ensambla los sub-componentes.
- `About/SectionOrchestrator.vue`
- `Projects/SectionOrchestrator.vue`

Las páginas (`app/pages/`) son delgadas: solo importan y renderizan el `SectionOrchestrator` de su dominio.
