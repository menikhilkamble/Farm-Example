'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegionFieldMaster = sequelize.define("regionfieldmaster", {
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
  RegionFieldMaster.associate = function(models) {

    RegionFieldMaster.belongsTo(models.RegionMaster, {
      foreignKey: 'region_id'
    });

    RegionFieldMaster.belongsTo(models.FieldMaster, {
      foreignKey: 'field_id'
    });
  };
  return RegionFieldMaster;
};