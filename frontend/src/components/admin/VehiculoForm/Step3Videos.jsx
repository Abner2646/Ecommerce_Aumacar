// /src/components/admin/VehiculoForm/Step3Videos.jsx 

import { useState } from 'react';
import VideoUploader from '../VideoUploader';

const Step3Videos = ({ data, onNext, onBack, vehiculoId, existingVideos = [] }) => {
  const [uploadQueue, setUploadQueue] = useState([]);

  const handleVideoSelected = ({ file, metadata, onProgress, onSuccess, onError }) => {
    // Agregar a la cola de uploads
    const videoData = {
      file,
      metadata,
      status: 'pending'
    };
    
    setUploadQueue(prev => [...prev, videoData]);
    
    // Simular progreso (en realidad esto lo manejará el hook useAddVideo)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        onSuccess();
      }
    }, 300);
  };

  const handleDeleteExisting = async (videoId) => {
    if (!window.confirm('¿Estás seguro de eliminar este video?')) return;
    
    // TODO: Implementar eliminación con el hook useDeleteVideo
    console.log('Eliminar video:', videoId);
  };

  const handleNext = () => {
    onNext({ videos: uploadQueue });
  };

  return (
    <div className="adm-step-form">
      <div className="adm-step-header">
        <h3 className="adm-step-title">Paso 3: Videos del Vehículo</h3>
        <p className="adm-step-description">
          Agrega hasta 3 videos del vehículo. Los videos son opcionales.
        </p>
      </div>

      <div className="adm-step-body">
        <VideoUploader
          onVideoSelected={handleVideoSelected}
          existingVideos={existingVideos}
          onDeleteExisting={handleDeleteExisting}
          maxVideos={3}
        />

        <div className="adm-step-info-box mt-6">
          <i className="fa-solid fa-lightbulb text-yellow-500 text-xl"></i>
          <div>
            <p className="font-medium text-gray-900">
              Consejos para videos de calidad
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
              <li>Graba en formato horizontal (16:9)</li>
              <li>Mantén el video entre 30 segundos y 2 minutos</li>
              <li>Muestra el exterior e interior del vehículo</li>
              <li>Incluye detalles de las características destacadas</li>
            </ul>
          </div>
        </div>
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
          className="adm-btn adm-btn-primary"
        >
          Siguiente: Características
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Step3Videos;