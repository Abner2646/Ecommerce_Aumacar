// /src/components/layout/Footer.jsx
import React from 'react';
import useMarcasFooter from '../../hooks/useMarcasFooter';
import { Instagram, Facebook, MapPin, Phone, MessageCircle } from 'lucide-react';
import '../../styles/Footer.css';

const Footer = () => {
  const marcas = useMarcasFooter();
  return (
    <footer className="cns-footer">
      <div className="cns-container">
        <div className="cns-footer-grid">
          {/* COLUMNA 1: Logo y Redes */}
          <div className="cns-footer-column">
            <div className="cns-footer-logo-area">
              <p className="text-2xl md:text-3xl text-white font-bold mt-2">
                aumacar S.R.L.
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mt-6">
              Tu concesionaria de confianza en Bahía Blanca. Excelencia automotriz desde hace más de 20 años.
            </p>
            {/* Redes Sociales */}
            <div className="cns-footer-socials">
              <a 
                href="https://www.instagram.com/subarusuzukibahia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cns-social-link"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a 
                href="https://www.facebook.com/subarusuzukibahia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cns-social-link"
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
          {/* COLUMNA 2: Navegación Rápida */}
          <div className="cns-footer-column">
            <h3 className="cns-footer-heading">Navegación</h3>
            <ul className="cns-footer-links">
              <li>
                <a href="/" className="cns-footer-link">
                  Inicio
                </a>
              </li>
              {marcas.map(marca => (
                <li key={marca.id}>
                  <a href={`/marca/${marca.slug}`} className="cns-footer-link">
                    {marca.nombre}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contacto" className="cns-footer-link">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: Contacto */}
          <div className="cns-footer-column">
            <h3 className="cns-footer-heading">Contacto</h3>
            
            <div className="cns-footer-contact-list">
              {/* Teléfono */}
              <a 
                href="tel:02914517000" 
                className="cns-footer-contact-item group"
              >
                <Phone className="cns-footer-icon group-hover:text-white" size={18} />
                <span className="text-gray-400 text-sm font-medium transition-colors">
                  0291-4517000
                </span>
              </a>

              {/* Whatsapp */}
              <a 
                href="https://wa.me/5492914277849" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cns-footer-contact-item group"
              >
                <MessageCircle className="cns-footer-icon group-hover:text-white" size={18} />
                <span className="text-gray-400 text-sm font-medium transition-colors">
                  291-4277849
                </span>
              </a>

              {/* Dirección - ahora es un enlace a Google Maps */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Alvarado+802,+Bahía+Blanca,+B8000"
                target="_blank"
                rel="noopener noreferrer"
                className="cns-footer-contact-item group"
                aria-label="Ver ubicación en Google Maps"
              >
                <MapPin className="cns-footer-icon group-hover:text-white" size={18} />
                <div className="text-left">
                  <p className="text-gray-400 text-sm font-medium">Alvarado 802</p>
                  <p className="text-gray-400 text-sm font-medium">Bahía Blanca, B8000</p>
                </div>
              </a>
            </div>
          </div>

          {/* COLUMNA 4: Horarios */}
          <div className="cns-footer-column">
            <h3 className="cns-footer-heading">Horarios</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Lunes a Viernes</p>
                <p className="text-gray-500 text-sm">9:00 - 18:00</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Sábados</p>
                <p className="text-gray-500 text-sm">9:00 - 13:00</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Domingos</p>
                <p className="text-gray-500 text-sm">Cerrado</p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright / Bottom Bar Premium */}
        <div className="cns-footer-bottom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright text removed as per request */}
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#privacidad" className="hover:text-gray-300 transition-colors">
                Política de Privacidad
              </a>
              <a href="#terminos" className="hover:text-gray-300 transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;