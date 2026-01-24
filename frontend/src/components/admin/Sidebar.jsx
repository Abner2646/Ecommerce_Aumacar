// /src/components/admin/Sidebar.jsx


import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import React, { useState } from 'react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      path: '/admin/dashboard',
      icon: 'fa-gauge',
      label: 'Dashboard'
    },
    {
      path: '/admin/marcas',
      icon: 'fa-tag',
      label: 'Marcas'
    },
    {
      path: '/admin/vehiculos',
      icon: 'fa-car',
      label: 'Vehículos'
    },
    {
      path: '/admin/caracteristicas',
      icon: 'fa-list-check',
      label: 'Características'
    },
    {
      path: '/admin/colores',
      icon: 'fa-palette',
      label: 'Colores'
    },
    {
      path: '/admin/clientes',
      icon: 'fa-users',
      label: 'Clientes'
    }
  ];

  // Detectar mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

  // Cerrar sidebar al navegar (delay en mobile para evitar conflicto con React Router)
  const handleNavClick = () => {
    if (isMobile) {
      setTimeout(() => setOpen(false), 150);
    }
  };

  // Botón hamburguesa sólo en mobile
  // El botón y el backdrop sólo se muestran en mobile
  return (
    <>
      <button
        className="adm-sidebar-toggle"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="adm-sidebar"
        style={{ display: isMobile ? 'flex' : 'none' }}
        onClick={() => setOpen(!open)}
      >
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>
      {/* Backdrop primero en el DOM, pointer-events solo cuando abierto */}
      {isMobile && (
        <div
          className={`adm-sidebar-backdrop${open ? ' open' : ''}`}
          style={{ display: open ? 'block' : 'none', pointerEvents: open ? 'auto' : 'none' }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside id="adm-sidebar" className={`adm-sidebar${open ? ' open' : ''}`} style={{ pointerEvents: 'auto', zIndex: 3001 }}>
        {/* Header del Sidebar */}
        <div className="adm-sidebar-header">
          <h1 className="adm-sidebar-title">
            aumacar s.r.l Admin
          </h1>
        </div>

        {/* Usuario */}
        <div className="adm-user-info">
          <div className="adm-user-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="adm-user-details">
            <p className="adm-user-name">{user?.nombre || 'Admin'}</p>
            <p className="adm-user-email">{user?.email || ''}</p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="adm-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `adm-nav-link ${isActive ? 'adm-nav-link-active' : ''}`
              }
              onClick={handleNavClick}
            >
              <i className={`fa-solid ${item.icon} adm-nav-icon`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="adm-sidebar-footer">
          <button
            onClick={handleLogout}
            className="adm-logout-btn"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;