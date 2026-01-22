// /src/components/layout/Navbar.jsx

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useScrolled from '../../hooks/useScrolled';
import { marcasApi } from '../../api/marcas.api';

// Importar símbolos del logo (ajustar rutas según tu estructura)
import symbolLight from '../../assets/images/symbol-aumacar-light.png';
import symbolDark from '../../assets/images/symbol-aumacar-dark.png';

const DROPDOWN_CLOSE_DELAY = 180; // ms antes de cerrar el dropdown

const Navbar = () => {
  const { t } = useTranslation();
  const isScrolled = useScrolled(80);
  const location = useLocation();
  
  // Estados
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [marcas, setMarcas] = useState([]);
  
  // Refs para el dropdown
  const dropdownTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  // Fetch marcas
  useEffect(() => {
    marcasApi.getAll().then(res => {
      console.log('DEBUG marcasApi.getAll() response:', res);
      setMarcas(res.marcas || []);
    }).catch(err => {
      console.error('Error al obtener marcas:', err);
    });
  }, []);

  // Determinar si estamos en una página de marca (para marcar "Marcas" como activo)
  const isInBrandPage = location.pathname.startsWith('/marca/');

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
      <nav className="cns-navbar-container" aria-label={t('navbar.ariaLabel')}>
        {/* Logo */}
        <Link to="/" className="cns-navbar-logo" aria-label={t('navbar.logoAriaLabel')}>
          <img 
            src={isScrolled ? symbolDark : symbolLight} 
            alt="" 
            aria-hidden="true"
            className="cns-navbar-logo-symbol"
          />
          <span className="cns-navbar-logo-text">aumacar s.r.l</span>
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
              className={getLinkClass(isInBrandPage)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {t('navbar.brands')}
              <svg 
                className={`cns-navbar-dropdown-arrow ${isDropdownOpen ? 'cns-navbar-dropdown-arrow--open' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none"
              >
                <path 
                  d="M2 4L6 8L10 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
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
              {marcas.map(marca => (
                <a
                  key={marca.id}
                  href={`/marca/${marca.slug}`}
                  className="cns-navbar-dropdown-item"
                  role="menuitem"
                >
                  {marca.nombre}
                </a>
              ))}
            </div>
          </div>

          {/* Link Contacto */}
          <button
            className={getLinkClass(false)}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('scrollToContacto'));
            }}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            {t('navbar.contact')}
          </button>
        </div>

        {/* Botón Hamburguesa Mobile */}
        <button
          className={`cns-navbar-hamburger ${isMobileMenuOpen ? 'cns-navbar-hamburger--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
        >
          <span className="cns-navbar-hamburger-line"></span>
          <span className="cns-navbar-hamburger-line"></span>
          <span className="cns-navbar-hamburger-line"></span>
        </button>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="cns-navbar-mobile-backdrop"
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', zIndex: 1000 }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`cns-navbar-mobile ${isMobileMenuOpen ? 'cns-navbar-mobile--open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
          style={{ zIndex: 1001 }}
        >
          <div className="cns-navbar-mobile-content">
            {/* Botón cerrar (X) */}
            <button
              className="cns-navbar-mobile-close"
              aria-label={t('navbar.closeMenu')}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 28, color: '#222', zIndex: 1002 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ×
            </button>
            {/* Contacto */}
            <div className="cns-navbar-mobile-list" style={{marginTop: 48}}>
              {marcas.map(marca => (
                <a
                  key={marca.id}
                  href={`/marca/${marca.slug}`}
                  className="cns-navbar-mobile-link"
                  style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: 8, fontWeight: 'bold', color: '#111', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {marca.nombre}
                </a>
              ))}
              <button
                className="cns-navbar-mobile-link"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('scrollToContacto'));
                  setIsMobileMenuOpen(false);
                }}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%', textAlign: 'left', marginBottom: 8 }}
              >
                {t('navbar.contact')}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;