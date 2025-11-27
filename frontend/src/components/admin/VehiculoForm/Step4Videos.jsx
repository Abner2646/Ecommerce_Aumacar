// /src/components/admin/VehiculoForm/Step4Videos.jsx

import { useState, useRef } from 'react';

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
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('video/')) {
      alert('Por favor selecciona un archivo de video válido');
      return;
    }

    // Validar tamaño (100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('El video no debe superar 100MB');
      return;
    }

    // Validar cantidad
    if (videos.length + existingVideos.length >= 3) {
      alert('Máximo 3 videos permitidos');
      return;
    }

    setCurrentVideo({
      file,
      preview: URL.createObjectURL(file),
      titulo: '',
      descripcion: ''
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddVideo = () => {
    if (!currentVideo || !currentVideo.titulo.trim()) {
      alert('El título del video es requerido');
      return;
    }

    const newVideo = {
      id: `new-${Date.now()}`,
      file: currentVideo.file,
      preview: currentVideo.preview,
      titulo: currentVideo.titulo,
      descripcion: currentVideo.descripcion,
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
    setVideos(prev => prev.filter(v => v.id !== videoId));
  };

  const handleNext = () => {
    onNext({ videos });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const totalVideos = videos.length + existingVideos.length;

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
        {/* Existing Videos */}
        {existingVideos.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Videos guardados:</h4>
            <div className="space-y-4">
              {existingVideos.map(video => (
                <div key={video.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-48 h-28 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                    {video.urlThumbnail ? (
                      <img src={video.urlThumbnail} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fa-solid fa-video text-2xl text-gray-600"></i>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{video.titulo}</h5>
                    {video.descripcion && (
                      <p className="text-sm text-gray-500 mt-1">{video.descripcion}</p>
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
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteExisting?.(video.id)}
                    className="text-red-500 hover:text-red-700 p-2"
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
            <h4 className="text-sm font-medium text-gray-700 mb-3">Nuevos videos:</h4>
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
                      <p className="text-sm text-gray-500 mt-1">{video.descripcion}</p>
                    )}
                    <span className="inline-block mt-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                      Pendiente de subir
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveNew(video.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Zone / Current Video Form */}
        {totalVideos < 3 && (
          <>
            {!currentVideo ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <i className="fa-solid fa-video text-4xl text-gray-400 mb-3"></i>
                <p className="text-gray-700 font-medium">Haz clic para seleccionar un video</p>
                <p className="text-sm text-gray-500 mt-1">MP4, MOV, AVI. Máximo 100MB</p>
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
                    <p className="text-xs text-gray-500 mt-2">
                      {formatFileSize(currentVideo.file.size)}
                    </p>
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
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción (opcional)
                      </label>
                      <textarea
                        value={currentVideo.descripcion}
                        onChange={(e) => setCurrentVideo(prev => ({ ...prev, descripcion: e.target.value }))}
                        rows={2}
                        placeholder="Descripción breve del video"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleCancelCurrent}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleAddVideo}
                        disabled={!currentVideo.titulo.trim()}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Info Box */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg flex gap-3">
          <i className="fa-solid fa-lightbulb text-yellow-500 mt-0.5"></i>
          <div>
            <p className="text-sm font-medium text-gray-900">Consejos para videos</p>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li>• Graba en formato horizontal (16:9)</li>
              <li>• Mantén el video entre 30 segundos y 2 minutos</li>
              <li>• Muestra el exterior e interior del vehículo</li>
            </ul>
          </div>
        </div>
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
          Siguiente: Características
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Step4Videos;