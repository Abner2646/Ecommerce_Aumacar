const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Marca = sequelize.define('Marca', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    logo: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /^[a-z0-9-]+$/
      }
    },
    activa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    orden: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    colorPrimario: {
      type: DataTypes.STRING(7),
      allowNull: true,
      validate: {
        is: /^#[0-9A-F]{6}$/i
      }
    },
    colorSecundario: {
      type: DataTypes.STRING(7),
      allowNull: true,
      validate: {
        is: /^#[0-9A-F]{6}$/i
      }
    }
  }, {
    tableName: 'marcas',
    timestamps: true
  });

  Marca.associate = (models) => {
    Marca.hasMany(models.Vehiculo, {
      foreignKey: 'marcaId',
      as: 'vehiculos',
      onDelete: 'RESTRICT'
    });
  };

  return Marca;
};
