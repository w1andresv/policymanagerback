var UsuarioController = require('../controller/usuario.controller');
var mdAutenticacion = require('../middlewares/autenticacion');
var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    next();
});
router.use(mdAutenticacion.verificaToken);
router.post('/', UsuarioController.add);
router.put('/', UsuarioController.update);
router.get('/', UsuarioController.getAll);
router.get('/:id', UsuarioController.getById);
module.exports = router;
