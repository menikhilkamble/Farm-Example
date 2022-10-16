const db = require("../models");
const PropertiesMasters = db.propertiesmasters;
const WhereBuilder = require('../helpers/WhereBuilder');
var HTTPError = require('http-errors');

exports.create = async (req, res, next) => {
  var { name, property_type } = req.body;
  
  if (!name) {
    return next(HTTPError(500, "PropertiesMaster not created, name field is empty"));
  }

  var propertiesmaster;
  try {
    propertiesmaster = await PropertiesMasters.create({
      name: name,
      status: true,
    });
    if (!propertiesmaster) {
      return next(HTTPError(500, "PropertiesMaster not created"))
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
      return next(HTTPError(500,"Internal error has occurred, while creating the propertiesmaster."))
    }
  }

  propertiesmaster = propertiesmaster.toJSON();
  req.responseData = propertiesmaster;
  next();
  return req.responseData
};

exports.getAll = async (req, res, next) =>{
  var { name, status } = req.query;

  var whereClause = new WhereBuilder()
  .clause('name', name)
  .clause('status', status).toJSON();

  var getAllPropertiesMaster = await PropertiesMasters.findAll({
    where:whereClause
  });
  
  if (!getAllPropertiesMaster[0]) {
    return next(HTTPError(400, "PropertiesMaster not found"));
  }
  
  getAllPropertiesMaster = getAllPropertiesMaster.map ( el => { return el.get({ plain: true }) } );
  req.getAllPropertiesMaster = getAllPropertiesMaster;
  req.responseData = getAllPropertiesMaster;
  next();
  return req.responseData
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  var { name, status } = req.body;

  var whereClause = new WhereBuilder()
  .clause('name', name)
  .clause('status', status).toJSON();

  try{
    var updatedPropertiesMaster = await PropertiesMasters.update(whereClause,{
      where: {
        id: id
      }
    });

    if (!updatedPropertiesMaster) {
      return next(HTTPError(500, "PropertiesMaster not updated"))
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
      return next(HTTPError(500,"Internal error has occurred, while updating the propertiesmaster."))
    }
  }

  req.updatedPropertiesMaster = updatedPropertiesMaster;
  req.responseData = updatedPropertiesMaster;
  next();
  return req.responseData
};

exports.getById = async (req, res, next) => {

  const { id } = req.params;

  var foundPropertiesMaster = await PropertiesMasters.findByPk(id);
  if (!foundPropertiesMaster) {
    return next(HTTPError(500, "PropertiesMaster not found"))
  }
  req.foundPropertiesMaster = foundPropertiesMaster;
  req.responseData = req.foundPropertiesMaster;
  next();
}
