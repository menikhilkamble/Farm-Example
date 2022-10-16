'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationMaster = sequelize.define("organizationmaster", {
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

  return OrganizationMaster;
};