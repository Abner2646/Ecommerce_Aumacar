// /src/pages/public/Home.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { marcasApi } from '../../api/marcas.api';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, MapPin, Mail, Users } from 'lucide-react';
import ClientesCercanos from '../../components/public/ClientesCercanos';
import heroVideo from '../../assets/videos/Subaru Forester e-Boxer HEV 2026.mp4';
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
// /src/pages/public/Home.jsx

// Componente para renderizar las marcas dinámicamente
function BrandCards() {
  const { t } = useTranslation();
  const [marcas, setMarcas] = useState([]);
  
  useEffect(() => {
    marcasApi.getAll().then(res => {
      setMarcas(res.marcas || []);
    });
  }, []);

  return marcas.map(marca => (
    <a
      key={marca.id}
      href={`/marca/${marca.slug}`}
      className="lnd-brand-card w-full max-w-[95vw] h-[100px] md:max-w-[700px] md:min-h-[400px] md:aspect-[16/7] mx-auto group"
      onMouseEnter={e => {
        const video = e.currentTarget.querySelector('.brand-video');
        const img = e.currentTarget.querySelector('.brand-img');
        if (video) {
          video.style.display = 'block';
          video.play();
          video.style.transform = 'scale(1.08)';
          video.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
        }
        if (img) {
          img.style.display = 'none';
        }
      }}
      onMouseLeave={e => {
        const video = e.currentTarget.querySelector('.brand-video');
        const img = e.currentTarget.querySelector('.brand-img');
        if (video) {
          video.pause();
          video.currentTime = 0;
          video.style.display = 'none';
          video.style.transform = 'scale(1)';
        }
        if (img) {
          img.style.display = 'block';
        }
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <img
          src={marca.fotoPresentacion}
          alt={marca.nombre}
          className="w-full h-full object-cover brand-img"
          style={{ filter: 'saturate(1.1)', display: 'block', position: 'absolute', inset: 0, transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
        />
        {marca.videoPresentacion && (
          <video
            className="w-full h-full object-cover brand-video"
            style={{ filter: 'saturate(1.1)', position: 'absolute', inset: 0, display: 'none', transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
            src={marca.videoPresentacion}
            muted
            playsInline
            loop
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20"></div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end p-3 md:p-12">
        <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4">
          {marca.nombre}
        </h3>
        <p className="text-sm md:text-xl text-white/90 mb-4 md:mb-8 leading-relaxed line-clamp-2">
          {marca.descripcion}
        </p>
        <div className="flex flex-row items-center gap-1 md:gap-2 text-white font-semibold">
          <span className="text-base md:text-lg">{t('home.brands.btnExploreModels')}</span>
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </a>
  ));
}

const Home = () => {
  const { t } = useTranslation();
  
  // Ref para la sección de contacto
  const contactoRef = React.useRef(null);

  // Handler para scroll desde la navbar
  React.useEffect(() => {
    // Escucha el evento personalizado 'scrollToContacto'
    const handler = () => {
      if (contactoRef.current) {
        const y = contactoRef.current.getBoundingClientRect().top + window.pageYOffset + 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    window.addEventListener('scrollToContacto', handler);
    return () => window.removeEventListener('scrollToContacto', handler);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section Premium */}
      <section className="relative min-h-screen flex items-center justify-center bg-gray-900">
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
            src={heroVideo}
            autoPlay
            muted
            playsInline
            className="w-screen h-screen object-cover object-center block bg-black brightness-[.8] contrast-[1.1] mobile-video-fix"
            style={{}}
          />
          {/* Overlay gradiente y blur laterales mobile */}
          <div className="cns-hero-overlay pointer-events-none z-10"></div>
          <div className="pointer-events-none z-20 absolute inset-0 hidden md:block" style={{background: 'linear-gradient(90deg,rgba(0,0,0,0.25) 0%,rgba(0,0,0,0) 20%,rgba(0,0,0,0) 80%,rgba(0,0,0,0.25) 100%)'}}></div>
          <div className="pointer-events-none z-20 absolute inset-0 md:hidden flex">
            <div className="w-1/6 h-full bg-gradient-to-r from-black/60 via-transparent to-transparent blur-sm"></div>
            <div className="flex-1"></div>
            <div className="w-1/6 h-full bg-gradient-to-l from-black/60 via-transparent to-transparent blur-sm"></div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .mobile-video-fix {
                object-position: center 40%!important;
                transform: scale(0.97) scaleY(1.10);
              }
            }
          `}</style>
          <div className="cns-hero-overlay"></div>
        </div>
        
        <div className="relative z-10 cns-container text-center px-4 md:px-8">
          <span className="cns-pill-badge">{t('home.hero.badge')}</span>
          <h1 className="text-[2.7rem] md:text-[3.6rem] font-bold text-white mb-6 text-balance leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-8">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-[#2d2d2d] text-white rounded-lg border-2 border-white/20 hover:bg-[#3d3d3d] transition-all duration-300 text-base group"
              onClick={() => {
                const marcas = document.getElementById('marcas');
                if (marcas) {
                  const y = marcas.getBoundingClientRect().top + window.pageYOffset + 120;
                  smoothScrollTo(y);
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:scale-130 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{t('home.hero.btnExploreBrands')}</span>
              </div>
            </button>
            <a 
              href="https://wa.me/5492914277849" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-6 py-3 bg-[#2d2d2d] text-white rounded-lg border-2 border-white/20 hover:bg-[#3d3d3d] transition-all duration-300 text-base group"
            >
              <MessageCircle size={24} className="group-hover:scale-130 transition-transform" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{t('home.hero.btnWhatsApp')}</span>
                <span className="text-sm font-normal">{t('home.hero.btnWhatsAppSubtitle')}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Brand Selection Section Premium */}
      <section id="marcas" className="cns-section">
        <div className="cns-container">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            {t('home.brands.title')}
          </h2>
          <div className="lnd-brand-selector grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Render dinámico de marcas */}
            <BrandCards />
          </div>
        </div>
      </section>

      <ClientesCercanos />

      {/* Features Section Premium */}
      <section className="cns-section bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="cns-container">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="cns-pill-badge mb-6">{t('home.features.badge')}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('home.features.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('home.features.subtitle')}
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
                {t('home.features.warranty.title')}
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {t('home.features.warranty.description')}
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
                {t('home.features.financing.title')}
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {t('home.features.financing.description')}
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
                {t('home.features.service.title')}
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {t('home.features.service.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Premium */}
      <section ref={contactoRef} id="contacto" className="relative cns-section min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
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
                  {t('home.cta.badge')}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {t('home.cta.title')}
                <br/>
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {t('home.cta.titleHighlight')}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
                {t('home.cta.subtitle')}
                <br className="hidden sm:block" />
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button
                  type="button"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-104 transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto justify-center"
                  onClick={() => {
                    const marcas = document.getElementById('marcas');
                    if (marcas) {
                      const y = marcas.getBoundingClientRect().top + window.pageYOffset + 120;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                >
                  <span>{t('home.cta.btnExploreCatalog')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:scale-[2] transition-transform" />
                </button>
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
                    <div className="text-sm text-white/60 font-medium">{t('home.hero.btnWhatsApp')}</div>
                    <div className="text-white font-semibold">{t('home.cta.contactOptions.whatsapp')}</div>
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
                    <div className="text-sm text-white/60 font-medium">{t('home.cta.contactOptions.location')}</div>
                    <div className="text-white font-semibold">{t('home.cta.contactOptions.locationName')}</div>
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
                    <div className="text-white font-semibold">{t('home.cta.contactOptions.email')}</div>
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