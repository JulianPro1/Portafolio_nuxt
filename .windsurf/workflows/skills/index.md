# Índice de Skills — Portafolio Julian (Nuxt 3)

## Proyecto
- **Framework**: Nuxt 3 con SSR habilitado
- **UI**: TailwindCSS con tema custom "urban"
- **State**: Pinia (módulos en `app/store/modules/`)
- **Icons**: @nuxt/icon (Iconify)
- **Routing**: File-based routing de Nuxt (en `app/pages/`)

## Skills Disponibles

| Archivo | Dominio | Cuándo cargar |
|---------|---------|--------------|
| `architecture.md` | Estructura general del proyecto | Siempre — es la base |
| `component-pattern.md` | Componentes Vue/Nuxt | Creación o edición de `.vue` en `app/components/` |
| `nuxt-pages-pattern.md` | Páginas, layouts, middleware | Cambios en `app/pages/`, `app/layouts/`, `app/middleware/` |
| `composable-pattern.md` | Composables Vue 3 | Creación o edición en `app/composables/` |
| `store-pattern.md` | Pinia stores | Cambios en `app/store/` |
| `constants-data-pattern.md` | Constantes y datos estáticos | Cambios en `app/constants/` o `app/data/` |
| `types-pattern.md` | TypeScript types e interfaces | Cambios en `app/types/` o tipado nuevo |
| `color-system.md` | Sistema de colores HSL + Tailwind | Cambios de color, estilos, tema visual |
| `color-harmonies.md` | Armonías de color (monocromática, complementaria, análoga, split-complementary) | Diseño visual, paletas de color, UI/UX |

## Carga Recomendada por Dominio

**Componente nuevo**: `architecture.md` + `component-pattern.md` + `color-system.md`  
**Store nuevo**: `architecture.md` + `store-pattern.md`  
**Composable nuevo**: `architecture.md` + `composable-pattern.md`  
**Página nueva**: `architecture.md` + `nuxt-pages-pattern.md`  
**Constantes/Data**: `architecture.md` + `constants-data-pattern.md` + `types-pattern.md`  
**Fix visual**: `color-system.md` + `component-pattern.md`  
**Diseño UI/UX**: `color-system.md` + `color-harmonies.md`
