var express = require('express');
var router = express.Router();
var usermaster = require('../controllers/usermaster.controller');
var sendResponse = require('../functions/sendResponse');

router.post('/register', usermaster.create, sendResponse.sendFindResponse);
router.post('/sign_in', usermaster.sign_in);
router.get("/", usermaster.getAll, sendResponse.sendFindResponse);
router.get("/:id", usermaster.getById, sendResponse.sendFindResponse);
router.put("/:id", usermaster.update, sendResponse.sendCreateResponse);

module.exports = router;