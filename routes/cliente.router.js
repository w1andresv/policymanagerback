var ClientController = require('../controller/cliente.controller');
var mdAutenticacion = require('../middlewares/autenticacion');
var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    next();
});
router.use(mdAutenticacion.verificaToken);
router.post('/', ClientController.add);
router.put('/', ClientController.update);
router.get('/', ClientController.getAll);
router.get('/:id', ClientController.getById);
router.get('/:identificationType/:identification', ClientController.getByIdentificationAndType);
module.exports = router;

