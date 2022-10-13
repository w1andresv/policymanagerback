const UsuarioService = require('../services/usuario.service.ts');
const Usuario = require('../modelos/usuario.ts');
const bcrypt = require('bcryptjs');
const controller = {};

controller.add = async (req, res, next) => {
    const usuario = new Usuario({
        nombre: req.body.nombre,
        usuarioSistema: req.body.usuarioSistema,
        password: bcrypt.hashSync(req.body.password, 10),
        rol: req.body.rol,
        email: req.body.email,
        habilitado: req.body.habilitado
    });
    try {
        const data = await UsuarioService.add(usuario);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
controller.update = async (req, res, next) => {
    const id = req.body._id;
    const body = req.body;
    const usuario = await UsuarioService.getById(id);
    if (usuario) {
        usuario.nombre= body.nombre;
        usuario.usuarioSistema= body.usuarioSistema;
        usuario.password= bcrypt.hashSync(body.password, 10),
        usuario.rol= body.rol;
        usuario.email= body.email;
        usuario.habilitado= body.habilitado;
        try {
            const data = await UsuarioService.create(usuario);
            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json(e.message);
        }
    } else {
        return res.status(400).json(e.message);
    }
};
controller.getAll = async (req, res, next) => {
    try {
        const data = await UsuarioService.getAll();
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
controller.getById = async (req, res, next) => {
    try {
        const data = await UsuarioService.getById(req.params.id);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
controller.getByUsername = async (req, res, next) => {
    const query = { username: req.params.username };
    try {
        const data = await UsuarioService.getOne(query);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
controller.getByEmail = async (req, res, next) => {
    const query = { email: req.params.email };
    try {
        const data = await UsuarioService.getOne(query);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
module.exports = controller;
