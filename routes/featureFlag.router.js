var express = require('express');
var router = express.Router();
var FeatureController = require('../controller/featureFlag.controller');
router.use(function timeLog(req, res, next) {
    next();
});
router.get('/getConfig', FeatureController.getConfig);

module.exports = router;
