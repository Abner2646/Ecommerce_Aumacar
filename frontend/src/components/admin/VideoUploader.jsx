// /src/components/admin/VideoUploader.jsx 

import { useState, useRef } from 'react';
import ProgressBar from '../common/ProgressBar';

/**
 * VideoUploader con progress bar
 * 
 * @param {Function} onVideoSelected - Callback cuando se selecciona video
 * @param {Array} existingVideos - Videos ya subidos (para edición)
 * @param {Function} onDeleteExisting - Callback para eliminar video existente
 * @param {Number} maxVideos - Máximo de videos permitidos
 */
const VideoUploader = ({ 
  onVideoSelected, 
  existingVideos = [],
  onDeleteExisting,
  maxVideos = 3 
}) => {
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [metadata, setMetadata] = useState({
    titulo: '',
    descripcion: ''
  });
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar cantidad
    if (existingVideos.length >= maxVideos) {
      alert(`Máximo ${maxVideos} videos permitidos`);
      return;
    }

    // Validar que sea video
    if (!file.type.startsWith('video/')) {
      alert('Por favor selecciona un archivo de video válido');
      return;
    }

    // Validar tamaño (máx 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('El video no debe superar 100MB');
      return;
    }

    // Generar preview
    const videoUrl = URL.createObjectURL(file);
    setPreview({
      file,
      url: videoUrl,
      name: file.name,
      size: file.size
    });

    // Reset estado
    setUploadProgress(0);
    setUploadStatus('idle');
  };

  const handleRemovePreview = () => {
    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }
    setPreview(null);
    setUploadProgress(0);
    setUploadStatus('idle');
    setMetadata({ titulo: '', descripcion: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (!preview) return;

    setUploadStatus('uploading');
    
    // Llamar callback con el archivo y metadata
    onVideoSelected({
      file: preview.file,
      metadata: metadata,
      onProgress: (progress) => {
        setUploadProgress(progress);
      },
      onSuccess: () => {
        setUploadStatus('success');
        setTimeout(() => {
          handleRemovePreview();
        }, 2000);
      },
      onError: () => {
        setUploadStatus('error');
      }
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="adm-video-uploader">
      {/* Videos Existentes */}
      {existingVideos.length > 0 && (
        <div className="mb-6">
          <h4 className="adm-form-label mb-3">
            Videos actuales ({existingVideos.length}/{maxVideos})
          </h4>
          <div className="space-y-4">
            {existingVideos.map((video) => (
              <div key={video.id} className="adm-video-existing-item">
                <div className="adm-video-thumbnail">
                  {video.urlThumbnail ? (
                    <img src={video.urlThumbnail} alt={video.titulo} />
                  ) : (
                    <div className="adm-video-thumbnail-placeholder">
                      <i className="fa-solid fa-video text-3xl text-gray-400"></i>
                    </div>
                  )}
                  {video.esPrincipal && (
                    <span className="adm-video-badge-principal">
                      <i className="fa-solid fa-star"></i> Principal
                    </span>
                  )}
                </div>
                
                <div className="adm-video-info">
                  <h5 className="adm-video-title">{video.titulo}</h5>
                  {video.descripcion && (
                    <p className="adm-video-description">{video.descripcion}</p>
                  )}
                  <div className="adm-video-meta">
                    <span>
                      <i className="fa-solid fa-clock text-xs"></i>
                      {Math.floor(video.duracion / 60)}:{String(video.duracion % 60).padStart(2, '0')}
                    </span>
                    <span>
                      <i className="fa-solid fa-file text-xs"></i>
                      {video.formato?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteExisting(video.id)}
                  className="adm-video-delete-btn"
                  title="Eliminar video"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {!preview && existingVideos.length < maxVideos && (
        <div
          className="adm-video-dropzone"
          onClick={() => fileInputRef.current?.click()}
        >
          <i className="fa-solid fa-video text-4xl text-gray-400 mb-3"></i>
          <p className="text-gray-700 font-medium mb-1">
            Selecciona un video para subir
          </p>
          <p className="text-sm text-gray-500">
            MP4, MOV, AVI. Máximo 100MB ({existingVideos.length}/{maxVideos} videos)
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Preview del video seleccionado */}
      {preview && (
        <div className="adm-video-preview-container">
          <div className="adm-video-preview">
            <video 
              src={preview.url} 
              controls
              className="adm-video-preview-player"
            />
            
            <button
              type="button"
              onClick={handleRemovePreview}
              className="adm-video-preview-remove"
              disabled={uploadStatus === 'uploading'}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="adm-video-preview-details">
            <p className="text-sm font-medium text-gray-700 mb-1">
              {preview.name}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              {formatFileSize(preview.size)}
            </p>

            {/* Metadata del video */}
            <div className="space-y-3">
              <div>
                <label className="adm-form-label">Título del video</label>
                <input
                  type="text"
                  value={metadata.titulo}
                  onChange={(e) => setMetadata({ ...metadata, titulo: e.target.value })}
                  placeholder="Ej: Test drive en ruta"
                  className="adm-form-input"
                  disabled={uploadStatus === 'uploading'}
                />
              </div>

              <div>
                <label className="adm-form-label">Descripción (opcional)</label>
                <textarea
                  value={metadata.descripcion}
                  onChange={(e) => setMetadata({ ...metadata, descripcion: e.target.value })}
                  placeholder="Descripción breve del video"
                  rows={2}
                  className="adm-form-input"
                  disabled={uploadStatus === 'uploading'}
                />
              </div>
            </div>

            {/* Progress Bar */}
            {uploadStatus === 'uploading' && (
              <div className="mt-4">
                <ProgressBar 
                  progress={uploadProgress} 
                  fileName={preview.name}
                  status="uploading"
                />
              </div>
            )}

            {uploadStatus === 'success' && (
              <div className="adm-video-upload-success">
                <i className="fa-solid fa-check-circle text-green-500 text-xl"></i>
                <span>Video subido exitosamente</span>
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="adm-video-upload-error">
                <i className="fa-solid fa-exclamation-circle text-red-500 text-xl"></i>
                <span>Error al subir el video. Intenta nuevamente.</span>
              </div>
            )}

            {/* Botón de subida */}
            {uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
              <button
                type="button"
                onClick={handleUpload}
                disabled={!metadata.titulo.trim()}
                className="adm-btn adm-btn-primary w-full mt-4"
              >
                <i className="fa-solid fa-cloud-arrow-up"></i>
                Subir Video
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;