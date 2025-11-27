// /src/pages/admin/CaracteristicasManage.jsx

import { useState } from 'react';
import { 
  useCaracteristicas, 
  useDeleteCaracteristica 
} from '../../hooks/useCaracteristicas';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import CaracteristicaForm from '../../components/admin/CaracteristicaForm';

const TIPO_LABELS = {
  seguridad: 'Seguridad',
  confort: 'Confort',
  tecnologia: 'Tecnología',
  exterior: 'Exterior',
  interior: 'Interior',
  performance: 'Performance'
};

const CaracteristicasManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroActiva, setFiltroActiva] = useState('');

  // Construir filtros
  const filtros = {};
  if (filtroTipo) filtros.tipo = filtroTipo;
  if (filtroActiva) filtros.activa = filtroActiva;

  const { data, isLoading } = useCaracteristicas(filtros);
  const deleteCaracteristica = useDeleteCaracteristica();

  const caracteristicas = data?.caracteristicas || [];

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (caracteristica) => {
    if (window.confirm(`¿Estás seguro de eliminar la característica "${caracteristica.nombre}"?`)) {
      await deleteCaracteristica.mutateAsync(caracteristica.id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Configuración de columnas
  const columns = [
    {
      key: 'icono',
      label: 'Icono',
      width: '80px',
      render: (row) => (
        <div className="flex items-center justify-center">
          <i className={`fa-solid ${row.icono} text-2xl text-gray-700`}></i>
        </div>
      )
    },
    {
      key: 'nombre',
      label: 'Nombre',
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.nombre}</p>
          <p className="text-sm text-gray-500">{row.icono}</p>
        </div>
      )
    },
    {
      key: 'tipo',
      label: 'Tipo',
      sortable: true,
      width: '150px',
      render: (row) => (
        <span className="adm-badge adm-badge-gray">
          {TIPO_LABELS[row.tipo]}
        </span>
      )
    },
    {
      key: 'activa',
      label: 'Estado',
      sortable: true,
      width: '120px',
      render: (row) => (
        <span className={`adm-badge ${row.activa ? 'adm-badge-success' : 'adm-badge-danger'}`}>
          {row.activa ? 'Activa' : 'Inactiva'}
        </span>
      )
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Gestión de Características</h1>
          <p className="text-gray-600 mt-2">
            Total: {caracteristicas.length} característica{caracteristicas.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="adm-page-actions">
          <button 
            onClick={handleCreate}
            className="adm-btn adm-btn-primary"
          >
            <i className="fa-solid fa-plus"></i>
            Nueva Característica
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="adm-filters mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por tipo */}
          <div>
            <label className="adm-form-label">Filtrar por tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="adm-form-input"
            >
              <option value="">Todos los tipos</option>
              {Object.entries(TIPO_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
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
              <option value="">Todas</option>
              <option value="true">Activas</option>
              <option value="false">Inactivas</option>
            </select>
          </div>

          {/* Botón limpiar filtros */}
          {(filtroTipo || filtroActiva) && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFiltroTipo('');
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

      {/* Tabla - sin onEdit */}
      <DataTable
        data={caracteristicas}
        columns={columns}
        onDelete={handleDelete}
        isLoading={isLoading}
        emptyMessage="No hay características creadas"
      />

      {/* Modal - siempre para crear */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nueva Característica"
        size="md"
      >
        <CaracteristicaForm
          onSuccess={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default CaracteristicasManage;