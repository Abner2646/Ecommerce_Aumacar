// /src/components/admin/VehiculoForm/Step5Final.jsx

import { useState } from 'react';
import { useCaracteristicas } from '../../../hooks/useCaracteristicas';

const TIPO_LABELS = {
  seguridad: 'Seguridad',
  confort: 'Confort',
  tecnologia: 'Tecnología',
  exterior: 'Exterior',
  interior: 'Interior',
  performance: 'Performance'
};

const PLANTILLAS = [
  { value: 1, label: 'Plantilla 1', description: 'Layout estándar' },
  { value: 2, label: 'Plantilla 2', description: 'Layout premium' },
  { value: 3, label: 'Plantilla 3', description: 'Layout compacto' },
  { value: 4, label: 'Plantilla 4', description: 'Layout especial' }
];

const Step5Final = ({ 
  data, 
  onSubmit, 
  onBack, 
  existingCaracteristicas = [],
  currentPlantilla = 1,
  isSubmitting = false 
}) => {
  const { data: caracteristicasData, isLoading } = useCaracteristicas({ activa: true });
  const caracteristicas = caracteristicasData?.caracteristicas || [];
  
  const [selectedIds, setSelectedIds] = useState(
    data?.caracteristicasIds || existingCaracteristicas.map(c => c.id) || []
  );
  const [plantilla, setPlantilla] = useState(data?.plantilla || currentPlantilla);
  const [filtroTipo, setFiltroTipo] = useState('');

  // Agrupar características por tipo
  const caracteristicasPorTipo = caracteristicas.reduce((acc, car) => {
    if (!acc[car.tipo]) acc[car.tipo] = [];
    acc[car.tipo].push(car);
    return acc;
  }, {});

  const handleToggle = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      }
      return [...prev, id];
    });
  };

  const handleSelectAllTipo = (tipo) => {
    const tipoIds = caracteristicasPorTipo[tipo]?.map(c => c.id) || [];
    const allSelected = tipoIds.every(id => selectedIds.includes(id));
    
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !tipoIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...tipoIds])]);
    }
  };

  const handleSubmit = () => {
    onSubmit({ 
      caracteristicasIds: selectedIds,
      plantilla 
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 flex items-center justify-center">
        <i className="fa-solid fa-spinner fa-spin text-2xl text-gray-400"></i>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Características y Plantilla</h3>
        <p className="text-sm text-gray-500 mt-1">
          Paso final: selecciona características ({selectedIds.length}) y elige la plantilla de visualización
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Plantilla Selection */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            <i className="fa-solid fa-palette mr-2"></i>
            Plantilla de Visualización
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLANTILLAS.map(p => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPlantilla(p.value)}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all
                  ${plantilla === p.value 
                    ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900 ring-offset-2' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="w-full aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">{p.value}</span>
                </div>
                <p className="font-medium text-gray-900">{p.label}</p>
                <p className="text-xs text-gray-500">{p.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-sm text-gray-500">Características</span>
          </div>
        </div>

        {/* Filtro por tipo */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFiltroTipo('')}
            className={`px-3 py-1.5 rounded-full text-sm ${!filtroTipo ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Todas
          </button>
          {Object.keys(caracteristicasPorTipo).map(tipo => (
            <button
              key={tipo}
              type="button"
              onClick={() => setFiltroTipo(tipo)}
              className={`px-3 py-1.5 rounded-full text-sm ${filtroTipo === tipo ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {TIPO_LABELS[tipo] || tipo}
            </button>
          ))}
        </div>

        {/* Características por tipo */}
        <div className="space-y-6">
          {Object.entries(caracteristicasPorTipo)
            .filter(([tipo]) => !filtroTipo || tipo === filtroTipo)
            .map(([tipo, cars]) => (
              <div key={tipo}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    {TIPO_LABELS[tipo] || tipo}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleSelectAllTipo(tipo)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    {cars.every(c => selectedIds.includes(c.id)) 
                      ? 'Deseleccionar todas' 
                      : 'Seleccionar todas'
                    }
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {cars.map(car => (
                    <label
                      key={car.id}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                        ${selectedIds.includes(car.id) 
                          ? 'bg-gray-100 border-2 border-gray-900' 
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(car.id)}
                        onChange={() => handleToggle(car.id)}
                        className="w-4 h-4 rounded"
                      />
                      {car.icono && (
                        <i className={`fa-solid ${car.icono} text-gray-500`}></i>
                      )}
                      <span className="text-sm text-gray-800">{car.nombre}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {caracteristicas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <i className="fa-solid fa-list text-3xl mb-2"></i>
            <p>No hay características disponibles</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Anterior
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Guardando...
            </>
          ) : (
            <>
              <i className="fa-solid fa-check"></i>
              Guardar Vehículo
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step5Final;