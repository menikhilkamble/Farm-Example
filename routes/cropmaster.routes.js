var express = require('express');
var router = express.Router();
var cropmaster = require('../controllers/cropmaster.controller');
var sendResponse = require('../functions/sendResponse');

router.post("/", cropmaster.create, sendResponse.sendCreateResponse);
router.get("/", cropmaster.getAll, sendResponse.sendFindResponse);
router.get("/:id", cropmaster.getById, sendResponse.sendFindResponse);
router.put("/:id", cropmaster.update, sendResponse.sendCreateResponse);

module.exports = router;