'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear tabla Marcas
    await queryInterface.createTable('marcas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      logo: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      slug: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      activa: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      orden: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      colorPrimario: {
        type: Sequelize.STRING(7),
        allowNull: true
      },
      colorSecundario: {
        type: Sequelize.STRING(7),
        allowNull: true
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

    // Crear tabla Vehiculos
    await queryInterface.createTable('vehiculos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      marcaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'marcas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      modelo: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      version: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      año: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      categoria: {
        type: Sequelize.ENUM('sedan', 'suv', 'pickup', 'hatchback', 'coupe', 'minivan', 'deportivo', 'otro'),
        allowNull: true
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      disponible: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      destacado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      motor: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      combustible: {
        type: Sequelize.ENUM('nafta', 'diesel', 'hibrido', 'electrico', 'gnc'),
        allowNull: true
      },
      transmision: {
        type: Sequelize.ENUM('manual', 'automatica', 'cvt'),
        allowNull: true
      },
      traccion: {
        type: Sequelize.ENUM('delantera', 'trasera', '4x4', 'awd'),
        allowNull: true
      },
      puertas: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      pasajeros: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      cilindrada: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      potencia: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      torque: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      descripcionCorta: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      descripcionCompleta: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      slug: {
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: true
      },
      metaTitle: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      metaDescription: {
        type: Sequelize.STRING(300),
        allowNull: true
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

    // Crear índices para vehiculos
    await queryInterface.addIndex('vehiculos', ['marcaId']);
    await queryInterface.addIndex('vehiculos', ['slug'], { unique: true });
    await queryInterface.addIndex('vehiculos', ['disponible']);
    await queryInterface.addIndex('vehiculos', ['destacado']);

    // Crear tabla ImagenesVehiculo
    await queryInterface.createTable('imagenes_vehiculo', {
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
      url: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      alt: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      orden: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      esPrincipal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    await queryInterface.addIndex('imagenes_vehiculo', ['vehiculoId']);

    // Crear tabla VideosVehiculo
    await queryInterface.createTable('videos_vehiculo', {
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
      titulo: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      urlVideo: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      urlThumbnail: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      duracion: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      tamano: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      formato: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      orden: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      esPrincipal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    await queryInterface.addIndex('videos_vehiculo', ['vehiculoId']);

    // Crear tabla Caracteristicas
    await queryInterface.createTable('caracteristicas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      icono: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      tipo: {
        type: Sequelize.ENUM('seguridad', 'confort', 'tecnologia', 'exterior', 'interior', 'performance'),
        allowNull: true
      },
      activa: {
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

    // Crear tabla intermedia VehiculoCaracteristicas
    await queryInterface.createTable('vehiculo_caracteristicas', {
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
      caracteristicaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'caracteristicas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Índice único para evitar duplicados
    await queryInterface.addIndex('vehiculo_caracteristicas', ['vehiculoId', 'caracteristicaId'], {
      unique: true,
      name: 'vehiculo_caracteristica_unique'
    });

    // Crear tabla Usuarios
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      ultimoAcceso: {
        type: Sequelize.DATE,
        allowNull: true
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
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar tablas en orden inverso (respetando dependencias)
    await queryInterface.dropTable('vehiculo_caracteristicas');
    await queryInterface.dropTable('videos_vehiculo');
    await queryInterface.dropTable('imagenes_vehiculo');
    await queryInterface.dropTable('usuarios');
    await queryInterface.dropTable('caracteristicas');
    await queryInterface.dropTable('vehiculos');
    await queryInterface.dropTable('marcas');
  }
};
