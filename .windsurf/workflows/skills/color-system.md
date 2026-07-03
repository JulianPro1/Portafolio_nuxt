# Sistema de Colores — Portafolio Julian

## Filosofía
Todos los colores del proyecto usan formato **HSL/HSLA**. Ningún color hexadecimal ni rgba() debe aparecer en propiedades de estilo CSS, estilos inline, o props de componentes. Las clases de Tailwind nombradas (ej: `bg-urban-accent`) usan el tema custom definido en `tailwind.config`.

## Regla Global

```
✅ hsl(270, 67%, 45%)
✅ hsla(270, 67%, 45%, 0.3)
❌ #7B2CBF
❌ rgba(123, 44, 191, 0.3)
```

**Excepción**: Las clases Tailwind arbitrarias (`from-[#...]`, `bg-[#...]`) pueden mantener hex porque Tailwind no soporta HSL en valores arbitrarios.

## Utilidad de Conversión

**Archivo**: `app/utils/colorConverter.ts`

```ts
import { hexToHsl, hexToHsla, colorMap } from '~/utils/colorConverter'

// Paleta del proyecto (colorMap)
colorMap['#0a0a0a']  // → 'hsl(0, 0%, 4%)'          — fondo base
colorMap['#121212']  // → 'hsl(0, 0%, 7%)'           — fondo alternativo
colorMap['#1a1a2e']  // → 'hsl(230, 29%, 14%)'       — fondo azul oscuro
colorMap['#240046']  // → 'hsl(270, 100%, 14%)'      — púrpura profundo
colorMap['#7B2CBF']  // → 'hsl(270, 67%, 45%)'       — púrpura acento
colorMap['#FCA311']  // → 'hsl(38, 98%, 52%)'        — naranja/amarillo highlight
colorMap['#22D3EE']  // → 'hsl(184, 85%, 53%)'       — cyan claro
colorMap['#06B6D4']  // → 'hsl(187, 94%, 43%)'       — cyan oscuro
colorMap['#059669']  // → 'hsl(160, 90%, 31%)'       — verde acento
colorMap['#047857']  // → 'hsl(161, 91%, 28%)'       — verde oscuro
colorMap['#DC2626']  // → 'hsl(0, 84%, 50%)'         — rojo acento
colorMap['#F9FAFB']  // → 'hsl(220, 20%, 97%)'       — gris claro texto
colorMap['#e5e7eb']  // → 'hsl(215, 16%, 77%)'       — gris texto muted
colorMap['#ffffff']  // → 'hsl(0, 0%, 100%)'         — blanco puro
```

## Tema Tailwind Custom ("urban")

Las clases `urban-*` son colores personalizados del proyecto:

| Clase | Color |
|-------|-------|
| `bg-urban-bg` | Fondo base oscuro `hsl(0, 0%, 4%)` |
| `bg-urban-base` | Fondo elevado `hsl(0, 0%, 7%)` |
| `text-urban-text` | Texto principal |
| `text-urban-text-muted` | Texto secundario |
| `text-urban-text-dim` | Texto muy tenue |
| `bg-urban-accent` / `text-urban-accent` | Acento púrpura `hsl(270, 67%, 45%)` |
| `bg-urban-accent-dark` | Púrpura profundo |
| `bg-urban-accent-light` | Púrpura claro |
| `bg-urban-highlight` | Naranja `hsl(38, 98%, 52%)` |
| `bg-urban-highlight-light` | Naranja claro |
| `bg-urban-green` | Verde acento |
| `bg-urban-green-dark` | Verde oscuro |
| `bg-urban-green-light` | Verde claro |
| `bg-urban-red-accent` | Rojo acento |
| `bg-urban-red-base` | Rojo base oscuro |
| `bg-urban-red-highlight` | Rojo claro |

## Colores por Dominio (Acento de la Página)

| Página | Color principal | HSL |
|--------|----------------|-----|
| `/` (home) | Púrpura | `hsl(270, 67%, 45%)` |
| `/about` | Púrpura | `hsl(270, 67%, 45%)` |
| `/projects` | Cyan | `hsl(184, 85%, 53%)` |
| `/skills` | Rojo | `hsl(0, 84%, 50%)` |
| `/contact` | Verde | `hsl(160, 90%, 31%)` |
| `/project-detail` | Cyan | `hsl(184, 85%, 53%)` |

## Store de Colores

Los colores dinámicos (navbar, fondo) se gestionan desde `useBackgroundStore()`:
```ts
const store = useBackgroundStore()
store.navbarAccentColor    // HSL string del color de acento actual
store.navbarBorderColor    // HSL string del borde de navbar actual
store.backgroundColor      // HSL string del fondo actual
```

## Cómo Usar Colores en Componentes

**Estilo inline con color del store:**
```vue
:style="{ borderColor: backgroundStore.navbarBorderColor }"
:style="{ background: `linear-gradient(to right, ${store.navbarAccentColor}, hsl(38, 98%, 52%))` }"
```

**Props de color (siempre HSL string):**
```vue
:text-color="'hsl(220, 20%, 97%)'"
:fade-color="'hsla(267, 50%, 11%, 1)'"
:badge-background="'linear-gradient(to bottom right, hsla(270, 67%, 45%, 0.24), hsla(38, 98%, 52%, 0.14))'"
```

**Shadows en Tailwind (hsla, no rgba):**
```
shadow-[0_8px_32px_hsla(0,0%,0%,0.3)]
shadow-[0_0_30px_hsla(270,67%,45%,0.5)]
```

## Constantes y colorMap con Fallback

Al usar `colorMap` en constantes o stores, siempre incluir fallback HSL explícito:
```ts
color: colorMap['#7B2CBF'] || 'hsl(270, 67%, 45%)',
```
