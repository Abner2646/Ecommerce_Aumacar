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
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      style={{ maxWidth: 600 }}
    >
      {media.map((item, idx) => (
        <SwiperSlide key={idx}>
          {item.type === 'image' ? (
            <img src={item.url} alt={`media-${idx}`} style={{ width: '100%', borderRadius: 12 }} />
          ) : (
            <video controls style={{ width: '100%', borderRadius: 12 }}>
              <source src={item.url} type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VehiculoCarrusel;
