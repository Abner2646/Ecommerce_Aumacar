const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    define: dbConfig.define,
    dialectOptions: dbConfig.dialectOptions
  }
);

const db = {};

// Importar modelos
db.Marca = require('./Marca')(sequelize);
db.Vehiculo = require('./Vehiculo')(sequelize);
db.ImagenVehiculo = require('./ImagenVehiculo')(sequelize);
db.Caracteristica = require('./Caracteristica')(sequelize);
db.VehiculoCaracteristica = require('./VehiculoCaracteristica')(sequelize);
db.VideoVehiculo = require('./VideoVehiculo')(sequelize);
db.Usuario = require('./Usuario')(sequelize);

// Definir asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
