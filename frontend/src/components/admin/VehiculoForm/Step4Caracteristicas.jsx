// /src/components/admin/VehiculoForm/Step4Caracteristicas.jsx 

import { useState, useEffect } from 'react';
import { useCaracteristicas } from '../../../hooks/useCaracteristicas';

const TIPO_LABELS = {
  seguridad: 'Seguridad',
  confort: 'Confort',
  tecnologia: 'Tecnología',
  exterior: 'Exterior',
  interior: 'Interior',
  performance: 'Performance'
};

const Step4Caracteristicas = ({ 
  data, 
  onSubmit, 
  onBack, 
  existingCaracteristicas = [],
  isSubmitting = false 
}) => {
  const { data: caracteristicasData, isLoading } = useCaracteristicas({ activa: true });
  const caracteristicas = caracteristicasData?.caracteristicas || [];
  
  const [selectedIds, setSelectedIds] = useState(
    data?.caracteristicasIds || existingCaracteristicas.map(c => c.id) || []
  );
  const [filtroTipo, setFiltroTipo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Agrupar características por tipo
  const caracteristicasPorTipo = caracteristicas.reduce((acc, car) => {
    if (!acc[car.tipo]) {
      acc[car.tipo] = [];
    }
    acc[car.tipo].push(car);
    return acc;
  }, {});

  // Filtrar características
  const caracteristicasFiltradas = caracteristicas.filter(car => {
    const matchTipo = !filtroTipo || car.tipo === filtroTipo;
    const matchSearch = !searchTerm || 
      car.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTipo && matchSearch;
  });

  const handleToggle = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    const allIds = caracteristicasFiltradas.map(c => c.id);
    setSelectedIds(prev => {
      const allSelected = allIds.every(id => prev.includes(id));
      if (allSelected) {
        return prev.filter(id => !allIds.includes(id));
      } else {
        return [...new Set([...prev, ...allIds])];
      }
    });
  };

  const handleSubmit = () => {
    onSubmit({ caracteristicasIds: selectedIds });
  };

  if (isLoading) {
    return <div className="adm-table-loading">Cargando características...</div>;
  }

  return (
    <div className="adm-step-form">
      <div className="adm-step-header">
        <h3 className="adm-step-title">Paso 4: Características del Vehículo</h3>
        <p className="adm-step-description">
          Selecciona las características que incluye este vehículo ({selectedIds.length} seleccionadas)
        </p>
      </div>

      <div className="adm-step-body">
        {/* Controles de filtrado */}
        <div className="adm-caracteristicas-controls">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar características..."
                className="adm-form-input"
              />
            </div>

            {/* Filtro por tipo */}
            <div>
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

            {/* Seleccionar todas (filtradas) */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSelectAll}
                className="adm-btn adm-btn-secondary w-full"
              >
                <i className="fa-solid fa-check-double"></i>
                {caracteristicasFiltradas.every(c => selectedIds.includes(c.id))
                  ? 'Deseleccionar todas'
                  : 'Seleccionar todas'}
              </button>
            </div>
          </div>
        </div>

        {/* Lista de características agrupadas por tipo */}
        {filtroTipo ? (
          // Vista filtrada
          <div className="adm-caracteristicas-list mt-6">
            {caracteristicasFiltradas.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <i className="fa-solid fa-search text-4xl mb-4"></i>
                <p>No se encontraron características</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {caracteristicasFiltradas.map(car => (
                  <label
                    key={car.id}
                    className={`adm-caracteristica-item ${
                      selectedIds.includes(car.id) ? 'adm-caracteristica-item-selected' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(car.id)}
                      onChange={() => handleToggle(car.id)}
                      className="adm-form-checkbox"
                    />
                    <i className={`fa-solid ${car.icono} text-xl`}></i>
                    <span className="font-medium">{car.nombre}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Vista agrupada por tipo
          <div className="adm-caracteristicas-groups mt-6">
            {Object.entries(caracteristicasPorTipo).map(([tipo, cars]) => {
              const carsFiltered = cars.filter(car =>
                !searchTerm || car.nombre.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (carsFiltered.length === 0) return null;

              return (
                <div key={tipo} className="adm-caracteristica-group">
                  <h4 className="adm-caracteristica-group-title">
                    {TIPO_LABELS[tipo]} ({carsFiltered.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {carsFiltered.map(car => (
                      <label
                        key={car.id}
                        className={`adm-caracteristica-item ${
                          selectedIds.includes(car.id) ? 'adm-caracteristica-item-selected' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(car.id)}
                          onChange={() => handleToggle(car.id)}
                          className="adm-form-checkbox"
                        />
                        <i className={`fa-solid ${car.icono} text-xl`}></i>
                        <span className="font-medium">{car.nombre}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Resumen de selección */}
        {selectedIds.length > 0 && (
          <div className="adm-caracteristicas-summary">
            <i className="fa-solid fa-info-circle text-blue-500"></i>
            <span>
              Has seleccionado <strong>{selectedIds.length}</strong> característica{selectedIds.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      <div className="adm-step-footer">
        <button
          type="button"
          onClick={onBack}
          className="adm-btn adm-btn-secondary"
          disabled={isSubmitting}
        >
          <i className="fa-solid fa-arrow-left"></i>
          Anterior
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="adm-btn adm-btn-primary"
        >
          {isSubmitting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Guardando vehículo...
            </>
          ) : (
            <>
              <i className="fa-solid fa-check"></i>
              Finalizar y Guardar
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step4Caracteristicas;