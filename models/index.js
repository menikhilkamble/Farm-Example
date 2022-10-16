const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usermasters = require("./usermaster.js")(sequelize, Sequelize);
db.organizationmasters = require("./organizationmaster.js")(sequelize, Sequelize);
db.propertiesmasters = require("./propertiesmaster.js")(sequelize, Sequelize);
db.regionmasters = require("./regionmaster.js")(sequelize, Sequelize);
db.fieldmasters = require("./fieldmaster.js")(sequelize, Sequelize);
db.propertyregionfields = require("./propertyregionfield.js")(sequelize, Sequelize);
db.organizationpropertiesmasters = require("./organizationproperties.js")(sequelize, Sequelize);
db.regionfields = require("./regionfield.js")(sequelize, Sequelize);
db.cropmasters = require("./cropmaster.js")(sequelize, Sequelize);

module.exports = db;