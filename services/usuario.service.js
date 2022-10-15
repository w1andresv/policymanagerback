const Usuario = require('../modelos/usuario.js')
var service = {};

service.add = async (usuario) => {
    try {
        return await usuario.save()
    } catch (error) {
        throw Error(error)

    }
};
service.create = async (usuario) => {
    try {
        return await usuario.save()
    } catch (error) {
        throw Error(error)

    }
};
service.getAll = async (query, limit, page) => {
    try {
        return await Usuario.find(query);
    } catch (e) {
        throw Error(e)
    }
};
service.getById = async (id) => {
    try {
        return await Usuario.findById(id);
    } catch (e) {
        throw Error(e)
    }
};
service.getByUsername = async (data) => {
    try {
        return await Usuario.findOne({username:data});
    } catch (e) {
        throw Error(e)
    }
};
service.getByEmail = async (email) => {
    try {
        return await Usuario.findOne({email:email});
    } catch (e) {
        throw Error(e)
    }
};
service.getOne = async (query) => {
    return await Usuario.findOne(query);
};
module.exports = service;
