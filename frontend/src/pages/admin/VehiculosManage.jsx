// /src/pages/admin/VehiculosManage.jsx  

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useVehiculos, 
  useDeleteVehiculo,
  useCreateVehiculo 
} from '../../hooks/useVehiculos';
import { useMarcas } from '../../hooks/useMarcas';
import DataTable from '../../components/admin/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import PreviewModal from '../../components/admin/PreviewModal';
import toast from 'react-hot-toast';

const CATEGORIAS = [
  { value: '', label: 'Todas las categorías' },
  { value: 'sedan', label: 'Sedán' },
  { value: 'suv', label: 'SUV' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'coupe', label: 'Coupé' },
  { value: 'minivan', label: 'Minivan' },
  { value: 'deportivo', label: 'Deportivo' },
  { value: 'otro', label: 'Otro' }
];

const VehiculosManage = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    marcaId: '',
    categoria: '',
    disponible: '',
    destacado: '',
    ordenar: 'createdAt-desc'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [vehiculoToDelete, setVehiculoToDelete] = useState(null);
  const [vehiculoToPreview, setVehiculoToPreview] = useState(null);

  // Queries
  const { data: marcasData } = useMarcas({ activa: true });
  const { data: vehiculosData, isLoading } = useVehiculos(filtros);
  const deleteVehiculo = useDeleteVehiculo();
  const createVehiculo = useCreateVehiculo();

  const marcas = marcasData?.marcas || [];
  const vehiculos = vehiculosData?.vehiculos || [];

  // Filtrar por búsqueda local
  const vehiculosFiltrados = vehiculos.filter(v => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      v.modelo.toLowerCase().includes(search) ||
      v.version.toLowerCase().includes(search) ||
      v.marca?.nombre.toLowerCase().includes(search) ||
      v.año.toString().includes(search)
    );
  });

  // Handlers
  const handleCreate = () => {
    navigate('/admin/vehiculos/nuevo');
  };

  const handleEdit = (vehiculo) => {
    navigate(`/admin/vehiculos/editar/${vehiculo.id}`);
  };

  const handleDelete = (vehiculo) => {
    setVehiculoToDelete(vehiculo);
  };

  const confirmDelete = async () => {
    if (!vehiculoToDelete) return;
    
    try {
      await deleteVehiculo.mutateAsync(vehiculoToDelete.id);
      setVehiculoToDelete(null);
    } catch (error) {
      console.error('Error eliminando vehículo:', error);
    }
  };

  const handleDuplicate = async (vehiculo) => {
    if (!window.confirm(`¿Duplicar el vehículo ${vehiculo.modelo} ${vehiculo.version}?`)) {
      return;
    }

    try {
      // Crear copia del vehículo sin id, imagenes, videos
      const vehiculoCopia = {
        marcaId: vehiculo.marcaId,
        modelo: vehiculo.modelo,
        version: `${vehiculo.version} (Copia)`,
        año: vehiculo.año,
        precio: vehiculo.precio,
        categoria: vehiculo.categoria,
        stock: 0,
        disponible: false,
        destacado: false,
        motor: vehiculo.motor,
        combustible: vehiculo.combustible,
        transmision: vehiculo.transmision,
        traccion: vehiculo.traccion,
        puertas: vehiculo.puertas,
        pasajeros: vehiculo.pasajeros,
        cilindrada: vehiculo.cilindrada || '',
        potencia: vehiculo.potencia || '',
        torque: vehiculo.torque || '',
        descripcionCorta: vehiculo.descripcionCorta,
        descripcionCompleta: vehiculo.descripcionCompleta,
        slug: `${vehiculo.slug}-copia-${Date.now()}`,
        metaTitle: vehiculo.metaTitle || '',
        metaDescription: vehiculo.metaDescription || ''
      };

      await createVehiculo.mutateAsync(vehiculoCopia);
      toast.success('Vehículo duplicado exitosamente. Recuerda agregar imágenes.');
    } catch (error) {
      console.error('Error duplicando vehículo:', error);
      toast.error('Error al duplicar vehículo');
    }
  };

  const handlePreview = (vehiculo) => {
    setVehiculoToPreview(vehiculo);
  };

  const handleFiltroChange = (key, value) => {
    setFiltros(prev => ({ ...prev, [key]: value }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      marcaId: '',
      categoria: '',
      disponible: '',
      destacado: '',
      ordenar: 'createdAt-desc'
    });
    setSearchTerm('');
  };

  // Configuración de columnas
  const columns = [
    {
      key: 'imagen',
      label: 'Imagen',
      width: '80px',
      render: (row) => (
        <div className="adm-vehiculo-table-image">
          {row.imagenes && row.imagenes.length > 0 ? (
            <img 
              src={row.imagenes.find(img => img.esPrincipal)?.url || row.imagenes[0].url}
              alt={row.modelo}
            />
          ) : (
            <div className="adm-vehiculo-table-image-placeholder">
              <i className="fa-solid fa-car text-gray-400"></i>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'vehiculo',
      label: 'Vehículo',
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">
            {row.marca?.nombre} {row.modelo}
          </p>
          <p className="text-sm text-gray-600">
            {row.version} ({row.año})
          </p>
        </div>
      )
    },
    {
      key: 'categoria',
      label: 'Categoría',
      sortable: true,
      width: '120px',
      render: (row) => (
        <span className="adm-badge adm-badge-gray capitalize">
          {row.categoria}
        </span>
      )
    },
    {
      key: 'precio',
      label: 'Precio',
      sortable: true,
      width: '150px',
      render: (row) => (
        <span className="font-semibold text-gray-900">
          ${parseFloat(row.precio).toLocaleString('es-AR')}
        </span>
      )
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      width: '80px',
      render: (row) => (
        <span className={`font-medium ${row.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {row.stock}
        </span>
      )
    },
    {
      key: 'estado',
      label: 'Estado',
      width: '150px',
      render: (row) => (
        <div className="flex flex-col gap-1">
          <span className={`adm-badge ${row.disponible ? 'adm-badge-success' : 'adm-badge-danger'}`}>
            {row.disponible ? 'Disponible' : 'No disponible'}
          </span>
          {row.destacado && (
            <span className="adm-badge" style={{ backgroundColor: '#FCD34D', color: '#78350F' }}>
              <i className="fa-solid fa-star mr-1"></i>
              Destacado
            </span>
          )}
        </div>
      )
    }
  ];

  const hayFiltrosActivos = 
    filtros.marcaId || 
    filtros.categoria || 
    filtros.disponible || 
    filtros.destacado || 
    searchTerm;

  return (
    <div>
      {/* Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Gestión de Vehículos</h1>
          <p className="text-gray-600 mt-2">
            Total: {vehiculosFiltrados.length} vehículo{vehiculosFiltrados.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="adm-page-actions">
          <button 
            onClick={handleCreate}
            className="adm-btn adm-btn-primary"
          >
            <i className="fa-solid fa-plus"></i>
            Nuevo Vehículo
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="adm-filters mb-6">
        <div className="space-y-4">
          {/* Búsqueda */}
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por modelo, versión, marca o año..."
              className="adm-form-input"
            />
          </div>

          {/* Grid de filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Marca */}
            <div>
              <label className="adm-form-label">Marca</label>
              <select
                value={filtros.marcaId}
                onChange={(e) => handleFiltroChange('marcaId', e.target.value)}
                className="adm-form-input"
              >
                <option value="">Todas las marcas</option>
                {marcas.map(marca => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label className="adm-form-label">Categoría</label>
              <select
                value={filtros.categoria}
                onChange={(e) => handleFiltroChange('categoria', e.target.value)}
                className="adm-form-input"
              >
                {CATEGORIAS.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Disponible */}
            <div>
              <label className="adm-form-label">Disponibilidad</label>
              <select
                value={filtros.disponible}
                onChange={(e) => handleFiltroChange('disponible', e.target.value)}
                className="adm-form-input"
              >
                <option value="">Todos</option>
                <option value="true">Disponibles</option>
                <option value="false">No disponibles</option>
              </select>
            </div>

            {/* Destacado */}
            <div>
              <label className="adm-form-label">Destacados</label>
              <select
                value={filtros.destacado}
                onChange={(e) => handleFiltroChange('destacado', e.target.value)}
                className="adm-form-input"
              >
                <option value="">Todos</option>
                <option value="true">Destacados</option>
                <option value="false">No destacados</option>
              </select>
            </div>
          </div>

          {/* Ordenar y limpiar */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="adm-form-label">Ordenar por</label>
              <select
                value={filtros.ordenar}
                onChange={(e) => handleFiltroChange('ordenar', e.target.value)}
                className="adm-form-input"
              >
                <option value="createdAt-desc">Más recientes</option>
                <option value="createdAt-asc">Más antiguos</option>
                <option value="precio-asc">Menor precio</option>
                <option value="precio-desc">Mayor precio</option>
                <option value="año-desc">Año (más nuevo)</option>
                <option value="año-asc">Año (más viejo)</option>
                <option value="modelo-asc">Modelo (A-Z)</option>
              </select>
            </div>

            {hayFiltrosActivos && (
              <div className="flex items-end">
                <button
                  onClick={limpiarFiltros}
                  className="adm-btn adm-btn-secondary"
                >
                  <i className="fa-solid fa-filter-circle-xmark"></i>
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabla */}
      <DataTable
        data={vehiculosFiltrados}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onRowClick={handlePreview}
        isLoading={isLoading}
        emptyMessage="No hay vehículos creados"
      />

      {/* Botón flotante de preview */}
      {vehiculosFiltrados.length > 0 && (
        <div className="adm-preview-hint">
          <i className="fa-solid fa-lightbulb text-blue-500 mr-2"></i>
          Haz clic en cualquier fila para ver la vista previa del vehículo
        </div>
      )}

      {/* ConfirmDialog */}
      <ConfirmDialog
        isOpen={!!vehiculoToDelete}
        onClose={() => setVehiculoToDelete(null)}
        onConfirm={confirmDelete}
        title="¿Eliminar vehículo?"
        message={
          vehiculoToDelete
            ? `Esto eliminará permanentemente ${vehiculoToDelete.marca?.nombre} ${vehiculoToDelete.modelo} ${vehiculoToDelete.version} y todas sus imágenes y videos de Cloudinary.`
            : ''
        }
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        type="danger"
      />

      {/* PreviewModal */}
      <PreviewModal
        isOpen={!!vehiculoToPreview}
        onClose={() => setVehiculoToPreview(null)}
        vehiculo={vehiculoToPreview}
      />
    </div>
  );
};

export default VehiculosManage;