const  AuthController = require('../controller/auth.controller');
const express = require('express');
const router = express.Router();

router.use((req, res, next)=>{
    next();
});

router.post('/', AuthController.login);
router.post('/resetPassword', AuthController.resetPassword);
module.exports = router;
