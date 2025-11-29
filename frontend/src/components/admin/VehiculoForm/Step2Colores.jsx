// /src/components/admin/VehiculoForm/Step2Colores.jsx

import { useState } from 'react';
import { useColores } from '../../../hooks/useColores';

const Step2Colores = ({ 
  data, 
  onNext, 
  onBack, 
  existingColores = [],
  isSubmitting = false,
  showBack = true  // false en creación para ocultar botón Anterior
}) => {
  const { data: coloresData, isLoading } = useColores({ activo: true });
  const colores = coloresData?.colores || [];
  
  const [selectedColorIds, setSelectedColorIds] = useState(
    data?.colorIds || existingColores.map(c => c.colorId) || []
  );

  const handleToggleColor = (colorId) => {
    setSelectedColorIds(prev => {
      if (prev.includes(colorId)) {
        return prev.filter(id => id !== colorId);
      }
      return [...prev, colorId];
    });
  };

  const handleSelectAll = () => {
    if (selectedColorIds.length === colores.length) {
      setSelectedColorIds([]);
    } else {
      setSelectedColorIds(colores.map(c => c.id));
    }
  };

  const handleNext = () => {
    onNext({ colorIds: selectedColorIds });
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
        <h3 className="text-lg font-semibold text-gray-900">Colores Disponibles</h3>
        <p className="text-sm text-gray-500 mt-1">
          Selecciona los colores en los que este vehículo está disponible ({selectedColorIds.length} seleccionados)
        </p>
      </div>

      <div className="p-6">
        {colores.length === 0 ? (
          <div className="text-center py-12">
            <i className="fa-solid fa-palette text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No hay colores creados en el sistema</p>
            <p className="text-sm text-gray-400 mt-2">
              Ve a Gestión de Colores para crear colores primero
            </p>
          </div>
        ) : (
          <>
            {/* Select All Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <i className={`fa-solid ${selectedColorIds.length === colores.length ? 'fa-square-minus' : 'fa-square-check'}`}></i>
                {selectedColorIds.length === colores.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
              </button>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {colores.map(color => {
                const isSelected = selectedColorIds.includes(color.id);
                
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => handleToggleColor(color.id)}
                    className={`
                      relative p-4 rounded-lg border-2 transition-all duration-200
                      ${isSelected 
                        ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900 ring-offset-2' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    {/* Color Swatch */}
                    <div 
                      className="w-full aspect-square rounded-lg mb-3 border border-gray-200 shadow-inner"
                      style={{ backgroundColor: color.codigoHex }}
                    />
                    
                    {/* Color Name */}
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {color.nombre}
                    </p>
                    <p className="text-xs text-gray-500 font-mono">
                      {color.codigoHex}
                    </p>

                    {/* Check Icon */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-check text-white text-xs"></i>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
              <i className="fa-solid fa-info-circle text-blue-500 mt-0.5"></i>
              <div>
                <p className="text-sm font-medium text-blue-900">
                  ¿Por qué seleccionar colores?
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  En el siguiente paso podrás subir imágenes específicas para cada color. 
                  Los usuarios podrán ver el vehículo en el color que les interese.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className={`px-6 py-4 border-t border-gray-200 flex ${showBack ? 'justify-between' : 'justify-end'}`}>
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Anterior
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> : null}
          Siguiente: Imágenes
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Step2Colores;