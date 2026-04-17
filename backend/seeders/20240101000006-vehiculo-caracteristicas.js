'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const [vehiculos] = await queryInterface.sequelize.query(
      "SELECT id, slug FROM vehiculos WHERE slug IN ('toyota-corolla-cross-xei-hybrid','ford-ranger-xlt-4x4','chevrolet-tracker-rs','volkswagen-taos-highline')"
    );

    const [caracteristicas] = await queryInterface.sequelize.query(
      "SELECT id, nombre FROM caracteristicas WHERE nombre IN ('ABS','Airbags frontales','Control de estabilidad (ESP)','Cámara de retroceso','Climatizador automático','Volante multifunción','Pantalla táctil','Apple CarPlay','Android Auto','Control de crucero','Faros LED','Sensor de estacionamiento trasero','Turbo','Asientos de cuero','Computadora de a bordo')"
    );

    const vehiculoId = vehiculos.reduce((acc, v) => {
      acc[v.slug] = v.id;
      return acc;
    }, {});

    const caracteristicaId = caracteristicas.reduce((acc, c) => {
      acc[c.nombre] = c.id;
      return acc;
    }, {});

    const asignaciones = [
      ['toyota-corolla-cross-xei-hybrid', 'ABS'],
      ['toyota-corolla-cross-xei-hybrid', 'Airbags frontales'],
      ['toyota-corolla-cross-xei-hybrid', 'Control de estabilidad (ESP)'],
      ['toyota-corolla-cross-xei-hybrid', 'Cámara de retroceso'],
      ['toyota-corolla-cross-xei-hybrid', 'Pantalla táctil'],
      ['toyota-corolla-cross-xei-hybrid', 'Apple CarPlay'],
      ['toyota-corolla-cross-xei-hybrid', 'Android Auto'],
      ['toyota-corolla-cross-xei-hybrid', 'Control de crucero'],

      ['ford-ranger-xlt-4x4', 'ABS'],
      ['ford-ranger-xlt-4x4', 'Airbags frontales'],
      ['ford-ranger-xlt-4x4', 'Control de estabilidad (ESP)'],
      ['ford-ranger-xlt-4x4', 'Cámara de retroceso'],
      ['ford-ranger-xlt-4x4', 'Sensor de estacionamiento trasero'],
      ['ford-ranger-xlt-4x4', 'Turbo'],
      ['ford-ranger-xlt-4x4', 'Pantalla táctil'],
      ['ford-ranger-xlt-4x4', 'Control de crucero'],

      ['chevrolet-tracker-rs', 'ABS'],
      ['chevrolet-tracker-rs', 'Airbags frontales'],
      ['chevrolet-tracker-rs', 'Control de estabilidad (ESP)'],
      ['chevrolet-tracker-rs', 'Cámara de retroceso'],
      ['chevrolet-tracker-rs', 'Pantalla táctil'],
      ['chevrolet-tracker-rs', 'Apple CarPlay'],
      ['chevrolet-tracker-rs', 'Android Auto'],
      ['chevrolet-tracker-rs', 'Control de crucero'],

      ['volkswagen-taos-highline', 'ABS'],
      ['volkswagen-taos-highline', 'Airbags frontales'],
      ['volkswagen-taos-highline', 'Control de estabilidad (ESP)'],
      ['volkswagen-taos-highline', 'Asientos de cuero'],
      ['volkswagen-taos-highline', 'Computadora de a bordo'],
      ['volkswagen-taos-highline', 'Pantalla táctil'],
      ['volkswagen-taos-highline', 'Faros LED'],
      ['volkswagen-taos-highline', 'Control de crucero']
    ];

    const filas = asignaciones
      .map(([slug, nombre]) => ({
        vehiculoId: vehiculoId[slug],
        caracteristicaId: caracteristicaId[nombre],
        createdAt: now,
        updatedAt: now
      }))
      .filter((f) => f.vehiculoId && f.caracteristicaId);

    await queryInterface.bulkInsert('vehiculo_caracteristicas', filas);
  },

  down: async (queryInterface, Sequelize) => {
    const [vehiculos] = await queryInterface.sequelize.query(
      "SELECT id FROM vehiculos WHERE slug IN ('toyota-corolla-cross-xei-hybrid','ford-ranger-xlt-4x4','chevrolet-tracker-rs','volkswagen-taos-highline')"
    );

    const ids = vehiculos.map((v) => v.id);

    if (ids.length > 0) {
      await queryInterface.bulkDelete('vehiculo_caracteristicas', {
        vehiculoId: ids
      });
    }
  }
};
