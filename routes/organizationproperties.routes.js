var express = require('express');
var router = express.Router();
var organizationproperties = require('../controllers/organizationproperties.controller');
var sendResponse = require('../functions/sendResponse');

router.post("/", organizationproperties.create, sendResponse.sendCreateResponse);
router.get("/", organizationproperties.getAll, sendResponse.sendFindResponse);
router.get("/:id", organizationproperties.getById, sendResponse.sendFindResponse);
router.put("/:id", organizationproperties.update, sendResponse.sendCreateResponse);

module.exports = router;