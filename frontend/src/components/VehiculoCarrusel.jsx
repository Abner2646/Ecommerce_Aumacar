import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Recibe: images: array de urls de imágenes, videos: array de urls de videos
const VehiculoCarrusel = ({ images = [], videos = [] }) => {
  const media = [
    ...images.map(url => ({ type: 'image', url })),
    ...videos.map(url => ({ type: 'video', url }))
  ];

  return (
    <div style={{ width: '100%', maxWidth: 600, minHeight: 340, position: 'relative' }}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        style={{ width: '100%', minHeight: 340 }}
      >
        {media.map((item, idx) => (
          <SwiperSlide key={idx}>
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={`media-${idx}`}
                style={{ width: '100%', height: '340px', objectFit: 'contain', borderRadius: 18, background: '#f8f8f8', padding: 12 }}
              />
            ) : (
              <video
                controls
                style={{ width: '100%', height: '340px', objectFit: 'contain', borderRadius: 18, background: '#f8f8f8', padding: 12 }}
              >
                <source src={item.url} type="video/mp4" />
                Tu navegador no soporta el tag de video.
              </video>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VehiculoCarrusel;
