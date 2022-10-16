const db = require("../models");
const UserMasters = db.usermasters;
const WhereBuilder = require('../helpers/WhereBuilder');
const HTTPError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const bbPromise = require('bluebird');

exports.create = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email) {
    return next(HTTPError(500, "UserMaster not created, email field is empty"));
  }

  if (!password) {
    return next(HTTPError(500, "UserMaster not created, password field is empty"));
  }

  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if(!emailRegexp.test(email)){
    return next(HTTPError(500, "UserMaster not created, email field is invalid")); 
  }

  var usermaster;
  try {
    usermaster = await UserMasters.create({
      email: email,
      password: password,
      status: true
    });
    if (!usermaster) {
      return next(HTTPError(500, "UserMaster not created"))
    }
  } 
  catch (err) {
    console.log(err)
    if(err["errors"]){
      return next(HTTPError(500,err["errors"][0]["message"]))
    }
    else if(err["original"]){
      return next(HTTPError(500, err["original"]["detail"]));
    }
    else{
      return next(HTTPError(500,"Internal error has occurred, while creating the usermaster."))
    }
  }

  usermaster = usermaster.toJSON();
  req.responseData = usermaster;
  next();
  return req.responseData
};

exports.sign_in = async (req, res, next) =>{
 const user= await UserMasters.scope('withPassword').findOne({
  where: {
    email: req.body.email
  }
})

 if( !user  || user.status === false){
  return next(HTTPError(401,"Authentication failed. Invalid user or password."))
}

if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
  return next(HTTPError(401,"Authentication failed. Invalid user or password."));
}

req.responseData = {
 token: jwt.sign({ email: user.email },'THISISLONGSTRINGKEY'),
 email: user.email,
 status: user.status
}
next();
return req.responseData;
};

exports.loginRequired = async (req, res, next) =>{
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

exports.getAll = async (req, res, next) =>{
 const { email, status } = req.query;

 const whereClause = new WhereBuilder()
 .clause('email', email)
 .clause('status', status).toJSON();

 var getAllUserMaster = await UserMasters.findAll({
  where:whereClause
});

 if (!getAllUserMaster[0]) {
  return next(HTTPError(400, "UserMaster not found"));
}

getAllUserMaster = getAllUserMaster.map ( el => { return el.get({ plain: true }) } );
req.getAllUserMaster = getAllUserMaster;
req.responseData = getAllUserMaster;
next();
return req;
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { email, description, status } = req.body;

  const whereClause = new WhereBuilder()
  .clause('email', email)
  .clause('status', status).toJSON();

  try{
    var updatedUserMaster = await UserMasters.update(whereClause,{
      where: {
        id: id
      }
    });

    if (!updatedUserMaster) {
      return next(HTTPError(500, "UserMaster not updated"))
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
      return next(HTTPError(500,"Internal error has occurred, while updating the usermaster."))
    }
  }

  req.updatedUserMaster = updatedUserMaster;
  req.responseData = updatedUserMaster;
  next();
};

exports.getById = async (req, res, next) => {

  const { id } = req.params;

  const foundUserMaster = await UserMasters.findByPk(id);
  if (!foundUserMaster) {
    return next(HTTPError(500, "UserMaster not found"))
  }
  req.foundUserMaster = foundUserMaster;
  req.responseData = req.foundUserMaster;
  next();
}
