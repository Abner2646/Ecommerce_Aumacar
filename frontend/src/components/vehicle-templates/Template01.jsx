// /src/components/vehicle-templates/Template01.jsx 

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/plantilla1.css';
import '../../styles/plantilla2.css';
import '../../styles/pages/plantilla3.css';

// Recibe prop plantillaMarca: 'plantilla1', 'plantilla2', 'plantilla3'
import '../../styles/pages/plantilla1.css';
import '../../styles/pages/plantilla2.css';
import '../../styles/pages/plantilla3.css';

export default function Template02({ vehiculo, caracteristicas: caracteristicasProp, colores: coloresProp, plantillaMarca = 'plantilla1' }) {
  // ==================== TODOS LOS HOOKS PRIMERO ====================
  const navigate = useNavigate();
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const [showUnmuteHint, setShowUnmuteHint] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // ✅ USAR LAS PROPS DIRECTAMENTE
  const colores = coloresProp || [];
  const caracteristicas = caracteristicasProp || [];

  // DEBUG
  useEffect(() => {
    console.log('🔍 DEBUG Template02:');
    console.log('- Características recibidas:', caracteristicas);
    console.log('- Colores recibidos:', colores);
    console.log('- Length características:', caracteristicas?.length);
    console.log('- Length colores:', colores?.length);
  }, [caracteristicas, colores]);
  
  // ✅ TODOS LOS useEffect ANTES DEL RETURN CONDICIONAL
  
  // Intersection Observer para animaciones on-scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Ocultar hint de unmute después de 3 segundos
  useEffect(() => {
    if (showUnmuteHint) {
      const timer = setTimeout(() => setShowUnmuteHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showUnmuteHint]);

  // Reset slide cuando cambia el color
  useEffect(() => {
    setCurrentSlide(0);
  }, [colorSeleccionado]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (mediaItems.length === 0) return;
      if (e.key === 'ArrowRight') {
        const next = currentSlide === mediaItems.length - 1 ? 0 : currentSlide + 1;
        goToSlide(next);
      }
      if (e.key === 'ArrowLeft') {
        const prev = currentSlide === 0 ? mediaItems.length - 1 : currentSlide - 1;
        goToSlide(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]); // Removí mediaItems.length de dependencias para evitar error

  // ==================== VALIDACIÓN (DESPUÉS DE HOOKS) ====================
  if (!vehiculo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-2xl text-gray-400 font-light tracking-wider animate-pulse">
          Cargando experiencia premium...
        </div>
      </div>
    );
  }

  // ==================== DESTRUCTURING ====================
  const {
    imagenes = [],
    videos = [],
    modelo = '',
    nombre = '',
    version = '',
    precio = 0,
    precioUsd = null,
    motor = '',
    potencia = '',
    consumo = '',
    transmision = '',
    combustible = '',
    traccion = '',
    categoria = '',
    año = '',
    id
  } = vehiculo;

  // ==================== PREPARAR DATOS ====================
  const videoUrl = videos?.[0]?.urlVideo || null;
  const imagenPrincipal = imagenes.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))[0]?.url || null;
  
  // FILTRAR IMÁGENES Y VIDEOS SEGÚN COLOR
  const imagenesFiltradas = colorSeleccionado === null
    ? imagenes
    : imagenes.filter(img => img.colorVehiculoId === colorSeleccionado);
  
  // Combinar imágenes y videos en un solo array para el slider
  const mediaItems = [
    ...imagenesFiltradas
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
      .map(img => ({ type: 'image', url: img.url, id: img.id })),
    ...videos.slice(1).map((vid, idx) => ({ type: 'video', url: vid.urlVideo, id: `video-${idx}` }))
  ];
  
  const precioFormateado = Number(precio).toLocaleString('es-AR', { 
    maximumFractionDigits: 0 
  });
  
  const precioUsdFormateado = precioUsd 
    ? Number(precioUsd).toLocaleString('en-US', { maximumFractionDigits: 0 }) 
    : null;

  // Specs con iconos premium
  const specs = [
    { 
      label: 'Motor', 
      value: motor,
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      highlight: true
    },
    { 
      label: 'Potencia', 
      value: potencia,
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      highlight: true
    },
    { 
      label: 'Consumo', 
      value: consumo,
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      label: 'Transmisión', 
      value: transmision,
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    { 
      label: 'Combustible', 
      value: combustible,
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      )
    },
    { 
      label: 'Tracción', 
      value: traccion,
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    }
  ].filter(spec => spec.value);

  // ==================== FUNCIONES ====================
  
  // Contar imágenes por color
  const contarImagenesPorColor = (colorId) => {
    return imagenes.filter(img => img.colorVehiculoId === colorId).length;
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
      setShowUnmuteHint(false);
    }
  };

  // Navegación del slider
  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const nextSlide = () => {
    if (mediaItems.length === 0) return;
    const next = currentSlide === mediaItems.length - 1 ? 0 : currentSlide + 1;
    goToSlide(next);
  };

  const prevSlide = () => {
    if (mediaItems.length === 0) return;
    const prev = currentSlide === 0 ? mediaItems.length - 1 : currentSlide - 1;
    goToSlide(prev);
  };

  // Touch handlers para mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -75) {
      prevSlide();
    }
  };

  // ==================== RENDER ====================
  
  // Determinar clase raíz según plantilla
  let plantillaRootClass = '';
  if (plantillaMarca === 'plantilla1') plantillaRootClass = 'plantilla1-root';
  else if (plantillaMarca === 'plantilla2') plantillaRootClass = 'plantilla2-root';
  else if (plantillaMarca === 'plantilla3') plantillaRootClass = 'plantilla3-root';
  else plantillaRootClass = '';

  return (
    <div className={`${plantillaRootClass} template-02-tesla bg-black`}>
      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes crossFade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .spec-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .spec-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .spec-card:hover .spec-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .spec-icon {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .color-tab {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .color-tab:hover {
          transform: translateY(-2px);
        }

        .slider-image {
          transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slider-image.active {
          animation: crossFade 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slider-nav-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slider-nav-button:hover {
          transform: scale(1.1);
          background-color: rgba(255, 255, 255, 0.2);
        }

        .slider-nav-button:active {
          transform: scale(0.95);
        }

        /* Ocultar scrollbar en selector de colores */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* ...existing code... */}

      {/* GALERÍA FULLSCREEN CINEMATOGRÁFICA */}
      <section className="relative bg-black">
        {/* Selector de colores - flotante sobre slider */}
        {colores.length > 0 && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 w-full px-8">
            <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {/* Botón "Todas" */}
              <button
                onClick={() => setColorSeleccionado(null)}
                className={`color-tab flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                  colorSeleccionado === null
                    ? 'bg-white text-black shadow-2xl'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-wider">
                  Todas
                </span>
              </button>

              {/* Botones de colores */}
              {colores.map((color) => {
                const imageCount = contarImagenesPorColor(color.colorId);
                if (imageCount === 0) return null;

                const isSelected = colorSeleccionado === color.colorId;

                return (
                  <button
                    key={color.colorId}
                    onClick={() => setColorSeleccionado(color.colorId)}
                    className={`color-tab flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                      isSelected
                        ? 'bg-white text-black shadow-2xl'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                        isSelected ? 'border-black scale-110' : 'border-white/40'
                      }`}
                      style={{ backgroundColor: color.codigoHex }}
                    />
                    <span className="text-sm font-bold uppercase tracking-wider">
                      {color.nombre}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Slider fullscreen */}
        {mediaItems.length > 0 ? (
          <div 
            className="relative w-full h-screen overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Slides */}
            <div className="relative w-full h-full">
              {mediaItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 slider-image ${
                    index === currentSlide ? 'active opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {item.type === 'image' ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={item.url}
                        alt={`${modelo} - Imagen ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      style={{ objectFit: 'cover' }}
                    >
                      <source src={item.url} type="video/mp4" />
                    </video>
                  )}
                </div>
              ))}
            </div>

            {/* Navegación - Flechas laterales */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="slider-nav-button absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white"
                  aria-label="Imagen anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="slider-nav-button absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white"
                  aria-label="Imagen siguiente"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="h-screen flex items-center justify-center text-white/60 text-xl">
            No hay imágenes disponibles para este color
          </div>
        )}
      </section>

      {/* TÍTULO PRINCIPAL VEHÍCULO */}
      <div className="w-full flex justify-center items-center pt-12 pb-4">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-normal text-white text-center tracking-tight mb-6" style={{ fontWeight: 400 }}>
          {nombre}
        </h1>
      </div>
      {/* ESPECIFICACIONES */}
      {specs.length > 0 && (
        <section className="fade-in-section py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">
                Performance
              </h3>
              <h2 className="text-[2.7rem] md:text-[3.6rem] font-bold text-white">
                Especificaciones
              </h2>
            </div>

            <div className="grid gap-4 md:gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className={`spec-card relative p-6 rounded-2xl border-2 transition-all duration-400 ${
                    spec.highlight
                      ? 'bg-white text-black border-white shadow-2xl'
                      : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`spec-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    spec.highlight 
                      ? 'bg-black/10 text-black' 
                      : 'bg-white/10 text-white'
                  }`}>
                    <div className="w-6 h-6">
                      {spec.icon}
                    </div>
                  </div>

                  <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                    spec.highlight ? 'text-black/70' : 'text-white/70'
                  }`}>
                    {spec.label}
                  </div>

                  <div className={`text-xl md:text-2xl font-bold ${
                    spec.highlight ? 'text-black' : 'text-white'
                  }`}>
                    {spec.value}
                  </div>

                  {spec.highlight && (
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CARACTERÍSTICAS */}
      {caracteristicas.length > 0 && (
        <section className="fade-in-section py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-black border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-16 md:mb-24 text-center">
              Equipamiento
            </h3>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
              {caracteristicas.map((carac, index) => (
                <div 
                  key={carac.id || index}
                  className="flex items-start gap-4 pb-6 border-b border-white/10 transition-all duration-300 hover:border-white/30"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Checkmark */}
                  <svg className="flex-shrink-0 w-5 h-5 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  
                  {/* Texto */}
                  <span className="text-lg text-gray-300">
                    {carac.nombre || carac}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="fade-in-section relative py-32 md:py-48 px-8 bg-black border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              white 2px,
              white 4px
            )`
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-[2.7rem] md:text-[4.2rem] font-bold text-white mb-12 leading-tight">
            Hacé que sea tuyo
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 font-light mb-16 max-w-2xl mx-auto">
            Comenzá el proceso de compra o contactá a nuestro equipo para una experiencia personalizada.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <button
              onClick={() => {
                navigate(`/comprar/${id}`);
                setTimeout(() => {
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                  }
                }, 50);
              }}
              className="flex-1 px-12 py-6 text-base font-bold text-black bg-white hover:bg-gray-100 transition-all duration-300 tracking-wider uppercase hover:scale-105"
            >
              Comprar ahora
            </button>

            <a
              href={`https://wa.me/5492914277849?text=Hola%20quiero%20información%20sobre%20el%20${encodeURIComponent(modelo)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-12 py-6 text-base font-bold text-white bg-transparent border-2 border-white hover:bg-white/10 transition-all duration-300 text-center tracking-wider uppercase hover:scale-105"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>

      {/* DEBUG */}
      {/*{process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md text-green-400 px-4 py-3 rounded-xl shadow-2xl text-xs font-mono z-50 border border-white/20">
          <div className="font-bold text-green-300 mb-2 pb-2 border-b border-white/20">
            🎨 Template02 Tesla
          </div>
          <div className="space-y-1">
            <div>Slide: <span className="text-white font-bold">{currentSlide + 1}/{mediaItems.length}</span></div>
            <div>Color: <span className="text-white font-bold">{colorSeleccionado || 'todas'}</span></div>
            <div>Muted: <span className="text-white font-bold">{videoMuted ? 'Sí' : 'No'}</span></div>
            <div>Características: <span className="text-white font-bold">{caracteristicas.length}</span></div>
            <div>Colores: <span className="text-white font-bold">{colores.length}</span></div>
          </div>
        </div>
      )}*/}
    </div>
  );
}