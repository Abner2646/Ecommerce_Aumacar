// /components/layout/Footer.jsx

import { Link } from 'react-router-dom';
import {
  TruckIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
//import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://facebook.com',
      icon: (
        <svg className="cns-social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com',
      icon: (
        <svg className="cns-social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com',
      icon: (
        <svg className="cns-social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com',
      icon: (
        <svg className="cns-social-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="cns-footer">
      <div className="cns-footer-container">
        {/* Sección Principal */}
        <div className="cns-footer-content">
          {/* Columna 1: Sobre Nosotros */}
          <div className="cns-footer-section">
            <h3 className="cns-footer-title">
              <TruckIcon className="cns-footer-logo-icon" />
              AutoDealer
            </h3>
            <p className="cns-footer-description">
              Tu concesionaria de confianza con las mejores marcas y vehículos 
              del mercado. Calidad, servicio y compromiso desde {currentYear - 10}.
            </p>
            <div className="cns-footer-social">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cns-social-link" 
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="cns-footer-section">
            <h4 className="cns-footer-subtitle">Enlaces Rápidos</h4>
            <ul className="cns-footer-links">
              <li>
                <Link to="/" className="cns-footer-link">Inicio</Link>
              </li>
              <li>
                <Link to="/marcas" className="cns-footer-link">Nuestras Marcas</Link>
              </li>
              <li>
                <Link to="/contacto" className="cns-footer-link">Contacto</Link>
              </li>
              <li>
                <Link to="/admin/login" className="cns-footer-link">Portal Admin</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div className="cns-footer-section">
            <h4 className="cns-footer-subtitle">Contacto</h4>
            <ul className="cns-footer-contact">
              <li className="cns-contact-item">
                <MapPinIcon className="cns-contact-icon" />
                <span>Av. Principal 1234, Ciudad</span>
              </li>
              <li className="cns-contact-item">
                <PhoneIcon className="cns-contact-icon" />
                <a href="tel:+1234567890" className="cns-footer-link">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="cns-contact-item">
                <EnvelopeIcon className="cns-contact-icon" />
                <a href="mailto:info@autodealer.com" className="cns-footer-link">
                  info@autodealer.com
                </a>
              </li>
              <li className="cns-contact-item">
                <ClockIcon className="cns-contact-icon" />
                <span>Lun - Vie: 9:00 - 19:00</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div className="cns-footer-section">
            <h4 className="cns-footer-subtitle">Newsletter</h4>
            <p className="cns-footer-newsletter-text">
              Suscríbete para recibir las últimas novedades y ofertas especiales.
            </p>
            <form className="cns-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Tu email"
                className="cns-newsletter-input"
                required
              />
              <button type="submit" className="cns-newsletter-button">
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Sección Inferior */}
        <div className="cns-footer-bottom">
          <div className="cns-footer-bottom-content">
            <p className="cns-footer-copyright">
              &copy; {currentYear} AutoDealer. Todos los derechos reservados.
            </p>
            <div className="cns-footer-legal">
              <Link to="/privacidad" className="cns-footer-legal-link">
                Política de Privacidad
              </Link>
              <span className="cns-footer-separator">|</span>
              <Link to="/terminos" className="cns-footer-legal-link">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;