'use strict';
module.exports = (sequelize, DataTypes) => {
  const PropertiesMaster = sequelize.define("propertiesmaster", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });

  return PropertiesMaster;
};