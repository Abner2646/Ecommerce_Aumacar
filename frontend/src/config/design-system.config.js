// /src/config/design-system.config.js

/**
 * CONCESIONARIO MULTI-MARCA - DESIGN SYSTEM
 * Sistema de diseño unificado para múltiples marcas automotrices
 * Inspirado en Porsche - Premium, minimalista, elegante
 */

export const designSystem = {
  /**
   * COLORES
   * Paleta monocromática blanco-gris para adaptabilidad a cualquier marca
   */
  colors: {
    white: '#FFFFFF',
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      600: '#525252',
      800: '#262626',
      900: '#171717',
    },
  },

  /**
   * TIPOGRAFÍA
   * Sistema de 5 niveles jerárquicos
   */
  typography: {
    sizes: {
      hero: {
        mobile: '2.5rem',
        desktop: '4.5rem',
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
      },
      h1: {
        mobile: '2rem',
        desktop: '3rem',
        lineHeight: '1.2',
        letterSpacing: '-0.01em',
      },
      h2: {
        mobile: '1.5rem',
        desktop: '2rem',
        lineHeight: '1.3',
        letterSpacing: '0',
      },
      body: {
        mobile: '1rem',
        desktop: '1.125rem',
        lineHeight: '1.6',
        letterSpacing: '0',
      },
      small: {
        mobile: '0.875rem',
        desktop: '0.875rem',
        lineHeight: '1.5',
        letterSpacing: '0.01em',
      },
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    families: {
      subaru: {
        primary: '"Inter", system-ui, -apple-system, sans-serif',
        fallback: 'system-ui, -apple-system, sans-serif',
      },
      suzuki: {
        primary: '"Roboto", system-ui, -apple-system, sans-serif',
        fallback: 'system-ui, -apple-system, sans-serif',
      },
    },
  },

  /**
   * ESPACIADO
   * Sistema espacioso inspirado en Porsche
   */
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
    '4xl': '8rem',
    '5xl': '12rem',
    section: {
      mobile: '4rem',
      desktop: '8rem',
    },
    container: {
      mobile: '1.5rem',
      desktop: '3rem',
    },
  },

  /**
   * LAYOUT
   * Sistema de grid y contenedores
   */
  layout: {
    maxWidth: {
      full: '100%',
      content: '1440px',
      narrow: '1200px',
      wide: '1920px',
    },
    grid: {
      columns: 12,
      gap: {
        mobile: '1rem',
        desktop: '2rem',
      },
    },
  },

  /**
   * BORDES
   * Sistema de border-radius modular
   */
  borders: {
    radius: {
      none: '0',           // Sin bordes redondeados
      sm: '4px',           // Bordes sutiles (badges, inputs pequeños)
      md: '8px',           // Bordes estándar (botones, cards)
      lg: '12px',          // Bordes pronunciados (cards grandes, modales)
      xl: '16px',          // Bordes extra grandes (hero sections)
      '2xl': '24px',       // Bordes muy pronunciados (elementos destacados)
      full: '9999px',      // Completamente redondeado (pills, avatars)
    },
    width: {
      thin: '1px',
      medium: '2px',
      thick: '4px',
    },
  },

  /**
   * EFECTOS Y TRANSICIONES
   * Animaciones suaves y profesionales
   */
  effects: {
    transitions: {
      fast: '150ms',
      base: '250ms',
      slow: '400ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      imageScale: '1.05',
      opacity: '0.8',
    },
  },

  /**
   * Z-INDEX
   * Capas de profundidad
   */
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
  },

  /**
   * BREAKPOINTS
   * Responsive design equilibrado
   */
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export default designSystem;