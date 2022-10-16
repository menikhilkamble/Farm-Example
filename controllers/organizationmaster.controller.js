const db = require("../models");
const OrganizationMasters = db.organizationmasters;
const WhereBuilder = require('../helpers/WhereBuilder');
var HTTPError = require('http-errors');

exports.create = async (req, res, next) => {
  var { name } = req.body;
  
  if (!name) {
    return next(HTTPError(500, "OrganizationMaster not created, name field is empty"));
  }

  var organizationmaster;
  try {
    organizationmaster = await OrganizationMasters.create({
      name: name,
      status: true,
    });
    if (!organizationmaster) {
      return next(HTTPError(500, "OrganizationMaster not created"))
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
      return next(HTTPError(500,"Internal error has occurred, while creating the organizationmaster."))
    }
  }

  organizationmaster = organizationmaster.toJSON();
  req.responseData = organizationmaster;
  next();
  return req.responseData
};

exports.getAll = async (req, res, next) =>{
  var { name, status } = req.query;

  var whereClause = new WhereBuilder()
  .clause('name', name)
  .clause('status', status).toJSON();

  var getAllOrganizationMaster = await OrganizationMasters.findAll({
    where:whereClause
  });
  
  if (!getAllOrganizationMaster[0]) {
    return next(HTTPError(400, "OrganizationMaster not found"));
  }
  
  getAllOrganizationMaster = getAllOrganizationMaster.map ( el => { return el.get({ plain: true }) } );
  req.getAllOrganizationMaster = getAllOrganizationMaster;
  req.responseData = getAllOrganizationMaster;
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
    var updatedOrganizationMaster = await OrganizationMasters.update(whereClause,{
      where: {
        id: id
      }
    });

    if (!updatedOrganizationMaster) {
      return next(HTTPError(500, "OrganizationMaster not updated"))
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
      return next(HTTPError(500,"Internal error has occurred, while updating the organizationmaster."))
    }
  }

  req.updatedOrganizationMaster = updatedOrganizationMaster;
  req.responseData = updatedOrganizationMaster;
  next();
  return req.responseData
};

exports.getById = async (req, res, next) => {

  const { id } = req.params;

  var foundOrganizationMaster = await OrganizationMasters.findByPk(id);
  if (!foundOrganizationMaster) {
    return next(HTTPError(500, "OrganizationMaster not found"))
  }
  req.foundOrganizationMaster = foundOrganizationMaster;
  req.responseData = req.foundOrganizationMaster;
  next();
}
