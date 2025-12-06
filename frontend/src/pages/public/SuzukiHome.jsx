// /src/pages/public/SuzukiHome.jsx
import React, { useState } from 'react';

const SuzukiHome = () => {
  const [activeTab, setActiveTab] = useState('all');

  const modelos = [
    {
      id: 1,
      nombre: 'Swift',
      categoria: 'Hatchback',
      descripcion: 'Diseño audaz con tecnología híbrida y máxima eficiencia',
      precio: '24.990',
      imagen: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&h=600&fit=crop',
      specs: {
        motor: '1.2L Híbrido',
        potencia: '90 HP',
        consumo: '4.2 L/100km',
        transmision: 'CVT'
      }
    },
    {
      id: 2,
      nombre: 'Vitara',
      categoria: 'SUV Compacto',
      descripcion: 'SUV compacto con tecnología ALLGRIP y diseño robusto',
      precio: '32.990',
      imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
      specs: {
        motor: '1.4L Turbo',
        potencia: '140 HP',
        consumo: '5.8 L/100km',
        transmision: '6AT'
      }
    },
    {
      id: 3,
      nombre: 'Jimny',
      categoria: '4x4',
      descripcion: 'Icónico 4x4 compacto para aventuras sin límites',
      precio: '38.990',
      imagen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      specs: {
        motor: '1.5L',
        potencia: '102 HP',
        consumo: '6.4 L/100km',
        transmision: '5MT/4AT'
      }
    },
    {
      id: 4,
      nombre: 'S-Cross',
      categoria: 'Crossover',
      descripcion: 'Elegancia y versatilidad para la familia moderna',
      precio: '35.990',
      imagen: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
      specs: {
        motor: '1.4L Turbo',
        potencia: '129 HP',
        consumo: '5.3 L/100km',
        transmision: '6AT'
      }
    },
    {
      id: 5,
      nombre: 'Ignis',
      categoria: 'Urbano',
      descripcion: 'Compacto, eficiente y perfecto para la ciudad',
      precio: '21.990',
      imagen: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
      specs: {
        motor: '1.2L',
        potencia: '83 HP',
        consumo: '4.7 L/100km',
        transmision: '5MT/CVT'
      }
    },
    {
      id: 6,
      nombre: 'Baleno',
      categoria: 'Sedan',
      descripcion: 'Espacioso, elegante y eficiente para cada viaje',
      precio: '27.990',
      imagen: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&h=600&fit=crop',
      specs: {
        motor: '1.4L',
        potencia: '92 HP',
        consumo: '5.1 L/100km',
        transmision: '5MT/CVT'
      }
    }
  ];

  const caracteristicas = [
    {
      titulo: 'Tecnología Híbrida',
      descripcion: 'Sistemas híbridos avanzados que combinan eficiencia y rendimiento sin compromisos.'
    },
    {
      titulo: 'ALLGRIP 4x4',
      descripcion: 'Sistema de tracción inteligente que se adapta automáticamente a cualquier terreno.'
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
    <main className="bg-white">
      
      {/* ==================== HERO SECTION PREMIUM ==================== */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80"
            alt="Suzuki Hero"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.8) contrast(1.1)' }}
          />
          <div className="cns-hero-overlay"></div>
        </div>

        <div className="relative z-10 cns-container px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="cns-pill-badge">Performance & Eficiencia</span>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Suzuki
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
              Innovación japonesa que se adapta a tu estilo de vida
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cns-btn-primary px-8 py-4">
                Explorar Modelos
              </button>
              <button className="cns-btn-secondary bg-transparent border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-gray-900">
                Agendar Test Drive
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MODELOS DESTACADOS PREMIUM ==================== */}
      <section className="cns-section">
        <div className="cns-container">
          <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nuestra Línea 2024
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Descubre vehículos diseñados para cada aventura, desde la ciudad hasta el off-road
            </p>
          </div>

          <div className="cns-vehicle-grid">
            {modelos.slice(0, 3).map((modelo) => (
              <article key={modelo.id} className="cns-vehicle-card">
                <div className="relative overflow-hidden">
                  <img 
                    src={modelo.imagen}
                    alt={modelo.nombre}
                    className="cns-card-image w-full aspect-[4/3] object-cover"
                  />
                  <div className="cns-badge">
                    {modelo.categoria}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {modelo.nombre}
                  </h3>
                  
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed min-h-[3rem]">
                    {modelo.descripcion}
                  </p>

                  <div className="cns-specs-grid pt-4 border-t border-gray-200">
                    <div className="cns-spec-item">
                      <span className="block mb-1">Motor</span>
                      <span className="cns-spec-value">{modelo.specs.motor}</span>
                    </div>
                    <div className="cns-spec-item">
                      <span className="block mb-1">Potencia</span>
                      <span className="cns-spec-value">{modelo.specs.potencia}</span>
                    </div>
                    <div className="cns-spec-item">
                      <span className="block mb-1">Consumo</span>
                      <span className="cns-spec-value">{modelo.specs.consumo}</span>
                    </div>
                    <div className="cns-spec-item">
                      <span className="block mb-1">Transmisión</span>
                      <span className="cns-spec-value">{modelo.specs.transmision}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">Desde</span>
                      <span className="cns-price">
                        ${modelo.precio}
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
        <div className="cns-parallax-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80)' }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40"></div>
        
        <div className="cns-container relative z-10 flex items-center min-h-[400px] md:min-h-[500px] py-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Diseñado para<br />cualquier terreno
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              La tecnología ALLGRIP 4x4 te brinda control total en carretera, nieve, barro o arena. 
              Sin importar el destino, Suzuki te lleva allí.
            </p>
            <button className="cns-btn-primary px-8 py-4">
              Conocer ALLGRIP
            </button>
          </div>
        </div>
      </section>

      {/* ==================== CARACTERÍSTICAS PREMIUM ==================== */}
      <section className="cns-section bg-gray-50">
        <div className="cns-container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tecnología Suzuki
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
              Línea Completa 2024
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Encuentra el Suzuki perfecto para ti
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
              {modelos.map((modelo) => (
                <div key={modelo.id} className="cns-vehicle-card group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={modelo.imagen}
                      alt={modelo.nombre}
                      className="cns-card-image w-full aspect-[4/3] object-cover"
                    />
                    <div className="cns-badge">
                      {modelo.categoria}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {modelo.nombre}
                    </h3>
                    <p className="text-base text-gray-600 mb-4 leading-relaxed min-h-[3rem]">
                      {modelo.descripcion}
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
                        src={modelo.imagen}
                        alt={modelo.nombre}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {modelo.nombre}
                      </h3>
                      <span className="text-sm text-gray-500 font-medium">{modelo.categoria}</span>
                    </div>
                    <div className="lg:col-span-4">
                      <div className="cns-specs-grid">
                        <div className="cns-spec-item">
                          <span className="block mb-1">Motor</span>
                          <span className="cns-spec-value">{modelo.specs.motor}</span>
                        </div>
                        <div className="cns-spec-item">
                          <span className="block mb-1">Potencia</span>
                          <span className="cns-spec-value">{modelo.specs.potencia}</span>
                        </div>
                        <div className="cns-spec-item">
                          <span className="block mb-1">Consumo</span>
                          <span className="cns-spec-value">{modelo.specs.consumo}</span>
                        </div>
                        <div className="cns-spec-item">
                          <span className="block mb-1">Transmisión</span>
                          <span className="cns-spec-value">{modelo.specs.transmision}</span>
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

      {/* ==================== CTA FINAL PREMIUM ==================== */}
      <section className="cns-section bg-gray-900">
        <div className="cns-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Agenda tu Test Drive
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
              Experimenta la diferencia Suzuki. Visita nuestro concesionario y descubre 
              por qué millones de conductores confían en nosotros.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cns-btn-primary bg-white text-gray-900 px-8 py-4 hover:bg-gray-100">
                Agendar Ahora
              </button>
              <button className="cns-btn-secondary bg-transparent border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-gray-900">
                Contactar Asesor
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default SuzukiHome;