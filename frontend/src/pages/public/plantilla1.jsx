import React, { useState, useRef, useEffect } from 'react';
import { useVehiculos } from '../../hooks/useVehiculos';
import '../../styles/pages/plantilla1.css';
import { MessageCircle } from 'lucide-react';
import { Users, ArrowRight, Phone, MapPin, Mail } from 'react-feather';
// Scroll suave y lento a una posición Y
function smoothScrollTo(targetY, duration = 1200) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;
  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    window.scrollTo(0, startY + distance * progress);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

function Plantilla1({ marca }) {
  const { data, isLoading, error } = useVehiculos({ marcaId: marca?.id });
  const modelos = data?.vehiculos || [];

  // Corrección: hooks para tabs y contacto
  const [activeTab, setActiveTab] = useState('all');
  const contactoRef = useRef(null);
  const ultimaSectionRef = useRef(null);

  useEffect(() => {
    const handleScrollToContacto = (e) => {
      if (ultimaSectionRef.current) {
        const y = ultimaSectionRef.current.getBoundingClientRect().top + window.pageYOffset + 50;
        smoothScrollTo(y);
      }
    };
    window.addEventListener('scrollToContacto', handleScrollToContacto);
    return () => window.removeEventListener('scrollToContacto', handleScrollToContacto);
  }, []);

  const caracteristicas = [
    {
      titulo: 'Tecnología Híbrida',
      descripcion: 'Sistemas híbridos avanzados que combinan eficiencia y rendimiento.'
    },
    {
      titulo: 'Symmetrical AWD',
      descripcion: 'Tracción Integral Simétrica que brinda mayor estabilidad, control y confianza en todo momento.'
    },
    {
      titulo: 'Seguridad Total',
      descripcion: 'Equipados con los sistemas de seguridad activa y pasiva más avanzados del mercado.'
    },
    {
      titulo: 'Diseño Japonés',
      descripcion: 'Estética funcional que combina tradición japonesa con modernidad contemporánea.'
    }
  ];

  return (
    <main className="bg-white plantilla1-root">
      
      {/* ==================== HERO SECTION PREMIUM ==================== */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0 overflow-hidden" style={{maxHeight: '700px', maxWidth: '100vw'}}>
          <video
            src={marca?.videoPortada}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100vw',
              height: '700px',
              objectFit: 'cover',
              objectPosition: 'center',
              maxWidth: '100vw',
              maxHeight: '700px',
              display: 'block',
              background: '#000'
            }}
          />
          <div className="cns-hero-overlay"></div>
        </div>

        <div className="relative z-10 cns-container px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="cns-pill-badge">Performance & Eficiencia</span>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {marca?.nombre}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
              La mas alta eficiencia y una tracción total <br></br>para una confianza total.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-3 bg-[#2d2d2d] text-white rounded-lg border-2 border-white/20 hover:bg-[#3d3d3d] transition-all duration-300 text-base group"
                onClick={() => {
                  const section = document.getElementById('mas-vendidos');
                  if (section) {
                    const y = section.getBoundingClientRect().top + window.pageYOffset + 85;
                    smoothScrollTo(y);
                  }
                }}
              >
                {/* Lupa Lucide */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:scale-130 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Explorar Modelos</span>
                </div>
              </button>
              <a 
                href="https://wa.me/5492914277849" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-6 py-3 bg-[#2d2d2d] text-white rounded-lg border-2 border-white/20 hover:bg-[#3d3d3d] transition-all duration-300 text-base group"
              >
                <MessageCircle size={24} className="group-hover:scale-130 transition-transform" />
                {/* Solo el ícono crece en hover */}
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">WhatsApp</span>
                  <span className="text-sm font-normal">Consulta rápida</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MODELOS DESTACADOS PREMIUM ==================== */}
      <section className="cns-section" id="mas-vendidos">
        <div className="cns-container">
          <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mas vendidos en 2025
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Descubre vehículos diseñados para cada aventura, desde la ciudad hasta el off-road
            </p>
          </div>

          <div className="cns-vehicle-grid">
            {isLoading && <div>Cargando autos...</div>}
            {error && <div>Error al cargar autos</div>}
            {modelos.filter(m => m.destacado).map((modelo) => (
              <article key={modelo.id} className="cns-vehicle-card" onClick={() => window.location.href = `/vehiculo/${modelo.slug}`} style={{cursor: 'pointer'}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={modelo.imagenes?.[0]?.url || modelo.imagen || 'https://via.placeholder.com/400x300'}
                    alt={modelo.modelo}
                    className="cns-card-image w-full aspect-[4/3] object-cover"
                  />
                  <div className="cns-badge">
                    {modelo.categoria}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {modelo.modelo}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed min-h-[3rem]">
                    {modelo.version || modelo.descripcion || ''}
                  </p>
                  <div className="cns-specs-grid pt-4 border-t border-gray-200">
                    <div className="cns-spec-item">
                      <span className="block mb-1">Motor</span>
                      <span className="cns-spec-value">{modelo.motor}</span>
                    </div>
                    <div className="cns-spec-item">
                      <span className="block mb-1">Potencia</span>
                      <span className="cns-spec-value">{modelo.potencia || '-'}</span>
                    </div>
                    <div className="cns-spec-item">
                      <span className="block mb-1">Consumo</span>
                      <span className="cns-spec-value">{modelo.consumo || '-'}</span>
                    </div>
                    <div className="cns-spec-item">
                      <span className="block mb-1">Transmisión</span>
                      <span className="cns-spec-value">{modelo.transmision || '-'}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Desde</span>
                      <span className="cns-price text-2xl md:text-3xl font-bold">
                        ${Number(modelo.precio).toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <button className="cns-btn-secondary">
                      Ver Detalles →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PARALLAX SECTION PREMIUM ==================== */}
      <section className="cns-parallax">
        <div className="cns-parallax-bg" style={{ backgroundImage: `url(${marca?.fotoDelMedio})` }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40"></div>
        
        <div className="cns-container relative z-10 flex items-center min-h-[400px] md:min-h-[500px] py-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Diseñado para<br />cualquier terreno
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
                {marca?.nombre} se adapta a cada camino para brindarte seguridad, estabilidad y confianza, acompañándote en cada destino, sin importar las condiciones.
            </p>
            <button
              className="cns-btn-primary px-8 py-4"
              onClick={() => {
                const section = document.getElementById('caracteristicas');
                if (section) {
                  const y = section.getBoundingClientRect().top + window.pageYOffset + 10;
                  smoothScrollTo(y);
                }
              }}
            >
              Conoce {marca?.nombre}
            </button>
          </div>
        </div>
      </section>

      {/* ==================== CARACTERÍSTICAS PREMIUM ==================== */}
      <section className="cns-section bg-gray-50" id="caracteristicas">
        <div className="cns-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tecnología {marca?.nombre}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Innovación que marca la diferencia en cada kilómetro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {caracteristicas.map((feature, index) => (
              <div key={index} className="cns-feature-card text-center">
                <div className="cns-icon-container mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                    {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
                    {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />}
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  {feature.titulo}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {feature.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LÍNEA COMPLETA PREMIUM ==================== */}
      <section className="cns-section">
        <div className="cns-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Línea Completa {marca?.nombre}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Encuentra el {marca?.nombre} perfecto para ti
            </p>
          </div>

          {/* Tabs Premium */}
          <div className="flex justify-center gap-2 mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-8 py-4 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === 'all'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Todos los Modelos
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-8 py-4 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === 'specs'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Especificaciones
            </button>
          </div>

          {/* Tab Content - Galería */}
          {activeTab === 'all' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {isLoading && <div>Cargando autos...</div>}
              {error && <div>Error al cargar autos</div>}
              {modelos.map((modelo) => (
                <div key={modelo.id} className="cns-vehicle-card group" style={{cursor: 'pointer'}} onClick={() => window.location.href = `/vehiculo/${modelo.slug}`}> 
                  <div className="relative overflow-hidden">
                    <img 
                      src={modelo.imagenes?.[0]?.url || modelo.imagen || 'https://via.placeholder.com/400x300'}
                      alt={modelo.modelo}
                      className="cns-card-image w-full aspect-[4/3] object-cover"
                    />
                    <div className="cns-badge">
                      {modelo.categoria}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {modelo.modelo}
                    </h3>
                    <p className="text-base text-gray-600 mb-4 leading-relaxed min-h-[3rem]">
                      {modelo.version || modelo.descripcion || ''}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <span className="text-sm text-gray-500 block">Desde</span>
                        <span className="text-2xl font-bold text-gray-900">
                          ${modelo.precio}
                        </span>
                      </div>
                      <span className="text-base text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                        Ver más →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content - Especificaciones */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              {modelos.map((modelo) => (
                <div key={modelo.id} className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-3">
                      <img 
                        src={modelo.imagenes?.[0]?.url || modelo.imagen || 'https://via.placeholder.com/400x300'}
                        alt={modelo.modelo || modelo.nombre || 'Vehículo'}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {modelo.modelo || modelo.nombre}
                      </h3>
                      <span className="text-sm text-gray-500 font-medium">{modelo.categoria}</span>
                    </div>
                    <div className="lg:col-span-4">
                      <div className="cns-specs-grid">
                        <div className="cns-spec-item">
                          <span className="block mb-1">Motor</span>
                          <span className="cns-spec-value">{modelo.specs?.motor || modelo.motor || '-'}</span>
                        </div>
                        <div className="cns-spec-item">
                          <span className="block mb-1">Potencia</span>
                          <span className="cns-spec-value">{modelo.specs?.potencia || modelo.potencia || '-'}</span>
                        </div>
                        <div className="cns-spec-item">
                          <span className="block mb-1">Consumo</span>
                          <span className="cns-spec-value">{modelo.specs?.consumo || modelo.consumo || '-'}</span>
                        </div>
                        <div className="cns-spec-item">
                          <span className="block mb-1">Transmisión</span>
                          <span className="cns-spec-value">{modelo.specs?.transmision || modelo.transmision || '-'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 text-center lg:text-right">
                      <span className="text-sm text-gray-500 block mb-1">Desde</span>
                      <span className="text-2xl font-bold text-gray-900 block mb-4">
                        ${modelo.precio}
                      </span>
                      <button className="cns-btn-secondary w-full lg:w-auto">
                        Más Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section Premium */}
      {/* ...existing code... */}
      {/* Última sección antes del footer */}
      <section ref={ultimaSectionRef} className="relative cns-section min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

        <div className="cns-container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Content */}
            <div className="text-center mb-12 md:mb-16">
              {/* Heading y descripción nuevos */}
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                Agenda tu Test Drive {marca?.nombre ? `de ${marca.nombre}` : ''}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
                Experimenta la diferencia {marca?.nombre}. Visita nuestro concesionario y descubre 
                por qué millones de conductores confían en nosotros.
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <a 
                  href="https://wa.me/5492914277849" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-104 transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto justify-center"
                >
                  <span>Agendar ahora</span>
                  <ArrowRight className="w-5 h-5 group-hover:scale-[2] transition-transform" />
                </a>
                <a 
                  href="https://wa.me/5492914277849" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg transition-all duration-300 w-full sm:w-auto justify-center hover:scale-104"
                >
                  <Phone className="w-5 h-5 group-hover:scale-150 transition-transform" />
                  <span>(291) 427-7849</span>
                </a>
              </div>

              {/* Contact Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12 border-t border-white/20">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/5492914277849" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <MessageCircle className="w-6 h-6 text-white group-hover:scale-180 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm text-white/60 font-medium">WhatsApp</div>
                    <div className="text-white font-semibold">Consulta rápida</div>
                  </div>
                </a>

                {/* Dirección */}
                <a 
                  href="https://www.google.com/maps?q=Alvarado+802,+B8000+Bah%C3%ADa+Blanca,+Provincia+de+Buenos+Aires" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <MapPin className="w-6 h-6 text-white group-hover:scale-150 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm text-white/60 font-medium">Visitanos</div>
                    <div className="text-white font-semibold">Bahía Blanca</div>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ventasaumacar@gmail.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Mail className="w-6 h-6 text-white group-hover:scale-150 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm text-white/60 font-medium">Email</div>
                    <div className="text-white font-semibold">Escríbenos</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Plantilla1;
