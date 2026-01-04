// /src/components/admin/VehiculoForm/Step4Videos.jsx 

import { useState, useRef, useEffect } from 'react';

const Step4Videos = ({ 
  data, 
  onNext, 
  onBack, 
  existingVideos = [],
  onDeleteExisting,
  isSubmitting = false 
}) => {
  const [videos, setVideos] = useState(data?.videos || []);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Actualizar estado de subida cuando cambia isSubmitting
  useEffect(() => {
    setIsUploading(isSubmitting);
  }, [isSubmitting]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('video/')) {
      alert('Por favor selecciona un archivo de video válido (MP4, MOV, AVI, WebM)');
      return;
    }

    // Validar tamaño (100MB)
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB en bytes
    if (file.size > MAX_SIZE) {
      alert(`El video no debe superar 100MB. Tu archivo pesa ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return;
    }

    // Validar cantidad máxima de videos
    const MAX_VIDEOS = 3;
    if (videos.length + existingVideos.length >= MAX_VIDEOS) {
      alert(`Máximo ${MAX_VIDEOS} videos permitidos. Ya tienes ${videos.length + existingVideos.length} video(s).`);
      return;
    }

    // Crear preview
    setCurrentVideo({
      file,
      preview: URL.createObjectURL(file),
      titulo: '',
      descripcion: '',
      fileName: file.name,
      fileSize: file.size
    });

    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddVideo = () => {
    // Validar título
    if (!currentVideo || !currentVideo.titulo.trim()) {
      alert('El título del video es requerido');
      return;
    }

    // Validar longitud del título
    if (currentVideo.titulo.trim().length < 3) {
      alert('El título debe tener al menos 3 caracteres');
      return;
    }

    if (currentVideo.titulo.trim().length > 200) {
      alert('El título no puede superar 200 caracteres');
      return;
    }

    const newVideo = {
      id: `new-${Date.now()}`,
      file: currentVideo.file,
      preview: currentVideo.preview,
      titulo: currentVideo.titulo.trim(),
      descripcion: currentVideo.descripcion.trim(),
      fileName: currentVideo.fileName,
      fileSize: currentVideo.fileSize,
      status: 'pending'
    };

    setVideos(prev => [...prev, newVideo]);
    setCurrentVideo(null);
  };

  const handleCancelCurrent = () => {
    if (currentVideo?.preview) {
      URL.revokeObjectURL(currentVideo.preview);
    }
    setCurrentVideo(null);
  };

  const handleRemoveNew = (videoId) => {
    if (isUploading) {
      alert('No puedes eliminar videos mientras se están subiendo');
      return;
    }

    const videoToRemove = videos.find(v => v.id === videoId);
    if (videoToRemove?.preview) {
      URL.revokeObjectURL(videoToRemove.preview);
    }
    setVideos(prev => prev.filter(v => v.id !== videoId));
  };

  const handleNext = () => {
    // Validación: no permitir avanzar si hay un video en edición
    if (currentVideo) {
      alert('Debes agregar o cancelar el video actual antes de continuar');
      return;
    }

    // Validación: no permitir avanzar si ya se está subiendo
    if (isUploading) {
      alert('Por favor espera a que termine la subida de videos');
      return;
    }

    onNext({ videos });
  };

  const handleBack = () => {
    if (isUploading) {
      alert('No puedes retroceder mientras se están subiendo videos');
      return;
    }

    if (currentVideo) {
      const confirmar = window.confirm('Tienes un video sin agregar. ¿Deseas retroceder de todas formas?');
      if (!confirmar) return;
      handleCancelCurrent();
    }

    if (videos.length > 0) {
      const confirmar = window.confirm(`Tienes ${videos.length} video(s) pendiente(s) de subir. ¿Deseas retroceder de todas formas?`);
      if (!confirmar) return;
    }

    onBack();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const totalVideos = videos.length + existingVideos.length;
  const canAddMore = totalVideos < 3 && !isUploading;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Videos del Vehículo</h3>
        <p className="text-sm text-gray-500 mt-1">
          Opcional: sube hasta 3 videos ({totalVideos}/3)
        </p>
      </div>

      <div className="p-6">
        {/* Mensaje de subida en progreso */}
        {isUploading && videos.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-spinner fa-spin text-blue-500 text-xl"></i>
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Subiendo {videos.length} video{videos.length > 1 ? 's' : ''} al servidor...
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Esto puede tardar varios minutos dependiendo del tamaño. Por favor no cierres esta ventana.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Existing Videos */}
        {existingVideos.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Videos guardados ({existingVideos.length}):
            </h4>
            <div className="space-y-4">
              {existingVideos.map(video => (
                <div key={video.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-48 h-28 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                    {video.urlThumbnail ? (
                      <img 
                        src={video.urlThumbnail} 
                        alt={video.titulo}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fa-solid fa-video text-2xl text-gray-600"></i>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{video.titulo}</h5>
                    {video.descripcion && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.descripcion}</p>
                    )}
                    <div className="flex gap-4 text-xs text-gray-400 mt-2">
                      {video.duracion && (
                        <span>
                          <i className="fa-solid fa-clock mr-1"></i>
                          {Math.floor(video.duracion / 60)}:{String(video.duracion % 60).padStart(2, '0')}
                        </span>
                      )}
                      {video.formato && (
                        <span>{video.formato.toUpperCase()}</span>
                      )}
                      {video.esPrincipal && (
                        <span className="text-blue-500 font-medium">
                          <i className="fa-solid fa-star mr-1"></i>
                          Principal
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteExisting?.(video.id)}
                    disabled={isUploading}
                    className="text-red-500 hover:text-red-700 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Eliminar video"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Videos */}
        {videos.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Nuevos videos a subir ({videos.length}):
            </h4>
            <div className="space-y-4">
              {videos.map(video => (
                <div key={video.id} className="flex gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-48 h-28 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                    <video 
                      src={video.preview} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{video.titulo}</h5>
                    {video.descripcion && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.descripcion}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-block px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                        <i className="fa-solid fa-clock mr-1"></i>
                        Pendiente de subir
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatFileSize(video.fileSize)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveNew(video.id)}
                    disabled={isUploading}
                    className="text-red-500 hover:text-red-700 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Quitar video"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Zone / Current Video Form */}
        {canAddMore && (
          <>
            {!currentVideo ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <i className="fa-solid fa-video text-4xl text-gray-400 mb-3"></i>
                <p className="text-gray-700 font-medium">Haz clic para seleccionar un video</p>
                <p className="text-sm text-gray-500 mt-1">MP4, MOV, AVI, WebM. Máximo 100MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex gap-6">
                  {/* Preview */}
                  <div className="w-64 flex-shrink-0">
                    <video 
                      src={currentVideo.preview}
                      controls
                      className="w-full rounded-lg"
                    />
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-500">
                        <i className="fa-solid fa-file mr-1"></i>
                        {formatFileSize(currentVideo.fileSize)}
                      </p>
                      <p className="text-xs text-gray-400 truncate" title={currentVideo.fileName}>
                        {currentVideo.fileName}
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título del video <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={currentVideo.titulo}
                        onChange={(e) => setCurrentVideo(prev => ({ ...prev, titulo: e.target.value }))}
                        placeholder="Ej: Test drive en ruta"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        maxLength={200}
                        autoFocus
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        {currentVideo.titulo.length}/200 caracteres
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción (opcional)
                      </label>
                      <textarea
                        value={currentVideo.descripcion}
                        onChange={(e) => setCurrentVideo(prev => ({ ...prev, descripcion: e.target.value }))}
                        rows={3}
                        placeholder="Descripción breve del video"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                        maxLength={500}
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        {currentVideo.descripcion.length}/500 caracteres
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCancelCurrent}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleAddVideo}
                        disabled={!currentVideo.titulo.trim() || currentVideo.titulo.trim().length < 3}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <i className="fa-solid fa-plus mr-2"></i>
                        Agregar video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Mensaje cuando se alcanza el límite */}
        {totalVideos >= 3 && !isUploading && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-info-circle text-yellow-600"></i>
              <p className="text-sm text-yellow-800">
                Has alcanzado el máximo de 3 videos permitidos
              </p>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg flex gap-3">
          <i className="fa-solid fa-lightbulb text-yellow-500 mt-0.5 flex-shrink-0"></i>
          <div>
            <p className="text-sm font-medium text-gray-900">Consejos para videos</p>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>• Graba en formato horizontal (16:9) para mejor visualización</li>
              <li>• Mantén el video entre 30 segundos y 2 minutos</li>
              <li>• Muestra el exterior e interior del vehículo</li>
              <li>• Evita música con derechos de autor</li>
              <li>• Asegúrate de tener buena iluminación y estabilidad</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={isUploading}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Anterior
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isUploading || currentVideo !== null}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          title={currentVideo ? 'Debes agregar o cancelar el video actual' : ''}
        >
          {isUploading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Subiendo videos...
            </>
          ) : (
            <>
              Siguiente: Características
              <i className="fa-solid fa-arrow-right"></i>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step4Videos;