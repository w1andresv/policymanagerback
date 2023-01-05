const UsuarioService = require('../services/usuario.service');
const UsuarioController = require('./usuario.controller');
const jwt = require("jsonwebtoken");
const config = require('../config/config.js');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const controller = {};

controller.resetPassword = async (req, res) => {
    const email = req.body.email;
    const randompass = randomstring.generate(8);
    const npass = bcrypt.hashSync(randompass);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cotizadorautoplus@gmail.com',
            pass: 'Cotizador*1'
        }
    });
    try {
        const usuarioDB = await UsuarioService.getByEmail(email);
        if (!usuarioDB) {
            return res.status(200).json({
                estado: false,
                mensaje: 'Credenciales incorrectas'
            });
        }
        const mailOptions = {
            from: 'cotizadorautoplus@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
            to: email,
            subject: 'Cambio de contraseña', // email subject
            html: `<div style="width: 90%; background-color: whitesmoke; padding: 5%">
                      <div style="width: 100%; background-color: white; padding: 5% ">
                        <h3 style="text-align: center" >Cambio de Clave de Acceso</h3>
                        <br>
                        <label>
                          Buen día
                        </label>
                        <br> <br> <br>
                        <label>
                          Su nueva clave de acceso al sistema es:
                        </label>
                        <br> <br> <br>
                        <strong>
                          ${randompass}
                        </strong>
                      </div>
                      <div style="height: 10px"></div>
                      <div style="width: 100%; background-color: white; text-align: center; padding: 40px; color: darkgray ">
                        <label>
                          Se ha enviado este e-mail a <a href="mailto:${email}">${email}</a>
                        </label>
                        <br>
                        <label>
                          Ha recibido este e-mail porque está suscrito a Corizador Auto Plus Gip
                        </label>
                      </div>
                      <div style="width: 100%; padding: 10px; color: darkgray; text-align: center">
                      © 2020 Corizador Auto Plus Gip
                      </div>
                    </div>`
        };
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.status(500).json({ estado: false, mensaje: erro });
            }
            usuarioDB.password = npass;
            UsuarioService.update(usuarioDB);
            return res.status(200).json({ estado: true, mensaje: 'Correo enviado con exito.' });
        });
    } catch (e) {
        return res.status(500).json(e.message);
    }
}

controller.login = async (req, res, next) => {
    const password = req.body.password;
    const username = req.body.username;
    try {
        const data = await UsuarioService.getByUsername(username);
        if (!data) {
            return res.status(200).json({
                estado: false,
                mensaje: 'Access denied'
            });
        }
       if (!bcrypt.compareSync(password, data.password)) {
            return res.status(200).json({
              estado: false,
               mensaje: 'Access denied'
            });
        }
        if (!data.enabled) {
            return res.status(200).json({
                estado: false,
                mensaje: 'Access denied'
            });
        }
        data.password = 'Not access';
        const token = jwt.sign({ user: data }, config.SEED, { expiresIn: config.TIME }); // 4 horas
        return res.status(200).json({
            estado: true,
            token: token
        });
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
module.exports = controller;
