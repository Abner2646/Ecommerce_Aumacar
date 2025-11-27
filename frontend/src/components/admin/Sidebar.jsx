// /src/components/admin/Sidebar.jsx

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    }
  ];

  return (
    <aside className="adm-sidebar">
      {/* Header del Sidebar */}
      <div className="adm-sidebar-header">
        <h1 className="adm-sidebar-title">
          Aumacar Admin
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
  );
};

export default Sidebar;