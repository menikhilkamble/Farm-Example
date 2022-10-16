const db = require("../models");
const OrganizationPropertiesMasters = db.organizationpropertiesmasters;
const WhereBuilder = require('../helpers/WhereBuilder');
var HTTPError = require('http-errors');

exports.create = async (req, res, next) => {
  var { property_id, orginization_id } = req.body;
  
  if (!property_id) {
    return next(HTTPError(500, "OrganizationPropertiesMaster not created, property_id field is empty"));
  }

  if (!orginization_id) {
    return next(HTTPError(500, "OrganizationPropertiesMaster not created, orginization_id field is empty"));
  }

  var organizationpropertiesmaster;
  try {
    organizationpropertiesmaster = await OrganizationPropertiesMasters.create({
      property_id: property_id,
      orginization_id: orginization_id,
      status: true,
    });
    if (!organizationpropertiesmaster) {
      return next(HTTPError(500, "OrganizationPropertiesMaster not created"))
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
      return next(HTTPError(500,"Internal error has occurred, while creating the organizationpropertiesmaster."))
    }
  }

  organizationpropertiesmaster = organizationpropertiesmaster.toJSON();
  req.responseData = organizationpropertiesmaster;
  next();
  return req.responseData
};

exports.getAll = async (req, res, next) =>{
  var { property_id, orginization_id, status } = req.query;

  var whereClause = new WhereBuilder()
  .clause('property_id', property_id)
  .clause('orginization_id', orginization_id)
  .clause('status', status).toJSON();

  var getAllOrganizationPropertiesMaster = await OrganizationPropertiesMasters.findAll({
    where:whereClause
  });
  
  if (!getAllOrganizationPropertiesMaster[0]) {
    return next(HTTPError(400, "OrganizationPropertiesMaster not found"));
  }
  
  getAllOrganizationPropertiesMaster = getAllOrganizationPropertiesMaster.map ( el => { return el.get({ plain: true }) } );
  req.getAllOrganizationPropertiesMaster = getAllOrganizationPropertiesMaster;
  req.responseData = getAllOrganizationPropertiesMaster;
  next();
  return req.responseData
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  var { property_id, orginization_id, status } = req.body;

  var whereClause = new WhereBuilder()
  .clause('property_id', property_id)
  .clause('orginization_id', orginization_id)
  .clause('status', status).toJSON();

  try{
    var updatedOrganizationPropertiesMaster = await OrganizationPropertiesMasters.update(whereClause,{
      where: {
        id: id
      }
    });

    if (!updatedOrganizationPropertiesMaster) {
      return next(HTTPError(500, "OrganizationPropertiesMaster not updated"))
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
      return next(HTTPError(500,"Internal error has occurred, while updating the organizationpropertiesmaster."))
    }
  }

  req.updatedOrganizationPropertiesMaster = updatedOrganizationPropertiesMaster;
  req.responseData = updatedOrganizationPropertiesMaster;
  next();
  return req.responseData
};

exports.getById = async (req, res, next) => {

  const { id } = req.params;

  var foundOrganizationPropertiesMaster = await OrganizationPropertiesMasters.findByPk(id);
  if (!foundOrganizationPropertiesMaster) {
    return next(HTTPError(500, "OrganizationPropertiesMaster not found"))
  }
  req.foundOrganizationPropertiesMaster = foundOrganizationPropertiesMaster;
  req.responseData = req.foundOrganizationPropertiesMaster;
  next();
}
