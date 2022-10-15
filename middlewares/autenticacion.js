const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.verificaToken = function (req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, config.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'No autorizado',
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
