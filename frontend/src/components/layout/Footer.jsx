// /src/components/layout/Footer.jsx
import React from 'react';
import { Instagram, Facebook, MapPin, Phone, MessageCircle } from 'lucide-react';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="cns-footer">
      <div className="cns-container">
        <div className="cns-footer-grid">
          
          {/* COLUMNA IZQUIERDA: Logo y Redes */}
          <div className="cns-footer-brand-column">
            {/* Logo Area - Reemplazar src con tu logo real */}
            <div className="cns-footer-logo-container">
              {/* Opción A: Si tienes imagen */}
              {/* <img src="/logo-blanco.png" alt="Subaru Suzuki Bahía" className="cns-footer-logo" /> */}
              
              {/* Opción B: Texto Tipográfico (Placeholder elegante) */}
              <span className="text-xs text-gray-400 uppercase tracking-widest mt-1 block">
                Concesionario Oficial
              </span>
              <h2 className="text-2xl font-bold tracking-tighter text-white">
                SUBARU <span className="text-gray-600">|</span> SUZUKI
              </h2>
            </div>

            {/* Redes Sociales (Debajo del logo) */}
            <div className="cns-footer-socials">
              <a 
                href="https://www.instagram.com/subarusuzukibahia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cns-social-link"
                aria-label="Instagram"
              >
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <a 
                href="https://www.facebook.com/subarusuzukibahia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cns-social-link"
                aria-label="Facebook"
              >
                <Facebook size={24} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* COLUMNA DERECHA: Información de Contacto */}
          <div className="cns-footer-info-column">
            
            {/* Dirección */}
            <div className="cns-footer-info-item">
              <MapPin className="cns-footer-icon" size={20} />
              <div>
                <p className="text-white font-medium">Bahía Blanca</p>
                <p className="text-gray-400 text-sm">Alvarado 802, B8000</p>
                <p className="text-gray-400 text-sm">Provincia de Buenos Aires</p>
              </div>
            </div>

            {/* Teléfonos */}
            <div className="cns-footer-contact-group">
              {/* Fijo */}
              <a href="tel:02914517000" className="cns-footer-info-item hover:opacity-80 transition-opacity">
                <Phone className="cns-footer-icon" size={20} />
                <span className="text-gray-300">0291-4517000 (Fijo)</span>
              </a>

              {/* Whatsapp */}
              <a 
                href="https://wa.me/5492914277849" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cns-footer-info-item hover:opacity-80 transition-opacity"
              >
                <MessageCircle className="cns-footer-icon" size={20} />
                <span className="text-gray-300">291-4277849 (Whatsapp)</span>
              </a>
            </div>

          </div>
        </div>

        {/* Copyright / Bottom Bar */}
        <div className="cns-footer-bottom">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Aumacar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;