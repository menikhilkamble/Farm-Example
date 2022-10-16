var express = require('express');
var router = express.Router();
var regionfield = require('../controllers/regionfield.controller');
var sendResponse = require('../functions/sendResponse');

router.post("/", regionfield.create, sendResponse.sendCreateResponse);
router.get("/", regionfield.getAll, sendResponse.sendFindResponse);
router.get("/:id", regionfield.getById, sendResponse.sendFindResponse);
router.put("/:id", regionfield.update, sendResponse.sendCreateResponse);

module.exports = router;