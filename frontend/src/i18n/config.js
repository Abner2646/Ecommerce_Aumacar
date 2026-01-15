// /src/i18n/config.js 

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      // ============ NAVBAR ============
      navbar: {
        ariaLabel: "Navegación principal",
        logoAriaLabel: "aumacar - Ir al inicio",
        brands: "Marcas",
        contact: "Contacto",
        openMenu: "Abrir menú",
        closeMenu: "Cerrar menú",
      },

      // ============ FOOTER ============
      footer: {
        description: "Tu concesionaria de confianza en Bahía Blanca. Excelencia automotriz desde hace más de 30 años.",
        navigation: {
          title: "Navegación",
          home: "Inicio",
          contact: "Contacto",
        },
        contact: {
          title: "Contacto",
          viewLocation: "Ver ubicación en Google Maps",
        },
        hours: {
          title: "Horarios",
          weekdays: "Lunes a Viernes",
          saturday: "Sábados",
          sunday: "Domingos",
          closed: "Cerrado",
        },
      },

      // ============ HOME ============
      home: {
        hero: {
          badge: "Performance & Excelencia",
          title: "Bienvenido a Aumacar",
          subtitle: "Concesionaria oficial Subaru y Suzuki. Descubre la excelencia automotriz con las mejores marcas del mercado.",
          btnExploreBrands: "Explorar Marcas",
          btnWhatsApp: "WhatsApp",
          btnWhatsAppSubtitle: "Consulta rápida",
        },
        brands: {
          title: "Selecciona tu Marca",
          btnExploreModels: "Explorar modelos",
        },
        features: {
          badge: "Nuestros Beneficios",
          title: "Por qué elegirnos",
          subtitle: "Compromiso con la excelencia en cada detalle de tu experiencia automotriz",
          warranty: {
            title: "Garantía Oficial",
            description: "Todos nuestros vehículos cuentan con garantía de fábrica y servicio post-venta especializado",
          },
          financing: {
            title: "Financiamiento",
            description: "Planes de financiamiento adaptados a tus necesidades con las mejores tasas del mercado",
          },
          service: {
            title: "Servicio Técnico",
            description: "Centro de servicio autorizado con técnicos certificados y repuestos originales",
          },
        },
        cta: {
          badge: "Únete a nuestra familia",
          title: "¿Listo para la",
          titleHighlight: "Aventura de tu Vida?",
          subtitle: "Visita nuestro showroom o explora nuestro catálogo online.",
          btnExploreCatalog: "Explorar Catálogo",
          contactOptions: {
            whatsapp: "Consulta rápida",
            location: "Visitanos",
            locationName: "Bahía Blanca",
            email: "Escríbenos",
          },
        },
      },

      // ============ MARCA PAGE ============
      marcaPage: {
        loading: "Cargando marca...",
        loadingTemplate: "Cargando plantilla...",
        error: "Error al cargar la marca",
        notFound: "No se encontró la marca.",
      },

      // ============ PLANTILLAS DE VEHÍCULOS (Template01-04) ============
      templates: {
        loading: "Cargando experiencia premium...",
        
        // Specs comunes
        specs: {
          motor: "Motor",
          potencia: "Potencia",
          consumo: "Consumo",
          transmision: "Transmisión",
          combustible: "Combustible",
          traccion: "Tracción",
        },
        
        // Secciones compartidas
        sections: {
          performance: "Performance",
          technicalSpecs: "Especificaciones Técnicas",
          technicalDetails: "Detalles Técnicos",
          equipment: "Equipamiento",
          allYouNeed: "Todo lo que necesitás",
          gallery: "Galería",
          exploreDetails: "Explorá cada detalle",
          knowInDetail: "Conocelo en detalle",
          colors: "Colores Disponibles",
          allColors: "Todas",
          noImagesForColor: "No hay imágenes disponibles para este color",
        },
        
        // Botones y acciones
        actions: {
          buyNow: "Comprar ahora",
          contact: "Contactar",
          viewDetails: "Ver Detalles →",
          viewMore: "Ver más",
          viewLess: "Ver menos",
          seeMoreImages: "imágenes",
          moreInfo: "Más Info",
          scheduleNow: "Agendar ahora",
        },
        
        // Precios
        price: {
          from: "Desde",
        },
        
        // CTA Final
        cta: {
          title: "Hacé que sea tuyo",
          subtitle: "Comenzá el proceso de compra o contactá a nuestro equipo para una experiencia personalizada.",
        },
        
        // Modal
        modal: {
          close: "Cerrar",
          closeHint: "Presiona ESC o haz clic fuera para cerrar",
          enlarged: "Vista ampliada",
        },
        
        // Navegación de slider
        slider: {
          previous: "Imagen anterior",
          next: "Imagen siguiente",
          goToImage: "Ir a imagen",
          counter: "de",
          paused: "Pausado",
        },
        
        // Sonido
        audio: {
          unmute: "Activar audio",
          mute: "Silenciar",
          activateSound: "Activar sonido",
        },
        
        // Scroll
        scroll: {
          discover: "Descubrir",
          explore: "Explorar",
        },
      },

      // ============ PLANTILLAS DE MARCA (Plantilla1-3) ============
      brandTemplates: {
        hero: {
          badge: "Performance & Eficiencia",
          exploreModels: "Explorar Modelos",
          whatsapp: "WhatsApp",
          quickInquiry: "Consulta rápida",
        },
        
        bestSellers: {
          title: "Mas vendidos en",
          subtitle: "Descubre vehículos diseñados para cada aventura, desde la ciudad hasta el off-road",
          from: "Desde",
        },
        
        parallax: {
          title: "Diseñado para",
          titleBreak: "cualquier terreno",
          subtitle: "se adapta a cada camino para brindarte seguridad, estabilidad y confianza, acompañándote en cada destino, sin importar las condiciones.",
          cta: "Conocer",
          ctaSubaru: "Conoce",
        },
        
        technology: {
          title: "Tecnología",
          subtitle: "Innovación que marca la diferencia en cada kilómetro",
          features: {
            hybrid: {
              title: "Tecnología Híbrida",
              description: "Sistemas híbridos avanzados que combinan eficiencia y rendimiento.",
            },
            awd: {
              titleSubaru: "Symmetrical AWD",
              titleSuzuki: "ALLGRIP 4x4",
              descriptionSubaru: "Tracción Integral Simétrica que brinda mayor estabilidad, control y confianza en todo momento.",
              descriptionSuzuki: "Sistema de tracción inteligente que se adapta automáticamente a cualquier terreno.",
            },
            safety: {
              title: "Seguridad Total",
              description: "Equipados con los sistemas de seguridad activa y pasiva más avanzados del mercado.",
            },
            design: {
              title: "Diseño Japonés",
              description: "Estética funcional que combina tradición japonesa con modernidad contemporánea.",
            },
          },
        },
        
        fullLine: {
          title: "Línea Completa",
          subtitle: "Encuentra el",
          subtitleEnd: "perfecto para ti",
          tabs: {
            allModels: "Todos los Modelos",
            specifications: "Especificaciones",
          },
          viewMore: "Ver más →",
        },
        
        testDrive: {
          title: "Agenda tu Test Drive",
          subtitle: "Experimenta la diferencia",
          subtitleEnd: ". Visita nuestro concesionario y descubre por qué millones de conductores confían en nosotros.",
          phone: "(291) 427-7849",
          contact: {
            whatsapp: "WhatsApp",
            whatsappSubtitle: "Consulta rápida",
            location: "Visitanos",
            locationName: "Bahía Blanca",
            email: "Email",
            emailAction: "Escríbenos",
          },
        },
      },

      // ============ FORMULARIO DE COMPRA ============
      purchaseForm: {
        title: "Orden de Compra",
        subtitle: "Complete el formulario para generar su orden de compra",
        
        selectedVehicle: {
          title: "Vehículo Seleccionado",
          brand: "Marca",
          model: "Modelo",
          year: "Año",
          price: "Precio",
          color: "Color",
          noColors: "No hay colores disponibles",
        },
        
        personalData: {
          title: "Datos Personales",
          fullName: "Nombre completo",
          fullNamePlaceholder: "Ingrese su nombre completo",
          email: "Email",
          emailPlaceholder: "correo@ejemplo.com",
          phone: "Teléfono",
          phonePlaceholder: "+54 9 11 1234-5678",
          dni: "DNI",
          dniPlaceholder: "12.345.678",
        },
        
        address: {
          title: "Dirección",
          street: "Calle y número",
          streetPlaceholder: "Av. Ejemplo 1234",
          city: "Ciudad",
          cityPlaceholder: "Buenos Aires",
          province: "Provincia",
          provincePlaceholder: "Buenos Aires",
          postalCode: "Código Postal",
          postalCodePlaceholder: "1234",
        },
        
        purchaseDetails: {
          title: "Detalles de Compra",
          paymentMethod: "Método de pago",
          paymentMethodPlaceholder: "Seleccione una opción",
          paymentOptions: {
            transfer: "Transferencia bancaria",
            cash: "Efectivo",
            financing: "Financiación",
          },
          deliveryType: "Tipo de entrega",
          deliveryTypePlaceholder: "Seleccione una opción",
          deliveryOptions: {
            pickup: "Retiro en concesionaria",
            delivery: "Envío a domicilio",
          },
          comments: "Comentarios adicionales",
          commentsPlaceholder: "Agregue cualquier información adicional que considere relevante...",
        },
        
        actions: {
          cancel: "Cancelar",
          continue: "Continuar",
        },
        
        modal: {
          title: "Enviar Orden de Compra",
          summary: {
            title: "Resumen de la Orden",
            buyer: "Comprador:",
            vehicle: "Vehículo:",
            color: "Color:",
            price: "Precio:",
          },
          whatsapp: {
            title: "Enviar Orden por WhatsApp",
            description: "Un asesor comercial recibirá su orden y se pondrá en contacto con usted",
            helpWith: "Le ayudaremos con:",
            benefits: {
              availability: "Confirmación de disponibilidad",
              financing: "Opciones de financiación",
              testDrive: "Coordinación de test drive",
              delivery: "Modalidades de entrega",
              tradeIn: "Valuación de vehículo usado",
            },
            button: "Enviar por WhatsApp",
            hint: "Presione el botón para abrir WhatsApp con su orden prellenada",
          },
          info: {
            title: "Información importante",
            text: "Esta es una orden de compra. Un asesor comercial se pondrá en contacto con usted en las próximas 24 horas para confirmar disponibilidad y coordinar los siguientes pasos del proceso de compra.",
          },
        },
        
        loading: "Cargando información...",
        notFound: "Vehículo no encontrado",
        back: "Volver",
      },

      // ============ PÁGINA DE VEHÍCULO ============
      vehiclePage: {
        loading: "Cargando vehículo...",
        error: "Error al cargar",
        errorMessage: "No se pudo cargar el vehículo",
        notFound: "Vehículo no encontrado",
        notFoundMessage: "No encontramos un vehículo con el nombre",
      },
    }
  },
  
  en: {
    translation: {
      // ============ NAVBAR ============
      navbar: {
        ariaLabel: "Main navigation",
        logoAriaLabel: "aumacar - Go to home",
        brands: "Brands",
        contact: "Contact",
        openMenu: "Open menu",
        closeMenu: "Close menu",
      },

      // ============ FOOTER ============
      footer: {
        description: "Your trusted dealership in Bahía Blanca. Automotive excellence for over 30 years.",
        navigation: {
          title: "Navigation",
          home: "Home",
          contact: "Contact",
        },
        contact: {
          title: "Contact",
          viewLocation: "View location on Google Maps",
        },
        hours: {
          title: "Hours",
          weekdays: "Monday to Friday",
          saturday: "Saturdays",
          sunday: "Sundays",
          closed: "Closed",
        },
      },

      // ============ HOME ============
      home: {
        hero: {
          badge: "Performance & Excellence",
          title: "Welcome to Aumacar",
          subtitle: "Official Subaru and Suzuki dealership. Discover automotive excellence with the best brands in the market.",
          btnExploreBrands: "Explore Brands",
          btnWhatsApp: "WhatsApp",
          btnWhatsAppSubtitle: "Quick inquiry",
        },
        brands: {
          title: "Select your Brand",
          btnExploreModels: "Explore models",
        },
        features: {
          badge: "Our Benefits",
          title: "Why choose us",
          subtitle: "Commitment to excellence in every detail of your automotive experience",
          warranty: {
            title: "Official Warranty",
            description: "All our vehicles come with factory warranty and specialized after-sales service",
          },
          financing: {
            title: "Financing",
            description: "Flexible financing plans adapted to your needs with the best market rates",
          },
          service: {
            title: "Technical Service",
            description: "Authorized service center with certified technicians and original parts",
          },
        },
        cta: {
          badge: "Join our family",
          title: "Ready for the",
          titleHighlight: "Adventure of your Life?",
          subtitle: "Visit our showroom or explore our online catalog.",
          btnExploreCatalog: "Explore Catalog",
          contactOptions: {
            whatsapp: "Quick inquiry",
            location: "Visit us",
            locationName: "Bahía Blanca",
            email: "Write to us",
          },
        },
      },

      // ============ MARCA PAGE ============
      marcaPage: {
        loading: "Loading brand...",
        loadingTemplate: "Loading template...",
        error: "Error loading brand",
        notFound: "Brand not found.",
      },

      // ============ VEHICLE TEMPLATES (Template01-04) ============
      templates: {
        loading: "Loading premium experience...",
        
        specs: {
          motor: "Engine",
          potencia: "Power",
          consumo: "Consumption",
          transmision: "Transmission",
          combustible: "Fuel",
          traccion: "Traction",
        },
        
        sections: {
          performance: "Performance",
          technicalSpecs: "Technical Specifications",
          technicalDetails: "Technical Details",
          equipment: "Equipment",
          allYouNeed: "Everything you need",
          gallery: "Gallery",
          exploreDetails: "Explore every detail",
          knowInDetail: "Get to know it in detail",
          colors: "Available Colors",
          allColors: "All",
          noImagesForColor: "No images available for this color",
        },
        
        actions: {
          buyNow: "Buy now",
          contact: "Contact",
          viewDetails: "View Details →",
          viewMore: "View more",
          viewLess: "View less",
          seeMoreImages: "images",
          moreInfo: "More Info",
          scheduleNow: "Schedule now",
        },
        
        price: {
          from: "From",
        },
        
        cta: {
          title: "Make it yours",
          subtitle: "Start the purchase process or contact our team for a personalized experience.",
        },
        
        modal: {
          close: "Close",
          closeHint: "Press ESC or click outside to close",
          enlarged: "Enlarged view",
        },
        
        slider: {
          previous: "Previous image",
          next: "Next image",
          goToImage: "Go to image",
          counter: "of",
          paused: "Paused",
        },
        
        audio: {
          unmute: "Enable audio",
          mute: "Mute",
          activateSound: "Activate sound",
        },
        
        scroll: {
          discover: "Discover",
          explore: "Explore",
        },
      },

      // ============ BRAND TEMPLATES (Plantilla1-3) ============
      brandTemplates: {
        hero: {
          badge: "Performance & Efficiency",
          exploreModels: "Explore Models",
          whatsapp: "WhatsApp",
          quickInquiry: "Quick inquiry",
        },
        
        bestSellers: {
          title: "Best sellers in",
          subtitle: "Discover vehicles designed for every adventure, from the city to off-road",
          from: "From",
        },
        
        parallax: {
          title: "Designed for",
          titleBreak: "any terrain",
          subtitle: "adapts to every road to provide you with safety, stability and confidence, accompanying you to every destination, regardless of conditions.",
          cta: "Learn about",
          ctaSubaru: "Learn about",
        },
        
        technology: {
          title: "Technology",
          subtitle: "Innovation that makes a difference in every kilometer",
          features: {
            hybrid: {
              title: "Hybrid Technology",
              description: "Advanced hybrid systems that combine efficiency and performance.",
            },
            awd: {
              titleSubaru: "Symmetrical AWD",
              titleSuzuki: "ALLGRIP 4x4",
              descriptionSubaru: "Symmetrical All-Wheel Drive that provides greater stability, control and confidence at all times.",
              descriptionSuzuki: "Intelligent traction system that automatically adapts to any terrain.",
            },
            safety: {
              title: "Total Safety",
              description: "Equipped with the most advanced active and passive safety systems on the market.",
            },
            design: {
              title: "Japanese Design",
              description: "Functional aesthetics that combines Japanese tradition with contemporary modernity.",
            },
          },
        },
        
        fullLine: {
          title: "Complete Line",
          subtitle: "Find the perfect",
          subtitleEnd: "for you",
          tabs: {
            allModels: "All Models",
            specifications: "Specifications",
          },
          viewMore: "View more →",
        },
        
        testDrive: {
          title: "Schedule your Test Drive",
          subtitle: "Experience the difference",
          subtitleEnd: ". Visit our dealership and discover why millions of drivers trust us.",
          phone: "(291) 427-7849",
          contact: {
            whatsapp: "WhatsApp",
            whatsappSubtitle: "Quick inquiry",
            location: "Visit us",
            locationName: "Bahía Blanca",
            email: "Email",
            emailAction: "Write to us",
          },
        },
      },

      // ============ PURCHASE FORM ============
      purchaseForm: {
        title: "Purchase Order",
        subtitle: "Complete the form to generate your purchase order",
        
        selectedVehicle: {
          title: "Selected Vehicle",
          brand: "Brand",
          model: "Model",
          year: "Year",
          price: "Price",
          color: "Color",
          noColors: "No colors available",
        },
        
        personalData: {
          title: "Personal Information",
          fullName: "Full name",
          fullNamePlaceholder: "Enter your full name",
          email: "Email",
          emailPlaceholder: "email@example.com",
          phone: "Phone",
          phonePlaceholder: "+54 9 11 1234-5678",
          dni: "ID Number",
          dniPlaceholder: "12.345.678",
        },
        
        address: {
          title: "Address",
          street: "Street and number",
          streetPlaceholder: "Example Ave 1234",
          city: "City",
          cityPlaceholder: "Buenos Aires",
          province: "Province",
          provincePlaceholder: "Buenos Aires",
          postalCode: "Postal Code",
          postalCodePlaceholder: "1234",
        },
        
        purchaseDetails: {
          title: "Purchase Details",
          paymentMethod: "Payment method",
          paymentMethodPlaceholder: "Select an option",
          paymentOptions: {
            transfer: "Bank transfer",
            cash: "Cash",
            financing: "Financing",
          },
          deliveryType: "Delivery type",
          deliveryTypePlaceholder: "Select an option",
          deliveryOptions: {
            pickup: "Pickup at dealership",
            delivery: "Home delivery",
          },
          comments: "Additional comments",
          commentsPlaceholder: "Add any additional information you consider relevant...",
        },
        
        actions: {
          cancel: "Cancel",
          continue: "Continue",
        },
        
        modal: {
          title: "Send Purchase Order",
          summary: {
            title: "Order Summary",
            buyer: "Buyer:",
            vehicle: "Vehicle:",
            color: "Color:",
            price: "Price:",
          },
          whatsapp: {
            title: "Send Order via WhatsApp",
            description: "A sales advisor will receive your order and will contact you",
            helpWith: "We will help you with:",
            benefits: {
              availability: "Availability confirmation",
              financing: "Financing options",
              testDrive: "Test drive coordination",
              delivery: "Delivery modalities",
              tradeIn: "Used vehicle valuation",
            },
            button: "Send via WhatsApp",
            hint: "Press the button to open WhatsApp with your pre-filled order",
          },
          info: {
            title: "Important information",
            text: "This is a purchase order. A sales advisor will contact you within the next 24 hours to confirm availability and coordinate the next steps of the purchase process.",
          },
        },
        
        loading: "Loading information...",
        notFound: "Vehicle not found",
        back: "Back",
      },

      // ============ VEHICLE PAGE ============
      vehiclePage: {
        loading: "Loading vehicle...",
        error: "Error loading",
        errorMessage: "Could not load vehicle",
        notFound: "Vehicle not found",
        notFoundMessage: "We couldn't find a vehicle named",
      },
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    detection: {
      order: ['navigator', 'htmlTag', 'localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;