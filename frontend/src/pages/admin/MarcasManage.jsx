// /src/pages/admin/MarcasManage.jsx

import { useState } from 'react';
import { useMarcas, useDeleteMarca } from '../../hooks/useMarcas';
import Modal from '../../components/common/Modal';
import MarcaForm from '../../components/admin/MarcaForm';

const MarcasManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [filtroActiva, setFiltroActiva] = useState('');

  // Construir filtros
  const filtros = {};
  if (filtroActiva) filtros.activa = filtroActiva;

  const { data, isLoading } = useMarcas(filtros);
  const deleteMarca = useDeleteMarca();

  const marcas = data?.marcas || [];

  const handleCreate = () => {
    setSelectedMarca(null);
    setIsModalOpen(true);
  };

  const handleEdit = (marca) => {
    setSelectedMarca(marca);
    setIsModalOpen(true);
  };

  const handleDelete = async (marca) => {
    // Verificar si tiene vehículos (esta info debería venir del backend)
    const confirmMessage = marca.vehiculos && marca.vehiculos.length > 0
      ? `La marca "${marca.nombre}" tiene ${marca.vehiculos.length} vehículo(s) asociado(s). ¿Estás seguro de eliminarla?`
      : `¿Estás seguro de eliminar la marca "${marca.nombre}"?`;

    if (window.confirm(confirmMessage)) {
      try {
        await deleteMarca.mutateAsync(marca.id);
      } catch (error) {
        // El error ya se maneja en el hook con toast
        console.error('Error al eliminar:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMarca(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="adm-table-loading">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
        <p className="text-gray-600 mt-4">Cargando marcas...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Gestión de Marcas</h1>
          <p className="text-gray-600 mt-2">
            Total: {marcas.length} marca{marcas.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="adm-page-actions">
          <button 
            onClick={handleCreate}
            className="adm-btn adm-btn-primary"
          >
            <i className="fa-solid fa-plus"></i>
            Nueva Marca
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="adm-filters mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por estado */}
          <div>
            <label className="adm-form-label">Filtrar por estado</label>
            <select
              value={filtroActiva}
              onChange={(e) => setFiltroActiva(e.target.value)}
              className="adm-form-input"
            >
              <option value="">Todas las marcas</option>
              <option value="true">Activas</option>
              <option value="false">Inactivas</option>
            </select>
          </div>

          {/* Botón limpiar filtros */}
          {filtroActiva && (
            <div className="flex items-end">
              <button
                onClick={() => setFiltroActiva('')}
                className="adm-btn adm-btn-secondary w-full"
              >
                <i className="fa-solid fa-filter-circle-xmark"></i>
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid de Marcas */}
      {marcas.length === 0 ? (
        <div className="adm-table-empty">
          <i className="fa-solid fa-inbox text-6xl text-gray-300"></i>
          <p className="text-gray-600 mt-4">No hay marcas creadas</p>
        </div>
      ) : (
        <div className="adm-marcas-grid">
          {marcas.map((marca) => (
            <div key={marca.id} className="adm-marca-card">
              {/* Header con logo y estado */}
              <div className="adm-marca-card-header">
                {marca.logo ? (
                  <img 
                    src={marca.logo} 
                    alt={marca.nombre}
                    className="adm-marca-logo"
                  />
                ) : (
                  <div className="adm-marca-logo-placeholder">
                    <i className="fa-solid fa-image text-3xl text-gray-400"></i>
                  </div>
                )}
                
                <span className={`adm-badge ${marca.activa ? 'adm-badge-success' : 'adm-badge-danger'}`}>
                  {marca.activa ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              {/* Información */}
              <div className="adm-marca-card-body">
                <h3 className="adm-marca-card-title">{marca.nombre}</h3>
                <p className="adm-marca-card-slug">/{marca.slug}</p>
                
                {marca.descripcion && (
                  <p className="adm-marca-card-description">
                    {marca.descripcion}
                  </p>
                )}

                {/* Colores */}
                <div className="adm-marca-colors">
                  <div className="adm-marca-color-item">
                    <span 
                      className="adm-marca-color-swatch"
                      style={{ backgroundColor: marca.colorPrimario }}
                    ></span>
                    <span className="text-xs text-gray-600">{marca.colorPrimario}</span>
                  </div>
                  <div className="adm-marca-color-item">
                    <span 
                      className="adm-marca-color-swatch"
                      style={{ backgroundColor: marca.colorSecundario }}
                    ></span>
                    <span className="text-xs text-gray-600">{marca.colorSecundario}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="adm-marca-stats">
                  <div className="adm-marca-stat">
                    <i className="fa-solid fa-car text-gray-400"></i>
                    <span>{marca.vehiculos?.length || 0} vehículos</span>
                  </div>
                  <div className="adm-marca-stat">
                    <i className="fa-solid fa-arrow-up-1-9 text-gray-400"></i>
                    <span>Orden: {marca.orden}</span>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="adm-marca-card-footer">
                <button
                  onClick={() => handleEdit(marca)}
                  className="adm-btn adm-btn-secondary flex-1"
                >
                  <i className="fa-solid fa-pen"></i>
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(marca)}
                  className="adm-btn adm-btn-danger flex-1"
                >
                  <i className="fa-solid fa-trash"></i>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedMarca ? 'Editar Marca' : 'Nueva Marca'}
        size="lg"
      >
        <MarcaForm
          marca={selectedMarca}
          onSuccess={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default MarcasManage;