const db = require("../models");
const PropertyRegionFields = db.propertyregionfields;
const WhereBuilder = require('../helpers/WhereBuilder');
var HTTPError = require('http-errors');

exports.create = async (req, res, next) => {
  var { region_id, property_id, field_id, is_region, is_field } = req.body;
  
  if (!region_id) {
    return next(HTTPError(500, "PropertyRegionField not created, region_id field is empty"));
  }

  if (!property_id) {
    return next(HTTPError(500, "PropertyRegionField not created, property_id field is empty"));
  }

  var propertyregionfield;
  try {
    propertyregionfield = await PropertyRegionFields.create({
      region_id: region_id,
      property_id: property_id,
      field_id: field_id,
      is_region: is_region?is_region:true,
      is_field: is_field?is_field:false,
      status: true,
    });
    if (!propertyregionfield) {
      return next(HTTPError(500, "PropertyRegionField not created"))
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
      return next(HTTPError(500,"Internal error has occurred, while creating the propertyregionfield."))
    }
  }

  propertyregionfield = propertyregionfield.toJSON();
  req.responseData = propertyregionfield;
  next();
return req.responseData 
};


exports.getAll = async (req, res, next) =>{
  var { region_id, property_id, field_id, is_region, is_field, status } = req.query;

  var whereClause = new WhereBuilder()
  .clause('region_id', region_id)
  .clause('property_id', property_id)
  .clause('field_id', field_id)
  .clause('is_region', is_region)
  .clause('is_field', is_field)
  .clause('status', status).toJSON();

  var getAllPropertyRegionField = await PropertyRegionFields.findAll({
    where:whereClause
  });
  
  if (!getAllPropertyRegionField[0]) {
    return next(HTTPError(400, "PropertyRegionField not found"));
  }
  
  getAllPropertyRegionField = getAllPropertyRegionField.map ( el => { return el.get({ plain: true }) } );
  req.getAllPropertyRegionField = getAllPropertyRegionField;
  req.responseData = getAllPropertyRegionField;
  next();
  return req.responseData
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  var { region_id, property_id, field_id, is_region, is_field, status } = req.body;

  var whereClause = new WhereBuilder()
  .clause('region_id', region_id)
  .clause('property_id', property_id)
  .clause('field_id', field_id)
  .clause('is_region', is_region)
  .clause('is_field', is_field)
  .clause('status', status).toJSON();

  try{
    var updatedPropertyRegionField = await PropertyRegionFields.update(whereClause,{
      where: {
        id: id
      }
    });

    if (!updatedPropertyRegionField) {
      return next(HTTPError(500, "PropertyRegionField not updated"))
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
      return next(HTTPError(500,"Internal error has occurred, while updating the propertyregionfield."))
    }
  }

  req.updatedPropertyRegionField = updatedPropertyRegionField;
  req.responseData = updatedPropertyRegionField;
  next();
  return req.responseData
};

exports.getById = async (req, res, next) => {

  const { id } = req.params;

  var foundPropertyRegionField = await PropertyRegionFields.findByPk(id);
  if (!foundPropertyRegionField) {
    return next(HTTPError(500, "PropertyRegionField not found"))
  }
  req.foundPropertyRegionField = foundPropertyRegionField;
  req.responseData = req.foundPropertyRegionField;
  next();
}
