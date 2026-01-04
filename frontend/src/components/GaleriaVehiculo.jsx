// GaleriaVehiculo.jsx

import React, { useState } from 'react';
import '../styles/VehiculoInfo.css';

const GaleriaVehiculo = ({ images = [], videos = [], etiqueta }) => {
  // Unificar imágenes y videos en un solo array manteniendo el orden
  const media = [
    ...images.map(url => ({ type: 'image', url })),
    ...videos.map(url => ({ type: 'video', url }))
  ];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const principal = media[selectedIdx];

  return (
    <div className="galeria-nike-root">
      <div className="galeria-nike-thumbs">
        {media.map((item, idx) => (
          <div
            key={idx}
            className={`galeria-nike-thumb${selectedIdx === idx ? ' selected' : ''}`}
            onClick={() => setSelectedIdx(idx)}
          >
            {item.type === 'image' ? (
              <img src={item.url} alt={`thumb-${idx}`} />
            ) : (
              <div className="galeria-nike-thumb-video">
                <img src={item.url + '?frame=1'} alt={`thumb-${idx}`} />
                <span className="galeria-nike-thumb-play">▶</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="galeria-nike-principal">
        {etiqueta && (
          <div className="galeria-nike-label">{etiqueta}</div>
        )}
        {principal?.type === 'image' ? (
          <img src={principal.url} alt="principal" />
        ) : (
          <video controls>
            <source src={principal.url} type="video/mp4" />
            Tu navegador no soporta el tag de video.
          </video>
        )}
      </div>
    </div>
  );
};

export default GaleriaVehiculo;
