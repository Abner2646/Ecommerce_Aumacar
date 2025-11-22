// /components/layout/Navbar.jsx

import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon,
  TruckIcon 
} from '@heroicons/react/24/outline';
//import '../../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="cns-navbar">
      <div className="cns-navbar-container">
        {/* Logo */}
        <Link to="/" className="cns-navbar-logo" onClick={closeMenu}>
          <TruckIcon className="cns-logo-icon" />
          <span className="cns-logo-text">AutoDealer</span>
        </Link>

        {/* Hamburger Menu */}
        <button 
          className="cns-navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? (
            <XMarkIcon className="cns-toggle-icon" />
          ) : (
            <Bars3Icon className="cns-toggle-icon" />
          )}
        </button>

        {/* Navigation Links */}
        <div className={`cns-navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="cns-navbar-nav">
            <li className="cns-nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'cns-nav-link active' : 'cns-nav-link'}
                onClick={closeMenu}
              >
                Inicio
              </NavLink>
            </li>
            <li className="cns-nav-item">
              <NavLink 
                to="/marcas" 
                className={({ isActive }) => isActive ? 'cns-nav-link active' : 'cns-nav-link'}
                onClick={closeMenu}
              >
                Marcas
              </NavLink>
            </li>
            <li className="cns-nav-item">
              <NavLink 
                to="/contacto" 
                className={({ isActive }) => isActive ? 'cns-nav-link active' : 'cns-nav-link'}
                onClick={closeMenu}
              >
                Contacto
              </NavLink>
            </li>
            <li className="cns-nav-item cns-nav-item-cta">
              <Link 
                to="/admin/login" 
                className="cns-nav-link cns-nav-link-admin"
                onClick={closeMenu}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;