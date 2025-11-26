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
        <Link to="/" className="cns-navbar-logo" aria-label="Aumacar - Ir al inicio">
          <img 
            src={isScrolled ? symbolDark : symbolLight} 
            alt="" 
            aria-hidden="true"
            className="cns-navbar-logo-symbol"
          />
          <span className="cns-navbar-logo-text">Aumacar S.R.L.</span>
        </Link>

        {/* Navegación Desktop */}
        <div className="cns-navbar-nav">
          {/* Dropdown Marcas */}
          <div 
            className="cns-navbar-dropdown"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
            ref={dropdownRef}
          >
            <button
              className={`cns-navbar-link cns-navbar-dropdown-trigger ${isInBrandPage ? 'cns-navbar-link--active' : ''}`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Marcas
              <svg 
                className={`cns-navbar-dropdown-arrow ${isDropdownOpen ? 'cns-navbar-dropdown-arrow--open' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none"
                aria-hidden="true"
              >
                <path 
                  d="M2.5 4.5L6 8L9.5 4.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div 
              className={`cns-navbar-dropdown-menu ${isDropdownOpen ? 'cns-navbar-dropdown-menu--open' : ''}`}
              role="menu"
            >
              <Link 
                to="/subaru" 
                className={`cns-navbar-dropdown-item ${location.pathname.startsWith('/subaru') ? 'cns-navbar-dropdown-item--active' : ''}`}
                role="menuitem"
              >
                Subaru
              </Link>
              <Link 
                to="/suzuki" 
                className={`cns-navbar-dropdown-item ${location.pathname.startsWith('/suzuki') ? 'cns-navbar-dropdown-item--active' : ''}`}
                role="menuitem"
              >
                Suzuki
              </Link>
            </div>
          </div>

          {/* Link Contacto */}
          <NavLink 
            to="/contacto" 
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Contacto
          </NavLink>
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
            {/* Marcas Accordion */}
            <div className="cns-navbar-mobile-item">
              <button
                className={`cns-navbar-mobile-link cns-navbar-mobile-accordion-trigger ${isInBrandPage ? 'cns-navbar-mobile-link--active' : ''}`}
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                aria-expanded={isMobileDropdownOpen}
              >
                Marcas
                <svg 
                  className={`cns-navbar-mobile-accordion-arrow ${isMobileDropdownOpen ? 'cns-navbar-mobile-accordion-arrow--open' : ''}`}
                  width="16" 
                  height="16" 
                  viewBox="0 0 12 12" 
                  fill="none"
                  aria-hidden="true"
                >
                  <path 
                    d="M2.5 4.5L6 8L9.5 4.5" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div 
                className={`cns-navbar-mobile-accordion ${isMobileDropdownOpen ? 'cns-navbar-mobile-accordion--open' : ''}`}
              >
                <Link 
                  to="/subaru" 
                  className={`cns-navbar-mobile-sublink ${location.pathname.startsWith('/subaru') ? 'cns-navbar-mobile-sublink--active' : ''}`}
                >
                  Subaru
                </Link>
                <Link 
                  to="/suzuki" 
                  className={`cns-navbar-mobile-sublink ${location.pathname.startsWith('/suzuki') ? 'cns-navbar-mobile-sublink--active' : ''}`}
                >
                  Suzuki
                </Link>
              </div>
            </div>

            {/* Contacto */}
            <NavLink 
              to="/contacto" 
              className={({ isActive }) => 
                `cns-navbar-mobile-link ${isActive ? 'cns-navbar-mobile-link--active' : ''}`
              }
            >
              Contacto
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;