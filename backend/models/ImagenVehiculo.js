const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ImagenVehiculo = sequelize.define('ImagenVehiculo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vehiculoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vehiculos',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
    alt: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    orden: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    esPrincipal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    tableName: 'imagenes_vehiculo',
    timestamps: true
  });

  ImagenVehiculo.associate = (models) => {
    ImagenVehiculo.belongsTo(models.Vehiculo, {
      foreignKey: 'vehiculoId',
      as: 'vehiculo'
    });
  };

  return ImagenVehiculo;
};
