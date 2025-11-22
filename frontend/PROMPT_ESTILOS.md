# DESIGN CONTEXT - Concesionario Multi-Marca

## RESUMEN EJECUTIVO

Sistema de diseño unificado para concesionario multi-marca (Subaru, Suzuki, expansible a futuras marcas). Diseño premium, minimalista y monocromático inspirado en Porsche, con diferenciación por tipografía únicamente.

**Archivos clave:**
- `design-system.config.js` - Variables del sistema de diseño
- `tailwind.config.js` - Configuración de Tailwind con clases personalizadas

---

## FILOSOFÍA DE DISEÑO

### Principios Core
1. **Monocromático premium**: Blanco + escala de grises (7 niveles)
2. **Diferenciación tipográfica**: Cada marca usa su propia fuente, todo lo demás es idéntico
3. **Protagonismo visual**: Fotos y videos de vehículos son el elemento principal
4. **Espaciado generoso**: Inspirado en Porsche, diseño "respirable"
5. **Bordes rectos**: Sin border-radius en ningún componente
6. **Transiciones suaves**: Hover effects, parallax, animaciones fluidas

### Estilo Visual
- **Referencia**: Sitio web de Porsche
- **Tono**: Premium, elegante, minimalista
- **Target**: Familias buscando vehículos

---

## ARQUITECTURA DEL SITIO

### Estructura de URLs
```
/                    → Landing (selector de marca)
├── /subaru          → Home Subaru
│   └── /subaru/[modelo]   → Detalle de modelo
└── /suzuki          → Home Suzuki
    └── /suzuki/[modelo]   → Detalle de modelo
```

### Estructura de Página de Marca
1. **Hero con video** - Full viewport height, video de fondo
2. **Galería de imágenes** - Grid de fotos de alta calidad
3. **Specs y datos** - Información técnica del vehículo

### Separación de Marcas
- **Cero crossover**: Las marcas nunca se mezclan
- **Sin comparaciones**: No hay funcionalidad de comparar entre marcas
- **Navegación independiente**: Cada marca es su propio ecosistema

---

## SISTEMA DE PREFIJOS (CRÍTICO)

Todas las clases CSS personalizadas usan prefijos para evitar conflictos:

### `cns-` (Common/Concesionario)
Componentes compartidos entre todas las páginas:
- `.cns-container` - Contenedor principal
- `.cns-hero` - Sección hero
- `.cns-media-container` - Contenedor de video/imagen con parallax
- `.cns-overlay` - Overlay oscuro sobre medios
- `.cns-btn-primary` - Botón primario
- `.cns-btn-secondary` - Botón secundario
- `.cns-vehicle-card` - Card de vehículo
- `.cns-card-image` - Imagen con hover effect
- `.cns-section` - Espaciado de sección
- `.cns-vehicle-grid` - Grid de vehículos

### `sbr-` (Subaru)
Clases específicas de tipografía Subaru:
- `.sbr-hero-title` - Título hero con fuente Subaru
- `.sbr-heading` - Headings con fuente Subaru
- `.sbr-body` - Texto body con fuente Subaru

### `szk-` (Suzuki)
Clases específicas de tipografía Suzuki:
- `.szk-hero-title` - Título hero con fuente Suzuki
- `.szk-heading` - Headings con fuente Suzuki
- `.szk-body` - Texto body con fuente Suzuki

### `lnd-` (Landing)
Clases específicas del landing page:
- `.lnd-brand-selector` - Contenedor de selector de marcas
- `.lnd-brand-card` - Card de marca individual

---

## SISTEMA DE COLORES

```js
colors: {
  white: '#FFFFFF',     // Fondo principal
  gray: {
    50: '#FAFAFA',      // Hover states sutiles
    100: '#F5F5F5',     // Fondos secundarios
    200: '#E5E5E5',     // Borders, divisores
    300: '#D4D4D4',     // Borders activos
    400: '#A3A3A3',     // Texto terciario
    600: '#525252',     // Texto secundario
    800: '#262626',     // Texto principal
    900: '#171717',     // Headers, máximo contraste
  }
}
```

**Uso:**
- Fondos: `white`, `gray-50`, `gray-100`
- Textos: `gray-800` (principal), `gray-600` (secundario), `gray-400` (terciario)
- Borders: `gray-200`, `gray-300`
- Elementos oscuros: `gray-900`

---

## TIPOGRAFÍA

### Sistema de Jerarquía (5 niveles)

#### Hero Title
- Mobile: 40px (2.5rem)
- Desktop: 72px (4.5rem)
- Line height: 1.1
- Letter spacing: -0.02em
- Peso: Bold (700)

#### H1
- Mobile: 32px (2rem)
- Desktop: 48px (3rem)
- Line height: 1.2
- Letter spacing: -0.01em
- Peso: Semibold (600)

#### H2
- Mobile: 24px (1.5rem)
- Desktop: 32px (2rem)
- Line height: 1.3
- Peso: Semibold (600)

#### Body
- Mobile: 16px (1rem)
- Desktop: 18px (1.125rem)
- Line height: 1.6
- Peso: Regular (400)

#### Small (specs, captions)
- Mobile/Desktop: 14px (0.875rem)
- Line height: 1.5
- Letter spacing: 0.01em
- Peso: Regular (400)

### Fuentes por Marca

**Subaru**: Inter (técnico, robusto, moderno)
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

**Suzuki**: Roboto (limpio, dinámico, versátil)
```css
font-family: 'Roboto', system-ui, -apple-system, sans-serif;
```

**Importar con:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## ESPACIADO

### Escala de Espaciado
```
xs:   8px   (0.5rem)
sm:   16px  (1rem)
md:   24px  (1.5rem)
lg:   32px  (2rem)
xl:   48px  (3rem)
2xl:  64px  (4rem)
3xl:  96px  (6rem)
4xl:  128px (8rem)
5xl:  192px (12rem)
```

### Espaciado de Secciones
- Mobile: 64px (4rem)
- Desktop: 128px (8rem)

### Padding de Contenedores
- Mobile: 24px (1.5rem)
- Desktop: 48px (3rem)

### Grid Gap
- Mobile: 16px (1rem)
- Desktop: 32px (2rem)

---

## LAYOUT Y RESPONSIVE

### Breakpoints
```
sm:   640px   (Mobile landscape, tablets)
md:   768px   (Tablets)
lg:   1024px  (Desktop small)
xl:   1280px  (Desktop)
2xl:  1536px  (Desktop large)
```

### Max Widths
- `max-w-content`: 1440px (contenido principal)
- `max-w-narrow`: 1200px (contenido estrecho)
- `max-w-wide`: 1920px (full width con límite)

### Grid de Vehículos
- Mobile: 1 columna
- Tablet (768px+): 2 columnas
- Desktop (1024px+): 3 columnas

---

## EFECTOS Y ANIMACIONES

### Transiciones
```
fast: 150ms
base: 250ms
slow: 400ms
```

### Easing
```
default: cubic-bezier(0.4, 0, 0.2, 1)
in:      cubic-bezier(0.4, 0, 1, 1)
out:     cubic-bezier(0, 0, 0.2, 1)
in-out:  cubic-bezier(0.4, 0, 0.2, 1)
```

### Hover Effects

**Imágenes:**
```css
transform: scale(1.05);
transition: transform 400ms cubic-bezier(0, 0, 0.2, 1);
```

**Botones:**
```css
opacity: 0.8;
transition: opacity 250ms;
```

**Cards:**
```css
transform: translateY(-8px);
transition: transform 250ms;
```

### Parallax
Aplicar en scroll a `.cns-media-container`

### Sombras (usar con moderación)
```
sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

---

## COMPONENTES COMUNES

### Hero Section
```jsx
<section className="cns-hero">
  <div className="cns-media-container">
    <video autoPlay muted loop playsInline>
      <source src="/video.mp4" type="video/mp4" />
    </video>
    <div className="cns-overlay"></div>
  </div>
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="sbr-hero-title text-center">Título Hero</h1>
  </div>
</section>
```

### Vehicle Card
```jsx
<div className="cns-vehicle-card">
  <img src="/vehicle.jpg" alt="Modelo" className="cns-card-image" />
  <div className="p-lg">
    <h3 className="sbr-heading text-h2-mobile lg:text-h2-desktop text-gray-900">
      Nombre Modelo
    </h3>
    <p className="sbr-body text-body-mobile lg:text-body-desktop text-gray-600 mt-md">
      Descripción breve
    </p>
  </div>
</div>
```

### Vehicle Grid
```jsx
<div className="cns-vehicle-grid">
  {/* Vehicle cards aquí */}
</div>
```

### Botones
```jsx
// Primario
<button className="cns-btn-primary">Ver Modelos</button>

// Secundario
<button className="cns-btn-secondary">Más Información</button>
```

---

## GUÍAS DE IMPLEMENTACIÓN

### Añadir Nueva Marca

1. **Añadir fuente a `design-system.config.js`:**
```js
families: {
  // ...existentes
  toyota: {
    primary: '"Poppins", system-ui, sans-serif',
    fallback: 'system-ui, sans-serif',
  },
}
```

2. **Añadir a `tailwind.config.js`:**
```js
fontFamily: {
  // ...existentes
  'toyota': ['Poppins', 'system-ui', 'sans-serif'],
}
```

3. **Crear clases con prefijo en plugin:**
```js
addComponents({
  '.tyt-hero-title': { /* ... */ },
  '.tyt-heading': { /* ... */ },
  '.tyt-body': { /* ... */ },
});
```

4. **Crear ruta `/toyota` con misma estructura**

### Estructura de Archivos Sugerida
```
src/
├── pages/
│   ├── index.jsx           (Landing)
│   ├── subaru.jsx          (Home Subaru)
│   ├── suzuki.jsx          (Home Suzuki)
│   └── [marca]/
│       └── [modelo].jsx    (Detalle de modelo)
├── components/
│   ├── common/             (Componentes compartidos)
│   │   ├── Hero.jsx
│   │   ├── VehicleCard.jsx
│   │   ├── VehicleGrid.jsx
│   │   └── Button.jsx
│   └── layout/
│       ├── Header.jsx
│       └── Footer.jsx
├── styles/
│   └── globals.css         (Importar Tailwind)
└── config/
    ├── design-system.config.js
    └── tailwind.config.js
```

---

## CHECKLIST DE CALIDAD

Al crear/revisar componentes, verificar:

- [ ] ¿Usa prefijo correcto (`cns-`, `sbr-`, `szk-`, `lnd-`)?
- [ ] ¿Usa clases de Tailwind del sistema (no colores custom)?
- [ ] ¿Responsive mobile-first?
- [ ] ¿Bordes rectos (sin border-radius)?
- [ ] ¿Transiciones suaves en hover?
- [ ] ¿Espaciado generoso (Porsche-style)?
- [ ] ¿Imágenes de alta calidad protagonistas?
- [ ] ¿Tipografía correcta para la marca?
- [ ] ¿Accesibilidad (contraste, alt texts)?

---

## EJEMPLOS COMPLETOS

### Landing Page
```jsx
import React from 'react';

export default function Landing() {
  return (
    <main className="min-h-screen bg-white">
      <div className="cns-container py-5xl">
        <h1 className="text-hero-mobile lg:text-hero-desktop text-center text-gray-900 mb-3xl">
          Selecciona tu Marca
        </h1>
        
        <div className="lnd-brand-selector">
          {/* Subaru Card */}
          <a href="/subaru" className="lnd-brand-card">
            <img src="/subaru-hero.jpg" alt="Subaru" className="cns-card-image" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-h1-mobile lg:text-h1-desktop text-white">
                Subaru
              </h2>
            </div>
          </a>

          {/* Suzuki Card */}
          <a href="/suzuki" className="lnd-brand-card">
            <img src="/suzuki-hero.jpg" alt="Suzuki" className="cns-card-image" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-h1-mobile lg:text-h1-desktop text-white">
                Suzuki
              </h2>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
```

### Página de Marca (Subaru)
```jsx
import React from 'react';

export default function SubaruHome() {
  return (
    <main className="bg-white">
      {/* Hero Video */}
      <section className="cns-hero">
        <div className="cns-media-container">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/subaru-hero.mp4" type="video/mp4" />
          </video>
          <div className="cns-overlay"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center cns-container">
          <h1 className="sbr-hero-title text-center">
            La Libertad de Conducir
          </h1>
        </div>
      </section>

      {/* Modelos */}
      <section className="cns-section">
        <div className="cns-container">
          <h2 className="sbr-heading text-h1-mobile lg:text-h1-desktop text-gray-900 mb-2xl">
            Nuestros Modelos
          </h2>
          
          <div className="cns-vehicle-grid">
            {/* Card 1 */}
            <div className="cns-vehicle-card">
              <img src="/forester.jpg" alt="Forester" className="cns-card-image" />
              <div className="p-lg">
                <h3 className="sbr-heading text-h2-mobile lg:text-h2-desktop text-gray-900">
                  Forester
                </h3>
                <p className="sbr-body text-body-mobile lg:text-body-desktop text-gray-600 mt-md">
                  SUV versátil con tecnología AWD simétrica
                </p>
                <button className="cns-btn-primary mt-lg">Ver Detalles</button>
              </div>
            </div>

            {/* Más cards... */}
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## NOTAS IMPORTANTES

1. **NUNCA mezclar marcas**: Cada ruta es completamente independiente
2. **SIEMPRE usar prefijos**: Evita conflictos CSS entre páginas
3. **Prioridad mobile-first**: Diseñar primero para mobile, luego desktop
4. **Imágenes de calidad**: Son el protagonista, usar alta resolución
5. **Performance**: Lazy load de imágenes, optimizar videos
6. **Accesibilidad**: Siempre incluir alt texts, contraste WCAG AA mínimo
7. **Consistencia**: Mismo layout/espaciado en todas las marcas, solo cambia tipografía

---

## RECURSOS ADICIONALES

- **Referencia visual**: sitio web de Porsche
- **Fuentes**: Google Fonts (Inter, Roboto)
- **Testing**: Probar en Chrome, Safari, Firefox
- **Devices**: Mobile (375px), Tablet (768px), Desktop (1440px)

---

**Versión**: 1.0  
**Última actualización**: 2025-01  
**Contacto**: Para consultas sobre el sistema de diseño