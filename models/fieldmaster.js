'use strict';
module.exports = (sequelize, DataTypes) => {
  const FieldMaster = sequelize.define("fieldmaster", {
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

  return FieldMaster;
};