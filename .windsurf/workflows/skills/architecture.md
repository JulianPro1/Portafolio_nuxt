# Arquitectura del Proyecto — Portafolio Julian (Nuxt 3)

## Stack Principal
- **Nuxt 3** (SSR habilitado, `ssr: true` en `nuxt.config.ts`)
- **Vue 3** Composition API con `<script setup lang="ts">`
- **TypeScript** en todos los archivos `.ts` y `.vue`
- **TailwindCSS** vía `@nuxtjs/tailwindcss`
- **Pinia** vía `@pinia/nuxt`
- **@nuxt/icon** para iconos (prefijo `mdi:`)
- **vue3-carousel-nuxt** para carruseles

## Estructura de Directorios

```
app/
├── assets/
│   └── css/
│       └── animations.css          ← animaciones globales (keyframes, transiciones de página)
├── components/
│   ├── About/                      ← componentes del dominio About
│   ├── Common/                     ← componentes reutilizables entre dominios
│   ├── Contact/                    ← componentes del dominio Contact
│   ├── Index/                      ← componentes del dominio Home (index)
│   ├── Projects/                   ← componentes del dominio Projects
│   ├── Skills/                     ← componentes del dominio Skills
│   └── NavBar.vue                  ← componente global de navegación
├── composables/
│   ├── useAnimation.ts             ← animaciones y clases de animación
│   ├── useCarousel.ts              ← lógica de carrusel simple
│   ├── useCylindricalCarousel.ts   ← carrusel cilíndrico 3D
│   └── useInteractiveMarquee.ts    ← marquee con drag e inercia
├── constants/
│   └── projectCategories.ts        ← configuración de categorías de proyectos
├── data/
│   └── [archivos de datos estáticos]
├── layouts/
│   └── default.vue                 ← layout principal con NavBar + NuxtPage
├── middleware/                      ← middleware de Nuxt (actualmente vacío)
├── pages/
│   ├── index.vue                   ← /
│   ├── about.vue                   ← /about
│   ├── projects.vue                ← /projects
│   ├── skills.vue                  ← /skills
│   ├── contact.vue                 ← /contact
│   └── project-detail/
│       └── [id_project].vue        ← /project-detail/:id
├── plugins/                        ← plugins de Nuxt (actualmente vacío)
├── store/
│   ├── index.ts                    ← re-export del store principal
│   └── modules/
│       └── background.ts           ← store de tema visual (colores, navbar, fondo)
├── types/
│   ├── index.ts                    ← tipos globales básicos
│   └── projects.ts                 ← tipos del dominio de proyectos
└── utils/
    └── colorConverter.ts           ← utilidades de conversión de colores a HSL
```

## Alias de Imports
- `~/` → raíz del proyecto (`/Users/julian/Desktop/portafolio_julian/`)
- `@/` → directorio `app/` (equivalente a `~/app/`)
- Usar `~/` es la convención preferida en este proyecto

## Convenciones Críticas

**Naming:**
- Componentes: `PascalCase.vue` (ej: `ProjectCard.vue`)
- Composables: `camelCase` con prefijo `use` (ej: `useAnimation.ts`)
- Stores: `camelCase` en `modules/` (ej: `background.ts`)
- Constantes: `camelCase` para archivos, `UPPER_SNAKE_CASE` para constantes globales
- Tipos: `PascalCase` para interfaces y types
- Utils: `camelCase` (ej: `colorConverter.ts`)

**Script:**
- Siempre `<script setup lang="ts">` en componentes
- Nunca Options API
- TypeScript estricto

**Nuxt-específico:**
- `useRoute()` para la ruta actual (no Vue Router directamente)
- `useHead()` para meta tags SEO en páginas
- `navigateTo()` para navegación programática
- `NuxtLink` para links internos (no `<a>` ni `<RouterLink>`)
- Auto-importación activa: no hace falta importar `ref`, `computed`, `useRoute`, etc.

## Dominio de Páginas y Colores de Acento
Cada página tiene un color de acento definido en `background.ts`:
- `/` (index): púrpura — `hsl(270, 67%, 45%)`
- `/about`: púrpura — `hsl(270, 67%, 45%)`
- `/projects`: cyan — `hsl(184, 85%, 53%)`
- `/skills`: púrpura — `hsl(270, 67%, 45%)`
- `/contact`: verde — `hsl(160, 90%, 31%)`
- `/project-detail/:id`: cyan — `hsl(184, 85%, 53%)`
