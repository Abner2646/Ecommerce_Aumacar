// models/VideoVehiculo.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const VideoVehiculo = sequelize.define('VideoVehiculo', {
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
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    urlVideo: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
    urlThumbnail: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duración en segundos'
    },
    tamano: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: 'Tamaño en bytes'
    },
    formato: {
      type: DataTypes.STRING(20),
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
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    tableName: 'videos_vehiculo',
    timestamps: true
  });

  VideoVehiculo.associate = (models) => {
    VideoVehiculo.belongsTo(models.Vehiculo, {
      foreignKey: 'vehiculoId',
      as: 'vehiculo'
    });
  };

  return VideoVehiculo;
};
