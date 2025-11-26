// /src/pages/admin/Dashboard.jsx

import { Link } from 'react-router-dom';
import { useMarcas } from '../../hooks/useMarcas';
import { useVehiculos } from '../../hooks/useVehiculos';
import { useCaracteristicas } from '../../hooks/useCaracteristicas';

const Dashboard = () => {
  const { data: marcasData, isLoading: marcasLoading } = useMarcas();
  const { data: vehiculosData, isLoading: vehiculosLoading } = useVehiculos();
  const { data: caracteristicasData, isLoading: caracteristicasLoading } = useCaracteristicas();

  const marcas = marcasData?.marcas || [];
  const vehiculos = vehiculosData?.vehiculos || [];
  const caracteristicas = caracteristicasData?.caracteristicas || [];

  const stats = [
    {
      title: 'Marcas',
      value: marcas.length,
      icon: 'fa-tag',
      color: 'bg-blue-500',
      description: `${marcas.filter(m => m.activa).length} activas`
    },
    {
      title: 'Vehículos',
      value: vehiculos.length,
      icon: 'fa-car',
      color: 'bg-green-500',
      description: `${vehiculos.filter(v => v.disponible).length} disponibles`
    },
    {
      title: 'Características',
      value: caracteristicas.length,
      icon: 'fa-list-check',
      color: 'bg-purple-500',
      description: `${caracteristicas.filter(c => c.activa).length} activas`
    }
  ];

  const quickActions = [
    {
      title: 'Nuevo Vehículo',
      description: 'Agregar un nuevo vehículo al catálogo',
      icon: 'fa-plus-circle',
      color: 'bg-blue-500',
      link: '/admin/vehiculos/nuevo'
    },
    {
      title: 'Gestionar Marcas',
      description: 'Ver, editar o agregar marcas',
      icon: 'fa-tag',
      color: 'bg-green-500',
      link: '/admin/marcas'
    },
    {
      title: 'Gestionar Vehículos',
      description: 'Ver y administrar todos los vehículos',
      icon: 'fa-car',
      color: 'bg-purple-500',
      link: '/admin/vehiculos'
    },
    {
      title: 'Gestionar Características',
      description: 'Ver, editar o agregar características',
      icon: 'fa-list-check',
      color: 'bg-orange-500',
      link: '/admin/caracteristicas'
    }
  ];

  const isLoading = marcasLoading || vehiculosLoading || caracteristicasLoading;

  if (isLoading) {
    return (
      <div className="adm-table-loading">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
        <p className="text-gray-600 mt-4">Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Resumen general del sistema
          </p>
        </div>
      </div>

      {/* Stats Cards - SOLO INFORMACIÓN (no clickeables) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="adm-stat-card-static"
          >
            <div className="adm-stat-icon-wrapper">
              <div className={`adm-stat-icon ${stat.color}`}>
                <i className={`fa-solid ${stat.icon} text-2xl`}></i>
              </div>
            </div>
            <div className="adm-stat-content">
              <p className="adm-stat-label">{stat.title}</p>
              <p className="adm-stat-value">{stat.value}</p>
              <p className="adm-stat-description">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions - ACCIONES ESPECÍFICAS */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        {/* Quick Actions - DESPUÉS */}
        <div className="adm-quick-actions-grid">
            {quickActions.map((action) => (
                <Link
                key={action.title}
                to={action.link}
                className="adm-quick-action-card"
                >
                <div className={`adm-quick-action-icon ${action.color}`}>
                    <i className={`fa-solid ${action.icon} text-3xl text-white`}></i>
                </div>
                <div className="adm-quick-action-content">
                    <h3 className="adm-quick-action-title">{action.title}</h3>
                    <p className="adm-quick-action-description">{action.description}</p>
                </div>
                <div className="adm-quick-action-arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
                </Link>
            ))}
        </div>
      </div>

      {/* Últimos Vehículos Agregados */}
      {vehiculos.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Últimos Vehículos Agregados
            </h2>
            <Link to="/admin/vehiculos" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiculos.slice(0, 3).map((vehiculo) => (
              <div key={vehiculo.id} className="adm-dashboard-vehiculo-card">
                {vehiculo.imagenes && vehiculo.imagenes.length > 0 ? (
                  <img
                    src={vehiculo.imagenes.find(img => img.esPrincipal)?.url || vehiculo.imagenes[0].url}
                    alt={vehiculo.modelo}
                    className="adm-dashboard-vehiculo-img"
                  />
                ) : (
                  <div className="adm-dashboard-vehiculo-placeholder">
                    <i className="fa-solid fa-car text-4xl text-gray-400"></i>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">
                    {vehiculo.marca?.nombre} {vehiculo.modelo}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {vehiculo.version} - {vehiculo.año}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-gray-900">
                      ${parseFloat(vehiculo.precio).toLocaleString('es-AR')}
                    </span>
                    <Link
                      to={`/admin/vehiculos/editar/${vehiculo.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Editar →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumen Rápido */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vehículos por marca */}
        <div className="adm-summary-card">
          <h3 className="adm-summary-title">
            <i className="fa-solid fa-tag mr-2"></i>
            Vehículos por Marca
          </h3>
          <div className="space-y-3">
            {marcas.map((marca) => {
              const vehiculosMarca = vehiculos.filter(v => v.marcaId === marca.id);
              return (
                <div key={marca.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {marca.urlLogo && (
                      <img 
                        src={marca.urlLogo} 
                        alt={marca.nombre}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    <span className="font-medium text-gray-900">{marca.nombre}</span>
                  </div>
                  <span className="adm-badge adm-badge-gray">
                    {vehiculosMarca.length} vehículo{vehiculosMarca.length !== 1 ? 's' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estado de vehículos */}
        <div className="adm-summary-card">
          <h3 className="adm-summary-title">
            <i className="fa-solid fa-chart-simple mr-2"></i>
            Estado de Vehículos
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Disponibles</span>
              <span className="adm-badge adm-badge-success">
                {vehiculos.filter(v => v.disponible).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">No disponibles</span>
              <span className="adm-badge adm-badge-danger">
                {vehiculos.filter(v => !v.disponible).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Destacados</span>
              <span className="adm-badge" style={{ backgroundColor: '#FCD34D', color: '#78350F' }}>
                {vehiculos.filter(v => v.destacado).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Sin stock</span>
              <span className="adm-badge adm-badge-gray">
                {vehiculos.filter(v => v.stock === 0).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;