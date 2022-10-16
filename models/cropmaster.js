'use strict';
module.exports = (sequelize, DataTypes) => {
  const CropMaster = sequelize.define("cropmaster", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });
  CropMaster.associate = function(models) {

    CropMaster.belongsTo(models.FieldMaster, {
      foreignKey: 'field_id'
    });
    
  };
  return CropMaster;
};