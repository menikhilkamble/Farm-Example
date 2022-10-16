'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegionMaster = sequelize.define("regionmaster", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });

  return RegionMaster;
};