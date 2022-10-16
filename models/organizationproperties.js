'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationPropertiesMaster = sequelize.define("organizationpropertiesmaster", {
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orginization_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });
  OrganizationPropertiesMaster.associate = function(models) {

    OrganizationPropertiesMaster.belongsTo(models.PropertiesMaster, {
      foreignKey: 'property_id'
    });

    OrganizationPropertiesMaster.belongsTo(models.OrganizationMaster, {
      foreignKey: 'orginization_id'
    });
  };
  return OrganizationPropertiesMaster;
};