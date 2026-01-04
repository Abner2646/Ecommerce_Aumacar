// /src/components/layout/Navbar.jsx

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useScrolled from '../../hooks/useScrolled';

// Importar símbolos del logo (ajustar rutas según tu estructura)
import symbolLight from '../../assets/images/symbol-aumacar-light.png';
import symbolDark from '../../assets/images/symbol-aumacar-dark.png';

const DROPDOWN_CLOSE_DELAY = 180; // ms antes de cerrar el dropdown

const Navbar = () => {
  const isScrolled = useScrolled(80);
  const location = useLocation();
  
  // Estados
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  
  // Refs para el dropdown
  const dropdownTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  // Determinar si estamos en una página de marca (para marcar "Marcas" como activo)
  const isInBrandPage = location.pathname.startsWith('/subaru') || 
                         location.pathname.startsWith('/suzuki');

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Cerrar mobile menu al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileDropdownOpen(false);
  }, [location.pathname]);

  // Cerrar mobile menu al hacer resize a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloquear scroll del body cuando el mobile menu está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handlers del dropdown (desktop)
  const handleDropdownEnter = useCallback(() => {
    // Cancelar cualquier cierre pendiente
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    // Delay antes de cerrar
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, DROPDOWN_CLOSE_DELAY);
  }, []);

  // Cerrar dropdown con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Clase activa para NavLink
  const getLinkClass = (isActive) => {
    const baseClass = 'cns-navbar-link';
    return isActive ? `${baseClass} cns-navbar-link--active` : baseClass;
  };

  return (
    <header 
      className={`cns-navbar ${isScrolled ? 'cns-navbar--scrolled' : ''}`}
      role="banner"
    >
      <nav className="cns-navbar-container" aria-label="Navegación principal">
        {/* Logo */}
        <Link to="/" className="cns-navbar-logo" aria-label="aumacar - Ir al inicio">
          <img 
            src={isScrolled ? symbolDark : symbolLight} 
            alt="" 
            aria-hidden="true"
            className="cns-navbar-logo-symbol"
          />
          <span className="cns-navbar-logo-text">aumacar S.R.L.</span>
        </Link>

        {/* Navegación Desktop */}
        <div className="cns-navbar-nav">


          {/* Link Contacto */}
          <button
            className={getLinkClass(false)}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('scrollToContacto'));
            }}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            Contacto
          </button>
        </div>

        {/* Botón Hamburguesa Mobile */}
        <button
          className={`cns-navbar-hamburger ${isMobileMenuOpen ? 'cns-navbar-hamburger--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="cns-navbar-hamburger-line"></span>
          <span className="cns-navbar-hamburger-line"></span>
          <span className="cns-navbar-hamburger-line"></span>
        </button>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`cns-navbar-mobile ${isMobileMenuOpen ? 'cns-navbar-mobile--open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="cns-navbar-mobile-content">


            {/* Contacto */}
            <button
              className="cns-navbar-mobile-link"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('scrollToContacto'));
                setIsMobileMenuOpen(false);
              }}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Contacto
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;