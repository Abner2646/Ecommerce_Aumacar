// /src/components/admin/PreviewModal.jsx 

import { useState } from 'react';

const PreviewModal = ({ isOpen, onClose, vehiculo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !vehiculo) return null;

  const imagenes = vehiculo.imagenes || [];
  const videos = vehiculo.videos || [];
  const caracteristicas = vehiculo.caracteristicas || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagenes.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  // Agrupar características por tipo
  const caracteristicasPorTipo = caracteristicas.reduce((acc, car) => {
    if (!acc[car.tipo]) {
      acc[car.tipo] = [];
    }
    acc[car.tipo].push(car);
    return acc;
  }, {});

  const TIPO_LABELS = {
    seguridad: 'Seguridad',
    confort: 'Confort',
    tecnologia: 'Tecnología',
    exterior: 'Exterior',
    interior: 'Interior',
    performance: 'Performance'
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div 
        className="adm-preview-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="adm-preview-header">
          <div>
            <h2 className="adm-preview-title">
              {vehiculo.marca?.nombre} {vehiculo.modelo} {vehiculo.version}
            </h2>
            <p className="text-gray-600">
              Vista previa - Año {vehiculo.año}
            </p>
          </div>
          <button
            onClick={onClose}
            className="adm-modal-close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Body */}
        <div className="adm-preview-body">
          {/* Galería de Imágenes */}
          {imagenes.length > 0 ? (
            <div className="adm-preview-gallery">
              <div className="adm-preview-main-image">
                <img 
                  src={imagenes[currentImageIndex].url} 
                  alt={`${vehiculo.modelo} - Imagen ${currentImageIndex + 1}`}
                />
                
                {imagenes.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="adm-preview-nav-btn adm-preview-nav-prev"
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button
                      onClick={nextImage}
                      className="adm-preview-nav-btn adm-preview-nav-next"
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </>
                )}

                <div className="adm-preview-image-counter">
                  {currentImageIndex + 1} / {imagenes.length}
                </div>
              </div>

              {/* Thumbnails */}
              {imagenes.length > 1 && (
                <div className="adm-preview-thumbnails">
                  {imagenes.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`adm-preview-thumbnail ${
                        index === currentImageIndex ? 'adm-preview-thumbnail-active' : ''
                      }`}
                    >
                      <img src={img.url} alt={`Thumbnail ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="adm-preview-no-image">
              <i className="fa-solid fa-image text-6xl text-gray-300"></i>
              <p className="text-gray-500 mt-4">Sin imágenes</p>
            </div>
          )}

          {/* Información */}
          <div className="adm-preview-info">
            {/* Precio y Stock */}
            <div className="adm-preview-price-section">
              <div>
                <p className="text-gray-600 text-sm">Precio</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${parseFloat(vehiculo.precio).toLocaleString('es-AR')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Stock</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {vehiculo.stock} unidades
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <span className={`adm-badge ${vehiculo.disponible ? 'adm-badge-success' : 'adm-badge-danger'}`}>
                {vehiculo.disponible ? 'Disponible' : 'No Disponible'}
              </span>
              {vehiculo.destacado && (
                <span className="adm-badge" style={{ backgroundColor: '#FCD34D', color: '#78350F' }}>
                  <i className="fa-solid fa-star mr-1"></i>
                  Destacado
                </span>
              )}
              <span className="adm-badge adm-badge-gray">
                {vehiculo.categoria}
              </span>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {vehiculo.descripcionCompleta || vehiculo.descripcionCorta}
              </p>
            </div>

            {/* Especificaciones */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Especificaciones</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="adm-preview-spec">
                  <i className="fa-solid fa-engine text-gray-400"></i>
                  <div>
                    <p className="text-xs text-gray-500">Motor</p>
                    <p className="text-sm font-medium">{vehiculo.motor}</p>
                  </div>
                </div>
                <div className="adm-preview-spec">
                  <i className="fa-solid fa-gas-pump text-gray-400"></i>
                  <div>
                    <p className="text-xs text-gray-500">Combustible</p>
                    <p className="text-sm font-medium">{vehiculo.combustible}</p>
                  </div>
                </div>
                <div className="adm-preview-spec">
                  <i className="fa-solid fa-gears text-gray-400"></i>
                  <div>
                    <p className="text-xs text-gray-500">Transmisión</p>
                    <p className="text-sm font-medium">{vehiculo.transmision}</p>
                  </div>
                </div>
                <div className="adm-preview-spec">
                  <i className="fa-solid fa-road text-gray-400"></i>
                  <div>
                    <p className="text-xs text-gray-500">Tracción</p>
                    <p className="text-sm font-medium">{vehiculo.traccion}</p>
                  </div>
                </div>
                <div className="adm-preview-spec">
                  <i className="fa-solid fa-door-closed text-gray-400"></i>
                  <div>
                    <p className="text-xs text-gray-500">Puertas</p>
                    <p className="text-sm font-medium">{vehiculo.puertas}</p>
                  </div>
                </div>
                <div className="adm-preview-spec">
                  <i className="fa-solid fa-users text-gray-400"></i>
                  <div>
                    <p className="text-xs text-gray-500">Pasajeros</p>
                    <p className="text-sm font-medium">{vehiculo.pasajeros}</p>
                  </div>
                </div>
              </div>

              {/* Specs adicionales */}
              {(vehiculo.cilindrada || vehiculo.potencia || vehiculo.torque) && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {vehiculo.cilindrada && (
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Cilindrada</p>
                      <p className="text-sm font-medium">{vehiculo.cilindrada}</p>
                    </div>
                  )}
                  {vehiculo.potencia && (
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Potencia</p>
                      <p className="text-sm font-medium">{vehiculo.potencia}</p>
                    </div>
                  )}
                  {vehiculo.torque && (
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-500">Torque</p>
                      <p className="text-sm font-medium">{vehiculo.torque}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Características */}
            {caracteristicas.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Características</h3>
                <div className="space-y-4">
                  {Object.entries(caracteristicasPorTipo).map(([tipo, cars]) => (
                    <div key={tipo}>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        {TIPO_LABELS[tipo]}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {cars.map(car => (
                          <div key={car.id} className="flex items-center gap-2 text-sm">
                            <i className={`fa-solid ${car.icono} text-gray-400 text-xs`}></i>
                            <span className="text-gray-700">{car.nombre}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Videos</h3>
                <div className="space-y-3">
                  {videos.map(video => (
                    <div key={video.id} className="border rounded-lg overflow-hidden">
                      <video 
                        src={video.urlVideo}
                        poster={video.urlThumbnail}
                        controls
                        className="w-full"
                      />
                      {video.titulo && (
                        <div className="p-2 bg-gray-50">
                          <p className="text-sm font-medium text-gray-900">{video.titulo}</p>
                          {video.descripcion && (
                            <p className="text-xs text-gray-600 mt-1">{video.descripcion}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;