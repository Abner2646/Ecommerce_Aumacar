// /src/pages/public/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, MapPin, Mail, Users } from 'lucide-react';

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section Premium */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={el => {
              if (el) {
                el.onloadedmetadata = () => {
                  el.currentTime = 21;
                };
                el.ontimeupdate = () => {
                  if (el.currentTime >= 28) {
                    el.currentTime = 21;
                  }
                };
              }
            }}
            src={require('../../assets/videos/Subaru Forester e-Boxer HEV 2026.mp4')}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.8) contrast(1.1)' }}
          />
          <div className="cns-hero-overlay"></div>
        </div>
        
        <div className="relative z-10 cns-container text-center px-4 md:px-8">
          <span className="cns-pill-badge">Performance & Excelencia</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance leading-tight">
            Bienvenido a Aumacar
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Concesionaria oficial Subaru y Suzuki. Descubre la excelencia automotriz con las mejores marcas del mercado.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-8">
            <a 
              href="#marcas"
              className="flex items-center gap-2 px-6 py-3 bg-[#2d2d2d] text-white rounded-lg border-2 border-white/20 hover:bg-[#3d3d3d] transition-all duration-300 text-base group"
            >
              {/* Lupa Lucide */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Explorar Marcas</span>
              </div>
            </a>
            <a 
              href="https://wa.me/5492914044550" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-6 py-3 bg-[#2d2d2d] text-white rounded-lg border-2 border-white/20 hover:bg-[#3d3d3d] transition-all duration-300 text-base group"
            >
              <MessageCircle size={24} />
                            {/* Solo el ícono crece en hover */}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">WhatsApp</span>
                <span className="text-sm font-normal">Consulta rápida</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Brand Selection Section Premium */}
      <section id="marcas" className="cns-section">
        <div className="cns-container">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Selecciona tu Marca
          </h2>
          
          <div className="lnd-brand-selector">
            {/* Subaru Card */}
            <Link
              to="/subaru"
              className="lnd-brand-card"
              onMouseEnter={e => {
                const subaru = e.currentTarget.querySelector('.subaru-video');
                const img = e.currentTarget.querySelector('.subaru-img');
                if (subaru) {
                  subaru.style.display = 'block';
                  subaru.play();
                }
                if (img) {
                  img.style.display = 'none';
                }
              }}
              onMouseLeave={e => {
                const subaru = e.currentTarget.querySelector('.subaru-video');
                const img = e.currentTarget.querySelector('.subaru-img');
                if (subaru) {
                  subaru.pause();
                  subaru.currentTime = 48;
                  subaru.style.display = 'none';
                }
                if (img) {
                  img.style.display = 'block';
                }
              }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <img
                  src={require('../../assets/images/subaru-crosstrek-1849561.jpg')}
                  alt="Subaru"
                  className="w-full h-full object-cover subaru-img"
                  style={{ filter: 'saturate(1.1)', display: 'block', position: 'absolute', inset: 0 }}
                />
                <video
                  ref={el => {
                    if (el) {
                      el.onloadedmetadata = () => {
                        el.currentTime = 48;
                      };
                      el.ontimeupdate = () => {
                        if (el.currentTime >= 58) {
                          el.currentTime = 48;
                          el.pause();
                        }
                      };
                      el.style.display = 'none';
                    }
                  }}
                  src={require('../../assets/videos/Subaru Impreza Sti _ Cinematic Car Edit _ Wide Body _ Stance Nation.mp4')}
                  muted
                  playsInline
                  className="w-full h-full object-cover subaru-video"
                  style={{ filter: 'saturate(1.1)', position: 'absolute', inset: 0 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Subaru
                </h3>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  Confianza, seguridad y tecnología AWD simétrica
                </p>
                <div className="inline-flex items-center gap-2 text-white font-semibold">
                  <span className="text-lg">Explorar modelos</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Suzuki Card */}
            <Link
              to="/suzuki"
              className="lnd-brand-card"
              onMouseEnter={e => {
                const suzuki = e.currentTarget.querySelector('.suzuki-video');
                const img = e.currentTarget.querySelector('.suzuki-img');
                if (suzuki) {
                  suzuki.style.display = 'block';
                  suzuki.play();
                }
                if (img) {
                  img.style.display = 'none';
                }
              }}
              onMouseLeave={e => {
                const suzuki = e.currentTarget.querySelector('.suzuki-video');
                const img = e.currentTarget.querySelector('.suzuki-img');
                if (suzuki) {
                  suzuki.pause();
                  suzuki.currentTime = 38;
                  suzuki.style.display = 'none';
                }
                if (img) {
                  img.style.display = 'block';
                }
              }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <img
                  src={require('../../assets/images/Captura de pantalla 2025-12-03 200137.png')}
                  alt="Suzuki"
                  className="w-full h-full object-cover suzuki-img"
                  style={{ filter: 'saturate(1.1)', display: 'block', position: 'absolute', inset: 0 }}
                />
                <video
                  ref={el => {
                    if (el) {
                      el.onloadedmetadata = () => {
                        el.currentTime = 38;
                      };
                      el.ontimeupdate = () => {
                        if (el.currentTime >= 48) {
                          el.currentTime = 38;
                          el.pause();
                        }
                      };
                      el.style.display = 'none';
                    }
                  }}
                  src={require('../../assets/videos/THE CITY RALLYIST _ SUBARU WRX STI.mp4')}
                  muted
                  playsInline
                  className="w-full h-full object-cover suzuki-video"
                  style={{ filter: 'saturate(1.1)', position: 'absolute', inset: 0 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Suzuki
                </h3>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  Diseño japonés, eficiencia y tecnología híbrida
                </p>
                <div className="inline-flex items-center gap-2 text-white font-semibold">
                  <span className="text-lg">Explorar modelos</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section Premium */}
      <section className="cns-section bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="cns-container">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="cns-pill-badge mb-6">Nuestros Beneficios</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Por qué elegirnos
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Compromiso con la excelencia en cada detalle de tu experiencia automotriz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="cns-feature-card group text-center p-8 md:p-10">
              <div className="cns-icon-container mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                Garantía Oficial
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Todos nuestros vehículos cuentan con garantía de fábrica y servicio post-venta especializado
              </p>
            </div>

            {/* Feature 2 */}
            <div className="cns-feature-card group text-center p-8 md:p-10">
              <div className="cns-icon-container mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                Financiamiento
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Planes de financiamiento flexibles adaptados a tus necesidades con las mejores tasas del mercado
              </p>
            </div>

            {/* Feature 3 */}
            <div className="cns-feature-card group text-center p-8 md:p-10">
              <div className="cns-icon-container mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                Servicio Técnico
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Centro de servicio autorizado con técnicos certificados y repuestos originales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Premium */}
      <section className="relative cns-section min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

        <div className="cns-container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Content */}
            <div className="text-center mb-12 md:mb-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                <Users className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white uppercase tracking-wider">
                  Únete a nuestra familia
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                ¿Listo para la
                <br/>
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Aventura de tu Vida?
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
                Visita nuestro showroom o explora nuestro catálogo online.
                <br className="hidden sm:block" />
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <a 
                  href="#marcas" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-104 transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto justify-center"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="tel:02914517000" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg transition-all duration-300 w-full sm:w-auto justify-center hover:scale-104"
                >
                  <Phone className="w-5 h-5" />
                  <span>(0291) 451-7000</span>
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
                  <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm text-white/60 font-medium">WhatsApp</div>
                    <div className="text-white font-semibold">Consulta rápida</div>
                  </div>
                </a>

                {/* Dirección */}
                <a 
                  href="https://maps.google.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <MapPin className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm text-white/60 font-medium">Visitanos</div>
                    <div className="text-white font-semibold">Bahía Blanca</div>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:info@aumacar.com.ar" 
                  className="group flex items-center justify-center gap-3 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Mail className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
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

export default Home;
