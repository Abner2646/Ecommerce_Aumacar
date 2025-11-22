import React from 'react';

const SuzukiHome = () => {
  const modelos = [
    {
      id: 1,
      nombre: 'Swift',
      categoria: 'Hatchback',
      descripcion: 'Diseño audaz con tecnología híbrida y máxima eficiencia',
      precio: '$24.990',
      imagen: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      nombre: 'Vitara',
      categoria: 'SUV Compacto',
      descripcion: 'SUV compacto con tecnología ALLGRIP y diseño robusto',
      precio: '$32.990',
      imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      nombre: 'Jimny',
      categoria: '4x4',
      descripcion: 'Icónico 4x4 compacto para aventuras sin límites',
      precio: '$38.990',
      imagen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="cns-hero relative h-screen">
        {/* Video/Imagen de fondo */}
        <div className="cns-media-container">
          <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&h=1080&fit=crop"
            alt="Suzuki Hero"
            className="w-full h-full object-cover"
          />
          <div className="cns-overlay"></div>
        </div>

        {/* Contenido Hero */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-6">
            <h1 className="szk-hero-title text-hero-mobile lg:text-hero-desktop text-white mb-6">
              Suzuki
            </h1>
            <p className="szk-body text-body-mobile lg:text-body-desktop text-white/90 mb-8 max-w-2xl mx-auto">
              Innovación, confiabilidad y diseño que se adapta a tu estilo de vida
            </p>
            <button className="cns-btn-primary">
              Explorar Modelos
            </button>
          </div>
        </div>
      </section>

      {/* ==================== MODELOS DESTACADOS ==================== */}
      <section className="cns-section bg-gray-50">
        <div className="cns-container">
          {/* Header de Sección */}
          <div className="text-center mb-16">
            <h2 className="szk-heading text-h1-mobile lg:text-h1-desktop text-gray-900 mb-4">
              Nuestros Modelos
            </h2>
            <p className="szk-body text-body-mobile lg:text-body-desktop text-gray-600 max-w-2xl mx-auto">
              Descubre la gama completa de vehículos Suzuki diseñados para cada aventura
            </p>
          </div>

          {/* Grid de Vehículos */}
          <div className="cns-vehicle-grid">
            {modelos.map((modelo) => (
              <article key={modelo.id} className="cns-vehicle-card">
                {/* Imagen del vehículo */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img 
                    src={modelo.imagen}
                    alt={modelo.nombre}
                    className="cns-card-image w-full h-64 object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                    {modelo.categoria}
                  </span>
                </div>

                {/* Información del vehículo */}
                <div className="space-y-4">
                  <h3 className="szk-heading text-h2-mobile lg:text-h2-desktop text-gray-900">
                    {modelo.nombre}
                  </h3>
                  
                  <p className="szk-body text-body-mobile text-gray-600">
                    {modelo.descripcion}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-small text-gray-400 block">Desde</span>
                      <span className="szk-heading text-2xl text-gray-900">
                        {modelo.precio}
                      </span>
                    </div>
                    <button className="cns-btn-secondary">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CARACTERÍSTICAS DESTACADAS ==================== */}
      <section className="cns-section bg-white">
        <div className="cns-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Imagen */}
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop"
                alt="Tecnología Suzuki"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Contenido */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="szk-heading text-h1-mobile lg:text-h1-desktop text-gray-900">
                Tecnología que te Impulsa
              </h2>
              
              <p className="szk-body text-body-mobile lg:text-body-desktop text-gray-600">
                Cada Suzuki está equipado con tecnología de vanguardia diseñada para brindarte 
                la mejor experiencia de conducción, seguridad y eficiencia.
              </p>

              <div className="space-y-4">
                {[
                  {
                    titulo: 'Sistema Híbrido',
                    descripcion: 'Eficiencia sin comprometer el rendimiento'
                  },
                  {
                    titulo: 'ALLGRIP 4x4',
                    descripcion: 'Tracción inteligente para cualquier terreno'
                  },
                  {
                    titulo: 'Seguridad Total',
                    descripcion: 'Sistemas avanzados de asistencia al conductor'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="szk-heading text-lg text-gray-900 mb-1">
                        {feature.titulo}
                      </h4>
                      <p className="szk-body text-small text-gray-600">
                        {feature.descripcion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="cns-btn-primary mt-6">
                Conocer Más
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="cns-section bg-gray-900 text-white">
        <div className="cns-container text-center">
          <h2 className="szk-heading text-h1-mobile lg:text-h1-desktop mb-6">
            Agenda tu Test Drive
          </h2>
          
          <p className="szk-body text-body-mobile lg:text-body-desktop text-white/80 mb-10 max-w-2xl mx-auto">
            Experimenta la diferencia Suzuki. Reserva tu prueba de manejo hoy y descubre 
            por qué millones confían en nosotros.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-md font-semibold hover:opacity-90 transition-opacity duration-250">
              Agendar Ahora
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-gray-900 transition-all duration-250">
              Ver Concesionarios
            </button>
          </div>
        </div>
      </section>

      {/* ==================== GALERÍA DE IMÁGENES ==================== */}
      <section className="py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {[
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&h=600&fit=crop'
          ].map((img, index) => (
            <div key={index} className="relative overflow-hidden aspect-square">
              <img 
                src={img}
                alt={`Suzuki Gallery ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SuzukiHome;