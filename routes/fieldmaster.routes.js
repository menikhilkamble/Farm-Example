var express = require('express');
var router = express.Router();
var fieldmaster = require('../controllers/fieldmaster.controller');
var sendResponse = require('../functions/sendResponse');

router.post("/", fieldmaster.create, sendResponse.sendCreateResponse);
router.get("/", fieldmaster.getAll, sendResponse.sendFindResponse);
router.get("/:id", fieldmaster.getById, sendResponse.sendFindResponse);
router.put("/:id", fieldmaster.update, sendResponse.sendCreateResponse);

module.exports = router;