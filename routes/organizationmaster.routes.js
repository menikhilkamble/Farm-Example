var express = require('express');
var router = express.Router();
var organizationmaster = require('../controllers/organizationmaster.controller');
var sendResponse = require('../functions/sendResponse');

router.post("/", organizationmaster.create, sendResponse.sendCreateResponse);
router.get("/", organizationmaster.getAll, sendResponse.sendFindResponse);
router.get("/:id", organizationmaster.getById, sendResponse.sendFindResponse);
router.put("/:id", organizationmaster.update, sendResponse.sendCreateResponse);

module.exports = router;