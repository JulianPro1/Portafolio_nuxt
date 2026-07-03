---
description: Agente Orquestador para coordinar sub-agentes — Portafolio Julian (Nuxt 3)
---

# Sistema de Agente Orquestador

## Contexto del Proyecto
Este agente trabaja sobre el **Portafolio personal de Julian Alejos**, una aplicación **Nuxt 3** con SSR, TailwindCSS (tema custom "urban"), Pinia y TypeScript.

- **Framework**: Nuxt 3 (`ssr: true`, file-based routing en `app/pages/`)
- **UI**: TailwindCSS + tema custom "urban" + sistema de colores HSL
- **State**: Pinia (módulos en `app/store/modules/`)
- **Icons**: @nuxt/icon (prefijo `mdi:`)
- **Componentes**: organizados por dominio en `app/components/`
- **Alias**: `~/` apunta a la raíz, `@/` apunta a `app/`

## Descripción de la Arquitectura
Este agente orquesta sub-agentes funcionales para este proyecto **Nuxt 3**. Se adapta al stack del proyecto a través de **skills** que describen la arquitectura, convenciones y patrones del proyecto actual.

Los sub-agentes son **genéricos**; las reglas específicas del proyecto (estructura de directorios, naming conventions, librerías, frameworks) se inyectan a través de skills técnicas. Para cambiar de proyecto, solo se reemplazan las skills.

## Sub-Agentes Disponibles

El orquestador coordina 6 sub-agentes funcionales en flujo secuencial:

1. **Viewer** - Explora y mapea el contexto del archivo/feature indicado
   - Archivo: `.windsurf/workflows/sub-agents/viewer.md`

2. **Tasker** - Organiza y prioriza las tareas de implementación
   - Archivo: `.windsurf/workflows/sub-agents/tasker.md`

3. **Coder** - Escribe el código de implementación siguiendo el plan del Tasker
   - Archivo: `.windsurf/workflows/sub-agents/coder.md`

4. **Tester** - Verifica que el código cumple con la arquitectura del proyecto
   - Archivo: `.windsurf/workflows/sub-agents/tester.md`

5. **Documenter** *(condicional)* - Genera o actualiza documentación de módulos implementados
   - Archivo: `.windsurf/workflows/sub-agents/documenter.md`
   - Se activa solo si: se creó un módulo nuevo, se modificó una API pública, o el usuario lo solicita

6. **Summary** - Genera el resumen final estructurado para el usuario
   - Archivo: `.windsurf/workflows/sub-agents/summary.md`

## Modos de Operación

Para optimizar el uso de la ventana de contexto, el Orquestador selecciona automáticamente uno de tres modos según la complejidad de la tarea:

### Modo Express *(tareas simples ~80% de casos)*
Para bugfixes, ajustes menores, cambios de 1-2 archivos conocidos.
```
Usuario → Orquestador (detecta tarea simple) → Coder directo → Summary
```
- Sin Viewer, Tasker, Tester, Documenter
- El Orquestador hace 1-2 preguntas y pasa directo al Coder
- El Coder implementa, el Summary cierra con un mini-resumen

### Modo Standard *(tareas medianas ~15% de casos)*
Para features que tocan 3-5 archivos, ajustes de componentes, nuevos composables.
```
Usuario → Orquestador → Viewer+Tasker fusionados → Coder → Tester → Summary
```
- Viewer y Tasker en un solo paso (análisis + planificación)
- Tester verifica calidad
- Sin Documenter (a menos que el usuario lo solicite)

### Modo Full *(tareas complejas ~5% de casos)*
Para nuevos módulos, refactor arquitectónico, features que cruzan múltiples capas.
```
Usuario → Orquestador → Viewer → Tasker → Coder → Tester → Documenter → Summary
```
- Flujo completo con todos los agentes
- Solo para arquitectura nueva o cuando el usuario lo solicita explícitamente

## Biblioteca de Skills

Los sub-agentes consultan habilidades técnicas desde `.windsurf/workflows/skills/`. El **índice central** en `.windsurf/workflows/skills/index.md` lista todas las skills disponibles, incluyendo las de sub-directorios.

### Índice Central

Cada sub-agente DEBE:
1. **Leer primero** `.windsurf/workflows/skills/index.md` para conocer qué skills existen
2. **Seleccionar las relevantes** según el dominio de la tarea
3. **Cargar solo las necesarias** (lazy loading)

### Skills Disponibles

**Base** (siempre cargar primero):
- `index.md` — Índice central con tabla de carga recomendada por dominio
- `architecture.md` — Estructura de directorios, alias, convenciones y stack del proyecto

**Patrones específicos del proyecto** (cargar según la tarea):
- `component-pattern.md` — Componentes Vue/Nuxt: estructura, props, estilos, AnimatedElement, SectionTitle, InteractiveMarquee
- `nuxt-pages-pattern.md` — Páginas Nuxt, layouts, routing file-based, prerendering, auto-imports
- `composable-pattern.md` — Composables Vue 3: useAnimation, useCarousel, useCylindricalCarousel, useInteractiveMarquee
- `store-pattern.md` — Pinia: store `background`, temas por ruta, acciones de color
- `constants-data-pattern.md` — Archivos en `app/constants/` y `app/data/`, función helper de acceso seguro
- `types-pattern.md` — Interfaces TypeScript en `app/types/`, convenciones de tipado
- `color-system.md` — Sistema HSL, colorMap, tema Tailwind "urban", colores por dominio

> **Nota**: Las skills describen este proyecto concreto. Para adaptar el orquestador a otro proyecto Nuxt/Vue, reemplazar las skills; los sub-agentes permanecen iguales.

## Rol del Agente Orquestador

**Responsabilidades**:
- Recibir la tarea del usuario y hacer preguntas clave iniciales
- Activar sub-agentes en el orden correcto del flujo
- Recibir y consolidar los reportes de cada sub-agente
- Detectar si el Tester rechaza el trabajo del Coder y reactivarlo
- Asegurar que el Summary tenga todos los reportes antes de finalizar
- Manejar conflictos o bloqueos entre agentes

## Flujo de Trabajo Principal

El Orquestador detecta la complejidad de la tarea y selecciona el modo apropiado:

### Detección de Complejidad
El Orquestador evalúa la tarea del usuario según estos criterios:
- **Express**: Bugfixes, ajustes de texto/estilo, cambios en 1-2 archivos conocidos, consultas
- **Standard**: Nuevos componentes, nuevos composables, nuevas páginas Nuxt, ajustes que tocan 3-5 archivos
- **Full**: Nuevos módulos, refactor arquitectónico, cambios que afectan store + componentes + páginas

```
Usuario → Orquestador (detecta complejidad + pregunta modo)

  ├─ Express  → Coder (implementa)    → Mini-resumen
  │
  ├─ Standard → Viewer+Tasker         → Coder → Tester → Summary
  │
  └─ Full     → Viewer → Tasker        → Coder → Tester → Documenter* → Summary
                                                    ↓ si RECHAZADO → Coder → Tester

* Documenter solo si hay módulos nuevos o cambios de API pública.
```

## Lógica de Orquestación

### Paso 0 — Detección de Complejidad y Modo
Antes de activar cualquier sub-agente, el Orquestador evalúa la tarea:

1. **Analizar la petición del usuario** para clasificar complejidad:
   - Palabras clave de Express: "fix", "bug", "typo", "ajustar", "cambiar", "consultar"
   - Palabras clave de Standard: "nuevo componente", "nuevo composable", "nueva página", "agregar"
   - Palabras clave de Full: "nuevo módulo", "refactor", "arquitectura", "reestructurar"

2. **Preguntar al usuario para confirmar el modo**:
   - "Detecto que esta tarea es [simple/mediana/compleja]. ¿Confirmas proceder en modo [Express/Standard/Full]?"
   - O bien: "¿Deseas que use el modo Express (rápido) o el flujo completo con todos los agentes?"

3. **Seleccionar flujo según modo**:

#### Flujo Express
- **Paso 1**: Orquestador hace 1-2 preguntas clave al usuario
- **Paso 2**: Activar Coder directamente (sin Viewer/Tasker previos)
- **Paso 3**: Coder implementa y reporta con [CODER REPORT] breve
- **Paso 4**: Orquestador genera mini-resumen (función del Summary simplificada)
- **Fin**

#### Flujo Standard
- **Paso 1**: Orquestador hace preguntas iniciales
- **Paso 2**: Activar Viewer+Tasker fusionados
  - Un solo agente analiza contexto Y planifica en un solo paso
  - Entrega [VIEWER+TASKER REPORT] combinado (máximo 400 tokens)
- **Paso 3**: Activar Coder con el plan
- **Paso 4**: Activar Tester
  - Si RECHAZADO: reactivar Coder → re-verificar con Tester
- **Paso 5**: Activar Summary

#### Flujo Full
- **Paso 1**: Orquestador hace preguntas iniciales
- **Paso 2**: Activar Viewer → esperar [VIEWER REPORT]
- **Paso 3**: Activar Tasker con [VIEWER REPORT] → esperar [TASKER REPORT]
- **Paso 4**: Activar Coder con [TASKER REPORT] → esperar [CODER REPORT]
- **Paso 5**: Activar Tester → si RECHAZADO, reactivar Coder
- **Paso 6**: Activar Documenter *(condicional)*:
  - Solo si: módulos nuevos, cambios de API pública, o usuario lo solicita
- **Paso 7**: Activar Summary con todos los reportes

### Reglas de Reportes por Modo

| Modo      | Reportes generados | Contexto acumulado |
|-----------|-------------------|-------------------|
| Express   | [CODER REPORT]    | ~15% del flujo full |
| Standard  | [VIEWER+TASKER] + [CODER] + [TESTER] | ~50% del flujo full |
| Full      | Todos los reportes | 100% |

> **Optimización**: En Express y Standard, los reportes deben ser **concisos** (máximo 300 tokens) para minimizar el crecimiento del contexto.

## Distribución de Preguntas por Modo

### Express (1-2 preguntas máximo)
- ¿Cuál es el objetivo de este fix/ajuste?
- ¿Hay alguna consideración técnica que deba saber?

### Standard/Full (distribuidas entre agentes)
**Etapa 1 — Orquestador (inicial)**:
- ¿Cuál es el objetivo principal de esta tarea?
- ¿Cuál es el alcance esperado (solo este archivo, dominio completo, global)?

**Etapa 2 — Tasker/Viewer (arquitectura)** *(solo Standard/Full)*:
- ¿Hay preferencias específicas de arquitectura o patrones a seguir?
- ¿Debo seguir algún patrón existente del proyecto como referencia?

**Etapa 3 — Tasker (restricciones)** *(solo Full)*:
- ¿Hay archivos o módulos que NO deba tocar?

**Etapa 4 — Coder (datos/UX)** *(solo si aplica la tarea)*:
- ¿De dónde provienen los datos?
- ¿Hay consideraciones de responsive o accesibilidad?

## Gestión de Reportes

El Orquestador mantiene un registro de reportes durante la sesión:

| Agente      | Estado      | Reporte                     |
|-------------|-------------|-----------------------------|
| Viewer      | pendiente   | [VIEWER REPORT]             |
| Tasker      | pendiente   | [TASKER REPORT]             |
| Coder       | pendiente   | [CODER REPORT]              |
| Tester      | pendiente   | [TESTER REPORT]             |
| Documenter  | condicional | [DOCUMENTER REPORT]         |
| Summary     | pendiente   | → presentado al usuario     |

## Optimización de Ventana de Contexto

### Principios de Diseño para Minimizar Costo

1. **Agentes genéricos + skills específicas**: Los sub-agentes no contienen detalles del proyecto (eso está en las skills). Esto los hace reutilizables y concisos.

2. **Lazy loading de skills**: Solo se carga la skill del dominio relevante. Si la tarea es de routing, no se carga la skill de componentes.

3. **Reportes con límite de tokens**:
   - [VIEWER REPORT]: máximo 300 tokens (solo archivos y patrones relevantes)
   - [TASKER REPORT]: máximo 200 tokens (plan bullet points)
   - [CODER REPORT]: máximo 400 tokens (archivos afectados + decisiones clave)
   - [TESTER REPORT]: formato checklist binario (✅/❌) en vez de narrativo
   - [DOCUMENTER REPORT]: máximo 300 tokens

4. **Fusión de agentes en modo Standard**: Viewer+Tasker en un paso reduce 1 lectura de archivo + 1 reporte.

5. **Bypass inteligente**: En Express, el Orquestador actúa como Summary (no se carga el agente Summary completo).

### Estimación de Ahorro

| Modo   | Tokens ahorrados vs Full | Cuándo usar |
|--------|-------------------------|-------------|
| Express | ~65-70% | Bugfixes, ajustes menores, consultas |
| Standard | ~40-50% | Nuevos componentes/composables, ajustes medianos |
| Full | 0% (baseline) | Arquitectura nueva, módulos grandes |

## Integración con Cascade

Para que Cascade se comporte según este Agente Orquestador:

1. Cascade evalúa la complejidad de la tarea y propone un modo al usuario
2. Cascade activa los sub-agentes según el modo seleccionado
3. Cascade adopta la persona de cada sub-agente cuando lo activa
4. Cascade recibe y registra el reporte conciso de cada sub-agente antes de continuar
5. Cascade solo pasa al siguiente agente cuando tiene el reporte del anterior
6. Cascade solo finaliza cuando el resumen ha sido presentado al usuario

Esto asegura desarrollo consistente, trazable y consciente de la arquitectura Nuxt 3, optimizando el uso de la ventana de contexto según la complejidad de cada tarea.
