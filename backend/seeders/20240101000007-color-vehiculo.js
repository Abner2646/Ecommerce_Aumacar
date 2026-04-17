'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const [vehiculos] = await queryInterface.sequelize.query(
      "SELECT id, slug FROM vehiculos WHERE slug IN ('toyota-corolla-cross-xei-hybrid','ford-ranger-xlt-4x4','chevrolet-tracker-rs','volkswagen-taos-highline')"
    );

    const [colores] = await queryInterface.sequelize.query(
      "SELECT id, nombre FROM colores WHERE nombre IN ('Blanco Perla','Negro Onix','Gris Plata','Rojo Metalico','Azul Marino','Verde Oliva')"
    );

    const vehiculoId = vehiculos.reduce((acc, v) => {
      acc[v.slug] = v.id;
      return acc;
    }, {});

    const colorId = colores.reduce((acc, c) => {
      acc[c.nombre] = c.id;
      return acc;
    }, {});

    const filas = [
      { vehiculoId: vehiculoId['toyota-corolla-cross-xei-hybrid'], colorId: colorId['Blanco Perla'], orden: 1, createdAt: now, updatedAt: now },
      { vehiculoId: vehiculoId['toyota-corolla-cross-xei-hybrid'], colorId: colorId['Gris Plata'], orden: 2, createdAt: now, updatedAt: now },

      { vehiculoId: vehiculoId['ford-ranger-xlt-4x4'], colorId: colorId['Azul Marino'], orden: 1, createdAt: now, updatedAt: now },
      { vehiculoId: vehiculoId['ford-ranger-xlt-4x4'], colorId: colorId['Negro Onix'], orden: 2, createdAt: now, updatedAt: now },

      { vehiculoId: vehiculoId['chevrolet-tracker-rs'], colorId: colorId['Rojo Metalico'], orden: 1, createdAt: now, updatedAt: now },
      { vehiculoId: vehiculoId['chevrolet-tracker-rs'], colorId: colorId['Blanco Perla'], orden: 2, createdAt: now, updatedAt: now },

      { vehiculoId: vehiculoId['volkswagen-taos-highline'], colorId: colorId['Verde Oliva'], orden: 1, createdAt: now, updatedAt: now },
      { vehiculoId: vehiculoId['volkswagen-taos-highline'], colorId: colorId['Negro Onix'], orden: 2, createdAt: now, updatedAt: now }
    ].filter((f) => f.vehiculoId && f.colorId);

    await queryInterface.bulkInsert('color_vehiculo', filas);
  },

  down: async (queryInterface, Sequelize) => {
    const [vehiculos] = await queryInterface.sequelize.query(
      "SELECT id FROM vehiculos WHERE slug IN ('toyota-corolla-cross-xei-hybrid','ford-ranger-xlt-4x4','chevrolet-tracker-rs','volkswagen-taos-highline')"
    );

    const ids = vehiculos.map((v) => v.id);

    if (ids.length > 0) {
      await queryInterface.bulkDelete('color_vehiculo', {
        vehiculoId: ids
      });
    }
  }
};
