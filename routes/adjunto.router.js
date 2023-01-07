var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');
var router = express.Router();
var AdjuntoController = require('../controller/adjunto.controller');
router.use(function timeLog(req, res, next) {
    next();
});
router.use(mdAutenticacion.verificaToken);
router.post('/upload', AdjuntoController.upload);
router.post('/uploadFile', AdjuntoController.uploadFile);
router.post('/createFolder', AdjuntoController.createFolder);
router.get('/generateLink/:fileId', AdjuntoController.generateLink);

module.exports = router;
