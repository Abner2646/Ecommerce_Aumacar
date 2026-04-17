'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const [vehiculos] = await queryInterface.sequelize.query(
      "SELECT id, slug FROM vehiculos WHERE slug IN ('toyota-corolla-cross-xei-hybrid','ford-ranger-xlt-4x4','chevrolet-tracker-rs','volkswagen-taos-highline')"
    );

    const [coloresVehiculo] = await queryInterface.sequelize.query(
      `SELECT cv.id, v.slug, c.nombre
       FROM color_vehiculo cv
       INNER JOIN vehiculos v ON v.id = cv."vehiculoId"
       INNER JOIN colores c ON c.id = cv."colorId"`
    );

    const vehiculoId = vehiculos.reduce((acc, v) => {
      acc[v.slug] = v.id;
      return acc;
    }, {});

    const colorVehiculoId = coloresVehiculo.reduce((acc, cv) => {
      acc[`${cv.slug}|${cv.nombre}`] = cv.id;
      return acc;
    }, {});

    const filas = [
      {
        vehiculoId: vehiculoId['toyota-corolla-cross-xei-hybrid'],
        colorVehiculoId: colorVehiculoId['toyota-corolla-cross-xei-hybrid|Blanco Perla'],
        url: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=80',
        alt: 'Toyota Corolla Cross blanco vista frontal',
        orden: 1,
        esPrincipal: true,
        createdAt: now,
        updatedAt: now
      },
      {
        vehiculoId: vehiculoId['toyota-corolla-cross-xei-hybrid'],
        colorVehiculoId: colorVehiculoId['toyota-corolla-cross-xei-hybrid|Gris Plata'],
        url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
        alt: 'Toyota Corolla Cross gris vista lateral',
        orden: 2,
        esPrincipal: false,
        createdAt: now,
        updatedAt: now
      },
      {
        vehiculoId: vehiculoId['ford-ranger-xlt-4x4'],
        colorVehiculoId: colorVehiculoId['ford-ranger-xlt-4x4|Azul Marino'],
        url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80',
        alt: 'Ford Ranger azul en exterior',
        orden: 1,
        esPrincipal: true,
        createdAt: now,
        updatedAt: now
      },
      {
        vehiculoId: vehiculoId['ford-ranger-xlt-4x4'],
        colorVehiculoId: colorVehiculoId['ford-ranger-xlt-4x4|Negro Onix'],
        url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80',
        alt: 'Ford Ranger negra vista trasera',
        orden: 2,
        esPrincipal: false,
        createdAt: now,
        updatedAt: now
      },
      {
        vehiculoId: vehiculoId['chevrolet-tracker-rs'],
        colorVehiculoId: colorVehiculoId['chevrolet-tracker-rs|Rojo Metalico'],
        url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80',
        alt: 'Chevrolet Tracker roja en ciudad',
        orden: 1,
        esPrincipal: true,
        createdAt: now,
        updatedAt: now
      },
      {
        vehiculoId: vehiculoId['volkswagen-taos-highline'],
        colorVehiculoId: colorVehiculoId['volkswagen-taos-highline|Verde Oliva'],
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
        alt: 'Volkswagen Taos verde vista frontal',
        orden: 1,
        esPrincipal: true,
        createdAt: now,
        updatedAt: now
      },
      {
        vehiculoId: vehiculoId['volkswagen-taos-highline'],
        colorVehiculoId: null,
        url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1600&q=80',
        alt: 'Interior Volkswagen Taos',
        orden: 3,
        esPrincipal: false,
        createdAt: now,
        updatedAt: now
      }
    ].filter((f) => f.vehiculoId);

    await queryInterface.bulkInsert('imagenes_vehiculo', filas);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('imagenes_vehiculo', {
      alt: [
        'Toyota Corolla Cross blanco vista frontal',
        'Toyota Corolla Cross gris vista lateral',
        'Ford Ranger azul en exterior',
        'Ford Ranger negra vista trasera',
        'Chevrolet Tracker roja en ciudad',
        'Volkswagen Taos verde vista frontal',
        'Interior Volkswagen Taos'
      ]
    });
  }
};
