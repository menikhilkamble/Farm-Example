var express = require('express');
var router = express.Router();
var regionmaster = require('../controllers/regionmaster.controller');
var sendResponse = require('../functions/sendResponse');

router.post("/", regionmaster.create, sendResponse.sendCreateResponse);
router.get("/", regionmaster.getAll, sendResponse.sendFindResponse);
router.get("/:id", regionmaster.getById, sendResponse.sendFindResponse);
router.put("/:id", regionmaster.update, sendResponse.sendCreateResponse);

module.exports = router;