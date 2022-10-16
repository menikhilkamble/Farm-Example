var express = require('express');
var router = express.Router();
var propertiesmaster = require('../controllers/propertiesmaster.controller');
var sendResponse = require('../functions/sendResponse');

router.post("/", propertiesmaster.create, sendResponse.sendCreateResponse);
router.get("/", propertiesmaster.getAll, sendResponse.sendFindResponse);
router.get("/:id", propertiesmaster.getById, sendResponse.sendFindResponse);
router.put("/:id", propertiesmaster.update, sendResponse.sendCreateResponse);

module.exports = router;