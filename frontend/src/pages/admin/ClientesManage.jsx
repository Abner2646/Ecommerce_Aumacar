// src/pages/admin/ClientesManage.jsx

import { useState } from 'react';
import { useFotosClientesRegion, useDeleteFotoClienteRegion } from '../../hooks/useFotosClientesRegion';
import Modal from '../../components/common/Modal';
import FotoClienteRegionForm from '../../components/admin/FotoClienteRegionForm';

const ClientesManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFoto, setSelectedFoto] = useState(null);
  const [filtroCiudad, setFiltroCiudad] = useState('');
  const [filtroActiva, setFiltroActiva] = useState('');

  const { data, isLoading } = useFotosClientesRegion();
  const deleteFoto = useDeleteFotoClienteRegion();

  const fotos = data?.fotos || [];

  // Filtrar fotos
  const fotosFiltradas = fotos.filter(foto => {
    const cumpleCiudad = !filtroCiudad || 
      foto.ciudad.toLowerCase().includes(filtroCiudad.toLowerCase());
    const cumpleActiva = filtroActiva === '' || 
      foto.activo.toString() === filtroActiva;
    return cumpleCiudad && cumpleActiva;
  });

  // Obtener ciudades únicas para el filtro
  const ciudadesUnicas = [...new Set(fotos.map(f => f.ciudad))].sort();

  const handleCreate = () => {
    setSelectedFoto(null);
    setIsModalOpen(true);
  };

  const handleEdit = (foto) => {
    setSelectedFoto(foto);
    setIsModalOpen(true);
  };

  const handleDelete = async (foto) => {
    const confirmMessage = `¿Estás seguro de eliminar la foto de "${foto.ciudad}"${foto.textoDescriptivo ? ` - ${foto.textoDescriptivo}` : ''}?`;

    if (window.confirm(confirmMessage)) {
      try {
        await deleteFoto.mutateAsync(foto.id);
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFoto(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="adm-table-loading">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
        <p className="text-gray-600 mt-4">Cargando fotos de clientes...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Gestión de Fotos de Clientes</h1>
          <p className="text-gray-600 mt-2">
            Total: {fotosFiltradas.length} foto{fotosFiltradas.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="adm-page-actions">
          <button 
            onClick={handleCreate}
            className="adm-btn adm-btn-primary"
          >
            <i className="fa-solid fa-plus"></i>
            Nueva Foto de Cliente
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="adm-filters mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por ciudad */}
          <div>
            <label className="adm-form-label">Filtrar por ciudad</label>
            <select
              value={filtroCiudad}
              onChange={(e) => setFiltroCiudad(e.target.value)}
              className="adm-form-input"
            >
              <option value="">Todas las ciudades</option>
              {ciudadesUnicas.map(ciudad => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>
          </div>

          {/* Filtro por estado */}
          <div>
            <label className="adm-form-label">Filtrar por estado</label>
            <select
              value={filtroActiva}
              onChange={(e) => setFiltroActiva(e.target.value)}
              className="adm-form-input"
            >
              <option value="">Todas las fotos</option>
              <option value="true">Activas</option>
              <option value="false">Inactivas</option>
            </select>
          </div>

          {/* Botón limpiar filtros */}
          {(filtroCiudad || filtroActiva) && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFiltroCiudad('');
                  setFiltroActiva('');
                }}
                className="adm-btn adm-btn-secondary w-full"
              >
                <i className="fa-solid fa-filter-circle-xmark"></i>
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid de Fotos */}
      {fotosFiltradas.length === 0 ? (
        <div className="adm-table-empty">
          <i className="fa-solid fa-inbox text-6xl text-gray-300"></i>
          <p className="text-gray-600 mt-4">
            {filtroCiudad || filtroActiva ? 'No hay fotos con estos filtros' : 'No hay fotos de clientes creadas'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fotosFiltradas.map((foto) => (
            <div key={foto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Imagen */}
              <div className="relative aspect-video">
                <img 
                  src={foto.urlImagen} 
                  alt={foto.titulo || foto.ciudad}
                  className="w-full h-full object-cover"
                />
                {foto.textoDescriptivo && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-medium">
                      {foto.textoDescriptivo}
                    </p>
                  </div>
                )}
                <span className={`absolute top-2 right-2 adm-badge ${foto.activo ? 'adm-badge-success' : 'adm-badge-danger'}`}>
                  {foto.activo ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              {/* Información */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {foto.ciudad}
                    </h3>
                    {foto.provincia && (
                      <p className="text-sm text-gray-600">
                        {foto.provincia}, {foto.pais}
                      </p>
                    )}
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Orden: {foto.orden}
                  </span>
                </div>

                {foto.titulo && (
                  <p className="text-sm text-gray-700 mb-2">
                    {foto.titulo}
                  </p>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  {foto.latitud && foto.longitud && (
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{foto.radioKm} km</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-calendar"></i>
                    <span>{new Date(foto.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(foto)}
                    className="adm-btn adm-btn-secondary flex-1 text-sm"
                  >
                    <i className="fa-solid fa-pen"></i>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(foto)}
                    className="adm-btn adm-btn-danger flex-1 text-sm"
                  >
                    <i className="fa-solid fa-trash"></i>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedFoto ? 'Editar Foto de Cliente' : 'Nueva Foto de Cliente'}
        size="lg"
      >
        <FotoClienteRegionForm
          foto={selectedFoto}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
};

export default ClientesManage;