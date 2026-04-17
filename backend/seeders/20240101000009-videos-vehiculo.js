'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const [vehiculos] = await queryInterface.sequelize.query(
      "SELECT id, slug FROM vehiculos WHERE slug IN ('toyota-corolla-cross-xei-hybrid','ford-ranger-xlt-4x4','chevrolet-tracker-rs','volkswagen-taos-highline')"
    );

    const vehiculoId = vehiculos.reduce((acc, v) => {
      acc[v.slug] = v.id;
      return acc;
    }, {});

    const filas = [
      {
        vehiculoId: vehiculoId['toyota-corolla-cross-xei-hybrid'],
        titulo: 'Presentacion Corolla Cross Hybrid',
        descripcion: 'Recorrido exterior e interior del modelo.',
        urlVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        urlThumbnail: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80',
        duracion: 60,
        tamano: null,
        formato: 'mp4',
        orden: 1,
        esPrincipal: true,
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        vehiculoId: vehiculoId['ford-ranger-xlt-4x4'],
        titulo: 'Ford Ranger XLT 4x4',
        descripcion: 'Demo de manejo y equipamiento.',
        urlVideo: 'https://www.w3schools.com/html/movie.mp4',
        urlThumbnail: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
        duracion: 45,
        tamano: null,
        formato: 'mp4',
        orden: 1,
        esPrincipal: true,
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        vehiculoId: vehiculoId['chevrolet-tracker-rs'],
        titulo: 'Chevrolet Tracker RS',
        descripcion: 'Video promocional de caracteristicas principales.',
        urlVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        urlThumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
        duracion: 55,
        tamano: null,
        formato: 'mp4',
        orden: 1,
        esPrincipal: true,
        activo: true,
        createdAt: now,
        updatedAt: now
      }
    ].filter((f) => f.vehiculoId);

    await queryInterface.bulkInsert('videos_vehiculo', filas);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('videos_vehiculo', {
      titulo: [
        'Presentacion Corolla Cross Hybrid',
        'Ford Ranger XLT 4x4',
        'Chevrolet Tracker RS'
      ]
    });
  }
};
