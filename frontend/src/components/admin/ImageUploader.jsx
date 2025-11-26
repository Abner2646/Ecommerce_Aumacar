// /src/components/admin/ImageUploader.jsx 

import { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/**
 * ImageUploader con drag & drop, preview, reordenamiento
 * 
 * @param {Function} onFilesSelected - Callback cuando se seleccionan archivos
 * @param {Array} existingImages - Imágenes ya subidas (para edición)
 * @param {Function} onDeleteExisting - Callback para eliminar imagen existente
 * @param {Number} maxFiles - Máximo de archivos permitidos
 */
const ImageUploader = ({ 
  onFilesSelected, 
  existingImages = [],
  onDeleteExisting,
  maxFiles = 10 
}) => {
  const [previews, setPreviews] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (files) => {
    const fileArray = Array.from(files);
    
    // Validar cantidad total
    const totalImages = existingImages.length + previews.length + fileArray.length;
    if (totalImages > maxFiles) {
      alert(`Máximo ${maxFiles} imágenes permitidas`);
      return;
    }

    // Validar que sean imágenes
    const validFiles = fileArray.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} no es una imagen válida`);
        return false;
      }
      
      // Validar tamaño (máx 5MB por imagen)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} supera los 5MB`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    // Generar previews
    const newPreviews = validFiles.map((file, index) => ({
      id: `preview-${Date.now()}-${index}`,
      file,
      url: URL.createObjectURL(file),
      esPrincipal: previews.length === 0 && existingImages.length === 0 && index === 0
    }));

    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);
    onFilesSelected(updatedPreviews);
  };

  const handleInputChange = (e) => {
    handleFileChange(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleRemovePreview = (previewId) => {
    const updatedPreviews = previews.filter(p => p.id !== previewId);
    
    // Si eliminamos la principal, hacer que la primera sea principal
    if (updatedPreviews.length > 0 && !updatedPreviews.some(p => p.esPrincipal)) {
      updatedPreviews[0].esPrincipal = true;
    }
    
    setPreviews(updatedPreviews);
    onFilesSelected(updatedPreviews);
  };

  const handleSetPrincipal = (previewId) => {
    const updatedPreviews = previews.map(p => ({
      ...p,
      esPrincipal: p.id === previewId
    }));
    
    setPreviews(updatedPreviews);
    onFilesSelected(updatedPreviews);
  };

  const handleReorder = (result) => {
    if (!result.destination) return;

    const items = Array.from(previews);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPreviews(items);
    onFilesSelected(items);
  };

  const totalImages = existingImages.length + previews.length;

  return (
    <div className="adm-image-uploader">
      {/* Drop Zone */}
      <div
        className={`adm-dropzone ${dragActive ? 'adm-dropzone-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-3"></i>
        <p className="text-gray-700 font-medium mb-1">
          Arrastra imágenes aquí o haz clic para seleccionar
        </p>
        <p className="text-sm text-gray-500">
          JPG, PNG, WEBP. Máximo 5MB por imagen. ({totalImages}/{maxFiles} imágenes)
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Imágenes Existentes */}
      {existingImages.length > 0 && (
        <div className="mt-6">
          <h4 className="adm-form-label mb-3">
            Imágenes actuales ({existingImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {existingImages.map((img) => (
              <div key={img.id} className="adm-image-preview-item">
                <img 
                  src={img.url} 
                  alt={img.alt || 'Imagen vehículo'} 
                  className="adm-image-preview-img"
                />
                
                {img.esPrincipal && (
                  <span className="adm-image-badge adm-image-badge-principal">
                    <i className="fa-solid fa-star"></i> Principal
                  </span>
                )}
                
                <div className="adm-image-preview-actions">
                  <button
                    type="button"
                    onClick={() => onDeleteExisting(img.id)}
                    className="adm-image-action-btn adm-image-action-delete"
                    title="Eliminar"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Previews Nuevas (con drag & drop para reordenar) */}
      {previews.length > 0 && (
        <div className="mt-6">
          <h4 className="adm-form-label mb-3">
            Nuevas imágenes ({previews.length})
            <span className="text-xs text-gray-500 ml-2 font-normal">
              Arrastra para reordenar
            </span>
          </h4>
          
          <DragDropContext onDragEnd={handleReorder}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {previews.map((preview, index) => (
                    <Draggable 
                      key={preview.id} 
                      draggableId={preview.id} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`adm-image-preview-item ${
                            snapshot.isDragging ? 'adm-image-dragging' : ''
                          }`}
                        >
                          <img 
                            src={preview.url} 
                            alt={`Preview ${index + 1}`}
                            className="adm-image-preview-img"
                          />
                          
                          {preview.esPrincipal && (
                            <span className="adm-image-badge adm-image-badge-principal">
                              <i className="fa-solid fa-star"></i> Principal
                            </span>
                          )}
                          
                          <div className="adm-image-preview-actions">
                            {!preview.esPrincipal && (
                              <button
                                type="button"
                                onClick={() => handleSetPrincipal(preview.id)}
                                className="adm-image-action-btn adm-image-action-star"
                                title="Marcar como principal"
                              >
                                <i className="fa-solid fa-star"></i>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemovePreview(preview.id)}
                              className="adm-image-action-btn adm-image-action-delete"
                              title="Eliminar"
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                          
                          <div className="adm-image-order-badge">
                            {index + 1}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;