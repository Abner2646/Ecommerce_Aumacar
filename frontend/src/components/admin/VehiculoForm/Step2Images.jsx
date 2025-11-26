// /src/components/admin/VehiculoForm/Step2Images.jsx 

import { useState } from 'react';
import ImageUploader from '../ImageUploader';

const Step2Images = ({ data, onNext, onBack, vehiculoId, existingImages = [] }) => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImagesSelected = (selectedImages) => {
    setImages(selectedImages);
  };

  const handleDeleteExisting = async (imagenId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta imagen?')) return;
    
    // TODO: Implementar eliminación con el hook useDeleteImage
    console.log('Eliminar imagen:', imagenId);
  };

  const handleNext = () => {
    // Si no hay imágenes y no es edición, advertir
    if (images.length === 0 && existingImages.length === 0) {
      if (!window.confirm('No has agregado imágenes. ¿Deseas continuar sin imágenes?')) {
        return;
      }
    }

    onNext({ images });
  };

  return (
    <div className="adm-step-form">
      <div className="adm-step-header">
        <h3 className="adm-step-title">Paso 2: Imágenes del Vehículo</h3>
        <p className="adm-step-description">
          Sube hasta 10 imágenes del vehículo. La primera imagen será la principal.
        </p>
      </div>

      <div className="adm-step-body">
        <ImageUploader
          onFilesSelected={handleImagesSelected}
          existingImages={existingImages}
          onDeleteExisting={handleDeleteExisting}
          maxFiles={10}
        />

        {images.length === 0 && existingImages.length === 0 && (
          <div className="adm-step-info-box">
            <i className="fa-solid fa-info-circle text-blue-500 text-xl"></i>
            <div>
              <p className="font-medium text-gray-900">
                Las imágenes son importantes
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Aunque puedes continuar sin imágenes, se recomienda agregar al menos 3 fotos del vehículo desde diferentes ángulos.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="adm-step-footer">
        <button
          type="button"
          onClick={onBack}
          className="adm-btn adm-btn-secondary"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Anterior
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isUploading}
          className="adm-btn adm-btn-primary"
        >
          {isUploading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Subiendo...
            </>
          ) : (
            <>
              Siguiente: Videos
              <i className="fa-solid fa-arrow-right"></i>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step2Images;