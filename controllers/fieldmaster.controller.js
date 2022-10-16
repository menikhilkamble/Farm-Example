const db = require("../models");
const FieldMasters = db.fieldmasters;
const WhereBuilder = require('../helpers/WhereBuilder');
var HTTPError = require('http-errors');

exports.create = async (req, res, next) => {
  var { name } = req.body;
  
  if (!name) {
    return next(HTTPError(500, "FieldMaster not created, name field is empty"));
  }

  var fieldmaster;
  try {
    fieldmaster = await FieldMasters.create({
      name: name,
      status: true,
    });
    if (!fieldmaster) {
      return next(HTTPError(500, "FieldMaster not created"))
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
      return next(HTTPError(500,"Internal error has occurred, while creating the fieldmaster."))
    }
  }

  fieldmaster = fieldmaster.toJSON();
  req.responseData = fieldmaster;
  next();
  return req.responseData;
};

exports.getAll = async (req, res, next) =>{
  var { name, status } = req.query;

  var whereClause = new WhereBuilder()
  .clause('name', name)
  .clause('status', status).toJSON();

  var getAllFieldMaster = await FieldMasters.findAll({
    where:whereClause
  });
  
  if (!getAllFieldMaster[0]) {
    return next(HTTPError(400, "FieldMaster not found"));
  }
  
  getAllFieldMaster = getAllFieldMaster.map ( el => { return el.get({ plain: true }) } );
  req.getAllFieldMaster = getAllFieldMaster;
  req.responseData = getAllFieldMaster;
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
    var updatedFieldMaster = await FieldMasters.update(whereClause,{
      where: {
        id: id
      }
    });

    if (!updatedFieldMaster) {
      return next(HTTPError(500, "FieldMaster not updated"))
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
      return next(HTTPError(500,"Internal error has occurred, while updating the fieldmaster."))
    }
  }

  req.updatedFieldMaster = updatedFieldMaster;
  req.responseData = updatedFieldMaster;
  next();
  return req.responseData
};

exports.getById = async (req, res, next) => {

  const { id } = req.params;

  var foundFieldMaster = await FieldMasters.findByPk(id);
  if (!foundFieldMaster) {
    return next(HTTPError(500, "FieldMaster not found"))
  }
  req.foundFieldMaster = foundFieldMaster;
  req.responseData = req.foundFieldMaster;
  next();
}
