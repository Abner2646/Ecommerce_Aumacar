// /src/components/admin/Sidebar.jsx

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
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

  return (
    <>
      {/* Botón hamburguesa (solo mobile) */}
      <button
        onClick={toggleSidebar}
        className="adm-hamburger"
        aria-label="Toggle menu"
      >
        <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Overlay (solo mobile cuando está abierto) */}
      {isOpen && (
        <div 
          className="adm-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`adm-sidebar ${isOpen ? 'adm-sidebar-open' : ''}`}>
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
              onClick={closeSidebar} // ← Cerrar sidebar al hacer click (mobile)
              className={({ isActive }) =>
                `adm-nav-link ${isActive ? 'adm-nav-link-active' : ''}`
              }
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