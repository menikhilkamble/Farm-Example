'use strict';
module.exports = (sequelize, DataTypes) => {
  const PropertyRegionFieldMaster = sequelize.define("propertyregionfieldmaster", {
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_region: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_field: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });
  PropertyRegionFieldMaster.associate = function(models) {

    PropertyRegionFieldMaster.belongsTo(models.RegionMaster, {
      foreignKey: 'region_id'
    });

    PropertyRegionFieldMaster.belongsTo(models.PropertiesMaster, {
      foreignKey: 'property_id'
    });

    PropertyRegionFieldMaster.belongsTo(models.FieldMaster, {
      foreignKey: 'field_id'
    });
  };
  return PropertyRegionFieldMaster;
};