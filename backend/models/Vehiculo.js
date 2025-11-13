const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Vehiculo = sequelize.define('Vehiculo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    marcaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'marcas',
        key: 'id'
      }
    },
    modelo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 150]
      }
    },
    version: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    año: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 2000,
        max: 2030
      }
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    categoria: {
      type: DataTypes.ENUM('sedan', 'suv', 'pickup', 'hatchback', 'coupe', 'minivan', 'deportivo', 'otro'),
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    destacado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    motor: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    combustible: {
      type: DataTypes.ENUM('nafta', 'diesel', 'hibrido', 'electrico', 'gnc'),
      allowNull: true
    },
    transmision: {
      type: DataTypes.ENUM('manual', 'automatica', 'cvt'),
      allowNull: true
    },
    traccion: {
      type: DataTypes.ENUM('delantera', 'trasera', '4x4', 'awd'),
      allowNull: true
    },
    puertas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 2,
        max: 5
      }
    },
    pasajeros: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 2,
        max: 9
      }
    },
    cilindrada: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    potencia: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    torque: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    descripcionCorta: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    descripcionCompleta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /^[a-z0-9-]+$/
      }
    },
    metaTitle: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    tableName: 'vehiculos',
    timestamps: true
  });

  Vehiculo.associate = (models) => {
    Vehiculo.belongsTo(models.Marca, {
      foreignKey: 'marcaId',
      as: 'marca'
    });

    Vehiculo.hasMany(models.ImagenVehiculo, {
      foreignKey: 'vehiculoId',
      as: 'imagenes',
      onDelete: 'CASCADE'
    });

    Vehiculo.hasMany(models.VideoVehiculo, {
      foreignKey: 'vehiculoId',
      as: 'videos',
      onDelete: 'CASCADE'
    });

    Vehiculo.belongsToMany(models.Caracteristica, {
      through: models.VehiculoCaracteristica,
      foreignKey: 'vehiculoId',
      otherKey: 'caracteristicaId',
      as: 'caracteristicas'
    });
  };

  return Vehiculo;
};
