// /tailwind.config.js

//import designSystem from './src/config/design-system.config.js';
import designSystem from './src/config/design-system.config.js';  // ← DEBE decir ./src/config/

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      /**
       * COLORES
       */
      colors: {
        white: designSystem.colors.white,
        gray: designSystem.colors.gray,
      },

      /**
       * TIPOGRAFÍA
       */
      fontSize: {
        'hero-mobile': [
          designSystem.typography.sizes.hero.mobile,
          {
            lineHeight: designSystem.typography.sizes.hero.lineHeight,
            letterSpacing: designSystem.typography.sizes.hero.letterSpacing,
          },
        ],
        'hero-desktop': [
          designSystem.typography.sizes.hero.desktop,
          {
            lineHeight: designSystem.typography.sizes.hero.lineHeight,
            letterSpacing: designSystem.typography.sizes.hero.letterSpacing,
          },
        ],
        'h1-mobile': [
          designSystem.typography.sizes.h1.mobile,
          {
            lineHeight: designSystem.typography.sizes.h1.lineHeight,
            letterSpacing: designSystem.typography.sizes.h1.letterSpacing,
          },
        ],
        'h1-desktop': [
          designSystem.typography.sizes.h1.desktop,
          {
            lineHeight: designSystem.typography.sizes.h1.lineHeight,
            letterSpacing: designSystem.typography.sizes.h1.letterSpacing,
          },
        ],
        'h2-mobile': [
          designSystem.typography.sizes.h2.mobile,
          {
            lineHeight: designSystem.typography.sizes.h2.lineHeight,
            letterSpacing: designSystem.typography.sizes.h2.letterSpacing,
          },
        ],
        'h2-desktop': [
          designSystem.typography.sizes.h2.desktop,
          {
            lineHeight: designSystem.typography.sizes.h2.lineHeight,
            letterSpacing: designSystem.typography.sizes.h2.letterSpacing,
          },
        ],
        'body-mobile': [
          designSystem.typography.sizes.body.mobile,
          {
            lineHeight: designSystem.typography.sizes.body.lineHeight,
            letterSpacing: designSystem.typography.sizes.body.letterSpacing,
          },
        ],
        'body-desktop': [
          designSystem.typography.sizes.body.desktop,
          {
            lineHeight: designSystem.typography.sizes.body.lineHeight,
            letterSpacing: designSystem.typography.sizes.body.letterSpacing,
          },
        ],
        'small': [
          designSystem.typography.sizes.small.mobile,
          {
            lineHeight: designSystem.typography.sizes.small.lineHeight,
            letterSpacing: designSystem.typography.sizes.small.letterSpacing,
          },
        ],
      },

      fontFamily: {
        'subaru': designSystem.typography.families.subaru.primary.split(','),
        'suzuki': designSystem.typography.families.suzuki.primary.split(','),
      },

      fontWeight: designSystem.typography.weights,

      /**
       * ESPACIADO
       */
      spacing: {
        ...designSystem.spacing,
      },

      /**
       * LAYOUT
       */
      maxWidth: designSystem.layout.maxWidth,

      /**
       * BORDES - ACTUALIZADO CON BORDER RADIUS
       */
      borderRadius: {
        'none': designSystem.borders.radius.none,
        'sm': designSystem.borders.radius.sm,
        'md': designSystem.borders.radius.md,
        'lg': designSystem.borders.radius.lg,
        'xl': designSystem.borders.radius.xl,
        '2xl': designSystem.borders.radius['2xl'],
        'full': designSystem.borders.radius.full,
      },
      
      borderWidth: designSystem.borders.width,

      /**
       * EFECTOS
       */
      transitionDuration: {
        fast: designSystem.effects.transitions.fast,
        base: designSystem.effects.transitions.base,
        slow: designSystem.effects.transitions.slow,
      },

      transitionTimingFunction: {
        'default': designSystem.effects.easing.default,
        'in': designSystem.effects.easing.in,
        'out': designSystem.effects.easing.out,
        'in-out': designSystem.effects.easing.inOut,
      },

      boxShadow: designSystem.effects.shadows,

      /**
       * Z-INDEX
       */
      zIndex: designSystem.zIndex,

      /**
       * BREAKPOINTS
       */
      screens: designSystem.breakpoints,
    },
  },
  plugins: [
    function ({ addComponents }) {
      // CLASES COMUNES (prefijo: cns-)
      addComponents({
        '.cns-container': {
          width: '100%',
          maxWidth: designSystem.layout.maxWidth.content,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: designSystem.spacing.container.mobile,
          paddingRight: designSystem.spacing.container.mobile,
          '@media (min-width: 1024px)': {
            paddingLeft: designSystem.spacing.container.desktop,
            paddingRight: designSystem.spacing.container.desktop,
          },
        },

        '.cns-hero': {
          width: '100%',
          height: '100vh',
          minHeight: '600px',
          position: 'relative',
          overflow: 'hidden',
        },

        '.cns-media-container': {
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        },

        '.cns-overlay': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },

        '.cns-btn-primary': {
          padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`,
          fontSize: designSystem.typography.sizes.body.mobile,
          fontWeight: designSystem.typography.weights.medium,
          color: designSystem.colors.white,
          backgroundColor: designSystem.colors.gray[900],
          border: 'none',
          borderRadius: designSystem.borders.radius.md, // ← AGREGADO
          cursor: 'pointer',
          transition: `opacity ${designSystem.effects.transitions.base} ${designSystem.effects.easing.default}`,
          '&:hover': {
            opacity: designSystem.effects.hover.opacity,
          },
        },

        '.cns-btn-secondary': {
          padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`,
          fontSize: designSystem.typography.sizes.body.mobile,
          fontWeight: designSystem.typography.weights.medium,
          color: designSystem.colors.gray[900],
          backgroundColor: 'transparent',
          border: `${designSystem.borders.width.thin} solid ${designSystem.colors.gray[900]}`,
          borderRadius: designSystem.borders.radius.md, // ← AGREGADO
          cursor: 'pointer',
          transition: `all ${designSystem.effects.transitions.base} ${designSystem.effects.easing.default}`,
          '&:hover': {
            color: designSystem.colors.white,
            backgroundColor: designSystem.colors.gray[900],
          },
        },

        '.cns-vehicle-card': {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: designSystem.colors.white,
          borderRadius: designSystem.borders.radius.lg, // ← AGREGADO
          cursor: 'pointer',
          transition: `transform ${designSystem.effects.transitions.base} ${designSystem.effects.easing.default}`,
          '&:hover img': {
            transform: `scale(${designSystem.effects.hover.imageScale})`,
          },
        },

        '.cns-card-image': {
          width: '100%',
          height: 'auto',
          borderRadius: designSystem.borders.radius.lg, // ← AGREGADO
          transition: `transform ${designSystem.effects.transitions.slow} ${designSystem.effects.easing.out}`,
        },

        '.cns-section': {
          paddingTop: designSystem.spacing.section.mobile,
          paddingBottom: designSystem.spacing.section.mobile,
          '@media (min-width: 1024px)': {
            paddingTop: designSystem.spacing.section.desktop,
            paddingBottom: designSystem.spacing.section.desktop,
          },
        },

        '.cns-vehicle-grid': {
          display: 'grid',
          gap: designSystem.layout.grid.gap.mobile,
          gridTemplateColumns: 'repeat(1, 1fr)',
          '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (min-width: 1024px)': {
            gap: designSystem.layout.grid.gap.desktop,
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        },
      });

      // CLASES ESPECÍFICAS SUBARU (prefijo: sbr-)
      addComponents({
        '.sbr-hero-title': {
          fontFamily: designSystem.typography.families.subaru.primary,
          fontSize: designSystem.typography.sizes.hero.mobile,
          fontWeight: designSystem.typography.weights.bold,
          color: designSystem.colors.white,
          lineHeight: designSystem.typography.sizes.hero.lineHeight,
          letterSpacing: designSystem.typography.sizes.hero.letterSpacing,
          '@media (min-width: 1024px)': {
            fontSize: designSystem.typography.sizes.hero.desktop,
          },
        },

        '.sbr-heading': {
          fontFamily: designSystem.typography.families.subaru.primary,
          fontWeight: designSystem.typography.weights.semibold,
        },

        '.sbr-body': {
          fontFamily: designSystem.typography.families.subaru.primary,
          fontWeight: designSystem.typography.weights.regular,
        },
      });

      // CLASES ESPECÍFICAS SUZUKI (prefijo: szk-)
      addComponents({
        '.szk-hero-title': {
          fontFamily: designSystem.typography.families.suzuki.primary,
          fontSize: designSystem.typography.sizes.hero.mobile,
          fontWeight: designSystem.typography.weights.bold,
          color: designSystem.colors.white,
          lineHeight: designSystem.typography.sizes.hero.lineHeight,
          letterSpacing: designSystem.typography.sizes.hero.letterSpacing,
          '@media (min-width: 1024px)': {
            fontSize: designSystem.typography.sizes.hero.desktop,
          },
        },

        '.szk-heading': {
          fontFamily: designSystem.typography.families.suzuki.primary,
          fontWeight: designSystem.typography.weights.semibold,
        },

        '.szk-body': {
          fontFamily: designSystem.typography.families.suzuki.primary,
          fontWeight: designSystem.typography.weights.regular,
        },
      });

      // CLASES LANDING PAGE (prefijo: lnd-)
      addComponents({
        '.lnd-brand-selector': {
          display: 'flex',
          flexDirection: 'column',
          gap: designSystem.spacing.lg,
          '@media (min-width: 768px)': {
            flexDirection: 'row',
            gap: designSystem.spacing['2xl'],
          },
        },

        '.lnd-brand-card': {
          flex: 1,
          minHeight: '400px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: designSystem.borders.radius.xl, // ← AGREGADO
          cursor: 'pointer',
          transition: `transform ${designSystem.effects.transitions.base} ${designSystem.effects.easing.default}`,
          '&:hover': {
            transform: 'translateY(-8px)',
          },
          '&:hover img': {
            transform: `scale(${designSystem.effects.hover.imageScale})`,
          },
        },
      });
    },
  ],
};