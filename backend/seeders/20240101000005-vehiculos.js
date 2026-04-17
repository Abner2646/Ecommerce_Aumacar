'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const [marcas] = await queryInterface.sequelize.query(
      "SELECT id, slug FROM marcas WHERE slug IN ('toyota','ford','chevrolet','volkswagen')"
    );

    const marcaIdPorSlug = marcas.reduce((acc, m) => {
      acc[m.slug] = m.id;
      return acc;
    }, {});

    await queryInterface.bulkInsert('vehiculos', [
      {
        marcaId: marcaIdPorSlug.toyota,
        modelo: 'Corolla Cross',
        version: 'XEi Hybrid',
        'año': 2024,
        precio: 42500000,
        categoria: 'suv',
        stock: 3,
        disponible: true,
        destacado: true,
        motor: '1.8L Hibrido',
        combustible: 'hibrido',
        transmision: 'cvt',
        traccion: 'delantera',
        puertas: 5,
        pasajeros: 5,
        cilindrada: '1798 cc',
        potencia: '122 cv',
        torque: '142 Nm',
        descripcionCorta: 'SUV hibrida de bajo consumo y gran confort para uso diario.',
        descripcionCompleta: 'Toyota Corolla Cross XEi Hybrid, ideal para ciudad y ruta, con gran eficiencia y equipamiento de seguridad completo.',
        favorito: true,
        slug: 'toyota-corolla-cross-xei-hybrid',
        metaTitle: 'Toyota Corolla Cross XEi Hybrid 2024',
        metaDescription: 'Corolla Cross XEi Hybrid 2024 con entrega inmediata y financiacion.',
        plantilla: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        marcaId: marcaIdPorSlug.ford,
        modelo: 'Ranger',
        version: 'XLT 4x4',
        'año': 2023,
        precio: 58900000,
        categoria: 'pickup',
        stock: 2,
        disponible: true,
        destacado: true,
        motor: '2.0L Bi-Turbo Diesel',
        combustible: 'diesel',
        transmision: 'automatica',
        traccion: '4x4',
        puertas: 4,
        pasajeros: 5,
        cilindrada: '1996 cc',
        potencia: '210 cv',
        torque: '500 Nm',
        descripcionCorta: 'Pickup robusta para trabajo y aventura con tecnologia de ultima generacion.',
        descripcionCompleta: 'Ford Ranger XLT 4x4 automatica con excelente capacidad off-road y confort de manejo en ruta.',
        favorito: false,
        slug: 'ford-ranger-xlt-4x4',
        metaTitle: 'Ford Ranger XLT 4x4 2023',
        metaDescription: 'Ford Ranger XLT 4x4 automatica con gran potencia y seguridad.',
        plantilla: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        marcaId: marcaIdPorSlug.chevrolet,
        modelo: 'Tracker',
        version: 'RS',
        'año': 2024,
        precio: 36100000,
        categoria: 'suv',
        stock: 4,
        disponible: true,
        destacado: false,
        motor: '1.2L Turbo',
        combustible: 'nafta',
        transmision: 'automatica',
        traccion: 'delantera',
        puertas: 5,
        pasajeros: 5,
        cilindrada: '1199 cc',
        potencia: '132 cv',
        torque: '190 Nm',
        descripcionCorta: 'SUV compacta con estilo deportivo y excelente conectividad.',
        descripcionCompleta: 'Chevrolet Tracker RS con diseno moderno, seguridad avanzada y equipamiento multimedia completo.',
        favorito: false,
        slug: 'chevrolet-tracker-rs',
        metaTitle: 'Chevrolet Tracker RS 2024',
        metaDescription: 'Chevrolet Tracker RS con diseno deportivo y tecnologia de punta.',
        plantilla: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        marcaId: marcaIdPorSlug.volkswagen,
        modelo: 'Taos',
        version: 'Highline',
        'año': 2024,
        precio: 44750000,
        categoria: 'suv',
        stock: 2,
        disponible: true,
        destacado: true,
        motor: '1.4L TSI',
        combustible: 'nafta',
        transmision: 'automatica',
        traccion: 'delantera',
        puertas: 5,
        pasajeros: 5,
        cilindrada: '1395 cc',
        potencia: '150 cv',
        torque: '250 Nm',
        descripcionCorta: 'SUV mediana de alto confort con gran espacio interior.',
        descripcionCompleta: 'Volkswagen Taos Highline con ADAS, tablero digital y excelente calidad de terminaciones.',
        favorito: true,
        slug: 'volkswagen-taos-highline',
        metaTitle: 'Volkswagen Taos Highline 2024',
        metaDescription: 'Volkswagen Taos Highline con seguridad avanzada y financiacion disponible.',
        plantilla: 1,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehiculos', {
      slug: [
        'toyota-corolla-cross-xei-hybrid',
        'ford-ranger-xlt-4x4',
        'chevrolet-tracker-rs',
        'volkswagen-taos-highline'
      ]
    });
  }
};
