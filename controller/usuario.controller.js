const UserService = require('../services/usuario.service');
const User = require('../modelos/usuario');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const controller = {};

controller.add = async (req, res, next) => {
    var usuarioLogeqdo = jwt.decode(req.headers.authorization);
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        rol: req.body.rol,
        email: req.body.email,
        enabled: req.body.enabled,
        creationUser: usuarioLogeqdo.user._id,
        creationDate: new Date(),
        updateDate: new Date()
    });
    try {
        const data = await UserService.add(user);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
controller.update = async (req, res, next) => {
    var usuarioLogeqdo = jwt.decode(req.headers.authorization);
    const id = req.body._id;
    const body = req.body;
    const user = await UserService.getById(id);
    if (user) {
        user.name = body.name;
        user.usermane = body.usermane;
        user.password = bcrypt.hashSync(body.password, 10),
        user.rol = body.rol;
        user.email = body.email;
        user.enabled = body.enabled;
        user.creationUser = usuarioLogeqdo.user._id,
        user.creationDate = body.creationDate;
        user.updateDate = new Date();
        
        try {
            const data = await UserService.create(user);
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
        const data = await UserService.getAll();
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
controller.getById = async (req, res, next) => {
    try {
        const data = await UserService.getById(req.params.id);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
controller.getByUsername = async (req, res, next) => {
    const query = { username: req.params.username };
    try {
        const data = await UserService.getOne(query);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
controller.getByEmail = async (req, res, next) => {
    const query = { email: req.params.email };
    try {
        const data = await UserService.getOne(query);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};
module.exports = controller;
