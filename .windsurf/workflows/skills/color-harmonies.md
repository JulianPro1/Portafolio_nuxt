# Armonías de Color — Desarrollo Web con HSL

## Principio Base
Todas las armonías se basan en el círculo cromático HSL (Hue 0-360°). El matiz (H) define la posición, mientras que Saturación (S) y Luminosidad (L) controlan intensidad y brillo.

## 1. Armonía Monocromática
**Uso**: Fondo, dark mode, interfaces cohesivas

Un solo matiz (H) variando S y L.

**Ejemplo Dashboard Dark Mode**:
- Fondo: `hsl(260, 20%, 8%)` — morado muy oscuro, casi negro
- Tarjetas: `hsl(260, 15%, 14%)` — mismo H, más claro
- Bordes: `hsl(260, 12%, 22%)` — más claro aún
- Texto secundario: `hsl(260, 10%, 70%)` — desaturado y claro

**Resultado**: Interfaz unificada con mismo ADN cromático (H constante).

## 2. Armonía Complementaria
**Uso**: CTAs, botones de acción, puntos focales

Colores opuestos en el círculo cromático (diferencia 180° en H).

**Ejemplo Landing Page**:
- Base dominante: `hsl(220, 90%, 50%)` — Azul Eléctrico
- Complementario (CTA): `hsl(40, 95%, 55%)` — Naranja/Calabaza

**Regla**: El complementario se usa exclusivamente para romper monotonía y guiar la mirada. Nunca a partes iguales con el base.

## 3. Armonía Análoga
**Uso**: Degradados premium, transiciones suaves, fondos interactivos

3-4 colores vecinos en el círculo cromático (H adyacentes).

**Ejemplo Degradado**:
- Inicial: `hsl(270, 90%, 60%)` — Morado Neón
- Medio: `hsl(300, 85%, 55%)` — Violeta/Fucsia
- Final: `hsl(330, 90%, 55%)` — Rosa Eléctrico

**Resultado**: Transición orgánica sin puntos grises o "sucios".

## 4. Complementaria Dividida (Split-Complementary)
**Uso**: Portafolios, ecommerce con 3 roles claros

Color base + dos colores vecinos de su opuesto. Menos tensión que complementaria directa.

**Ejemplo Portafolio**:
- Dominante: `hsl(150, 80%, 40%)` — Verde Esmeralda (marca, títulos)
- Acento 1 (CTA): `hsl(330, 85%, 55%)` — Magenta (botones)
- Acento 2 (badges): `hsl(25, 90%, 50%)` — Naranja (etiquetas, destacados)

**Resultado**: Alto contraste visual con tensión controlada.

## Aplicación en el Proyecto

**Patrón actual del portafolio**:
- Base monocromática: Púrpura (`hsl(270, 67%, 45%)`)
- Complementario de ruptura: Verde (`hsl(90, 98%, 52%)`) — opuesto exacto de 270°
- Por dominio: Verde (contacto), Rojo (skills), Cyan (projects)

**Split-Complementary en Dominio Rojo (Skills)**:
El dominio Skills implementa split-complementary con 3 roles claros:
- Dominante: `hsl(0, 84%, 50%)` — Rojo (marca, títulos, bordes)
- Acento 1: `hsl(330, 85%, 55%)` — Magenta/Rosa (CTAs, highlights)
- Acento 2: `hsl(25, 90%, 50%)` — Naranja (badges, etiquetas, destacados)

**Gradientes Análogos Premium**:
- `urban-gradient-analogous`: Púrpura (270°) → Fucsia (300°) → Rosa (330°)
- `urban-gradient-analogous-subtle`: Púrpura oscuro → Púrpura → Fucsia
- Transiciones orgánicas sin puntos grises

**Al crear nuevos componentes/features**:
1. Identificar el matiz base del dominio
2. Usar variaciones monocromáticas para fondo/contenedores
3. Aplicar complementario solo para CTAs y elementos críticos
4. Usar análoga para degradados y transiciones (270° → 300° → 330°)
5. Considerar split-complementary para interfaces con 3+ roles (como el dominio Rojo)
