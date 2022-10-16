const db = require("../models");
const CropMasters = db.cropmasters;
const FieldMasters = db.fieldmasters;
const WhereBuilder = require('../helpers/WhereBuilder');
var HTTPError = require('http-errors');

exports.create = async (req, res, next) => {
  var { name, field_id } = req.body;
  
  if (!name) {
    return next(HTTPError(500, "CropMaster not created, name field is empty"));
  }

  if (!field_id) {
    return next(HTTPError(500, "CropMaster not created, field_id field is empty"));
  }

  var cropmaster;
  try {
    cropmaster = await CropMasters.create({
      name: name,
      field_id: field_id,
      status: true,
    });
    if (!cropmaster) {
      return next(HTTPError(500, "CropMaster not created"))
    }
  } 
  catch (err) {
    if(err["errors"]){
      return next(HTTPError(500,err["errors"][0]["message"]))
    }
    else if(err["original"]){
      return next(HTTPError(500, err["original"]["detail"]));
    }
    else{
      return next(HTTPError(500,"Internal error has occurred, while creating the cropmaster."))
    }
  }

  cropmaster = cropmaster.toJSON();
  req.responseData = cropmaster;
  next();
  return req.responseData
};

exports.getAll = async (req, res, next) =>{
  var { name, field_id, status } = req.query;

  var whereClause = new WhereBuilder()
  .clause('name', name)
  .clause('field_id', field_id)
  .clause('status', status).toJSON();

  var getAllCropMaster = await CropMasters.findAll({
    where:whereClause
  });
  
  if (!getAllCropMaster[0]) {
    return next(HTTPError(400, "CropMaster not found"));
  }
  
  getAllCropMaster = getAllCropMaster.map ( el => { return el.get({ plain: true }) } );
  req.getAllCropMaster = getAllCropMaster;
  req.responseData = getAllCropMaster;
  next();
  return req.responseData
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  var { name, field_id, status } = req.body;

  var whereClause = new WhereBuilder()
  .clause('name', name)
  .clause('field_id', field_id)
  .clause('status', status).toJSON();

  try{
    var updatedCropMaster = await CropMasters.update(whereClause,{
      where: {
        id: id
      }
    });

    if (!updatedCropMaster) {
      return next(HTTPError(500, "CropMaster not updated"))
    }
  }
  catch (err) {
    if(err["errors"]){
      return next(HTTPError(500,err["errors"][0]["message"]))
    }
    else if(err["original"]){
      return next(HTTPError(500, err["original"]["detail"]));
    }
    else{
      return next(HTTPError(500,"Internal error has occurred, while updating the cropmaster."))
    }
  }

  req.updatedCropMaster = updatedCropMaster;
  req.responseData = updatedCropMaster;
  next();
  return req.responseData
};

exports.getById = async (req, res, next) => {

  const { id } = req.params;

  var foundCropMaster = await CropMasters.findByPk(id);
  if (!foundCropMaster) {
    return next(HTTPError(500, "CropMaster not found"))
  }
  req.foundCropMaster = foundCropMaster;
  req.responseData = req.foundCropMaster;
  next();
}
