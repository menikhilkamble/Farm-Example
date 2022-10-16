const db = require("../models");
const RegionMasters = db.regionmasters;
const WhereBuilder = require('../helpers/WhereBuilder');
var HTTPError = require('http-errors');

exports.create = async (req, res, next) => {
  var { name } = req.body;
  
  if (!name) {
    return next(HTTPError(500, "RegionMaster not created, name field is empty"));
  }

  var regionmaster;
  try {
    regionmaster = await RegionMasters.create({
      name: name,
      status: true,
    });
    if (!regionmaster) {
      return next(HTTPError(500, "RegionMaster not created"))
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
      return next(HTTPError(500,"Internal error has occurred, while creating the regionmaster."))
    }
  }

  regionmaster = regionmaster.toJSON();
  req.responseData = regionmaster;
  next();
  return req.responseData

};


exports.getAll = async (req, res, next) =>{
  var { name, status } = req.query;

  var whereClause = new WhereBuilder()
  .clause('name', name)
  .clause('status', status).toJSON();

  var getAllRegionMaster = await RegionMasters.findAll({
    where:whereClause
  });
  
  if (!getAllRegionMaster[0]) {
    return next(HTTPError(400, "RegionMaster not found"));
  }
  
  getAllRegionMaster = getAllRegionMaster.map ( el => { return el.get({ plain: true }) } );
  req.getAllRegionMaster = getAllRegionMaster;
  req.responseData = getAllRegionMaster;
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
    var updatedRegionMaster = await RegionMasters.update(whereClause,{
      where: {
        id: id
      }
    });

    if (!updatedRegionMaster) {
      return next(HTTPError(500, "RegionMaster not updated"))
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
      return next(HTTPError(500,"Internal error has occurred, while updating the regionmaster."))
    }
  }

  req.updatedRegionMaster = updatedRegionMaster;
  req.responseData = updatedRegionMaster;
  next();
  return req.responseData
};

exports.getById = async (req, res, next) => {

  const { id } = req.params;

  var foundRegionMaster = await RegionMasters.findByPk(id);
  if (!foundRegionMaster) {
    return next(HTTPError(500, "RegionMaster not found"))
  }
  req.foundRegionMaster = foundRegionMaster;
  req.responseData = req.foundRegionMaster;
  next();
}
