# DESIGN CONTEXT - Concesionario Multi-Marca (Actualizado v2.0)

## RESUMEN EJECUTIVO

Sistema de diseño unificado para concesionario multi-marca (Subaru, Suzuki, expansible a futuras marcas). Diseño premium, minimalista y monocromático inspirado en Porsche, con diferenciación por tipografía únicamente.

**Arquitectura de Estilos:**
- Sistema de tokens CSS centralizado (`tokens.css`)
- Componentes reutilizables con prefijos (`components.css`)
- Estilos específicos por página (carpeta `pages/`)
- Configuración única de diseño (`design-system.config.js`)
- Sin repetición de variables

**Archivos clave:**
- `design-system.config.js` - Configuración maestra del sistema
- `tailwind.config.js` - Configuración de Tailwind conectada al design system
- `tokens.css` - Variables CSS globales
- `components.css` - Componentes del design system
- `main.css` - Entry point que importa todo

---

## FILOSOFÍA DE DISEÑO

### Principios Core
1. **Monocromático premium**: Blanco + escala de grises (7 niveles)
2. **Diferenciación tipográfica**: Cada marca usa su propia fuente, todo lo demás es idéntico
3. **Protagonismo visual**: Fotos y videos de vehículos son el elemento principal
4. **Espaciado generoso**: Inspirado en Porsche, diseño "respirable"
5. **Bordes redondeados sutiles**: Border-radius consistente en todo el sistema
6. **Transiciones suaves**: Hover effects, parallax, animaciones fluidas
7. **Un solo lugar para cambios**: Modificar `design-system.config.js` actualiza todo

### Estilo Visual
- **Referencia**: Sitio web de Porsche
- **Tono**: Premium, elegante, minimalista
- **Target**: Familias buscando vehículos
- **Bordes**: Sutilmente redondeados para suavizar el diseño

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

## ARQUITECTURA DE ESTILOS (CRÍTICO)

### Jerarquía de Estilos
```
1. design-system.config.js  → Configuración maestra
2. tokens.css               → Variables CSS globales
3. Tailwind                 → Utilidades base
4. components.css           → Componentes del design system
5. Layout/Navbar/Footer.css → Componentes de layout
6. pages/*.css              → Estilos específicos por página
```

### Estructura de Archivos
```
/src/
├── config/
│   ├── design-system.config.js    # Configuración maestra
│   └── tailwind.config.js         # Conectado al design system
│
├── styles/
│   ├── tokens.css                 # Variables CSS (UNA SOLA VEZ)
│   ├── main.css                   # Entry point
│   ├── components.css             # Componentes del sistema
│   ├── Layout.css                 # Layout específico
│   ├── Navbar.css                 # Navbar específico
│   ├── Footer.css                 # Footer específico
│   └── pages/
│       ├── SubaruShowcase.css
│       ├── Landing.css
│       ├── Catalogo.css
│       └── [nueva-pagina].css
│
└── index.js                       # Importa main.css
```

### Flujo de Trabajo para Nueva Página

1. **Crear componente de página**: `/src/pages/public/MiPagina.jsx`
2. **Usar primero Tailwind**: `className="text-h1-mobile lg:text-h1-desktop"`
3. **Usar clases del sistema**: `className="cns-section cns-container"`
4. **Si necesitas estilos únicos**: Crear `/src/styles/pages/MiPagina.css`
5. **Importar en main.css**: `@import './pages/MiPagina.css';`

---

## SISTEMA DE PREFIJOS (CRÍTICO)

Todas las clases CSS personalizadas usan prefijos para evitar conflictos:

### `cns-` (Common/Concesionario)
Componentes compartidos entre todas las páginas:
- `.cns-container` - Contenedor principal
- `.cns-section` - Espaciado de sección
- `.cns-hero` - Sección hero
- `.cns-media-container` - Contenedor de video/imagen
- `.cns-overlay` - Overlay oscuro sobre medios
- `.cns-btn-primary` - Botón primario
- `.cns-btn-secondary` - Botón secundario
- `.cns-vehicle-card` - Card de vehículo
- `.cns-card-image` - Imagen con hover effect
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

### Prefijo por página
Para estilos únicos de una página, usa el nombre de la página:
- `.showcase-*` para SubaruShowcase.jsx
- `.catalogo-*` para Catalogo.jsx
- `.detalle-*` para VehiculoDetalle.jsx

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

**Uso en código:**
```jsx
// Con Tailwind
...

// Con CSS custom
.mi-clase {
  background-color: var(--color-white);
  color: var(--color-gray-900);
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

**Uso:**
```jsx
// Con Tailwind
Título

// Con clase del sistema
Título
```

#### H1
- Mobile: 32px (2rem)
- Desktop: 48px (3rem)
- Line height: 1.2
- Letter spacing: -0.01em
- Peso: Semibold (600)

**Uso:**
```jsx

  Título H1

```

#### H2
- Mobile: 24px (1.5rem)
- Desktop: 32px (2rem)
- Line height: 1.3
- Peso: Semibold (600)

**Uso:**
```jsx

  Título H2

```

#### Body
- Mobile: 16px (1rem)
- Desktop: 18px (1.125rem)
- Line height: 1.6
- Peso: Regular (400)

**Uso:**
```jsx

  Texto del cuerpo

```

#### Small (specs, captions)
- Mobile/Desktop: 14px (0.875rem)
- Line height: 1.5
- Letter spacing: 0.01em
- Peso: Regular (400)

**Uso:**
```jsx
Texto pequeño
```

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

**Uso en código:**
```jsx
// Con Tailwind
...

// Con CSS custom
.mi-clase {
  padding: var(--space-lg);
  gap: var(--space-md);
  margin-top: var(--space-2xl);
}
```

### Espaciado de Secciones
- Mobile: 64px (4rem)
- Desktop: 128px (8rem)

**Uso:**
```jsx
...
```

### Padding de Contenedores
- Mobile: 24px (1.5rem)
- Desktop: 48px (3rem)

**Uso:**
```jsx
...
```

### Grid Gap
- Mobile: 16px (1rem)
- Desktop: 32px (2rem)

---

## BORDER RADIUS

### Escala de Bordes Redondeados
```js
radius: {
  none: '0',        // Sin bordes redondeados
  sm: '4px',        // Badges, inputs pequeños
  md: '8px',        // Botones, cards estándar
  lg: '12px',       // Cards grandes, modales
  xl: '16px',       // Hero sections, elementos destacados
  '2xl': '24px',    // Elementos muy pronunciados
  full: '9999px',   // Completamente redondeado (pills, avatars)
}
```

**Uso en código:**
```jsx
// Con Tailwind
Card
Botón


// Con CSS custom
.mi-card {
  border-radius: var(--radius-lg);
}

.mi-boton {
  border-radius: var(--radius-md);
}
```

**Uso por componente:**
- **Botones**: `md` (8px)
- **Cards**: `lg` (12px)
- **Badges**: `sm` (4px)
- **Imágenes destacadas**: `lg` (12px)
- **Inputs**: `md` (8px)
- **Modales**: `lg` (12px)
- **Pills/Tags**: `full` (9999px)

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

**Uso:**
```jsx

  {/* cards aquí */}

```

---

## EFECTOS Y ANIMACIONES

### Transiciones
```
fast: 150ms
base: 250ms
slow: 400ms
```

**Uso:**
```css
.mi-elemento {
  transition: opacity var(--transition-base);
}
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
.cns-card-image {
  transition: transform var(--transition-slow);
}

.cns-vehicle-card:hover .cns-card-image {
  transform: scale(1.05);
}
```

**Botones:**
```css
.cns-btn-primary:hover {
  opacity: 0.8;
}
```

**Cards:**
```css
.cns-vehicle-card {
  transition: transform var(--transition-base);
}

.cns-vehicle-card:hover {
  transform: translateY(-8px);
}
```

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

  
    
    
  
  
    
      
        Título Hero
      
    
  

```

### Vehicle Card
```jsx

  
    
    
      SUV
    
  
  
    
      Nombre Modelo
    
    
      Descripción breve del vehículo
    
    
      Ver Detalles
    
  

```

### Vehicle Grid
```jsx

  {/* Vehicle cards aquí */}

```

### Botones
```jsx
// Primario
Ver Modelos

// Secundario
Más Información

// Con Tailwind (si necesitas variante custom)

  Custom Button

```

### Section Container
```jsx

  
    {/* Contenido aquí */}
  

```

---

## CÓMO USAR VARIABLES CSS

### En JSX (usar Tailwind primero)
```jsx
// ✅ CORRECTO - Usar Tailwind

  Título


// ✅ CORRECTO - Usar clases del sistema

  
    Título
  

```

### En CSS Custom (cuando Tailwind no es suficiente)
```css
/* /src/styles/pages/MiPagina.css */

.mi-pagina-hero {
  padding: var(--space-3xl) 0;
  background-color: var(--color-gray-50);
}

.mi-pagina-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: transform var(--transition-base);
}

.mi-pagina-card:hover {
  transform: translateY(-8px);
}
```

### Acceder a Variables desde JS (raramente necesario)
```jsx
const MyComponent = () => {
  const spacingLg = getComputedStyle(document.documentElement)
    .getPropertyValue('--space-lg');
  
  return ...;
};
```

---

## GUÍAS DE IMPLEMENTACIÓN

### Crear Nueva Página

**1. Crear componente de página:**
```jsx
// /src/pages/public/NuevaCategoria.jsx

const NuevaCategoria = () => {
  return (
    
      {/* Hero */}
      
        
          
          
        
        
          Nueva Categoría
        
      

      {/* Contenido */}
      
        
          
            Título de Sección
          
          
            {/* contenido */}
          
        
      
    
  );
};

export default NuevaCategoria;
```

**2. Si necesitas estilos específicos, crear archivo CSS:**
```css
/* /src/styles/pages/NuevaCategoria.css */

/* Solo estilos únicos que no se pueden hacer con Tailwind */

.nueva-categoria-special-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-2xl);
}

.nueva-categoria-animated-card {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**3. Importar en main.css:**
```css
/* /src/styles/main.css */

/* ... otros imports ... */

/* Estilos Específicos de Páginas */
@import './pages/Landing.css';
@import './pages/SubaruShowcase.css';
@import './pages/NuevaCategoria.css'; /* ← AGREGAR */
```

**4. Agregar ruta:**
```jsx
// En App.jsx o AppRoutes.jsx
}>
  } />

```

### Añadir Nueva Marca

**1. Añadir fuente a `design-system.config.js`:**
```js
families: {
  subaru: { /* ... */ },
  suzuki: { /* ... */ },
  toyota: {
    primary: '"Poppins", system-ui, sans-serif',
    fallback: 'system-ui, sans-serif',
  },
}
```

**2. Añadir a `tokens.css`:**
```css
--font-family-toyota: 'Poppins', system-ui, -apple-system, sans-serif;
```

**3. Añadir a `tailwind.config.js`:**
```js
fontFamily: {
  'subaru': ['Inter', 'system-ui', 'sans-serif'],
  'suzuki': ['Roboto', 'system-ui', 'sans-serif'],
  'toyota': ['Poppins', 'system-ui', 'sans-serif'],
}
```

**4. Crear clases con prefijo en `components.css`:**
```css
/* ==================== COMPONENTES TOYOTA (tyt-) ==================== */

.tyt-hero-title {
  font-family: var(--font-family-toyota);
  font-size: var(--font-size-hero-mobile);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  line-height: var(--line-height-hero);
  letter-spacing: var(--letter-spacing-hero);
}

@media (min-width: 1024px) {
  .tyt-hero-title {
    font-size: var(--font-size-hero-desktop);
  }
}

.tyt-heading {
  font-family: var(--font-family-toyota);
  font-weight: var(--font-weight-semibold);
}

.tyt-body {
  font-family: var(--font-family-toyota);
  font-weight: var(--font-weight-regular);
}
```

**5. Crear página `/toyota` con misma estructura**

---

## MODIFICAR ESTILOS GLOBALES

### Cambiar Border Radius Global

**Editar `design-system.config.js`:**
```js
borders: {
  radius: {
    none: '0',
    sm: '6px',    // era 4px
    md: '10px',   // era 8px
    lg: '16px',   // era 12px
    xl: '20px',   // era 16px
    '2xl': '28px', // era 24px
    full: '9999px',
  },
}
```

**Actualizar `tokens.css`:**
```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
/* etc... */
```

**Resultado:** Todo el sitio se actualiza automáticamente.

### Cambiar Colores

**Editar `design-system.config.js`:**
```js
colors: {
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',  // Cambiar valores aquí
    100: '#F3F4F6',
    // ...
  }
}
```

**Actualizar `tokens.css`** y **listo** ✅

### Cambiar Espaciado

**Editar `design-system.config.js`:**
```js
spacing: {
  xs: '0.5rem',
  sm: '1.25rem',  // era 1rem
  md: '2rem',     // era 1.5rem
  // ...
}
```

**Actualizar `tokens.css`** y **listo** ✅

---

## CHECKLIST DE CALIDAD

Al crear/revisar componentes, verificar:

- [ ] ¿Usa prefijo correcto (`cns-`, `sbr-`, `szk-`, `lnd-`, `[pagina]-`)?
- [ ] ¿Usa Tailwind ANTES de crear CSS custom?
- [ ] ¿Usa variables CSS del sistema (no valores hardcodeados)?
- [ ] ¿Usa clases de Tailwind del sistema (no colores custom)?
- [ ] ¿Responsive mobile-first?
- [ ] ¿Bordes redondeados con variables (`var(--radius-md)`)?
- [ ] ¿Transiciones suaves en hover?
- [ ] ¿Espaciado generoso (Porsche-style)?
- [ ] ¿Imágenes de alta calidad protagonistas?
- [ ] ¿Tipografía correcta para la marca?
- [ ] ¿Accesibilidad (contraste, alt texts)?
- [ ] ¿CSS específico de página en `/styles/pages/`?
- [ ] ¿Importado en `main.css`?

---

## JERARQUÍA DE DECISIÓN DE ESTILOS

Cuando necesites aplicar estilos, sigue este orden:

### 1️⃣ **PRIMERO: Usar Tailwind**
```jsx

  
    Título
  

```

**✅ Cuándo:** 90% de los casos
**Ventajas:** Rápido, consistente, no requiere CSS custom

### 2️⃣ **SEGUNDO: Usar clases del Design System**
```jsx

  
    
      
        {/* contenido */}
      
    
  

```

**✅ Cuándo:** Componentes reutilizables ya definidos
**Ventajas:** Componentes probados, consistentes

### 3️⃣ **TERCERO: CSS específico de página**
```css
/* /src/styles/pages/MiPagina.css */

.mi-pagina-timeline {
  position: relative;
}

.mi-pagina-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background: var(--color-gray-200);
}

.mi-pagina-animated-section {
  animation: slideIn 0.8s ease-out;
}
```

**✅ Cuándo:** 
- Animaciones complejas únicas
- Layouts muy específicos
- Efectos que Tailwind no puede hacer

**❌ NO usar para:**
- Colores (usar Tailwind o variables)
- Espaciado (usar Tailwind o variables)
- Tipografía (usar clases del sistema)

---

## EJEMPLOS COMPLETOS

### Página de Marca (Subaru)
```jsx
// /src/pages/public/SubaruHome.jsx

const SubaruHome = () => {
  return (
    
      {/* Hero Video */}
      
        
          
            
          
          
        
        
          
            
              La Libertad de Conducir
            
          
        
      

      {/* Modelos */}
      
        
          
            Nuestros Modelos
          
          
          
            
              
                
                
                  SUV
                
              
              
                
                  Forester
                
                
                  SUV versátil con tecnología AWD simétrica
                
                
                  
                    Desde
                    
                      $45.990
                    
                  
                  
                    Ver Detalles
                  
                
              
            

            {/* Más cards... */}
          
        
      

      {/* CTA */}
      
        
          
            Agenda tu Test Drive
          
          
            Experimenta la diferencia Subaru
          
          
            Agendar Ahora
          
        
      
    
  );
};

export default SubaruHome;
```

### Landing Page
```jsx
// /src/pages/public/Landing.jsx

const Landing = () => {
  return (
    
      
        
          Selecciona tu Marca
        
        
        
          {/* Subaru Card */}
          
            
            
            
              
                Subaru
              
            
          

          {/* Suzuki Card */}
          
            
            
            
              
                Suzuki
              
            
          
        
      
    
  );
};

export default Landing;
```

---

## NOTAS IMPORTANTES

1. **NUNCA mezclar marcas**: Cada ruta es completamente independiente
2. **SIEMPRE usar prefijos**: Evita conflictos CSS entre páginas
3. **SIEMPRE usar variables**: No hardcodear valores (colores, espaciado, etc.)
4. **Prioridad Tailwind**: Usar Tailwind primero, CSS custom solo cuando sea necesario
5. **Un solo lugar para cambios**: Modificar `design-system.config.js` actualiza todo
6. **Mobile-first**: Diseñar primero para mobile, luego desktop
7. **Imágenes de calidad**: Son el protagonista, usar alta resolución
8. **Performance**: Lazy load de imágenes, optimizar videos
9. **Accesibilidad**: Siempre incluir alt texts, contraste WCAG AA mínimo
10. **Consistencia**: Mismo layout/espaciado en todas las marcas, solo cambia tipografía
11. **No repetir variables**: Si creas CSS custom, usa las variables del sistema
12. **Importar en main.css**: Todo CSS custom debe importarse en `main.css`

---

## RECURSOS ADICIONALES

- **Referencia visual**: sitio web de Porsche
- **Fuentes**: Google Fonts (Inter, Roboto)
- **Testing**: Probar en Chrome, Safari, Firefox
- **Devices**: Mobile (375px), Tablet (768px), Desktop (1440px)
- **Documentación Tailwind**: https://tailwindcss.com/docs
- **Variables CSS**: Usar siempre desde `tokens.css`

---

**Versión**: 2.0  
**Última actualización**: 2025-01  
**Arquitectura**: Sistema modular con tokens CSS centralizados  
**Contacto**: Para consultas sobre el sistema de diseño
He creado el archivo Markdown completo con toda la documentación actualizada del sistema de diseño. Incluye:
✅ Arquitectura de estilos centralizada
✅ Sistema de prefijos
✅ Guías de implementación paso a paso
✅ Ejemplos completos de código
✅ Jerarquía de decisión de estilos
✅ Border radius y sistema modular
✅ Instrucciones para agregar nuevas páginas y marcas
✅ Checklist de calidad