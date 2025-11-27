// /src/components/admin/VehiculoForm/Step3Images.jsx

import { useState, useRef } from 'react';

const Step3Images = ({ 
  data, 
  onNext, 
  onBack, 
  selectedColores = [], // Array de { colorVehiculoId, colorId, nombre, codigoHex }
  existingImages = [],
  onDeleteExisting,
  isSubmitting = false 
}) => {
  const [images, setImages] = useState(data?.images || []);
  const [activeColorId, setActiveColorId] = useState(null); // null = genéricas
  const fileInputRef = useRef(null);

  // Agrupar imágenes existentes por color
  const existingByColor = existingImages.reduce((acc, img) => {
    const key = img.colorVehiculoId || 'generic';
    if (!acc[key]) acc[key] = [];
    acc[key].push(img);
    return acc;
  }, {});

  // Agrupar nuevas imágenes por color
  const newByColor = images.reduce((acc, img) => {
    const key = img.colorVehiculoId || 'generic';
    if (!acc[key]) acc[key] = [];
    acc[key].push(img);
    return acc;
  }, {});

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file, idx) => ({
      id: `new-${Date.now()}-${idx}`,
      file,
      preview: URL.createObjectURL(file),
      colorVehiculoId: activeColorId,
      esPrincipal: images.length === 0 && existingImages.length === 0 && idx === 0
    }));

    setImages(prev => [...prev, ...newImages]);
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveNew = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSetPrincipal = (imageId) => {
    setImages(prev => prev.map(img => ({
      ...img,
      esPrincipal: img.id === imageId
    })));
  };

  const handleNext = () => {
    if (images.length === 0 && existingImages.length === 0) {
      if (!window.confirm('No has agregado imágenes. ¿Deseas continuar?')) {
        return;
      }
    }
    onNext({ images });
  };

  const getColorName = (colorVehiculoId) => {
    if (!colorVehiculoId) return 'Imágenes Genéricas';
    const color = selectedColores.find(c => c.colorVehiculoId === colorVehiculoId);
    return color?.nombre || 'Sin color';
  };

  const getColorHex = (colorVehiculoId) => {
    if (!colorVehiculoId) return null;
    const color = selectedColores.find(c => c.colorVehiculoId === colorVehiculoId);
    return color?.codigoHex;
  };

  const totalImages = images.length + existingImages.length;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Imágenes del Vehículo</h3>
        <p className="text-sm text-gray-500 mt-1">
          Sube imágenes genéricas o específicas por color ({totalImages} total)
        </p>
      </div>

      <div className="p-6">
        {/* Color Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveColorId(null)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeColorId === null 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <i className="fa-solid fa-images mr-2"></i>
            Genéricas
            {(existingByColor['generic']?.length || 0) + (newByColor['generic']?.length || 0) > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {(existingByColor['generic']?.length || 0) + (newByColor['generic']?.length || 0)}
              </span>
            )}
          </button>

          {selectedColores.map(color => {
            const count = (existingByColor[color.colorVehiculoId]?.length || 0) + 
                          (newByColor[color.colorVehiculoId]?.length || 0);
            return (
              <button
                key={color.colorVehiculoId}
                type="button"
                onClick={() => setActiveColorId(color.colorVehiculoId)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                  ${activeColorId === color.colorVehiculoId 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <span 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.codigoHex }}
                />
                {color.nombre}
                {count > 0 && (
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Upload Zone */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-3"></i>
          <p className="text-gray-700 font-medium">
            Haz clic o arrastra imágenes aquí
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {activeColorId 
              ? `Para: ${getColorName(activeColorId)}`
              : 'Imágenes genéricas (interior, motor, detalles)'
            }
          </p>
          <p className="text-xs text-gray-400 mt-2">
            JPG, PNG, WEBP. Máx 5MB por imagen.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Current Color Images */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            {getColorHex(activeColorId) && (
              <span 
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: getColorHex(activeColorId) }}
              />
            )}
            {getColorName(activeColorId)}
          </h4>

          {/* Existing Images */}
          {existingByColor[activeColorId || 'generic']?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Imágenes guardadas:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {existingByColor[activeColorId || 'generic'].map(img => (
                  <div key={img.id} className="relative group aspect-square">
                    <img 
                      src={img.url} 
                      alt="" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {img.esPrincipal && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-medium rounded">
                        Principal
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onDeleteExisting?.(img.id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images */}
          {newByColor[activeColorId || 'generic']?.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Nuevas imágenes:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {newByColor[activeColorId || 'generic'].map(img => (
                  <div key={img.id} className="relative group aspect-square">
                    <img 
                      src={img.preview} 
                      alt="" 
                      className="w-full h-full object-cover rounded-lg border-2 border-blue-400"
                    />
                    {img.esPrincipal && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-medium rounded">
                        Principal
                      </span>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!img.esPrincipal && (
                        <button
                          type="button"
                          onClick={() => handleSetPrincipal(img.id)}
                          className="w-7 h-7 bg-yellow-500 text-white rounded-full flex items-center justify-center"
                          title="Marcar como principal"
                        >
                          <i className="fa-solid fa-star text-xs"></i>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveNew(img.id)}
                        className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <i className="fa-solid fa-xmark text-xs"></i>
                      </button>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                      Nuevo
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!existingByColor[activeColorId || 'generic']?.length && 
           !newByColor[activeColorId || 'generic']?.length && (
            <div className="text-center py-8 text-gray-500">
              <i className="fa-regular fa-image text-3xl mb-2"></i>
              <p>No hay imágenes para {getColorName(activeColorId)}</p>
            </div>
          )}
        </div>

        {/* Info */}
        {selectedColores.length === 0 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
            <i className="fa-solid fa-lightbulb text-yellow-500 mt-0.5"></i>
            <div>
              <p className="text-sm font-medium text-yellow-900">
                No seleccionaste colores
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Todas las imágenes serán genéricas y se mostrarán sin opción de cambiar color.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Anterior
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> : null}
          Siguiente: Videos
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Step3Images;