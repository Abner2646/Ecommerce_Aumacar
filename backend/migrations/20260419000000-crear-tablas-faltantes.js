'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Crear tabla colores
    await queryInterface.createTable('colores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      codigoHex: {
        type: Sequelize.STRING(7),
        allowNull: false
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 2. Crear tabla color_vehiculo (tabla intermedia)
    await queryInterface.createTable('color_vehiculo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      vehiculoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vehiculos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      colorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'colores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      orden: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Agregar índice único para color_vehiculo
    await queryInterface.addIndex('color_vehiculo', ['vehiculoId', 'colorId'], {
      unique: true,
      name: 'color_vehiculo_unique'
    });

    // 3. Crear tabla fotos_clientes_region
    await queryInterface.createTable('fotos_clientes_region', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ciudad: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      provincia: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      pais: {
        type: Sequelize.STRING(100),
        defaultValue: 'Argentina',
        allowNull: false
      },
      latitud: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
      },
      longitud: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true
      },
      radioKm: {
        type: Sequelize.INTEGER,
        defaultValue: 50,
        allowNull: false
      },
      urlImagen: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      publicIdCloudinary: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      textoDescriptivo: {
        type: Sequelize.STRING(300),
        allowNull: true
      },
      titulo: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      orden: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 4. Agregar columna colorVehiculoId a imagenes_vehiculo
    await queryInterface.addColumn('imagenes_vehiculo', 'colorVehiculoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'color_vehiculo',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('imagenes_vehiculo', 'colorVehiculoId');
    await queryInterface.dropTable('fotos_clientes_region');
    await queryInterface.dropTable('color_vehiculo');
    await queryInterface.dropTable('colores');
  }
};
