const db = require("../models");
const RegionFields = db.regionfields;
const WhereBuilder = require('../helpers/WhereBuilder');
var HTTPError = require('http-errors');

exports.create = async (req, res, next) => {
  var { region_id, field_id, is_region, is_field } = req.body;
  
  if (!region_id) {
    return next(HTTPError(500, "RegionField not created, region_id field is empty"));
  }

  if (!field_id) {
    return next(HTTPError(500, "RegionField not created, field_id field is empty"));
  }

  var regionfield;
  try {
    regionfield = await RegionFields.create({
      region_id: region_id,
      field_id: field_id,
      is_region: is_region?is_region:true,
      is_field: is_field?is_field:false,
      status: true,
    });
    if (!regionfield) {
      return next(HTTPError(500, "RegionField not created"))
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
      return next(HTTPError(500,"Internal error has occurred, while creating the regionfield."))
    }
  }

  regionfield = regionfield.toJSON();
  req.responseData = regionfield;
  next();
  return req.responseData
};

exports.getAll = async (req, res, next) =>{
  var { region_id, field_id, is_region, is_field, status } = req.query;

  var whereClause = new WhereBuilder()
  .clause('region_id', region_id)
  .clause('field_id', field_id)
  .clause('is_region', is_region)
  .clause('is_field', is_field)
  .clause('status', status).toJSON();

  var getAllRegionField = await RegionFields.findAll({
    where:whereClause
  });
  
  if (!getAllRegionField[0]) {
    return next(HTTPError(400, "RegionField not found"));
  }
  
  getAllRegionField = getAllRegionField.map ( el => { return el.get({ plain: true }) } );
  req.getAllRegionField = getAllRegionField;
  req.responseData = getAllRegionField;
  next();
  return req.responseData
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  var { region_id, field_id, is_region, is_field, status } = req.body;

  var whereClause = new WhereBuilder()
  .clause('region_id', region_id)
  .clause('field_id', field_id)
  .clause('is_region', is_region)
  .clause('is_field', is_field)
  .clause('status', status).toJSON();

  try{
    var updatedRegionField = await RegionFields.update(whereClause,{
      where: {
        id: id
      }
    });

    if (!updatedRegionField) {
      return next(HTTPError(500, "RegionField not updated"))
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
      return next(HTTPError(500,"Internal error has occurred, while updating the regionfield."))
    }
  }

  req.updatedRegionField = updatedRegionField;
  req.responseData = updatedRegionField;
  next();
  return req.responseData
};

exports.getById = async (req, res, next) => {

  const { id } = req.params;

  var foundRegionField = await RegionFields.findByPk(id);
  if (!foundRegionField) {
    return next(HTTPError(500, "RegionField not found"))
  }
  req.foundRegionField = foundRegionField;
  req.responseData = req.foundRegionField;
  next();
}
