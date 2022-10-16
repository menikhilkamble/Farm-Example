var express = require('express');
var router = express.Router();
var propertyregionfield = require('../controllers/propertyregionfield.controller');
var sendResponse = require('../functions/sendResponse');

router.post("/", propertyregionfield.create, sendResponse.sendCreateResponse);
router.get("/", propertyregionfield.getAll, sendResponse.sendFindResponse);
router.get("/:id", propertyregionfield.getById, sendResponse.sendFindResponse);
router.put("/:id", propertyregionfield.update, sendResponse.sendCreateResponse);

module.exports = router;