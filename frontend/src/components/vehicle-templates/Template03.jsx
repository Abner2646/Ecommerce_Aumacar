// /src/components/vehicle-templates/Template03.jsx 

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Template03({ vehiculo, caracteristicas: caracteristicasProp, colores: coloresProp, plantillaMarca = 'plantilla1' }) {
  // ==================== TODOS LOS HOOKS PRIMERO ====================
  const navigate = useNavigate();
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const [video2Muted, setVideo2Muted] = useState(true);
  const [showUnmuteHint, setShowUnmuteHint] = useState(true);
  const [showAllImages, setShowAllImages] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const videoRef = useRef(null);
  const video2Ref = useRef(null);
  const parallaxSectionRef = useRef(null);
  
  // ✅ USAR LAS PROPS DIRECTAMENTE
  const colores = coloresProp || [];
  const caracteristicas = caracteristicasProp || [];

  // DEBUG
  useEffect(() => {
    console.log('🔍 DEBUG Template03:');
    console.log('- Características recibidas:', caracteristicas);
    console.log('- Colores recibidos:', colores);
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

  // Reset galería cuando cambia el color
  useEffect(() => {
    setShowAllImages(false);
  }, [colorSeleccionado]);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && modalImage) {
        setModalImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalImage]);

  // Parallax effect para imagen del medio
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxSectionRef.current) return;
      
      const section = parallaxSectionRef.current;
      const rect = section.getBoundingClientRect();
      const scrolled = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Calcular offset solo cuando la sección está visible
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (scrolled - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
        const offset = Math.min(30, Math.max(-30, (progress - 0.5) * 60)); // Rango: -30px a +30px
        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const video2Url = videos?.[1]?.urlVideo || null;
  const imagenPrincipal = imagenes.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))[0]?.url || null;
  
  // Imágenes para galería salteadas (primeras 3 generales)
  const imagenesGenerales = imagenes.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  const imagenesSalteadas = imagenesGenerales.slice(0, 3);
  
  // FILTRAR IMÁGENES SEGÚN COLOR para galería general
  const imagenesFiltradas = colorSeleccionado === null
    ? imagenes
    : imagenes.filter(img => img.colorVehiculoId === colorSeleccionado);
  
  const imagenesOrdenadas = imagenesFiltradas.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  
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

  const toggleMute2 = () => {
    if (video2Ref.current) {
      video2Ref.current.muted = !video2Muted;
      setVideo2Muted(!video2Muted);
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
    <div className={`${plantillaRootClass} template-03-dynamic bg-black`}>
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .spec-card:hover {
          transform: translateY(-4px);
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

        /* Galería salteadas */
        .staggered-image {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .staggered-image:hover {
          transform: scale(1.05) !important;
        }

        /* Gallery hover */
        .gallery-image-wrapper {
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }

        .gallery-image {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-image-wrapper:hover .gallery-image {
          transform: scale(1.08);
        }

        .gallery-image-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 0.3s ease;
          pointer-events: none;
        }

        .gallery-image-wrapper:hover::after {
          background: rgba(0, 0, 0, 0.1);
        }

        /* Modal */
        .modal-overlay {
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Ocultar scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Statement section parallax */
        .statement-parallax {
          background-attachment: fixed;
          background-position: center;
          background-size: cover;
        }

        @media (max-width: 768px) {
          .statement-parallax {
            background-attachment: scroll;
          }
        }

        /* Expand animation */
        @keyframes expandGallery {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .expanded-images {
          animation: expandGallery 0.5s ease-out;
        }
      `}</style>

      {/* ============================================ */}
      {/* SECCIÓN 1: HERO VIDEO (IGUAL TEMPLATE02) */}
      {/* ============================================ */}
      <section className="relative h-screen w-full overflow-hidden">
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Control de volumen */}
            <div className="absolute bottom-8 left-8 z-20">
              <button
                onClick={toggleMute}
                className="group relative"
                aria-label={videoMuted ? "Activar sonido" : "Silenciar"}
              >
                {videoMuted && showUnmuteHint && (
                  <div className="absolute inset-0 rounded-full bg-white/30 pulse-ring" />
                )}
                
                <div className="relative flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300">
                  {videoMuted ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                  
                  <span className="text-sm font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {videoMuted ? 'Activar audio' : 'Silenciar'}
                  </span>
                </div>
              </button>
            </div>
          </>
        ) : imagenPrincipal ? (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imagenPrincipal})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* Contenido centrado */}
        <div className="relative h-full flex flex-col items-center justify-center px-8">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-normal text-white text-center tracking-tight mb-6" style={{ fontWeight: 400 }}>
            {modelo}
          </h1>
          
          {/* Precio */}
          <div className="flex items-center gap-4 text-white/80">
            <div className="text-lg md:text-xl font-light tracking-wider">
              Desde ${precioFormateado}
            </div>
            {precioUsdFormateado && (
              <>
                <span className="text-white/40">•</span>
                <div className="text-lg md:text-xl font-light tracking-wider">
                  USD ${precioUsdFormateado}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <div className="text-xs text-white/70 uppercase tracking-widest">Explorar</div>
            <svg className="w-6 h-6 text-white/70 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 2: GALERÍA SALTEADAS (3 IMÁGENES) */}
      {/* ============================================ */}
      {imagenesSalteadas.length >= 3 && (
        <section ref={parallaxSectionRef} className="fade-in-section relative py-32 md:py-48 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            {/* Header */}
            <div className="text-center mb-24">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">
                Diseño
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Pensado para vos y tu familia
              </h2>
            </div>

            {/* Layout Zigzag - 3 imágenes */}
            <div className="relative space-y-0">
              {/* Imagen 1 - Izquierda arriba */}
              <div className="relative z-10 w-full md:w-2/3 lg:w-1/2">
                <div className="staggered-image rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={imagenesSalteadas[0].url}
                    alt={`${modelo} - Vista 1`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Imagen 2 - Derecha centro (con parallax) - Superposición 10% */}
              <div 
                className="relative z-20 w-full md:w-2/3 lg:w-1/2 ml-auto -mt-[10%]"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
              >
                <div className="staggered-image rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={imagenesSalteadas[1].url}
                    alt={`${modelo} - Vista 2`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Imagen 3 - Izquierda abajo - Superposición 10% */}
              <div className="relative z-10 w-full md:w-2/3 lg:w-1/2 -mt-[10%]">
                <div className="staggered-image rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={imagenesSalteadas[2].url}
                    alt={`${modelo} - Vista 3`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SECCIÓN 3: EQUIPAMIENTO CON FONDO */}
      {/* ============================================ */}
      {caracteristicas.length > 0 && (
        <section id="equipamiento" className="relative min-h-screen w-full overflow-hidden py-24 md:py-32">
          {/* Imagen de fondo */}
          {imagenesSalteadas[1]?.url ? (
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imagenesSalteadas[1].url})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
          )}

          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Contenido */}
          <div className="relative h-full flex items-center justify-center px-8">
            <div className="max-w-6xl w-full">
              <div className="text-center mb-16">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Equipamiento
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Todo lo que necesitás
                </h2>
                <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto">
                  Tecnología, seguridad y confort para cada viaje
                </p>
              </div>

              {/* Grid de características con backdrop-blur */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {caracteristicas.map((carac, index) => (
                  <div 
                    key={carac.id || index}
                    className="flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.02}s` }}
                  >
                    {/* Checkmark */}
                    <svg className="flex-shrink-0 w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    
                    {/* Texto */}
                    <span className="text-sm md:text-base text-white font-light">
                      {carac.nombre || carac}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SECCIÓN 4: GALERÍA GENERAL CON COLORES */}
      {/* ============================================ */}
      <section className="fade-in-section bg-black py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          {/* Selector de colores */}
          {colores.length > 0 && (
            <div className="mb-20">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-8 text-center">
                Colores Disponibles
              </h3>
              
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

          {/* Galería de imágenes */}
          {imagenesOrdenadas.length > 0 ? (
            <div className="space-y-12">
              {/* Header de galería */}
              <div className="text-center space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
                  Galería
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Conocelo en detalle
                </h2>
              </div>

              {/* Grid de imágenes - 2 por fila (estilo Porsche) */}
              <div className="grid md:grid-cols-2 gap-8">
                {imagenesOrdenadas.slice(0, 2).map((imagen, index) => (
                  <div
                    key={imagen.id}
                    className="gallery-image-wrapper aspect-[16/10] rounded-lg"
                    onClick={() => setModalImage(imagen.url)}
                  >
                    <img
                      src={imagen.url}
                      alt={`${modelo} - Vista ${index + 1}`}
                      className="gallery-image w-full h-full object-cover rounded-lg"
                    />
                    
                    {/* Icono de expandir en hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Imágenes expandidas */}
              {showAllImages && imagenesOrdenadas.length > 2 && (
                <div className="expanded-images grid md:grid-cols-2 gap-8">
                  {imagenesOrdenadas.slice(2).map((imagen, index) => (
                    <div
                      key={imagen.id}
                      className="gallery-image-wrapper aspect-[16/10] rounded-lg"
                      onClick={() => setModalImage(imagen.url)}
                    >
                      <img
                        src={imagen.url}
                        alt={`${modelo} - Vista ${index + 3}`}
                        className="gallery-image w-full h-full object-cover rounded-lg"
                      />
                      
                      {/* Icono de expandir en hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Botón Ver más / Ver menos */}
              {imagenesOrdenadas.length > 2 && (
                <div className="text-center pt-8">
                  <button
                    onClick={() => setShowAllImages(!showAllImages)}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full text-white transition-all duration-300"
                  >
                    <span className="text-sm font-bold uppercase tracking-wider">
                      {showAllImages ? 'Ver menos' : `Ver más (${imagenesOrdenadas.length - 2} imágenes)`}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${showAllImages ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24 text-white/60 text-xl">
              No hay imágenes disponibles para este color
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 5: STATEMENT SECTION */}
      {/* ============================================ */}
      {imagenesOrdenadas.length > 0 && (
        <section className="fade-in-section relative h-screen">
          {/* Imagen de fondo con parallax */}
          <div 
            className="statement-parallax absolute inset-0"
            style={{ 
              backgroundImage: `url(${imagenesOrdenadas[Math.floor(imagenesOrdenadas.length / 2)]?.url || imagenPrincipal})`
            }}
          />
          
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Contenido centrado */}
          <div className="relative h-full flex items-center justify-center px-8">
            <div className="max-w-4xl text-center space-y-8">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
                {modelo}
              </div>
              
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                Aventura y <br/>
                <span className="text-gray-300">confiabilidad</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                Diseñado para acompañarte en cada viaje, con la tecnología 
                y seguridad que vos y tu familia merecen.
              </p>
              
              {/* Stats pequeños */}
              {specs.length > 0 && (
                <div className="flex justify-center gap-12 pt-8">
                  {specs.slice(0, 3).map((spec, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                        {spec.value}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {spec.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SECCIÓN 6: ESPECIFICACIONES COMPACTAS */}
      {/* ============================================ */}
      {specs.length > 0 && (
        <section className="fade-in-section py-20 md:py-24 px-8 md:px-16 bg-black border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">
                Performance
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Detalles Técnicos
              </h2>
            </div>

            {/* Grid compacto de especificaciones - CENTRADO */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '3rem', maxWidth: 'fit-content' }}>
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="spec-card text-center space-y-3 flex flex-col items-center"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Icono */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      spec.highlight
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white'
                    }`}>
                      <div className="w-6 h-6">
                        {spec.icon}
                      </div>
                    </div>

                    {/* Label */}
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {spec.label}
                    </div>

                    {/* Value */}
                    <div className="text-xl md:text-2xl font-bold text-white">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SECCIÓN 7: VIDEO FULLSCREEN SIN TEXTO */}
      {/* ============================================ */}
      {video2Url && (
        <section className="relative h-screen w-full overflow-hidden">
          {/* Video de fondo */}
          <video
            ref={video2Ref}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={video2Url} type="video/mp4" />
          </video>

          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Control de volumen */}
          <div className="absolute bottom-8 left-8 z-20">
            <button
              onClick={toggleMute2}
              className="group relative"
              aria-label={video2Muted ? "Activar sonido" : "Silenciar"}
            >
              <div className="relative flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300">
                {video2Muted ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
                
                <span className="text-sm font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {video2Muted ? 'Activar audio' : 'Silenciar'}
                </span>
              </div>
            </button>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SECCIÓN 8: CTA FINAL */}
      {/* ============================================ */}
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
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 leading-tight">
            Hacé que sea tuyo
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light mb-16 max-w-2xl mx-auto">
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

      {/* ============================================ */}
      {/* MODAL DE IMAGEN AMPLIADA */}
      {/* ============================================ */}
      {modalImage && (
        <div 
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setModalImage(null)}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setModalImage(null)}
            className="absolute top-8 right-8 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all duration-300"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Imagen */}
          <div 
            className="modal-content max-w-7xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage}
              alt={`${modelo} - Vista ampliada`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Hint para cerrar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-sm text-white/70 uppercase tracking-wider">
              Presiona ESC o haz clic fuera para cerrar
            </p>
          </div>
        </div>
      )}

      {/* DEBUG */}
      {/*{process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md text-green-400 px-4 py-3 rounded-xl shadow-2xl text-xs font-mono z-50 border border-white/20">
          <div className="font-bold text-green-300 mb-2 pb-2 border-b border-white/20">
            🎨 Template03 Dynamic
          </div>
          <div className="space-y-1">
            <div>Color: <span className="text-white font-bold">{colorSeleccionado || 'todas'}</span></div>
            <div>Expandido: <span className="text-white font-bold">{showAllImages ? 'Sí' : 'No'}</span></div>
            <div>Modal: <span className="text-white font-bold">{modalImage ? 'Abierto' : 'Cerrado'}</span></div>
            <div>Parallax: <span className="text-white font-bold">{parallaxOffset.toFixed(1)}px</span></div>
            <div>Videos: <span className="text-white font-bold">{videos.length}</span></div>
            <div>Imágenes: <span className="text-white font-bold">{imagenesOrdenadas.length}</span></div>
          </div>
        </div>
      )}*/}
    </div>
  );
}