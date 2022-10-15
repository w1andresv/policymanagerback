var ThemeController = require('../controller/theme.controller');
var mdAutenticacion = require('../middlewares/autenticacion');
var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    next();
});
router.use(mdAutenticacion.verificaToken);
router.post('/', ThemeController.add);
router.put('/', ThemeController.update);
router.get('/', ThemeController.getByUser);
module.exports = router;
